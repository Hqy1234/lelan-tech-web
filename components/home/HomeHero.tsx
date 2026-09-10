/**
 * LELAN TECHNOLOGY · Home · Hero
 *
 * Phase 1D-G3 — Guardian-first homepage:
 * - Three product pillars in hero: 乐懒守护 / 成果小镇 / 乐懒 AI
 * - No fake Beta CTA — AI is "已上线体验版"
 * - Clean, editorial layout
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
  return (
    <section
      id={section.id}
      aria-labelledby={`${section.id}-title`}
      className="relative overflow-hidden border-b border-rule bg-paper"
    >
      <Container as="div">
        <div className="py-12 sm:py-16">
          {/* Eyebrow */}
          <div className="flex items-center gap-3">
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.25em] text-muted">
              {section.number}
            </span>
            <StatusLabel tone="preview" label="公开预览 · noindex" />
          </div>

          {/* Title */}
          <h1
            id={`${section.id}-title`}
            className="lede mt-4 text-[clamp(2rem,5vw,3.5rem)] font-medium leading-[1.1] text-ink"
          >
            {section.title}
          </h1>

          {/* Baseline */}
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink sm:text-lg">
            {section.baseline}
          </p>

          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
            {section.subBaseline}
          </p>

          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
            {section.intro}
          </p>

          {/* ── Three product pillars ─────────────────────────────────── */}
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {section.pillars.map((pillar, idx) => {
              const anchors: Record<string, string> = {
                乐懒守护: "#guardian",
                成果小镇: "#town",
                乐懒AI: "#ai",
              };
              const anchor = anchors[pillar.name] ?? "#";
              return (
                <Link
                  key={pillar.name}
                  href={anchor}
                  className="group flex flex-col gap-2 rounded-sm border border-rule bg-paper-pure p-4 transition-colors hover:border-green/40 hover:bg-paper"
                >
                  <div className="flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-sm border border-rule font-mono text-[0.55rem] text-muted">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="font-serif text-sm font-medium text-ink group-hover:text-green">
                      {pillar.name}
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed text-muted">
                    {pillar.description}
                  </p>
                  <span className="mt-1 font-mono text-[0.6rem] uppercase tracking-wider text-muted/60 group-hover:text-green/80">
                    了解 →
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Secondary CTA */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-sm border border-ink px-4 py-2 text-sm text-ink transition-colors hover:border-green hover:text-green"
            >
              登录查看模拟人生档案
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
