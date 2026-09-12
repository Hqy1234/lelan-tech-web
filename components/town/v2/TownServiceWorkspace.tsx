/**
 * LELAN TECHNOLOGY · Town V2 · Selected Service Workspace
 *
 * Phase 1F.2 (Town V2 prototype).
 *
 * The central, dominant surface of the Town section: a research output desk.
 *
 *   "乐懒成果小镇" is presented as a digital工作区 of eight professional service
 *   spaces. The centre is NOT a map, globe, sphere, sand-table or game board —
 *   it is the working surface of whichever service is selected.
 *
 * ⚠ PROTOTYPE SCOPE (deliberate, per brief §6 / §16)
 *   Only `01 论文茶寮` has a fully designed workspace. Every other shop renders
 *   an honest, structured placeholder that states what that space will hold —
 *   we do NOT ship seven near-identical fake UIs to look finished.
 *
 * ⚠ CONTENT RULES
 *   No fabricated metrics of any kind: no paper counts, success/publication
 *   rates, journal guarantees, detection pass rates, or client numbers.
 *   The document list is generic academic structure, not a claim about a real
 *   manuscript. Everything shown is either the shop's own recorded content
 *   (`content/town.ts`) or a neutral structural label.
 */

import type { TownShop } from "@/content/town";

/* ── Shared chrome ──────────────────────────────────────────────────────── */

function WorkspaceHeader({ shop }: { shop: TownShop }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-rule-strong px-4 py-3 sm:px-5">
      <div className="flex min-w-0 items-baseline gap-2.5">
        <span
          aria-hidden
          className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-sm border border-green bg-green font-mono text-[0.6rem] tracking-wider text-paper"
        >
          {shop.number}
        </span>
        <h3 className="truncate font-serif text-lg font-medium text-ink">
          {shop.name}
        </h3>
        <span className="hidden truncate font-mono text-[0.6rem] uppercase tracking-wider text-muted sm:inline">
          {shop.dimension}
        </span>
      </div>
      <span className="shrink-0 font-mono text-[0.6rem] uppercase tracking-wider text-muted">
        WORKSPACE · {shop.number}
      </span>
    </div>
  );
}

/** Generic academic document structure — not a claim about a real manuscript. */
const DOCUMENT_SECTIONS = [
  { id: "abstract", label: "Abstract" },
  { id: "introduction", label: "Introduction" },
  { id: "methodology", label: "Methodology" },
  { id: "results", label: "Results" },
  { id: "discussion", label: "Discussion" },
  { id: "conclusion", label: "Conclusion" },
];

/** The five stages of the writing flow; 03 is the current one. */
const WRITING_FLOW = [
  { id: "topic", no: "01", label: "选题" },
  { id: "structure", no: "02", label: "结构" },
  { id: "writing", no: "03", label: "写作" },
  { id: "revision", no: "04", label: "修改" },
  { id: "standards", no: "05", label: "规范" },
];

const CURRENT_STAGE_ID = "writing";

/**
 * The four working modules available at the current stage.
 *
 * Rendered as a full-width FUNCTION BAND across the foot of the desk rather
 * than as a stacked column. As a column they read as a sidebar list and left a
 * loose gap at the bottom of the workspace; as a band they close the desk and
 * give the four capabilities equal, legible weight.
 */
const STAGE_DESKS = [
  { no: "01", label: "文献整理", note: "参考文献与引用" },
  { no: "02", label: "结构梳理", note: "章节与论证顺序" },
  { no: "03", label: "学术写作", note: "正文表述与语言" },
  { no: "04", label: "格式规范", note: "体例与版式核对" },
];

/* ── 01 论文茶寮 — the designed workspace ───────────────────────────────── */

