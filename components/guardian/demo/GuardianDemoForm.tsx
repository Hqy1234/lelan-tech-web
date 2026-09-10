/**
 * LELAN TECHNOLOGY · Guardian Demo Form
 *
 * Phase 1E — Multi-step Life Archive Demo Form.
 *
 * 6 steps:
 *   01 基础信息  (age, gender, city)
 *   02 人生阶段  (stage confirmation)
 *   03 当前场景  (scenario selection)
 *   04 生活维度  (multi-select dimension tags)
 *   05 当前事项  (task completion checklist)
 *   06 确认       (review + generate)
 *
 * Client component — manages own step state.
 * Calls mock-adapter on submit.
 *
 * NOT a medical/health questionnaire.
 * NOT a financial KYC form.
 * NOT a dashboard.
 */
"use client";

import { useState, useCallback, useRef } from "react";
import {
  GUARDIAN_SCENARIOS,
  DIMENSION_TAGS,
  guardianStages,
  type GuardianStageId,
  type GuardianScenarioId,
  type GuardianDimensionTagId,
  ageToStageId,
} from "@/content/guardian";
import {
  createGuardianDemoProfile,
  setGeneratedProfile,
} from "@/lib/guardian/mock-adapter";
import {
  type GuardianDemoInput,
} from "@/content/guardian";

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
  "确认",
] as const;

/* ========================================================================
   Sub-components
   ======================================================================== */

