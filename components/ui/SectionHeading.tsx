/**
 * LELAN TECHNOLOGY · Section Heading
 *
 * 编辑型 section 标题：编号 / 中文标题 / 可选英文系统名 / 简介。
 * 严格使用 `h2` / `h3`，由 page.tsx 通过 section id 串成 h1 → h2 → h3 层级。
 */
import type { ReactNode } from "react";

interface SectionHeadingProps {
  /** section 编号，例如 "00" – "06" */
  number: string;
  /** 中文标题 */
  title: string;
  /** 简短介绍（最多两句） */
  intro?: string;
  /** 英文系统名（可选），用于编辑设计字感 */
  systemLabel?: string;
  /** heading level，决定使用 h2 还是 h3 */
  level?: 2 | 3;
  /** id 用于 anchor 跳转 */
  id?: string;
  /** 自定义 className */
  className?: string;
  /** 可选右侧 slot：例如状态徽标 / 操作 */
  aside?: ReactNode;
}

export function SectionHeading({
  number,
  title,
  intro,
  systemLabel,
  level = 2,
  id,
  className,
  aside,
}: SectionHeadingProps) {
  const HeadingTag = level === 2 ? "h2" : "h3";
  return (
    <header
      className={`flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 ${className ?? ""}`.trim()}
    >
      <div className="max-w-3xl">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.25em] text-muted">
            {number}
          </span>
          {systemLabel && (
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted">
              {systemLabel}
            </span>
          )}
        </div>
        <HeadingTag
          {...(id ? { id } : {})}
          className="lede mt-2 text-2xl font-medium leading-tight text-ink sm:text-3xl md:text-4xl"
        >
          {title}
        </HeadingTag>
        {intro && (
          <p className="mt-3 max-w-2xl text-sm text-muted sm:text-base">
            {intro}
          </p>
        )}
      </div>
      {aside && <div className="shrink-0 text-sm">{aside}</div>}
    </header>
  );
}
