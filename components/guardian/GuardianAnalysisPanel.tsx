/**
 * LELAN TECHNOLOGY · Guardian Smart Analysis panel
 *
 * Phase 1F — Dify integration.
 *
 * A NEW, self-contained block appended to the Profile. It does NOT alter the
 * existing archive layout: the cover, current coordinate, task rail, five-element
 * band, timeline and method sections all render exactly as before.
 *
 * It is purely additive and optional:
 *   - analysis not configured  → renders nothing at all
 *   - analysis loading         → quiet inline note
 *   - analysis failed          → one calm sentence + retry (never a stack, never
 *                                a raw Dify response, never the key)
 *   - analysis succeeded       → summary, per-dimension notes, attention items
 *
 * The five dimensions are presented as LIFE DIMENSIONS only — never as a causal
 * or predictive model. The server-side adapter rejects risk language upstream,
 * and this component renders whatever survived that filter.
 */

"use client";

import type { GuardianProfile } from "@/content/guardian";
import {
  useGuardianAnalysis,
  type GuardianAnalysisStatus,
} from "@/lib/guardian/use-guardian-analysis";

/* Dimension presentation — element glyph + label, matching the archive band. */
const DIMENSION_META: Record<
  string,
  { element: string; label: string }
> = {
  wealth: { element: "金", label: "财富" },
  health: { element: "木", label: "健康" },
  travel: { element: "水", label: "出行" },
  food: { element: "火", label: "饮食" },
  housing: { element: "土", label: "安居" },
};

/** Status pills reuse the archive vocabulary already used across Guardian. */
const STATUS_LABEL: Record<string, string> = {
  normal: "已记录",
  attention: "持续关注",
  current: "当前事项",
  planned: "待完善",
};

const STATUS_TONE: Record<string, string> = {
  normal: "border-rule bg-rule/40 text-muted",
  attention: "border-cinnabar/25 bg-cinnabar/10 text-cinnabar",
  current: "border-green/25 bg-green/10 text-green",
  planned: "border-rule bg-ink/5 text-muted",
};

/** Single quiet sentence shown for every failure mode. */
const FAILURE_TEXT = "暂时无法生成智能分析，请稍后重试。";

function PanelHeader({ note }: { note?: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-mono text-[0.65rem] uppercase tracking-wider text-muted">
        智能分析
      </span>
      <span aria-hidden className="h-px flex-1 bg-rule" />
      <span className="font-mono text-[0.6rem] uppercase tracking-wider text-muted/60">
        {note ?? "分析层 · 非确定性数据"}
      </span>
    </div>
  );
}

export function GuardianAnalysisPanel({ profile }: { profile: GuardianProfile }) {
  const { status, analysis, available, retry } = useGuardianAnalysis(profile);

  /** Not configured, or nothing to analyse ⇒ contribute nothing to the page. */
  if (!available && status !== "loading") return null;

  /* ── Loading ───────────────────────────────────────────────────────────── */
  if (status === "loading") {
    return (
      <section aria-label="智能分析" className="flex flex-col gap-3">
        <PanelHeader note="生成中" />
        <div
          role="status"
          aria-live="polite"
          className="rounded-sm border border-rule bg-paper-pure px-4 py-5"
        >
          <p className="text-sm text-muted">正在整理智能分析…</p>
          <p className="mt-1 text-xs text-muted/70">
            人生阶段、任务与进度已按档案数据显示，分析内容稍后补充。
          </p>
        </div>
      </section>
    );
  }

  /* ── Failure — the Profile above is unaffected ─────────────────────────── */
  if (status === "error" || !analysis) {
    return (
      <section aria-label="智能分析" className="flex flex-col gap-3">
        <PanelHeader note="暂不可用" />
        <div className="rounded-sm border border-rule bg-paper-pure px-4 py-5">
          <p role="status" className="text-sm text-muted">
            {FAILURE_TEXT}
          </p>
          <p className="mt-1 text-xs text-muted/70">
            档案主体内容不受影响，可继续查看人生坐标、任务与五行维度。
          </p>
          <button
            type="button"
            onClick={retry}
            className="mt-3 inline-flex items-center gap-2 rounded-sm border border-rule px-3 py-1.5 text-xs text-muted transition-colors hover:border-green hover:text-green focus-visible:outline focus-visible:outline-2 focus-visible:outline-cinnabar focus-visible:outline-offset-2"
          >
            重新生成分析
            <span aria-hidden>→</span>
          </button>
        </div>
      </section>
    );
  }

  /* ── Success ───────────────────────────────────────────────────────────── */
  const dimensions = ["wealth", "health", "travel", "food", "housing"] as const;

  return (
    <section aria-label="智能分析" className="flex flex-col gap-4">
      <PanelHeader />

      {/* Summary */}
      <div className="rounded-sm border border-rule bg-paper-pure px-4 py-4 sm:px-5">
        <p className="text-xs leading-relaxed text-ink/85 sm:text-sm">
          {analysis.summary}
        </p>
      </div>

      {/* Attention items */}
      {analysis.attentionItems.length > 0 && (
        <ul className="flex flex-col gap-2" role="list">
          {analysis.attentionItems.map((item) => {
            const meta = DIMENSION_META[item.dimension];
            return (
              <li
                key={item.id}
                className="rounded-sm border border-rule bg-paper px-4 py-3"
              >
                <div className="flex flex-wrap items-baseline gap-2">
                  {meta && (
                    <span
                      aria-hidden
                      className="font-serif text-sm text-green"
                    >
                      {meta.element}
                    </span>
                  )}
                  <span className="font-serif text-sm text-ink">{item.title}</span>
                  <span
                    className={[
                      "ml-auto rounded-sm border px-1.5 py-0.5 font-mono text-[0.55rem] uppercase tracking-wider",
                      STATUS_TONE[item.status] ?? STATUS_TONE.planned,
                    ].join(" ")}
                  >
                    {STATUS_LABEL[item.status] ?? item.status}
                  </span>
                </div>
                <p className="mt-1 text-xs leading-relaxed text-muted">
                  {item.explanation}
                </p>
              </li>
            );
          })}
        </ul>
      )}

      {/* Per-dimension notes — five life dimensions, never a causal claim */}
      <div className="overflow-hidden rounded-sm border border-rule bg-paper-pure">
        <div className="grid grid-cols-1 sm:grid-cols-5">
          {dimensions.map((dim, idx) => {
            const meta = DIMENSION_META[dim];
            return (
              <div
                key={dim}
                className={[
                  "px-3 py-3",
                  idx === dimensions.length - 1
                    ? ""
                    : "border-b border-rule sm:border-b-0 sm:border-r",
                ].join(" ")}
              >
                <div className="flex items-baseline gap-1.5">
                  <span aria-hidden className="font-serif text-sm text-green">
                    {meta.element}
                  </span>
                  <span className="font-serif text-xs font-medium text-ink">
                    {meta.label}
                  </span>
                </div>
                <p className="mt-1 text-xs leading-relaxed text-muted">
                  {analysis.dimensionNotes[dim]}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Disclaimer — required, always shown with the result */}
      <p className="lelan-annotation">{analysis.disclaimer}</p>

      <div>
        <button
          type="button"
          onClick={retry}
          className="font-mono text-[0.6rem] uppercase tracking-wider text-muted transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-cinnabar focus-visible:outline-offset-2"
        >
          重新生成分析
        </button>
      </div>
    </section>
  );
}

export type { GuardianAnalysisStatus };
