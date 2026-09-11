/**
 * LELAN TECHNOLOGY · Guardian Demo Mock Adapter
 *
 * Phase 1E.3-A — Engineering Hardening
 *
 * Current (Demo):
 *   createGuardianDemoProfile(input) → GuardianProfile (local mock)
 *
 * Future (Production):
 *   Replace this module with an API adapter that calls api.lelan.tech
 *   while keeping the same public API surface:
 *     createGuardianDemoProfile(input: GuardianDemoInput): Promise<GuardianProfile>
 *
 * Profile UI remains unchanged — it only consumes GuardianProfile.
 *
 * Deterministic logic (age→stage, task state, archiveRef) is done HERE.
 * Future AI/Dify provides only: summary, attentionItems, dimensionNotes.
 *
 * NEVER: call Dify, call api.lelan.tech, use real API keys, store real data.
 *
 * Phase 1E.3-A changes (from Codex review):
 * - Validation strengthened: completedTaskIds and selectedDimensionTags
 *   must reference known stable IDs (rejects unknown values with INVALID_INPUT).
 * - archiveRef is now fully deterministic, NOT derived from current year:
 *   LELAN-DEMO-GEN-{AGE}-{GENDER}-{STAGE-SHORT}
 *   e.g. LELAN-DEMO-GEN-36-F-DUI
 *   This guarantees same input → same archiveRef.
 * - Missing-dimension semantics: elements that the user did not select
 *   any tag for default to "planned" / "待完善" rather than "normal" / "已记录"
 *   so the surface reflects what was actually submitted.
 */

import {
  type GuardianDemoInput,
  type GuardianAnalysisResult,
  type GuardianProfile,
  type GuardianProfileTask,
  type GuardianProfileElement,
  type GuardianProfileTimelineEvent,
  type GuardianDemoError,
  ageToStageId,
  guardianStages,
  guardianMethodSteps,
  GUARDIAN_SCENARIOS,
  GUARDIAN_DIMENSIONS,
  tagToDimension,
  isValidAge,
  VALID_STAGE_ID_SET,
  VALID_SCENARIO_ID_SET,
  VALID_DIMENSION_TAG_ID_SET,
  ALL_VALID_TASK_ID_SET,
  findStageById,
} from "@/content/guardian";

/* ========================================================================
   Error helpers
   ======================================================================== */

function invalidInput(message: string): GuardianDemoError {
  return { code: "INVALID_INPUT", message };
}

function stageMismatch(expected: ReturnType<typeof ageToStageId>): GuardianDemoError {
  return {
    code: "STAGE_MISMATCH",
    message: "输入的人生阶段与年龄不符，请确认后重新提交。",
    details: { expectedStage: expected },
  };
}

function unsupportedScenario(id: string): GuardianDemoError {
  return {
    code: "UNSUPPORTED_SCENARIO",
    message: `场景「${id}」暂未开放，请选择其他场景。`,
  };
}

function generationFailed(): GuardianDemoError {
  return {
    code: "GENERATION_FAILED",
    message: "这次档案生成没有完成，请重试。",
  };
}

/* ========================================================================
   Validation
   ======================================================================== */

