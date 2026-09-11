/**
 * Guardian Analysis Adapter · normalization
 *
 * Phase 1F — Dify integration.
 *
 * Converts the workflow's temporary output fields into the EXISTING
 * `GuardianAnalysisResult` contract that the site already uses
 * (content/guardian.ts). No competing type is introduced.
 *
 * Dify (temporary)          →  GuardianAnalysisResult (existing camelCase)
 *   summary2                →  summary
 *   attention2_items        →  attentionItems[]
 *   dimension_notes2        →  dimensionNotes{wealth,health,travel,food,housing}
 *   disclaimer2             →  disclaimer
 *
 * The `*2` names exist ONLY in this integration layer. They must never reach the
 * React UI — after normalization nothing carries the Dify field names.
 *
 * Product rules (brief §14) are enforced here: anything that looks like a risk
 * score, a risk band, a disease probability, an unverified percentage or a
 * cohort statistic is rejected rather than passed to the UI.
 */

"use strict";

const { AdapterError, ERROR_CODES } = require("./errors");

const DIMENSIONS = ["wealth", "health", "travel", "food", "housing"];

/** Attention item statuses allowed by the existing contract. */
const STATUSES = new Set(["normal", "attention", "current", "planned"]);

const MAX = {
  summary: 2000,
  title: 200,
  explanation: 1200,
  note: 800,
  disclaimer: 600,
  id: 64,
  actionLabel: 40,
  sourceHint: 60,
  items: 24,
};

function invalid(msg) {
  throw new AdapterError(ERROR_CODES.INVALID_ANALYSIS_RESPONSE, msg);
}

/**
 * Reject forbidden product language.
 *
 * Must be conservative WITHOUT firing on legitimate prose. An earlier version
 * used a bare `高(风险|危)` alternation, which matched the characters inside
 * ordinary health sentences such as "不构成医学判断" and rejected a perfectly
 * valid result. The patterns are now anchored to explicit risk TERMINOLOGY, so
 * descriptive health wording passes while real risk scoring does not.
 */
const FORBIDDEN_PATTERNS = [
  /risk[_\s-]?score/i,
  /风险(评分|分数|打分|等级)/,
  /\b(high|medium|low)[\s_-]?risk\b/i,
  // Risk BANDS only — the word 风险 / 危险 must actually be present.
  /(高|中|低)(风险|危险)/,
  /高危人群|高危因素|危险因素/,
  /疾病概率|患病概率|发病概率|罹患概率/,
  /确诊|诊断结果|治疗方案|用药建议|处方/,
  /cohort\s+statistic/i,
  /队列统计|队列研究数据/,
  // Bare percentages: the brief forbids unverified numbers.
  /\d+(\.\d+)?\s*%/,
];

function assertSafeText(text, where) {
  for (const re of FORBIDDEN_PATTERNS) {
    if (re.test(text)) invalid(`forbidden language in ${where}`);
  }
}

function str(value, where, maxLen) {
  if (typeof value !== "string") invalid(`${where} must be a string`);
  const s = value.trim();
  /**
   * "empty" is deliberately worded so `runWorkflow` recognises it as the ONE
   * condition worth a bounded retry: the live workflow intermittently returns
   * status=succeeded with a zero-length summary.
   */
  if (!s) invalid(`${where} must not be empty`);
  if (s.length > maxLen) invalid(`${where} too long`);
  return s;
}

/**
 * Dify list-like outputs arrive as a real array, or as a JSON string when the
 * workflow node emits text. Accept both, but require a parsed array out.
 */
function toArray(value, where) {
  if (Array.isArray(value)) return value;
  if (typeof value === "string") {
    const s = value.trim();
    if (!s) return [];
    try {
      const parsed = JSON.parse(s);
      if (Array.isArray(parsed)) return parsed;
    } catch {
      /* fall through */
    }
    invalid(`${where} is not a valid JSON array string`);
  }
  invalid(`${where} must be an array or a JSON array string`);
}

/** Coerce dimension_notes2 into an object (accepts JSON string too). */
function toObject(value, where) {
  if (value && typeof value === "object" && !Array.isArray(value)) return value;
  if (typeof value === "string") {
    const s = value.trim();
    try {
      const parsed = JSON.parse(s);
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        return parsed;
      }
    } catch {
      /* fall through */
    }
    invalid(`${where} is not a valid JSON object string`);
  }
  invalid(`${where} must be an object`);
}

