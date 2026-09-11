/**
 * LELAN TECHNOLOGY · GuardianSeal
 *
 * Phase 1E.3-A — Guardian visual identity mark.
 *
 * Modern archive identity seal — NOT a traditional red stamp, NOT a
 * mystical talisman, NOT a bagua compass. Composed entirely of:
 *   1. Open square frame
 *   2. Stage marks (coordinate ticks)
 *   3. Current coordinate point (filled dot / "current" mark)
 *   4. Minimal structural lines (axis + diagonals)
 *   5. Archive marker (LELAN dot)
 *
 * Decorative SVG is aria-hidden + pointer-events-none.
 * Text inside the seal is real HTML so screen readers can read it.
 *
 * States:
 *   - "outline"   — initial / empty (Step 1 of demo)
 *   - "partial"   — some input captured (Step 2–5 / Step 6 review)
 *   - "complete"  — full archive generated / confirmed
 *
 * Color rules:
 *   - Primary: ink green (--color-green)
 *   - Auxiliary: warm white, jade, paper
 *   - Cinnabar: ONLY on the "current" dot / active mark (very local)
 *
 * No gold glow, no red glow, no mystic light.
 */

import type { GuardianProfile } from "@/content/guardian";

export type GuardianSealState = "outline" | "partial" | "complete";

export interface GuardianSealProps {
  state?: GuardianSealState;
  size?: "sm" | "md" | "lg";
  /** Optional: stage name to display under the seal */
  stageLabel?: string;
  /** Optional: trigram (e.g. "兑") to display inside the seal */
  trigram?: string;
  /** Optional: short archive marker (e.g. "GEN-36-F") */
  archiveMarker?: string;
  /** Optional: small caption beneath the seal */
  caption?: string;
  /** Optional: the profile (when present, derives trigram/marker from it) */
  profile?: GuardianProfile | null;
  /** Visible label for screen readers (overrides derived label) */
  ariaLabel?: string;
}

const SIZE_MAP = {
  sm: { wrap: "w-20", svg: 80, stroke: 1, ring: 32, mark: 1.6 },
  md: { wrap: "w-28", svg: 112, stroke: 1.25, ring: 46, mark: 2 },
  lg: { wrap: "w-40", svg: 160, stroke: 1.5, ring: 64, mark: 2.4 },
} as const;

