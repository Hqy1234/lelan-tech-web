/**
 * LELAN TECHNOLOGY · Keyframe Divider
 *
 * 编辑型分隔：极细线 + 中央小标记。
 * 用于大段落之间（Town → Guardian → Technology），不滥用。
 */
export function KeyframeDivider() {
  return (
    <div
      className="flex items-center justify-center gap-3 py-10 sm:py-14"
      role="presentation"
      aria-hidden
    >
      <span className="h-px w-16 bg-rule sm:w-28" />
      <span className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-muted">
        ·
      </span>
      <span className="h-px w-16 bg-rule sm:w-28" />
    </div>
  );
}
