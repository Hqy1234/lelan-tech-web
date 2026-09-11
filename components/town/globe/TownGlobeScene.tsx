/**
 * LELAN TECHNOLOGY · Town Globe — 3D scene
 *
 * Phase 1E.4-B · "LELAN TOWN GLOBE" — an eastern miniature sand-table, NOT a
 * planet. No continents, no country borders, no lat/lon graticule, no
 * satellite imagery, no orbit lines, no starfield, no space background.
 *
 * Rotation model: we rotate the WORLD (the town group), not an orbiting
 * camera. Dragging therefore feels like turning a physical sand-table model by
 * hand. The camera is a fixed perspective view slightly above the horizon, so
 * the user sees the upper surface plus the near building facades.
 *
 * Interaction contract:
 *   - drag (mouse / touch)  -> yaw + clamped pitch on the world
 *   - wheel                 -> NOT captured; the page keeps scrolling
 *   - click a node          -> onSelect(shop.id)
 *   - selectedId changes    -> world eases so that shop comes to front-centre
 *   - no auto-rotation, ever
 *
 * Implementation note: the animation state lives on the rotating three.js
 * Group (`userData`), not in React refs threaded through props. Mutating a
 * three.js object inside `useFrame` is the idiomatic R3F pattern and keeps the
 * frame loop free of React re-renders.
 */

import { useCallback, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  CatmullRomCurve3,
  DoubleSide,
  Group,
  Quaternion,
  TubeGeometry,
  Vector3,
} from "three";
import type { TownShop } from "@/content/town";
import {
  GLOBE_RADIUS,
  globeNormal,
  globeToCartesian,
  slerpSpherical,
} from "@/lib/town/globe";
import { TOWN_PALETTE, TownBuildingVisual } from "./TownBuildingVisual";
import { TownTerrain } from "./TownTerrain";

/* Tuning */

/**
 * Yaw applied so the selected shop faces front-centre.
 *
 * Derivation: a longitude L sits at world (sin L, ., -cos L) before rotation.
 * Rotating yaw by a maps it to (sin(L+a), ., -cos(L+a)); we want +Z (toward the
 * camera), i.e. L + a = PI, so a = PI - L. At L = 0 (shop 01) this is PI, which
 * reproduces the initial view: the town centre already faces the camera.
 */
export const FRONT_YAW_OFFSET = Math.PI;
/** Pitch kept when focusing a shop - a slight tilt preserves world context. */
const FOCUS_PITCH = 0.16;
/** Pitch clamp: never let the world flip over and reveal its underside. */
const MAX_PITCH = 0.62;
const MIN_PITCH = -0.4;
/** Selection tween length. Spec: 500-900ms, ease-out. */
const TWEEN_MS = 700;
/** Drag sensitivity (radians per pixel). */
const YAW_PER_PX = 0.008;
const PITCH_PER_PX = 0.006;
/** Movement beyond this many pixels counts as a drag, not a click. */
const DRAG_THRESHOLD_PX = 5;

const DEFAULT_SHOP_ID = "paper-teahouse";

/** Per-frame motion state, stored on the world group. */
interface WorldMotion {
  yaw: number;
  pitch: number;
  targetYaw: number;
  targetPitch: number;
  tweening: boolean;
}

function getMotion(group: Group): WorldMotion {
  const data = group.userData as { motion?: WorldMotion };
  if (!data.motion) {
    data.motion = {
      yaw: 0,
      pitch: FOCUS_PITCH,
      targetYaw: 0,
      targetPitch: FOCUS_PITCH,
      tweening: true,
    };
  }
  return data.motion;
}

