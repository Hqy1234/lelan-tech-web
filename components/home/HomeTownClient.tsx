/**
 * LELAN TECHNOLOGY · Town V1.5 Client Island
 *
 * Phase 1E.4-B — now hosts the interactive Town Globe over the 2D fallback.
 *
 * ⚠ STATE ARCHITECTURE IS FROZEN. This file is the single owner of Town
 * selection state, and both renderers read from it:
 *
 *     HomeTownClient        owns `selectedId` + URL hash + aria-live
 *     TownGlobe             WebGL renderer  ─┐
 *     TownMapStage          2D renderer     ─┴─ both: { shops, selectedId, onSelect }
 *     TownServiceDrawer     HTML detail panel
 *
 * `TownGlobe` and `TownMapStage` hold NO selection state of their own.
 * They are swappable views over one source of truth. Do not duplicate state.
 *
 * Phase 1E.4-B changes:
 *   - `TownGlobe` is rendered as the primary desktop (≥1024px) renderer, with
 *     `TownMapStage` underneath as the always-present fallback / loading state.
 *   - Hash now accepts numeric aliases (`#shop-01` … `#shop-08`) in addition to
 *     the original slug form (`#shop-paper-teahouse`). The slug stays the
 *     canonical value written back to the URL so existing deep links keep
 *     working unchanged.
 *   - An `aria-live="polite"` status announces the selection for screen
 *     readers, since the canvas itself is aria-hidden.
 *
 * Layout (desktop ≥1024): [ index ~16% ] [ globe ~62% ] [ drawer ~22%, slight
 * overlap over the globe edge — contained, never overflowing the page ].
 * Tablet / mobile: index strip, then renderer, then drawer — normal flow.
 */

"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import {
  type TownShop,
  AGENT_ROLE_LABELS,
  DEFAULT_SHOP_ID,
} from "@/content/town";
import {
  TownMapStage,
  TownServiceDrawer,
} from "@/components/town/TownMapStage";
import { TownGlobe } from "@/components/town/TownGlobe";

const RADIO_NAME = "town-shop-select";

/* ── Hash helpers ──────────────────────────────────────────────────────── */

/**
 * Parse a location hash into a shop id.
 * Accepts both `#shop-01` (numeric alias) and `#shop-paper-teahouse` (slug).
 * Returns null when the hash is not a shop reference at all.
 */
function parseShopHash(hash: string, shops: ReadonlyArray<TownShop>): string | null {
  const numeric = /^#shop-(\d{2})$/i.exec(hash);
  if (numeric) {
    const n = numeric[1];
    return shops.find((s) => s.number === n)?.id ?? null;
  }
  const slug = /^#shop-([a-z0-9-]+)$/i.exec(hash);
  if (slug) {
    const id = slug[1];
    return shops.some((s) => s.id === id) ? id : null;
  }
  return null;
}

interface HomeTownClientProps {
  /** All 8 shops passed from the server component */
  shops: ReadonlyArray<TownShop>;
  /** Section status note */
  statusNote: string;
}

