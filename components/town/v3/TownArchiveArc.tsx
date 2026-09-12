/**
 * LELAN TECHNOLOGY · Town V3 · LELAN ARCHIVE ARC
 *
 * 中文内部概念：乐懒档案弧
 *
 * Visual responsibility:
 *   1. Provide a HUGE, OFF-SCREEN elliptical curve that reads as the
 *      "border of an abstract digital archive space".
 *   2. Make Town visually distinct from Guardian (Coordinate Grid) and
 *      AI (Document Plane). The arc is the Town visual identity.
 *   3. Stay still while idle — only micro-shifts on selectedId change.
 *
 * Hard rules (per Town V3 brief):
 *   - CSS / SVG only. No images, no canvas, no WebGL, no Three.
 *   - The arc must NOT be a complete circle. It must look like a
 *     section of an enormous ellipse, partially cropped by the section.
 *   - 80–90% of the field behind the arc must be CLEAN (no dense grid).
 *   - Reduced-motion: no translation / scale shift.
 *   - Decorative only — `aria-hidden`. Never a focusable stop.
 *
 * Light / Dark parity:
 *   - Both modes use the same composition.
 *   - Only colour tokens differ. All visual logic lives here.
 */

interface TownArchiveArcProps {
  /**
   * 1–8, used to derive a small offset shift of the inner highlight
   * (subtle, ~10–30px). When reduced-motion is on the consumer skips
   * this transform via CSS.
   */
  selectedId: string;
}

/**
 * Stable colour tokens per shop.
 *
 * NOTE: deliberately NOT a per-shop palette — every shop in V3 sits on
 * the SAME arc and reads the same colour family. The arc identity is the
 * Town identity, not the per-shop identity.
 */

/**
 * SVG viewBox is intentionally much wider than its rendered container.
 * This is what creates the "edge of an enormous sphere" feeling: when
 * the SVG is positioned with negative offsets and the curve is only
 * partially inside the viewport, the eye reads the cut-off arc as the
 * visible portion of something much larger.
 *
 * Curve mathematics:
 *   Two large cubic Bézier sweeps form an ellipse-like arc with its
 *   centre far off the left side of the viewport. The right edge of
 *   the arc is what we actually see.
 */
export function TownArchiveArc({ selectedId }: TownArchiveArcProps) {
  // Stable, non-random micro-shift based on selectedId. 0–7 → 0–7.
  const shopIndex = Number.parseInt(selectedId, 10) - 1 || 0;

  return (
    <div
      className="town-v3-arc-layer pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* ── 1 · Outer atmospheric glow ───────────────────────────
          Sits at the BACK of the section. In dark mode it's the
          "deep ink" illumination; in light mode it's a soft paper
          breath. Kept very low contrast — never a halo. */}
      <div className="town-v3-arc-glow absolute -inset-[20%]" />

      {/* ── 2 · The Archive Arc (SVG) ────────────────────────────
          A massive elliptical stroke that reads as the edge of an
          enormous archive sphere. Rendered as two parallel curves
          (outer + inner) so it reads as an actual rim, not a single
          line. */}
      <svg
        className="town-v3-arc-svg absolute inset-0 h-full w-full"
        viewBox="0 0 2400 1400"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          {/* Soft mask that lets the rim fade into the section edge
              instead of ending with a hard crop. */}
          <linearGradient id="tva-arc-fade" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="15%" stopColor="white" stopOpacity="0.4" />
            <stop offset="55%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0.4" />
          </linearGradient>
          <mask id="tva-arc-mask">
            <rect x="0" y="0" width="2400" height="1400" fill="url(#tva-arc-fade)" />
          </mask>

          {/* A second softer rim, offset, so the arc reads as a
              double curve (volume, not line). */}
          <linearGradient id="tva-rim-soft" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.0" />
            <stop offset="40%" stopColor="currentColor" stopOpacity="0.9" />
            <stop offset="60%" stopColor="currentColor" stopOpacity="0.9" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Outer rim — wide sweep */}
        <g
          mask="url(#tva-arc-mask)"
          className="town-v3-arc-shift"
          style={{ ["--shop-shift" as string]: `${(shopIndex - 3.5) * 4}px` }}
        >
          {/* The curve is a giant ellipse whose leftmost point sits
              far off-screen to the LEFT. We only ever see the right
              portion of it, which is what gives the "edge of a much
              bigger sphere" reading. */}
          <path
            d="M -1200 700 C 100 -200, 1200 -200, 2600 700"
            fill="none"
            className="town-v3-arc-rim-outer"
            stroke="url(#tva-rim-soft)"
            strokeWidth="2"
          />
          {/* Inner echo — slightly tighter curve, reads as the rim
              thickness. */}
          <path
            d="M -1200 700 C 300 50, 1100 50, 2600 700"
            fill="none"
            className="town-v3-arc-rim-inner"
            stroke="url(#tva-rim-soft)"
            strokeWidth="1"
          />
          {/* Very faint horizontal equator hint — anchors the arc
              spatially without ever becoming a grid line. */}
          <path
            d="M 0 700 L 2400 700"
            fill="none"
            className="town-v3-arc-equator"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeDasharray="2 6"
            opacity="0.35"
          />
        </g>
      </svg>

      {/* ── 3 · Coordinate micro-marks (≤3, decorative) ──────────
          Per brief: 1–3 position nodes + a few annotation leaders,
          max. No full grid. No blueprint look. */}
      <div className="town-v3-arc-marks absolute inset-0">
        {/* Node A — left of arc centre */}
        <span className="town-v3-arc-node" style={{ top: "62%", left: "8%" }} aria-hidden="true" />
        {/* Node B — right of arc centre, slightly above */}
        <span className="town-v3-arc-node" style={{ top: "38%", left: "55%" }} aria-hidden="true" />
        {/* Node C — bottom right of viewport */}
        <span className="town-v3-arc-node" style={{ top: "72%", left: "82%" }} aria-hidden="true" />
      </div>

      {/* ── 4 · Archive ID micro-text (≤3 occurrences) ──────────
          Deliberately tiny and grey. Reads as a watermark, not a
          label. */}
      <p className="town-v3-arc-id town-v3-arc-id-1" aria-hidden="true">
        LELAN · ARCHIVE ARC · 乐懒档案弧
      </p>
      <p className="town-v3-arc-id town-v3-arc-id-2" aria-hidden="true">
        N · 乐懒 · 阳 · 乐 · 懒 · L · N
      </p>
    </div>
  );
}
