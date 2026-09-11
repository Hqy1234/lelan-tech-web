/**
 * LELAN TECHNOLOGY · Town Map Stage
 *
 * Phase 1E.4-A — DE-NOISED, and held stable as the renderer seam.
 *
 * IMPORTANT — this component is a SEAM, not a finished renderer.
 * The next phase replaces or sits alongside it with a real WebGL/R3F
 * "eastern digital town sand-table" (TownGlobe). Therefore Phase 1E.4-A
 * deliberately does NOT invest further in this CSS map. It only removes
 * what was actively harmful and keeps this component's contract frozen.
 *
 * Contract that MUST NOT change (so TownGlobe can be swapped in):
 *   props in  : { shops, selectedId, stageLabel? }
 *   emits out : nothing — selection is owned by the client island
 *               (HomeTownClient owns `selectedId`; the renderer is stateless)
 *   data      : `content/town.ts` remains the single source of truth,
 *               including the locked `plot {x, y}` coordinates for all 8 shops.
 *
 * Phase 1E.4-A removals:
 *   - Foreground eave wedges (`.lelan-town-fg-eave-*`): two 45%-wide × 18%-tall
 *     dark gradient clip-path shapes that read as smudges over the ground plane
 *     and stole attention from the plot labels.
 *   - The perspective wrapper stays, but the map is no longer asked to fake
 *     depth it cannot honestly produce.
 *
 * Layers (kept):
 *   Layer 0  BACKGROUND TERRAIN       — distant silhouette (CSS-only)
 *   Layer 1  GROUND PLANE             — SVG road grid
 *   Layer 2  BUILDING / PLOT VISUAL   — HTML plot elements
 *   Layer 3  LABELS / MARKERS         — shop number + name + dim badges
 *   Layer 4  SELECTED DETAIL          — service drawer (separate element)
 */

import Image from "next/image";
import { visualAssets } from "@/content/assets";
import type { TownShop } from "@/content/town";

/* ========================================================================
   Spatial helpers
   ======================================================================== */

/**
 * Compute the top-left % position of a plot from its normalized (0–100) coord.
 * Plot CSS width is `PLOT_W%` (enlarged in R1 for visual anchoring).
 */
const PLOT_W = 16; // plot width (% of map container) — was 12
const PLOT_H = 22; // plot height (% of map container) — was 18
const VIEW_W = 100;
const VIEW_H = 100;

export function plotStyle(coord: { x: number; y: number }) {
  const left = `calc(${coord.x}% - ${PLOT_W / 2}%)`;
  const top = `calc(${coord.y}% - ${PLOT_H / 2}%)`;
  return {
    left,
    top,
    width: `${PLOT_W}%`,
    height: `${PLOT_H}%`,
  } as const;
}

export const TOWN_VIEW = { width: VIEW_W, height: VIEW_H };

/* ========================================================================
   Plot rendering (real building vs architectural volume)
   ======================================================================== */

function resolveAsset(id: string | undefined) {
  if (!id) return null;
  return (visualAssets as Record<string, { src: string; alt: string }>)[id] ?? null;
}

interface PlotViewProps {
  shop: TownShop;
  isSelected: boolean;
}