function validateInput(
  input: unknown
): GuardianDemoInput | GuardianDemoError {
  if (!input || typeof input !== "object") {
    return invalidInput("输入格式不正确。");
  }

  const inp = input as Record<string, unknown>;

  if (inp.version !== "guardian-demo-v1") {
    return invalidInput("不支持的 Demo 版本。");
  }

  // Identity
  if (!inp.identity || typeof inp.identity !== "object") {
    return invalidInput("缺少身份信息。");
  }
  const identity = inp.identity as Record<string, unknown>;
  if (!isValidAge(identity.age as number)) {
    return invalidInput("请输入 0–120 之间的整数年龄。");
  }
  if (identity.gender !== "male" && identity.gender !== "female") {
    return invalidInput("请选择性别。");
  }
  // city optional, but if present must be a string
  if (
    identity.city !== undefined &&
    identity.city !== null &&
    typeof identity.city !== "string"
  ) {
    return invalidInput("城市字段类型不正确。");
  }

  // Stage
  if (!inp.stage || typeof inp.stage !== "object") {
    return invalidInput("缺少阶段信息。");
  }
  const stage = inp.stage as Record<string, unknown>;
  if (typeof stage.id !== "string" || !VALID_STAGE_ID_SET.has(stage.id as never)) {
    return invalidInput("人生阶段不存在。");
  }

  // Check age/stage consistency
  const expectedStage = ageToStageId(identity.age as number);
  if (stage.id !== expectedStage) {
    return stageMismatch(expectedStage);
  }

  // Scenario
  if (!inp.scenario || typeof inp.scenario !== "object") {
    return invalidInput("缺少场景信息。");
  }
  const scenario = inp.scenario as Record<string, unknown>;
  if (
    typeof scenario.id !== "string" ||
    !VALID_SCENARIO_ID_SET.has(scenario.id as never)
  ) {
    return unsupportedScenario(String(scenario.id));
  }

  // completedTaskIds — must be an array of strings, all referencing known task ids
  if (!Array.isArray(inp.completedTaskIds)) {
    return invalidInput("缺少已完成事项信息。");
  }
  for (const id of inp.completedTaskIds) {
    if (typeof id !== "string" || !ALL_VALID_TASK_ID_SET.has(id)) {
      return invalidInput(`已完成事项中包含未知事项：${String(id)}`);
    }
  }
  // Also ensure every completed task belongs to the user's selected scenario
  const scenarioTasks = new Set(
    GUARDIAN_SCENARIOS.find((s) => s.id === scenario.id)?.tasks.map((t) => t.id) ?? []
  );
  for (const id of inp.completedTaskIds) {
    if (!scenarioTasks.has(id as string)) {
      return invalidInput(`已完成事项不属于当前场景：${String(id)}`);
    }
  }

  // selectedDimensionTags — must be an array, all referencing known tag ids
  if (!Array.isArray(inp.selectedDimensionTags)) {
    return invalidInput("缺少生活维度选择信息。");
  }
  for (const tag of inp.selectedDimensionTags) {
    if (
      typeof tag !== "string" ||
      !VALID_DIMENSION_TAG_ID_SET.has(tag as never)
    ) {
      return invalidInput(`生活维度标签不合法：${String(tag)}`);
    }
  }

  return input as GuardianDemoInput;
}

/* ========================================================================
   Deterministic archiveRef (Phase 1E.3-A)
   ======================================================================== */

/**
 * Build a deterministic archive reference for the demo.
 *
 * Format: LELAN-DEMO-GEN-{AGE}-{GENDER}-{STAGE_SHORT}
 * Example: LELAN-DEMO-GEN-36-F-DUI
 *
 * Same input → same output across runs / years / sessions.
 * NOT derived from current time.
 */
export function buildArchiveRef(input: GuardianDemoInput): string {
  const genderChar = input.identity.gender === "male" ? "M" : "F";
  const stageShort = findStageById(input.stage.id)?.shortCode ?? "GEN";
  return `LELAN-DEMO-GEN-${input.identity.age}-${genderChar}-${stageShort}`;
}

/* ========================================================================
   Mock analysis generation (deterministic)
   Future: replaced by Dify JSON output
   ======================================================================== */

type DimensionId = "wealth" | "health" | "travel" | "food" | "housing";

interface TagNotice {
  status: "normal" | "attention" | "current" | "planned";
  title: string;
  explanation: string;
}

