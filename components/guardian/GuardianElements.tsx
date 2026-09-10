/**
 * LELAN TECHNOLOGY · Guardian Five Elements
 *
 * Phase 2 — Five life dimensions teaser (五行生活维度).
 *
 * Compact 5-item grid — NOT a Town-style shop map.
 * Each item shows: element symbol + dimension + description + small building thumbnail.
 *
 * Server component. No client state.
 */
import Image from "next/image";
import { guardianElements } from "@/content/guardian";
import { visualAssets } from "@/content/assets";

interface GuardianElementsProps {
  /** Show building thumbnails (default: true) */
  showImages?: boolean;
}

function resolveElementAsset(assetId: string) {
  return (visualAssets as Record<string, { src: string; alt: string }>)[assetId] ?? null;
}

const ELEMENT_ACCENT: Record<string, string> = {
  金: "text-green",
  木: "text-green",
  水: "text-green",
  火: "text-ochre",
  土: "text-muted",
};

export function GuardianElements({ showImages = true }: GuardianElementsProps) {
  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <span className="font-mono text-[0.65rem] uppercase tracking-wider text-muted">
          五行生活维度
        </span>
        <span className="h-px flex-1 bg-rule" aria-hidden />
      </div>

      {/* 5-element grid */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-5">
        {guardianElements.map((el) => {
          const asset = resolveElementAsset(el.assetId);
          return (
            <div
              key={el.id}
              className="group flex flex-col items-start gap-2 rounded-sm border border-rule bg-paper p-3 transition-colors hover:border-green/30 hover:bg-paper-pure"
            >
              {/* Element badge + label */}
              <div className="flex items-center gap-2">
                <span
                  className={`font-serif text-base font-medium ${ELEMENT_ACCENT[el.element] ?? "text-muted"}`}
                >
                  {el.element}
                </span>
                <span className="font-serif text-sm text-ink">
                  {el.dimension}
                </span>
              </div>

              {/* Description */}
              <p className="text-xs text-muted">{el.description}</p>

              {/* Building thumbnail */}
              {showImages && asset && (
                <div
                  className="relative mt-auto overflow-hidden rounded-sm pt-2"
                  aria-hidden
                >
                  <div className="relative h-16 w-full overflow-hidden rounded-sm">
                    <Image
                      src={asset.src}
                      alt={asset.alt}
                      fill
                      sizes="(max-width: 640px) 20vw, 10vw"
                      className="object-cover opacity-80 transition-opacity group-hover:opacity-100"
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
