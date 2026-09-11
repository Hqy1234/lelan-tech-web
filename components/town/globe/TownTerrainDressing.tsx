/**
 * LELAN TECHNOLOGY · Town Globe — terrain art pass
 *
 * Phase 1E.4-C.
 *
 * Adds the "sand-table" reading the prototype lacked: instead of a plain shaded
 * dome, the surface now carries explicit districts — courtyards, a muted water
 * patch, terraces and a raised workshop hill — plus a few minimal props.
 *
 * ⚠ GEOMETRY NOTE — why every flat element here is small.
 *
 * A disc lying tangentially on the sphere is seen from above the ambient plane,
 * so its front edge projects LOWER on screen than its centre, by an amount that
 * grows with radius. Phase 1E.4-B1 established this while building the display
 * base: an oversized disc draws a pale band straight across the sand-table. So
 * every ground decal here (courtyard, water, terraces) is deliberately modest in
 * radius and sits just proud of the surface. If a future change enlarges them,
 * re-check for that banding artefact.
 *
 * Budget: low-poly primitives only, no textures, no particle systems, no
 * shadow maps. All props share the town palette.
 */

import { useMemo } from "react";
import { Quaternion, Vector3 } from "three";
import { GLOBE_RADIUS, globeNormal, globeToCartesian } from "@/lib/town/globe";
import { TOWN_PALETTE } from "./TownBuildingVisual";

/** Surface offset so ground decals do not z-fight with the terrain. */
const DECAL_LIFT = GLOBE_RADIUS * 1.003;

interface SurfaceProps {
  latitude: number;
  longitude: number;
  radius?: number;
}

/** Orients children to lie flat on the sphere at a lat/lon, facing outward. */
function Surface({
  latitude,
  longitude,
  radius = DECAL_LIFT,
  children,
}: SurfaceProps & { children: React.ReactNode }) {
  const { position, quaternion } = useMemo(() => {
    const p = globeToCartesian({ latitude, longitude }, radius);
    const n = globeNormal({ latitude, longitude });
    // Rotate +Y onto the outward normal, then the child's local XZ plane is
    // tangent to the surface.
    const q = new Quaternion().setFromUnitVectors(
      new Vector3(0, 1, 0),
      new Vector3(n.x, n.y, n.z).normalize()
    );
    return { position: new Vector3(p.x, p.y, p.z), quaternion: q };
  }, [latitude, longitude, radius]);

  return (
    <group position={position} quaternion={quaternion}>
      {children}
    </group>
  );
}

/* ── Ground decals ─────────────────────────────────────────────────────── */

/**
 * A stone courtyard: a low disc with a slightly lighter top face, reading as a
 * paved forecourt between buildings. Two of these give the settlement the
 * shared public space a town needs.
 */
