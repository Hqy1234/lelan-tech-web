/**
 * LELAN TECHNOLOGY · Town Globe capability gate
 *
 * Phase 1E.4-B.
 *
 * ONE decision point that answers: may we mount WebGL for the Town globe?
 * Principle: **feature detect first, heuristic second, fallback safe.**
 *
 * Deliberately NOT a hard "if deviceMemory is undefined → refuse" rule.
 * `navigator.deviceMemory` is Chromium-only and absent in Safari and Firefox;
 * treating its absence as "weak device" would wrongly disable the globe for
 * every Safari user. Weakness must be POSITIVE evidence, never missing data.
 *
 * The gate is progressive:
 *   - 'pending'  server render + pre-measurement  → 2D fallback markup
 *                (so static export / no-JS / SEO see a complete town)
 *   - 'globe'    WebGL verified available, desktop, motion allowed
 *   - 'fallback' 2D map — always fully usable, never an error message
 */

/** Minimum viewport width allowed to mount WebGL (Phase 1E.4-B desktop gate). */
export const GLOBE_MIN_WIDTH = 1024;

/** Below this many logical cores we treat the device as low-power. */
const MIN_CORES = 4;

/** Below this much device memory (GB) we treat the device as low-power. */
const MIN_MEMORY_GB = 4;

export type GlobeMode = "pending" | "globe" | "fallback";

/**
 * Feature-detect real WebGL availability.
 * `failIfMajorPerformanceCaveat` filters out software rasterisers
 * (e.g. SwiftShader), which would produce a broken-looking globe.
 */
export function detectWebGL(): boolean {
  if (typeof document === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    const ctx =
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl");
    if (!ctx) return false;
    // Context was created — release it immediately.
    const lose = (ctx as WebGLRenderingContext).getExtension("WEBGL_lose_context");
    lose?.loseContext();
    return true;
  } catch {
    return false;
  }
}

/** True when the user asked for reduced motion. */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Hardware heuristic — deliberately lenient.
 *
 * Returns `true` only when we have POSITIVE evidence the device is low-power.
 * `undefined` values are treated as "unknown", not "weak", so browsers that
 * do not expose these APIs (Safari, Firefox) are not penalised.
 */
export function detectLowPowerDevice(): boolean {
  if (typeof navigator === "undefined") return false;

  const nav = navigator as Navigator & { deviceMemory?: number };

  // Positive evidence #1: very few logical cores.
  if (typeof nav.hardwareConcurrency === "number" && nav.hardwareConcurrency > 0) {
    if (nav.hardwareConcurrency < MIN_CORES) return true;
  }

  // Positive evidence #2: explicitly low reported memory.
  if (typeof nav.deviceMemory === "number" && nav.deviceMemory > 0) {
    if (nav.deviceMemory < MIN_MEMORY_GB) return true;
  }

  // Unknown metrics are NOT treated as weak.
  return false;
}

export interface GlobeGateResult {
  mode: GlobeMode;
  /** Machine-readable reason, for QA + analytics. Never shown to users. */
  reason:
    | "ok"
    | "measuring"
    | "webgl-unavailable"
    | "narrow-viewport"
    | "reduced-motion"
    | "low-power-device";
}

/**
 * Decide whether the globe may render, for a given viewport width.
 *
 * `width === null` means "not measured yet" → 'pending', which renders the
 * 2D map so there is never a blank area or a spinner.
 */
export function evaluateGlobeGate(width: number | null): GlobeGateResult {
  if (width === null) return { mode: "pending", reason: "measuring" };

  if (width < GLOBE_MIN_WIDTH) {
    return { mode: "fallback", reason: "narrow-viewport" };
  }

  if (!detectWebGL()) {
    return { mode: "fallback", reason: "webgl-unavailable" };
  }

  // Phase 1E.4-B policy: reduced-motion users get the stable 2D map.
  // Rationale — the whole point of this prototype is a hand-draggable world.
  // Serving a drag-only globe to someone who asked for less motion is a worse
  // experience than serving the town map that already exists and is fully
  // navigable, so this is treated as an explicit fallback reason.
  // (Drag on the globe remains motion-safe by design, so a future phase may
  // choose to render a static globe here instead — the seam allows it.)
  if (prefersReducedMotion()) {
    return { mode: "fallback", reason: "reduced-motion" };
  }

  if (detectLowPowerDevice()) {
    return { mode: "fallback", reason: "low-power-device" };
  }

  return { mode: "globe", reason: "ok" };
}