/** Yaw that brings a shop's longitude to front-centre, normalised to (-PI, PI]. */
export function yawForLongitude(longitudeDeg: number): number {
  const raw = FRONT_YAW_OFFSET - (longitudeDeg * Math.PI) / 180;
  return (((raw + Math.PI) % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2) - Math.PI;
}

/* Roads */

/**
 * FIVE town roads, drawn as thin tubes following great-circle arcs on the
 * terrain.
 *
 * These are literal streets between neighbouring plots, NOT a data graph. They
 * are deliberately few and hub-free: an earlier draft linked six pairs through
 * the town centre, which read as a network diagram. No plot connects to more
 * than two roads.
 */
function TownRoads({ shops }: { shops: ReadonlyArray<TownShop> }) {
  const geometries = useMemo(() => {
    const byId = new Map(shops.map((s) => [s.id, s]));
    const links: ReadonlyArray<readonly [TownShop["id"], TownShop["id"]]> = [
      // West research cluster
      ["patent-shop", "paper-teahouse"],
      ["paper-teahouse", "research-shop"],
      // The eastern / southern chain
      ["research-shop", "software-shop"],
      ["software-shop", "industry-research-shop"],
      ["industry-research-shop", "transfer-shop"],
    ];

    const RIDE = GLOBE_RADIUS * 1.004; // lift slightly off the surface
    const out: TubeGeometry[] = [];

    for (const [aId, bId] of links) {
      const a = byId.get(aId);
      const b = byId.get(bId);
      if (!a || !b) continue;

      const points: Vector3[] = [];
      const STEPS = 26;
      for (let i = 0; i <= STEPS; i += 1) {
        const t = i / STEPS;
        const p = slerpSpherical(a.globe, b.globe, t, RIDE);
        points.push(new Vector3(p.x, p.y, p.z));
      }

      const curve = new CatmullRomCurve3(points);
      out.push(new TubeGeometry(curve, 22, 0.0035, 5, false));
    }
    return out;
  }, [shops]);

  return (
    <group>
      {geometries.map((geo, i) => (
        <mesh key={i} geometry={geo}>
          <meshLambertMaterial color={TOWN_PALETTE.earthDeep} />
        </mesh>
      ))}
    </group>
  );
}

/* Shops */

function ShopNode({
  shop,
  index,
  selected,
  position,
  orientation,
  onSelect,
}: {
  shop: TownShop;
  index: number;
  selected: boolean;
  position: Vector3;
  orientation: Quaternion;
  onSelect: (id: string) => void;
}) {
  const handleOver = useCallback(() => {
    document.body.style.cursor = "pointer";
  }, []);
  const handleOut = useCallback(() => {
    document.body.style.cursor = "";
  }, []);

  return (
    <group position={position} quaternion={orientation}>
      <TownBuildingVisual
        shop={shop}
        selected={selected}
        variantIndex={index}
      />

      {/* Invisible, generous hit target over the plinth + massing, so the node
          stays easy to click/tap on a small globe. */}
      <mesh
        position={[0, 0.045, 0]}
        onPointerDown={(e) => {
          // Stop the drag handler from starting on a node press.
          e.stopPropagation();
        }}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(shop.id);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          handleOver();
        }}
        onPointerOut={handleOut}
      >
        <cylinderGeometry args={[0.058, 0.058, 0.09, 8]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      {/* Base marker ring - cinnabar when selected, faint ink otherwise.
          Restrained: no neon glow. */}
      <mesh position={[0, 0.004, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.052, 0.062, 16]} />
        <meshBasicMaterial
          color={selected ? TOWN_PALETTE.cinnabar : TOWN_PALETTE.ink}
          transparent
          opacity={selected ? 0.95 : 0.3}
          side={DoubleSide}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

/* Projected HTML label */

/**
 * The selected shop's label.
 *
 * Placement matters here: this component calls `useFrame`/`useThree`, so it
 * MUST live inside <Canvas>. It therefore renders no HTML itself — it writes a
 * screen-space transform onto a DOM node that is portalled in from outside the
 * canvas. Putting it outside the Canvas throws
 * "R3F: Hooks can only be used within the Canvas component!".
 *
 * Why not drei's <Html>: it pulls a significant amount of extra code into the
 * three chunk for one small badge. Since only ONE label is shown at a time,
 * projecting the point by hand is trivial and keeps the WebGL payload to
 * three + R3F only.
 *
 * The label is real HTML, so it inherits the site fonts and stays selectable;
 * it is never rendered as unreadable canvas glyphs.
 */
function SelectedLabelProjector({
  shops,
  selectedId,
  worldRef,
  labelRef,
}: {
  shops: ReadonlyArray<TownShop>;
  selectedId: string;
  worldRef: React.RefObject<Group | null>;
  labelRef: React.RefObject<HTMLDivElement | null>;
}) {
  const { camera, size } = useThree();
  const scratch = useMemo(() => new Vector3(), []);

  const shop = useMemo(
    () => shops.find((s) => s.id === selectedId) ?? shops[0],
    [shops, selectedId]
  );

  /** Local position of the label, just above the selected building. */
  const local = useMemo(() => {
    if (!shop) return new Vector3();
    const p = globeToCartesian(shop.globe, GLOBE_RADIUS * 1.24);
    return new Vector3(p.x, p.y, p.z);
  }, [shop]);

  useFrame(() => {
    const world = worldRef.current;
    const el = labelRef.current;
    if (!world || !el) return;

    // Local -> world (honours the current world rotation) -> clip -> NDC.
    scratch.copy(local).applyMatrix4(world.matrixWorld);
    scratch.project(camera);

    const onScreen =
      scratch.z > -1 &&
      scratch.z < 1 &&
      Math.abs(scratch.x) < 1.2 &&
      Math.abs(scratch.y) < 1.2;

    if (!onScreen) {
      el.style.opacity = "0";
      return;
    }

    const x = (scratch.x * 0.5 + 0.5) * size.width;
    const y = (-scratch.y * 0.5 + 0.5) * size.height;
    el.style.opacity = "1";
    el.style.transform = `translate(-50%, -100%) translate(${x}px, ${y}px)`;
  });

  return null;
}

/** The label's DOM node — rendered outside the canvas, positioned by the projector. */
function SelectedLabelNode({
  shops,
  selectedId,
  labelRef,
}: {
  shops: ReadonlyArray<TownShop>;
  selectedId: string;
  labelRef: React.RefObject<HTMLDivElement | null>;
}) {
  const shop = shops.find((s) => s.id === selectedId) ?? shops[0];
  if (!shop) return null;

  return (
    <div
      ref={labelRef}
      className="pointer-events-none absolute left-0 top-0 whitespace-nowrap rounded-sm border border-ink/25 bg-paper-pure/95 px-2 py-0.5 text-center transition-opacity duration-200"
      style={{ opacity: 0 }}
    >
      <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
        {shop.number}
      </span>
      <span className="ml-1.5 font-serif text-xs leading-tight text-ink">
        {shop.name}
      </span>
    </div>
  );
}

/* Fixed camera */

/**
 * Camera configuration.
 *
 * Phase 1E.4-B1 — reframed twice over, driven by measurement not guesswork.
 *
 * Problem found in the final audit: at 1440×900 the Town section header takes
 * ~379px, so the stage (then 560px) ran past the 900px fold and the sand-table's
 * base was cut off. Fixing that needed BOTH a shorter stage (now
 * `min(54vh, 500px)`) AND a camera that fits the whole model inside the shorter
 * frame at a sensible size.
 *
 * Framing was measured from the rendered pixels rather than estimated: with
 * d = 4.9 the model occupied only 314px of a 486px canvas (65%), leaving 84px
 * above and 88px below empty. The camera is now pulled in to d = 3.85 so the
 * piece fills ~91% of the canvas height — it reads as a display model rather
 * than a small object adrift in a large frame.
 *
 * Framing maths (34° vertical FOV, 678×486 canvas, d = 3.85):
 *   vertical half-frame at the model            →  ±0.390
 *   dome top       y = +1.000 → +0.321  (fits, 18% headroom)
 *   stand bottom   y = −0.504 → −0.331  (fits, 15% footroom)
 *
 * `lookAt` y = 0.02 is the assembled object's real vertical centre
 * (dome top +1.0, stand foot ≈ −0.50) — aiming at the dome's origin pushed the
 * model low in frame and was the original cause of the clipping.
 *
 * FOV 34 stays inside the specified 30–45 range; still not a wide angle.
 */
const CAMERA_CONFIG = {
  fov: 34,
  near: 0.1,
  far: 100,
  position: [0, 1.13, 3.85] as [number, number, number],
};

/**
 * Forces the initial paint.
 *
 * `frameloop="demand"` never renders on its own, and the first `invalidate()`
 * can land before the renderer has finished sizing itself. We therefore
 * invalidate on mount AND once more on the next frame, which guarantees the
 * sand-table is painted immediately and then goes completely idle (zero frames
 * while the user is not interacting).
 */
function InitialRender() {
  const { invalidate } = useThree();
  useEffect(() => {
    invalidate();
    const id = requestAnimationFrame(() => invalidate());
    const t = setTimeout(() => invalidate(), 120);
    return () => {
      cancelAnimationFrame(id);
      clearTimeout(t);
    };
  }, [invalidate]);
  return null;
}

/**
 * Drives the world's yaw/pitch each frame.
 *
 * ⚠ This MUST be a child of <Canvas>, never the component that renders the
 * Canvas: `useFrame`/`useThree` only work inside the R3F root. Calling them in
 * the outer component throws
 * "R3F: Hooks can only be used within the Canvas component!".
 */
function WorldController({
  worldRef,
  wrapperRef,
  shops,
  selectedId,
  reducedMotion,
}: {
  worldRef: React.RefObject<Group | null>;
  wrapperRef: React.RefObject<HTMLDivElement | null>;
  shops: ReadonlyArray<TownShop>;
  selectedId: string;
  reducedMotion: boolean;
}) {
  const { invalidate } = useThree();

  /* Idle-driven tween: runs only while `tweening` is set. */
  useFrame((state, delta) => {
    const g = worldRef.current;
    if (!g) return;
    const motion = getMotion(g);

    if (motion.tweening) {
      // Framerate-independent exponential ease-out.
      const k = 1 - Math.pow(0.0016, Math.min(delta, 0.05) / (TWEEN_MS / 1000));
      motion.yaw += (motion.targetYaw - motion.yaw) * k;
      motion.pitch += (motion.targetPitch - motion.pitch) * k;

      if (
        Math.abs(motion.targetYaw - motion.yaw) < 0.0015 &&
        Math.abs(motion.targetPitch - motion.pitch) < 0.0015
      ) {
        motion.yaw = motion.targetYaw;
        motion.pitch = motion.targetPitch;
        motion.tweening = false;
      }
      // Keep frames coming until the tween settles, then stop entirely.
      state.invalidate();
    }

    g.rotation.set(motion.pitch, motion.yaw, 0);
  });

  /**
   * Drag to rotate.
   *
   * ⚠ This MUST live inside <Canvas>: with `frameloop="demand"` a drag that
   * only mutates rotation values would never repaint, because nothing asks R3F
   * for a frame. Calling `invalidate()` on every pointer move is what makes the
   * world actually follow the hand. (An earlier version attached the listeners
   * outside the Canvas and therefore updated state without ever re-rendering.)
   *
   * Wheel is deliberately NOT handled: the page must keep scrolling and this
   * phase provides no zoom.
   */
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    let dragging = false;
    let moved = 0;
    let lastX = 0;
    let lastY = 0;

    const onDown = (e: PointerEvent) => {
      // Primary button / first touch only.
      if (e.button !== 0 && e.pointerType === "mouse") return;
      dragging = true;
      moved = 0;
      lastX = e.clientX;
      lastY = e.clientY;
      // Avoid selecting text or dragging the canvas image while rotating.
      document.body.style.userSelect = "none";
      // Stop any running rotate-to so the hand wins immediately.
      const g = worldRef.current;
      if (g) getMotion(g).tweening = false;
    };

    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      const g = worldRef.current;
      if (!g) return;

      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      moved += Math.abs(dx) + Math.abs(dy);
      if (moved <= DRAG_THRESHOLD_PX) return;

      e.preventDefault();
      const motion = getMotion(g);
      motion.yaw += dx * YAW_PER_PX;
      motion.pitch = Math.max(
        MIN_PITCH,
        Math.min(MAX_PITCH, motion.pitch + dy * PITCH_PER_PX)
      );
      // Mirror into the tween targets so releasing the drag does not snap back.
      motion.targetYaw = motion.yaw;
      motion.targetPitch = motion.pitch;
      motion.tweening = false;
      // Demand mode: without this the world would not repaint during the drag.
      invalidate();
    };

    const endDrag = () => {
      if (!dragging) return;
      dragging = false;
      document.body.style.userSelect = "";
    };

    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove, { passive: false });
    el.addEventListener("pointerup", endDrag);
    el.addEventListener("pointercancel", endDrag);
    el.addEventListener("pointerleave", endDrag);

    return () => {
      document.body.style.userSelect = "";
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", endDrag);
      el.removeEventListener("pointercancel", endDrag);
      el.removeEventListener("pointerleave", endDrag);
    };
  }, [worldRef, wrapperRef, invalidate]);

  /* Selection -> rotate the world so the shop comes to front-centre. */
  useEffect(() => {
    const g = worldRef.current;
    if (!g) return;
    const shop =
      shops.find((s) => s.id === selectedId) ??
      shops.find((s) => s.id === DEFAULT_SHOP_ID) ??
      shops[0];
    if (!shop) return;

    const motion = getMotion(g);
    motion.targetYaw = yawForLongitude(shop.globe.longitude);
    motion.targetPitch = FOCUS_PITCH;

    if (reducedMotion) {
      motion.yaw = motion.targetYaw;
      motion.pitch = motion.targetPitch;
      motion.tweening = false;
      invalidate();
    } else {
      motion.tweening = true;
      invalidate();
    }
  }, [worldRef, shops, selectedId, reducedMotion, invalidate]);

  return null;
}

