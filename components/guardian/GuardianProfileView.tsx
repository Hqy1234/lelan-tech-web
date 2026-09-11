/**
 * LELAN TECHNOLOGY · Guardian Profile View — Life Archive Page
 *
 * Phase 1E.3-A — Personal archive, NOT dashboard.
 *
 * Visual hierarchy:
 *   1. Archive Cover + GuardianSeal (top)
 *   2. Current coordinate (stage · scenario · current task · progress)
 *   3. Current tasks (process chain)
 *   4. Five-dimension archive band
 *   5. Timeline (lower visual weight)
 *   6. Method (collapsed disclosure)
 *
 * Archive ID is demoted to a small side-annotation — must not
 * out-shout the user's actual stage / scenario / current task.
 *
 * Spatial layers:
 *   0: paper background
 *   1: archive cover plane (paper-pure, with archive corners)
 *   2: coordinate content
 *   3: GuardianSeal (slight overhang of archive edge on desktop)
 *   4: small annotations
 *
 * "use client" only because the parent page reads sessionStorage and
 * the consumer needs to react to profile data with image rendering.
 */
"use client";

import {
  guardianStages,
  type GuardianProfile,
  type GuardianProfileTask,
  type GuardianProfileElement,
  type GuardianProfileTimelineEvent,
} from "@/content/guardian";
import { GuardianSeal } from "./GuardianSeal";
import { GuardianElementsBand } from "./GuardianElements";

const STATUS_LABELS = {
  normal: "已记录",
  attention: "持续关注",
  current: "当前事项",
  planned: "待完善",
} as const;

/* ── Status tone for non-color-only rendering ───────────────────── */
const STATUS_LABEL_TO_TONE: Record<string, string> = {
  normal: "bg-rule/60 text-muted",
  attention: "bg-cinnabar/10 text-cinnabar border border-cinnabar/20",
  current: "bg-green/10 text-green border border-green/20",
  planned: "bg-ink/5 text-muted border border-rule",
};

const TASK_STATUS_LABEL: Record<string, string> = {
  done: "已完成",
  current: "当前",
  upcoming: "待办",
};

const TIMELINE_STATUS_STYLE: Record<string, string> = {
  recorded: "border-green/40 bg-green/5 text-green",
  attention: "border-cinnabar/40 bg-cinnabar/5 text-cinnabar",
  planned: "border-rule bg-paper-pure text-muted",
};

const TIMELINE_STATUS_LABEL: Record<string, string> = {
  recorded: "已归档",
  attention: "进行中",
  planned: "计划中",
};

/* ── Task node ──────────────────────────────────────────────── */
function TaskNode({ task, index }: { task: GuardianProfileTask; index: number }) {
  const done = task.status === "done";
  const current = task.status === "current";
  return (
    <li className="flex flex-1 flex-col items-center gap-1.5">
      <span
        aria-hidden
        className={[
          "relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 font-mono text-[0.65rem] transition-colors",
          done
            ? "border-green bg-green text-paper"
            : current
            ? "border-ink bg-paper text-ink ring-2 ring-ink/20"
            : "border-rule bg-paper text-muted",
        ].join(" ")}
      >
        {done ? "✓" : index + 1}
      </span>
      <span
        className={[
          "max-w-[5rem] text-center text-[0.7rem] leading-tight sm:max-w-[6rem]",
          done ? "text-ink/70" : current ? "font-medium text-ink" : "text-muted",
        ].join(" ")}
      >
        {task.label}
      </span>
      <span
        className={[
          "rounded-sm px-1.5 py-0.5 font-mono text-[0.55rem] uppercase tracking-wider",
          done
            ? "bg-green/10 text-green"
            : current
            ? "bg-ink text-paper"
            : "bg-rule/50 text-muted",
        ].join(" ")}
        aria-label={`状态：${TASK_STATUS_LABEL[task.status]}`}
      >
        {TASK_STATUS_LABEL[task.status]}
      </span>
    </li>
  );
}

function TaskConnector({ done }: { done: boolean }) {
  return (
    <span
      aria-hidden
      className={[
        "mb-7 mt-1 inline-block h-px flex-1 bg-rule sm:mb-9",
        done ? "bg-green" : "",
      ].join(" ")}
      style={{ minWidth: "16px" }}
    />
  );
}