/**
 * Normalize raw Dify `outputs` into `GuardianAnalysisResult`.
 *
 * @param {Record<string, unknown>} outputs
 * @returns {import('../../../content/guardian').GuardianAnalysisResult}
 */
function normalizeAnalysis(outputs) {
  if (!outputs || typeof outputs !== "object") {
    invalid("outputs missing");
  }

  /* ── 1. summary2 ──────────────────────────────────────────────────────── */
  const rawSummary = outputs.summary2;
  if (typeof rawSummary !== "string") invalid("summary2 wrong type");
  const summary = str(rawSummary, "summary2", MAX.summary);
  assertSafeText(summary, "summary");

  /* ── 2. attention2_items ──────────────────────────────────────────────── */
  const rawItems = outputs.attention2_items;
  if (rawItems === undefined || rawItems === null) {
    invalid("attention2_items missing");
  }
  const itemList = toArray(rawItems, "attention2_items");
  if (itemList.length > MAX.items) invalid("attention2_items too many");

  const attentionItems = itemList.map((raw, idx) => {
    const where = `attention2_items[${idx}]`;
    if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
      invalid(`${where} must be an object`);
    }

    const dimension = raw.dimension;
    if (typeof dimension !== "string" || !DIMENSIONS.includes(dimension)) {
      invalid(`${where}.dimension not allowed`);
    }

    const status = raw.status;
    if (typeof status !== "string" || !STATUSES.has(status)) {
      invalid(`${where}.status not allowed`);
    }

    /** id falls back to a deterministic composite so the UI always has one. */
    const id =
      typeof raw.id === "string" && raw.id.trim()
        ? str(raw.id, `${where}.id`, MAX.id)
        : `${dimension}-${idx}`;

    const title = str(raw.title, `${where}.title`, MAX.title);
    /**
     * The live workflow emits `description` (snake_case), while the existing
     * GuardianAnalysisAttentionItem contract calls this field `explanation`.
     * Both are accepted so a workflow revision cannot silently break the UI.
     */
    const explanation = str(
      raw.explanation ?? raw.description,
      `${where}.explanation`,
      MAX.explanation
    );

    assertSafeText(title, `${where}.title`);
    assertSafeText(explanation, `${where}.explanation`);

    const item = { id, dimension, status, title, explanation };

    /**
     * Same snake_case ↔ camelCase bridge for the optional fields. The live
     * workflow sends `action_label`; the contract exposes `actionLabel`.
     */
    const actionLabel = raw.actionLabel ?? raw.action_label;
    if (typeof actionLabel === "string" && actionLabel.trim()) {
      item.actionLabel = str(actionLabel, `${where}.actionLabel`, MAX.actionLabel);
      assertSafeText(item.actionLabel, `${where}.actionLabel`);
    }

    /**
     * The existing contract exposes `sourceHint` (not `sourceType`). The live
     * workflow sends `source_type`; all three spellings are mapped onto the one
     * field the UI already knows.
     */
    const hint = raw.sourceHint ?? raw.sourceType ?? raw.source_type;
    if (typeof hint === "string" && hint.trim()) {
      item.sourceHint = str(hint, `${where}.sourceHint`, MAX.sourceHint);
    }

    return item;
  });

  /* ── 3. dimension_notes2 ──────────────────────────────────────────────── */
  const rawNotes = outputs.dimension_notes2;
  if (rawNotes === undefined || rawNotes === null) {
    invalid("dimension_notes2 missing");
  }
  const notesObj = toObject(rawNotes, "dimension_notes2");

  const dimensionNotes = {};
  for (const dim of DIMENSIONS) {
    if (notesObj[dim] === undefined || notesObj[dim] === null) {
      // A missing key is a hard failure: the UI renders all five dimensions.
      invalid(`dimension_notes2 missing key: ${dim}`);
    }
    const note = str(notesObj[dim], `dimension_notes2.${dim}`, MAX.note);
    assertSafeText(note, `dimension_notes2.${dim}`);
    dimensionNotes[dim] = note;
  }

  /* ── 4. disclaimer2 ───────────────────────────────────────────────────── */
  const rawDisclaimer = outputs.disclaimer2;
  if (typeof rawDisclaimer !== "string") invalid("disclaimer2 wrong type");
  const disclaimer = str(rawDisclaimer, "disclaimer2", MAX.disclaimer);

  return { summary, attentionItems, dimensionNotes, disclaimer };
}

module.exports = { normalizeAnalysis, DIMENSIONS, FORBIDDEN_PATTERNS };
