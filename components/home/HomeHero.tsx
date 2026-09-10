/**
 * LELAN TECHNOLOGY · Home · Hero
 *
 * 编辑型、非居中 SaaS hero：
 * - 不使用居中大标题
 * - 左侧密集排版 + 右侧 minimal 几何占位（无伪造截图）
 * - baseline = "把科研能力，变成可被使用的产品。"
 * - intro = 一句话公司定位
 *
 * Server component，不引入客户端状态。
 */
import { Container } from "@/components/layout/Container";
import { StatusLabel } from "@/components/ui/StatusLabel";
import type { HomeHeroSection } from "@/content/home";

interface HomeHeroProps {
  section: HomeHeroSection;
}

export function HomeHero({ section }: HomeHeroProps) {
  return (
    <section
      id={section.id}
      aria-labelledby={`${section.id}-title`}
      className="relative overflow-hidden border-b border-rule bg-paper"
    >
      <Container as="div">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-10">
          {/* Left: typography */}
          <div className="md:col-span-8">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.25em] text-muted">
                {section.number}
              </span>
              <StatusLabel tone="preview" label="公开预览 · noindex" />
            </div>

            <h1
              id={`${section.id}-title`}
              className="lede mt-6 text-[clamp(2rem,5vw,3.5rem)] font-medium leading-[1.1] text-ink"
            >
              {section.title}
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink sm:text-lg">
              {section.baseline}
            </p>

            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
              {section.subBaseline}
            </p>

            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
              {section.intro}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#town"
                className="inline-flex items-center gap-2 rounded-sm border border-ink bg-ink px-4 py-2 text-sm text-paper transition-colors hover:bg-green-dark"
              >
                查看成果小镇
                <span aria-hidden>→</span>
              </a>
              <a
                href="#ai"
                className="inline-flex items-center gap-2 rounded-sm border border-rule px-4 py-2 text-sm text-ink transition-colors hover:border-green hover:text-green"
              >
                申请 Beta
              </a>
            </div>
          </div>

          {/* Right: minimal editorial marker — restrained geometry only */}
          <aside className="md:col-span-4">
            <div
              className="relative ml-auto h-48 w-full max-w-xs rounded-sm border border-rule bg-paper-pure p-5 sm:h-64"
              aria-hidden
            >
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.25em] text-muted">
                Editorial Mark
              </p>
              <p className="mt-2 font-serif text-sm text-ink">
                把科研能力，<br />
                变成可被使用的产品。
              </p>
              <div className="mt-4 flex items-center gap-2">
                <span className="block h-1 w-1 rounded-full bg-cinnabar" />
                <span className="block h-px w-12 bg-rule" />
                <span className="block h-1 w-1 rounded-full bg-green" />
              </div>
              <p className="mt-6 font-mono text-[0.6rem] uppercase tracking-[0.25em] text-muted">
                Town · Guardian · AI
              </p>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}