const TAG_NOTICES: Record<string, TagNotice> = {
  // Wealth
  budget:             { status: "planned",   title: "预算规划可纳入",              explanation: "可以把基础收支预算作为财务档案的第一步。" },
  insurance:          { status: "current",  title: "保险信息值得整理",            explanation: "各类保单信息可以集中归档，便于后续管理。" },
  "business-account":  { status: "current",  title: "企业账户可加入档案",          explanation: "企业相关账户与资产信息可纳入当前档案整理。" },
  "tax-attention":     { status: "attention", title: "税务事项值得持续关注",        explanation: "年度税务信息建议定期核对并纳入档案。" },
  // Health
  "annual-checkup-pending": { status: "attention", title: "年度体检可加入当前事项",   explanation: "建议把年度体检安排纳入近期生活档案中。" },
  "sleep-attention":  { status: "attention", title: "作息记录值得持续关注",       explanation: "可以把近期睡眠与作息变化持续记录在生活档案中，便于后续回顾。" },
  "exercise-record":   { status: "planned",   title: "运动记录可纳入",              explanation: "长期运动习惯记录有助于了解整体健康趋势。" },
  "health-record":     { status: "planned",   title: "健康档案建议整理",            explanation: "已有健康记录可以系统化整理归档。" },
  // Travel
  "frequent-travel":   { status: "current",  title: "频繁出行值得记录",            explanation: "常用出行信息与差旅记录可加入档案。" },
  "document-check":    { status: "planned",   title: "证件信息可核对",              explanation: "常用证件有效期与归档情况可加入档案。" },
  "trip-planning":     { status: "planned",   title: "出行计划可记录",              explanation: "重要出行计划与路线信息可纳入档案。" },
  // Food
  "irregular-meals":   { status: "attention", title: "饮食规律值得纳入",            explanation: "饮食规律可以作为长期生活档案的参考维度。" },
  "nutrition-record":  { status: "planned",   title: "营养记录可加入",              explanation: "饮食习惯记录有助于了解整体生活状态。" },
  "meal-routine":      { status: "planned",   title: "用餐习惯可记录",              explanation: "日常用餐习惯可以作为生活档案的一个维度。" },
  // Housing
  renting:            { status: "planned",   title: "租房信息可归档",              explanation: "当前租房信息与合同可以纳入档案管理。" },
  "housing-plan":      { status: "planned",   title: "购房计划可记录",              explanation: "长期居住规划可以纳入人生坐标。" },
  renovation:          { status: "planned",   title: "装修事项可关注",              explanation: "装修阶段的相关信息可纳入安居维度。" },
  "family-housing":   { status: "normal",   title: "家庭居住已归档",              explanation: "当前居住信息已归档，可按家庭需求持续更新。" },
};

function generateMockAnalysis(
  input: GuardianDemoInput
): GuardianAnalysisResult {
  const { selectedDimensionTags, identity } = input;
  const selectedTags = new Set(selectedDimensionTags);

  // Build attention items
  const attentionItems: GuardianAnalysisResult["attentionItems"] = [];
  const dimMap = new Map<DimensionId, GuardianAnalysisResult["attentionItems"][number]>();

  for (const tag of selectedDimensionTags) {
    const notice = TAG_NOTICES[tag];
    if (!notice) continue;
    const dim = tagToDimension(tag) as DimensionId;
    const item: GuardianAnalysisResult["attentionItems"][number] = {
      id: tag,
      dimension: dim,
      status: notice.status,
      title: notice.title,
      explanation: notice.explanation,
    };
    // Prefer "current" over other statuses for the same dimension
    if (!dimMap.has(dim) || notice.status === "current") {
      dimMap.set(dim, item);
    }
  }
  attentionItems.push(...dimMap.values());

  // Dimension notes
  const dimensionNotes: GuardianAnalysisResult["dimensionNotes"] = {
    wealth: selectedTags.has("budget") || selectedTags.has("insurance")
      ? "本次 Demo 关注了财务与资产维度，建议逐步建立基础收支记录。"
      : "本次 Demo 暂未纳入财富维度。",
    health: selectedTags.has("annual-checkup-pending") || selectedTags.has("sleep-attention")
      ? "本次 Demo 关注了健康维度，建议保持规律记录。"
      : "本次 Demo 暂未纳入健康维度。",
    travel: selectedTags.has("frequent-travel") || selectedTags.has("trip-planning")
      ? "本次 Demo 关注了出行维度。"
      : "本次 Demo 暂未纳入出行维度。",
    food: selectedTags.has("irregular-meals") || selectedTags.has("nutrition-record")
      ? "本次 Demo 关注了饮食维度，饮食习惯可作为长期生活档案参考。"
      : "本次 Demo 暂未纳入饮食维度。",
    housing: selectedTags.has("renting") || selectedTags.has("family-housing")
      ? "本次 Demo 关注了安居维度，居住信息可纳入人生坐标。"
      : "本次 Demo 暂未纳入安居维度。",
  };

  return {
    summary: `${identity.age} 岁 ${identity.gender === "male" ? "男性" : "女性"}的人生档案已整理完成。`,
    attentionItems,
    dimensionNotes,
    disclaimer:
      "本结果为乐懒守护产品 Demo，用于展示人生档案、生命周期坐标与信息整理方式。不构成医学诊断，投资建议或法律意见。",
  };
}

