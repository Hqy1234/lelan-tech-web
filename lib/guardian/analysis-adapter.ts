/**
 * LELAN TECHNOLOGY · Guardian Analysis Adapter (browser side)
 *
 * Phase 1F — Dify integration.
 *
 * The browser's ONLY outbound call for Guardian analysis. It never contacts
 * api.dify.ai and never holds the Dify key — it calls the site-controlled
 * server-side Adapter, which owns the credential.
 *
 *   Browser → [this module] → Guardian Analysis Adapter → Dify
 *                          ← normalized GuardianAnalysisResult ←
 *
 * ⚠ Sends STRUCTURED data (real arrays, real numbers). The Adapter — not this
 * module — is responsible for turning the arrays into the JSON strings Dify
 * expects, so a compromised client cannot smuggle arbitrary strings upstream.
 *
 * Failure is normal here, not exceptional: if the Adapter URL is unset, or the
 * Adapter is down, this returns a typed error and the Profile UI keeps rendering
 * from its existing deterministic data.
 */

import {
  GUARDIAN_SCENARIOS,
  getGuardianStageDisplayName,
  guardianStages,
  type GuardianAnalysisResult,
  type GuardianDemoInput,
  type GuardianProfile,
} from "@/content/guardian";

/* ── Public types ───────────────────────────────────────────────────────── */

export type GuardianAnalysisErrorCode =
  | "NOT_CONFIGURED"
  | "INVALID_INPUT"
  | "ANALYSIS_TIMEOUT"
  | "ANALYSIS_UNAVAILABLE"
  | "INVALID_ANALYSIS_RESPONSE"
  | "SERVER_ERROR";

export interface GuardianAnalysisError {
  code: GuardianAnalysisErrorCode;
  message: string;
}

export type GuardianAnalysisResponse =
  | { ok: true; analysis: GuardianAnalysisResult }
  | { ok: false; error: GuardianAnalysisError };

/** Tags grouped by dimension — the shape the Adapter validates. */
export interface GuardianDimensionTagGroups {
  wealth: string[];
  health: string[];
  travel: string[];
  food: string[];
  housing: string[];
}

/** Exactly what is POSTed. Mirrors the Adapter's validation contract. */
export interface GuardianAnalyzePayload {
  identity: { age: number; gender: "male" | "female"; city: string };
  stage: { id: string; name: string };
  scenario: { id: string; name: string };
  completedTaskIds: string[];
  dimensionTags: GuardianDimensionTagGroups;
  progressCompleted: number;
  progressTotal: number;
  /**
   * Stable, NON-SENSITIVE internal caller id forwarded to Dify as `user`.
   * Derived from the profile's own opaque id — see getDifyUserId().
   */
  user: string;
}

/* ── Dify caller id ─────────────────────────────────────────────────────── */

/**
 * Fallback caller id for a profile without a usable internal id.
 * Retained for forward compatibility: once a real account system exists the
 * profile id becomes the account's opaque id and this branch stops being hit.
 */
const DIFY_USER_FALLBACK = "guardian-web-demo";

/**
 * Build the stable, non-sensitive `user` value for a Dify request.
 *
 * Dify groups runs by `user`, so a single shared constant would collapse every
 * visitor into one identity. The profile's own opaque id is the right seed: it
 * is generated internally ("demo-m28" / "demo-f36", and later a real account id)
 * and carries no PII.
 *
 * ⚠ MUST NEVER contain a name, phone number, national id, email or any other
 * real sensitive identifier. The id is checked against a strict pattern and
 * anything unexpected falls back to the constant rather than being forwarded.
 */
export function getDifyUserId(profile: Pick<GuardianProfile, "id">): string {
  const id = typeof profile?.id === "string" ? profile.id.trim() : "";
  /**
   * Lowercase alphanumerics, dash and underscore only, and at least one letter.
   * This structurally cannot carry PII: no CJK characters (names), no "@"
   * (email), and no all-digit string (phone / national id).
   */
  const safe = /^[a-z0-9_-]{1,48}$/.test(id) && /[a-z]/.test(id) ? id : "";
  return safe ? `guardian-${safe}` : DIFY_USER_FALLBACK;
}

/* ── Safe messages (never surface upstream detail) ──────────────────────── */

const SAFE_MESSAGE: Record<GuardianAnalysisErrorCode, string> = {
  NOT_CONFIGURED: "智能分析尚未启用。",
  INVALID_INPUT: "提交的档案信息不完整，请返回修改后重试。",
  ANALYSIS_TIMEOUT: "智能分析暂时超时，请稍后重试。",
  ANALYSIS_UNAVAILABLE: "暂时无法生成智能分析，请稍后重试。",
  INVALID_ANALYSIS_RESPONSE: "暂时无法生成智能分析，请稍后重试。",
  SERVER_ERROR: "服务暂时不可用，请稍后重试。",
};

const KNOWN_CODES = new Set<string>(Object.keys(SAFE_MESSAGE));

