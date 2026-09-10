/**
 * LELAN TECHNOLOGY · Home · Guardian (乐懒守护) V2
 *
 * Phase 2 — Life Coordinate System prototype.
 *
 * Product hierarchy:
 *   1. 人生档案 + 乐懒守护符 · 人生坐标（主视觉）
 *   2. 坐标化闯关（八阶段 × 当前任务）
 *   3. 五行生活维度 teaser
 *   4. 科学方法论（降级为底层说明）
 *
 * Visual language:
 *   - restrained editorial UI + oriental lifecycle symbols
 *   - paper/document metaphor, thin rules, coordinate lines
 *   - NOT a game, NOT a fortune-telling page, NOT a Town clone
 *
 * Components:
 *   - GuardianArchive: client island (lifecycle + task flow state)
 *   - GuardianLifecycle: server (Y-axis rail)
 *   - GuardianTaskFlow: server (X-axis task chain)
 *   - GuardianElements: server (五行 teaser)
 *   - Methodology strip: server (method steps)
 *
 * Default active stage: 04 兑 · 青年期.
 *
 * Server component (shell) + Client island (interaction).
 */
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { StatusLabel } from "@/components/ui/StatusLabel";
import {
  guardianHomeContent,
  guardianMethodSteps,
  guardianArchiveCaption,
} from "@/content/guardian";
import { visualAssets } from "@/content/assets";
import { GuardianArchive } from "@/components/guardian/GuardianArchive";
import { GuardianElements } from "@/components/guardian/GuardianElements";

/** Resolve a visual asset by id */
function resolveAsset(id: string) {
  return (visualAssets as Record<string, { src: string; alt: string }>)[id] ?? null;
}

export function HomeGuardian() {
  const nuwa = resolveAsset("guardianNuwa");
  const content = guardianHomeContent;

  return (
    <section
      id="guardian"
      aria-labelledby="guardian-title"
      className="border-b border-rule bg-paper"
    >
      <Container as="div">
        {/* ── Section Header ───────────────────────────────────────── */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
          <div className="md:col-span-8">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.25em] text-muted">
                {content.eyebrow}
              </span>
              <StatusLabel tone="concept" label="坐标化系统" />
            </div>

            <h2
              id="guardian-title"
              className="lede mt-4 text-2xl font-medium leading-tight text-ink sm:text-3xl md:text-4xl"
            >
              {content.title}
            </h2>

            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink sm:text-xl">
              {content.headline}
            </p>

            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
              {content.body}
            </p>

            {/* CTA */}
            <div className="mt-6 flex items-center gap-4">
              <a
                href={content.ctaHref}
                className="inline-flex items-center gap-2 rounded-sm border border-ink bg-ink px-4 py-2 text-sm text-paper transition-colors hover:bg-green-dark"
              >
                {content.ctaLabel}
                <span aria-hidden>→</span>
              </a>
            </div>
          </div>

          {/* ── Nuwa anchor visual ─────────────────────────────────── */}
          {nuwa && (
            <aside
              className="hidden md:col-span-4 md:flex md:items-start md:justify-end"
              aria-hidden
            >
              <div className="relative w-40 overflow-hidden rounded-sm border border-rule">
                <Image
                  src={nuwa.src}
                  alt={nuwa.alt}
                  width={160}
                  height={160}
                  sizes="160px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-paper/60 to-transparent" />
                <p className="absolute bottom-2 left-3 font-mono text-[0.6rem] uppercase tracking-wider text-muted">
                  首席守护官
                </p>
              </div>
            </aside>
          )}
        </div>

        {/* Archive Caption */}
        <p className="mt-6 text-xs text-muted">
          {guardianArchiveCaption}
        </p>

        {/* ── LIFE ARCHIVE UI — 乐懒守护符 · 人生坐标 ─────────────── */}
        <div className="mt-8">
          {/* Archive frame */}
          <div className="overflow-hidden rounded-sm border border-rule bg-paper-pure">
            {/* Archive header bar */}
            <div className="flex items-center justify-between border-b border-rule bg-paper px-4 py-2">
              <div className="flex items-center gap-3">
                <span
                  aria-hidden
                  className="flex h-5 w-5 items-center justify-center rounded-sm border border-rule font-mono text-[0.55rem] text-muted"
                >
                  符
                </span>
                <p className="font-mono text-[0.65rem] uppercase tracking-wider text-muted">
                  乐懒守护符 · 人生坐标
                </p>
              </div>
              <p className="font-mono text-[0.6rem] uppercase tracking-wider text-muted/70">
                界面示意 · 非真实数据
              </p>
            </div>

            {/* Archive content */}
            <div className="p-4 sm:p-6">
              {/* Interactive archive — client island */}
              <GuardianArchive />
            </div>
          </div>
        </div>

        {/* ── Five Elements teaser ─────────────────────────────────── */}
        <div className="mt-8">
          <GuardianElements />
        </div>

        {/* ── Methodology strip (降级为底层说明) ───────────────────── */}
        <div className="mt-10">
          {/* Header */}
          <div className="flex items-center gap-3">
            <span className="font-mono text-[0.65rem] uppercase tracking-wider text-muted">
              坐标背后的方法
            </span>
            <span className="h-px flex-1 bg-rule" aria-hidden />
          </div>

          {/* Method steps — open list, not cards */}
          <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-5">
            {guardianMethodSteps.map((step) => (
              <div key={step.id} className="flex flex-col gap-1">
                {/* Step header */}
                <div className="flex items-center gap-2">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-sm border border-rule font-mono text-[0.6rem] text-muted">
                    {step.order}
                  </span>
                  <dt className="font-serif text-sm text-ink">
                    {step.name}
                  </dt>
                </div>
                {/* Phase label */}
                <dd className="ml-7 font-mono text-[0.6rem] uppercase tracking-wider text-muted">
                  {step.phase}
                </dd>
                {/* Description */}
                <dd className="mt-1 text-xs leading-relaxed text-muted">
                  {step.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Watermark notice for nuwa */}
        <p className="mt-6 text-xs text-muted/50">
          注：女娲形象素材含水印，版权状态待生产前复核与替换。
        </p>
      </Container>
    </section>
  );
}
