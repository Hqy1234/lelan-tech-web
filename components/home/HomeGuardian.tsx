/**
 * LELAN TECHNOLOGY · Home · Guardian (乐懒守护) — Life Archive
 *
 * Phase 1E.4-A — Subject Restoration + De-duplication.
 *
 * Section role: this is the EMOTIONAL / NARRATIVE climax of the homepage.
 * It must read like an Eastern life archive being opened — not a dashboard.
 *
 * What changed in Phase 1E.4-A:
 *   - REMOVED the four-layer overlay stack (coordinate field → archive sheet
 *     → absolute seal at left:-12px → absolute glass panel pinned right:0 over
 *     26% of the sheet). The glass panel sat on top of the archive content, so
 *     the archive was read through a blur, and the section had no subject.
 *   - REMOVED the duplicated current-coordinate readout. "兑 · 青年期 · 4/8"
 *     previously appeared THREE times in this section (a section-level aside,
 *     the sheet header, and the glass panel). There is now exactly ONE
 *     authoritative current-coordinate surface.
 *   - The subject now lives in GuardianArchive (one large current-stage plate
 *     that follows stage selection).
 *
 * Glass budget for this section: exactly ONE surface — the live current
 * coordinate panel. Everything else is paper.
 *
 * Guardian ≠ Town. This is archive / coordinate / lifecycle — never a globe.
 */

import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { StatusLabel } from "@/components/ui/StatusLabel";
import {
  getGuardianStageDisplayName,
  guardianMethodSteps,
  guardianStages,
  DEFAULT_STAGE_ID,
} from "@/content/guardian";
import { GuardianArchive } from "@/components/guardian/GuardianArchive";
import { GuardianElements } from "@/components/guardian/GuardianElements";
import type { HomeGuardianSection } from "@/content/home";

export function HomeGuardian({ section }: { section: HomeGuardianSection }) {
  /**
   * The one authoritative current coordinate.
   * Mirrors the default selected stage (D-PHASE2-015: DEFAULT_STAGE_ID = DUI).
   * Demo-labelled because no real user archive exists on the homepage.
   */
  const defaultStage =
    guardianStages.find((s) => s.id === DEFAULT_STAGE_ID) ?? guardianStages[0];
  const done = defaultStage.demoDoneCount;
  const total = defaultStage.exampleTasks.length;
  const progressPct = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <section
      id={section.id}
      aria-labelledby={`${section.id}-title`}
      className="lelan-section-field lelan-section-field-guardian lelan-divider-coord-fade relative border-b border-rule bg-paper"
    >
      <Container as="div">
        {/* ── Section header + the single live coordinate surface ───────── */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
          <div className="md:col-span-7">
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

          {/* ── THE one glass surface in this section ─────────────────────
              Live current coordinate. Compact, right-aligned, and the only
              place this state is stated. Hidden on small screens where the
              same facts are already present inline in the archive below. */}
          <aside className="hidden md:col-span-5 md:flex md:items-start md:justify-end">
            <div
              className="lelan-glass-raised w-full max-w-[15rem] rounded-sm p-3"
              role="status"
              aria-label="当前坐标状态"
            >
              <div className="flex items-center gap-2">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-cinnabar" />
                <p className="font-mono text-[0.6rem] uppercase tracking-wider text-ink/80">
                  当前坐标 · LIVE
                </p>
              </div>

              <p className="mt-2 font-serif text-lg leading-tight text-ink">
                {/* Full life-stage display ⇒ canonical displayName. */}
                {getGuardianStageDisplayName(defaultStage.id)}
              </p>
              <p className="mt-0.5 font-mono text-[0.6rem] text-muted">
                {defaultStage.ageRange}
              </p>

              <div className="mt-2.5 flex items-center justify-between gap-2 border-t border-rule/40 pt-2">
                <span className="font-mono text-[0.55rem] uppercase tracking-wider text-muted">
                  示例进度
                </span>
                <span className="font-mono text-[0.6rem] text-ink/80">
                  {done} / {total}
                </span>
              </div>
              <div className="mt-1 h-1 overflow-hidden rounded-full bg-rule">
                <div
                  className="h-full rounded-full bg-green"
                  style={{ width: `${progressPct}%` }}
                />
              </div>

              <p className="mt-2 font-mono text-[0.55rem] uppercase tracking-wider text-muted/70">
                Demo · 非真实档案
              </p>
            </div>
          </aside>
        </div>

        {/* ── The archive spread — one open life archive ─────────────────── */}
        <div
          id="guardian-archive"
          className="lelan-bg-coordinate mt-10 scroll-mt-20 rounded-sm border border-rule px-4 py-6 sm:px-6 sm:py-8"
        >
          <GuardianArchive />
        </div>

        {/* ── Five Elements archive band ────────────────────────────────── */}
        <div className="mt-10">
          <GuardianElements />
        </div>

        {/* ── Methodology strip — the scientific layer, kept quiet ──────── */}
        <div className="mt-9">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[0.65rem] uppercase tracking-wider text-muted">
              坐标背后的方法
            </span>
            <span aria-hidden className="h-px flex-1 bg-rule" />
            <span className="font-mono text-[0.6rem] uppercase tracking-wider text-muted/60">
              科学层 · 文化层仅负责记忆
            </span>
          </div>

          <ol className="mt-4 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-5">
            {guardianMethodSteps.map((step) => (
              <li key={step.id} className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-sm border border-rule font-mono text-[0.6rem] text-muted">
                    {step.order}
                  </span>
                  <span className="font-serif text-sm text-ink">{step.name}</span>
                </div>
                <p className="text-xs leading-relaxed text-muted">
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
