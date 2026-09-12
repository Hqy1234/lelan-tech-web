/**
 * LELAN TECHNOLOGY · Town V3 · Presentation
 *
 * 中文：乐懒成果小镇 — 成果服务空间
 *
 * 8 个成果服务入口组成的数字成果空间。
 *
 * Desktop composition (≥1024px):
 *
 *   TOP-LEFT   LELAN TOWN · 乐懒成果小镇 identity
 *   TOP-RIGHT  01 / 08  current indicator
 *
 *   LEFT       巨大 Archive Arc  (背景层)
 *   RIGHT      单一 Service Portal (前景层)
 *
 *   BOTTOM     01–08 service navigator
 *
 * This file is PRESENTATION ONLY — it does not own selection state.
 * Selection state, hash sync, keyboard navigation, aria-live all
 * continue to live in `HomeTownClient` (per the V3 brief §5).
 */

import { type TownShop } from "@/content/town";
import { TownArchiveArc } from "./TownArchiveArc";
import { TownServicePortal } from "./TownServicePortal";
import { TownServiceNavigator } from "./TownServiceNavigator";

interface TownV3PresentationProps {
  shops: ReadonlyArray<TownShop>;
  selectedId: string;
  onSelect: (id: string) => void;
  statusNote: string;
}

export function TownV3Presentation({
  shops,
  selectedId,
  onSelect,
  statusNote,
}: TownV3PresentationProps) {
  const selected = shops.find((s) => s.id === selectedId) ?? shops[0];
  const total = shops.length;

  return (
    <div className="town-v3 relative isolate overflow-hidden rounded-sm bg-town-v3-field">
      {/* Z0 — atmospheric field (paper / ink) */}
      <div className="town-v3-field absolute inset-0 -z-10" aria-hidden="true" />

      {/* Z1 — Archive Arc — the section's visual identity */}
      <TownArchiveArc selectedId={selectedId} />

      {/* Content layer */}
      <div className="town-v3-inner relative z-10 flex flex-col px-4 pb-5 pt-6 sm:px-6 sm:pb-6 sm:pt-8 lg:px-8 lg:pb-8 lg:pt-10">
        {/* ── Sub-header row (decorative; the section's <h2> is in
             HomeTown) ──────────────────────────────── */}
        <header className="town-v3-header flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
          <div>
            <p className="town-v3-eyebrow">LELAN TOWN · 阳 · ARCHIVE SPACE</p>
            <p className="town-v3-title font-serif text-base leading-tight text-ink sm:text-lg">
              成果服务空间 · ARCHIVE INTERIOR
            </p>
            <p className="mt-1 text-[0.85rem] leading-relaxed text-muted">
              八项成果服务，一座可进入的数字成果空间。
            </p>
          </div>
          <p className="town-v3-current font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted">
            <span className="text-ink">{selected.number}</span>
            <span className="mx-1 text-muted-soft">/</span>
            <span>{String(total).padStart(2, "0")}</span>
            <span className="town-v3-current-tag ml-2 align-middle text-[0.5rem] tracking-[0.18em] text-muted-soft">
              {selected.dimension}
            </span>
          </p>
        </header>

        {/* ── Main composition ──────────────────────────
             On desktop: Arc (left, large) + Portal (right, focused).
             On tablet/mobile: stack, but keep Arc visibly behind Portal. */}
        <div className="town-v3-main mt-6 grid grid-cols-1 gap-5 lg:mt-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:items-end lg:gap-8">
          {/* Left: the visual presence of the arc is already painted
              as a background layer. This column carries ONLY a small
              amount of factual annotation so the arc has "weight" —
              never dense, never grid. */}
          <div className="town-v3-arc-annotation hidden flex-col gap-3 lg:flex">
            <p className="font-mono text-[0.55rem] uppercase tracking-[0.18em] text-muted-soft">
              乐懒档案弧
            </p>
            <p className="max-w-sm text-[0.85rem] leading-relaxed text-ink/80">
              抽象数字档案空间的边界。每一项服务都坐落在这条弧的某一处坐标。
            </p>
            <ul className="mt-1 flex flex-col gap-1 font-mono text-[0.6rem] uppercase tracking-wider text-muted">
              <li>空间 · SPACE</li>
              <li>档案 · ARCHIVE</li>
              <li>坐标 · COORDINATE</li>
              <li>入口 · PORTAL</li>
            </ul>
          </div>

          {/* Right: the Service Portal — single glass surface. */}
          <div className="town-v3-portal-host">
            <TownServicePortal shop={selected} total={total} />
          </div>
        </div>

        {/* ── Bottom: 01–08 navigator ────────────────── */}
        <div className="mt-6 lg:mt-8">
          <TownServiceNavigator
            shops={shops}
            selectedId={selectedId}
            onSelect={onSelect}
          />
        </div>

        {/* ── Status note (kept as real HTML, small) ──── */}
        <p className="town-v3-status mt-4 text-[0.7rem] leading-relaxed text-muted">
          {statusNote}
        </p>
      </div>
    </div>
  );
}
