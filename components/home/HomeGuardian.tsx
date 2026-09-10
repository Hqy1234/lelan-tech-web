/**
 * LELAN TECHNOLOGY · Home · Guardian (乐懒守护)
 *
 * Phase 1C refinement:
 * - Four steps feel like ONE continuous research archive process (not 4 rows).
 * - KeyframeDivider removed — creates unnecessary visual break.
 * - Two status cards merged into one compact note.
 * - Reduced excessive separator/empty space.
 *
 * Guardian four-step method: 人生档案 → 队列建模 → 横断面校准 → 风险预警.
 * No 五行/八段 on homepage.
 *
 * Server component. Static.
 */
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatusLabel } from "@/components/ui/StatusLabel";
import type { HomeGuardianSection } from "@/content/home";

interface HomeGuardianProps {
  section: HomeGuardianSection;
}

const METHOD_LABELS: Record<string, string> = {
  archive: "Record",
  cohort: "Cohort",
  calibration: "Calibration",
  risk: "Signal",
};

export function HomeGuardian({ section }: HomeGuardianProps) {
  return (
    <section
      id={section.id}
      aria-labelledby={`${section.id}-title`}
      className="border-b border-rule bg-paper-pure"
    >
      <Container as="div">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
          <SectionHeading
            id={`${section.id}-title`}
            number={section.number}
            title={section.title}
            intro={section.intro}
            systemLabel="Guardian · 阴"
          />
          <StatusLabel tone="concept" label="MVP 早期" />
        </div>

        {/* Four-step continuous process — open layout, not 4 cards */}
        <ol
          className="mt-8 grid grid-cols-1 gap-0"
          aria-label="四步法"
        >
          {section.steps.map((step, idx) => (
            <li
              key={step.id}
              className="grid grid-cols-12 items-baseline gap-3 py-5 sm:grid-cols-12 sm:gap-5 sm:py-6"
            >
              {/* Step index marker — shared axis across all steps */}
              <div className="col-span-1 flex items-start sm:col-span-1">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-sm border border-rule font-mono text-xs text-muted">
                    0{idx + 1}
                  </span>
                  {idx < section.steps.length - 1 && (
                    /* Vertical connector — continuous process feel */
                    <span
                      aria-hidden
                      className="mt-1 hidden h-5 w-px bg-rule sm:block"
                    />
                  )}
                </div>
              </div>

              {/* Step name + label */}
              <div className="col-span-3 sm:col-span-2">
                <p className="font-serif text-base text-ink sm:text-lg">
                  {step.name}
                </p>
                <p className="mt-0.5 font-mono text-[0.65rem] uppercase tracking-wider text-muted">
                  {METHOD_LABELS[step.id] ?? step.id}
                </p>
              </div>

              {/* Step description — spans remaining width */}
              <p className="col-span-11 text-sm leading-relaxed text-ink/80 sm:col-span-9 sm:text-base">
                {step.oneLine}
              </p>
            </li>
          ))}
        </ol>

        {/* Compact merged status note — not two separate cards */}
        <div className="mt-8 flex flex-col gap-4 rounded-sm border border-rule bg-paper p-5 sm:flex-row sm:items-start sm:gap-6 sm:p-6">
          <div className="sm:w-36 sm:shrink-0">
            <p className="font-mono text-[0.65rem] uppercase tracking-wider text-muted">
              当前阶段
            </p>
            <p className="mt-1 text-xs text-muted">
              {section.statusNote}
            </p>
          </div>
          <div className="hidden border-l border-rule sm:block" aria-hidden />
          <div className="sm:flex-1">
            <p className="font-mono text-[0.65rem] uppercase tracking-wider text-muted">
              未来方向（非承诺）
            </p>
            <p className="mt-1 text-xs text-muted">
              {section.futureFocusNote}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
