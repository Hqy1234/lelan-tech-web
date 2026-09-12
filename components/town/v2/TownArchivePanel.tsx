/**
 * LELAN TECHNOLOGY · Town V2 · Archive Panel
 *
 * Phase 1F.2 (Town V2 prototype).
 *
 * The right-hand column of the 成果档案台: the archive record for whichever
 * service is selected.
 *
 * WHY A SEPARATE COMPONENT
 *   The original `TownServiceDrawer` lives inside `components/town/TownMapStage.tsx`,
 *   which is part of the 3D experiment surface that this phase must NOT touch.
 *   Reusing it would have meant either editing that file or duplicating its
 *   markup invisibly. Instead the same ARCHIVE · SHOP-0N design language is
 *   restated here, so the V2 column can carry its own addition (SERVICE FLOW)
 *   without touching a single byte of the experiment.
 *
 * ⚠ CONTENT RULES
 *   Everything shown comes from the shop's own recorded content
 *   (`content/town.ts`): name, agent, dimension, plainLanguageService,
 *   shortDescription, availability. The service flow is a structural three-step
 *   model — no duration, success rate, price or volume is stated, because none
 *   of those are known.
 */

import type { TownShop } from "@/content/town";

/**
 * The three-step service model, shown only for the service whose flow is
 * confirmed (01 论文茶寮). Deliberately abstract: input → processing → delivery.
 */
const SERVICE_FLOW = [
  { no: "01", label: "输入材料", note: "选题、初稿或评审意见" },
  { no: "02", label: "专业处理", note: "结构、写作与规范整理" },
  { no: "03", label: "结果交付", note: "可继续修改的文稿" },
];

/** Which shops have a confirmed service flow. Only 01 in this prototype. */
const FLOW_SHOP_IDS = new Set(["paper-teahouse"]);

export interface TownArchivePanelProps {
  shop: TownShop;
  agentRoleLabel: string;
}

export function TownArchivePanel({ shop, agentRoleLabel }: TownArchivePanelProps) {
  const hasFlow = FLOW_SHOP_IDS.has(shop.id);
  const isPreview = shop.availability === "preview";

  return (
    <aside
      aria-label={`${shop.name} 档案详情`}
      /**
       * `lg:self-start` keeps the record at its natural height. It must not
       * stretch to the row either — the archive is a record, not a column to
       * be filled.
       */
      className="lelan-town-archive lelan-corner relative flex w-full flex-col rounded-sm lg:self-start"
    >
      {/* ── Identity ───────────────────────────────────────────── */}
      <div className="flex flex-col px-4 pt-4 sm:px-5 sm:pt-5">
        <p className="lelan-archive-id">ARCHIVE · SHOP-{shop.number}</p>

        <h3 className="mt-[18px] font-serif text-lg leading-tight text-ink sm:text-xl">
          {shop.name}
        </h3>
        <p className="mt-1 text-xs text-muted">{shop.plainLanguageService}</p>

        {/* Dimension tags — the shop's own recorded capability labels. */}
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          <span className="rounded-sm border border-rule bg-paper px-1.5 py-0.5 font-mono text-[0.55rem] uppercase tracking-wider text-ink/75">
            {shop.dimension}
          </span>
          <span className="rounded-sm border border-rule bg-paper px-1.5 py-0.5 font-mono text-[0.55rem] uppercase tracking-wider text-muted">
            {agentRoleLabel.includes("未来")
              ? "CONCEPT"
              : "PERSONA"}
          </span>
        </div>
      </div>

      {/* ── Service record ─────────────────────────────────────── */}
      <div className="flex flex-col gap-3 px-4 pt-5 sm:px-5">
        <p className="text-xs leading-relaxed text-ink/85 sm:text-sm">
          {shop.shortDescription}
        </p>

        <dl className="grid grid-cols-2 gap-x-4 gap-y-2 border-t border-rule pt-3">
          <div>
            <dt className="font-mono text-[0.6rem] uppercase tracking-wider text-muted">
              服务人格
            </dt>
            <dd className="mt-0.5 font-serif text-sm text-ink">{shop.agent}</dd>
          </div>
          <div>
            <dt className="font-mono text-[0.6rem] uppercase tracking-wider text-muted">
              维度
            </dt>
            <dd className="mt-0.5 text-sm text-ink">{shop.dimension}</dd>
          </div>
        </dl>
      </div>

      {/* ── SERVICE FLOW (01 only) ─────────────────────────────── */}
      {hasFlow && (
        <div className="mt-5 px-4 sm:px-5">
          <div className="mb-2.5 flex items-center gap-3">
            <span className="font-mono text-[0.55rem] uppercase tracking-[0.14em] text-muted-soft">
              SERVICE FLOW
            </span>
            <span aria-hidden className="h-px flex-1 bg-rule" />
          </div>
          <ol className="flex flex-col" role="list">
            {SERVICE_FLOW.map((step, idx) => (
              <li key={step.no}>
                <div className="flex items-start gap-2.5 py-1.5">
                  <span
                    aria-hidden
                    className="mt-px font-mono text-[0.55rem] tracking-wider text-muted-soft"
                  >
                    {step.no}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-serif text-[0.8rem] text-ink/90">
                      {step.label}
                    </span>
                    <span className="block text-[0.68rem] leading-snug text-muted">
                      {step.note}
                    </span>
                  </span>
                </div>
                {idx < SERVICE_FLOW.length - 1 && (
                  <div aria-hidden className="flex items-center gap-2.5 pl-0.5">
                    <span className="font-mono text-[0.6rem] text-rule-strong">
                      ↓
                    </span>
                    <span className="h-px flex-1 bg-rule/60" />
                  </div>
                )}
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* ── Status ─────────────────────────────────────────────── */}
      <div className="mt-5 flex items-center justify-between gap-3 border-t border-rule px-4 py-3 sm:px-5">
        <span
          className={[
            "rounded-sm px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-wider",
            isPreview
              ? "border border-green/30 bg-green/10 text-green"
              : "border border-rule bg-paper text-muted",
          ].join(" ")}
        >
          {isPreview ? "Available · Preview" : "Concept"}
        </span>
        <p className="text-right text-[0.65rem] leading-tight text-muted/80">
          实际功能入口随版本逐步开放
        </p>
      </div>
    </aside>
  );
}