/** Browser-side guard so a hung Adapter cannot leave the UI spinning. */
/**
 * Must EXCEED the adapter's total Dify budget (40s) so the server's structured
 * timeout error wins the race — otherwise the client would abort first and the
 * user would see a generic network failure instead of the intended message.
 */
const CLIENT_TIMEOUT_MS = 50_000;

/* ── Config ─────────────────────────────────────────────────────────────── */

/**
 * Public Adapter URL. This is an ADDRESS, not a secret, so a NEXT_PUBLIC_*
 * variable is appropriate here.
 *
 * Empty ⇒ analysis is switched off and the Profile keeps its current behaviour
 * with no error shown beyond a quiet "not enabled" note.
 */
export function getAdapterUrl(): string {
  const raw = process.env.NEXT_PUBLIC_GUARDIAN_ADAPTER_URL || "";
  return raw.trim().replace(/\/+$/, "");
}

export function isAnalysisEnabled(): boolean {
  return getAdapterUrl().length > 0;
}

/* ── Payload derivation ─────────────────────────────────────────────────── */

/**
 * Reconstruct the demo input from a stored GuardianProfile.
 *
 * WHY THIS EXISTS
 *   `/profile` renders from sessionStorage, and only the final `GuardianProfile`
 *   is persisted — the step-form `GuardianDemoInput` is not. Rather than change
 *   how the demo form stores its result (a flow this task must not disturb), the
 *   input is rebuilt from the profile itself.
 *
 * WHAT IT MAY LOSE
 *   `selectedDimensionTags` has no equivalent field on GuardianProfile, so the
 *   rebuilt input reports an empty tag set. That is honest: the adapter does not
 *   invent tags it cannot prove. Every STRUCTURAL field — age, gender, stage id,
 *   scenario id — is preserved exactly, which is what keeps the deterministic
 *   facts authoritative.
 *
 * RETURNS null when the profile is missing the fields the request needs.
 */
export function demoInputFromProfile(
  profile: GuardianProfile
): GuardianDemoInput | null {
  const stageId = profile.stage?.id;
  const age = profile.identity?.age;
  const genderLabel = profile.identity?.gender;

  if (!stageId || typeof age !== "number") return null;

  /**
   * ⚠ TWO ID NAMESPACES EXIST IN THIS PROJECT.
   *
   * The fixed demo personas (`demo-m28` / `demo-f36`) do NOT use the same ids as
   * the step-form contract. Measured on `demo-f36`:
   *
   *   persona                          canonical
   *   stage.name  "青年期"              "兑 · 青年期"
   *   scenario.id "entrepreneurship"    "startup"
   *   task ids    "t1".."t8"            "startup-t1".."startup-t8"
   *
   * Sending persona ids straight to the workflow fails validation — correctly,
   * because the adapter must not accept an unknown scenario id. So the persona
   * ids are TRANSLATED into the canonical contract using the website's own
   * authoritative tables. The persona data itself is left untouched.
   */

  /** Canonical stage entry (authoritative for id AND full display name). */
  const canonicalStage = guardianStages.find((s) => s.id === stageId);
  if (!canonicalStage) return null;

  /**
   * Canonical scenario. Persona ids such as "entrepreneurship" are not in the
   * canonical list, so fall back to matching the persona's scenario NAME against
   * canonical scenario names (e.g. "创业场景" contains "创业").
   */
  const personaScenario = profile.scenario;
  let canonicalScenario = GUARDIAN_SCENARIOS.find(
    (s) => s.id === personaScenario?.id
  );
  if (!canonicalScenario && personaScenario?.name) {
    canonicalScenario = GUARDIAN_SCENARIOS.find(
      (s) =>
        personaScenario.name.includes(s.name) ||
        s.name.includes(personaScenario.name)
    );
  }
  if (!canonicalScenario) {
    canonicalScenario =
      GUARDIAN_SCENARIOS.find((s) => s.id === "general") ?? GUARDIAN_SCENARIOS[0];
  }
  if (!canonicalScenario) return null;

  /**
   * Translate completed tasks to canonical ids.
   *
   * Persona tasks carry short ids ("t1") but human labels that match the
   * canonical scenario task labels ("公司核名"), so the label is the reliable
   * join key. A task whose label cannot be matched is dropped rather than sent
   * as an id the workflow does not know.
   */
  const completedTaskIds: string[] = [];
  for (const task of profile.tasks) {
    if (task.status !== "done") continue;
    const match =
      canonicalScenario.tasks.find((t) => t.id === task.id) ??
      canonicalScenario.tasks.find((t) => t.label === task.label);
    if (match) completedTaskIds.push(match.id);
  }

  const gender: "male" | "female" = genderLabel === "女" ? "female" : "male";

  return {
    version: "guardian-demo-v1",
    identity: { age, gender, city: undefined },
    stage: { id: canonicalStage.id as GuardianDemoInput["stage"]["id"] },
    scenario: { id: canonicalScenario.id as GuardianDemoInput["scenario"]["id"] },
    completedTaskIds,
    selectedDimensionTags: [],
  };
}

