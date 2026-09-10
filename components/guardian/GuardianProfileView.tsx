/**
 * LELAN TECHNOLOGY · Guardian Profile View
 *
 * Phase 1D-G2 — Personal Life Archive Demo UI.
 *
 * Renders a GuardianProfile contract.
 * Used by /profile page for demo personas.
 *
 * Future: same component renders real user data from Dify/API adapter.
 *
 * Layout:
 *   1. Archive header (ref + identity)
 *   2. My Guardian Coordinate (8-stage rail, locked to profile stage)
 *   3. Current tasks (task rail)
 *   4. Five-element dashboard
 *   5. Archive timeline
 *   6. Method steps (collapsed)
 *
 * NOT a dashboard — looks like a life archive product.
 */
"use client";

import Image from "next/image";
import { guardianStages } from "@/content/guardian";
import { visualAssets } from "@/content/assets";
import type {
  GuardianProfile,
  GuardianProfileTask,
  GuardianProfileElement,
  GuardianProfileTimelineEvent,
  ElementStatus,
} from "@/content/guardian";

function resolveAsset(id: string) {
  return (visualAssets as Record<string, { src: string; alt: string }>)[id] ?? null;
}

/* ── Status badge ─────────────────────────────────────────────── */
const STATUS_LABELS: Record<ElementStatus, string> = {
  normal: "已记录",
  attention: "持续关注",
  current: "当前事项",
  planned: "待完善",
};

const STATUS_TONE: Record<ElementStatus, string> = {
  normal: "bg-rule/60 text-muted",
  attention: "bg-cinnabar/10 text-cinnabar border border-cinnabar/20",
  current: "bg-green/10 text-green border border-green/20",
  planned: "bg-ink/5 text-muted border border-rule",
};

/* ── Task node ───────────────────────────────────────────────── */
function TaskNode({ task, index }: { task: GuardianProfileTask; index: number }) {
  const done = task.status === "done";
  const current = task.status === "current";
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        className={[
          "relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 font-mono text-[0.6rem] transition-colors",
          done
            ? "border-green bg-green text-paper"
            : current
            ? "border-ink bg-paper text-ink ring-2 ring-ink/20"
            : "border-rule bg-paper text-muted",
        ].join(" ")}
        aria-hidden
      >
        {done ? "✓" : index + 1}
      </div>
      <span
        className={[
          "max-w-20 text-center text-xs leading-tight",
          done ? "text-ink/70" : current ? "text-ink font-medium" : "text-muted",
        ].join(" ")}
      >
        {task.label}
      </span>
    </div>
  );
}

/* ── Task connector ──────────────────────────────────────────── */
function TaskConnector({ done }: { done: boolean }) {
  return (
    <span
      aria-hidden
      className={[
        "mb-6 mt-1 inline-block h-px flex-1 bg-rule",
        done ? "bg-green" : "",
      ].join(" ")}
      style={{ minWidth: "16px" }}
    />
  );
}

/* ── Five-element card ───────────────────────────────────────── */
function ElementCard({ el }: { el: GuardianProfileElement }) {
  const asset = resolveAsset(el.assetId);
  return (
    <div className="flex flex-col gap-2 rounded-sm border border-rule bg-paper p-3">
      <div className="flex items-center gap-2">
        <span className="font-serif text-base font-medium text-ink">{el.element}</span>
        <span className="font-serif text-sm text-muted">{el.dimension}</span>
        <span
          className={[
            "ml-auto rounded-sm px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-wider",
            STATUS_TONE[el.status],
          ].join(" ")}
        >
          {STATUS_LABELS[el.status]}
        </span>
      </div>
      <p className="text-xs text-muted">{el.description}</p>
      <p className="mt-1 text-xs leading-relaxed text-ink">{el.notice}</p>
      {asset && (
        <div className="relative mt-auto h-14 w-full overflow-hidden rounded-sm pt-1" aria-hidden>
          <Image
            src={asset.src}
            alt={asset.alt}
            fill
            sizes="(max-width: 640px) 20vw, 10vw"
            className="object-cover opacity-70"
          />
        </div>
      )}
    </div>
  );
}

