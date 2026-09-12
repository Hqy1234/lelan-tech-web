/**
 * LELAN TECHNOLOGY · Guardian analysis state
 *
 * Phase 1F — Dify integration.
 *
 * Owns the idle/loading/success/error/timeout state machine for the Guardian
 * smart-analysis panel.
 *
 * DESIGN CONSTRAINTS
 *   - The analysis is an ENHANCEMENT. Failure never blocks the Profile: the
 *     stage, five dimensions, lifecycle, tasks and progress all keep rendering
 *     from the existing deterministic GuardianProfile.
 *   - Deterministic facts are never recalculated here. `progressCompleted` /
 *     `progressTotal` are read from the profile the UI is already showing, so
 *     the AI layer cannot disagree with the archive on screen.
 *   - Requests are de-duplicated by a signature key: a plain re-render, or
 *     remounting with identical archive input, will NOT call the Adapter again.
 */

"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type {
  GuardianAnalysisResult,
  GuardianDemoInput,
  GuardianProfile,
} from "@/content/guardian";
import {
  buildAnalyzePayload,
  demoInputFromProfile,
  getDifyUserId,
  isAnalysisEnabled,
  requestGuardianAnalysis,
  type GuardianAnalysisError,
} from "./analysis-adapter";

export type GuardianAnalysisStatus =
  | "disabled"
  | "idle"
  | "loading"
  | "success"
  | "error";

export interface GuardianAnalysisState {
  status: GuardianAnalysisStatus;
  analysis: GuardianAnalysisResult | null;
  error: GuardianAnalysisError | null;
}

export interface UseGuardianAnalysisResult extends GuardianAnalysisState {
  /** True when the Profile UI should render the analysis block at all. */
  available: boolean;
  /** Manual retry. Safe to call repeatedly; a retry is always a fresh request. */
  retry: () => void;
}

/**
 * A stable signature of everything that can change the analysis.
 * Identical signature ⇒ identical result ⇒ no second request.
 */
function signatureOf(
  input: GuardianDemoInput,
  completed: number,
  total: number
): string {
  return JSON.stringify({
    a: input.identity.age,
    g: input.identity.gender,
    c: input.identity.city ?? "",
    s: input.stage.id,
    sc: input.scenario.id,
    t: [...input.completedTaskIds].sort(),
    d: [...input.selectedDimensionTags].sort(),
    p: [completed, total],
  });
}

/**
 * @param profile  the deterministic archive currently displayed
 * @param inputOverride  optional explicit GuardianDemoInput. When omitted the
 *   input is reconstructed from the profile, so `/profile` needs no extra
 *   plumbing in order to request an analysis.
 */
export function useGuardianAnalysis(
  profile: GuardianProfile,
  inputOverride?: GuardianDemoInput | null
): UseGuardianAnalysisResult {
  const enabled = isAnalysisEnabled();

  /** Rebuilt once per profile identity — the fields involved never mutate. */
  const input = useMemo(
    () => inputOverride ?? demoInputFromProfile(profile),
    [inputOverride, profile]
  );

  const [state, setState] = useState<GuardianAnalysisState>(() => ({
    status: enabled && input ? "idle" : "disabled",
    analysis: null,
    error: null,
  }));

  /** Signature of the last request, so duplicates are suppressed. */
  const lastSignature = useRef<string | null>(null);
  /** Guards against setting state after unmount / after a newer request. */
  const runId = useRef(0);

  const completed = profile.tasks.filter((t) => t.status === "done").length;
  const total = profile.tasks.length;

  const run = useCallback(
    async (force: boolean) => {
      if (!enabled || !input) return;
      if (total <= 0) return;

      const signature = signatureOf(input, completed, total);
      if (!force && lastSignature.current === signature) return;
      lastSignature.current = signature;

      const myRun = ++runId.current;
      setState({ status: "loading", analysis: null, error: null });

      const payload = buildAnalyzePayload(
        input,
        profile.scenario?.name ?? "",
        // Stable, non-sensitive per-profile caller id for Dify.
        getDifyUserId(profile)
      );
      // Progress comes from the profile being displayed, not from the AI layer.
      payload.progressCompleted = completed;
      payload.progressTotal = total;

      const result = await requestGuardianAnalysis(payload);

      if (myRun !== runId.current) return; // superseded

      if (result.ok) {
        setState({ status: "success", analysis: result.analysis, error: null });
      } else {
        /**
         * Any failure collapses to the same calm UI. The error code is kept for
         * logging/analytics but the panel renders one safe sentence.
         */
        setState({ status: "error", analysis: null, error: result.error });
      }
    },
    // `profile` is a stable state object in the parent; it carries the scenario
    // name and the opaque id used for the Dify caller id. The stage name is
    // intentionally NOT a dependency: it is resolved canonically from the stage
    // id inside buildAnalyzePayload, so a divergent persona label cannot affect
    // the request.
    [enabled, input, completed, total, profile]
  );

  /** Auto-run once per distinct signature. */
  useEffect(() => {
    void run(false);
  }, [run]);

  const retry = useCallback(() => {
    // A manual retry clears the signature so the request is genuinely re-sent.
    lastSignature.current = null;
    void run(true);
  }, [run]);

  return {
    ...state,
    available: enabled && Boolean(input) && total > 0,
    retry,
  };
}
