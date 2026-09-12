/**
 * LELAN TECHNOLOGY · Guardian Demo Form
 *
 * Phase 1E.3-A — Engineering Hardening + Product Polish.
 *
 * 6 steps:
 *   01 基础信息  (age, gender, city)
 *   02 人生阶段  (stage confirmation)
 *   03 当前场景  (scenario selection)
 *   04 生活维度  (multi-select dimension tags)
 *   05 当前事项  (task completion checklist)
 *   06 档案校对  (review + generate)
 *
 * Phase 1E.3-A changes (from Codex review):
 * - Step 2 is the ONLY forward path. The generic "next" button is suppressed
 *   until stage is explicitly confirmed. Removes the bypass that could let a
 *   user land on Step 6 with empty state.
 * - Age parsing no longer uses parseInt — uses Number() and isValidAge so
 *   36.8, NaN, -1, 121 are all rejected with role=alert messaging.
 * - Pre-step entry validates required state. If state is incomplete,
 *   the user is bounced to the relevant step.
 * - Step 6 always exposes "返回修改" and "生成我的人生档案" — never only one.
 * - Step changes focus the step heading for keyboard / screen reader users.
 *
 * Client component — manages own step state.
 * Calls mock-adapter on submit.
 *
 * NOT a medical/health questionnaire.
 * NOT a financial KYC form.
 * NOT a dashboard.
 */
"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Link from "next/link";
import {
  GUARDIAN_SCENARIOS,
  DIMENSION_TAGS,
  getGuardianStageDisplayName,
  guardianStages,
  type GuardianStageId,
  type GuardianScenarioId,
  type GuardianDimensionTagId,
  ageToStageId,
  parseAndValidateAge,
} from "@/content/guardian";
import {
  createGuardianDemoProfile,
  setGeneratedProfile,
} from "@/lib/guardian/mock-adapter";
import {
  type GuardianDemoInput,
} from "@/content/guardian";
import { GuardianSeal } from "@/components/guardian/GuardianSeal";

/* ========================================================================
   Constants
   ======================================================================== */

const TOTAL_STEPS = 6;

const STEP_LABELS = [
  "基础信息",
  "人生阶段",
  "当前场景",
  "生活维度",
  "当前事项",
  "档案校对",
] as const;

type SealState = "outline" | "partial" | "complete";

/* ========================================================================
   Sub-components
   ======================================================================== */

