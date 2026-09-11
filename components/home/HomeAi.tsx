/**
 * LELAN TECHNOLOGY · Home · LeLan AI
 *
 * Phase 1E.3-B — Software Product Proof.
 *
 * Upgraded from "feature marketing" to "this is real software that exists":
 *   - Removed feature cards (verifiedFeatures) and flow step cards.
 *   - Added a static product workflow preview (AiWorkflowPreview) showing
 *     INPUT → MODE/PROCESS → RESULT → WORD OUTPUTS as a document workspace.
 *   - Below the workspace, kept a compact text list of verified facts.
 *
 * All product names, intensities, features, and Word outputs come from
 * the verified content model (HomeAiSection.wordOutputs etc.), which
 * is the read-only audit result of lelan-shouhu/src/lib/output-options.ts
 * and src/app/process/page.tsx. No invented product names or metrics.
 *
 * No public product URL has been confirmed in the source-of-truth docs
 * (docs/PROJECT.md / DECISIONS.md), so CTA copy stays conservative:
 *   "了解乐懒 AI" — not "立即体验" against a non-existent URL.
 *
 * Server component.
 */
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatusLabel } from "@/components/ui/StatusLabel";
import type { HomeAiSection } from "@/content/home";
import { AiWorkflowPreview } from "@/components/ai/AiWorkflowPreview";

interface HomeAiProps {
  section: HomeAiSection;
}

export function HomeAi({ section }: HomeAiProps) {
  return (
    <section
      id={section.id}
      aria-labelledby={`${section.id}-title`}
      className="lelan-section-field lelan-section-field-ai border-b border-rule"
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

        {/* Workflow Preview — this is the visual subject now, not feature cards */}
        <div className="mt-8">
          <AiWorkflowPreview section={section} />
        </div>

        {/* Verified facts — compact text list (NOT cards) */}
        <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-rule pt-5 sm:grid-cols-4">
          <div>
            <dt className="font-mono text-[0.6rem] uppercase tracking-wider text-muted">
              输入
            </dt>
            <dd className="mt-0.5 text-xs text-ink/85">
              {section.limits.fileFormat}
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[0.6rem] uppercase tracking-wider text-muted">
              单次上限
            </dt>
            <dd className="mt-0.5 text-xs text-ink/85">
              {section.limits.textCharRange}
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[0.6rem] uppercase tracking-wider text-muted">
              登录要求
            </dt>
            <dd className="mt-0.5 text-xs text-ink/85">
              {section.limits.requiresLogin ? "需要登录" : "无需登录"}
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[0.6rem] uppercase tracking-wider text-muted">
              当前状态
            </dt>
            <dd className="mt-0.5 text-xs text-ink/85">体验版可用</dd>
          </div>
        </dl>

        {/* Status + CTA — conservative copy (no public URL confirmed) */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1.5">
            <span className="inline-flex w-fit items-center gap-2 rounded-sm border border-green/30 bg-green/5 px-3 py-1 font-mono text-xs text-green">
              体验版可用
            </span>
            <p className="text-xs text-muted sm:text-sm">
              {section.statusNote}
            </p>
          </div>
          <p className="font-mono text-[0.65rem] uppercase tracking-wider text-muted/60">
            体验入口整理中
          </p>
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
