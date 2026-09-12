/**
 * LELAN TECHNOLOGY · AI Workflow Preview
 *
 * Phase 1E.4-A — QUIET DOCUMENT WORKSPACE.
 *
 * This replaces the Phase 1E.3-C-R1 "Process Glass DEPTH composition".
 *
 * What was wrong before:
 *   1. The centre Process panel was `lg:absolute; left:25%; right:25%` with
 *      `margin-left/-right: -8%`. On an absolutely-positioned box those
 *      percentage margins resolve against the containing block, so the panel
 *      became 116% of its container (1241px in a 1072px column) and pushed
 *      the document 168px past a 1440 viewport. That was the single largest
 *      cause of the homepage horizontal scrollbar.
 *   2. The same panel was painted OVER the Result Document it was meant to
 *      connect, so the INPUT → PROCESS → RESULT reading order was unreadable.
 *   3. Glass was used as the default material here, which contradicted the
 *      design system rule that glass means "floating live information".
 *
 * New structure — a deliberate three-step reading order, nothing overlapping:
 *
 *   Desktop (≥1024)   [ 01 输入文档 ] → [ 02 处理过程 ] → [ 03 结果文档 ]
 *   Tablet  (≥640)    [ 01 输入文档 ] [ 02 处理过程 ]  /  [ 03 结果文档 ]
 *   Mobile  (<640)    stacked single column
 *   Then:              [ Word 成品 · 7 份 · compact rail ]
 *
 * Material: Paper + a neutral digital panel. ZERO glass, ZERO perspective,
 * ZERO translateZ, ZERO negative margins, ZERO absolute overlap.
 *
 * All names, intensities and outputs come from the verified content model
 * (`HomeAiSection`), which mirrors lelan-shouhu read-only findings.
 * No invented product names and no fabricated metrics.
 */

import type { HomeAiSection } from "@/content/home";

export interface AiWorkflowPreviewProps {
  section: HomeAiSection;
}

/* ── Document page (input / result) ─────────────────────────────────────── */

interface DocumentPageProps {
  caption: string;
  meta: string;
  title: string;
  bodyLines: ReadonlyArray<string>;
  /** Marks one line as a suspected-AI excerpt (AIGC report preview only) */
  markSuspectedLine?: number;
}

