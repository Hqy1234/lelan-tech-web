/**
 * LELAN TECHNOLOGY · Town V3 · Service Portal
 *
 * 中文：服务入口
 *
 * The single foreground "glass" surface in Town V3. It is the ONLY
 * glass surface allowed in the section (see Town V3 brief §17).
 *
 * Role:
 *   - Tell the user: which shop they are inside, what it solves,
 *     and how to enter.
 *   - NOT a workspace. No editor. No fake dashboard.
 *
 * It carries the only CTA in the section.
 *
 * Light / Dark parity:
 *   Both modes share the same JSX. Visual differences come from
 *   semantic tokens (--surface-*, --glass-*, --color-*).
 */

import type { TownShop } from "@/content/town";
import { TOWN_V3_SHOP_CAPABILITIES } from "./TownV3.types";

interface TownServicePortalProps {
  shop: TownShop;
  /** Total number of shops, used for "01 / 08" caption. */
  total: number;
}

export function TownServicePortal({ shop, total }: TownServicePortalProps) {
  const capabilities = TOWN_V3_SHOP_CAPABILITIES[shop.id] ?? [];

  return (
    <article
      className="town-v3-portal relative isolate flex flex-col"
      aria-labelledby={`town-v3-portal-${shop.id}-title`}
    >
      {/* ── Z0 · Glass surface ──────────────────────────────
          This is the ONE major glass surface in Town V3.
          Backdrop blur is restrained (see globals). */}
      <div className="town-v3-portal-surface relative flex flex-col rounded-sm border border-rule p-5 sm:p-6">
        {/* Top metadata row — system info, not marketing */}
        <header className="flex items-center justify-between border-b border-rule/70 pb-3">
          <p className="font-mono text-[0.55rem] uppercase tracking-[0.18em] text-muted">
            <span aria-hidden>ARCHIVE · </span>
            SHOP {shop.number}
          </p>
          <p className="font-mono text-[0.55rem] uppercase tracking-[0.18em] text-muted-soft">
            {shop.dimension}
          </p>
        </header>

        {/* ── Identity ───────────────────────────────────── */}
        <div className="pt-4">
          <h3
            id={`town-v3-portal-${shop.id}-title`}
            className="font-serif text-2xl leading-tight text-ink sm:text-[1.75rem]"
          >
            {shop.name}
          </h3>
          <p className="mt-1 font-mono text-[0.7rem] uppercase tracking-wider text-muted">
            {shop.agent}
            {shop.id === "paper-teahouse" && (
              <span className="ml-1.5 text-muted-soft">· Paper &amp; Writing</span>
            )}
          </p>
        </div>

        {/* ── Service description (one line) ─────────────── */}
        <p className="mt-4 text-[0.95rem] leading-relaxed text-ink/90">
          {shop.plainLanguageService}
        </p>
        <p className="mt-1 text-[0.85rem] leading-relaxed text-muted">
          {shop.shortDescription}
        </p>

        {/* ── Service capabilities (max 4, inline) ──────── */}
        <div className="mt-5">
          <p className="font-mono text-[0.55rem] uppercase tracking-[0.18em] text-muted-soft">
            服务能力
          </p>
          <ul
            className="mt-2 flex flex-wrap gap-1.5"
            role="list"
            aria-label={`${shop.name} 服务能力`}
          >
            {capabilities.map((c) => (
              <li
                key={c.tag + c.detail}
                className="town-v3-portal-chip"
              >
                <span className="town-v3-portal-chip-tag">{c.tag}</span>
                <span className="town-v3-portal-chip-detail">{c.detail}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ── CTA (the only CTA in Town V3) ──────────────
            Per brief: no fake routes, no `href="#"`. If the
            underlying route doesn't exist (current state for 02–08),
            the CTA is a semantic button with `aria-disabled="false"`
            but explicitly labelled "SERVICE PREVIEW" in tiny
            metadata so the user knows no real destination exists yet.

            For 01 (paper-teahouse) we use the same button — there is
            no dedicated /town/paper-writing route yet either. This
            keeps behaviour consistent and honest across all 8 shops. */}
        <div className="mt-6 flex items-center justify-between gap-3 border-t border-rule/70 pt-4">
          <p className="font-mono text-[0.5rem] uppercase tracking-[0.18em] text-muted-soft">
            {String(shop.number).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </p>
          <button
            type="button"
            className="town-v3-portal-cta"
            aria-label={`进入 ${shop.name}`}
            // Per brief: NO href. This is a button, not a link.
            // When real routes exist, swap to <Link>.
          >
            <span>进入 {shop.name}</span>
            <span aria-hidden className="town-v3-portal-cta-arrow">
              →
            </span>
          </button>
        </div>

        {/* Service preview marker — honest "preview only" notice.
            Visible but very small. */}
        <p className="mt-2 text-right font-mono text-[0.5rem] uppercase tracking-[0.18em] text-muted-soft">
          SERVICE PREVIEW · 尚无独立路由
        </p>
      </div>

      {/* ── Z-1 · Soft inner shadow rim ─────────────────
          Reads as the surface "sitting" against the arc behind.
          Stays far below glass-shadow strength. */}
      <div className="town-v3-portal-rim pointer-events-none absolute inset-0 -z-10 rounded-sm" aria-hidden="true" />
    </article>
  );
}
