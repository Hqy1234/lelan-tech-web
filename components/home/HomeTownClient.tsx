/**
 * LELAN TECHNOLOGY · Town Client Island
 *
 * Phase 1G — Town V3 "Archive Service Space" (乐懒成果服务空间).
 *
 * ── What changed in Town V3 ──────────────────────────────────────────────
 * Town is no longer a working desk. It is an abstract digital archive space
 * built around a single visual identity — the LELAN ARCHIVE ARC — with a
 * single foreground Service Portal and a restrained 01–08 navigator.
 *
 * The previous three-column research-output desk (Town V2) is preserved
 * intact at `components/town/v2/*` and is no longer mounted here. The 3D
 * spherical sand-table (TownGlobe / TownGlobeScene / TownTerrain /
 * TownMapStage / capability / globe / TownBuildingVisual / TownTerrainDressing)
 * is also still in the codebase as a preserved prototype. Nothing on the
 * homepage imports any of them, so three.js drops out of the homepage
 * bundle automatically.
 *
 * ── What did NOT change ──────────────────────────────────────────────────
 * ⚠ SELECTION STATE ARCHITECTURE IS UNCHANGED AND STILL FROZEN.
 * This file remains the single owner of:
 *   - `selectedId`
 *   - URL hash ↔ state bidirectional sync
 *   - radio-group keyboard model (←/→/Home/End +1/−1, 1..8 direct)
 *   - aria-live announcement
 * Removing V2's desk does not — and must not — alter any of that.
 */

"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import {
  type TownShop,
  DEFAULT_SHOP_ID,
} from "@/content/town";
import { TownV3Presentation } from "@/components/town/v3/TownV3Presentation";

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

  /* ── Keyboard navigation (radio-group model, frozen) ─────────── */
  /**
   * Move selection by ±1 within the shop list, wrapping is OFF — the
   * brief asks for a numeric 01–08 row, so the ends are real ends.
   * "1"–"8" jump directly. Home/End jump to first/last. ←/→ step.
   * The handler is attached to the Town root (not per-button) so focus
   * can live anywhere inside the section.
   */
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const currentIndex = shops.findIndex((s) => s.id === selectedId);
      if (currentIndex < 0) return;
      let nextIndex = currentIndex;
      let consumed = true;
      switch (e.key) {
        case "ArrowRight":
        case "ArrowDown":
          nextIndex = Math.min(shops.length - 1, currentIndex + 1);
          break;
        case "ArrowLeft":
        case "ArrowUp":
          nextIndex = Math.max(0, currentIndex - 1);
          break;
        case "Home":
          nextIndex = 0;
          break;
        case "End":
          nextIndex = shops.length - 1;
          break;
        default: {
          // 1–8 jump keys
          const n = Number.parseInt(e.key, 10);
          if (Number.isFinite(n) && n >= 1 && n <= shops.length) {
            nextIndex = n - 1;
          } else {
            consumed = false;
          }
        }
      }
      if (consumed) {
        e.preventDefault();
        const next = shops[nextIndex];
        if (next && next.id !== selectedId) {
          handleSelect(next.id);
        }
      }
    },
    [shops, selectedId, handleSelect]
  );

  /* ── Derived selected shop ─────────────── */
  const selected = useMemo(
    () => shops.find((s) => s.id === selectedId) ?? shops[0],
    [shops, selectedId]
  );

  return (
    <div
      role="region"
      aria-label="乐懒成果小镇"
      className="lelan-town-field relative"
      onKeyDown={handleKeyDown}
      data-town-radio-name={RADIO_NAME}
    >
      {/* Presentation layer — Town V3 */}
      <TownV3Presentation
        shops={shops}
        selectedId={selected.id}
        onSelect={handleSelect}
        statusNote={statusNote}
      />

      {/* Announcement for assistive tech.
          Selection changes are announced here so the active service is always
          conveyed textually. */}
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        已选择 {selected.number} {selected.name} · {selected.agent}
      </p>
    </div>
  );
}
