/**
 * LELAN TECHNOLOGY · Guardian Task Flow
 *
 * Phase 2 — Shows the active stage's example task chain.
 *
 * Desktop: horizontal node chain with progress line.
 * Mobile: vertical step list.
 *
 * Demo-only: not real user progress.
 */
"use client";

import type { GuardianStage } from "@/content/guardian";

interface GuardianTaskFlowProps {
  /** The currently selected stage */
  stage: GuardianStage;
}

function TaskNode({
  label,
  done,
  index,
}: {
  label: string;
  done: boolean;
  index: number;
}) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      {/* Node circle */}
      <div
        className={[
          "relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 font-mono text-[0.6rem] transition-colors",
          done
            ? "border-green bg-green text-paper"
            : "border-rule bg-paper text-muted",
        ].join(" ")}
        aria-hidden
      >
        {done ? (
          <span aria-hidden>✓</span>
        ) : (
          <span aria-hidden>{index + 1}</span>
        )}
      </div>

      {/* Task label */}
      <span
        className={[
          "max-w-16 text-center text-xs leading-tight sm:max-w-20",
          done ? "text-ink/80" : "text-muted",
        ].join(" ")}
      >
        {label}
      </span>
    </div>
  );
}

function TaskConnector({ done }: { done: boolean }) {
  return (
    <span
      aria-hidden
      className={[
        "mb-5 mt-1 inline-block h-px flex-1 bg-rule sm:mb-6",
        done ? "bg-green" : "bg-rule",
      ].join(" ")}
      style={{ minWidth: "16px" }}
    />
  );
}

export function GuardianTaskFlow({ stage }: GuardianTaskFlowProps) {
  const tasks = stage.exampleTasks;
  const doneCount = stage.demoDoneCount;
  const total = tasks.length;
  // Desktop: horizontal chain; Mobile: vertical list

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <span className="font-mono text-[0.65rem] uppercase tracking-wider text-muted">
          人生坐标 · 横轴
        </span>
        <span className="h-px flex-1 bg-rule" aria-hidden />
      </div>

      {/* Scene label */}
      <p className="text-xs text-muted">
        {stage.sceneLabel}
      </p>

      {/* Desktop: horizontal task chain */}
      <div className="hidden flex-col gap-3 sm:flex">
        <div className="flex items-start">
          {tasks.map((task, idx) => (
            <div key={idx} className="flex items-start">
              <TaskNode
                label={task.label}
                done={doneCount > idx}
                index={idx}
              />
              {idx < tasks.length - 1 && (
                <TaskConnector done={doneCount > idx} />
              )}
            </div>
          ))}
        </div>

        {/* Progress indicator */}
        <div className="flex items-center gap-3 rounded-sm border border-rule bg-paper p-3">
          <div className="flex-1">
            <div className="h-1 overflow-hidden rounded-full bg-rule">
              <div
                className="h-full rounded-full bg-green transition-all"
                style={{
                  width: `${Math.round((doneCount / total) * 100)}%`,
                }}
              />
            </div>
          </div>
          <span className="shrink-0 font-mono text-xs text-muted">
            示例进度&nbsp;{doneCount}&nbsp;/&nbsp;{total}
          </span>
        </div>
      </div>

      {/* Mobile: vertical task list */}
      <ol className="flex flex-col gap-2 sm:hidden" aria-label="任务清单">
        {tasks.map((task, idx) => (
          <li
            key={idx}
            className={[
              "flex items-center gap-3 rounded-sm border px-3 py-2 text-xs",
              doneCount > idx
                ? "border-green/30 bg-green/5 text-ink/80"
                : "border-rule text-muted",
            ].join(" ")}
          >
            <span
              className={[
                "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border font-mono text-[0.6rem]",
                doneCount > idx
                  ? "border-green bg-green text-paper"
                  : "border-rule text-muted",
              ].join(" ")}
              aria-hidden
            >
              {doneCount > idx ? "✓" : idx + 1}
            </span>
            <span>{task.label}</span>
          </li>
        ))}
      </ol>

      {/* Demo disclaimer */}
      <p className="text-xs text-muted/70">
        以上为示例任务链，不代表真实人生流程。
      </p>
    </div>
  );
}
