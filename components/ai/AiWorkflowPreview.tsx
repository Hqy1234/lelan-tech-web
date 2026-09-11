/**
 * LELAN TECHNOLOGY · AI Workflow Preview
 *
 * Phase 1E.3-C-R1 — Process Glass DEPTH composition (R1 rework).
 *
 * R1 visual changes:
 *   - Process Glass (center) moved forward via negative margin and z-stack,
 *     so it visibly overlaps both left + right Papers.
 *   - Left paper is shorter, right paper is taller (asymmetric).
 *   - Glass has its own jade-tinted background so blur over real content
 *     becomes visible.
 *   - Word outputs become a staggered, overflowing stack — each token
 *     offsets slightly so the stack feels like a leaning tower rather
 *     than a flat row.
 *
 * Layout (layers):
 *   Layer 0  WORKSPACE BACKGROUND     (lelan-bg-l4-ai CSS)
 *   Layer 1  INPUT DOCUMENT           (left, paper, shorter)
 *   Layer 2  PROCESS TRACE            (center, Glass, z+2, overlaps)
 *   Layer 3  RESULT DOCUMENT          (right, paper, taller)
 *   Layer 4  WORD OUTPUT TOKENS       (bottom, staggered stack, front)
 *
 * All text / outputs / intensities come from the verified content model.
 * No invented names or metrics.
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
  /** If true: red highlight bar (used for AIGC report excerpt) */
  highlightLineAt?: number;
}