/** Progress bar */
function ProgressBar({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-3">
      {STEP_LABELS.map((label, idx) => {
        const num = idx + 1;
        const done = num < current;
        const active = num === current;
        return (
          <div key={label} className="flex items-center gap-3">
            <div
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-sm border font-mono text-[0.65rem] transition-colors ${
                done
                  ? "border-green bg-green text-paper"
                  : active
                  ? "border-ink bg-ink text-paper"
                  : "border-rule bg-paper text-muted"
              }`}
            >
              {done ? "✓" : String(num).padStart(2, "0")}
            </div>
            <span
              className={`hidden text-xs font-medium sm:block ${
                active ? "text-ink" : "text-muted"
              }`}
            >
              {label}
            </span>
            {idx < STEP_LABELS.length - 1 && (
              <div
                className={`h-px w-4 sm:w-8 ${
                  done ? "bg-green" : "bg-rule"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

/** Step heading */
function StepHeading({ step, label }: { step: number; label: string }) {
  return (
    <div className="mb-6">
      <p className="font-mono text-[0.65rem] uppercase tracking-wider text-muted">
        {String(step).padStart(2, "0")} / {String(TOTAL_STEPS).padStart(2, "0")}
      </p>
      <h2 className="mt-1 font-serif text-xl text-ink sm:text-2xl">{label}</h2>
    </div>
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
      <StepHeading step={1} label="基础信息" />

      {/* Age */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="age" className="font-mono text-[0.65rem] uppercase tracking-wider text-muted">
          年龄 <span className="text-cinnabar">*</span>
        </label>
        <input
          id="age"
          type="number"
          min={0}
          max={120}
          placeholder="请输入年龄"
          value={data.age}
          onChange={(e) => onChange({ ...data, age: e.target.value })}
          className="w-full rounded-sm border border-rule bg-paper px-4 py-2.5 text-sm text-ink placeholder:text-muted/50 focus:border-green focus:outline-none focus:ring-1 focus:ring-green"
          aria-required="true"
        />
      </div>

      {/* Gender */}
      <fieldset className="flex flex-col gap-2">
        <legend className="font-mono text-[0.65rem] uppercase tracking-wider text-muted">
          性别 <span className="text-cinnabar">*</span>
        </legend>
        <div className="flex gap-4">
          {(["male", "female"] as const).map((g) => (
            <label
              key={g}
              className="relative flex cursor-pointer items-center gap-2 overflow-hidden rounded-sm border px-4 py-2.5 text-sm transition-colors has-[:checked]:border-green has-[:checked]:bg-green/5 has-[:checked]:text-green"
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
      <StepHeading step={2} label="人生阶段" />

      <p className="text-sm text-muted">
        根据年龄 <strong className="text-ink">{age}</strong>{" "}
        岁，系统建议以下人生阶段：
      </p>

      {/* Stage rail */}
      <div className="flex flex-wrap gap-2">
        {guardianStages.map((s) => (
          <div
            key={s.id}
            className={`flex flex-col items-center rounded-sm border px-4 py-3 text-center transition-colors ${
              s.id === suggestedId
                ? "border-green bg-green/5 text-green"
                : "border-rule text-muted"
            }`}
          >
            <span className="font-serif text-base">{s.trigram}</span>
            <span className="mt-1 font-mono text-[0.6rem]">{s.name}</span>
            <span className="mt-0.5 font-mono text-[0.55rem] opacity-70">
              {s.ageRange}
            </span>
          </div>
        ))}
      </div>

      {/* Suggested stage */}
      <div className="rounded-sm border border-green/30 bg-green/5 p-4">
        <p className="font-serif text-base text-green">
          {stage.trigram} · {stage.name}
        </p>
        <p className="mt-1 font-mono text-[0.65rem] text-muted">
          {stage.ageRange} · {stage.sceneLabel}
        </p>
        <p className="mt-3 text-xs text-muted">
          请确认此阶段是否与您当前人生阶段一致。
        </p>
      </div>

      <button
        type="button"
        onClick={onConfirm}
        className="rounded-sm border border-ink bg-ink px-6 py-2.5 text-sm text-paper transition-colors hover:bg-green-dark"
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
      <StepHeading step={3} label="当前场景" />

      <p className="text-sm text-muted">
        选择当前最想整理的生活场景：
      </p>

      <fieldset className="flex flex-col gap-3">
        <legend className="sr-only">选择场景</legend>
        {GUARDIAN_SCENARIOS.map((sc) => (
          <label
            key={sc.id}
            className="flex cursor-pointer items-start gap-3 rounded-sm border px-4 py-3 text-sm transition-colors has-[:checked]:border-green has-[:checked]:bg-green/5 has-[:checked]:text-green"
          >
            <input
              type="radio"
              name="scenario"
              value={sc.id}
              checked={selected === sc.id}
              onChange={() => onChange(sc.id)}
              className="mt-0.5 shrink-0"
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

const DIMENSION_COLS: Array<{ dimId: string; element: string; name: string; tags: typeof DIMENSION_TAGS }> = [
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
      <StepHeading step={4} label="生活维度" />

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
                    className={`relative flex cursor-pointer items-center gap-1.5 overflow-hidden rounded-sm border px-2.5 py-1.5 text-xs transition-colors ${
                      checked
                        ? "border-green bg-green/10 text-green"
                        : "border-rule text-muted hover:border-muted"
                    }`}
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
          暂不选择生活维度仍可生成档案。
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
      <StepHeading step={5} label="当前事项" />

      <p className="text-sm text-muted">
        请勾选已完成的事项（已完成的排在前面）：
      </p>

      <fieldset className="flex flex-col gap-2">
        <legend className="sr-only">选择已完成事项</legend>
        {scenario.tasks.map((task) => {
          const checked = completed.has(task.id);
          return (
            <label
              key={task.id}
              className="flex cursor-pointer items-center gap-3 rounded-sm border px-4 py-3 text-sm transition-colors has-[:checked]:border-green has-[:checked]:bg-green/5 has-[:checked]:text-green"
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => onToggle(task.id)}
                className="h-4 w-4 accent-green"
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
}: {
  input: GuardianDemoInput;
  loading: boolean;
  error: string | null;
  onSubmit: () => void;
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
      <StepHeading step={6} label="确认档案" />

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
        <p role="alert" className="rounded-sm border border-cinnabar/30 bg-cinnabar/5 px-3 py-2 text-xs text-cinnabar">
          {error}
        </p>
      )}

      <p className="text-xs text-muted">
        Demo 数据仅用于当前浏览器中的产品体验。
      </p>

      <button
        type="button"
        onClick={onSubmit}
        disabled={loading}
        className="rounded-sm border border-ink bg-ink px-6 py-2.5 text-sm text-paper transition-colors hover:bg-green-dark disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "正在整理人生档案…" : "生成我的人生档案"}
      </button>
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

  // Step 1 data
  const [ageStr, setAgeStr] = useState("");
  const [gender, setGender] = useState<"" | "male" | "female">("");
  const [city, setCity] = useState("");

  // Step 2: auto-advance after confirm
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

  // Derived
  const age = parseInt(ageStr, 10);
  const ageValid = !isNaN(age) && age >= 0 && age <= 120;

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
    setStep((s) => Math.max(1, s - 1));
    setError(null);
  }, []);

  // Next
  const handleNext = useCallback(() => {
    if (step === 1) {
      if (!ageValid) { setError("请输入 0–120 之间的年龄。"); return; }
      if (!gender) { setError("请选择性别。"); return; }
    }
    setError(null);
    setStep((s) => Math.min(TOTAL_STEPS, s + 1));
  }, [step, ageValid, gender]);

  // Submit
  const handleSubmit = useCallback(async () => {
    if (!confirmedStage || !gender) return;

    const input: GuardianDemoInput = {
      version: "guardian-demo-v1",
      identity: {
        age,
        gender: gender as "male" | "female",
        city: city || undefined,
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
          setStep(2); // Go back to stage confirmation
        }
      } else {
        setGeneratedProfile(result);
        // Navigate to profile
        window.location.href = "/profile";
      }
    } catch {
      setError("生成过程中出现错误，请重试。");
    } finally {
      setLoading(false);
    }
  }, [confirmedStage, age, gender, city, scenarioId, completedTasks, selectedTags]);

  return (
    <div className="mx-auto max-w-xl">
      {/* Progress */}
      <div className="mb-8 overflow-x-auto pb-2">
        <ProgressBar current={step} />
      </div>

      {/* Step content */}
      <div className="mb-8">
        {step === 1 && (
          <StepBasicInfo
            data={{ age: ageStr, gender, city }}
            onChange={(d) => {
              setAgeStr(d.age);
              setGender(d.gender);
              setCity(d.city);
            }}
          />
        )}

        {step === 2 && ageValid && (
          <StepStageConfirm
            age={age}
            onConfirm={() => {
              const sid = ageToStageId(age);
              setConfirmedStage(sid);
              setStep(3);
            }}
          />
        )}

        {step === 3 && (
          <StepScenario selected={scenarioId} onChange={setScenarioId} />
        )}

        {step === 4 && (
          <StepDimensions
            selected={selectedTags}
            onToggle={toggleTag}
          />
        )}

        {step === 5 && (
          <StepTasks
            scenarioId={scenarioId}
            completed={completedTasks}
            onToggle={toggleTask}
          />
        )}

        {step === 6 && confirmedStage && (
          <StepReview
            input={{
              version: "guardian-demo-v1",
              identity: { age, gender: gender as "male" | "female", city: city || undefined },
              stage: { id: confirmedStage },
              scenario: { id: scenarioId },
              completedTaskIds: [...completedTasks],
              selectedDimensionTags: [...selectedTags],
            }}
            loading={loading}
            error={error}
            onSubmit={handleSubmit}
          />
        )}
      </div>

      {/* Error */}
      {error && (
        <p ref={errorRef} role="alert" className="mb-4 rounded-sm border border-cinnabar/30 bg-cinnabar/5 px-3 py-2 text-xs text-cinnabar">
          {error}
        </p>
      )}

      {/* Navigation buttons */}
      {step < TOTAL_STEPS && (
        <div className="flex items-center gap-3">
          {step > 1 && (
            <button
              type="button"
              onClick={handleBack}
              className="rounded-sm border border-rule px-4 py-2 text-sm text-muted transition-colors hover:border-muted hover:text-ink"
            >
              ← 上一步
            </button>
          )}
          <button
            type="button"
            onClick={handleNext}
            className="rounded-sm border border-ink bg-ink px-6 py-2 text-sm text-paper transition-colors hover:bg-green-dark"
          >
            {step === 5 ? "确认并生成" : "下一步 →"}
          </button>
        </div>
      )}
    </div>
  );
}