/* Scene */

export interface TownGlobeSceneProps {
  shops: ReadonlyArray<TownShop>;
  selectedId: string;
  onSelect: (id: string) => void;
  /** Reduced-motion users get instant orientation changes (no tween). */
  reducedMotion: boolean;
  /** Invoked when the WebGL context is lost or the scene fails. */
  onFailure: () => void;
}

export function TownGlobeScene({
  shops,
  selectedId,
  onSelect,
  reducedMotion,
  onFailure,
}: TownGlobeSceneProps) {
  const worldRef = useRef<Group>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  /* ── WebGL context loss -> hand control back to the 2D fallback ──────── */
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const canvas = el.querySelector("canvas");
    if (!canvas) return;

    const onLost = (event: Event) => {
      event.preventDefault();
      onFailure();
    };
    canvas.addEventListener("webglcontextlost", onLost, false);
    return () => canvas.removeEventListener("webglcontextlost", onLost, false);
  }, [onFailure]);

  /* ── Precompute shop transforms ─────────────────────────────────────── */
  const nodes = useMemo(
    () =>
      shops.map((shop, index) => {
        const p = globeToCartesian(shop.globe, GLOBE_RADIUS);
        const n = globeNormal(shop.globe, GLOBE_RADIUS);
        const up = new Vector3(0, 1, 0);
        const normal = new Vector3(n.x, n.y, n.z).normalize();
        const orientation = new Quaternion().setFromUnitVectors(up, normal);
        return {
          shop,
          index,
          position: new Vector3(p.x, p.y, p.z),
          orientation,
        };
      }),
    [shops]
  );

  return (
    <div
      ref={wrapperRef}
      className="lelan-globe-stage absolute inset-0"
      role="presentation"
      aria-hidden="true"
    >
      <Canvas
        frameloop="demand"
        dpr={[1, 1.5]}
        camera={CAMERA_CONFIG}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        onCreated={({ camera, gl }) => {
          // Transparent clear so the CSS sand-table atmosphere shows through.
          gl.setClearAlpha(0);
          // Aim at the assembled object's vertical centre (dome top + display
          // base), not the dome's geometric origin — see CAMERA_CONFIG notes.
          camera.lookAt(0, 0.02, 0);
        }}
        fallback={null}
      >
        <InitialRender />

        {/* Drives the world rotation. Must live inside <Canvas>. */}
        <WorldController
          worldRef={worldRef}
          wrapperRef={wrapperRef}
          shops={shops}
          selectedId={selectedId}
          reducedMotion={reducedMotion}
        />

        {/* Simple baked-looking lighting. No HDR, no environment map, no
            bloom, no SSAO, no god rays. */}
        <ambientLight intensity={1.05} color="#FFFDF6" />
        <directionalLight
          position={[2.4, 3.2, 2.2]}
          intensity={1.5}
          color="#FFF6E4"
        />
        <directionalLight
          position={[-2.2, 1.1, -1.6]}
          intensity={0.42}
          color="#DCE6DC"
        />

        <group ref={worldRef}>
          <TownTerrain />
          <TownRoads shops={shops} />
          {nodes.map(({ shop, index, position, orientation }) => (
            <ShopNode
              key={shop.id}
              shop={shop}
              index={index}
              selected={shop.id === selectedId}
              position={position}
              orientation={orientation}
              onSelect={onSelect}
            />
          ))}
        </group>

        {/* MUST be inside <Canvas>: it uses R3F hooks. It projects the
            selected shop's position and drives the HTML label below. */}
        <SelectedLabelProjector
          shops={shops}
          selectedId={selectedId}
          worldRef={worldRef}
          labelRef={labelRef}
        />
      </Canvas>

      {/* The selected shop's label: real HTML over the canvas, positioned by
          the projector above. Only ONE label is ever shown, so eight badges
          never blanket the sand-table. */}
      <SelectedLabelNode
        shops={shops}
        selectedId={selectedId}
        labelRef={labelRef}
      />
    </div>
  );
}
