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
 * Phase 1E.4-B1 — widened 124° → 130° to flatten the silhouette. The audit
 * found the 124° version still read as a globe; the extra 6° takes the rim
 * lower (y −0.643 vs −0.559) so the dome is visibly a broad, settled landform
 * sitting on its stand, rather than a sphere floating in space.
 */
export const CAP_THETA_LENGTH = (130 * Math.PI) / 180;

/** Y coordinate of the cap's rim — also where the display stand meets it. */
export const CAP_RIM_Y = -Math.cos(CAP_THETA_LENGTH) * GLOBE_RADIUS;

/** Rim radius of the cap. */
export const CAP_RIM_RADIUS = Math.sin(CAP_THETA_LENGTH) * GLOBE_RADIUS;

/**
 * Display base proportions (Phase 1E.4-B1).
 *
 * After four measured attempts the honest conclusion is that this camera angle
 * cannot show a classic wide display plinth without a rendering artefact, and
 * the reasoning is worth recording:
 *
 *   The base is a horizontal disc at the rim's height (world y = −0.643). A disc
 *   seen from a camera above its plane projects with its FRONT edge *lower* on
 *   screen than its centre, and that offset grows with the disc's radius. Any
 *   disc wide enough to protrude past the dome's silhouette (≥ ~1.25× rim) has a
 *   front edge that lands far enough down the screen to draw a pale band across
 *   the middle of the sand-table — exactly the artefact seen in review.
 *
 * So the base is kept just inside the terrain's rim radius (1.04× / 1.0×). It
 * passes beneath the dome as a shallow foot that reads at the bottom silhouette
 * without crossing the model's face, and the contact shadow below it grounds the
 * piece on the page. A true wide display plinth belongs with the Town Art Pass,
 * where the camera elevation can be reconsidered together with the terrain.
 */
const BASE_TOP_RADIUS = CAP_RIM_RADIUS * 0.83;
const BASE_BOTTOM_RADIUS = CAP_RIM_RADIUS * 0.78;
const BASE_HEIGHT = 0.1;
/** World-Y of the base's top face — flush with the terrain rim. */
const BASE_TOP_Y = CAP_RIM_Y;

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

      {/* Rim disc — closes the cap. Deeper in tone than the terrain so the
          piece has a defined edge where it meets the base. */}
      <mesh position={[0, CAP_RIM_Y, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[CAP_RIM_RADIUS * 1.005, 44]} />
        <meshLambertMaterial color={TOWN_PALETTE.earthDeep} />
      </mesh>

      {/*
        Display base (Phase 1E.4-B1).

        This is the change that stops the piece reading as a floating planet: a
        plain paper-ivory stand whose top face sits just below the dome's widest
        section, so its outer band is visible on both sides. Short (0.14 globe
        radii) and barely tapered, so it reads as a display stand rather than a
        pedestal. No metal, no bevel, no sci-fi ring.
      */}
      <mesh position={[0, BASE_TOP_Y - BASE_HEIGHT / 2, 0]}>
        <cylinderGeometry
          args={[BASE_TOP_RADIUS, BASE_BOTTOM_RADIUS, BASE_HEIGHT, 64]}
        />
        <meshLambertMaterial color={TOWN_PALETTE.paper} />
      </mesh>

      {/* A hairline ink ring on the base's top face — one restrained line that
          reads as a machined edge on a physical model. */}
      <mesh
        position={[0, BASE_TOP_Y + 0.001, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <ringGeometry args={[BASE_TOP_RADIUS * 0.93, BASE_TOP_RADIUS, 64]} />
        <meshBasicMaterial
          color={TOWN_PALETTE.ink}
          transparent
          opacity={0.2}
          depthWrite={false}
        />
      </mesh>

      {/* Contact shadow — a dark disc with normal alpha, directly below the
          base. Much cheaper than a shadow map. */}
      <mesh
        position={[0, BASE_TOP_Y - BASE_HEIGHT - 0.004, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <circleGeometry args={[BASE_BOTTOM_RADIUS * 1.2, 48]} />
        <meshBasicMaterial
          color="#2A241C"
          transparent
          opacity={0.11}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
