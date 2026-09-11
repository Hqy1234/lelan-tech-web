/**
 * LELAN TECHNOLOGY · Guardian Lifecycle Rail
 *
 * Phase 1E.4-A — Y-axis rail, compacted + current stage always visible.
 *
 * This rail deliberately still has NO per-stage thumbnails. Phase 1E.3-A
 * removed the eight 40–56px images because they were noise, and that call
 * stands — the stage SUBJECT is now one large plate in GuardianArchive that
 * follows the selection.
 *
 * Phase 1E.4-A changes:
 *   - The rail no longer force-centres with `sm:justify-center` while also
 *     being `overflow-x-auto` (the two fought each other and could clip the
 *     leading stage at tablet widths).
 *   - On mobile the rail scrolls horizontally; the ACTIVE stage is scrolled
 *     into view whenever selection changes, so the current coordinate is
 *     never off-screen (explicit Phase 1E.4-A requirement).
 *   - The active-stage caption no longer repeats the scene label that
 *     GuardianTaskFlow already prints directly below it.
 *
 * Default active: 04 兑 · 青年期.
 */

"use client";

import { useState, useCallback, useRef, useEffect } from "react";
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

/** Single stage node — structural marks only, no thumbnail. */
function StageNode({
  stage,
  isSelected,
  onSelect,
  nodeRef,
}: {
  stage: GuardianStage;
  isSelected: boolean;
  onSelect: (id: string) => void;
  /**
   * Ref object (not a callback) for the active node.
   * Passing a ref OBJECT avoids re-attaching the ref on every render —
   * an inline callback ref would churn on each parent render.
   */
  nodeRef?: React.RefObject<HTMLButtonElement | null>;
}) {
  return (
    <button
      ref={nodeRef}
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
      <span className="font-mono text-[0.55rem] uppercase tracking-wider text-muted/60">
        {stage.order}
      </span>

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

      <span
        className={[
          "whitespace-nowrap font-mono text-[0.6rem] uppercase tracking-wider transition-colors",
          isSelected ? "text-ink" : "text-muted group-hover:text-ink/80",
        ].join(" ")}
      >
        {stage.name}
      </span>

      <span className="font-mono text-[0.55rem] text-muted/70">
        {stage.ageRange}
      </span>
    </button>
  );
}

/** Connector line between stage nodes. */
function RailConnector() {
  return (
    <span
      aria-hidden
      className="lelan-line-coordinate inline-block h-px w-5 shrink-0 bg-rule-strong sm:w-7"
    />
  );
}

export function GuardianLifecycle({
  onStageChange,
  selectedId: controlledId,
}: GuardianLifecycleProps) {
  const [internalSelected, setInternalSelected] = useState(DEFAULT_STAGE_ID);
  const selected = controlledId ?? internalSelected;

  const activeRef = useRef<HTMLButtonElement | null>(null);

  const handleSelect = useCallback(
    (id: string) => {
      setInternalSelected(id);
      onStageChange?.(id);
    },
    [onStageChange]
  );

  /**
   * Keep the current stage inside the visible scroll area.
   * On desktop the whole rail fits, so this is a no-op visually.
   * Respects reduced-motion by scrolling without animation.
   */
  useEffect(() => {
    const el = activeRef.current;
    if (!el) return;
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({
      inline: "center",
      block: "nearest",
      behavior: reduced ? "auto" : "smooth",
    });
  }, [selected]);

  const activeStage =
    guardianStages.find((s) => s.id === selected) ?? guardianStages[0];

  return (
    <div className="flex flex-col gap-3">
      {/* Rail label */}
      <div className="flex items-center gap-3">
        <span className="font-mono text-[0.65rem] uppercase tracking-wider text-muted">
          人生坐标 · 纵轴 · 八阶段
        </span>
        <span aria-hidden className="h-px flex-1 bg-rule" />
        <span className="font-mono text-[0.6rem] uppercase tracking-wider text-muted/60">
          当前 <span className="text-ink/80">{activeStage.order}</span> · {activeStage.trigram}
        </span>
      </div>

      {/* Lifecycle rail — horizontal scroll on mobile, fits on desktop */}
      <div
        role="list"
        aria-label="八阶段生命周期坐标"
        className="flex items-center overflow-x-auto pb-2"
        style={{ scrollSnapType: "x proximity", WebkitOverflowScrolling: "touch" }}
      >
        {guardianStages.map((stage, idx) => (
          <div key={stage.id} role="listitem" className="flex shrink-0 items-center">
            <StageNode
              stage={stage}
              isSelected={stage.id === selected}
              onSelect={handleSelect}
              nodeRef={stage.id === selected ? activeRef : undefined}
            />
            {idx < guardianStages.length - 1 && <RailConnector />}
          </div>
        ))}
      </div>

      {/* NOTE (Phase 1E.4-A): the active-stage caption box that used to sit
          here was removed. It repeated trigram + name + age range, which the
          archive spread already states authoritatively in exactly one place
          (the stage-subject caption). The current stage is still identifiable
          in the rail itself (filled ink node + the `当前 04 · 兑` rail label),
          and GuardianTaskFlow prints the stage's scene label right below. */}
    </div>
  );
}
