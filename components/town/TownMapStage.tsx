/**
 * LELAN TECHNOLOGY · Town Map Stage
 *
 * Phase 1E.3-B — Spatial Product Interface.
 *
 * Renders the eastern spatial view of the town using SVG + HTML:
 *
 *   Layer 0  BACKGROUND TERRAIN
 *     CSS-only distant architectural silhouette + warm horizon highlight
 *
 *   Layer 1  GROUND PLANE
 *     SVG ground rectangle with road grid (.lelan-town-grid)
 *     1 main east-west road + 1 north-south road + 1 secondary E-W road
 *
 *   Layer 2  BUILDING / PLOT VISUAL
 *     HTML absolutely-positioned plot elements:
 *       - 2 plots have real building image (论文茶寮, 课题小铺)
 *       - 6 plots show architectural placeholder (future building slot)
 *
 *   Layer 3  LABELS / MARKERS
 *     HTML shop number + name + dimension badges
 *     Selected plot shows stronger border + active node + small elevation
 *
 *   Layer 4  SELECTED DETAIL
 *     Below the map: "Town Service Archive Drawer"
 *     Contains shop info + agent identity + action area
 *
 * The plot coordinates are passed in from content/town.ts (normalized 0–100).
 * Buildings remain replaceable: only the image is keyed off
 * `buildingAssetId` in the plot rendering — swap asset, not the map.
 *
 * Desktop (≥641px):
 *   perspective: 1200px, ground rotateX(3deg), building images stay upright
 * Mobile (≤640px):
 *   All perspective/rotateX disabled. Layout becomes a 2-row stacked
 *   composition (mini map → service drawer → compact index).
 *
 * Accessibility:
 *   - The map is a presentation component. Selection is keyboard-driven
 *     by a real radio group in the parent (HomeTownClient).
 *   - Decorative SVG is aria-hidden / pointer-events-none.
 *   - Shop name + number are real HTML inside each plot.
 */

import Image from "next/image";
import { visualAssets } from "@/content/assets";
import type { TownShop } from "@/content/town";

/* ========================================================================
   Spatial helpers
   ======================================================================== */

/**
 * Compute the top-left % position of a plot from its normalized (0–100) coord.
 * Plot CSS width is `PLOT_W%`; left/top account for centering the plot
 * at the given coordinate.
 */
const PLOT_W = 12; // plot width (% of map container)
const PLOT_H = 18; // plot height (% of map container)
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
   Plot rendering (real building vs placeholder)
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
              sizes="(max-width: 640px) 25vw, (max-width: 1024px) 18vw, 12vw"
              className="object-cover"
            />
            {/* Subtle glass reflection at the top edge */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 z-10 h-1/4 bg-gradient-to-b from-white/20 to-transparent"
            />
          </div>
        ) : (
          // L2 placeholder: architectural frame, no fake image
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

function PlotPlaceholder({ shop }: { shop: TownShop }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 px-2 text-center">
      <span className="font-mono text-[0.55rem] uppercase tracking-wider text-muted/70">
        未来建筑位
      </span>
      <span className="font-serif text-[0.7rem] text-ink/80">
        {shop.name}
      </span>
      <span className="font-mono text-[0.5rem] uppercase tracking-wider text-muted/60">
        {shop.dimension}
      </span>
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
        className="lelan-town-ground lelan-town-grid lelan-depth-1 relative h-full w-full overflow-hidden rounded-sm border border-rule"
        style={{ minHeight: "min(60vh, 560px)" }}
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

        {/* Foreground occlusion: a few subtle eaves at the bottom corners
            — purely CSS / pseudo-elements to add depth without images */}
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-t from-[rgba(141,124,96,0.10)] to-transparent"
        />
        {/* Phase 1E.3-C — corner eaves for 3-plane depth */}
        <div aria-hidden className="lelan-town-fg-eave-left" />
        <div aria-hidden className="lelan-town-fg-eave-right" />
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
      className="lelan-corner lelan-glass-raised relative rounded-sm p-4 sm:p-5"
    >
      {/* Archive ID — demoted, top right */}
      <p className="lelan-archive-id absolute right-3 top-3 z-10">
        ARCHIVE · SHOP-{shop.number}
      </p>

      <div className="flex flex-col gap-3">
        <div>
          <p className="font-mono text-[0.65rem] uppercase tracking-wider text-muted">
            服务档案
          </p>
          <h3 className="mt-1 font-serif text-lg text-ink sm:text-xl">
            {shop.name}
          </h3>
          <p className="mt-0.5 text-xs text-muted">
            {shop.plainLanguageService}
          </p>
        </div>

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