function DocumentPage({ caption, meta, title, bodyLines, highlightLineAt }: DocumentPageProps) {
  return (
    <div className="lelan-ai-page relative h-full overflow-hidden">
      {/* Page header strip */}
      <div className="flex items-center justify-between border-b border-rule px-3 py-2">
        <span className="font-mono text-[0.55rem] uppercase tracking-wider text-muted">
          {caption}
        </span>
        <span className="font-mono text-[0.55rem] uppercase tracking-wider text-muted/70">
          {meta}
        </span>
      </div>
      {/* Page body */}
      <div className="px-4 py-3">
        <p className="font-serif text-sm text-ink">{title}</p>
        <div className="mt-2 space-y-1.5">
          {bodyLines.map((line, idx) => (
            <div key={idx} className="relative">
              <span
                className={[
                  "block h-1.5 rounded-sm",
                  highlightLineAt === idx ? "bg-cinnabar/40" : "bg-rule/60",
                ].join(" ")}
                style={{
                  width: `${60 + (line.length % 35)}%`,
                }}
              />
              {highlightLineAt === idx && (
                <span
                  aria-hidden
                  className="absolute inset-0 flex items-center pl-1"
                >
                  <span className="font-mono text-[0.5rem] text-cinnabar">
                    疑似 AI
                  </span>
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Process trace (center Glass — overlaps papers) ────────────────────── */

interface ProcessTraceProps {
  features: HomeAiSection["features"];
  intensities: HomeAiSection["intensities"];
  wordOutputs: HomeAiSection["wordOutputs"];
}

function ProcessTrace({ features, intensities, wordOutputs }: ProcessTraceProps) {
  const rewriteOutputs = wordOutputs.filter((o) => o.group === "rewrite");
  const aigcOutputs = wordOutputs.filter((o) => o.group === "aigc");

  return (
    <div className="ai-glass-bg relative h-full overflow-hidden rounded-sm p-3 sm:p-4">
      <p className="font-mono text-[0.55rem] uppercase tracking-wider text-ink/80">
        流程追踪 · PROCESS TRACE
      </p>

      {/* Step 1: input detected */}
      <TraceStep
        number="01"
        label="输入识别"
        detail="检测到 .docx 文档 · 已解析段落"
      />

      {/* Step 2: features active */}
      <TraceStep
        number="02"
        label="功能选择"
        detail={
          features.length > 0
            ? `${features.map((f) => f.name).join(" + ")}`
            : "未启用"
        }
      />

      {/* Step 3: intensities (for rewrite) */}
      {rewriteOutputs.length > 0 && (
        <TraceStep
          number="03"
          label="降重强度"
          detail={
            <span className="inline-flex flex-wrap gap-1.5">
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

      {/* Step 4: AI process */}
      <TraceStep
        number={rewriteOutputs.length > 0 ? "04" : "03"}
        label="AI 处理"
        detail="DeepSeek 大模型 · 推理中"
        active
      />

      {/* Step 5: outputs (count) */}
      <TraceStep
        number={rewriteOutputs.length > 0 ? "05" : "04"}
        label="成品生成"
        detail={`${wordOutputs.length} 份 Word · ${aigcOutputs.length} 份 AIGC 相关`}
      />

      <p className="mt-3 font-mono text-[0.5rem] uppercase tracking-wider text-muted/60">
        产品界面示意 · 实际处理流程以独立产品体验版为准
      </p>
    </div>
  );
}

interface TraceStepProps {
  number: string;
  label: string;
  detail: React.ReactNode;
  active?: boolean;
}

function TraceStep({ number, label, detail, active }: TraceStepProps) {
  return (
    <div
      className={[
        "mt-3 flex items-start gap-3 rounded-sm border p-2.5",
        active
          ? "lelan-ai-pulse border-ink/30 bg-ink/[0.02]"
          : "border-rule/40 bg-paper-pure/40",
      ].join(" ")}
      data-active={active ? "true" : "false"}
    >
      <span
        aria-hidden
        className={[
          "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-sm border font-mono text-[0.55rem]",
          active
            ? "border-ink bg-ink text-paper"
            : "border-rule bg-paper text-muted",
        ].join(" ")}
      >
        {number}
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-serif text-xs text-ink">{label}</p>
        <div className="mt-0.5 text-[0.65rem] text-muted">{detail}</div>
      </div>
    </div>
  );
}

/* ── Word output tokens — staggered overflow stack ────────────────────── */

interface WordOutputStackProps {
  outputs: HomeAiSection["wordOutputs"];
}

function WordOutputStack({ outputs }: WordOutputStackProps) {
  return (
    <div className="mt-6">
      <div className="flex items-baseline gap-3">
        <p className="font-mono text-[0.65rem] uppercase tracking-wider text-muted">
          Word 成品 · OUTPUT TOKENS
        </p>
        <span className="h-px flex-1 bg-rule" aria-hidden />
        <span className="font-mono text-[0.6rem] uppercase tracking-wider text-muted/70">
          {outputs.length} 份
        </span>
      </div>

      <ul className="ai-token-stack" role="list">
        {outputs.map((output) => (
          <li key={output.id} className="ai-token-item">
            <div className="flex items-start gap-1.5">
              <span
                aria-hidden
                className="mt-0.5 flex h-6 w-5 shrink-0 flex-col items-center justify-center rounded-sm border border-rule bg-paper-pure"
              >
                <span className="block h-0.5 w-3 bg-rule" />
                <span className="mt-0.5 block h-0.5 w-3 bg-rule" />
                <span className="mt-0.5 block h-0.5 w-3 bg-rule" />
                <span className="mt-0.5 block h-0.5 w-2 bg-rule" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-mono text-[0.5rem] uppercase tracking-wider text-muted/70">
                  {output.group === "rewrite" ? "降重" : "AIGC"}
                </p>
                <p className="mt-0.5 text-[0.65rem] leading-tight text-ink/90 line-clamp-3">
                  {output.name}
                </p>
                {output.defaultSelected && (
                  <span className="mt-1 inline-block rounded-sm border border-green/30 bg-green/5 px-1 font-mono text-[0.5rem] uppercase tracking-wider text-green">
                    默认
                  </span>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── Main preview component ───────────────────────────────────────────── */

export function AiWorkflowPreview({ section }: AiWorkflowPreviewProps) {
  // Demo sample body lines — fictional paragraph for product preview only.
  const inputBody = [
    "本研究提出一种基于多模态数据融合的智能分类方法",
    "实验在公开数据集上验证了所提方案的有效性",
    "结果表明该方法在精度和效率方面均优于基线模型",
    "后续工作将围绕跨域迁移与轻量化部署展开",
  ];
  // Result excerpt body (with one line marked as suspected AI for the AIGC
  // report visualization)
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
      className="lelan-perspective lelan-bg-l4-ai relative rounded-sm border border-rule"
    >
      <div className="lelan-ai-composition px-4 py-6 sm:px-6 sm:py-8">
        {/* Workspace title bar */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-2 border-b border-rule pb-3">
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

        {/* R1 — Glass overlaps Papers. Asymmetric heights.
            Grid: 12 cols, Glass spans 5 in center and offsets via negative margin. */}
        <div className="relative">
          <div className="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:gap-0">
            {/* Layer 1 — Input Document (back, shorter) */}
            <div className="ai-paper-left lg:col-span-4 lg:pr-3">
              <DocumentLayerCaption label="01 输入" hint="INPUT DOCUMENT" />
              <div className="mt-2 h-[200px] sm:h-[200px]">
                <DocumentPage
                  caption="demo-paper.docx"
                  meta="24 KB · 4 段"
                  title="输入示例 · demo-paper.docx"
                  bodyLines={inputBody}
                />
              </div>
              <p className="mt-1 font-mono text-[0.5rem] uppercase tracking-wider text-muted/60">
                {section.limits.fileFormat} · {section.limits.textCharRange}
              </p>
            </div>

            {/* Spacer for desktop — center column for Glass */}
            <div className="hidden lg:col-span-1 lg:block" aria-hidden />

            {/* Layer 3 — Result Document (back, taller) */}
            <div className="ai-paper-right lg:col-span-4 lg:pl-3">
              <DocumentLayerCaption label="03 结果" hint="RESULT DOCUMENT" />
              <div className="mt-2 h-[200px] sm:h-[240px]">
                <DocumentPage
                  caption="AIGC分析摘要Word"
                  meta="标记 1 处疑似 AI 段落"
                  title="结果示例 · 摘要节选"
                  bodyLines={resultBody}
                  highlightLineAt={1}
                />
              </div>
              <p className="mt-1 font-mono text-[0.5rem] uppercase tracking-wider text-muted/60">
                {section.limits.requiresLogin
                  ? "需要登录"
                  : "无需登录即可体验"}
              </p>
            </div>
          </div>

          {/* Layer 2 — Process Glass (front, overlaps both) */}
          <div className="ai-glass-center lg:absolute lg:left-1/4 lg:right-1/4 lg:top-4 lg:bottom-4 hidden lg:block">
            <DocumentLayerCaption label="02 流程" hint="MODE + PROCESS" />
            <div className="mt-2 h-full">
              <ProcessTrace
                features={section.features}
                intensities={section.intensities}
                wordOutputs={section.wordOutputs}
              />
            </div>
          </div>

          {/* Mobile: Process Trace appears below Papers (not overlapping) */}
          <div className="mt-3 lg:hidden">
            <DocumentLayerCaption label="02 流程" hint="MODE + PROCESS" />
            <div className="mt-2 h-[200px] sm:h-[220px]">
              <ProcessTrace
                features={section.features}
                intensities={section.intensities}
                wordOutputs={section.wordOutputs}
              />
            </div>
          </div>
        </div>

        {/* Layer 4 — Word Outputs (staggered overflow) */}
        <div className="lelan-depth-2">
          <WordOutputStack outputs={section.wordOutputs} />
        </div>

        {/* Annotation leader — selected capability hook */}
        <div className="mt-5 flex items-center gap-3 border-t border-rule pt-3">
          <span
            aria-hidden
            className="font-mono text-[0.55rem] uppercase tracking-wider text-muted"
          >
            ↘ 当前能力
          </span>
          <span className="font-mono text-[0.65rem] text-ink/80">
            {section.features.map((f) => f.name).join(" · ")}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── Tiny caption helper ─────────────────────────────────────────────── */

function DocumentLayerCaption({ label, hint }: { label: string; hint: string }) {
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
