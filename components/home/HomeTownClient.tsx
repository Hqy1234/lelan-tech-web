/**
 * LELAN TECHNOLOGY · Town V1.5 Client Island
 *
 * Phase 1C — ONE small Client Component island for Town selection.
 *
 * Responsibilities:
 * - Track selected shop (default: paper-teahouse)
 * - Render the index list (8 service items)
 * - Render the selected shop stage (building + character + info)
 *
 * All 8 shops' content is passed from the server — this is the only
 * client component in the Town section.
 *
 * No-JS: index shows all shops; stage defaults to paper-teahouse.
 */
"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import type { TownShop } from "@/content/town";
import { AGENT_ROLE_LABELS } from "@/content/town";
import { visualAssets } from "@/content/assets";
import { StatusLabel } from "@/components/ui/StatusLabel";

interface StageAsset {
  src: string;
  alt: string;
  width: number;
  height: number;
}

const RADIO_NAME = "town-shop-select";
const DEFAULT_SHOP_ID = "paper-teahouse";

const AVAILABILITY_TONE = {
  preview: "preview",
  concept: "concept",
  ready: "ready",
} as const;

const AVAILABILITY_LABEL = {
  preview: "Preview",
  concept: "Concept",
  ready: "Ready",
} as const;

function resolveStageAsset(id: string | undefined): StageAsset | null {
  if (!id) return null;
  const asset = (visualAssets as Record<string, StageAsset>)[id];
  return asset ?? null;
}

interface HomeTownClientProps {
  /** All 8 shops passed from the server component */
  shops: ReadonlyArray<TownShop>;
  /** Section status note */
  statusNote: string;
}

export function HomeTownClient({ shops, statusNote }: HomeTownClientProps) {
  const [selectedId, setSelectedId] = useState<string>(DEFAULT_SHOP_ID);

  const handleSelect = useCallback(
    (id: string) => {
      setSelectedId(id);
      // Update URL hash for bookmarkability
      window.history.replaceState(null, "", `#shop-${id}`);
    },
    []
  );

  const selected = shops.find((s) => s.id === selectedId) ?? shops[0];
  const building = resolveStageAsset(selected.buildingAssetId);
  const character = resolveStageAsset(selected.characterAssetId);
  const hasVisuals = Boolean(building || character);

  return (
    <div className="flex flex-col gap-0 lg:flex-row lg:gap-6">
      {/* ── Left: compact 8-service index ── */}
      <div className="-mx-5 lg:mx-0 lg:w-64 lg:shrink-0 lg:rounded-sm lg:border lg:border-rule lg:bg-paper-pure xl:w-72">
        <ul className="divide-y divide-rule" role="list">
          {shops.map((shop) => {
            const isSelected = shop.id === selectedId;
            return (
              <li key={shop.id} className="relative">
                <input
                  type="radio"
                  name={RADIO_NAME}
                  id={`town-radio-${shop.id}`}
                  value={shop.id}
                  checked={isSelected}
                  onChange={() => handleSelect(shop.id)}
                  className="peer sr-only"
                  aria-label={`选择 ${shop.name}：${shop.plainLanguageService}`}
                />
                <label
                  htmlFor={`town-radio-${shop.id}`}
                  className="flex cursor-pointer items-start gap-2.5 border-b border-rule px-3 py-2.5 transition-colors hover:bg-paper/60 peer-checked:border-l-2 peer-checked:border-l-green peer-checked:bg-paper/80 peer-focus-visible:outline peer-focus-visible:outline-1 peer-focus-visible:outline-cinnabar"
                >
                  <span
                    aria-hidden
                    className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-sm border border-rule font-mono text-[0.6rem] uppercase tracking-wider text-muted peer-checked:border-green peer-checked:bg-green peer-checked:text-paper"
                  >
                    {shop.number}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span
                      className={`block truncate font-serif text-sm font-medium peer-checked:font-semibold ${
                        isSelected ? "text-ink" : "text-ink/90"
                      }`}
                    >
                      {shop.name}
                    </span>
                    <span className="block truncate text-xs text-muted sm:text-sm">
                      {shop.plainLanguageService}
                    </span>
                  </span>
                </label>
              </li>
            );
          })}
        </ul>
      </div>

      {/* ── Right: selected shop stage ── */}
      <div className="mt-5 flex-1 min-w-0 lg:mt-0">
        <div className="rounded-sm border border-rule bg-paper-pure p-5 sm:p-6">
          {/* Shop identity */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3 flex-wrap">
              <h3 className="font-serif text-xl font-medium text-ink sm:text-2xl">
                {selected.name}
              </h3>
              <StatusLabel
                tone={AVAILABILITY_TONE[selected.availability]}
                label={AVAILABILITY_LABEL[selected.availability]}
              />
            </div>
            <p className="text-sm font-medium text-muted sm:text-base">
              {selected.plainLanguageService}
            </p>
          </div>

          {/* Short description */}
          <p className="mt-4 text-sm leading-relaxed text-ink/80 sm:text-base">
            {selected.shortDescription}
          </p>

          {/* Agent info */}
          <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-xs sm:text-sm">
            <div>
              <dt className="font-mono text-[0.65rem] uppercase tracking-wider text-muted">
                服务人格
              </dt>
              <dd className="mt-0.5 font-serif text-ink">{selected.agent}</dd>
            </div>
            <div>
              <dt className="font-mono text-[0.65rem] uppercase tracking-wider text-muted">
                人格定位
              </dt>
              <dd className="mt-0.5 text-ink">
                {AGENT_ROLE_LABELS[selected.agentRole]}
              </dd>
            </div>
          </dl>

          {/* Visual stage */}
          {hasVisuals ? (
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              {building && (
                <figure className="overflow-hidden rounded-sm border border-rule bg-paper-pure sm:flex-1">
                  <div className="relative aspect-[4/3] w-full sm:aspect-square">
                    <Image
                      src={building.src}
                      alt={building.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="border-t border-rule px-3 py-2 text-xs text-muted">
                    {selected.name}
                    <span className="ml-2 inline-block rounded-sm border border-rule px-1 py-0.5 font-mono text-[0.6rem] uppercase tracking-wider">
                      Placeholder
                    </span>
                  </figcaption>
                </figure>
              )}
              {character && (
                <figure className="overflow-hidden rounded-sm border border-rule bg-paper-pure sm:flex-1">
                  <div className="relative aspect-square w-full">
                    <Image
                      src={character.src}
                      alt={character.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="border-t border-rule px-3 py-2 text-xs text-muted">
                    {selected.agent}
                    <span className="ml-2 inline-block rounded-sm border border-rule px-1 py-0.5 font-mono text-[0.6rem] uppercase tracking-wider">
                      Placeholder
                    </span>
                  </figcaption>
                </figure>
              )}
            </div>
          ) : (
            <div className="mt-5 flex items-center justify-center rounded-sm border border-dashed border-rule bg-paper/40 py-8 text-xs text-muted">
              视觉资产整理中
            </div>
          )}

          {/* Relationship note */}
          {building && character && (
            <p className="mt-4 text-xs text-muted/80">
              {selected.name} = 服务入口 · {selected.agent} ={" "}
              {AGENT_ROLE_LABELS[selected.agentRole]}
            </p>
          )}
        </div>
      </div>

      <p className="sr-only">{statusNote}</p>
    </div>
  );
}