/**
 * Build the request payload from the SAME deterministic input the local mock
 * adapter consumes. No field here is invented by the AI layer: age, stage,
 * scenario, tasks and progress all come from the website's own logic.
 *
 * @param input    the frozen GuardianDemoInput contract
 * @param scenarioName display name resolved from GUARDIAN_SCENARIOS
 *   (the stage name is NOT passed in — it is resolved from the stage id via
 *   getGuardianStageDisplayName, so callers cannot supply a divergent wording)
 */
export function buildAnalyzePayload(
  input: GuardianDemoInput,
  scenarioName: string,
  user: string = DIFY_USER_FALLBACK
): GuardianAnalyzePayload {
  /** Split the flat tag list into the five dimension groups Dify expects. */
  const groups: GuardianDimensionTagGroups = {
    wealth: [],
    health: [],
    travel: [],
    food: [],
    housing: [],
  };

  const DIMENSION_OF: Record<string, keyof GuardianDimensionTagGroups> = {
    // wealth
    budget: "wealth",
    insurance: "wealth",
    "business-account": "wealth",
    "tax-attention": "wealth",
    // health
    "annual-checkup-pending": "health",
    "sleep-attention": "health",
    "exercise-record": "health",
    "health-record": "health",
    // travel
    "frequent-travel": "travel",
    "document-check": "travel",
    "trip-planning": "travel",
    // food
    "irregular-meals": "food",
    "nutrition-record": "food",
    "meal-routine": "food",
    // housing
    renting: "housing",
    "housing-plan": "housing",
    renovation: "housing",
    "family-housing": "housing",
  };

  for (const tag of input.selectedDimensionTags) {
    const dim = DIMENSION_OF[tag];
    if (dim) groups[dim].push(tag);
  }

  /**
   * Always send the CANONICAL stage and scenario display names.
   *
   * The stored profile may carry a persona's short label ("青年期") or a legacy
   * spelling ("青少年期"); the canonical wording lives in
   * `guardianStages[].displayName` ("卦名 · 阶段名"). Resolving through that one
   * mapper — rather than trusting the caller or this module — means the AI layer
   * can never be told a stage name that contradicts the site's lifecycle data.
   */
  const canonicalScenario = GUARDIAN_SCENARIOS.find(
    (s) => s.id === input.scenario.id
  );

  return {
    identity: {
      age: input.identity.age,
      gender: input.identity.gender,
      city: input.identity.city ?? "",
    },
    stage: {
      id: input.stage.id,
      name: getGuardianStageDisplayName(input.stage.id),
    },
    scenario: {
      id: input.scenario.id,
      name: canonicalScenario?.name ?? scenarioName,
    },
    completedTaskIds: [...input.completedTaskIds],
    dimensionTags: groups,
    progressCompleted: input.completedTaskIds.length,
    progressTotal: 0, // filled by the caller, which knows the scenario task list
    user,
  };
}

/* ── The call ───────────────────────────────────────────────────────────── */

function err(
  code: GuardianAnalysisErrorCode,
  message?: string
): GuardianAnalysisResponse {
  return { ok: false, error: { code, message: message ?? SAFE_MESSAGE[code] } };
}

/**
 * POST the payload to the Adapter and return a normalized result or a safe error.
 * Never throws.
 */
export async function requestGuardianAnalysis(
  payload: GuardianAnalyzePayload
): Promise<GuardianAnalysisResponse> {
  const base = getAdapterUrl();
  if (!base) return err("NOT_CONFIGURED");

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), CLIENT_TIMEOUT_MS);

  let res: Response;
  try {
    res = await fetch(`${base}/guardian/analyze`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
  } catch (e) {
    clearTimeout(timer);
    const aborted = e instanceof DOMException && e.name === "AbortError";
    return err(aborted ? "ANALYSIS_TIMEOUT" : "ANALYSIS_UNAVAILABLE");
  } finally {
    clearTimeout(timer);
  }

  let body: unknown;
  try {
    body = await res.json();
  } catch {
    return err("INVALID_ANALYSIS_RESPONSE");
  }

  if (!res.ok) {
    /**
     * The Adapter returns { error: { code, message } }. Trust its code only if
     * it is one we know; otherwise fall back to a safe generic code so an
     * unexpected upstream value can never reach the UI.
     */
    const raw = body as { error?: { code?: string; message?: string } };
    const code = raw?.error?.code;
    if (typeof code === "string" && KNOWN_CODES.has(code)) {
      return err(code as GuardianAnalysisErrorCode);
    }
    return err(res.status >= 500 ? "SERVER_ERROR" : "ANALYSIS_UNAVAILABLE");
  }

  /** Validate the success envelope before handing it to the UI. */
  const ok = body as { analysis?: GuardianAnalysisResult };
  if (!ok?.analysis || typeof ok.analysis !== "object") {
    return err("INVALID_ANALYSIS_RESPONSE");
  }
  const a = ok.analysis;
  if (
    typeof a.summary !== "string" ||
    !Array.isArray(a.attentionItems) ||
    !a.dimensionNotes ||
    typeof a.disclaimer !== "string"
  ) {
    return err("INVALID_ANALYSIS_RESPONSE");
  }

  return { ok: true, analysis: a };
}
