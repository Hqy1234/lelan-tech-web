/**
 * LELAN TECHNOLOGY · TownGlobe — capability-gated WebGL renderer wrapper
 *
 * Phase 1E.4-B.
 *
 * Responsibilities (and ONLY these):
 *   1. capability gate     — may we mount WebGL at all?
 *   2. lazy mount          — only once the Town section nears the viewport
 *   3. dynamic import      — three / R3F / drei stay out of the main bundle
 *   4. failure containment — context loss or a scene throw -> 2D fallback
 *   5. renderer contract   — { shops, selectedId, onSelect }, no local state
 *
 * ⚠ STATE CONTRACT (must not be broken):
 *   `HomeTownClient` owns `selectedId`. This component NEVER holds a second
 *   copy of the selection. It receives `selectedId` and emits `onSelect(id)`.
 *   The 2D fallback and the globe are two renderers over one state.
 *
 * The 2D map is rendered underneath at all times until the globe is ready, so
 * there is never a blank area and never a spinner.
 */

"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import type { TownShop } from "@/content/town";
import {
  GLOBE_MIN_WIDTH,
  evaluateGlobeGate,
} from "@/lib/town/capability";

/**
 * The 3D scene is imported lazily and never server-rendered.
 * `ssr: false` keeps three / R3F out of the static-export HTML entirely, so the
 * exported pages stay byte-light and a crawler only ever sees the semantic
 * town index and the 2D map.
 */
const TownGlobeScene = dynamic(
  () => import("./globe/TownGlobeScene").then((m) => m.TownGlobeScene),
  { ssr: false, loading: () => null }
);

export interface TownGlobeProps {
  shops: ReadonlyArray<TownShop>;
  selectedId: string;
  onSelect: (id: string) => void;
  /** Rendered when WebGL is unavailable / inappropriate. Always usable. */
  fallback: React.ReactNode;
}

export function TownGlobe({
  shops,
  selectedId,
  onSelect,
  fallback,
}: TownGlobeProps) {
  const hostRef = useRef<HTMLDivElement>(null);

  /**
   * VIEWPORT width — this is what the capability gate is defined against
   * (">= 1024px may mount WebGL").
   *
   * ⚠ Do NOT gate on the host container's width. Inside the Town section the
   * globe column is only ~678px wide at a 1440px viewport (the service index
   * and the drawer take the rest), so a container-based gate would report
   * "narrow viewport" on a perfectly capable desktop and never mount the globe.
   * `null` = not measured yet → 'pending' → the 2D map renders first.
   */
  const [viewportWidth, setViewportWidth] = useState<number | null>(null);
  /** True once the Town section is near the viewport. */
  const [nearViewport, setNearViewport] = useState(false);
  /** True when the scene failed (context loss) and must not retry. */
  const [sceneFailed, setSceneFailed] = useState(false);
  /**
   * Mirror of the user's motion preference. Read in a lazy initialiser so the
   * server and the first client render agree (no hydration mismatch).
   */
  const [reducedMotion, setReducedMotion] = useState(false);

  /* ── Motion preference: initialise on mount, then follow changes ─────── */
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");

    const sync = () => setReducedMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  /* ── Track the viewport width (gate input) ───────────────────────────── */
  useEffect(() => {
    if (typeof window === "undefined") return;

    const measure = () => {
      const w = window.innerWidth;
      if (w > 0) setViewportWidth((prev) => (prev === w ? prev : w));
    };

    // Defer the first measurement out of the effect body to avoid a
    // synchronous state cascade during mount.
    const id = requestAnimationFrame(measure);
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("resize", measure);
    };
  }, []);

  /* ── Decide the mode from the measured viewport ───────────────────────
     Derived rather than stored: no setState-in-effect, and the gate is a pure
     function of (viewportWidth, failure). */
  const mode = sceneFailed ? "fallback" : evaluateGlobeGate(viewportWidth).mode;

  /* ── Lazy mount: only when the Town section approaches the viewport ──── */
  useEffect(() => {
    if (mode !== "globe") return;
    const el = hostRef.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      // Defer out of the effect body to avoid a synchronous state cascade.
      const id = requestAnimationFrame(() => setNearViewport(true));
      return () => cancelAnimationFrame(id);
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNearViewport(true);
          io.disconnect();
        }
      },
      // Start loading ~300px before the section scrolls into view.
      { rootMargin: "300px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [mode]);

  const handleFailure = useCallback(() => setSceneFailed(true), []);

  const showGlobe = mode === "globe" && nearViewport && !sceneFailed;

  return (
    <div ref={hostRef} className="relative h-full w-full">
      {/* The 2D town map is ALWAYS in the tree. It is the loading state, the
          fallback, and the no-JS / SEO surface. The globe fades in over it. */}
      <div
        className={[
          "h-full w-full transition-opacity duration-500",
          showGlobe ? "pointer-events-none opacity-0" : "opacity-100",
        ].join(" ")}
        aria-hidden={showGlobe ? "true" : undefined}
      >
        {fallback}
      </div>

      {/* Globe layer — canvas only, no business content.
          aria-hidden + role=presentation: the canvas is decoration for
          assistive tech. Every service stays reachable through the HTML index
          and the drawer outside this element. */}
      {showGlobe && (
        <div
          className="absolute inset-0"
          aria-hidden="true"
          role="presentation"
        >
          <TownGlobeScene
            shops={shops}
            selectedId={selectedId}
            onSelect={onSelect}
            reducedMotion={reducedMotion}
            onFailure={handleFailure}
          />
        </div>
      )}
    </div>
  );
}

export { GLOBE_MIN_WIDTH };
