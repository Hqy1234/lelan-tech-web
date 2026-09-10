/**
 * LELAN TECHNOLOGY · Home · LeLan AI
 *
 * Phase 1D-G3 — Based on lelan-shouhu read-only audit:
 * - Product is "already existing" — not "Beta 即将开放"
 * - Verified features from actual code:
 *   text input / .docx upload (≤10MB) / 3 intensity levels /
 *   AIGC analysis / de-AI naturalization / 7 Word outputs /
 *   DeepSeek-v4-Flash / no login required
 * - Honest positioning: independent product + integration planned
 * - No public URL confirmed → secondary CTA honest
 *
 * Server component.
 */
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatusLabel } from "@/components/ui/StatusLabel";
import type { HomeAiSection } from "@/content/home";

interface HomeAiProps {
  section: HomeAiSection;
}

export function HomeAi({ section }: HomeAiProps) {
  return (
    <section
      id={section.id}
      aria-labelledby={`${section.id}-title`}
      className="border-b border-rule bg-paper-pure"
    >
      <Container as="div">
        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
          <SectionHeading
            id={`${section.id}-title`}
            number={section.number}
            title={section.title}
            intro={section.intro}
            systemLabel="独立软件产品"
          />
          <StatusLabel tone="preview" label="体验版可用" />
        </div>

        {/* Positioning sentence */}
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-ink/85 sm:text-lg">
          {section.positioning}
        </p>

        {/* Verified features grid */}
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {section.verifiedFeatures.map((feat) => (
            <div
              key={feat.label}
              className="rounded-sm border border-rule bg-paper p-3"
            >
              <p className="font-serif text-sm text-ink">{feat.label}</p>
              <p className="mt-1 text-xs text-muted">{feat.detail}</p>
            </div>
          ))}
        </div>

        {/* Workflow steps */}
        <ol
          className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4"
          aria-label="AI 处理流程"
        >
          {section.flowSteps.map((step, idx) => (
            <li
              key={step.label}
              className="flex flex-col gap-1 rounded-sm border border-rule bg-paper p-4"
            >
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-muted">
                  {String(idx + 1).padStart(2, "0")}
                </span>
              </div>
              <p className="font-serif text-base text-ink sm:text-lg">
                {step.label}
              </p>
              <p className="text-xs text-muted">{step.hint}</p>
            </li>
          ))}
        </ol>

        {/* UI mock — product interface illustration */}
        <div className="mt-8 overflow-hidden rounded-sm border border-rule bg-paper">
          {/* Mock header bar */}
          <div className="flex items-center justify-between border-b border-rule bg-paper-pure px-4 py-2">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-muted">
              UI Mock · 乐懒 AI
            </p>
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-cinnabar">
              产品界面示意
            </p>
          </div>

          {/* Input + Output panels */}
          <div className="grid grid-cols-1 sm:grid-cols-2">
            {/* Left: input */}
            <div className="border-b border-rule p-5 sm:border-b-0 sm:border-r">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
                输入
              </p>
              <div className="mt-3 h-28 rounded-sm border border-dashed border-rule bg-paper/40 p-4">
                <p className="font-mono text-xs text-muted">
                  文本粘贴 / 上传 .docx
                </p>
              </div>
            </div>

            {/* Right: output */}
            <div className="p-5">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
                输出示例
              </p>
              <div className="mt-3 space-y-1.5 overflow-hidden rounded-sm border border-rule bg-paper/40 p-4">
                <p className="text-xs text-ink/70">轻度 / 中度 / 深度降重 Word</p>
                <p className="text-xs text-ink/70">AIGC 分析报告 Word</p>
                <p className="text-xs text-ink/70">AIGC 特征摘要 Word</p>
                <p className="text-xs text-ink/70">原文批注版 Word</p>
                <p className="text-xs text-ink/70">降 AIGC 自然化 Word</p>
              </div>
            </div>
          </div>

          {/* Mock footer */}
          <p className="border-t border-rule bg-paper/60 px-4 py-3 text-xs text-muted">
            产品界面示意，实际界面以体验版为准。
          </p>
        </div>

        {/* CTA */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
            <span className="inline-flex items-center gap-2 rounded-sm border border-green/30 bg-green/5 px-4 py-2 text-sm text-green">
              体验版可用
            </span>
            <p className="text-xs text-muted sm:text-sm">
              {section.statusNote}
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="mt-4 text-xs text-muted/60">
          注：乐懒 AI 为独立部署产品，体验入口由独立部署地址提供，
          与乐懒科技官网账号深度集成规划中。
        </p>
      </Container>
    </section>
  );
}