/* ========================================================================
   Deterministic profile building
   ======================================================================== */

function buildProfile(input: GuardianDemoInput): GuardianProfile {
  const { identity, stage, scenario, completedTaskIds, selectedDimensionTags } = input;

  // Stage metadata
  const stageMeta = guardianStages.find((s) => s.id === stage.id)!;

  // Scenario metadata
  const scenarioMeta = GUARDIAN_SCENARIOS.find((s) => s.id === scenario.id)!;

  // Task state algorithm: done → first incomplete → upcoming
  const taskList = scenarioMeta.tasks;
  const doneSet = new Set(completedTaskIds);
  const firstIncompleteIdx = taskList.findIndex((t) => !doneSet.has(t.id));

  const tasks: GuardianProfileTask[] = taskList.map((t, idx) => {
    if (doneSet.has(t.id)) {
      return { id: t.id, label: t.label, status: "done" as const };
    }
    if (idx === firstIncompleteIdx) {
      return { id: t.id, label: t.label, status: "current" as const };
    }
    return { id: t.id, label: t.label, status: "upcoming" as const };
  });

  const completedCount = tasks.filter((t) => t.status === "done").length;
  const totalCount = tasks.length;

  // Element status from analysis
  const analysis = generateMockAnalysis(input);
  const topItemByDim = new Map<string, GuardianAnalysisResult["attentionItems"][number]>();
  for (const item of analysis.attentionItems) {
    if (item.status === "current" || !topItemByDim.has(item.dimension)) {
      topItemByDim.set(item.dimension, item);
    }
  }

  // Dimensions the user explicitly engaged with via tag selection.
  // If a dimension has no selected tags, surface defaults to "planned / 待完善"
  // rather than "normal / 已记录" — the latter wrongly implies we already
  // have data on that dimension.
  const touchedDimensions = new Set(
    selectedDimensionTags.map((t) => tagToDimension(t))
  );

  const elements: GuardianProfileElement[] = GUARDIAN_DIMENSIONS.map((dim) => {
    const topItem = topItemByDim.get(dim.id);
    const note = analysis.dimensionNotes[dim.id] ?? "本次 Demo 暂未纳入该维度。";

    let status: GuardianProfileElement["status"];
    let notice: string;

    if (topItem) {
      status = topItem.status;
      notice = topItem.title + (topItem.explanation ? " " + topItem.explanation : "");
    } else if (!touchedDimensions.has(dim.id)) {
      status = "planned";
      notice = `本次 Demo 未选择「${dim.name}」相关维度，可按需要补充。`;
    } else {
      status = "planned";
      notice = note;
    }

    return {
      id: dim.id,
      element: dim.element,
      dimension: dim.name,
      description: dim.description,
      status,
      notice,
      assetId: dim.assetId,
    };
  });

  // Timeline — demo year is fixed at 2026 to avoid coupling to current time.
  const DEMO_YEAR = "2026";
  const timeline: GuardianProfileTimelineEvent[] = [
    { date: DEMO_YEAR, label: "本次 Demo 建档记录", status: "recorded" },
  ];

  const archiveRef = buildArchiveRef(input);

  return {
    id: archiveRef,
    demo: true,
    archiveRef,
    identity: {
      age: identity.age,
      gender: identity.gender === "male" ? "男" : "女",
      genderLabel: identity.gender === "male" ? "男性" : "女性",
    },
    stage: {
      id: stageMeta.id,
      trigram: stageMeta.trigram,
      name: stageMeta.name,
      ageRange: stageMeta.ageRange,
      theme: scenarioMeta.description,
      assetId: stageMeta.stageAssetId,
    },
    scenario: {
      id: scenarioMeta.id,
      name: scenarioMeta.name,
    },
    progress: { completed: completedCount, total: totalCount },
    tasks,
    elements,
    timeline,
    methodSteps: guardianMethodSteps,
  };
}

