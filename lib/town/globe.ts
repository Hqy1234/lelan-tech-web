/**
 * LELAN TECHNOLOGY · Town Globe — spherical coordinate math
 *
 * Phase 1E.4-B.
 *
 * Used by the WebGL renderer only. The 2D fallback keeps using
 * `plot {x, y}` from content/town.ts.
 *
 * Convention (right-handed, +Y = the town's local north pole):
 *   - latitude  0° = equator, +90° = north pole
 *   - longitude 0° = prime meridian, increasing eastward (0–360)
 *   - "north" is -Z, so longitude 0 faces the default camera
 */

import type { TownShopGlobePosition } from "@/content/town";

/** Default sphere radius in scene units. */
export const GLOBE_RADIUS = 1;

export interface Vec3 {
  x: number;
  y: number;
  z: number;
}

/**
 * Convert spherical globe coordinates to a cartesian position.
 *
 * @param pos  latitude / longitude in degrees, plus optional radial elevation
 * @param radius sphere radius (default GLOBE_RADIUS)
 */
export function globeToCartesian(
  pos: TownShopGlobePosition,
  radius: number = GLOBE_RADIUS
): Vec3 {
  const lat = (pos.latitude * Math.PI) / 180;
  const lon = (pos.longitude * Math.PI) / 180;
  const r = radius * (1 + (pos.elevation ?? 0));

  const cosLat = Math.cos(lat);
  return {
    x: r * cosLat * Math.sin(lon),
    y: r * Math.sin(lat),
    z: -r * cosLat * Math.cos(lon),
  };
}

/**
 * Outward surface normal at a spherical position.
 * On a unit sphere with no elevation this equals the normalized position;
 * with elevation the true (slanted) surface normal is returned instead, which
 * is what a building must align to so it does not lean.
 */
export function globeNormal(
  pos: TownShopGlobePosition,
  radius: number = GLOBE_RADIUS
): Vec3 {
  const lat = (pos.latitude * Math.PI) / 180;
  const lon = (pos.longitude * Math.PI) / 180;
  // For a sphere scaled by an elevation factor, the surface normal direction
  // is unchanged from the unit sphere (radial scaling keeps normals radial).
  void radius;
  const cosLat = Math.cos(lat);
  return {
    x: cosLat * Math.sin(lon),
    y: Math.sin(lat),
    z: -cosLat * Math.cos(lon),
  };
}

/**
 * Spherical linear interpolation between two spherical positions.
 * Used to build gentle curved roads along the terrain surface.
 */
export function slerpSpherical(
  a: TownShopGlobePosition,
  b: TownShopGlobePosition,
  t: number,
  radius: number = GLOBE_RADIUS
): Vec3 {
  const va = globeToCartesian({ ...a, elevation: 0 }, 1);
  const vb = globeToCartesian({ ...b, elevation: 0 }, 1);
  const dot = Math.max(-1, Math.min(1, va.x * vb.x + va.y * vb.y + va.z * vb.z));
  const theta = Math.acos(dot);

  let p: Vec3;
  if (theta < 1e-4) {
    p = va;
  } else {
    const sinTheta = Math.sin(theta);
    const wa = Math.sin((1 - t) * theta) / sinTheta;
    const wb = Math.sin(t * theta) / sinTheta;
    p = {
      x: va.x * wa + vb.x * wb,
      y: va.y * wa + vb.y * wb,
      z: va.z * wa + vb.z * wb,
    };
  }

  // Re-project to the requested radius (guards against float drift).
  const len = Math.hypot(p.x, p.y, p.z) || 1;
  const s = radius / len;
  return { x: p.x * s, y: p.y * s, z: p.z * s };
}