function PaperWorkspace({ shop }: { shop: TownShop }) {
  return (
    <>
      <WorkspaceHeader shop={shop} />

      {/*
        Flow rail — the process the service actually walks a user through.
        Presented as an editorial step index, not a progress bar with numbers:
        no counts, no completion percentage, no fabricated status.
      */}
      <div className="border-b border-rule px-4 py-3.5 sm:px-5">
        <div className="mb-2.5 flex items-center gap-3">
          <span className="font-mono text-[0.6rem] uppercase tracking-wider text-muted">
            当前流程
          </span>
          <span aria-hidden className="h-px flex-1 bg-rule" />
        </div>
        <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-2" role="list">
          {WRITING_FLOW.map((step, idx) => {
            const isCurrent = step.id === CURRENT_STAGE_ID;
            return (
              <li key={step.id} className="flex items-center gap-1.5">
                <span
                  aria-current={isCurrent ? "step" : undefined}
                  className={[
                    "inline-flex items-baseline gap-1.5 rounded-sm border px-2 py-1",
                    /**
                     * The current step is marked by RULE WEIGHT + INK VALUE, not
                     * by a filled accent block. A dark pill here would out-weigh
                     * the document sheet beside it, and the sheet must stay the
                     * visual subject of the desk.
                     */
                    isCurrent
                      ? "border-green-soft bg-jade/35"
                      : "border-rule bg-paper text-muted",
                  ].join(" ")}
                >
                  <span
                    aria-hidden
                    className={[
                      "font-mono text-[0.55rem] tracking-wider",
                      isCurrent ? "text-green" : "text-muted-soft",
                    ].join(" ")}
                  >
                    {step.no}
                  </span>
                  <span
                    className={[
                      "font-serif text-[0.78rem]",
                      isCurrent ? "font-medium text-ink" : "",
                    ].join(" ")}
                  >
                    {step.label}
                  </span>
                </span>
                {isCurrent && (
                  <span className="font-mono text-[0.5rem] uppercase tracking-wider text-green">
                    current
                  </span>
                )}
                {idx < WRITING_FLOW.length - 1 && (
                  <span aria-hidden className="text-rule-strong">
                    ·
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </div>

      {/*
        Body.

        Upper: the document sheet (dominant) beside a short service note.
        Foot:  the four working modules as a full-width FUNCTION BAND.

        The band is what closes the desk. Previously the four modules were a
        stacked column beside the document, which left ~40px of loose space at
        the bottom of the workspace and made them read as a sidebar.
      */}
      <div className="flex flex-1 flex-col">
        <div className="grid flex-1 grid-cols-1 gap-4 p-4 pb-3 sm:p-5 sm:pb-3 lg:grid-cols-[minmax(0,1fr)_13rem]">
          {/* ── The document sheet ── */}
          <div className="lelan-town-sheet min-w-0 lg:self-stretch">
            <span aria-hidden className="lelan-town-sheet-gutter" />
            <div className="py-4 pl-9 pr-4 sm:pl-11 sm:pr-6">
              <p className="font-mono text-[0.6rem] uppercase tracking-wider text-muted">
                DOCUMENT · {shop.number}
              </p>
              {/*
                Title placeholder. Deliberately a neutral, structural string —
                not a real or invented paper title.
              */}
              <p className="mt-2 font-serif text-lg leading-snug text-ink/45 sm:text-xl">
                论文标题占位
              </p>
              <p className="mt-1 font-mono text-[0.6rem] text-muted-soft">
                Untitled manuscript · structure preview
              </p>

              <ul className="mt-5 divide-y divide-rule/70" role="list">
                {DOCUMENT_SECTIONS.map((s) => (
                  <li
                    key={s.id}
                    className="flex items-center justify-between gap-3 py-2.5"
                  >
                    <span className="font-serif text-[0.85rem] text-ink/85">
                      {s.label}
                    </span>
                    {/* Neutral structural rule, not a word count or completion %. */}
                    <span
                      aria-hidden
                      className="h-px min-w-6 flex-1 bg-rule/70"
                    />
                    <span className="font-mono text-[0.55rem] uppercase tracking-wider text-muted-soft">
                      待整理
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ── Service note (supporting, deliberately light) ── */}
          <div className="flex min-w-0 flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[0.6rem] uppercase tracking-wider text-muted">
                服务说明
              </span>
              <span aria-hidden className="h-px flex-1 bg-rule" />
            </div>
            {/* The shop's own recorded plain-language description. */}
            <p className="text-xs leading-relaxed text-muted">
              {shop.shortDescription}
            </p>
            <p className="text-xs leading-relaxed text-muted/80">
              本工作区围绕上列流程组织材料，具体处理方式随服务阶段推进。
            </p>
          </div>
        </div>

        {/* ── Function band ── */}
        <div className="border-t border-rule-strong px-4 pb-4 pt-3.5 sm:px-5 sm:pb-5">
          <div className="mb-3 flex items-center gap-3">
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-muted">
              本阶段工作台
            </span>
            <span aria-hidden className="h-px flex-1 bg-rule" />
          </div>
          <ul className="grid grid-cols-2 gap-x-3 gap-y-2 sm:grid-cols-4" role="list">
            {STAGE_DESKS.map((desk) => (
              <li
                key={desk.no}
                className="flex min-w-0 items-start gap-2.5 rounded-sm border border-rule bg-paper px-3 py-2.5"
              >
                <span
                  aria-hidden
                  className="mt-px font-mono text-[0.55rem] tracking-wider text-muted-soft"
                >
                  {desk.no}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-serif text-[0.82rem] text-ink/90">
                    {desk.label}
                  </span>
                  <span className="mt-0.5 block font-mono text-[0.55rem] leading-snug tracking-wider text-muted-soft">
                    {desk.note}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

/* ── 02–08 — structured placeholder ─────────────────────────────────────── */

/**
 * Honest placeholder for services whose workspace is not designed yet.
 *
 * It states what the space WILL contain and points at the real recorded service
 * description. It does not fake a document, a step flow, or any metric.
 */
function WorkspacePlaceholder({ shop }: { shop: TownShop }) {
  return (
    <>
      <WorkspaceHeader shop={shop} />

      <div className="flex flex-1 flex-col justify-center gap-4 p-5 sm:p-7">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[0.6rem] uppercase tracking-wider text-muted">
            Workspace · 未设计
          </span>
          <span aria-hidden className="h-px flex-1 bg-rule" />
        </div>

        <p className="max-w-[46ch] font-serif text-base leading-relaxed text-ink/80 sm:text-lg">
          {shop.plainLanguageService}
        </p>
        <p className="max-w-[52ch] text-sm leading-relaxed text-muted">
          {shop.shortDescription}
        </p>

        <div className="mt-1 rounded-sm border border-rule bg-paper-soft px-4 py-3">
          <p className="font-mono text-[0.55rem] uppercase tracking-wider text-muted-soft">
            本工作区
          </p>
          <p className="mt-1.5 text-xs leading-relaxed text-muted">
            该服务空间的工作台布局尚未设计。当前页面先保证服务索引、选择状态与档案信息
            完整可用；工作区内容将在该服务的设计阶段补齐。
          </p>
        </div>

        <dl className="grid grid-cols-1 gap-x-6 gap-y-2 text-xs sm:grid-cols-2">
          <div className="flex items-baseline justify-between gap-3 border-b border-rule/70 pb-1.5">
            <dt className="font-mono text-[0.55rem] uppercase tracking-wider text-muted-soft">
              服务人格
            </dt>
            <dd className="font-serif text-ink/85">{shop.agent}</dd>
          </div>
          <div className="flex items-baseline justify-between gap-3 border-b border-rule/70 pb-1.5">
            <dt className="font-mono text-[0.55rem] uppercase tracking-wider text-muted-soft">
              能力维度
            </dt>
            <dd className="font-mono text-[0.7rem] text-ink/85">
              {shop.dimension}
            </dd>
          </div>
        </dl>
      </div>
    </>
  );
}

/* ── Export ─────────────────────────────────────────────────────────────── */

export function TownServiceWorkspace({ shop }: { shop: TownShop }) {
  const isDesigned = shop.id === "paper-teahouse";

  return (
    <article
      /**
       * `key` restarts the enter animation whenever the service changes, so the
       * switch reads as a new document arriving on the desk.
       */
      key={shop.id}
      aria-label={`${shop.number} ${shop.name} 工作区`}
      className="lelan-town-desk lelan-town-workspace-enter flex h-full min-h-0 flex-col"
    >
      {isDesigned ? (
        <PaperWorkspace shop={shop} />
      ) : (
        <WorkspacePlaceholder shop={shop} />
      )}
    </article>
  );
}
