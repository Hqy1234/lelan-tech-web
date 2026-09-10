/**
 * LELAN TECHNOLOGY · Home · Hero
 *
 * Phase 1C refinement:
 * - Reduced right-side "Editorial Mark" replaced by a compact LeLan relationship
 *   motif: 乐懒科技 → [成果小镇 · 守护] · AI bridge.
 * - Chinese-first hierarchy: 乐懒科技 visually leads, LELAN TECHNOLOGY secondary.
 * - Beta CTA updated: "申请 Beta" → "Beta 即将开放" (no fake submission flow).
 *
 * Server component.
 */
import { Container } from "@/components/layout/Container";
import { StatusLabel } from "@/components/ui/StatusLabel";
import type { HomeHeroSection } from "@/content/home";

interface HomeHeroProps {
  section: HomeHeroSection;
}

/**
 * Compact LeLan relationship motif.
 *
 * Communicates:
 *   乐懒科技
 *     ↓
 *   成果小镇 · 守护  ·  AI bridge
 *
 * Restrained typography + thin rules — no illustration, no game art.
 */
function LeLanMotif() {
  return (
    <div
      className="flex flex-col items-start gap-0"
      aria-hidden="true"
    >
      {/* Root: 乐懒科技 */}
      <div className="flex items-baseline gap-2">
        <span className="font-serif text-base font-medium tracking-tight text-ink">
          乐懒
        </span>
        <span className="font-serif text-base tracking-tight text-ink/70">
          科技
        </span>
      </div>

      {/* Vertical connector */}
      <div className="ml-px mt-1.5 h-3 w-px bg-rule" />

      {/* Second tier: Town + Guardian paired */}
      <div className="mt-1 flex items-start gap-3">
        <div className="flex flex-col items-start">
          <div className="h-px w-6 bg-rule" />
          <span className="mt-1 font-mono text-[0.6rem] uppercase tracking-wider text-muted">
            成果小镇
          </span>
          <span className="mt-0.5 font-mono text-[0.55rem] uppercase tracking-wider text-muted/60">
            阳
          </span>
        </div>

        {/* AI bridge: small node */}
        <div className="relative flex flex-col items-center pt-2">
          <div className="mb-1.5 h-1.5 w-1.5 rounded-full border border-green/50 bg-green/20" />
          <span className="font-mono text-[0.55rem] uppercase tracking-wider text-green-soft">
            AI
          </span>
        </div>

        <div className="flex flex-col items-start">
          <div className="h-px w-6 bg-rule" />
          <span className="mt-1 font-mono text-[0.6rem] uppercase tracking-wider text-muted">
            乐懒守护
          </span>
          <span className="mt-0.5 font-mono text-[0.55rem] uppercase tracking-wider text-muted/60">
            阴
          </span>
        </div>
      </div>
    </div>
  );
}

export function HomeHero({ section }: HomeHeroProps) {
  return (
    <section
      id={section.id}
      aria-labelledby={`${section.id}-title`}
      className="relative overflow-hidden border-b border-rule bg-paper"
    >
      <Container as="div">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-10">
          {/* Left: typography */}
          <div className="md:col-span-8">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.25em] text-muted">
                {section.number}
              </span>
              <StatusLabel tone="preview" label="公开预览 · noindex" />
            </div>

            {/* Chinese-first hierarchy */}
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
              <span className="inline-flex items-center gap-2 rounded-sm border border-rule px-4 py-2 text-sm text-muted">
                Beta 即将开放
              </span>
            </div>
          </div>

          {/* Right: compact LeLan relationship motif */}
          <aside className="md:col-span-4">
            <div
              className="ml-auto max-w-xs rounded-sm border border-rule bg-paper-pure p-5 sm:p-6"
              aria-label="乐懒科技产品关系图"
            >
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.25em] text-muted">
                System
              </p>
              <div className="mt-3">
                <LeLanMotif />
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}
