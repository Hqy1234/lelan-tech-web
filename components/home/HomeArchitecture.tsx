/**
 * LELAN TECHNOLOGY · Home · Two-System Architecture
 *
 * 解释公司架构：两个主要系统 + AI 软件桥接。
 *
 * 视觉处理：纯排版 + 编辑规则线 + 一个最小的"太极"提示性几何
 * （仅作为结构提示，不构建复杂插画）。
 *
 * 不引入神秘化解释；仅用作空间结构隐喻。
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
      <Container as="div">
        <SectionHeading
          id={`${section.id}-title`}
          number={section.number}
          title={section.title}
          intro={section.intro}
        />

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {section.systems.map((sys) => (
            <article
              key={sys.id}
              className="group relative rounded-sm border border-rule bg-paper-pure p-6 transition-colors hover:border-green/40 sm:p-8"
            >
              <div className="flex items-center gap-3">
                <span
                  aria-hidden
                  className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-ink/30 font-mono text-[0.65rem] uppercase text-ink/70"
                >
                  {sys.id === "town" ? "阳" : "阴"}
                </span>
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-muted">
                  System · {sys.id === "town" ? "01" : "02"}
                </p>
              </div>

              <h3 className="lede mt-4 text-xl font-medium leading-tight text-ink sm:text-2xl">
                {sys.name}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-ink/85 sm:text-base">
                {sys.oneLine}
              </p>

              <a
                href={sys.id === "town" ? "#town" : "#guardian"}
                className="mt-5 inline-flex items-center gap-2 text-sm text-green transition-colors hover:text-green-dark"
              >
                查看详情
                <span aria-hidden>→</span>
              </a>
            </article>
          ))}
        </div>

        {/* AI bridge — explicit non-third-column layout */}
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
          <p className="text-sm leading-relaxed text-ink/85 sm:text-base">
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted">
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
