/**
 * LELAN TECHNOLOGY · Town Globe — terrain
 *
 * Phase 1E.4-B.
 *
 * A low-relief spherical CAP, not a planet.
 *
 * Why a cap rather than a full sphere: the brief is an "eastern miniature
 * sand-table on a display stand". A full sphere reads as a globe/planet and
 * invites Earth semantics. A cap reads as a modelled landform, and its flat
 * rim gives the piece a base to sit on.
 *
 * Construction (all procedural — no downloaded terrain, no Earth texture):
 *   - one open-ended sphere segment, low segment count for a low-poly look
 *   - vertex colours provide the terrain wash (ivory → earth → jade)
 *   - a flat rim disc closes the bottom of the cap
 *   - a very light painted contact shadow grounds the object
 *
 * No custom shaders, no HDR environment, no shadow maps.
 */

import { useMemo } from "react";
import { SphereGeometry, Color, Float32BufferAttribute } from "three";
import { GLOBE_RADIUS } from "@/lib/town/globe";
import { TOWN_PALETTE } from "./TownBuildingVisual";

/**
 * How far down from the pole the cap extends (radians from the top).
 *
 * Deliberately WIDE (136°): a shallow slice read as a slab, while a narrow one
 * read as a planet. At 136° the rim sits well below the equator, so the piece
 * presents a broad, gently domed surface — a sand-table you look down onto —
 * while still being a solid display object with a base.
 */
export const CAP_THETA_LENGTH = (124 * Math.PI) / 180;

/** Y coordinate of the cap's rim — also where the display stand meets it. */
export const CAP_RIM_Y = -Math.cos(CAP_THETA_LENGTH) * GLOBE_RADIUS;

/** Rim radius of the cap. */
export const CAP_RIM_RADIUS = Math.sin(CAP_THETA_LENGTH) * GLOBE_RADIUS;

/**
 * Terrain wash, low (rim) to high (pole).
 *
 * Deliberately mid-dark earth tones: the sand-table must read as a solid
 * MODELLED OBJECT placed on the paper page, and buildings sit on it as light
 * paper shapes. A very light terrain washed out against the ivory page and the
 * buildings lost their edges.
 */
const LOW_COLOR = new Color(TOWN_PALETTE.earthDeep);
const MID_COLOR = new Color(TOWN_PALETTE.earth);
const HIGH_COLOR = new Color(TOWN_PALETTE.jade);

/**
 * Mix that maps height (0 at the rim, 1 at the pole) to a terrain colour.
 *
 * Uses smoothstep rather than a raw linear ramp: a linear blend put a visibly
 * hard edge where the two segments met, which read as a seam across the sphere.
 */
function heightToColor(t: number): Color {
  const k = Math.max(0, Math.min(1, t));
  const ease = k * k * (3 - 2 * k); // smoothstep
  const c = new Color();
  if (ease < 0.7) {
    c.copy(LOW_COLOR).lerp(MID_COLOR, ease / 0.7);
  } else {
    c.copy(MID_COLOR).lerp(HIGH_COLOR, (ease - 0.7) / 0.3);
  }
  return c;
}

export function TownTerrain() {
  const geometry = useMemo(() => {
    const geo = new SphereGeometry(
      GLOBE_RADIUS,
      44, // width segments
      24, // height segments
      0, // phiStart
      Math.PI * 2, // phiLength — full revolution
      0, // thetaStart — measured from the +Y pole
      CAP_THETA_LENGTH // thetaLength — how far down the cap reaches
    );

    // Vertex colours: a smooth vertical wash so the terrain is not a flat
    // surface and the visible upper area reads lighter than the base.
    const pos = geo.getAttribute("position");
    const colors: number[] = [];
    for (let i = 0; i < pos.count; i += 1) {
      const y = pos.getY(i); // -1 … 1 on a unit sphere
      // 0 at the rim, 1 at the pole.
      const t = Math.max(0, Math.min(1, (y - CAP_RIM_Y) / (1 - CAP_RIM_Y)));
      const c = heightToColor(t);
      colors.push(c.r, c.g, c.b);
    }
    geo.setAttribute("color", new Float32BufferAttribute(colors, 3));
    return geo;
  }, []);

  return (
    <group>
      {/* Terrain cap */}
      <mesh geometry={geometry}>
        <meshLambertMaterial vertexColors />
      </mesh>

      {/* Rim disc — closes the cap and reads as the model's base plate.
          Slightly deeper in tone than the terrain so the piece has a defined
          edge, like the rim of a physical sand-table. */}
      <mesh position={[0, CAP_RIM_Y, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[CAP_RIM_RADIUS, 44]} />
        <meshLambertMaterial color={TOWN_PALETTE.earth} />
      </mesh>

      {/* Contact shadow — a dark disc with normal alpha, directly below the
          rim. Much cheaper than a shadow map and keeps the frame budget flat. */}
      <mesh
        position={[0, CAP_RIM_Y - 0.006, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <circleGeometry args={[CAP_RIM_RADIUS * 1.1, 44]} />
        <meshBasicMaterial
          color="#2A241C"
          transparent
          opacity={0.1}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
