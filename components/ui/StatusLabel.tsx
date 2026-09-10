/**
 * LELAN TECHNOLOGY · Status Label
 *
 * 极简状态徽标：用于明确"当前阶段"。
 *
 * 不引入彩色填充 — 仅靠边框 + 字色，克制编辑型。
 */
type StatusTone = "preview" | "concept" | "ready" | "future" | "beta";

interface StatusLabelProps {
  tone: StatusTone;
  label: string;
  className?: string;
}

const TONE_CLASSES: Record<StatusTone, string> = {
  preview: "border-cinnabar/40 text-cinnabar",
  concept: "border-rule text-muted",
  ready: "border-green/50 text-green",
  future: "border-rule text-muted/70",
  beta: "border-green/50 text-green",
};

export function StatusLabel({ tone, label, className }: StatusLabelProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-sm border px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-[0.18em] ${TONE_CLASSES[tone]} ${className ?? ""}`}
    >
      <span
        aria-hidden
        className="inline-block h-1.5 w-1.5 rounded-full bg-current opacity-70"
      />
      {label}
    </span>
  );
}
