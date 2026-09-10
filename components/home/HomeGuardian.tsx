/**
 * LELAN TECHNOLOGY · Home · Guardian (乐懒守护)
 *
 * 视觉与概念上与 Town 区分开：
 * - 不复用 building-grid / character 风格；
 * - 用 archive / research / coordinate / timeline / document 的理性视觉语言；
 * - 表达四步法：人生档案 → 队列建模 → 横断面校准 → 风险预警。
 *
 * 不展示五行 / 八段 / 神话图腾；
 * 不展示伪造医学仪表盘、风险百分比、个体健康画像。
 *
 * Server component，静态。
 */
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatusLabel } from "@/components/ui/StatusLabel";
import { KeyframeDivider } from "@/components/ui/KeyframeDivider";
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

        {/* Four-step method as a research-oriented timeline */}
        <ol
          className="mt-10 grid grid-cols-1 gap-0 overflow-hidden rounded-sm border border-rule bg-paper"
          aria-label="四步法"
        >
          {section.steps.map((step, idx) => (
            <li
              key={step.id}
              className={`grid grid-cols-12 gap-4 px-4 py-5 sm:gap-6 sm:px-6 sm:py-6 ${
                idx < section.steps.length - 1 ? "border-b border-rule" : ""
              }`}
            >
              <div className="col-span-2 sm:col-span-1">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-sm border border-rule font-mono text-xs text-muted">
                  0{idx + 1}
                </span>
              </div>

              <div className="col-span-10 sm:col-span-3">
                <p className="font-serif text-base text-ink sm:text-lg">
                  {step.name}
                </p>
                <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-[0.25em] text-muted">
                  {METHOD_LABELS[step.id] ?? step.id}
                </p>
              </div>

              <p className="col-span-12 text-sm leading-relaxed text-ink/85 sm:col-span-8 sm:text-base">
                {step.oneLine}
              </p>
            </li>
          ))}
        </ol>

        <KeyframeDivider />

        {/* Status / conservative disclaimer block */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <article className="rounded-sm border border-rule bg-paper p-5 sm:p-6">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-muted">
              当前阶段
            </p>
            <p className="mt-3 text-sm leading-relaxed text-ink/85 sm:text-base">
              {section.statusNote}
            </p>
          </article>
          <article className="rounded-sm border border-rule bg-paper p-5 sm:p-6">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-muted">
              未来方向（非承诺）
            </p>
            <p className="mt-3 text-sm leading-relaxed text-ink/85 sm:text-base">
              {section.futureFocusNote}
            </p>
          </article>
        </div>
      </Container>
    </section>
  );
}
