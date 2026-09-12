/**
 * LELAN TECHNOLOGY · Home · Technology & Capability
 *
 * Phase 1C refinement:
 * - Semantic fix: meaningful term (e.g. "可追溯") is the <dt>, number is decorative.
 * - Reduced card repetition: no border everywhere.
 * - Page rhythm: tighter vertical space.
 *
 * Server component. Static.
 */
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { HomeTechnologySection } from "@/content/home";

interface HomeTechnologyProps {
  section: HomeTechnologySection;
}

export function HomeTechnology({ section }: HomeTechnologyProps) {
  return (
    <section
      id={section.id}
      aria-labelledby={`${section.id}-title`}
      className="lelan-section lelan-section-engineering relative"
    >
      <Container density="tight" as="div" className="lelan-chapter--quiet">
        <SectionHeading
          id={`${section.id}-title`}
          number={section.number}
          title={section.title}
          intro={section.intro}
          systemLabel="ENGINEERING · PRINCIPLES"
        />

        {/* Open typographic layout — meaningful term is <dt>, number is decorative */}
        <dl className="mt-8 space-y-5 sm:mt-10">
          {section.pillars.map((pillar, idx) => (
            <div key={pillar.id} className="flex items-start gap-3 sm:gap-5">
              {/* Number as decorative — NOT the <dt> */}
              <span
                aria-hidden
                className="mt-0.5 shrink-0 font-mono text-[0.7rem] uppercase tracking-wider text-muted"
              >
                {String(idx + 1).padStart(2, "0")}
              </span>

              {/* Meaningful term = <dt>, description = <dd> */}
              <div className="flex-1">
                <div className="grid grid-cols-1 gap-1 sm:grid-cols-12 sm:gap-4">
                  <dt className="font-serif text-base text-ink sm:col-span-3 sm:text-lg">
                    {pillar.name}
                  </dt>
                  <dd className="text-sm leading-relaxed text-muted sm:col-span-9 sm:text-base">
                    {pillar.oneLine}
                  </dd>
                </div>
              </div>
            </div>
          ))}
        </dl>

        {/* Vocabulary strip */}
        <div className="mt-8 flex flex-wrap items-center gap-2 text-xs">
          <span className="font-mono uppercase tracking-wider text-muted">
            能力词表
          </span>
          {["AI", "Data", "Workflow", "Research", "Human Expertise", "Compliance"].map(
            (term) => (
              <span
                key={term}
                className="rounded-sm border border-rule px-2 py-0.5 font-mono text-[0.7rem] uppercase tracking-wider text-ink/80"
              >
                {term}
              </span>
            ),
          )}
        </div>
      </Container>
    </section>
  );
}