function Courtyard({ latitude, longitude, radius }: SurfaceProps & { radius: number }) {
  return (
    <Surface latitude={latitude} longitude={longitude}>
      {/* Paving slab */}
      <mesh position={[0, 0.004, 0]}>
        <cylinderGeometry args={[radius, radius, 0.008, 28]} />
        <meshLambertMaterial color={TOWN_PALETTE.ivory} />
      </mesh>
      {/* Inset stone line — one restrained detail, no ornament */}
      <mesh position={[0, 0.009, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[radius * 0.66, radius * 0.72, 28]} />
        <meshBasicMaterial
          color={TOWN_PALETTE.earthDeep}
          transparent
          opacity={0.3}
          depthWrite={false}
        />
      </mesh>
    </Surface>
  );
}

/**
 * A small muted water patch — grey-green, never a blue lake. Its only job is to
 * break the continuous dome surface and add a second material to the sand-table.
 */
function WaterPatch({ latitude, longitude, radius }: SurfaceProps & { radius: number }) {
  return (
    <Surface latitude={latitude} longitude={longitude}>
      <mesh position={[0, 0.002, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[radius, 26]} />
        <meshBasicMaterial color={TOWN_PALETTE.water} transparent opacity={0.85} />
      </mesh>
      {/* Bank — a thin jade rim so the water reads as contained */}
      <mesh position={[0, 0.0015, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[radius, radius * 1.12, 26]} />
        <meshLambertMaterial color={TOWN_PALETTE.jade} />
      </mesh>
    </Surface>
  );
}

/**
 * A shallow terrace — a low step in the terrain. Deliberately tiny in height
 * (0.012) so it reads as a graded platform, not a cliff or a game-map tier.
 */
function Terrace({ latitude, longitude, radius }: SurfaceProps & { radius: number }) {
  return (
    <Surface latitude={latitude} longitude={longitude}>
      <mesh position={[0, 0.006, 0]}>
        <cylinderGeometry args={[radius, radius * 1.05, 0.012, 22]} />
        <meshLambertMaterial color={TOWN_PALETTE.earth} />
      </mesh>
    </Surface>
  );
}

/* ── Props ─────────────────────────────────────────────────────────────── */

/**
 * Minimal tree silhouette in two cones. Low-poly, no foliage detail — these
 * exist for scale reference, not decoration. Six at most.
 */
function Tree({ latitude, longitude, scale = 1 }: SurfaceProps & { scale?: number }) {
  return (
    <Surface latitude={latitude} longitude={longitude}>
      <group scale={scale}>
        <mesh position={[0, 0.014, 0]}>
          <cylinderGeometry args={[0.003, 0.004, 0.028, 6]} />
          <meshLambertMaterial color={TOWN_PALETTE.earthDeep} />
        </mesh>
        <mesh position={[0, 0.04, 0]}>
          <coneGeometry args={[0.016, 0.036, 7]} />
          <meshLambertMaterial color={TOWN_PALETTE.jade} flatShading />
        </mesh>
        <mesh position={[0, 0.06, 0]}>
          <coneGeometry args={[0.011, 0.026, 7]} />
          <meshLambertMaterial color={TOWN_PALETTE.jadeDeep} flatShading />
        </mesh>
      </group>
    </Surface>
  );
}

/** A single small lantern — an ink post with a cinnabar cap. Space reference only. */
function Lantern({ latitude, longitude, scale = 1 }: SurfaceProps & { scale?: number }) {
  return (
    <Surface latitude={latitude} longitude={longitude}>
      <group scale={scale}>
        <mesh position={[0, 0.022, 0]}>
          <cylinderGeometry args={[0.0022, 0.0022, 0.044, 6]} />
          <meshLambertMaterial color={TOWN_PALETTE.ink} />
        </mesh>
        <mesh position={[0, 0.05, 0]}>
          <boxGeometry args={[0.013, 0.015, 0.013]} />
          <meshBasicMaterial color={TOWN_PALETTE.cinnabar} />
        </mesh>
        <mesh position={[0, 0.06, 0]}>
          <coneGeometry args={[0.011, 0.008, 4]} />
          <meshLambertMaterial color={TOWN_PALETTE.ink} />
        </mesh>
      </group>
    </Surface>
  );
}

/* ── Composition ───────────────────────────────────────────────────────── */

/**
 * The full terrain dressing, positioned to match the shop clusters:
 *   01/02 central core · 03/04 east · 05/06/07 south · 08 raised on the hill
 *
 * Positions are chosen to sit BETWEEN buildings, never under them, so the
 * decals never clip a facade.
 */
export function TownTerrainDressing() {
  return (
    <group>
      {/* A. Central civic courtyard, between the 01/02 core and the 03 cluster */}
      <Courtyard latitude={36} longitude={344} radius={0.13} />

      {/* B. Southern forecourt serving the 05/06/07 row */}
      <Courtyard latitude={2} longitude={20} radius={0.105} />

      {/* C. Muted water patch on the open western flank */}
      <WaterPatch latitude={20} longitude={312} radius={0.085} />

      {/* D. Terraces: a graded approach to the eastern cluster, and a raised
             shelf under the AI workshop hill. */}
      <Terrace latitude={30} longitude={12} radius={0.1} />
      <Terrace latitude={42} longitude={88} radius={0.095} />

      {/* E. Vegetation — six silhouettes for scale, clustered near courtyards */}
      <Tree latitude={30} longitude={350} scale={1.0} />
      <Tree latitude={26} longitude={338} scale={0.82} />
      <Tree latitude={8} longitude={356} scale={0.92} />
      <Tree latitude={22} longitude={8} scale={0.78} />
      <Tree latitude={38} longitude={78} scale={0.88} />
      <Tree latitude={6} longitude={44} scale={0.8} />

      {/* F. Three lanterns marking the main approaches */}
      <Lantern latitude={40} longitude={352} scale={1.0} />
      <Lantern latitude={12} longitude={6} scale={0.95} />
      <Lantern latitude={46} longitude={80} scale={0.9} />
    </group>
  );
}

/** Exported for the scene so props can share the dressing's lift convention. */
export { DECAL_LIFT };
