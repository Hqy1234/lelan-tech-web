/**
 * LELAN TECHNOLOGY · Town V2 · Spatial Field (Z1)
 *
 * Phase 1F.2 (Town V2 prototype).
 *
 * The background layer that gives the Town section its own depth, so the centre
 * workspace reads as a foreground object rather than a card floating on white.
 *
 *   Z0  warm editorial page      the section's paper field (globals.css)
 *   Z1  Town spatial field       ← this component
 *   Z2  foreground workspace     the selected service desk
 *
 * Everything here is decorative and `aria-hidden`: it exists to establish that
 * this section is a registered working surface (a map sheet / registration
 * board), not to carry information.
 *
 * Permitted vocabulary only: fine grid, coordinate rules, archive registration
 * marks, and very large low-opacity field typography — in muted jade / ink
 * green / 宣纸灰. Explicitly absent: gradient glow,紫蓝渐变, neon, cyberpunk,
 * heavy glass, large shadows, game HUD.
 */

export function TownSpatialField() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Fine drafting grid + coordinate rules */}
      <div className="lelan-town-grid-field" />

      {/* Registration marks — paste-up sheet corners */}
      <span className="lelan-town-regmark lelan-town-regmark-tl" />
      <span className="lelan-town-regmark lelan-town-regmark-tr" />
      <span className="lelan-town-regmark lelan-town-regmark-bl" />
      <span className="lelan-town-regmark lelan-town-regmark-br" />

      {/*
        Coordinate rules.
        Vertical: three framing rules placed in the two inter-column GUTTERS and
        at the right margin, so they read as a measured sheet rather than a line
        cutting through a column. Horizontal: one long rule plus two short tick
        rows, giving the field a drafting rhythm without becoming a table.
      */}
      <span className="lelan-town-axis top-0 bottom-0 hidden lg:block" style={{ left: "15%" }} />
      <span className="lelan-town-axis top-0 bottom-0 hidden lg:block" style={{ left: "36%" }} />
      <span className="lelan-town-axis top-0 bottom-0 hidden lg:block" style={{ right: "21.5%" }} />
      <span className="lelan-town-axis left-0 right-0" style={{ top: "6.5rem" }} />
      <span
        className="lelan-town-axis hidden sm:block"
        style={{ left: "15%", top: "12rem", width: "6rem" }}
      />
      <span
        className="lelan-town-axis hidden sm:block"
        style={{ right: "21.5%", top: "12rem", width: "6rem" }}
      />

      {/*
        Oversized field typography. Purely typographic depth; it sits under the
        work surface and is clipped by the field, so it can never be mistaken for
        content or reduce the contrast of real text.

        Placement note: the "02" sits in the lower band beside TOWN rather than in
        the upper-right, because the upper-right corner of the field is occupied
        by the archive column and the mark was being covered.
      */}
      <span
        className="lelan-town-field-type hidden lg:block"
        style={{
          right: "0.4rem",
          bottom: "-0.2em",
          fontSize: "clamp(6rem, 13vw, 11rem)",
        }}
      >
        02
      </span>
      <span
        className="lelan-town-field-type hidden lg:block"
        style={{
          left: "1.2rem",
          bottom: "-0.16em",
          fontSize: "clamp(6rem, 13vw, 11rem)",
        }}
      >
        TOWN
      </span>
    </div>
  );
}
