/**
 * LELAN TECHNOLOGY · Town Globe — building visuals
 *
 * Phase 1E.4-B.
 *
 * ⚠ THIS FILE IS THE FUTURE ASSET SEAM.
 *
 * When real globe-ready architecture art arrives (low-poly meshes or
 * transparent 2.5D assets), ONLY `TownBuildingVisual` needs to change.
 * Selection, rotation, camera, hash sync, fallback and the drawer must not be
 * touched.
 *
 * Honesty rules enforced here:
 *   - Buildings 01 / 02 have delivery artwork (non-transparent WebP). They are
 *     rendered as an **architectural display panel** mounted on a small plinth:
 *     explicitly a "miniature facade panel", NOT a faked cut-out 3D building.
 *     No alpha tricks are used to pretend the background is transparent.
 *   - Buildings 03-08 have no artwork. They render as a unified low-relief
 *     **proxy pavilion**: plinth + massing + eave + roof, clearly readable as a
 *     building volume awaiting its final art, never an empty grey box.
 *   - We NEVER duplicate the 论文茶寮 or 课题小铺 art onto another shop, and never
 *     recolour one building to fake eight.
 */

import { useEffect, useMemo, useState } from "react";
import { SRGBColorSpace, Texture } from "three";
import type { TownShop } from "@/content/town";
import { visualAssets, type VisualAsset } from "@/content/assets";
import { GLOBE_RADIUS } from "@/lib/town/globe";

/* Palette — warm ivory / muted jade / earth beige / ink green, with a single
   cinnabar accent reserved for the selected state.
   No blue ocean, no grass green, no neon. */
export const TOWN_PALETTE = {
  ivory: "#EFE9DC",
  paper: "#F6F2E8",
  jade: "#8FA795",
  jadeDeep: "#5E7A68",
  earth: "#C3B296",
  earthDeep: "#9A8A6E",
  ink: "#22302A",
  cinnabar: "#9B3A2F",
} as const;

/** Height of the plinth above the surface, in globe radii. */
export const PLINTH_SCALE = 0.022;

function resolveAsset(id: string | undefined): VisualAsset | null {
  if (!id) return null;
  return (visualAssets as Record<string, VisualAsset>)[id] ?? null;
}

/**
 * Loads a delivery WebP as a texture.
 *
 * Deliberately hand-rolled instead of pulling in drei's `useTexture`: the
 * library would add a large amount of code to the three chunk for two small
 * images. A failed decode returns null and the building keeps its paper frame —
 * no throw, no page crash.
 */
function useImageTexture(url: string | undefined): Texture | null {
  const [texture, setTexture] = useState<Texture | null>(null);

  useEffect(() => {
    if (!url) return;
    let cancelled = false;
    let created: Texture | null = null;

    const img = new Image();
    img.decoding = "async";
    img.onload = () => {
      if (cancelled) return;
      const tex = new Texture(img);
      tex.colorSpace = SRGBColorSpace;
      tex.needsUpdate = true;
      created = tex;
      setTexture(tex);
    };
    img.onerror = () => {
      if (!cancelled) setTexture(null);
    };
    img.src = url;

    return () => {
      cancelled = true;
      created?.dispose();
    };
  }, [url]);

  return texture;
}

/* Shared plinth */

function Plinth({ selected }: { selected: boolean }) {
  return (
    <mesh position={[0, PLINTH_SCALE / 2, 0]}>
      <cylinderGeometry args={[0.055, 0.062, PLINTH_SCALE, 6]} />
      <meshLambertMaterial
        color={selected ? TOWN_PALETTE.paper : TOWN_PALETTE.ivory}
      />
    </mesh>
  );
}

/* 01 / 02 — architectural display panel */

/**
 * Renders the existing non-transparent WebP as a deliberate facade panel:
 * an upright plane mounted on the plinth like an information board in a
 * sand-table model, with a paper border so the rectangular artwork reads as
 * intentional design rather than a failed cut-out.
 */