/** Progress bar — desktop horizontal / mobile vertical with current cue */
function ProgressBar({ current }: { current: number }) {
  return (
    <nav aria-label="建档进度" className="flex flex-col gap-2">
      {/* Mobile (≤640): always show "Step X / 6 · 当前步骤" so 375 users
          don't have to scroll a horizontal stepper. */}
      <div className="flex items-baseline justify-between sm:hidden">
        <span className="font-mono text-[0.65rem] uppercase tracking-wider text-muted">
          进度
        </span>
        <span className="font-mono text-[0.7rem] tracking-wider text-ink">
          {String(current).padStart(2, "0")} / {String(TOTAL_STEPS).padStart(2, "0")} ·{" "}
          {STEP_LABELS[current - 1]}
        </span>
      </div>

      {/* Visual rail */}
      <ol
        className="flex items-center gap-1.5"
        aria-hidden
      >
        {STEP_LABELS.map((label, idx) => {
          const num = idx + 1;
          const done = num < current;
          const active = num === current;
          return (
            <li key={label} className="flex flex-1 items-center gap-1.5 last:flex-none">
              <span
                className={[
                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-sm border font-mono text-[0.6rem] transition-colors",
                  done
                    ? "border-green bg-green text-paper"
                    : active
                    ? "border-ink bg-ink text-paper"
                    : "border-rule bg-paper text-muted",
                ].join(" ")}
              >
                {done ? "✓" : String(num).padStart(2, "0")}
              </span>
              <span
                className={[
                  "h-px flex-1 transition-colors",
                  done ? "bg-green" : active ? "bg-ink" : "bg-rule",
                ].join(" ")}
              />
            </li>
          );
        })}
      </ol>

      {/* Desktop (≥640): full horizontal labels */}
      <ol className="hidden gap-1.5 sm:flex">
        {STEP_LABELS.map((label, idx) => {
          const num = idx + 1;
          const done = num < current;
          const active = num === current;
          return (
            <li key={label} className="flex flex-1 flex-col gap-1">
              <span
                className={[
                  "flex h-6 w-full items-center justify-center rounded-sm border font-mono text-[0.6rem] transition-colors",
                  done
                    ? "border-green bg-green text-paper"
                    : active
                    ? "border-ink bg-ink text-paper"
                    : "border-rule bg-paper text-muted",
                ].join(" ")}
                aria-hidden
              >
                {done ? "✓" : String(num).padStart(2, "0")}
              </span>
              <span
                className={[
                  "text-center font-mono text-[0.6rem] uppercase tracking-wider",
                  active ? "text-ink" : done ? "text-green" : "text-muted",
                ].join(" ")}
              >
                {label}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/** Step heading — receives ref for focus management */
function StepHeading({
  step,
  label,
  sublabel,
  headingRef,
}: {
  step: number;
  label: string;
  sublabel?: string;
  headingRef?: React.RefObject<HTMLHeadingElement | null>;
}) {
  return (
    <header className="mb-6">
      <p className="font-mono text-[0.65rem] uppercase tracking-wider text-muted">
        {String(step).padStart(2, "0")} / {String(TOTAL_STEPS).padStart(2, "0")}
        {sublabel ? ` · ${sublabel}` : ""}
      </p>
      <h2
        ref={headingRef}
        tabIndex={-1}
        className="mt-1 font-serif text-2xl text-ink outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-cinnabar focus-visible:outline-offset-4 sm:text-3xl"
      >
        {label}
      </h2>
    </header>
  );
}

/* ── Step 1: Basic Info ─────────────────────────────────────────── */

function StepBasicInfo({
  data,
  onChange,
}: {
  data: { age: string; gender: "" | "male" | "female"; city: string };
  onChange: (d: typeof data) => void;
}) {
  return (
    <div className="flex flex-col gap-6">
      {/* Age — text input to prevent browser auto-normalization of "36.8" → "36" */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="age" className="font-mono text-[0.65rem] uppercase tracking-wider text-muted">
          年龄 <span className="text-cinnabar">*</span>
        </label>
        <input
          id="age"
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder="请输入年龄（整数 0–120）"
          value={data.age}
          onChange={(e) => onChange({ ...data, age: e.target.value })}
          className="w-full rounded-sm border border-rule bg-paper px-4 py-2.5 text-sm text-ink placeholder:text-muted/50 focus:border-green focus:outline-none focus:ring-1 focus:ring-green"
          aria-required="true"
          autoComplete="off"
        />
        <p className="text-[0.7rem] text-muted/70">
          仅接受 0–120 之间的整数；如 36.8、-1、121 等不会被接受。
        </p>
      </div>

      {/* Gender */}
      <fieldset className="flex flex-col gap-2">
        <legend className="font-mono text-[0.65rem] uppercase tracking-wider text-muted">
          性别 <span className="text-cinnabar">*</span>
        </legend>
        <div className="flex flex-wrap gap-3">
          {(["male", "female"] as const).map((g) => (
            <label
              key={g}
              className="relative flex cursor-pointer items-center gap-2 overflow-hidden rounded-sm border border-rule px-4 py-2.5 text-sm transition-colors has-[:checked]:border-green has-[:checked]:bg-green/5 has-[:checked]:text-green focus-within:outline focus-within:outline-2 focus-within:outline-cinnabar focus-within:outline-offset-2"
            >
              <input
                type="radio"
                name="gender"
                value={g}
                checked={data.gender === g}
                onChange={() => onChange({ ...data, gender: g })}
                className="absolute h-full w-full cursor-pointer opacity-0"
              />
              {g === "male" ? "男" : "女"}
            </label>
          ))}
        </div>
      </fieldset>

      {/* City */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="city" className="font-mono text-[0.65rem] uppercase tracking-wider text-muted">
          所在城市 <span className="text-muted/60">（可选）</span>
        </label>
        <input
          id="city"
          type="text"
          placeholder="例如：北京"
          value={data.city}
          onChange={(e) => onChange({ ...data, city: e.target.value })}
          className="w-full rounded-sm border border-rule bg-paper px-4 py-2.5 text-sm text-ink placeholder:text-muted/50 focus:border-green focus:outline-none focus:ring-1 focus:ring-green"
        />
      </div>
    </div>
  );
}

/* ── Step 2: Stage Confirmation ─────────────────────────────────── */

function StepStageConfirm({
  age,
  onConfirm,
}: {
  age: number;
  onConfirm: () => void;
}) {
  const suggestedId = ageToStageId(age);
  const stage = guardianStages.find((s) => s.id === suggestedId)!;

  return (
    <div className="flex flex-col gap-6">
      <p className="text-sm leading-relaxed text-muted">
        根据年龄 <strong className="font-serif text-base text-ink">{age}</strong>{" "}
        岁，系统建议以下人生阶段：
      </p>

      {/* Stage rail (read-only preview) */}
      <div className="flex flex-wrap gap-2">
        {guardianStages.map((s) => (
          <div
            key={s.id}
            className={[
              "flex flex-col items-center rounded-sm border px-3 py-2 text-center transition-colors",
              s.id === suggestedId
                ? "border-green bg-green/5 text-green"
                : "border-rule text-muted",
            ].join(" ")}
          >
            <span className="font-serif text-base">{s.trigram}</span>
            <span className="mt-1 font-mono text-[0.6rem]">{s.name}</span>
            <span className="mt-0.5 font-mono text-[0.55rem] opacity-70">
              {s.ageRange}
            </span>
          </div>
        ))}
      </div>

      {/* Suggested stage card */}
      <div className="rounded-sm border border-green/30 bg-green/5 p-4">
        <p className="font-serif text-base text-green">
          {/* Full life-stage display ⇒ canonical displayName. */}
          {getGuardianStageDisplayName(stage.id)}
        </p>
        <p className="mt-1 font-mono text-[0.65rem] text-muted">
          {stage.ageRange} · {stage.sceneLabel}
        </p>
        <p className="mt-3 text-xs leading-relaxed text-muted">
          请确认此阶段是否与您当前人生阶段一致。
          阶段确认是 Demo 继续进行的唯一前进步骤。
        </p>
      </div>

      {/* ONLY forward path */}
      <button
        type="button"
        onClick={onConfirm}
        className="self-start rounded-sm border border-ink bg-ink px-6 py-2.5 text-sm text-paper transition-colors hover:bg-green-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-cinnabar focus-visible:outline-offset-2"
      >
        确认阶段
      </button>
    </div>
  );
}

/* ── Step 3: Scenario Selection ─────────────────────────────────── */

function StepScenario({
  selected,
  onChange,
}: {
  selected: GuardianScenarioId;
  onChange: (id: GuardianScenarioId) => void;
}) {
  return (
    <div className="flex flex-col gap-6">
      <p className="text-sm text-muted">
        选择当前最想整理的生活场景：
      </p>

      <fieldset className="flex flex-col gap-3">
        <legend className="sr-only">选择场景</legend>
        {GUARDIAN_SCENARIOS.map((sc) => (
          <label
            key={sc.id}
            className="flex cursor-pointer items-start gap-3 rounded-sm border border-rule px-4 py-3 text-sm transition-colors has-[:checked]:border-green has-[:checked]:bg-green/5 has-[:checked]:text-green focus-within:outline focus-within:outline-2 focus-within:outline-cinnabar focus-within:outline-offset-2"
          >
            <input
              type="radio"
              name="scenario"
              value={sc.id}
              checked={selected === sc.id}
              onChange={() => onChange(sc.id)}
              className="mt-0.5 shrink-0 accent-green"
            />
            <div>
              <span className="font-medium">{sc.name}</span>
              <span className="ml-2 text-muted">{sc.description}</span>
            </div>
          </label>
        ))}
      </fieldset>
    </div>
  );
}

/* ── Step 4: Dimension Selection ────────────────────────────────── */

const DIMENSION_COLS: Array<{
  dimId: string;
  element: string;
  name: string;
  tags: typeof DIMENSION_TAGS;
}> = [
  {
    dimId: "wealth",
    element: "金",
    name: "财富",
    tags: DIMENSION_TAGS.filter((t) => t.dimension === "wealth"),
  },
  {
    dimId: "health",
    element: "木",
    name: "健康",
    tags: DIMENSION_TAGS.filter((t) => t.dimension === "health"),
  },
  {
    dimId: "travel",
    element: "水",
    name: "出行",
    tags: DIMENSION_TAGS.filter((t) => t.dimension === "travel"),
  },
  {
    dimId: "food",
    element: "火",
    name: "饮食",
    tags: DIMENSION_TAGS.filter((t) => t.dimension === "food"),
  },
  {
    dimId: "housing",
    element: "土",
    name: "安居",
    tags: DIMENSION_TAGS.filter((t) => t.dimension === "housing"),
  },
];

function StepDimensions({
  selected,
  onToggle,
}: {
  selected: Set<GuardianDimensionTagId>;
  onToggle: (id: GuardianDimensionTagId) => void;
}) {
  return (
    <div className="flex flex-col gap-6">
      <p className="text-sm text-muted">
        选择你希望纳入这次人生档案整理的生活维度（可多选）：
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {DIMENSION_COLS.map((col) => (
          <fieldset key={col.dimId} className="rounded-sm border border-rule bg-paper-pure p-4">
            <legend className="flex items-center gap-2 px-1 font-serif text-sm text-ink">
              <span className="text-base">{col.element}</span>
              <span className="text-xs text-muted">{col.name}</span>
            </legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {col.tags.map((tag) => {
                const checked = selected.has(tag.id);
                return (
                  <label
                    key={tag.id}
                    className={[
                      "relative flex cursor-pointer items-center gap-1.5 overflow-hidden rounded-sm border px-2.5 py-1.5 text-xs transition-colors focus-within:outline focus-within:outline-2 focus-within:outline-cinnabar focus-within:outline-offset-2",
                      checked
                        ? "border-green bg-green/10 text-green"
                        : "border-rule text-muted hover:border-muted",
                    ].join(" ")}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => onToggle(tag.id)}
                      className="absolute h-full w-full cursor-pointer opacity-0"
                    />
                    {checked && <span aria-hidden>✓</span>}
                    {tag.label}
                  </label>
                );
              })}
            </div>
          </fieldset>
        ))}
      </div>

      {selected.size === 0 && (
        <p className="text-xs text-muted">
          暂不选择生活维度仍可生成档案。未选维度会标记为「待完善」。
        </p>
      )}
    </div>
  );
}

/* ── Step 5: Task Completion ────────────────────────────────────── */

function StepTasks({
  scenarioId,
  completed,
  onToggle,
}: {
  scenarioId: GuardianScenarioId;
  completed: Set<string>;
  onToggle: (id: string) => void;
}) {
  const scenario = GUARDIAN_SCENARIOS.find((s) => s.id === scenarioId)!;

  return (
    <div className="flex flex-col gap-6">
      <p className="text-sm text-muted">
        请勾选已完成的事项。第一个未勾选的事项会作为「当前事项」：
      </p>

      <fieldset className="flex flex-col gap-2">
        <legend className="sr-only">选择已完成事项</legend>
        {scenario.tasks.map((task) => {
          const checked = completed.has(task.id);
          return (
            <label
              key={task.id}
              className="flex cursor-pointer items-center gap-3 rounded-sm border border-rule px-4 py-3 text-sm transition-colors has-[:checked]:border-green has-[:checked]:bg-green/5 has-[:checked]:text-green focus-within:outline focus-within:outline-2 focus-within:outline-cinnabar focus-within:outline-offset-2"
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => onToggle(task.id)}
                className="h-4 w-4 shrink-0 accent-green"
              />
              {checked && <span aria-hidden className="text-xs">✓</span>}
              {task.label}
            </label>
          );
        })}
      </fieldset>
    </div>
  );
}

/* ── Step 6: Review ────────────────────────────────────────────── */

function StepReview({
  input,
  onSubmit,
  loading,
  error,
  onBackToEdit,
}: {
  input: GuardianDemoInput;
  loading: boolean;
  error: string | null;
  onSubmit: () => void;
  onBackToEdit: () => void;
}) {
  const stage = guardianStages.find((s) => s.id === input.stage.id)!;
  const scenario = GUARDIAN_SCENARIOS.find((s) => s.id === input.scenario.id)!;
  const selectedTags = DIMENSION_TAGS.filter((t) =>
    input.selectedDimensionTags.includes(t.id)
  );
  const doneTasks = scenario.tasks.filter((t) =>
    input.completedTaskIds.includes(t.id)
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 rounded-sm border border-rule bg-paper-pure p-5">
        <ReviewItem label="年龄" value={`${input.identity.age} 岁`} />
        <ReviewItem label="性别" value={input.identity.gender === "male" ? "男" : "女"} />
        {input.identity.city && (
          <ReviewItem label="城市" value={input.identity.city} />
        )}
        <ReviewItem label="人生阶段" value={`${stage.trigram} · ${stage.name}（${stage.ageRange}）`} />
        <ReviewItem label="当前场景" value={scenario.name} />
        {selectedTags.length > 0 && (
          <div>
            <span className="font-mono text-[0.65rem] uppercase tracking-wider text-muted">
              已选生活维度
            </span>
            <div className="mt-1 flex flex-wrap gap-1.5">
              {selectedTags.map((t) => (
                <span
                  key={t.id}
                  className="rounded-sm border border-rule bg-paper px-2 py-1 font-mono text-[0.65rem] text-muted"
                >
                  {t.label}
                </span>
              ))}
            </div>
          </div>
        )}
        {doneTasks.length > 0 && (
          <div>
            <span className="font-mono text-[0.65rem] uppercase tracking-wider text-muted">
              已完成事项
            </span>
            <div className="mt-1 flex flex-wrap gap-1.5">
              {doneTasks.map((t) => (
                <span
                  key={t.id}
                  className="rounded-sm border border-green/30 bg-green/5 px-2 py-1 font-mono text-[0.65rem] text-green"
                >
                  ✓ {t.label}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {error && (
        <p
          role="alert"
          className="rounded-sm border border-cinnabar/30 bg-cinnabar/5 px-3 py-2 text-xs text-cinnabar"
        >
          {error}
        </p>
      )}

      <p className="text-xs leading-relaxed text-muted">
        本次 Demo 数据仅保存在当前浏览器中，关闭标签页后自动清除。
        不建立任何真实档案，不构成医学判断、投资建议或法律意见。
      </p>

      {/* ALWAYS two actions: edit / generate */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="button"
          onClick={onBackToEdit}
          className="rounded-sm border border-rule px-4 py-2.5 text-sm text-muted transition-colors hover:border-muted hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-cinnabar focus-visible:outline-offset-2"
        >
          ← 返回修改
        </button>
        <button
          type="button"
          onClick={onSubmit}
          disabled={loading}
          className="rounded-sm border border-ink bg-ink px-6 py-2.5 text-sm text-paper transition-colors hover:bg-green-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-cinnabar focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "正在整理人生档案…" : "生成我的人生档案"}
        </button>
      </div>
    </div>
  );
}

function ReviewItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start gap-4">
      <span className="w-20 shrink-0 font-mono text-[0.65rem] uppercase tracking-wider text-muted">
        {label}
      </span>
      <span className="text-sm text-ink">{value}</span>
    </div>
  );
}

/* ========================================================================
   Main Form Component
   ======================================================================== */

export function GuardianDemoForm() {
  // Step state
  const [step, setStep] = useState(1);

  // Step 1 data — store as string to avoid silent parseInt on partial input
  const [ageStr, setAgeStr] = useState("");
  const [gender, setGender] = useState<"" | "male" | "female">("");
  const [city, setCity] = useState("");

  // Step 2: explicit confirmation state
  const [confirmedStage, setConfirmedStage] = useState<GuardianStageId | null>(null);

  // Step 3 data
  const [scenarioId, setScenarioId] = useState<GuardianScenarioId>("general");

  // Step 4 data
  const [selectedTags, setSelectedTags] = useState<Set<GuardianDimensionTagId>>(
    new Set()
  );

  // Step 5 data
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());

  // Submit state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const errorRef = useRef<HTMLParagraphElement>(null);
  const stepHeadingRef = useRef<HTMLHeadingElement>(null);

  // Derived: validated age (no parseInt — uses parseAndValidateAge → Number + isValidAge)
  const age = parseAndValidateAge(ageStr);

  // Focus step heading when step changes (for keyboard / screen reader users)
  useEffect(() => {
    stepHeadingRef.current?.focus();
  }, [step]);

  // Pre-step-entry guard: if we somehow land on step ≥ 2 with incomplete state,
  // redirect to the appropriate earlier step. (Belt-and-suspenders for the
  // bypass path; primary fix is in step 2 not exposing a generic next.)
  useEffect(() => {
    if (step === 2 && age === null) {
      setError("请先在「基础信息」中输入有效的年龄。");
      setStep(1);
      return;
    }
    if (step === 3 && (!age || !gender || !confirmedStage)) {
      setError("请先完成前序步骤。");
      if (!age || !gender) setStep(1);
      else setStep(2);
      return;
    }
  }, [step, age, gender, confirmedStage]);

  // Auto-scroll error into view when it appears
  useEffect(() => {
    if (error && errorRef.current) {
      errorRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [error]);

  // Toggle tag
  const toggleTag = useCallback((id: GuardianDimensionTagId) => {
    setSelectedTags((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  // Toggle task
  const toggleTask = useCallback((id: string) => {
    setCompletedTasks((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  // Back
  const handleBack = useCallback(() => {
    setError(null);
    setStep((s) => Math.max(1, s - 1));
  }, []);

  // Submit
  const handleSubmit = useCallback(async () => {
    if (age === null || !gender || !confirmedStage) {
      setError("档案信息不完整，请返回修改。");
      return;
    }

    const input: GuardianDemoInput = {
      version: "guardian-demo-v1",
      identity: {
        age,
        gender: gender as "male" | "female",
        city: city.trim() || undefined,
      },
      stage: { id: confirmedStage },
      scenario: { id: scenarioId },
      completedTaskIds: [...completedTasks],
      selectedDimensionTags: [...selectedTags],
    };

    setLoading(true);
    setError(null);

    try {
      const result = await createGuardianDemoProfile(input);
      if ("code" in result) {
        setError(result.message);
        if (result.code === "STAGE_MISMATCH") {
          setStep(2);
        }
      } else {
        setGeneratedProfile(result);
        window.location.href = "/profile";
      }
    } catch {
      setError("生成过程中出现错误，请重试。");
    } finally {
      setLoading(false);
    }
  }, [confirmedStage, age, gender, city, scenarioId, completedTasks, selectedTags]);

  // Seal state for current submission
  const sealState: SealState =
    step === 6
      ? "partial"
      : age !== null && gender !== "" && confirmedStage !== null
      ? "complete"
      : age !== null || gender !== "" || confirmedStage !== null
      ? "partial"
      : "outline";

  // Build current input (always available for seal preview)
  const currentInput: GuardianDemoInput | null =
    age !== null && gender !== "" && confirmedStage
      ? {
          version: "guardian-demo-v1",
          identity: {
            age,
            gender: gender as "male" | "female",
            city: city.trim() || undefined,
          },
          stage: { id: confirmedStage },
          scenario: { id: scenarioId },
          completedTaskIds: [...completedTasks],
          selectedDimensionTags: [...selectedTags],
        }
      : null;

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-8">
      {/* Header — Guardian Demo identity + Seal preview */}
      <header className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[0.65rem] uppercase tracking-wider text-muted">
            乐懒守护 · 产品演示
          </p>
          <h1 className="mt-1 font-serif text-xl text-ink sm:text-2xl">
            建立一份人生档案
          </h1>
          <p className="mt-2 text-xs text-muted sm:text-sm">
            当前为乐懒守护产品演示，不建立真实医疗档案；
            <br className="sm:hidden" />
            所有数据仅在当前浏览器中展示，关闭标签页后自动清除。
          </p>
        </div>
        <div className="shrink-0">
          <GuardianSeal state={sealState} size="sm" />
        </div>
      </header>

      {/* Progress + Stepper */}
      <div className="rounded-sm border border-rule bg-paper-pure p-4">
        <ProgressBar current={step} />
      </div>

      {/* Step content */}
      <section
        aria-live="polite"
        className="rounded-sm border border-rule bg-paper-pure p-5 sm:p-6"
      >
        {step === 1 && (
          <StepBasicInfo
            data={{ age: ageStr, gender, city }}
            onChange={(d) => {
              setAgeStr(d.age);
              setGender(d.gender);
              setCity(d.city);
              if (error) setError(null);
            }}
          />
        )}

        {step === 2 && age !== null && (
          <>
            <StepHeading
              step={2}
              label="确认人生阶段"
              sublabel="唯一前进步骤"
              headingRef={stepHeadingRef}
            />
            <StepStageConfirm
              age={age}
              onConfirm={() => {
                const sid = ageToStageId(age);
                setConfirmedStage(sid);
                setError(null);
                setStep(3);
              }}
            />
          </>
        )}

        {step === 3 && (
          <>
            <StepHeading step={3} label="选择当前场景" headingRef={stepHeadingRef} />
            <StepScenario selected={scenarioId} onChange={setScenarioId} />
          </>
        )}

        {step === 4 && (
          <>
            <StepHeading step={4} label="选择生活维度" headingRef={stepHeadingRef} />
            <StepDimensions selected={selectedTags} onToggle={toggleTag} />
          </>
        )}

        {step === 5 && (
          <>
            <StepHeading step={5} label="勾选已完成事项" headingRef={stepHeadingRef} />
            <StepTasks
              scenarioId={scenarioId}
              completed={completedTasks}
              onToggle={toggleTask}
            />
          </>
        )}

        {step === 6 && currentInput && (
          <>
            <StepHeading step={6} label="档案校对" headingRef={stepHeadingRef} />
            <StepReview
              input={currentInput}
              loading={loading}
              error={error}
              onSubmit={handleSubmit}
              onBackToEdit={() => {
                setError(null);
                setStep(5);
              }}
            />
          </>
        )}
      </section>

      {/* Error (page-level) */}
      {error && (
        <p
          ref={errorRef}
          role="alert"
          aria-live="polite"
          className="rounded-sm border border-cinnabar/30 bg-cinnabar/5 px-3 py-2 text-xs text-cinnabar"
        >
          {error}
        </p>
      )}

      {/* Navigation (Step 1 only — Step 2 owns its forward path; Step 6 owns its own) */}
      {step === 1 && (
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => {
              if (age === null) {
                setError("请输入 0–120 之间的整数年龄，例如 36。");
                return;
              }
              if (!gender) {
                setError("请选择性别。");
                return;
              }
              setError(null);
              setStep(2);
            }}
            className="rounded-sm border border-ink bg-ink px-6 py-2.5 text-sm text-paper transition-colors hover:bg-green-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-cinnabar focus-visible:outline-offset-2"
          >
            下一步 →
          </button>
          <Link
            href="/"
            prefetch={false}
            className="font-mono text-[0.65rem] uppercase tracking-wider text-muted transition-colors hover:text-ink"
          >
            ← 返回首页
          </Link>
        </div>
      )}

      {/* Generic "Back" only on steps 3–5 (Step 2 owns its own back; Step 6 has its own buttons) */}
      {step >= 3 && step <= 5 && (
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleBack}
            className="rounded-sm border border-rule px-4 py-2 text-sm text-muted transition-colors hover:border-muted hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-cinnabar focus-visible:outline-offset-2"
          >
            ← 上一步
          </button>
          {step === 5 && (
            <button
              type="button"
              onClick={() => {
                setError(null);
                setStep(6);
              }}
              className="rounded-sm border border-ink bg-ink px-6 py-2 text-sm text-paper transition-colors hover:bg-green-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-cinnabar focus-visible:outline-offset-2"
            >
              进入校对 →
            </button>
          )}
        </div>
      )}
    </div>
  );
}
