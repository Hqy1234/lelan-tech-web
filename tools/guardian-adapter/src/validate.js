/**
 * Guardian Analysis Adapter · server-side validation
 *
 * Phase 1F — Dify integration.
 *
 * The browser sends STRUCTURED DATA (real arrays), never pre-stringified JSON.
 * This module is the only place that turns those arrays into the JSON strings
 * Dify expects, so a malicious or buggy client cannot smuggle arbitrary strings
 * into the workflow inputs.
 *
 * Deterministic facts are validated here but are NEVER recalculated: the adapter
 * does not decide the life stage, the task states or the progress numbers. It
 * only checks that what it was given is internally consistent.
 */

"use strict";

const { AdapterError, ERROR_CODES } = require("./errors");

/* ── Known internal values (mirrors content/guardian.ts) ─────────────────── */

const STAGE_IDS = new Set([
  "zhen-infant",
  "xun-child",
  "li-adolescent",
  "dui-young-adult",
  "qian-adult",
  "kan-middle-age",
  "gen-later-life",
  "kun-elder",
]);

const SCENARIO_IDS = new Set([
  "general",
  "study-career",
  "startup",
  "health",
  "wealth",
]);

const GENDERS = new Set(["male", "female"]);

/** Fallback Dify caller id when the client sends no usable per-profile id. */
const DIFY_USER_FALLBACK = "guardian-web-demo";

/**
 * CANONICAL stage names, keyed by stage id.
 *
 * The business display name is "卦名 · 阶段名". These are the values the
 * workflow must receive, and they mirror
 * `content/guardian.ts` → `guardianStages[].displayName`.
 *
 *   zhen-infant 震 · 婴儿期 0–9      xun-child 巽 · 少儿期 10–19
 *   li-adolescent 离 · 青少年 20–29  dui-young-adult 兑 · 青年期 30–39
 *   qian-adult 乾 · 壮年期 40–49     kan-middle-age 坎 · 中年期 50–59
 *   gen-later-life 艮 · 中老年期 60–69  kun-elder 坤 · 老年期 70+
 *
 * NOTE: `li-adolescent` is "离 · 青少年" — NOT "青少年期". An earlier revision
 * of this file treated the website's short `name` as authoritative, which was a
 * business error and produced the wrong wording in the Dify request.
 */
const STAGE_CANONICAL_NAMES = {
  "zhen-infant": "震 · 婴儿期",
  "xun-child": "巽 · 少儿期",
  "li-adolescent": "离 · 青少年",
  "dui-young-adult": "兑 · 青年期",
  "qian-adult": "乾 · 壮年期",
  "kan-middle-age": "坎 · 中年期",
  "gen-later-life": "艮 · 中老年期",
  "kun-elder": "坤 · 老年期",
};

/**
 * COMPATIBILITY INPUT ALIASES ONLY — never used for display or forwarded to Dify.
 *
 * Legacy / shortened spellings that may still arrive from an older client or a
 * stale cached profile. Each alias is scoped to exactly ONE stage id, so
 * "青年期" can never be accepted for `li-adolescent`.
 */
const STAGE_INPUT_ALIASES = {
  // legacy short names (website `name` before canonicalization)
  "zhen-infant": ["婴儿期"],
  "xun-child": ["少儿期"],
  "li-adolescent": ["青少年期", "离 · 青少年期"],
  "dui-young-adult": ["青年期"],
  "qian-adult": ["壮年期"],
  "kan-middle-age": ["中年期"],
  "gen-later-life": ["中老年期"],
  "kun-elder": ["老年期"],
};

/**
 * Resolve any accepted spelling to the CANONICAL name for that id.
 * @returns the canonical string, or null when the input is not recognized
 *          for this id (including cross-stage aliases).
 */
function normalizeStageName(stageId, stageName) {
  const canonical = STAGE_CANONICAL_NAMES[stageId];
  if (!canonical) return null;
  const trimmed = String(stageName).trim();
  if (trimmed === canonical) return canonical;
  const aliases = STAGE_INPUT_ALIASES[stageId] || [];
  if (aliases.includes(trimmed)) return canonical;
  return null;
}