function FacadePanel({ asset }: { asset: VisualAsset }) {
  const texture = useImageTexture(asset.src);
  const aspect = asset.width / asset.height;

  return (
    <group position={[0, PLINTH_SCALE + 0.075, 0]}>
      {/* Frame plate (paper mount) */}
      <mesh position={[0, 0, -0.004]}>
        <planeGeometry args={[0.15, 0.15 / aspect + 0.012]} />
        <meshLambertMaterial color={TOWN_PALETTE.paper} />
      </mesh>
      {/* The artwork itself */}
      <mesh>
        <planeGeometry args={[0.14, 0.14 / aspect]} />
        {texture ? (
          <meshBasicMaterial map={texture} toneMapped={false} />
        ) : (
          <meshLambertMaterial color={TOWN_PALETTE.earth} />
        )}
      </mesh>
      {/* Thin ink base line so the panel sits on the ground convincingly */}
      <mesh position={[0, -0.078, 0.001]}>
        <planeGeometry args={[0.15, 0.004]} />
        <meshBasicMaterial color={TOWN_PALETTE.ink} transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

/* 03-08 — unified low-relief proxy pavilion */

/**
 * A paper pavilion: plinth + massing + eave + roof.
 * Deliberately low-poly and identical in construction across 03-08, so the six
 * read as one honest "awaiting final art" family rather than six broken models.
 * Only the footprint, height and roof pitch vary slightly (deterministically),
 * so the town does not look stamped from a single mould.
 */
function ProxyPavilion({
  selected,
  variant,
}: {
  selected: boolean;
  variant: number;
}) {
  const bodyColor = selected ? TOWN_PALETTE.paper : TOWN_PALETTE.jade;
  const roofColor = selected ? TOWN_PALETTE.jadeDeep : TOWN_PALETTE.earthDeep;

  // Deterministic variation — no randomness, keeps SSR/repeated renders stable.
  const w = 0.075 + (variant % 3) * 0.006;
  const h = 0.055 + (variant % 2) * 0.012;
  const roofH = 0.03 + (variant % 3) * 0.006;

  return (
    <group position={[0, PLINTH_SCALE, 0]}>
      {/* Massing */}
      <mesh position={[0, h / 2, 0]}>
        <boxGeometry args={[w, h, w]} />
        <meshLambertMaterial color={bodyColor} />
      </mesh>
      {/* Eave — a flat overhanging canopy slab. This is the detail that makes a
          box read as an eastern pavilion rather than a plain block. */}
      <mesh position={[0, h + 0.004, 0]}>
        <boxGeometry args={[w * 1.34, 0.008, w * 1.34]} />
        <meshLambertMaterial color={roofColor} />
      </mesh>
      {/* Roof — a shallow 4-sided pyramid. */}
      <mesh position={[0, h + roofH / 2 + 0.008, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[w * 0.8, roofH, 4]} />
        <meshLambertMaterial color={roofColor} flatShading />
      </mesh>
    </group>
  );
}

/* Public component (the seam) */

export interface TownBuildingVisualProps {
  shop: TownShop;
  selected: boolean;
  /** Index within the shop list — used only for deterministic variation. */
  variantIndex: number;
}

/**
 * The single place that decides what a shop looks like in 3D.
 * Replace the branches below when real globe-ready architecture art exists;
 * keep this component's props identical.
 */
export function TownBuildingVisual({
  shop,
  selected,
  variantIndex,
}: TownBuildingVisualProps) {
  const building = useMemo(
    () => resolveAsset(shop.buildingAssetId),
    [shop.buildingAssetId]
  );

  const hasArtwork = shop.hasBuildingAsset && building !== null;

  return (
    <group>
      <Plinth selected={selected} />
      {hasArtwork ? (
        <FacadePanel asset={building} />
      ) : (
        <ProxyPavilion selected={selected} variant={variantIndex} />
      )}
    </group>
  );
}

/** Exported for the terrain/road modules that need consistent scale. */
export { GLOBE_RADIUS };
