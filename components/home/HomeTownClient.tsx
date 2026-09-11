/**
 * LELAN TECHNOLOGY · Town V1.5 Client Island
 *
 * Phase 1E.4-A — Containment (de-noising), state architecture UNCHANGED.
 *
 * ⚠ This file owns Town selection state. That architecture is frozen so the
 * next phase can swap TownMapStage for a WebGL/R3F TownGlobe without touching
 * the state layer:
 *
 *     HomeTownClient   owns `selectedId` + URL hash sync   ← do not change
 *     TownMapStage     pure renderer: (shops, selectedId)  ← replaceable
 *     TownServiceDrawer detail panel: (shop, agentRoleLabel)
 *
 * Phase 1E.4-A change (the only one):
 *   The desktop drawer used to be an ABSOLUTE overlay positioned with
 *   `.lelan-town-drawer-float { right: -8%; top: -5% }`, which pushed it ~20%
 *   past the map container and was one of the two root causes of the 168px
 *   horizontal overflow at 1440. It is now a contained third column that sits
 *   beside the map instead of on top of it. No negative offsets anywhere.
 *
 * Visual composition (desktop ≥1024):
 *   [ 8-service index ] [ map ] [ selected service panel ]
 * Tablet/mobile: index, then map, then panel below — all in normal flow.
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

const RADIO_NAME = "town-shop-select";

interface HomeTownClientProps {
  /** All 8 shops passed from the server component */
  shops: ReadonlyArray<TownShop>;
  /** Section status note */
  statusNote: string;
}

export function HomeTownClient({ shops, statusNote }: HomeTownClientProps) {
  const [selectedId, setSelectedId] = useState<string>(DEFAULT_SHOP_ID);

  /* ── URL hash ↔ selection bidirectional sync ─────────────── */

  // Sync from hash on mount + listen for hashchange
  useEffect(() => {
    const applyFromHash = () => {
      const hash = window.location.hash;
      const match = /^#shop-([a-z0-9-]+)$/i.exec(hash);
      if (match) {
        const id = match[1];
        if (shops.some((s) => s.id === id)) {
          setSelectedId(id);
        } else {
          // Invalid hash → fall back to default
          setSelectedId(DEFAULT_SHOP_ID);
          window.history.replaceState(null, "", `#shop-${DEFAULT_SHOP_ID}`);
        }
      }
    };
    applyFromHash();
    window.addEventListener("hashchange", applyFromHash);
    return () => window.removeEventListener("hashchange", applyFromHash);
  }, [shops]);

  const handleSelect = useCallback((id: string) => {
    setSelectedId(id);
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `#shop-${id}`);
    }
  }, []);

  /* ── Derived selected shop + agent role label ─────────────── */

  const selected = useMemo(
    () => shops.find((s) => s.id === selectedId) ?? shops[0],
    [shops, selectedId]
  );
  const agentRoleLabel = AGENT_ROLE_LABELS[selected.agentRole];

  /* ── Render ─────────────────────────────────────────────────── */

  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:items-stretch lg:gap-4 xl:gap-6">
      {/* ── Left: compact 8-service index (desktop only) ──────── */}
      <nav
        aria-label="小镇服务索引"
        className="hidden shrink-0 overflow-hidden rounded-sm border border-rule bg-paper-pure lg:flex lg:flex-col lg:w-48 lg:rounded-sm xl:w-52"
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
                    "flex cursor-pointer items-start gap-2.5 border-b border-rule px-3 py-2.5 transition-colors",
                    "hover:bg-paper/60",
                    "peer-checked:border-l-2 peer-checked:border-l-green peer-checked:bg-paper/80",
                    "peer-focus-visible:outline peer-focus-visible:outline-1 peer-focus-visible:outline-cinnabar",
                  ].join(" ")}
                >
                  <span
                    aria-hidden
                    className={[
                      "mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-sm border font-mono text-[0.6rem] uppercase tracking-wider",
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
                        "block truncate font-serif text-sm",
                        isSelected
                          ? "font-semibold text-ink"
                          : "text-ink/90",
                      ].join(" ")}
                    >
                      {shop.name}
                    </span>
                    <span className="block truncate text-xs text-muted">
                      {shop.plainLanguageService}
                    </span>
                  </span>
                </label>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Mobile horizontal index (visible only on small screens) */}
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

      {/* ── Center: TownMapStage ──────────────────────────────────────
          The renderer seam. Stateless; selection comes from props. */}
      <div className="relative min-w-0 flex-1">
        <TownMapStage shops={shops} selectedId={selected.id} />
      </div>

      {/* ── Right / below: selected service panel ─────────────────────
          Contained column — NOT an absolute overlay. Previously this was
          `.lelan-town-drawer-float` with right:-8%, which overflowed the
          page by 168px at 1440. */}
      <div className="w-full shrink-0 lg:w-72 xl:w-80">
        <TownServiceDrawer shop={selected} agentRoleLabel={agentRoleLabel} />
      </div>

      <p className="sr-only">{statusNote}</p>
    </div>
  );
}
