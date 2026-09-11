/**
 * LELAN TECHNOLOGY · Guardian Lifecycle Rail
 *
 * Phase 1E.3-A — Editorial stage rail (no thumbnails).
 *
 * Desktop: horizontal rail across the full width, position nodes + coordinate lines.
 * Mobile: horizontal scroll with snap points.
 *
 * The 8 stage thumbnails (40–56px) that previously sat on each node
 * have been removed from the main rail. They were visual noise; the
 * rail is now defined by structural marks: trigram · name · age range.
 * Stage imagery is preserved in assets.ts for /profile detail views
 * and remains available if needed later.
 *
 * Default active: 04 兑 · 青年期.
 *
 * Client component — minimal state: selected stage id only.
 */
"use client";

import { useState, useCallback } from "react";
import {
  guardianStages,
  DEFAULT_STAGE_ID,
  type GuardianStage,
} from "@/content/guardian";

interface GuardianLifecycleProps {
  /** Called when the user selects a stage — passes stage id */
  onStageChange?: (stageId: string) => void;
  /** Controlled selected stage (optional — if provided, component is controlled) */
  selectedId?: string;
}

/**
 * Single stage node in the lifecycle rail.
 * Phase 1E.3-A: structural marks only, no thumbnail.
 */
function StageNode({
  stage,
  isSelected,
  onSelect,
}: {
  stage: GuardianStage;
  isSelected: boolean;
  onSelect: (id: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(stage.id)}
      aria-pressed={isSelected}
      aria-label={`${stage.trigram} · ${stage.name}（${stage.ageRange}）`}
      className={[
        "group relative flex shrink-0 flex-col items-center gap-1 rounded-sm px-2 py-2 transition-colors",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-cinnabar focus-visible:outline-offset-2",
        isSelected ? "bg-paper-pure" : "hover:bg-paper-pure/60",
      ].join(" ")}
    >
      {/* Order number — micro */}
      <span className="font-mono text-[0.55rem] uppercase tracking-wider text-muted/60">
        {stage.order}
      </span>

      {/* Trigram node — primary visual mark */}
      <span
        className={[
          "flex h-9 w-9 items-center justify-center rounded-full border font-serif text-sm transition-colors",
          isSelected
            ? "border-ink bg-ink text-paper"
            : "border-rule bg-paper text-muted group-hover:border-green/50 group-hover:text-green",
        ].join(" ")}
        aria-hidden
      >
        {stage.trigram}
      </span>

      {/* Stage name */}
      <span
        className={[
          "whitespace-nowrap font-mono text-[0.6rem] uppercase tracking-wider transition-colors",
          isSelected ? "text-ink" : "text-muted group-hover:text-ink/80",
        ].join(" ")}
      >
        {stage.name}
      </span>

      {/* Age range */}
      <span className="font-mono text-[0.55rem] text-muted/70">
        {stage.ageRange}
      </span>
    </button>
  );
}

/**
 * Connector line between stage nodes.
 */
function RailConnector() {
  return (
    <span
      aria-hidden
      className="lelan-line-coordinate inline-block h-px w-6 shrink-0 bg-rule-strong sm:w-8"
    />
  );
}

export function GuardianLifecycle({ onStageChange, selectedId: controlledId }: GuardianLifecycleProps) {
  const [internalSelected, setInternalSelected] = useState(DEFAULT_STAGE_ID);
  const selected = controlledId ?? internalSelected;

  const handleSelect = useCallback(
    (id: string) => {
      setInternalSelected(id);
      onStageChange?.(id);
    },
    [onStageChange]
  );

  const activeStage = guardianStages.find((s) => s.id === selected) ?? guardianStages[0];

  return (
    <div className="flex flex-col gap-4">
      {/* Section label */}
      <div className="flex items-center gap-3">
        <span className="font-mono text-[0.65rem] uppercase tracking-wider text-muted">
          人生坐标 · 纵轴 · 八阶段
        </span>
        <span className="h-px flex-1 bg-rule" aria-hidden />
      </div>

      {/* Lifecycle rail — horizontal scroll on mobile, centered on desktop */}
      <div
        role="list"
        aria-label="八阶段生命周期坐标"
        className="flex items-center gap-0 overflow-x-auto pb-2 sm:justify-center sm:overflow-x-visible"
        style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}
      >
        {guardianStages.map((stage, idx) => (
          <div
            key={stage.id}
            role="listitem"
            className="flex shrink-0 items-center"
          >
            <StageNode
              stage={stage}
              isSelected={stage.id === selected}
              onSelect={handleSelect}
            />
            {idx < guardianStages.length - 1 && (
              <RailConnector />
            )}
          </div>
        ))}
      </div>

      {/* Active stage detail — current coordinate caption */}
      <div
        className={[
          "flex items-center gap-4 rounded-sm border p-3 sm:p-4",
          "border-green/30 bg-green/5",
        ].join(" ")}
      >
        <span
          aria-hidden
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ink bg-ink font-serif text-sm text-paper"
        >
          {activeStage.trigram}
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-serif text-base font-medium text-ink">
            {activeStage.trigram} · {activeStage.name}
          </p>
          <p className="mt-0.5 font-mono text-xs text-muted">
            {activeStage.ageRange}
          </p>
        </div>
        <div className="hidden shrink-0 text-right sm:block">
          <p className="lelan-archive-id">场景</p>
          <p className="mt-0.5 max-w-[12rem] text-xs text-muted">
            {activeStage.sceneLabel}
          </p>
        </div>
      </div>
    </div>
  );
}