/** Dimension tag allow-list — the 18 stable IDs. */
const TAG_IDS_BY_DIMENSION = {
  wealth: new Set(["budget", "insurance", "business-account", "tax-attention"]),
  health: new Set([
    "annual-checkup-pending",
    "sleep-attention",
    "exercise-record",
    "health-record",
  ]),
  travel: new Set(["frequent-travel", "document-check", "trip-planning"]),
  food: new Set(["irregular-meals", "nutrition-record", "meal-routine"]),
  housing: new Set(["renting", "housing-plan", "renovation", "family-housing"]),
};

/* ── Limits (reject abnormal payloads) ──────────────────────────────────── */

const LIMITS = {
  MIN_AGE: 0,
  MAX_AGE: 120,
  MAX_CITY_LEN: 40,
  MAX_ARRAY_LEN: 24,
  MAX_ITEM_LEN: 64,
  MAX_STAGE_NAME_LEN: 32,
  MAX_SCENARIO_NAME_LEN: 32,
  MAX_DISCLAIMER_LEN: 600,
  MAX_SUMMARY_LEN: 2000,
  MAX_TITLE_LEN: 200,
  MAX_EXPLANATION_LEN: 1200,
  MAX_ITEM_ID_LEN: 64,
};

/* ── Helpers ────────────────────────────────────────────────────────────── */

function bad(msg) {
  throw new AdapterError(ERROR_CODES.INVALID_INPUT, msg);
}

function asString(value, field, maxLen) {
  if (typeof value !== "string") bad(`${field} must be a string`);
  const s = value.trim();
  if (maxLen && s.length > maxLen) bad(`${field} too long`);
  return s;
}

function asFiniteNumber(value, field) {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    bad(`${field} must be a finite number`);
  }
  return value;
}

/**
 * Validate a string array and return a SANITIZED copy.
 * Rejects non-arrays, non-string members, oversized arrays and oversized items.
 */
function asStringArray(value, field) {
  if (!Array.isArray(value)) bad(`${field} must be an array`);
  if (value.length > LIMITS.MAX_ARRAY_LEN) bad(`${field} has too many items`);
  const out = [];
  for (const item of value) {
    if (typeof item !== "string") bad(`${field} must contain only strings`);
    const s = item.trim();
    if (!s) bad(`${field} contains an empty entry`);
    if (s.length > LIMITS.MAX_ITEM_LEN) bad(`${field} item too long`);
    out.push(s);
  }
  return out;
}

/** Validate an allow-listed tag array for one dimension. */
function asDimensionTags(value, dimension) {
  const arr = asStringArray(value, `${dimension}_tags`);
  const allowed = TAG_IDS_BY_DIMENSION[dimension];
  for (const tag of arr) {
    if (!allowed.has(tag)) bad(`unknown ${dimension} tag`);
  }
  return arr;
}

/* ── Main validation ────────────────────────────────────────────────────── */

/**
 * Validate the browser payload and produce the exact Dify `inputs` object.
 *
 * @returns {{ inputs: Record<string, unknown>, safe: Record<string, unknown> }}
 *   `inputs` — the Dify-ready flat object (all *_json are strings)
 *   `safe`   — a redacted echo used for server-side logging only
 */