function DocumentPage({
  caption,
  meta,
  title,
  bodyLines,
  markSuspectedLine,
}: DocumentPageProps) {
  return (
    <div className="lelan-ai-page relative h-full overflow-hidden">
      {/* Page header strip */}
      <div className="flex items-center justify-between gap-2 border-b border-rule px-3 py-2">
        <span className="truncate font-mono text-[0.55rem] uppercase tracking-wider text-muted">
          {caption}
        </span>
        <span className="shrink-0 font-mono text-[0.55rem] uppercase tracking-wider text-muted/70">
          {meta}
        </span>
      </div>
      {/* Page body */}
      <div className="px-4 py-3">
        <p className="font-serif text-sm text-ink">{title}</p>
        <div className="mt-2 space-y-1.5">
          {bodyLines.map((line, idx) => (
            <div key={line} className="relative">
              <span
                className={[
                  "block h-1.5 rounded-sm",
                  markSuspectedLine === idx ? "bg-cinnabar/40" : "bg-rule/60",
                ].join(" ")}
                style={{ width: `${60 + (line.length % 35)}%` }}
              />
              {markSuspectedLine === idx && (
                <span aria-hidden className="absolute inset-0 flex items-center pl-1">
                  <span className="font-mono text-[0.5rem] text-cinnabar">疑似 AI</span>
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Process panel (neutral, connects input → result) ───────────────────── */

interface ProcessPanelProps {
  features: HomeAiSection["features"];
  intensities: HomeAiSection["intensities"];
  wordOutputs: HomeAiSection["wordOutputs"];
}

function ProcessPanel({ features, intensities, wordOutputs }: ProcessPanelProps) {
  const rewriteOutputs = wordOutputs.filter((o) => o.group === "rewrite");
  const aigcOutputs = wordOutputs.filter((o) => o.group === "aigc");

  return (
    <div className="ai-process-panel flex h-full flex-col rounded-sm p-3 sm:p-4">
      <p className="font-mono text-[0.55rem] uppercase tracking-wider text-ink/80">
        处理过程 · PROCESS
      </p>

      {/* Step 1 — input identified */}
      <ProcessStep number="01" label="输入识别" detail=".docx 文档已解析段落" />

      {/* Step 2 — feature selection */}
      <ProcessStep
        number="02"
        label="功能选择"
        detail={
          features.length > 0
            ? features.map((f) => f.name).join(" + ")
            : "未启用"
        }
      />

      {/* Step 3 — rewrite intensity (only meaningful for the rewrite path) */}
      {rewriteOutputs.length > 0 && (
        <ProcessStep
          number="03"
          label="降重强度"
          detail={
            <span className="inline-flex flex-wrap gap-1">
              {intensities.map((it) => (
                <span
                  key={it.id}
                  className={[
                    "rounded-sm px-1.5 py-0.5 font-mono text-[0.55rem] uppercase tracking-wider",
                    it.id === "medium"
                      ? "border border-ink bg-ink text-paper"
                      : "border border-rule text-muted",
                  ].join(" ")}
                >
                  {it.name}
                </span>
              ))}
            </span>
          }
        />
      )}

      {/* Step 4 — model */}
      <ProcessStep
        number={rewriteOutputs.length > 0 ? "04" : "03"}
        label="模型处理"
        detail="DeepSeek 大模型"
      />

      {/* Step 5 — outputs produced */}
      <ProcessStep
        number={rewriteOutputs.length > 0 ? "05" : "04"}
        label="成品生成"
        detail={`${wordOutputs.length} 份 Word · ${aigcOutputs.length} 份 AIGC 相关`}
        isLast
      />
    </div>
  );
}

interface ProcessStepProps {
  number: string;
  label: string;
  detail: React.ReactNode;
  isLast?: boolean;
}

function ProcessStep({ number, label, detail, isLast }: ProcessStepProps) {
  return (
    <div className="flex gap-2.5">
      {/* Rail: node + connector */}
      <div className="flex flex-col items-center">
        <span
          aria-hidden
          className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-rule bg-paper font-mono text-[0.5rem] text-muted"
        >
          {number}
        </span>
        {!isLast && (
          <span aria-hidden className="mt-1 w-px flex-1 bg-rule" />
        )}
      </div>
      <div className="min-w-0 flex-1 pb-3">
        <p className="font-serif text-xs text-ink">{label}</p>
        <div className="mt-0.5 text-[0.65rem] leading-relaxed text-muted">
          {detail}
        </div>
      </div>
    </div>
  );
}

/* ── Word output rail — compact file list (not 7 large cards) ───────────── */

interface WordOutputRailProps {
  outputs: HomeAiSection["wordOutputs"];
}

function WordOutputRail({ outputs }: WordOutputRailProps) {
  return (
    <div className="mt-6">
      <div className="flex items-baseline gap-3">
        <p className="font-mono text-[0.65rem] uppercase tracking-wider text-muted">
          Word 成品 · OUTPUTS
        </p>
        <span aria-hidden className="h-px flex-1 bg-rule" />
        <span className="font-mono text-[0.6rem] uppercase tracking-wider text-muted/70">
          {outputs.length} 份
        </span>
      </div>

      <ul className="ai-token-stack mt-2.5" role="list">
        {outputs.map((output) => (
          <li
            key={output.id}
            className="ai-token-item"
            data-group={output.group}
          >
            <p className="font-mono text-[0.5rem] uppercase tracking-wider text-muted/70">
              {output.group === "rewrite" ? "降重" : "AIGC"}
            </p>
            <p className="mt-0.5 text-xs leading-snug text-ink/90">
              {output.name}
            </p>
            {output.defaultSelected && (
              <span className="mt-1 inline-block font-mono text-[0.5rem] uppercase tracking-wider text-green">
                默认勾选
              </span>
            )}
          </li>
        ))}
      </ul>

      {/* Honest qualifier requested in Phase 1E.4-A.
          Mirrors the product's own wording for deai_word and introduces no
          new metrics or guarantees. */}
      <p className="mt-3 text-xs leading-relaxed text-muted/70">
        相关检测与分析结果仅供参考，不代表第三方检测结论。
      </p>
    </div>
  );
}

/* ── Main preview component ───────────────────────────────────────────── */

export function AiWorkflowPreview({ section }: AiWorkflowPreviewProps) {
  // Demo sample body — fictional paragraph, length only (no real text shown).
  const inputBody = [
    "本研究提出一种基于多模态数据融合的智能分类方法",
    "实验在公开数据集上验证了所提方案的有效性",
    "结果表明该方法在精度和效率方面均优于基线模型",
    "后续工作将围绕跨域迁移与轻量化部署展开",
  ];
  // Result excerpt — one line carries the suspected-AI marker.
  const resultBody = [
    "针对多模态数据融合的智能分类方法，本研究进行了系统化的实验设计",
    "实验验证结果（部分内容疑似 AI 生成）",
    "模型在精度与效率两个维度均优于既有基线",
    "后续工作将围绕跨域迁移与边缘部署展开",
  ];

  return (
    <div
      role="region"
      aria-label="乐懒 AI 产品工作台示意"
      className="lelan-bg-l4-ai rounded-sm"
    >
      <div className="lelan-ai-composition px-4 py-5 sm:px-6 sm:py-6">
        {/* Workspace title bar */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-rule pb-3">
          <div className="flex items-center gap-3">
            <span
              aria-hidden
              className="flex h-6 w-6 items-center justify-center rounded-sm border border-rule bg-paper-pure font-mono text-[0.55rem] text-muted"
            >
              AI
            </span>
            <p className="font-mono text-[0.65rem] uppercase tracking-wider text-muted">
              乐懒 AI · 论文智能助手 · 工作台
            </p>
          </div>
          <p className="font-mono text-[0.55rem] uppercase tracking-wider text-cinnabar">
            产品界面示意
          </p>
        </div>

        {/* ── Three-step reading order ─────────────────────────────────────
            Desktop ≥1024: 4 / 4 / 4 with quiet directional gutters.
            Tablet  ≥640 : 2 columns, process spans full width below.
            Mobile  <640 : single column stack.                          */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12 lg:gap-3">
          {/* 01 — INPUT DOCUMENT */}
          <div className="ai-paper-left lg:col-span-4">
            <ColumnCaption label="01 输入文档" hint="INPUT" />
            <div className="mt-2 h-[190px]">
              <DocumentPage
                caption="demo-paper.docx"
                meta="24 KB · 4 段"
                title="输入示例 · demo-paper.docx"
                bodyLines={inputBody}
              />
            </div>
            <p className="mt-1.5 text-xs text-muted/70">
              {section.limits.fileFormat} · {section.limits.textCharRange}
            </p>
          </div>

          {/* 02 — PROCESS (centre column, never overlaps its neighbours) */}
          <div className="ai-paper-process lg:col-span-4">
            <ColumnCaption label="02 处理过程" hint="PROCESS" />
            <div className="mt-2">
              <ProcessPanel
                features={section.features}
                intensities={section.intensities}
                wordOutputs={section.wordOutputs}
              />
            </div>
          </div>

          {/* 03 — RESULT DOCUMENT */}
          <div className="ai-paper-right lg:col-span-4">
            <ColumnCaption label="03 结果文档" hint="RESULT" />
            <div className="mt-2 h-[190px]">
              <DocumentPage
                caption="AIGC分析摘要Word"
                meta="标记 1 处疑似 AI 段落"
                title="结果示例 · 摘要节选"
                bodyLines={resultBody}
                markSuspectedLine={1}
              />
            </div>
            <p className="mt-1.5 text-xs text-muted/70">
              {section.limits.requiresLogin ? "需要登录" : "无需登录即可体验"}
            </p>
          </div>
        </div>

        {/* Word outputs — compact rail */}
        <WordOutputRail outputs={section.wordOutputs} />

        {/* Annotation leader — current capability hook */}
        <div className="mt-5 flex items-center gap-3 border-t border-rule pt-3">
          <span aria-hidden className="font-mono text-[0.55rem] uppercase tracking-wider text-muted">
            ↘ 当前能力
          </span>
          <span className="font-mono text-[0.65rem] text-ink/80">
            {section.features.map((f) => f.name).join(" · ")}
          </span>
        </div>

        <p className="mt-3 font-mono text-[0.55rem] uppercase tracking-wider text-muted/60">
          产品界面示意 · 实际处理流程以独立产品体验版为准
        </p>
      </div>
    </div>
  );
}

/* ── Tiny caption helper ─────────────────────────────────────────────── */

function ColumnCaption({ label, hint }: { label: string; hint: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="font-mono text-[0.55rem] uppercase tracking-wider text-muted/70">
        {hint}
      </span>
      <span aria-hidden className="h-px flex-1 bg-rule" />
      <span className="font-mono text-[0.6rem] uppercase tracking-wider text-ink/80">
        {label}
      </span>
    </div>
  );
}
