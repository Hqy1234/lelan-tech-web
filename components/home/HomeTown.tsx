/**
 * LELAN TECHNOLOGY · Home · Town (成果小镇) V1.5
 *
 * Phase 1E.4-A — HELD QUIET. This section is intentionally not developed
 * further this phase.
 *
 * Why: the next phase introduces a real draggable/rotatable eastern digital
 * town sand-table (WebGL / React Three Fiber). Investing more in this CSS map
 * now would be thrown away. So this phase only de-noises what was harmful:
 *
 *   - Removed the second consecutive `.lelan-divider-coord-fade`. Guardian
 *     already fades into Town; applying the same transition again on Town made
 *     the two sections read as one continuous blur instead of two places.
 *   - The desktop service drawer no longer floats outside the map (handled in
 *     HomeTownClient + globals.css), which removes a root cause of the
 *     horizontal overflow.
 *   - Foreground eave wedges removed (globals.css / TownMapStage).
 *
 * Preserved unchanged:
 *   - All 8 shops (content/town.ts), the radio-group keyboard model,
 *     URL hash sync, the drawer, and the TownMapStage renderer seam.
 *
 * Section role: SPATIAL PREVIEW — calm this phase. After the globe prototype
 * lands, Town becomes the strongest spatial climax of the homepage.
 *
 * Visual rhythm: Hero CALM → Guardian EMOTIONAL → Town SPATIAL (quiet)
 *                → AI QUIET SOFTWARE → Technology/About CALM
 */
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatusLabel } from "@/components/ui/StatusLabel";
import { townShops } from "@/content/town";
import type { HomeTownSection } from "@/content/home";
import { HomeTownClient } from "./HomeTownClient";

interface HomeTownProps {
  section: HomeTownSection;
}

export function HomeTown({ section }: HomeTownProps) {
  const ordered = [...townShops];

  return (
    <section
      id={section.id}
      aria-labelledby={`${section.id}-title`}
      className="lelan-section lelan-section-town relative"
    >
      <Container as="div" className="lelan-chapter--spatial">
        {/* Section chapter header — sits on the spine column.
            The V3 presentation's own internal "town-v3" header
            is now a sub-header (h3-style) inside the spatial
            island, so we keep this top-level chapter header. */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
          <SectionHeading
            id={`${section.id}-title`}
            number={section.number}
            title={section.title}
            intro={section.intro}
            systemLabel="ARCHIVE · SERVICE SPACE"
          />
          <StatusLabel tone="preview" label="图谱阶段" />
        </div>

        {/* Interactive Town island — spatial composition */}
        <div className="mt-8" role="region" aria-label="乐懒成果小镇服务入口">
          <HomeTownClient shops={ordered} statusNote={section.statusNote} />
        </div>

        {/* Phase 1G-R3 — Town → AI bridge.
            Shop 08 is "AI 工具坊", which is the prototype of the
            next chapter. The hairline + metadata strip tells the
            reader that this section ends in the same direction
            the next one begins. */}
        <div className="mt-10">
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-muted-soft">
            08 · AI TOOLS ——
          </p>
        </div>
      </Container>
    </section>
  );
}