export function GuardianSeal({
  state = "outline",
  size = "md",
  stageLabel,
  trigram,
  archiveMarker,
  caption,
  profile,
  ariaLabel,
}: GuardianSealProps) {
  const d = SIZE_MAP[size];

  // Derive content from profile if provided
  const trig = trigram ?? profile?.stage.trigram;
  const label = stageLabel ?? (profile ? `${profile.stage.name}` : stageLabel);
  const marker =
    archiveMarker ??
    (profile?.archiveRef
      ? profile.archiveRef.replace(/^LELAN-DEMO-GEN-/, "")
      : "—");

  // Visual tokens
  const stroke = "currentColor";
  const isComplete = state === "complete";
  const isPartial = state === "partial";

  return (
    <div className={["flex flex-col items-center gap-1.5", d.wrap].join(" ")}>
      <div
        className={[
          "relative aspect-square w-full text-green transition-colors",
          state === "outline" ? "opacity-80" : "opacity-100",
        ].join(" ")}
        role="img"
        aria-label={
          ariaLabel ??
          `乐懒守护符${trig ? ` · ${trig} · ${label ?? ""}` : ""}（${state}）`
        }
      >
        <svg
          viewBox="0 0 100 100"
          aria-hidden
          focusable="false"
          className="absolute inset-0 h-full w-full"
        >
          {/* Outer square frame */}
          <rect
            x="10"
            y="10"
            width="80"
            height="80"
            fill="none"
            stroke={stroke}
            strokeWidth={d.stroke}
          />

          {/* Inner square — coordinate inner bound */}
          <rect
            x="22"
            y="22"
            width="56"
            height="56"
            fill="none"
            stroke={stroke}
            strokeWidth={d.stroke * 0.6}
            opacity={isComplete ? 0.6 : 0.35}
          />

          {/* Stage ticks — top + left axis (Y axis stages), inner ring */}
          {[0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875].map((t, i) => {
            const x1 = 10;
            const y1 = 10 + t * 80;
            return (
              <line
                key={`l-${i}`}
                x1={x1 - 3}
                y1={y1}
                x2={x1}
                y2={y1}
                stroke={stroke}
                strokeWidth={d.stroke * 0.8}
              />
            );
          })}

          {/* X axis ticks along bottom */}
          {[0.25, 0.5, 0.75].map((t, i) => {
            const x = 10 + t * 80;
            const y1 = 90;
            return (
              <line
                key={`b-${i}`}
                x1={x}
                y1={y1}
                x2={x}
                y2={y1 + 3}
                stroke={stroke}
                strokeWidth={d.stroke * 0.8}
              />
            );
          })}

          {/* Light diagonals — corner alignment hints */}
          <line
            x1="10"
            y1="10"
            x2="22"
            y2="22"
            stroke={stroke}
            strokeWidth={d.stroke * 0.6}
            opacity={isComplete ? 0.6 : 0.35}
          />
          <line
            x1="90"
            y1="10"
            x2="78"
            y2="22"
            stroke={stroke}
            strokeWidth={d.stroke * 0.6}
            opacity={isComplete ? 0.6 : 0.35}
          />
          <line
            x1="10"
            y1="90"
            x2="22"
            y2="78"
            stroke={stroke}
            strokeWidth={d.stroke * 0.6}
            opacity={isComplete ? 0.6 : 0.35}
          />
          <line
            x1="90"
            y1="90"
            x2="78"
            y2="78"
            stroke={stroke}
            strokeWidth={d.stroke * 0.6}
            opacity={isComplete ? 0.6 : 0.35}
          />

          {/* Coordinate plane crosshair (only visible when partial or complete) */}
          {(isPartial || isComplete) && (
            <>
              <line
                x1="50"
                y1="22"
                x2="50"
                y2="78"
                stroke={stroke}
                strokeWidth={d.stroke * 0.4}
                opacity="0.3"
              />
              <line
                x1="22"
                y1="50"
                x2="78"
                y2="50"
                stroke={stroke}
                strokeWidth={d.stroke * 0.4}
                opacity="0.3"
              />
            </>
          )}

          {/* Current coordinate point — the only cinnabar touch in the seal */}
          {isComplete && (
            <circle
              cx="50"
              cy="50"
              r={d.ring / 8}
              fill="#9b3a2f"
              stroke="#9b3a2f"
              strokeWidth={d.stroke * 0.5}
            />
          )}
          {isPartial && (
            <circle
              cx="50"
              cy="50"
              r={d.ring / 12}
              fill="none"
              stroke={stroke}
              strokeWidth={d.stroke}
            />
          )}

          {/* Tiny LELAN archive marker — bottom-right corner */}
          <g opacity={isComplete ? 1 : 0.5}>
            <circle cx="86" cy="14" r="1.6" fill={stroke} />
            <line x1="86" y1="14" x2="86" y2="20" stroke={stroke} strokeWidth={d.stroke * 0.5} />
          </g>

          {/* Connector from "current" to trigram (top arc) */}
          {isComplete && trig && (
            <path
              d="M50 50 L50 18"
              stroke={stroke}
              strokeWidth={d.stroke * 0.4}
              strokeDasharray="1.5 1.5"
              opacity="0.45"
              fill="none"
            />
          )}
        </svg>

        {/* HTML layer — trigram + label (real text, accessible) */}
        {trig && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-2 text-center font-serif text-base text-ink sm:text-lg"
          >
            {trig}
          </div>
        )}
      </div>

      {/* Visible labels (real HTML, screen-reader accessible) */}
      <p className="text-center font-mono text-[0.6rem] uppercase tracking-wider text-muted">
        乐懒守护符 · {state === "complete" ? "已生成" : state === "partial" ? "整理中" : "待建立"}
      </p>
      {(label || marker) && (
        <p className="text-center font-mono text-[0.55rem] text-muted/80">
          {label ? `${label} · ` : ""}
          {marker}
        </p>
      )}
      {caption && (
        <p className="text-center font-mono text-[0.55rem] text-muted/60">{caption}</p>
      )}
    </div>
  );
}
