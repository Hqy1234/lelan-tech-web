/**
 * LELAN TECHNOLOGY · ChapterHeader
 *
 * Phase 1G-R3 — Shared chapter header grammar for Guardian / Town /
 * AI / Engineering / About. Every section's metadata row lives on
 * the same horizontal column (`--spine-x`), so the user reads a
 * single editorial rhythm as they scroll.
 *
 * Format:
 *   02 ───────────────────────────── ARCHIVE · SPACE
 *   乐懒成果小镇
 *   八条核心服务，一条可被走通的研究工作流。
 *
 * Hero is excluded — it is the only true opening, with its own
 * typography.
 */
import type { ReactNode } from "react";

interface ChapterHeaderProps {
  /** The section's editorial number, e.g. "02" */
  number: string;
  /** The section's TYPE label, e.g. "ARCHIVE · SPACE" or "PRODUCT LAYER" */
  typeLabel: string;
  /** The Chinese title, e.g. "乐懒成果小镇" */
  title: string;
  /** One-sentence intro */
  intro: string;
  /** Optional small bridge metadata that points to the next section */
  bridge?: string;
  /** Optional id to set on the title for aria-labelledby */
  titleId?: string;
  /** Optional children rendered below the intro (e.g. action area) */
  children?: ReactNode;
}

export function ChapterHeader({
  number,
  typeLabel,
  title,
  intro,
  bridge,
  titleId,
  children,
}: ChapterHeaderProps) {
  return (
    <header className="lelan-chapter-header">
      <div className="lelan-chapter-meta">
        <span className="lelan-chapter-number">{number}</span>
        <span className="lelan-chapter-rule" aria-hidden="true" />
        <span className="lelan-chapter-type">{typeLabel}</span>
      </div>
      <h2 id={titleId} className="lelan-chapter-title">
        {title}
      </h2>
      <p className="lelan-chapter-intro">{intro}</p>
      {children}
      {bridge ? (
        <div className="lelan-spine-bridge" aria-hidden="true">
          <span>{bridge}</span>
        </div>
      ) : null}
    </header>
  );
}