/* ── Timeline event ──────────────────────────────────────────── */
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

function TimelineItem({ event }: { event: GuardianProfileTimelineEvent }) {
  return (
    <li className="flex items-start gap-3">
      <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-rule" aria-hidden />
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[0.6rem] text-muted/70">{event.date}</span>
          <span
            className={[
              "rounded-sm px-1.5 py-0.5 font-mono text-[0.55rem] uppercase tracking-wider",
              TIMELINE_STATUS_STYLE[event.status],
            ].join(" ")}
          >
            {TIMELINE_STATUS_LABEL[event.status]}
          </span>
        </div>
        <p className="mt-0.5 text-sm text-ink">{event.label}</p>
      </div>
    </li>
  );
}

/* ── Main profile view ──────────────────────────────────────── */
export function GuardianProfileView({ profile }: { profile: GuardianProfile }) {
  return (
    <div className="flex flex-col gap-8">
      {/* ── Archive header ─────────────────────────────────── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="font-mono text-[0.6rem] uppercase tracking-wider text-muted">
            人生档案编号
          </p>
          <p className="mt-1 font-serif text-xl font-medium text-ink sm:text-2xl">
            {profile.archiveRef}
          </p>
          <p className="mt-0.5 inline-flex items-center gap-1.5 rounded-sm border border-cinnabar/30 bg-cinnabar/5 px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-wider text-cinnabar">
            演示档案
          </p>
        </div>
        <div className="flex flex-col gap-1 sm:items-end">
          <p className="font-mono text-[0.6rem] uppercase tracking-wider text-muted">
            个人概况
          </p>
          <p className="text-lg text-ink">
            {profile.identity.age} 岁 {profile.identity.genderLabel}
          </p>
          <p className="font-serif text-base text-muted">
            {profile.stage.trigram} · {profile.stage.name}
          </p>
          <p className="mt-1 text-xs text-muted">{profile.stage.theme}</p>
        </div>
      </div>

      {/* ── My Guardian Coordinate ─────────────────────────── */}
      <div className="rounded-sm border border-rule bg-paper-pure p-4 sm:p-6">
        <div className="mb-4 flex items-center gap-3">
          <span className="font-mono text-[0.65rem] uppercase tracking-wider text-muted">
            我的守护符 · 人生坐标
          </span>
          <span className="h-px flex-1 bg-rule" aria-hidden />
        </div>

        {/* 8-stage rail — user's stage is locked */}
        <div className="mb-4 flex flex-wrap gap-2 sm:justify-center">
          {guardianStages.map((stage) => {
            const isActive = stage.id === profile.stage.id;
            const asset = resolveAsset(stage.stageAssetId);
            return (
              <div
                key={stage.id}
                className={[
                  "flex flex-col items-center gap-1 rounded-sm p-2 transition-all",
                  isActive
                    ? "bg-green/10 border border-green/30"
                    : "opacity-50",
                ].join(" ")}
              >
                <span
                  className={[
                    "flex h-7 w-7 items-center justify-center rounded-full border font-serif text-xs",
                    isActive ? "border-green bg-green text-paper" : "border-rule text-muted",
                  ].join(" ")}
                  aria-hidden
                >
                  {stage.trigram}
                </span>
                {asset && (
                  <div className="relative h-8 w-8 overflow-hidden rounded-sm" aria-hidden>
                    <Image
                      src={asset.src}
                      alt={asset.alt}
                      fill
                      sizes="32px"
                      className="object-cover"
                    />
                  </div>
                )}
                <span className="font-mono text-[0.55rem] text-muted">{stage.name}</span>
              </div>
            );
          })}
        </div>

        {/* Scenario label */}
        {profile.scenario && (
          <p className="text-xs text-muted">
            场景：{profile.scenario.name}
          </p>
        )}
      </div>

      {/* ── Current tasks ───────────────────────────────────── */}
      <div className="rounded-sm border border-rule bg-paper-pure p-4 sm:p-6">
        <div className="mb-4 flex items-center gap-3">
          <span className="font-mono text-[0.65rem] uppercase tracking-wider text-muted">
            当前事项
          </span>
          <span className="h-px flex-1 bg-rule" aria-hidden />
        </div>

        {/* Desktop: horizontal chain */}
        <div className="hidden flex-col gap-3 sm:flex">
          <div className="flex items-start">
            {profile.tasks.map((task, idx) => (
              <div key={task.id} className="flex items-start">
                <TaskNode task={task} index={idx} />
                {idx < profile.tasks.length - 1 && (
                  <TaskConnector done={task.status === "done"} />
                )}
              </div>
            ))}
          </div>
          {/* Progress bar */}
          <div className="flex items-center gap-3 rounded-sm border border-rule bg-paper p-3">
            <div className="h-1 flex-1 overflow-hidden rounded-full bg-rule">
              <div
                className="h-full rounded-full bg-green transition-all"
                style={{
                  width: `${Math.round((profile.progress.completed / profile.progress.total) * 100)}%`,
                }}
              />
            </div>
            <span className="shrink-0 font-mono text-xs text-muted">
              {profile.progress.completed}&nbsp;/&nbsp;{profile.progress.total}
            </span>
          </div>
        </div>

        {/* Mobile: vertical list */}
        <ol className="flex flex-col gap-2 sm:hidden" aria-label="任务清单">
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
                    : "border-rule text-muted",
                ].join(" ")}
                aria-hidden
              >
                {task.status === "done" ? "✓" : idx + 1}
              </span>
              <span>{task.label}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* ── Five-element dashboard ──────────────────────────── */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[0.65rem] uppercase tracking-wider text-muted">
            五行生活守护
          </span>
          <span className="h-px flex-1 bg-rule" aria-hidden />
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-5">
          {profile.elements.map((el) => (
            <ElementCard key={el.id} el={el} />
          ))}
        </div>
      </div>

      {/* ── Archive timeline ───────────────────────────────── */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[0.65rem] uppercase tracking-wider text-muted">
            人生档案时间线
          </span>
          <span className="h-px flex-1 bg-rule" aria-hidden />
        </div>
        <div className="rounded-sm border border-rule bg-paper-pure p-4">
          <p className="mb-4 text-xs text-muted">模拟档案记录</p>
          <ul className="flex flex-col gap-4" aria-label="人生档案时间线">
            {profile.timeline.map((event, idx) => (
              <TimelineItem key={idx} event={event} />
            ))}
          </ul>
        </div>
      </div>

      {/* ── Method steps (collapsed) ───────────────────────── */}
      <details className="group rounded-sm border border-rule">
        <summary className="flex cursor-pointer items-center gap-3 bg-paper px-4 py-3 text-muted">
          <span className="font-mono text-[0.65rem] uppercase tracking-wider">
            坐标背后的方法
          </span>
          <span className="h-px flex-1 bg-rule" aria-hidden />
          <span className="font-mono text-[0.6rem] uppercase tracking-wider text-muted/60 group-open:hidden">
            展开
          </span>
          <span className="font-mono text-[0.6rem] uppercase tracking-wider text-muted/60 hidden group-open:block">
            收起
          </span>
        </summary>
        <div className="border-t border-rule bg-paper-pure p-4 sm:p-6">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-5">
            {profile.methodSteps.map((step) => (
              <div key={step.id} className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-sm border border-rule font-mono text-[0.6rem] text-muted">
                    {step.order}
                  </span>
                  <dt className="font-serif text-sm text-ink">{step.name}</dt>
                </div>
                <dd className="ml-7 font-mono text-[0.6rem] uppercase tracking-wider text-muted">
                  {step.phase}
                </dd>
                <dd className="mt-1 text-xs leading-relaxed text-muted">
                  {step.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </details>

      {/* Demo disclaimer */}
      <p className="text-xs text-muted/50">
        本页面展示内容均为虚构演示数据，不代表真实用户、医学判断、投资建议或法律意见。
      </p>
    </div>
  );
}
