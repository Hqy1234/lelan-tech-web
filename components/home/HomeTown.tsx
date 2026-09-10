/**
 * LELAN TECHNOLOGY · Home · Town (成果小镇) V1.5
 *
 * Phase 1C: Accessible eight-service index + selected-shop spatial stage.
 *
 * Architecture:
 * - Server Component: renders section shell (heading, capabilities strip, status).
 * - Client Component `HomeTownClient`: renders the interactive index + stage.
 *
 * All 8 shops' names, numbers, plain-language services, agents, and availability
 * are present in the server-rendered HTML (passed as props to the client island).
 *
 * Default selected shop: paper-teahouse (01).
 * No hover-only information.
 * Visual pending state for shops without delivery assets.
 *
 * Server component (section shell) + Client island (interaction).
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
  // Show all shops — no shopIds filter needed in this version
  const ordered = [...townShops];

  return (
    <section
      id={section.id}
      aria-labelledby={`${section.id}-title`}
      className="border-b border-rule bg-paper"
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

        {/* Interactive Town V1.5 island */}
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
