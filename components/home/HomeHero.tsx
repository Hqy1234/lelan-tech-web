/**
 * LELAN TECHNOLOGY · Home · Hero
 *
 * Phase 1E.3-A — Editorial Hero.
 *
 * Structure:
 *   - Left  ≈60% : brand identity, baseline, sub-baseline, two CTAs
 *   - Right ≈40% : two system nodes (Guardian / Town) + small annotation
 *                  then a separate software row (LeLan AI).
 *
 * NOT three equal pillars. The relationship "two systems + one software"
 * is structural, not a third pillar card.
 *
 * Visual: premium editorial with position node + section number + archive corner +
 * small annotation. No large imagery, no 3D, no glow. Hero intentionally does
 * NOT use Guardian's coordinate grid language — it is quiet brand opening.
 *
 * Server component.
 */
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { StatusLabel } from "@/components/ui/StatusLabel";
import type { HomeHeroSection } from "@/content/home";

interface HomeHeroProps {
  section: HomeHeroSection;
}

export function HomeHero({ section }: HomeHeroProps) {
  const systemNodes = section.pillars.filter((p) => p.href !== "#ai");
  const software = section.software;

  return (
    <section
      id={section.id}
      aria-labelledby={`${section.id}-title`}
      className="lelan-section lelan-section-hero relative overflow-hidden"
    >
      <Container as="div" className="lelan-chapter--opening">
        <div className="grid grid-cols-1 gap-x-10 gap-y-10 md:grid-cols-12">
          {/* ── LEFT: Brand identity ───────────────────────────────── */}
          <div className="md:col-span-7">
            {/* Eyebrow + section number + status */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="flex items-center gap-1.5 font-mono text-[0.7rem] uppercase tracking-[0.25em] text-muted">
                <span aria-hidden className="inline-block h-px w-4 bg-rule-strong" />
                {section.number} · {section.id.toUpperCase()}
              </span>
              <StatusLabel tone="preview" label="公开预览" />
            </div>

            {/* Title — display scale */}
            <h1
              id={`${section.id}-title`}
              className="lede mt-5 text-[clamp(2.25rem,5.5vw,4.25rem)] font-medium leading-[1.05] tracking-tight text-ink"
            >
              {section.title}
            </h1>

            {/* Baseline */}
            <p className="mt-6 max-w-xl text-[clamp(1.0625rem,1.6vw,1.25rem)] leading-relaxed text-ink">
              {section.baseline}
            </p>

            {/* Sub-baseline */}
            <p className="mt-3 max-w-xl text-base leading-relaxed text-muted">
              {section.subBaseline}
            </p>

            {/* CTA strip */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="#guardian"
                className="inline-flex items-center gap-2 rounded-sm border border-ink bg-ink px-5 py-2.5 text-sm text-paper transition-colors hover:bg-green-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-cinnabar focus-visible:outline-offset-2"
              >
                了解乐懒守护
                <span aria-hidden>→</span>
              </Link>
              <Link
                href="/guardian/demo"
                prefetch={false}
                className="inline-flex items-center gap-2 rounded-sm border border-green px-5 py-2.5 text-sm text-green transition-colors hover:bg-green/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cinnabar focus-visible:outline-offset-2"
              >
                体验人生档案 Demo
                <span aria-hidden>→</span>
              </Link>
            </div>

            {/* Small annotation */}
            <p className="mt-6 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted/80">
              两大系统 · 一项软件 · 一份长期可被使用的人生档案
            </p>
          </div>

          {/* ── RIGHT: Two systems + one software row ──────────────── */}
          <aside
            className="relative md:col-span-5"
            aria-label="乐懒科技产品关系"
          >
            <div className="flex h-full flex-col gap-5">
              {/* Right product nodes — quiet paper surface, no grid texture */}
              <div className="relative rounded-sm border border-rule bg-paper-soft/60 p-5">
                <p className="font-mono text-[0.65rem] uppercase tracking-wider text-muted">
                  02 · 系统坐标
                </p>
                <p className="mt-1 font-serif text-lg text-ink">
                  两大系统
                </p>

                {/* Two system nodes */}
                <ul className="mt-4 flex flex-col gap-3">
                  {systemNodes.map((sys, idx) => (
                    <li key={sys.name}>
                      <Link
                        href={sys.href}
                        className="group relative flex items-start gap-3 rounded-sm border border-transparent bg-paper-pure/70 p-3 transition-colors hover:border-green/40 hover:bg-paper-pure focus-visible:outline focus-visible:outline-2 focus-visible:outline-cinnabar focus-visible:outline-offset-2"
                      >
                        <span
                          aria-hidden
                          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-rule font-mono text-[0.65rem] text-muted transition-colors group-hover:border-green group-hover:bg-green group-hover:text-paper"
                        >
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block font-serif text-base text-ink group-hover:text-green">
                            {sys.name}
                          </span>
                          <span className="mt-0.5 block text-xs leading-relaxed text-muted">
                            {sys.description}
                          </span>
                        </span>
                        <span
                          aria-hidden
                          className="self-center font-mono text-[0.6rem] uppercase tracking-wider text-muted/60 transition-colors group-hover:text-green"
                        >
                          →
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Software row — separated visually from system pillars */}
              <Link
                href={software.href}
                className="group relative flex items-start gap-3 rounded-sm border border-green/30 bg-green/5 p-4 transition-colors hover:border-green hover:bg-green/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cinnabar focus-visible:outline-offset-2"
              >
                <span
                  aria-hidden
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-sm border border-green/40 font-mono text-[0.6rem] text-green"
                >
                  软
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-serif text-base text-ink group-hover:text-green">
                    {software.name}
                  </span>
                  <span className="mt-0.5 block text-xs leading-relaxed text-muted">
                    {software.description}
                  </span>
                  <span className="mt-2 inline-flex items-center gap-1.5 rounded-sm border border-green/40 bg-paper-pure px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-wider text-green">
                    <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-green" />
                    {software.status}
                  </span>
                </span>
                <span
                  aria-hidden
                  className="self-center font-mono text-[0.6rem] uppercase tracking-wider text-muted/60 transition-colors group-hover:text-green"
                >
                  →
                </span>
              </Link>

              {/* Tiny disclaimer annotation */}
              <p className="font-mono text-[0.65rem] uppercase tracking-wider text-muted/70">
                公开预览 · noindex
              </p>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}
