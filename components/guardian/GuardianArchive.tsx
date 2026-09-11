/**
 * LELAN TECHNOLOGY · Guardian Archive Client Island
 *
 * Phase 1E.4-A — Subject Restoration.
 *
 * Owns the selected-stage state for the whole Guardian archive spread.
 *
 * Layout (one archive sheet, two columns — nothing overlaps):
 *
 *   Desktop ≥1024
 *   ┌──────────────────────────┬──────────────────────────────────┐
 *   │ CURRENT LIFE STAGE        │ stage identity + archive marker  │
 *   │ VISUAL  (one large image) │ Y-axis 八阶段 rail               │
 *   │                           │ X-axis 当前事项链                │
 *   └──────────────────────────┴──────────────────────────────────┘
 *
 *   Mobile <1024 — stage visual first, then identity, then rail/tasks.
 *
 * The large stage visual follows the selection: switching stage swaps the
 * ONE subject image. All 8 stage images are never shown at once — that
 * 8-thumbnail rail was correctly identified as noise and stays removed.
 *
 * The GuardianSeal is the single small glass-free archive mark here; the
 * only glass surface in this section is the live-coordinate panel rendered
 * by HomeGuardian.
 *
 * Server-rendered content + one small client island (this file).
 */
"use client";

import Image from "next/image";
import { useState, useCallback } from "react";
import { guardianStages, DEFAULT_STAGE_ID } from "@/content/guardian";
import { visualAssets, type VisualAsset } from "@/content/assets";
import { GuardianLifecycle } from "./GuardianLifecycle";
import { GuardianTaskFlow } from "./GuardianTaskFlow";
import { GuardianSeal } from "./GuardianSeal";

function resolveAsset(assetId: string): VisualAsset | null {
  return (visualAssets as Record<string, VisualAsset>)[assetId] ?? null;
}

export function GuardianArchive() {
  const [selectedId, setSelectedId] = useState<string>(DEFAULT_STAGE_ID);
  const activeStage =
    guardianStages.find((s) => s.id === selectedId) ?? guardianStages[0];

  const handleStageChange = useCallback((id: string) => {
    setSelectedId(id);
  }, []);

  const stageAsset = resolveAsset(activeStage.stageAssetId);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-6">
      {/* ── LEFT COLUMN — the subject ────────────────────────────────────
          This is the thing the eye should land on: one large plate showing
          the currently selected life stage. */}
      <div className="lg:col-span-6">
        <div className="flex items-baseline justify-between gap-3">
          <span className="font-mono text-[0.6rem] uppercase tracking-wider text-muted">
            当前人生阶段 · CURRENT LIFE STAGE
          </span>
          <span className="font-mono text-[0.6rem] uppercase tracking-wider text-muted/60">
            {activeStage.order} / 08
          </span>
        </div>

        <div className="lelan-stage-subject mt-2 rounded-sm p-2">
          <div className="lelan-stage-subject-media relative w-full rounded-sm">
            {stageAsset && (
              <Image
                key={activeStage.id}
                src={stageAsset.src}
                alt={`${activeStage.trigram} · ${activeStage.name}（${activeStage.ageRange}）阶段视觉`}
                fill
                priority={activeStage.id === DEFAULT_STAGE_ID}
                sizes="(max-width: 1023px) 100vw, 50vw"
                className="object-cover"
              />
            )}
          </div>

          {/* Caption bar — ties the plate to the coordinate system.
              The seal sits on the right as the archive identity mark; it is
              deliberately NOT a floating overlay (the old version pinned it at
              left:-12px over the sheet, which buried the archive behind it). */}
          <div className="lelan-stage-subject-caption mt-2 flex items-center justify-between gap-3 rounded-sm px-3 py-1.5">
            <div className="min-w-0">
              <p className="font-serif text-base text-ink">
                {activeStage.trigram} · {activeStage.name}
              </p>
              <p className="mt-0.5 font-mono text-[0.6rem] text-muted">
                {activeStage.ageRange}
              </p>
            </div>
            <GuardianSeal
              state="partial"
              size="sm"
              trigram={activeStage.trigram}
              stageLabel={activeStage.name}
              ariaLabel={`乐懒守护符 · ${activeStage.trigram} · ${activeStage.name}`}
            />
          </div>
        </div>

        <p className="mt-2 text-xs leading-relaxed text-muted/70">
          产品界面示意，并非识别用户真实年龄阶段。
        </p>
      </div>

      {/* ── RIGHT COLUMN — coordinate system ─────────────────────────────
          Y axis (八阶段 rail) + X axis (current task chain). */}
      <div className="flex flex-col gap-5 lg:col-span-6">
        <GuardianLifecycle
          selectedId={selectedId}
          onStageChange={handleStageChange}
        />
        <GuardianTaskFlow stage={activeStage} />
      </div>
    </div>
  );
}
