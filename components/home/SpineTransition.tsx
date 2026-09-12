/**
 * LELAN TECHNOLOGY · SpineTransition
 *
 * Phase 1G-R3 — A subtle connector between chapters.
 *
 * Not a literal drawn line through the page. Instead, it shows a
 * fading coordinate line + a small metadata label. As the user
 * scrolls from one section to the next, this hint says "the
 * previous chapter's coordinate system continues into the next."
 *
 * Usage:
 *   <SpineTransition from="GUARDIAN · COORDINATE" to="ARCHIVE SPACE" />
 *
 * The component is intentionally thin: 24px hairline + small
 * mono label. It is decorative and aria-hidden.
 */
interface SpineTransitionProps {
  /** What the user just left (the previous chapter's type) */
  from: string;
  /** What the user is about to enter (the next chapter's type) */
  to: string;
  /** Optional override for the arrow glyph */
  arrow?: string;
}

export function SpineTransition({
  from,
  to,
  arrow = "→",
}: SpineTransitionProps) {
  return (
    <div className="lelan-spine-transition" aria-hidden="true">
      <span className="lelan-spine-transition-line" />
      <span className="lelan-spine-transition-label">
        <span>{from}</span>
        <span className="lelan-spine-transition-arrow">{arrow}</span>
        <span>{to}</span>
      </span>
    </div>
  );
}
