/**
 * LELAN TECHNOLOGY · Guardian Lifecycle Rail
 *
 * Phase 2 — Interactive 8-stage lifecycle coordinate (八卦·八阶段).
 *
 * Desktop: horizontal rail across the full width.
 * Mobile: horizontal scroll with snap points.
 *
 * Default active: 04 兑 · 青年期.
 *
 * Client component — minimal state: selected stage id only.
 */
"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { guardianStages, DEFAULT_STAGE_ID } from "@/content/guardian";
import { visualAssets } from "@/content/assets";
import type { GuardianStage } from "@/content/guardian";

interface GuardianLifecycleProps {
  /** Called when the user selects a stage — passes stage id */
  onStageChange?: (stageId: string) => void;
  /** Controlled selected stage (optional — if provided, component is controlled) */
  selectedId?: string;
}

function resolveStageAsset(assetId: string) {
  return (visualAssets as Record<string, { src: string; alt: string; width: number; height: number }>)[assetId] ?? null;
}

/**
 * Single stage node in the lifecycle rail.
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
  const asset = resolveStageAsset(stage.stageAssetId);

  return (
    <button
      type="button"
      onClick={() => onSelect(stage.id)}
      aria-pressed={isSelected}
      aria-label={`${stage.trigram} · ${stage.name}（${stage.ageRange}）`}
      className={[
        "group relative flex flex-col items-center gap-1.5 rounded-sm p-2 transition-all",
        "focus-visible:outline focus-visible:outline-1 focus-visible:outline-cinnabar focus-visible:outline-offset-1",
        isSelected
          ? "bg-paper-pure ring-1 ring-green/40"
          : "hover:bg-paper/60",
      ].join(" ")}
    >
      {/* Trigram badge */}
      <span
        className={[
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border font-serif text-sm transition-all",
          isSelected
            ? "border-green bg-green text-paper"
            : "border-rule bg-paper text-muted group-hover:border-green/40 group-hover:text-green",
        ].join(" ")}
        aria-hidden
      >
        {stage.trigram}
      </span>

      {/* Stage image thumbnail */}
      {asset && (
        <div
          className={[
            "relative overflow-hidden rounded-sm transition-all",
            isSelected ? "h-14 w-14 ring-1 ring-green/30" : "h-10 w-10 opacity-70 group-hover:opacity-90",
          ].join(" ")}
          aria-hidden
        >
          <Image
            src={asset.src}
            alt={asset.alt}
            fill
            sizes="56px"
            className="object-cover"
          />
        </div>
      )}

      {/* Stage label */}
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
 * Horizontal connector lines between stages.
 * Rendered as a thin rule spanning between nodes.
 */
function RailConnector() {
  return (
    <span
      aria-hidden
      className="inline-block h-px w-4 shrink-0 bg-rule sm:w-6"
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
          人生坐标 · 纵轴
        </span>
        <span className="h-px flex-1 bg-rule" aria-hidden />
      </div>

      {/* Lifecycle rail — horizontal scroll */}
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

      {/* Active stage detail */}
      <div className="flex items-center gap-4 rounded-sm border border-rule bg-paper p-3 sm:p-4">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-green bg-green font-serif text-sm text-paper">
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
        <div className="shrink-0 text-right">
          <p className="font-mono text-[0.6rem] uppercase tracking-wider text-muted">
            场景
          </p>
          <p className="mt-0.5 text-xs text-muted">{activeStage.sceneLabel}</p>
        </div>
      </div>

      {/* Hidden — passes active stage id for parent to read */}
      <input
        type="hidden"
        name="guardian-stage"
        value={activeStage.id}
        aria-label="当前选中阶段"
      />
    </div>
  );
}
