/**
 * LELAN TECHNOLOGY · Home · Two-System Architecture
 *
 * Phase 1C refinement:
 * - Reduced card border repetition: open layout instead of two bordered cards.
 * - More relational composition with a central bridge axis.
 * - Tighter vertical rhythm (density="tight").
 *
 * Server component.
 */
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { HomeArchitectureSection } from "@/content/home";

interface HomeArchitectureProps {
  section: HomeArchitectureSection;
}

export function HomeArchitecture({ section }: HomeArchitectureProps) {
  return (
    <section
      id={section.id}
      aria-labelledby={`${section.id}-title`}
      className="border-b border-rule bg-paper"
    >
      <Container density="tight" as="div">
        <SectionHeading
          id={`${section.id}-title`}
          number={section.number}
          title={section.title}
          intro={section.intro}
        />

        {/* Two systems — open layout with central bridge */}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
          {section.systems.map((sys) => (
            <article
              key={sys.id}
              className="group relative"
            >
              {/* System identity — no card border, just spacing + rule */}
              <div className="flex items-center gap-3">
                <span
                  aria-hidden
                  className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-ink/30 font-mono text-[0.65rem] uppercase text-ink/70"
                >
                  {sys.id === "town" ? "阳" : "阴"}
                </span>
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-muted">
                  System · {sys.id === "town" ? "01" : "02"}
                </p>
              </div>

              <h3 className="lede mt-3 text-xl font-medium leading-tight text-ink sm:text-2xl">
                {sys.name}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                {sys.oneLine}
              </p>

              <a
                href={sys.id === "town" ? "#town" : "#guardian"}
                className="mt-4 inline-flex items-center gap-2 text-sm text-green transition-colors hover:text-green-dark"
              >
                查看详情
                <span aria-hidden>→</span>
              </a>
            </article>
          ))}
        </div>

        {/* AI bridge — dashed container */}
        <aside
          className="mt-8 flex flex-col gap-4 rounded-sm border border-dashed border-rule bg-paper/60 p-5 sm:flex-row sm:items-center sm:gap-6 sm:p-6"
          aria-label="AI 桥接说明"
        >
          <span
            aria-hidden
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-green/50 text-green"
          >
            <span className="block h-3 w-3 rounded-full bg-green" />
          </span>
          <p className="text-sm leading-relaxed text-muted sm:text-base">
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em]">
              Bridge
            </span>
            <br />
            {section.aiBridge}
          </p>
        </aside>
      </Container>
    </section>
  );
}