export function HomeTownClient({ shops, statusNote }: HomeTownClientProps) {
  const [selectedId, setSelectedId] = useState<string>(DEFAULT_SHOP_ID);

  /* ── URL hash ↔ selection bidirectional sync ─────────────── */

  useEffect(() => {
    const applyFromHash = () => {
      const hash = window.location.hash;
      if (!/^#shop-/i.test(hash)) return;
      const id = parseShopHash(hash, shops);
      if (id) {
        setSelectedId(id);
      } else {
        // Invalid shop hash → fall back to the default and normalise the URL.
        setSelectedId(DEFAULT_SHOP_ID);
        window.history.replaceState(null, "", `#shop-${DEFAULT_SHOP_ID}`);
      }
    };
    applyFromHash();
    window.addEventListener("hashchange", applyFromHash);
    return () => window.removeEventListener("hashchange", applyFromHash);
  }, [shops]);

  /** Selecting a shop updates state AND the hash, so deep links always work. */
  const handleSelect = useCallback((id: string) => {
    setSelectedId(id);
    if (typeof window !== "undefined") {
      // Canonical form stays the slug — numeric aliases remain readable input.
      window.history.replaceState(null, "", `#shop-${id}`);
    }
  }, []);

  /* ── Derived selected shop + agent role label ─────────────── */

  const selected = useMemo(
    () => shops.find((s) => s.id === selectedId) ?? shops[0],
    [shops, selectedId]
  );
  const agentRoleLabel = AGENT_ROLE_LABELS[selected.agentRole];

  /* ── 2D fallback renderer (shared by every non-globe path) ─── */

  const mapStage = <TownMapStage shops={shops} selectedId={selected.id} />;

  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:items-stretch lg:gap-4">
      {/* ── Left: compact 8-service index (desktop) ─────────────
          This is the PRIMARY accessible + SEO interface. It exists in the
          static HTML and never depends on the canvas. */}
      <nav
        aria-label="小镇服务索引"
        className="hidden shrink-0 overflow-hidden rounded-sm border border-rule bg-paper-pure lg:flex lg:w-[16%] lg:flex-col"
      >
        <p className="border-b border-rule px-3 py-2 font-mono text-[0.6rem] uppercase tracking-wider text-muted">
          01–08 · 服务索引
        </p>
        <ul className="divide-y divide-rule" role="list">
          {shops.map((shop) => {
            const isSelected = shop.id === selected.id;
            return (
              <li key={shop.id} className="relative">
                <input
                  type="radio"
                  name={RADIO_NAME}
                  id={`town-radio-${shop.id}`}
                  value={shop.id}
                  checked={isSelected}
                  onChange={() => handleSelect(shop.id)}
                  className="peer sr-only"
                  aria-label={`选择 ${shop.name}（${shop.number}）：${shop.plainLanguageService}`}
                />
                <label
                  htmlFor={`town-radio-${shop.id}`}
                  className={[
                    "flex cursor-pointer items-start gap-2 border-b border-rule px-2.5 py-2 transition-colors",
                    "hover:bg-paper/60",
                    "peer-checked:border-l-2 peer-checked:border-l-green peer-checked:bg-paper/80",
                    "peer-focus-visible:outline peer-focus-visible:outline-1 peer-focus-visible:outline-cinnabar",
                  ].join(" ")}
                >
                  <span
                    aria-hidden
                    className={[
                      "mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-sm border font-mono text-[0.55rem] uppercase tracking-wider",
                      isSelected
                        ? "border-green bg-green text-paper"
                        : "border-rule bg-paper text-muted",
                    ].join(" ")}
                  >
                    {shop.number}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span
                      className={[
                        "block truncate font-serif text-[0.8rem]",
                        isSelected ? "font-semibold text-ink" : "text-ink/90",
                      ].join(" ")}
                    >
                      {shop.name}
                    </span>
                    <span className="block truncate font-mono text-[0.6rem] text-muted">
                      {shop.agent}
                    </span>
                  </span>
                </label>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* ── Mobile / tablet horizontal index ──────────────────── */}
      <nav
        aria-label="小镇服务索引（移动）"
        className="flex w-full shrink-0 gap-1.5 overflow-x-auto rounded-sm border border-rule bg-paper-pure p-2 lg:hidden"
      >
        {shops.map((shop) => {
          const isSelected = shop.id === selected.id;
          return (
            <button
              key={shop.id}
              type="button"
              onClick={() => handleSelect(shop.id)}
              className={[
                "shrink-0 rounded-sm border px-2 py-1 font-mono text-[0.65rem] uppercase tracking-wider transition-colors",
                isSelected
                  ? "border-green bg-green text-paper"
                  : "border-rule bg-paper text-muted",
              ].join(" ")}
              aria-label={`选择 ${shop.name}`}
              aria-pressed={isSelected}
            >
              {shop.number}
            </button>
          );
        })}
      </nav>

      {/* ── Centre: the town renderer ───────────────────────────
          TownGlobe mounts a WebGL canvas only on capable desktops and only
          once this element nears the viewport; otherwise the 2D map is shown.
          Both read the same `selectedId` and emit the same `onSelect`.

          Height (Phase 1E.4-B1): the stage is now VIEWPORT-RELATIVE
          (`min(54vh, 500px)`) rather than a flat 560px. At 1440×900 the section
          header consumes ~379px, so a 560px stage ran past the fold and cut the
          sand-table's base off. 54vh/500px leaves the whole model visible with
          the header in view — Town reads as the spatial climax without the user
          needing to scroll within the section. Floored at 400px for short
          viewports so the globe never collapses. */}
      <div className="relative h-[400px] min-w-0 sm:h-[440px] lg:h-[min(54vh,500px)] lg:flex-1">
        <TownGlobe
          shops={shops}
          selectedId={selected.id}
          onSelect={handleSelect}
          fallback={
            <div className="h-full w-full" aria-hidden="true">
              {mapStage}
            </div>
          }
        />
      </div>

      {/* ── Right: selected service panel ───────────────────────
          Real HTML, never moved into the canvas. The small negative margin on
          large screens lets it overlap the globe edge for a foreground feel;
          it can never cross the section's right edge. */}
      <div className="w-full shrink-0 lg:flex lg:w-[22%] lg:min-w-[15rem] lg:-ml-4 lg:z-10">
        <TownServiceDrawer shop={selected} agentRoleLabel={agentRoleLabel} />
      </div>

      {/* ── Announcement for assistive tech ─────────────────────
          The canvas is aria-hidden, so selection changes are announced here. */}
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        已选择 {selected.number} {selected.name} · {selected.agent}
      </p>

      <p className="sr-only">{statusNote}</p>
    </div>
  );
}