function PlotView({ shop, isSelected }: PlotViewProps) {
  const building = resolveAsset(shop.buildingAssetId);
  const hasRealBuilding = shop.hasBuildingAsset && building;

  return (
    <div
      className="absolute"
      style={plotStyle(shop.plot)}
      data-shop-id={shop.id}
      aria-hidden
    >
      {/* L2: plot base */}
      <div
        className={[
          hasRealBuilding
            ? "lelan-plot-hover relative h-full w-full"
            : "lelan-plot-placeholder lelan-plot-hover lelan-plot-future relative h-full w-full overflow-hidden",
          isSelected ? "border-ink bg-paper-pure" : "",
        ].join(" ")}
        data-selected={isSelected ? "true" : "false"}
      >
        {hasRealBuilding ? (
          // L2 real building: framed showcase window (not transparent cutout)
          <div className="lelan-town-building-frame h-full w-full overflow-hidden">
            <Image
              src={building!.src}
              alt={building!.alt}
              fill
              sizes="(max-width: 640px) 30vw, (max-width: 1024px) 22vw, 16vw"
              className="object-cover"
            />
            {/* Subtle glass reflection at the top edge */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 z-10 h-1/4 bg-gradient-to-b from-white/20 to-transparent"
            />
          </div>
        ) : (
          // L2 placeholder: architectural volume (R1)
          <PlotPlaceholder shop={shop} />
        )}

        {/* L3 marker: shop number + name (always real HTML) */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-paper-pure/85 px-1.5 py-1">
          <div className="flex items-baseline gap-1.5">
            <span className="font-mono text-[0.55rem] uppercase tracking-wider text-muted">
              {shop.number}
            </span>
            <span
              className={[
                "truncate font-serif text-[0.7rem]",
                isSelected ? "font-semibold text-ink" : "text-ink/90",
              ].join(" ")}
              title={shop.name}
            >
              {shop.name}
            </span>
          </div>
        </div>

        {/* Selected: stronger marker dot */}
        {isSelected && (
          <span
            aria-hidden
            className="absolute right-1.5 top-1.5 z-10 h-2 w-2 rounded-full bg-cinnabar shadow-[0_0_0_3px_rgba(155,58,47,0.15)]"
          />
        )}
      </div>
    </div>
  );
}

/**
 * R1 — Future building slot now reads as an architectural volume.
 *   - Solid paper base with subtle gradient
 *   - Vertical accent line on the left = building edge / column
 *   - Horizontal roofline band near top = cornice
 *   - Strong contrast with dashed placeholder, looks like a real (paper)
 *     mass waiting to be built.
 */
function PlotPlaceholder({ shop }: { shop: TownShop }) {
  return (
    <div className="absolute inset-0">
      {/* Vertical column edge — left side */}
      <div
        aria-hidden
        className="absolute left-2 top-2 bottom-2 w-px bg-rule-strong/35"
      />
      {/* Cornice band — top */}
      <div
        aria-hidden
        className="absolute left-2 right-2 top-3 h-1 bg-rule-strong/30"
      />
      {/* Foundation line — bottom */}
      <div
        aria-hidden
        className="absolute left-2 right-2 bottom-2 h-px bg-rule-strong/40"
      />

      {/* Centered content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5 px-2 text-center">
        <span className="font-mono text-[0.5rem] uppercase tracking-[0.2em] text-muted/60">
          待建体量
        </span>
        <span className="font-serif text-[0.7rem] text-ink/85">
          {shop.name}
        </span>
        <span className="font-mono text-[0.48rem] uppercase tracking-wider text-muted/55">
          {shop.dimension}
        </span>
      </div>
    </div>
  );
}

/* ========================================================================
   Road SVG (Layer 1)
   ======================================================================== */

function TownRoads() {
  return (
    <svg
      aria-hidden
      focusable="false"
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
    >
      {/* Main east-west road (mid) */}
      <line
        x1="0"
        y1="50"
        x2={VIEW_W}
        y2="50"
        stroke="rgba(141, 124, 96, 0.4)"
        strokeWidth="0.6"
      />
      {/* Main north-south road */}
      <line
        x1="50"
        y1="0"
        x2="50"
        y2={VIEW_H}
        stroke="rgba(141, 124, 96, 0.32)"
        strokeWidth="0.6"
      />
      {/* Secondary lower east-west road */}
      <line
        x1="0"
        y1="75"
        x2={VIEW_W}
        y2="75"
        stroke="rgba(141, 124, 96, 0.22)"
        strokeWidth="0.4"
        strokeDasharray="0.5 0.5"
      />
      {/* Connector segments from plots to main road (subtle) */}
      {[
        { x: 20, y: 28 },
        { x: 35, y: 28 },
        { x: 50, y: 28 },
        { x: 65, y: 28 },
        { x: 80, y: 28 },
        { x: 35, y: 62 },
        { x: 50, y: 62 },
        { x: 65, y: 62 },
      ].map((p, i) => (
        <line
          key={`c-${i}`}
          x1={p.x}
          y1={p.y + PLOT_H / 2}
          x2={p.x}
          y2={p.y < 50 ? 50 - 0.4 : p.y < 70 ? 75 - 0.4 : 75 - 0.4}
          stroke="rgba(141, 124, 96, 0.16)"
          strokeWidth="0.3"
          strokeDasharray="0.4 0.4"
        />
      ))}
    </svg>
  );
}

/* ========================================================================
   Main TownMapStage component
   ======================================================================== */

export interface TownMapStageProps {
  shops: ReadonlyArray<TownShop>;
  selectedId: string;
  /** Stage section label (e.g. "成果小镇 · 街景") */
  stageLabel?: string;
}

export function TownMapStage({
  shops,
  selectedId,
  stageLabel = "成果小镇 · 街景",
}: TownMapStageProps) {
  return (
    <div
      className="lelan-perspective relative h-full w-full"
      role="region"
      aria-label={`${stageLabel}（地图视角，所有 8 个服务坐标）`}
    >
      {/* L1 ground plane + L0 terrain (CSS-driven) */}
      <div
        className="lelan-town-ground lelan-town-grid lelan-depth-1 lelan-town-map-container relative h-full w-full overflow-visible rounded-sm border border-rule"
      >
        {/* L0: very subtle terrain horizon (CSS-only) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-[rgba(196,207,193,0.18)] to-transparent"
        />
        {/* L1 roads (SVG) */}
        <TownRoads />

        {/* Coordinate crosshair hint (top corners) */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-2 top-2 font-mono text-[0.55rem] uppercase tracking-wider text-muted/60"
        >
          T · 街景 · 100 × 100
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute right-2 top-2 font-mono text-[0.55rem] uppercase tracking-wider text-muted/60"
        >
          {stageLabel}
        </div>

        {/* L2 plots */}
        {shops.map((shop) => (
          <PlotView
            key={shop.id}
            shop={shop}
            isSelected={shop.id === selectedId}
          />
        ))}

        {/* Foreground ground edge — paper ground line */}
        <div aria-hidden className="lelan-town-ground-edge" />
      </div>
    </div>
  );
}

/* ========================================================================
   Town Service Archive Drawer (Layer 4)
   ======================================================================== */

export interface TownServiceDrawerProps {
  shop: TownShop;
  agentRoleLabel: string;
}

export function TownServiceDrawer({ shop, agentRoleLabel }: TownServiceDrawerProps) {
  return (
    <aside
      aria-label={`${shop.name} 档案详情`}
      className="lelan-corner lelan-glass-raised relative flex flex-col rounded-sm p-4 sm:p-5"
    >
      {/*
        Header (Phase 1E.4-B1).

        The audit found the "ARCHIVE · SHOP-01" label sat only ~7px above the
        shop name, which read as a collision. The archive ID is now in NORMAL
        FLOW as the first line of a header block, followed by an explicit 18px
        of breathing room above the shop name — a clear vertical hierarchy:
        archive ID → 18px → shop identity.

        Kept as a fixed 18px gap (not `mt-auto`), because an elastic gap pushed
        the two ~50px apart, which over-corrected into a disconnected header.
        Implemented as spacing only: no border, no extra label, no decoration.
      */}
      <div className="flex flex-col">
        <p className="lelan-archive-id">ARCHIVE · SHOP-{shop.number}</p>

        <h3 className="mt-[18px] font-serif text-lg leading-tight text-ink sm:text-xl">
          {shop.name}
        </h3>
        <p className="mt-1 text-xs text-muted">{shop.plainLanguageService}</p>
      </div>

      {/*
        Body — a fixed generous gap (pt-6) below the identity block. The audit
        found the drawer clustered at the top leaving the lower right empty; a
        pure push-to-bottom overshot; pt-6 plus the taller stage now spans the
        panel evenly without stranding whitespace inside the header.
      */}
      <div className="flex flex-col gap-3 pt-6">
        <p className="text-xs leading-relaxed text-ink/85 sm:text-sm">
          {shop.shortDescription}
        </p>

        <dl className="grid grid-cols-2 gap-x-4 gap-y-2 border-t border-rule pt-3">
          <div>
            <dt className="font-mono text-[0.6rem] uppercase tracking-wider text-muted">
              服务人格
            </dt>
            <dd className="mt-0.5 font-serif text-sm text-ink">{shop.agent}</dd>
          </div>
          <div>
            <dt className="font-mono text-[0.6rem] uppercase tracking-wider text-muted">
              维度
            </dt>
            <dd className="mt-0.5 text-sm text-ink">{shop.dimension}</dd>
          </div>
          <div className="col-span-2">
            <dt className="font-mono text-[0.6rem] uppercase tracking-wider text-muted">
              定位
            </dt>
            <dd className="mt-0.5 text-xs text-muted">{agentRoleLabel}</dd>
          </div>
        </dl>

        <div className="flex items-center justify-between gap-3 border-t border-rule pt-3">
          <span
            className={[
              "rounded-sm px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-wider",
              shop.availability === "preview"
                ? "border border-green/30 bg-green/10 text-green"
                : "border border-rule bg-paper text-muted",
            ].join(" ")}
          >
            {shop.availability === "preview" ? "Preview" : "Concept"}
          </span>
          <p className="text-[0.65rem] text-muted/80">
            实际功能入口随版本逐步开放
          </p>
        </div>
      </div>
    </aside>
  );
}
