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
import { useThree } from "@react-three/fiber";
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
  /**
   * Muted grey-green water. Deliberately NOT blue — the brief forbids blue
   * lakes; this reads as still jade-tinted water in a stone basin.
   */
  water: "#7E968C",
} as const;

/** Height of the plinth above the surface, in globe radii. */
export const PLINTH_SCALE = 0.028;

/**
 * Phase 1E.4-B1 — overall building scale multiplier.
 *
 * At 1.0 the eight shops rendered ~40px against a ~330px dome, which read as
 * "a few dots on a sphere" rather than a town. 1.25 is the audited sweet spot:
 *
 *   - geometry: widest eave half-extent 0.058 → 0.073 globe radii
 *   - collision check: the closest shop pair (04 software ↔ 07 industry) sits
 *     19.0° apart, while 1.25 needs only 8.35°, leaving ~10.6° of margin
 *   - applied ONCE, on a wrapper group, so the plinth, massing, eave, roof,
 *     façade panel, marker ring AND the hit target all scale together and can
 *     never drift out of alignment
 *
 * Deliberately does NOT scale the globe, terrain or roads — only the buildings.
 */
export const BUILDING_SCALE = 1.15;

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

    (async () => {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(String(res.status));
        const blob = await res.blob();
        const bitmap = await createImageBitmap(blob);
        if (cancelled) {
          bitmap.close();
          return;
        }
        /**
         * `createImageBitmap` rather than `new Texture(htmlImageElement)`.
         * The element form loaded and reported ready but drew nothing under the
         * software rasteriser used in review; a decoded ImageBitmap is a
         * first-class uploadable source and avoids that path entirely.
         */
        const tex = new Texture(bitmap as unknown as HTMLImageElement);
        tex.colorSpace = SRGBColorSpace;
        tex.needsUpdate = true;
        created = tex;
        setTexture(tex);
      } catch {
        // A failed texture must not break the scene: the building keeps its
        // paper backing. No throw, no page crash.
        if (!cancelled) setTexture(null);
      }
    })();

    return () => {
      cancelled = true;
      created?.dispose();
    };
  }, [url]);

  return texture;
}

/**
 * Requests a repaint when a texture finishes loading.
 *
 * ⚠ Required because the scene runs `frameloop="demand"`. Images decode AFTER
 * the initial frame, and in demand mode R3F only paints when something calls
 * `invalidate()`. Without this, all eight building textures uploaded correctly
 * but the canvas was never asked to redraw, so every building rendered as a
 * blank paper plate — which is exactly what review caught.
 */
function useInvalidateOnReady(ready: boolean) {
  const { invalidate, gl } = useThree();
  useEffect(() => {
    if (!ready) return;
    // Repaint across several frames: the texture upload lands on the GPU
    // asynchronously, and a single invalidate can paint before the upload is
    // usable. Painting over ~0.4s guarantees the plate appears, then the scene
    // returns to idle (no continuous loop).
    invalidate();
    const ids = [1, 2, 4, 8, 16, 24].map((n) =>
      window.setTimeout(() => invalidate(), n * 16)
    );
    void gl;
    return () => ids.forEach((id) => window.clearTimeout(id));
  }, [ready, invalidate, gl]);
}

/** Shared plinth */

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
  useInvalidateOnReady(texture !== null);
  const aspect = asset.width / asset.height;

  /**
   * The plate's on-globe size. The delivery images are already paper-mounted
   * 668×508 plates (see scripts/derive-town-buildings.cjs), so the artwork fills
   * this box completely — no separate inner margin geometry is needed.
   */
  const plateW = 0.148;
  const plateH = plateW / aspect;

  return (
    <group
      key={texture ? "art-ready" : "art-pending"}
      position={[0, PLINTH_SCALE + 0.075, 0]}
    >
      {/*
        Facade (Phase 1E.4-C, simplified).

        Earlier attempts layered a paper mount BOX behind the artwork plane.
        Review showed the artwork never appeared — every building rendered as a
        blank white plate — so the layering is gone. There is now exactly ONE
        surface carrying the image, with a shallow backing slab behind it purely
        for silhouette depth, and a ledge beneath.

        Keeping the textured surface unique removes the whole class of
        "the mount is painting over the art" failure.
      */}
      {/* Backing slab — silhouette depth only, sits clearly behind the art */}
      <mesh position={[0, 0, -0.012]}>
        <boxGeometry args={[plateW, plateH, 0.006]} />
        <meshLambertMaterial color={TOWN_PALETTE.paper} />
      </mesh>

      {/* THE art surface — the only textured mesh per building. */}
      <mesh key={texture ? "ready" : "loading"}>
        <planeGeometry args={[plateW, plateH]} />
        {texture ? (
          <meshBasicMaterial map={texture} toneMapped={false} />
        ) : (
          <meshBasicMaterial color="#EFE9DC" />
        )}
      </mesh>

      {/* Ledge — grounds the plate as a building frontage */}
      <mesh position={[0, -plateH / 2 - 0.004, 0.004]}>
        <boxGeometry args={[plateW * 1.08, 0.008, 0.022]} />
        <meshLambertMaterial color={TOWN_PALETTE.earth} />
      </mesh>

      {/* Thin ink base line so the plate sits on the ground convincingly */}
      <mesh position={[0, -plateH / 2 + 0.002, 0.002]}>
        <planeGeometry args={[plateW, 0.004]} />
        <meshBasicMaterial color={TOWN_PALETTE.ink} transparent opacity={0.28} />
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
  /**
   * Phase 1E.4-B1 — softened roof.
   * Previously 0.030–0.042 tall on a 0.80·w base, which produced a sharp spike
   * once the buildings were scaled up. Now shorter (0.022–0.030) on a wider
   * base (0.94·w): a shallow, spreading eastern roof instead of a spire.
   */
  const roofH = 0.022 + (variant % 3) * 0.004;

  return (
    <group position={[0, PLINTH_SCALE, 0]}>
      {/* Massing */}
      <mesh position={[0, h / 2, 0]}>
        <boxGeometry args={[w, h, w]} />
        <meshLambertMaterial color={bodyColor} />
      </mesh>
      {/* Eave — a flat overhanging canopy slab. This is the detail that makes a
          box read as an eastern pavilion rather than a plain block. Widened
          slightly (1.34 → 1.42) so the overhang stays proportionate to the
          broader roof beneath it. */}
      <mesh position={[0, h + 0.004, 0]}>
        <boxGeometry args={[w * 1.42, 0.008, w * 1.42]} />
        <meshLambertMaterial color={roofColor} />
      </mesh>
      {/* Roof — a shallow, spreading 4-sided pyramid. */}
      <mesh position={[0, h + roofH / 2 + 0.006, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[w * 0.94, roofH, 4]} />
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
    /* Single scale point for the whole building: plinth, body, eave, roof,
       façade panel and marker all scale together, so they can never drift out
       of alignment. */
    <group scale={BUILDING_SCALE}>
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
