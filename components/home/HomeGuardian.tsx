/**
 * LELAN TECHNOLOGY · Home · Guardian (乐懒守护) — Archive Coordinate
 *
 * Phase 1E.3-C-R1 — Four-layer spatial composition (R1 rework).
 *
 * Visual hierarchy (now with obvious layer offsets + overlaps):
 *   Layer 0: paper / coordinate field  (background)
 *   Layer 1: archive sheet             (the actual content, sits in middle)
 *   Layer 2: GuardianSeal overlay      (overlaps bottom-left of archive sheet)
 *   Layer 3: LIVE Glass overlay        (overlaps right side, 22–28% width)
 *
 * Layer offsets are visible via translateZ + position offset — not just stacked.
 * The seal hangs off the bottom-left edge; the glass panel covers the right
 * column with archive content (lifecycle / task flow) visible through blur.
 *
 * Demo state: 36F startup scenario showing 4 / 8 税务登记 current.
 * MUST be labeled as Demo.
 *
 * 28岁仍是 "离 · 青少年 20–29" — preserved.
 */

import Link from "next/link";
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
      className="lelan-section-field lelan-section-field-guardian lelan-divider-coord-fade relative border-b border-rule bg-paper"
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
              <Link
                href="/guardian/demo"
                prefetch={false}
                className="inline-flex items-center gap-2 rounded-sm border border-green bg-green px-4 py-2 text-sm text-paper transition-colors hover:bg-green-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-cinnabar focus-visible:outline-offset-2"
              >
                体验人生档案 Demo
                <span aria-hidden>→</span>
              </Link>
              <Link
                href="/login"
                prefetch={false}
                className="inline-flex items-center gap-2 rounded-sm border border-rule px-4 py-2 text-sm text-muted transition-colors hover:border-green hover:text-green focus-visible:outline focus-visible:outline-2 focus-visible:outline-cinnabar focus-visible:outline-offset-2"
              >
                登录查看模拟账号
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>

          {/* ── Right: section meta (Seal moved to overlay below) ─── */}
          <aside className="hidden md:col-span-4 md:flex md:items-start md:justify-end">
            <div className="flex flex-col items-end gap-2 text-right">
              <p className="lelan-archive-id">DEMO · STAGE 04 / 08</p>
              <p className="font-serif text-sm text-ink">兑 · 青年期</p>
              <p className="font-mono text-[0.6rem] uppercase tracking-wider text-muted">
                4 / 8 税务登记 · 当前
              </p>
            </div>
          </aside>
        </div>

        {/* ── Coordinate archive plane ─────────────────────────────── */}
        <div
          id="guardian-archive"
          className="lelan-perspective mt-10 scroll-mt-20"
        >
          {/* L0: coordinate field — wider than archive sheet to show edges */}
          <div className="lelan-corner lelan-bg-coordinate relative overflow-visible rounded-sm border border-rule px-6 py-10 sm:px-8 sm:py-12">
            {/* Coordinate corner marks */}
            <span aria-hidden className="absolute left-2 top-2 font-mono text-[0.6rem] uppercase tracking-wider text-muted">
              Y · 阶段
            </span>
            <span aria-hidden className="absolute right-2 top-2 font-mono text-[0.6rem] uppercase tracking-wider text-muted">
              X · 流程
            </span>
            <span aria-hidden className="absolute bottom-2 left-2 font-mono text-[0.6rem] uppercase tracking-wider text-muted/70">
              100 × 100
            </span>
            <span aria-hidden className="absolute bottom-2 right-2 font-mono text-[0.6rem] uppercase tracking-wider text-muted/70">
              LELAN · 坐标
            </span>

            {/* L1: archive sheet — the actual content
                Sits with offset inside coordinate field so edges are visible */}
            <div className="relative ml-2 mr-12 mt-4 mb-8 sm:ml-6 sm:mr-20 sm:mt-6 sm:mb-12">
              <div
                className="lelan-depth-2 lelan-bg-l1 lelan-contact-shadow-3 relative overflow-visible rounded-sm border border-rule"
                style={{ minHeight: "440px" }}
              >
                {/* Sheet header */}
                <div className="flex items-center justify-between border-b border-rule bg-paper-pure px-5 py-3">
                  <div className="flex items-center gap-3">
                    <span
                      aria-hidden
                      className="flex h-6 w-6 items-center justify-center rounded-sm border border-rule bg-paper font-mono text-[0.6rem] text-muted"
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

                {/* Sheet body — content visible through glass (lifecycle + tasks) */}
                <div className="p-5 pr-[28%] sm:p-7 sm:pr-[28%]">
                  <GuardianArchive />
                </div>

                {/* Edge highlight line — makes paper visible behind glass */}
                <div
                  aria-hidden
                  className="archive-paper-edge"
                  style={{
                    top: "0",
                    right: "26%",
                    width: "1px",
                    bottom: "0",
                  }}
                />
              </div>

              {/* L2: GuardianSeal — overlaps bottom-left of archive sheet */}
              <div className="guardian-seal-overlay">
                <GuardianSeal
                  state="partial"
                  size="lg"
                  profile={null}
                  caption="档案示例 · 兑 · 青年期"
                />
              </div>

              {/* L3: LIVE Glass — overlaps right side of archive sheet (22–28%) */}
              <div
                className="guardian-glass-overlay"
                role="status"
                aria-label="当前坐标状态"
              >
                <div className="lelan-glass-raised h-full rounded-sm p-3 sm:p-4">
                  <div className="flex items-center gap-2 border-b border-rule/40 pb-2">
                    <span
                      aria-hidden
                      className="h-1.5 w-1.5 rounded-full bg-cinnabar"
                    />
                    <p className="font-mono text-[0.6rem] uppercase tracking-wider text-ink/80">
                      当前坐标 · LIVE
                    </p>
                  </div>

                  <div className="mt-3">
                    <p className="font-mono text-[0.55rem] uppercase tracking-wider text-muted">
                      STAGE
                    </p>
                    <p className="mt-0.5 font-serif text-lg text-ink">
                      兑 · 青年期
                    </p>
                    <p className="text-[0.65rem] leading-relaxed text-muted">
                      20–29 · 离 · 青少年
                    </p>
                  </div>

                  <div className="mt-3 border-t border-rule/40 pt-2">
                    <p className="font-mono text-[0.55rem] uppercase tracking-wider text-muted">
                      SCENE
                    </p>
                    <p className="mt-0.5 font-serif text-sm text-ink/90">
                      创业场景
                    </p>
                    <p className="text-[0.65rem] text-muted">
                      4 / 8 税务登记
                    </p>
                  </div>

                  <div className="mt-3 border-t border-rule/40 pt-2">
                    <div className="flex items-center gap-2">
                      <span
                        aria-hidden
                        className="h-1.5 w-1.5 rounded-full bg-cinnabar"
                      />
                      <span className="font-mono text-[0.6rem] uppercase tracking-wider text-muted">
                        待办 5 项
                      </span>
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <span
                        aria-hidden
                        className="h-1.5 w-1.5 rounded-full bg-green"
                      />
                      <span className="font-mono text-[0.6rem] uppercase tracking-wider text-muted">
                        完成 3 项
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 border-t border-rule/40 pt-2">
                    <p className="font-mono text-[0.55rem] uppercase tracking-wider text-muted">
                      PROGRESS
                    </p>
                    <div className="mt-1 h-1 overflow-hidden rounded-full bg-rule">
                      <div
                        className="h-full rounded-full bg-green"
                        style={{ width: "37.5%" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Coordinate corner ticks (purely decorative) */}
            <div aria-hidden className="pointer-events-none absolute left-0 top-0 h-3 w-3 border-l border-t border-rule-strong" />
            <div aria-hidden className="pointer-events-none absolute right-0 top-0 h-3 w-3 border-r border-t border-rule-strong" />
            <div aria-hidden className="pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-b border-l border-rule-strong" />
            <div aria-hidden className="pointer-events-none absolute bottom-0 right-0 h-3 w-3 border-b border-r border-rule-strong" />
          </div>
        </div>

        {/* ── Five Elements archive band ─────────────────────────── */}
        <div className="mt-16">
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
