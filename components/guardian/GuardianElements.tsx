/**
 * LELAN TECHNOLOGY · Guardian Five Elements — Continuous Life Dimension Band
 *
 * Phase 1E.4-A — Subject Restoration.
 *
 * History of this component:
 *   Phase 2         — 5 separate cards with a small building thumbnail.
 *   Phase 1E.3-A    — collapsed to a text-led band; `showImages` default was
 *                     flipped to `false` and the profile variant hardcoded
 *                     `false`, which removed all 5 element visuals from the
 *                     product (TYPE B — deliberate, see audit §12).
 *   Phase 1E.4-A    — images restored, but NOT as 5 heavy cards and NOT as
 *                     30–40px thumbnails. One continuous archive band, with
 *                     every plate large enough to actually be seen.
 *
 * Structure: one archive surface, 5 records separated by thin rules.
 *   Desktop ≥1024 : 5 columns, vertical hairline separators
 *   Tablet  ≥640  : 3 + 2
 *   Mobile  <640  : 2 columns
 *
 * Each record shows: plate (4:3) → element + dimension → status → notice.
 * The delivery files are 600×450 (4:3), so the plate uses aspect-ratio 4/3.
 *
 * Wuxing semantics stay honest: these are LIFE DIMENSIONS / influencing
 * factors for organising records — NOT a scientific causal model, NOT
 * divination, NOT diagnosis. The scientific layer is the method strip
 * (建档归集 → 队列建模 → 横断面校准 → 分级提示 → 方案落地).
 *
 * Still forbidden: wuxing wheels, sheng-ke arrows, gems, balls, five god
 * beasts, risk-colour scales, five heavy cards.
 *
 * Server component. No client state.
 */
import Image from "next/image";
import { guardianElements } from "@/content/guardian";
import { visualAssets, type VisualAsset } from "@/content/assets";

/** Element accent — restrained; 火 uses ochre, 土 is muted. */
const ELEMENT_ACCENT: Record<string, string> = {
  金: "text-green",
  木: "text-green",
  水: "text-green",
  火: "text-ochre",
  土: "text-muted",
};

type BandStatus = "已记录" | "持续关注" | "当前事项" | "待完善";

const STATUS_TONE: Record<BandStatus, string> = {
  已记录: "border-rule bg-rule/40 text-muted",
  持续关注: "border-cinnabar/25 bg-cinnabar/10 text-cinnabar",
  当前事项: "border-green/25 bg-green/10 text-green",
  待完善: "border-rule bg-ink/5 text-muted",
};

export interface GuardianElementRecord {
  element: string;
  dimension: string;
  description: string;
  status: BandStatus;
  notice: string;
  assetId: string;
}

function resolveAsset(assetId: string): VisualAsset | null {
  return (visualAssets as Record<string, VisualAsset>)[assetId] ?? null;
}

/* ── One record in the band ─────────────────────────────────────────────── */

function ElementRecord({ record }: { record: GuardianElementRecord }) {
  const asset = resolveAsset(record.assetId);

  return (
    <div className="flex flex-col gap-2 border-b border-rule px-4 py-3 last:border-b-0 sm:border-b-0 sm:border-r sm:px-4 sm:py-4 sm:last:border-r-0">
      {/* Plate — real visual presence, never a 40px strip */}
      {asset && (
        <div className="lelan-element-plate w-full rounded-sm">
          <Image
            src={asset.src}
            alt={asset.alt}
            width={asset.width}
            height={asset.height}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className="h-full w-full object-cover"
          />
        </div>
      )}

      {/* Element + dimension + status on one line — was three stacked blocks */}
      <div className="flex items-baseline gap-2">
        <span
          aria-hidden
          className={[
            "font-serif text-lg leading-none",
            ELEMENT_ACCENT[record.element] ?? "text-muted",
          ].join(" ")}
        >
          {record.element}
        </span>
        <span className="font-serif text-sm font-medium text-ink">
          {record.dimension}
        </span>
        <span
          className={[
            "ml-auto shrink-0 rounded-sm border px-1.5 py-0.5 font-mono text-[0.55rem] uppercase tracking-wider",
            STATUS_TONE[record.status],
          ].join(" ")}
        >
          {record.status}
        </span>
      </div>

      {/* Notice */}
      <p className="text-xs leading-relaxed text-muted">{record.notice}</p>
    </div>
  );
}

/* ── Band shell ─────────────────────────────────────────────────────────── */

function BandShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <span className="font-mono text-[0.65rem] uppercase tracking-wider text-muted">
          五行生活维度 · 档案带
        </span>
        <span aria-hidden className="h-px flex-1 bg-rule" />
        <span className="font-mono text-[0.6rem] uppercase tracking-wider text-muted/60">
          5 个维度
        </span>
      </div>

      <div className="overflow-hidden rounded-sm border border-rule bg-paper-pure">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
          {children}
        </div>
      </div>

      <p className="lelan-annotation">
        维度用于生活记录与影响因素整理；不作为风险打分、医学因果或命理依据。
      </p>
    </div>
  );
}

/* ── Default band (homepage) — all five element visuals shown ───────────── */

export function GuardianElements() {
  const records: GuardianElementRecord[] = guardianElements.map((el) => ({
    element: el.element,
    dimension: el.dimension,
    description: el.description,
    // The homepage band is an editorial overview of the five dimensions,
    // so all five read as "待完善" (nothing recorded yet) rather than
    // implying real user state.
    status: "待完善",
    notice: el.description,
    assetId: el.assetId,
  }));

  return (
    <BandShell>
      {records.map((record) => (
        <ElementRecord key={record.element} record={record} />
      ))}
    </BandShell>
  );
}

/* ── Profile-aware band — explicit status/notice per dimension ──────────── */

export function GuardianElementsBand({
  elements,
}: {
  elements: ReadonlyArray<{
    element: string;
    dimension: string;
    description: string;
    status: BandStatus;
    notice: string;
    assetId: string;
  }>;
}) {
  return (
    <BandShell>
      {elements.map((el) => (
        <ElementRecord key={el.element} record={el} />
      ))}
    </BandShell>
  );
}
