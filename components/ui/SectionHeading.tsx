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
        {/* Phase 1G-R3 — Shared chapter meta row.
            Number on the spine column, a thin rule connecting to the
            system label on the right. Both stay on the same baseline. */}
        <div className="lelan-chapter-meta">
          <span className="lelan-chapter-number">{number}</span>
          {systemLabel ? <span className="lelan-chapter-rule" aria-hidden="true" /> : null}
          {systemLabel ? <span className="lelan-chapter-type">{systemLabel}</span> : null}
        </div>
        <HeadingTag
          {...(id ? { id } : {})}
          className="lelan-chapter-title"
        >
          {title}
        </HeadingTag>
        {intro && (
          <p className="lelan-chapter-intro">
            {intro}
          </p>
        )}
      </div>
      {aside && <div className="shrink-0 text-sm">{aside}</div>}
    </header>
  );
}
