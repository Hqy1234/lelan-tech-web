/**
 * LELAN TECHNOLOGY · Guardian Five Elements — Archive Band
 *
 * Phase 1E.3-A — Continuous archive band (NOT 5 cards).
 *
 * Five dimensions (金 · 财富 · 木 · 健康 · 水 · 出行 · 火 · 饮食 · 土 · 安居)
 * are presented as a single shared archive surface, not five equal cards.
 *
 * Desktop (≥640): one row, separated by thin vertical rules.
 * Mobile (<640): five stacked archive rows (no forced 5-column squeeze).
 *
 * NO balls, NO gems, NO five god beasts, NO five-card grid, NO
 * wuxing wheel, NO sheng-ke arrows, NO risk-color scale.
 *
 * Server component. No client state.
 */
import Image from "next/image";
import { guardianElements } from "@/content/guardian";
import { visualAssets } from "@/content/assets";

interface GuardianElementsProps {
  /** Show building thumbnails (default: false — archive band is text-led) */
  showImages?: boolean;
}

interface DimProps {
  element: string;
  dimension: string;
  description: string;
  status: "已记录" | "持续关注" | "当前事项" | "待完善";
  notice: string;
  assetId: string;
  isLast: boolean;
}

function resolveAsset(assetId: string) {
  return (visualAssets as Record<string, { src: string; alt: string }>)[assetId] ?? null;
}

const ELEMENT_ACCENT: Record<string, string> = {
  金: "text-green",
  木: "text-green",
  水: "text-green",
  火: "text-ochre",
  土: "text-muted",
};

const STATUS_TONE: Record<DimProps["status"], string> = {
  "已记录": "bg-rule/60 text-muted",
  "持续关注": "bg-cinnabar/10 text-cinnabar border border-cinnabar/20",
  "当前事项": "bg-green/10 text-green border border-green/20",
  "待完善": "bg-ink/5 text-muted border border-rule",
};

function ArchiveRecord({
  el,
  isLast,
  showImage,
}: {
  el: DimProps;
  isLast: boolean;
  showImage: boolean;
}) {
  const asset = showImage ? resolveAsset(el.assetId) : null;
  return (
    <div
      className={[
        "relative flex items-start gap-3 px-4 py-4",
        // desktop separator (vertical thin rule), mobile horizontal separator
        "sm:px-5 sm:py-5",
        isLast ? "" : "border-b border-rule sm:border-b-0 sm:border-r",
      ].join(" ")}
    >
      {/* element badge */}
      <span
        className={[
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-sm border border-rule font-serif text-base",
          ELEMENT_ACCENT[el.element] ?? "text-muted",
        ].join(" ")}
        aria-hidden
      >
        {el.element}
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-2">
          <span className="font-serif text-sm font-medium text-ink">
            {el.dimension}
          </span>
          <span className="font-mono text-[0.65rem] uppercase tracking-wider text-muted">
            {el.element}
          </span>
          <span
            className={[
              "ml-auto rounded-sm px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-wider",
              STATUS_TONE[el.status],
            ].join(" ")}
          >
            {el.status}
          </span>
        </div>
        <p className="mt-1 text-xs leading-relaxed text-muted">
          {el.notice}
        </p>
        {asset && (
          <div className="relative mt-2 h-10 w-full overflow-hidden rounded-sm" aria-hidden>
            <Image
              src={asset.src}
              alt={asset.alt}
              fill
              sizes="(max-width: 640px) 100vw, 20vw"
              className="object-cover opacity-80"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export function GuardianElements({
  showImages = false,
}: GuardianElementsProps) {
  // Default notice: planned — the band is editorial by default.
  // Specific content overrides happen via GuardianProfile consumers.
  const items: DimProps[] = guardianElements.map((el) => ({
    element: el.element,
    dimension: el.dimension,
    description: el.description,
    status: "待完善",
    notice: el.description,
    assetId: el.assetId,
    isLast: false,
  }));

  return (
    <div className="flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-center gap-3">
        <span className="font-mono text-[0.65rem] uppercase tracking-wider text-muted">
          五行生活维度 · 档案带
        </span>
        <span className="h-px flex-1 bg-rule" aria-hidden />
      </div>

      {/* Archive band */}
      <div className="overflow-hidden rounded-sm border border-rule bg-paper-pure">
        {/* desktop: single row, mobile: stacked */}
        <div className="grid grid-cols-1 sm:grid-cols-5">
          {items.map((el, idx) => (
            <ArchiveRecord
              key={el.element}
              el={{ ...el, isLast: idx === items.length - 1 }}
              isLast={idx === items.length - 1}
              showImage={showImages}
            />
          ))}
        </div>
      </div>

      {/* Footer micro-annotation */}
      <p className="lelan-annotation">
        维度用于生活记录与影响因素整理；不作为风险打分或医学因果依据。
      </p>
    </div>
  );
}

/**
 * Profile-aware variant: takes explicit notice/status per dimension
 * (e.g. from the user's GuardianProfile) and renders the same band.
 */
export function GuardianElementsBand({
  elements,
}: {
  elements: ReadonlyArray<{
    element: string;
    dimension: string;
    description: string;
    status: "已记录" | "持续关注" | "当前事项" | "待完善";
    notice: string;
    assetId: string;
  }>;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <span className="font-mono text-[0.65rem] uppercase tracking-wider text-muted">
          五行生活维度 · 档案带
        </span>
        <span className="h-px flex-1 bg-rule" aria-hidden />
      </div>
      <div className="overflow-hidden rounded-sm border border-rule bg-paper-pure">
        <div className="grid grid-cols-1 sm:grid-cols-5">
          {elements.map((el, idx) => (
            <ArchiveRecord
              key={el.element}
              el={{ ...el, isLast: idx === elements.length - 1 }}
              isLast={idx === elements.length - 1}
              showImage={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