/* ========================================================================
   Public API
   ======================================================================== */

/**
 * Create a GuardianProfile from demo input.
 *
 * Current: local mock (deterministic, no AI, no network)
 * Future:  replace internals with:
 *   fetch("https://api.lelan.tech/guardian/demo", {
 *     method: "POST",
 *     body: JSON.stringify(input),
 *     headers: { "Content-Type": "application/json" },
 *   }).then(r => r.json()) as GuardianProfile
 */
export async function createGuardianDemoProfile(
  input: unknown
): Promise<GuardianProfile | GuardianDemoError> {
  const valid = validateInput(input);
  if ("code" in valid) return valid;

  // Simulate short processing delay
  await new Promise((r) => setTimeout(r, 500));

  try {
    return buildProfile(valid);
  } catch {
    return generationFailed();
  }
}

/* ========================================================================
   sessionStorage helpers for generated profile
   ======================================================================== */

export const GENERATED_PROFILE_KEY = "lelan_generated_guardian_profile";

/**
 * Check whether a parsed value has the minimum shape we expect
 * for a GuardianProfile. Used by getGeneratedProfile to defend against
 * corrupt cache without crashing the page.
 */
function isValidGuardianProfileShape(parsed: unknown): parsed is GuardianProfile {
  if (!parsed || typeof parsed !== "object") return false;
  const p = parsed as Record<string, unknown>;

  if (typeof p.id !== "string" || typeof p.archiveRef !== "string") return false;
  if (typeof p.demo !== "boolean") return false;

  const identity = p.identity as Record<string, unknown> | undefined;
  if (!identity || typeof identity.age !== "number") return false;
  if (typeof identity.gender !== "string") return false;
  if (typeof identity.genderLabel !== "string") return false;

  const stage = p.stage as Record<string, unknown> | undefined;
  if (!stage || typeof stage.id !== "string") return false;
  if (typeof stage.trigram !== "string" || typeof stage.name !== "string") return false;
  if (typeof stage.ageRange !== "string") return false;

  if (!Array.isArray(p.tasks)) return false;
  if (!Array.isArray(p.elements)) return false;
  if (!Array.isArray(p.timeline)) return false;

  const progress = p.progress as Record<string, unknown> | undefined;
  if (!progress || typeof progress.completed !== "number") return false;
  if (typeof progress.total !== "number") return false;

  return true;
}

/**
 * Read the generated profile from sessionStorage.
 *
 * Phase 1E.3-A: defends against corrupt cache (JSON malformed,
 * shape invalid, missing required fields). On any failure,
 * clears the corrupt entry and returns null — caller can show
 * the safe empty state.
 */
export function getGeneratedProfile(): GuardianProfile | null {
  if (typeof window === "undefined") return null;
  let raw: string | null = null;
  try {
    raw = sessionStorage.getItem(GENERATED_PROFILE_KEY);
  } catch {
    return null;
  }
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!isValidGuardianProfileShape(parsed)) {
      // shape invalid — discard corrupt cache
      try {
        sessionStorage.removeItem(GENERATED_PROFILE_KEY);
      } catch {
        /* ignore */
      }
      return null;
    }
    return parsed;
  } catch {
    // JSON malformed — discard corrupt cache
    try {
      sessionStorage.removeItem(GENERATED_PROFILE_KEY);
    } catch {
      /* ignore */
    }
    return null;
  }
}

export function setGeneratedProfile(profile: GuardianProfile): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(GENERATED_PROFILE_KEY, JSON.stringify(profile));
}

export function clearGeneratedProfile(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(GENERATED_PROFILE_KEY);
}
