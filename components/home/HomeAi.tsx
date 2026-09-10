/**
 * LELAN TECHNOLOGY · Home · LeLan AI
 *
 * 现代软件产品表达。
 *
 * 流程：上传 → AI 处理 → 生成结果 → 下载。
 *
 * 全部为独立 UI mock；不连接任何后端。
 * 必须明确标注"产品界面示意，实际界面以体验版为准"。
 *
 * CTA 行为保持诚实：仅指向同页 anchor，不指向任何虚构 URL。
 */
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatusLabel } from "@/components/ui/StatusLabel";
import type { HomeAiSection } from "@/content/home";

interface HomeAiProps {
  section: HomeAiSection;
}

const FLOW_STEPS = [
  { id: "upload", label: "上传", hint: "文档 / 题目 / 草稿" },
  { id: "process", label: "AI 处理", hint: "通用大模型 + 科研垂直知识" },
  { id: "draft", label: "生成结果", hint: "结构化草稿 + 来源溯源" },
  { id: "export", label: "下载", hint: "本地导出 · 不留数据" },
] as const;

export function HomeAi({ section }: HomeAiProps) {
  return (
    <section
      id={section.id}
      aria-labelledby={`${section.id}-title`}
      className="border-b border-rule bg-paper-pure"
    >
      <Container as="div">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
          <SectionHeading
            id={`${section.id}-title`}
            number={section.number}
            title={section.title}
            intro={section.intro}
            systemLabel="Software Product"
          />
          <StatusLabel tone="beta" label="Beta · 即将开放" />
        </div>

        {/* Positioning sentence */}
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-ink/85 sm:text-lg">
          {section.positioning}
        </p>

        {/* Workflow steps — desktop: horizontal row, mobile: 2-col grid */}
        <ol
          className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4"
          aria-label="AI 处理流程"
        >
          {FLOW_STEPS.map((step, idx) => (
            <li
              key={step.id}
              className="relative rounded-sm border border-rule bg-paper p-4"
            >
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-muted">
                  Step {String(idx + 1).padStart(2, "0")}
                </span>
              </div>
              <p className="mt-2 font-serif text-base text-ink sm:text-lg">
                {step.label}
              </p>
              <p className="mt-1 text-xs text-muted">{step.hint}</p>
            </li>
          ))}
        </ol>

        {/* UI mock — clearly labelled, no real interaction */}
        <div className="mt-8 overflow-hidden rounded-sm border border-rule bg-paper">
          <div className="flex items-center justify-between border-b border-rule bg-paper-pure px-4 py-2">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-muted">
              UI Mock · LeLan AI
            </p>
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-cinnabar">
              产品界面示意
            </p>
          </div>

          <div className="grid grid-cols-1 gap-0 sm:grid-cols-2">
            {/* Left panel: input area */}
            <div className="border-rule p-5 sm:border-r">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
                输入区 · Upload
              </p>
              <div className="mt-3 h-32 rounded-sm border border-dashed border-rule bg-paper/40 p-4">
                <p className="font-mono text-xs text-muted">
                  拖入文档或在此输入题目 / 草稿 …
                </p>
                <p className="mt-6 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted/70">
                  示意按钮 · 不会真的上传
                </p>
              </div>
            </div>

            {/* Right panel: structured output */}
            <div className="p-5">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
                输出区 · Draft
              </p>
              <div className="mt-3 h-32 space-y-2 overflow-hidden rounded-sm border border-rule bg-paper/40 p-4">
                <p className="text-xs text-ink/70">
                  Ⅰ. 研究问题陈述
                </p>
                <p className="text-xs text-ink/70">
                  Ⅱ. 关键文献摘要
                </p>
                <p className="text-xs text-ink/70">
                  Ⅲ. 方法与论证结构
                </p>
                <p className="text-xs text-muted/70">
                  （示例骨架 · 非真实生成内容）
                </p>
              </div>
            </div>
          </div>

          <p className="border-t border-rule bg-paper/60 px-4 py-3 text-xs text-muted">
            产品界面示意，实际界面以体验版为准。
          </p>
        </div>

        {/* CTA block — honest */}
        <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-6">
          <a
            href="#about"
            className="inline-flex items-center gap-2 rounded-sm border border-ink bg-ink px-4 py-2 text-sm text-paper transition-colors hover:bg-green-dark"
          >
            {section.previewEntry.label}
            <span aria-hidden>→</span>
          </a>
          <p className="text-xs text-muted sm:text-sm">
            {section.previewEntry.disclaimer}
          </p>
        </div>
      </Container>
    </section>
  );
}