function TimelineItem({ event }: { event: GuardianProfileTimelineEvent }) {
  return (
    <li className="flex items-start gap-3">
      <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-rule" aria-hidden />
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[0.65rem] text-muted/80">{event.date}</span>
          <span
            className={[
              "rounded-sm px-1.5 py-0.5 font-mono text-[0.6rem] uppercase tracking-wider",
              TIMELINE_STATUS_STYLE[event.status],
            ].join(" ")}
          >
            {TIMELINE_STATUS_LABEL[event.status]}
          </span>
        </div>
        <p className="mt-0.5 text-sm text-ink/90">{event.label}</p>
      </div>
    </li>
  );
}

export function GuardianProfileView({ profile }: { profile: GuardianProfile }) {
  const allStages = guardianStages;
  const activeIdx = allStages.findIndex((s) => s.id === profile.stage.id);
  const elements: GuardianProfileElement[] = profile.elements;

  return (
    <div className="flex flex-col gap-10">
      {/* ── 1. Archive cover (paper-pure plane) + Seal ───────────── */}
      <header className="lelan-perspective relative">
        <div className="lelan-corner lelan-depth-2 lelan-bg-l1 lelan-contact-shadow-2 relative rounded-sm border border-rule p-5 sm:p-7">
          {/* Archive marker — small, top-right, demoted */}
          <p className="lelan-archive-id absolute right-3 top-3 sm:right-5 sm:top-5">
            ARCHIVE · {profile.archiveRef}
          </p>

          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-7">
            {/* Seal — primary identity mark */}
            <div className="shrink-0 sm:-mt-2">
              <GuardianSeal
                state="complete"
                size="lg"
                profile={profile}
                caption="档案示例"
              />
            </div>

            {/* Identity + current coordinate */}
            <div className="min-w-0 flex-1">
              <p className="font-mono text-[0.65rem] uppercase tracking-wider text-muted">
                我的守护符
              </p>
              <h1 className="lede mt-1 text-2xl font-medium text-ink sm:text-3xl">
                {profile.identity.age} 岁 {profile.identity.genderLabel}
              </h1>
              <p className="mt-2 font-serif text-base text-muted">
                {profile.stage.trigram} · {profile.stage.name}
                <span className="ml-2 font-mono text-xs text-muted/80">
                  {profile.stage.ageRange}
                </span>
              </p>
              <p className="mt-1 text-xs text-muted/80">{profile.stage.theme}</p>

              {profile.scenario && (
                <p className="mt-3 inline-flex items-center gap-2 rounded-sm border border-rule bg-paper px-2 py-1 font-mono text-xs text-muted">
                  <span aria-hidden>·</span>
                  场景：{profile.scenario.name}
                </p>
              )}

              {/* Progress — completion X / Y, text-led */}
              <p className="mt-3 font-mono text-sm text-ink">
                完成&nbsp;
                <span className="font-serif text-base text-green">
                  {profile.progress.completed}
                </span>
                &nbsp;/&nbsp;{profile.progress.total}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* ── 2. Current coordinate — task rail (process chain) ──── */}
      <section aria-label="当前事项" className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[0.65rem] uppercase tracking-wider text-muted">
            当前事项 · 坐标流程
          </span>
          <span className="h-px flex-1 bg-rule" aria-hidden />
          <span className="font-mono text-[0.6rem] uppercase tracking-wider text-muted/70">
            X · 流程
          </span>
        </div>

        <div className="rounded-sm border border-rule bg-paper-pure p-5 sm:p-6">
          {/* Desktop: horizontal process chain */}
          <ol className="hidden items-start sm:flex" aria-label="任务流程">
            {profile.tasks.map((task, idx) => (
              <div key={task.id} className="flex flex-1 items-start">
                <TaskNode task={task} index={idx} />
                {idx < profile.tasks.length - 1 && (
                  <TaskConnector done={task.status === "done"} />
                )}
              </div>
            ))}
          </ol>

          {/* Progress bar (text-led, not color-only) */}
          <div className="mt-5 flex items-center gap-3 rounded-sm border border-rule bg-paper p-3">
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-rule">
              <div
                className="h-full rounded-full bg-green transition-all"
                style={{
                  width: `${Math.round((profile.progress.completed / profile.progress.total) * 100)}%`,
                }}
                aria-hidden
              />
            </div>
            <span className="shrink-0 font-mono text-xs text-muted">
              完成&nbsp;{profile.progress.completed}&nbsp;/&nbsp;{profile.progress.total}
            </span>
          </div>

          {/* Mobile: vertical list with explicit status labels */}
          <ol className="flex flex-col gap-2 sm:hidden" aria-label="任务清单（移动）">
            {profile.tasks.map((task, idx) => (
              <li
                key={task.id}
                className={[
                  "flex items-center gap-3 rounded-sm border px-3 py-2 text-xs",
                  task.status === "done"
                    ? "border-green/30 bg-green/5 text-ink/80"
                    : task.status === "current"
                    ? "border-ink/20 bg-paper text-ink"
                    : "border-rule text-muted",
                ].join(" ")}
              >
                <span
                  className={[
                    "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border font-mono text-[0.6rem]",
                    task.status === "done"
                      ? "border-green bg-green text-paper"
                      : task.status === "current"
                      ? "border-ink bg-ink text-paper"
                      : "border-rule text-muted",
                  ].join(" ")}
                  aria-hidden
                >
                  {task.status === "done" ? "✓" : idx + 1}
                </span>
                <span className="flex-1">{task.label}</span>
                <span
                  className={[
                    "rounded-sm px-1.5 py-0.5 font-mono text-[0.55rem] uppercase tracking-wider",
                    task.status === "done"
                      ? "bg-green/10 text-green"
                      : task.status === "current"
                      ? "bg-ink text-paper"
                      : "bg-rule/50 text-muted",
                  ].join(" ")}
                >
                  {TASK_STATUS_LABEL[task.status]}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── 3. Five Elements archive band (shared with homepage) ─ */}
      <section aria-label="五行档案" className="flex flex-col gap-3">
        <GuardianElementsBand
          elements={elements.map((el) => ({
            element: el.element,
            dimension: el.dimension,
            description: el.description,
            status: STATUS_LABELS[el.status],
            notice: el.notice,
            assetId: el.assetId,
          }))}
        />
      </section>

      {/* ── 4. Archive timeline (lower visual weight) ───────────── */}
      <section aria-label="档案时间线" className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[0.65rem] uppercase tracking-wider text-muted">
            档案时间线
          </span>
          <span className="h-px flex-1 bg-rule" aria-hidden />
          <span className="font-mono text-[0.6rem] uppercase tracking-wider text-muted/60">
            模拟记录
          </span>
        </div>
        <div className="rounded-sm border border-rule bg-paper-pure p-4">
          <ul className="flex flex-col gap-3">
            {profile.timeline.map((event, idx) => (
              <TimelineItem key={idx} event={event} />
            ))}
          </ul>
        </div>
      </section>

      {/* ── 5. Method — collapsed disclosure ─────────────────────── */}
      <details className="group rounded-sm border border-rule">
        <summary className="flex cursor-pointer items-center gap-3 bg-paper px-4 py-3 text-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-cinnabar focus-visible:outline-offset-2">
          <span className="font-mono text-[0.65rem] uppercase tracking-wider">
            坐标背后的方法
          </span>
          <span className="h-px flex-1 bg-rule" aria-hidden />
          <span className="font-mono text-[0.6rem] uppercase tracking-wider text-muted/60 group-open:hidden">
            展开
          </span>
          <span className="hidden font-mono text-[0.6rem] uppercase tracking-wider text-muted/60 group-open:block">
            收起
          </span>
        </summary>
        <div className="border-t border-rule bg-paper-pure p-4 sm:p-6">
          <ol className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-5">
            {profile.methodSteps.map((step) => (
              <li key={step.id} className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-sm border border-rule font-mono text-[0.6rem] text-muted">
                    {step.order}
                  </span>
                  <span className="font-serif text-sm text-ink">{step.name}</span>
                </div>
                <p className="ml-7 font-mono text-[0.6rem] uppercase tracking-wider text-muted">
                  {step.phase}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-muted">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </details>

      {/* Demo disclaimer */}
      <p className="text-xs text-muted/60">
        本页面展示内容均为虚构演示数据，不代表真实用户、医学判断、投资建议或法律意见。
      </p>

      {/* Hint about activeIdx — keeps lint happy if not used elsewhere */}
      <span hidden aria-hidden>{activeIdx}</span>
    </div>
  );
}
