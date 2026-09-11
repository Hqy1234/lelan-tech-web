/**
 * LELAN TECHNOLOGY · Home · Town (成果小镇) V1.5
 *
 * Phase 1E.3-B — Eastern Digital Town (东方数字城镇).
 *
 * Spatial rhythm (Phase A §16 + Phase B §11):
 *   - This section = STRONGEST DEPTH on the homepage
 *   - Background = L3 (warm jade / paper earth, CSS-only distant silhouette)
 *   - TownMapStage = L0–L4 spatial layers inside the section
 *
 * Architecture:
 *   - Server Component: renders section shell (heading, capabilities strip).
 *   - Client Component `HomeTownClient`: handles selection + URL hash sync
 *     + renders the spatial map (TownMapStage) and the service drawer.
 *
 * Section transition:
 *   - Top edge: `.lelan-divider-coord-fade` — picks up the coordinate cross
 *     that ends Guardian's coordinate plane and fades into Town ground.
 *   - Bottom edge: subtle flat hairline — Town ground flattens into AI
 *     document plane.
 *
 * Default selected shop: paper-teahouse (01).
 * No hover-only information.
 * Visual pending state for shops without delivery assets (6 of 8).
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
      className="lelan-bg-l3-town lelan-divider-coord-fade relative border-b border-rule"
    >
      <Container as="div">
        {/* Section header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
          <SectionHeading
            id={`${section.id}-title`}
            number={section.number}
            title={section.title}
            intro={section.intro}
            systemLabel="Town · 阳"
          />
          <StatusLabel tone="preview" label="图谱阶段" />
        </div>

        {/* Capabilities strip */}
        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs">
          <span className="font-mono uppercase tracking-wider text-muted">
            六维能力
          </span>
          {section.capabilities.map((cap) => (
            <span
              key={cap.id}
              className="flex items-center gap-1.5 rounded-sm border border-rule bg-paper px-2 py-1 font-mono text-xs text-ink/80"
            >
              <span className="shrink-0 rounded-sm bg-green/10 px-1.5 py-0.5 text-xs font-medium text-green">
                {cap.label}
              </span>
              <span className="text-muted">{cap.description}</span>
            </span>
          ))}
        </div>

        {/* Interactive Town V1.5 island — full spatial composition */}
        <div className="mt-8" role="region" aria-label="乐懒成果小镇服务入口">
          <HomeTownClient shops={ordered} statusNote={section.statusNote} />
        </div>

        <p className="mt-5 text-xs text-muted sm:text-sm">
          {section.statusNote}
        </p>
      </Container>
    </section>
  );
}
