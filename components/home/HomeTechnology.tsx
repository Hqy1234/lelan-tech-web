/**
 * LELAN TECHNOLOGY · Home · Technology & Capability
 *
 * 编辑矩阵 / 列示型能力表达：
 * - 不用"六张一样的 SaaS 卡片"；
 * - 用 typographic index + rules 表达克制、理性。
 *
 * Server component。静态。
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
      className="border-b border-rule bg-paper"
    >
      <Container as="div">
        <SectionHeading
          id={`${section.id}-title`}
          number={section.number}
          title={section.title}
          intro={section.intro}
          systemLabel="Engineering"
        />

        <dl className="mt-10 divide-y divide-rule border-y border-rule">
          {section.pillars.map((pillar, idx) => (
            <div
              key={pillar.id}
              className="grid grid-cols-12 items-baseline gap-3 py-5 sm:gap-6 sm:py-6"
            >
              <dt className="col-span-2 font-mono text-[0.7rem] uppercase tracking-[0.25em] text-muted sm:col-span-1">
                {String(idx + 1).padStart(2, "0")}
              </dt>
              <dd className="col-span-10">
                <div className="grid grid-cols-1 gap-1 sm:grid-cols-12 sm:gap-6">
                  <p className="font-serif text-base text-ink sm:col-span-3 sm:text-lg">
                    {pillar.name}
                  </p>
                  <p className="text-sm leading-relaxed text-ink/85 sm:col-span-9 sm:text-base">
                    {pillar.oneLine}
                  </p>
                </div>
              </dd>
            </div>
          ))}
        </dl>

        {/* Vocabulary strip — restrained list, not a feature grid */}
        <div className="mt-8 flex flex-wrap items-center gap-2 text-xs">
          <span className="font-mono uppercase tracking-[0.2em] text-muted">
            能力词表
          </span>
          {["AI", "Data", "Workflow", "Research", "Human Expertise", "Compliance"].map(
            (term) => (
              <span
                key={term}
                className="rounded-sm border border-rule px-2 py-0.5 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ink/80"
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
