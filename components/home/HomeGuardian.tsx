/**
 * LELAN TECHNOLOGY · Home · Guardian (乐懒守护) — Archive Coordinate
 *
 * Phase 1E.3-A — Editorial archive coordinate plane.
 *
 * Visual hierarchy:
 *   Layer 0: paper background field
 *   Layer 1: coordinate plane (light graph paper)
 *   Layer 2: archive sheet (the actual content)
 *   Layer 3: GuardianSeal (overlays archive edge)
 *   Layer 4: small annotations (archive id, micro caption)
 *
 * Three-column relationship (desktop):
 *   - Left  : 8-stage lifecycle (Y axis)
 *   - Center: current coordinate + task chain (X axis)
 *   - Right : GuardianSeal + scene label
 *
 * Mobile: stack vertically.
 *
 * Demo state (per D-PHASE2-015 / D-PHASE1E.3-A):
 *   The example uses a 36F startup scenario showing 4 / 8 税务登记 current.
 *   It MUST be labeled as Demo.
 *
 * Components:
 *   - GuardianArchive (client island) — lifecycle state
 *   - GuardianElements (server) — five-dimension archive band
 *   - GuardianSeal (server) — identity mark
 *
 * Server shell + small client island for state.
 */
import { Container } from "@/components/layout/Container";
import { StatusLabel } from "@/components/ui/StatusLabel";
import { guardianMethodSteps } from "@/content/guardian";
import { GuardianArchive } from "@/components/guardian/GuardianArchive";
import { GuardianElements } from "@/components/guardian/GuardianElements";
import { GuardianSeal } from "@/components/guardian/GuardianSeal";
import type { HomeGuardianSection } from "@/content/home";

export function HomeGuardian({ section }: { section: HomeGuardianSection }) {
  return (
    <section
      id={section.id}
      aria-labelledby={`${section.id}-title`}
      className="lelan-divider-coord-fade relative border-b border-rule bg-paper"
    >
      <Container as="div">
        {/* ── Section header ─────────────────────────────────────── */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
          <div className="md:col-span-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="flex items-center gap-1.5 font-mono text-[0.7rem] uppercase tracking-[0.25em] text-muted">
                <span aria-hidden className="inline-block h-px w-4 bg-rule-strong" />
                {section.number} · LELAN GUARDIAN
              </span>
              <StatusLabel tone="concept" label="人生档案" />
              <StatusLabel tone="preview" label="产品演示" />
            </div>

            <h2
              id={`${section.id}-title`}
              className="lede mt-4 text-[clamp(1.75rem,3.5vw,2.75rem)] font-medium leading-tight text-ink"
            >
              {section.title}
            </h2>

            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink sm:text-xl">
              {section.intro}
            </p>

            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
              以生命周期阶段定位当下，将每个阶段的重要事项与生活维度组织进同一套坐标系统。
            </p>

            {/* CTA */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="#guardian-archive"
                className="inline-flex items-center gap-2 rounded-sm border border-ink bg-ink px-4 py-2 text-sm text-paper transition-colors hover:bg-green-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-cinnabar focus-visible:outline-offset-2"
              >
                查看人生坐标
                <span aria-hidden>→</span>
              </a>
              <a
                href="/guardian/demo"
                className="inline-flex items-center gap-2 rounded-sm border border-green bg-green px-4 py-2 text-sm text-paper transition-colors hover:bg-green-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-cinnabar focus-visible:outline-offset-2"
              >
                体验人生档案 Demo
                <span aria-hidden>→</span>
              </a>
              <a
                href="/login"
                className="inline-flex items-center gap-2 rounded-sm border border-rule px-4 py-2 text-sm text-muted transition-colors hover:border-green hover:text-green focus-visible:outline focus-visible:outline-2 focus-visible:outline-cinnabar focus-visible:outline-offset-2"
              >
                登录查看模拟账号
                <span aria-hidden>→</span>
              </a>
            </div>
          </div>

          {/* ── Right: GuardianSeal as visual anchor ──────────── */}
          <aside className="hidden md:col-span-4 md:flex md:items-start md:justify-end">
            <GuardianSeal state="partial" size="lg" profile={null} caption="档案示例 · 兑 · 青年期" />
          </aside>
        </div>

        {/* ── Coordinate archive plane ─────────────────────────────── */}
        <div
          id="guardian-archive"
          className="lelan-perspective mt-10 scroll-mt-20"
        >
          <div className="lelan-corner lelan-bg-coordinate relative rounded-sm border border-rule">
            {/* Coordinate corner marks */}
            <span aria-hidden className="absolute left-2 top-2 font-mono text-[0.6rem] uppercase tracking-wider text-muted">
              Y · 阶段
            </span>
            <span aria-hidden className="absolute right-2 top-2 font-mono text-[0.6rem] uppercase tracking-wider text-muted">
              X · 流程
            </span>

            {/* Archive sheet — the actual content */}
            <div className="lelan-depth-2 lelan-bg-l1 lelan-contact-shadow-2 relative mx-3 my-3 rounded-sm border border-rule">
              <div className="flex items-center justify-between border-b border-rule bg-paper-pure px-5 py-3">
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden
                    className="flex h-6 w-6 items-center justify-center rounded-sm border border-rule font-mono text-[0.6rem] text-muted"
                  >
                    符
                  </span>
                  <p className="font-mono text-[0.65rem] uppercase tracking-wider text-muted">
                    乐懒守护符 · 人生坐标
                  </p>
                </div>
                <p className="font-mono text-[0.6rem] uppercase tracking-wider text-muted/70">
                  Demo · 兑 · 青年期 · 4 / 8
                </p>
              </div>

              <div className="p-5 sm:p-7">
                <GuardianArchive />
              </div>
            </div>
          </div>
        </div>

        {/* ── Five Elements archive band ─────────────────────────── */}
        <div className="mt-10">
          <GuardianElements />
        </div>

        {/* ── Methodology strip ─────────────────────────────────────── */}
        <div className="mt-12">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[0.65rem] uppercase tracking-wider text-muted">
              坐标背后的方法
            </span>
            <span className="h-px flex-1 bg-rule" aria-hidden />
            <span className="font-mono text-[0.6rem] uppercase tracking-wider text-muted/70">
              方法论 · 底层说明
            </span>
          </div>

          <ol className="mt-5 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-5">
            {guardianMethodSteps.map((step) => (
              <li key={step.id} className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-sm border border-rule font-mono text-[0.6rem] text-muted">
                    {step.order}
                  </span>
                  <span className="font-serif text-sm text-ink">{step.name}</span>
                </div>
                <p className="ml-7 font-mono text-[0.6rem] uppercase tracking-wider text-muted">
                  {step.phase}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-muted">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