function buildDifyInputs(payload) {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    bad("body must be a JSON object");
  }

  const identity = payload.identity || {};
  const stage = payload.stage || {};
  const scenario = payload.scenario || {};
  const tags = payload.dimensionTags || {};

  /* age */
  const age = asFiniteNumber(identity.age, "identity.age");
  if (age < LIMITS.MIN_AGE || age > LIMITS.MAX_AGE) bad("age out of range");

  /* gender */
  const gender = asString(identity.gender, "identity.gender", 16);
  if (!GENDERS.has(gender)) bad("gender not allowed");

  /* city — optional */
  const city = identity.city == null
    ? ""
    : asString(identity.city, "identity.city", LIMITS.MAX_CITY_LEN);

  /* stage — must be a known internal id, and the name must agree with it */
  const stageId = asString(stage.id, "stage.id", 32);
  if (!STAGE_IDS.has(stageId)) bad("unknown stage id");
  const rawStageName = asString(stage.name, "stage.name", LIMITS.MAX_STAGE_NAME_LEN);
  /**
   * Accept legacy spellings, but ALWAYS forward the canonical value to Dify.
   * An unrecognized or cross-stage name is rejected: the id is authoritative, so
   * the AI layer can never be told a stage name contradicting the lifecycle data.
   */
  const stageName = normalizeStageName(stageId, rawStageName);
  if (!stageName) {
    bad(
      `stage.name does not match stage.id (got ${JSON.stringify(rawStageName)}, id ${stageId})`
    );
  }

  /* scenario — must be a known internal id */
  const scenarioId = asString(scenario.id, "scenario.id", 32);
  if (!SCENARIO_IDS.has(scenarioId)) bad("unknown scenario id");
  const scenarioName = asString(
    scenario.name,
    "scenario.name",
    LIMITS.MAX_SCENARIO_NAME_LEN
  );

  /* tasks */
  const completedTaskIds = asStringArray(
    payload.completedTaskIds,
    "completedTaskIds"
  );

  /* dimension tags */
  const wealthTags = asDimensionTags(tags.wealth, "wealth");
  const healthTags = asDimensionTags(tags.health, "health");
  const travelTags = asDimensionTags(tags.travel, "travel");
  const foodTags = asDimensionTags(tags.food, "food");
  const housingTags = asDimensionTags(tags.housing, "housing");

  /* progress */
  const progressTotal = asFiniteNumber(payload.progressTotal, "progressTotal");
  const progressCompleted = asFiniteNumber(
    payload.progressCompleted,
    "progressCompleted"
  );
  if (!Number.isInteger(progressTotal) || progressTotal <= 0) {
    bad("progressTotal must be a positive integer");
  }
  if (!Number.isInteger(progressCompleted) || progressCompleted < 0) {
    bad("progressCompleted must be a non-negative integer");
  }
  if (progressCompleted > progressTotal) {
    bad("progressCompleted cannot exceed progressTotal");
  }

  /* The adapter — not the browser — stringifies. Empty arrays become "[]". */
  const inputs = {
    age,
    gender,
    city,
    stage_id: stageId,
    stage_name: stageName,
    scenario_id: scenarioId,
    scenario_name: scenarioName,
    completed_tasks_json: JSON.stringify(completedTaskIds),
    wealth_tags_json: JSON.stringify(wealthTags),
    health_tags_json: JSON.stringify(healthTags),
    travel_tags_json: JSON.stringify(travelTags),
    food_tags_json: JSON.stringify(foodTags),
    housing_tags_json: JSON.stringify(housingTags),
    progress_completed: progressCompleted,
    progress_total: progressTotal,
  };


  /**
   * Dify caller id.
   *
   * The website derives a stable, non-sensitive id from its own opaque profile
   * id (e.g. "guardian-demo-f36"). A single shared constant would group every
   * visitor into one Dify identity, so the per-profile value is preferred.
   *
   * The pattern is deliberately strict — lowercase alphanumerics, dash and
   * underscore only, with at least one letter — which structurally cannot carry
   * PII (no names, no "@", no all-digit phone / national id). Anything that does
   * not match falls back to the constant instead of being forwarded upstream.
   */
  const rawUser = typeof payload.user === "string" ? payload.user.trim() : "";
  const user =
    /^[a-z0-9_-]{1,64}$/.test(rawUser) && /[a-z]/.test(rawUser)
      ? rawUser
      : DIFY_USER_FALLBACK;

  /* Redacted echo for logs: no city, no free text, counts only. */
  const safe = {
    stage_id: stageId,
    scenario_id: scenarioId,
    stage_name: stageName,
    age,
    gender,
    completed_count: completedTaskIds.length,
    tag_count:
      wealthTags.length +
      healthTags.length +
      travelTags.length +
      foodTags.length +
      housingTags.length,
    progress: `${progressCompleted}/${progressTotal}`,
    user,
  };

  return { inputs, safe, user };
}

module.exports = {
  buildDifyInputs,
  normalizeStageName,
  LIMITS,
  STAGE_IDS,
  SCENARIO_IDS,
  STAGE_CANONICAL_NAMES,
  STAGE_INPUT_ALIASES,
  DIFY_USER_FALLBACK,
};
