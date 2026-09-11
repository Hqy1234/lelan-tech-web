/**
 * LELAN TECHNOLOGY · Home · LeLan AI
 *
 * Phase 1E.4-A — Quiet Software Proof.
 *
 * This section is now the QUIETEST of the three product sections. It no
 * longer competes with Guardian (emotional archive) or Town (spatial
 * preview); it simply proves that real, specific software exists.
 *
 * Phase 1E.4-A changes:
 *   - AiWorkflowPreview rebuilt as a quiet three-column document workspace.
 *     No glass, no perspective, no translateZ, no overlapping documents.
 *   - The workspace no longer carries fixed-height process boxes, which were
 *     the source of both the overlap and the 168px horizontal overflow.
 *   - Duplicate status removed: "体验版可用" previously appeared three times
 *     in this section (header StatusLabel, a pill, and the facts list).
 *   - The 4-up facts list was folded into the workflow column captions, where
 *     the same facts (format / cap / login requirement) already belong.
 *   - "自然化改写" wording unified to "AIGC 分析与降 AIGC" to match the site's
 *     own corrected branding (D-PHASE1E.3-C-008) and the real product.
 *
 * All product names, intensities, features and Word outputs come from the
 * verified content model (HomeAiSection), mirroring lelan-shouhu read-only.
 * No invented product names and no fabricated metrics.
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

        {/* Quiet document workspace — the section's only visual subject */}
        <div className="mt-8">
          <AiWorkflowPreview section={section} />
        </div>

        {/* Status + integration note (single statement, no repeated badges) */}
        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
          <p className="max-w-2xl text-xs leading-relaxed text-muted sm:text-sm">
            {section.statusNote}
          </p>
          <p className="shrink-0 font-mono text-[0.65rem] uppercase tracking-wider text-muted/60">
            体验入口整理中
          </p>
        </div>

        {/* Disclaimer */}
        <p className="mt-3 text-xs leading-relaxed text-muted/60">
          注：乐懒 AI 为独立部署产品，体验入口由独立部署地址提供，
          与乐懒科技官网账号深度集成规划中。
        </p>
      </Container>
    </section>
  );
}
