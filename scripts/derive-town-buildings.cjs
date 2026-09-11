/**
 * LELAN TECHNOLOGY · Town building derivations
 *
 * Phase 1E.4-C — Town Art Pass.
 *
 * Derives all 8 shop building delivery assets from the reference PNGs.
 *
 * ─── WHY MOUNTED PANELS RATHER THAN "TRANSPARENT" CUT-OUTS ────────────────
 *
 * The Phase 1E.4-C brief preferred transparency if it could be extracted
 * safely, and explicitly said: if the source background is complex, DO NOT
 * force a cut-out — fall back to one uniform mounted facade panel, because
 * uniformity beats faked transparency. That is exactly the situation here.
 * Measured on the 8 reference PNGs:
 *
 *   - every file is RGBA, but alpha min = max = 255 across all 8, i.e. the
 *     alpha channel is a fully-opaque filler. There is NO pre-existing
 *     transparency to preserve. (The current delivery WebPs are `VP8`, which
 *     discards alpha entirely.)
 *   - background border standard deviation per image: 18–59. Only 2 of 8 are
 *     anywhere near flat (ai-workshop 18, software-shop 26); the rest are 37–59,
 *     i.e. fully rendered scenes. Threshold segmentation on those would clip
 *     the building or leave fringe.
 *
 * So: all 8 become the SAME artefact — a paper-mounted architectural plate.
 * Uniform by construction, and honest.
 *
 * ─── WHAT THIS SCRIPT DOES ───────────────────────────────────────────────
 *
 * For each building, deterministically:
 *   1. resize to a common panel box (contain, no crop that changes the subject)
 *   2. colour-harmonise toward the LELAN town palette so 8 differently-lit
 *      renders read as one family:
 *        - saturation reduced (kills the off-brand saturated blue / purple /
 *          orange without repainting the buildings)
 *        - blended ~10% into warm ivory (unifies colour temperature)
 *        - a subtle top-left luminance ramp (one consistent light direction)
 *   3. mount on a paper border so every plate shares the same presentation
 *   4. encode WebP at a size budget
 *
 * Deliberately NOT done: watermark removal, cropping that removes subject,
 * redrawing, or inventing architecture. Reference PNGs are only ever read.
 *
 * Deterministic and repeatable. Never writes outside public/images/town/.
 *
 * Usage:  node scripts/derive-town-buildings.cjs
 */

const path = require("path");
const fs = require("fs");
const sharp = require("sharp");

const ROOT = path.resolve(__dirname, "..");
const REF_DIR = path.join(ROOT, "assets/reference/town/buildings");
const OUT_DIR = path.join(ROOT, "public/images/town/buildings");

/** Panel box for the artwork itself (before the paper mount is added). */
const PANEL_W = 640;
const PANEL_H = 480;
/** Paper mount border, in px. */
const MOUNT = 14;

/** LELAN town palette targets. */
const IVORY = { r: 244, g: 240, b: 229 };
const PAPER = { r: 246, g: 242, b: 232 };

/** Colour harmonisation strength. */
/**
 * Saturation reduction. The brief for this pass requires killing the off-brand
 * bright blue / purple / saturated gold in the source renders without repainting
 * the buildings. Measured on the references, 0.72 saturation was far too gentle:
 * the software shop still read as a saturated blue and the 产学研 building as
 * purple, so the 8 plates did not read as one family. 0.42 mutes those hues to
 * the neutral-jade/grey band while leaving form, signage and detail intact.
 */
const SATURATION = 0.30;
/** Luminance ramp strength — one consistent light direction across all 8. */
const TOPLEFT_LIGHT = 0.07;
/**
 * Warm temperature wash. Applied as a low-opacity warm-ivory layer so the eight
 * differently-lit renders converge on the town palette. Kept light: this is
 * grading, not repainting.
 */
const WARM_WASH = 0.2;

/**
 * One entry per shop, in locked number order.
 * `file` is the stable delivery filename (matches the existing 01/02 names).
 */
const BUILDINGS = [
  { no: "01", id: "paper-teahouse", source: "town-paper-teahouse.png", file: "town-paper-teahouse.webp" },
  { no: "02", id: "research-shop", source: "town-research-shop.png", file: "town-research-shop.webp" },
  { no: "03", id: "patent-shop", source: "town-patent-shop.png", file: "town-patent-shop.webp" },
  { no: "04", id: "software-shop", source: "town-software-shop.png", file: "town-software-shop.webp" },
  { no: "05", id: "funding-shop", source: "town-funding-shop.png", file: "town-funding-shop.webp" },
  { no: "06", id: "transfer-shop", source: "town-transfer-shop.png", file: "town-transfer-shop.webp" },
  { no: "07", id: "industry-research-shop", source: "town-industry-research-shop.png", file: "town-industry-research-shop.webp" },
  { no: "08", id: "ai-workshop", source: "town-ai-workshop.png", file: "town-ai-workshop.webp" },
];

/**
 * Light direction + warm temperature wash, as one SVG overlay.
 *
 * The wash is what pulls eight differently-lit renders toward the town palette;
 * the ramp establishes the single upper-left light direction the brief requires
 * (not eight different sources).
 */
function lightRampSvg(w, h) {
  return Buffer.from(
    `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
       <defs>
         <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
           <stop offset="0" stop-color="#ffffff" stop-opacity="${TOPLEFT_LIGHT}"/>
           <stop offset="0.55" stop-color="#ffffff" stop-opacity="0"/>
           <stop offset="1" stop-color="#000000" stop-opacity="${TOPLEFT_LIGHT * 0.75}"/>
         </linearGradient>
       </defs>
       <rect width="${w}" height="${h}" fill="url(#g)"/>
       <rect width="${w}" height="${h}" fill="rgb(${IVORY.r},${IVORY.g},${IVORY.b})" fill-opacity="${WARM_WASH}"/>
     </svg>`
  );
}

async function deriveOne(job) {
  const src = path.join(REF_DIR, job.source);
  if (!fs.existsSync(src)) {
    console.error(`[skip] missing reference: ${path.relative(ROOT, src)}`);
    return null;
  }

  // 1. Contain the reference into the panel box (no subject-destroying crop).
  const fitted = await sharp(src)
    .resize(PANEL_W, PANEL_H, {
      fit: "contain",
      background: { ...PAPER, alpha: 1 },
    })
    .toBuffer();

  // 2. Colour harmonisation + 3. consistent light direction.
  const harmonised = await sharp(fitted)
    .modulate({ saturation: SATURATION })
    .composite([{ input: lightRampSvg(PANEL_W, PANEL_H), blend: "over" }])
    .toBuffer();

  // 4. Mount on paper so every plate shares one presentation.
  const mountW = PANEL_W + MOUNT * 2;
  const mountH = PANEL_H + MOUNT * 2;
  const mounted = await sharp({
    create: { width: mountW, height: mountH, channels: 3, background: PAPER },
  })
    .composite([
      { input: harmonised, left: MOUNT, top: MOUNT },
      // Hairline inner rule — the archive-plate edge used elsewhere in the system.
      {
        input: Buffer.from(
          `<svg width="${mountW}" height="${mountH}" xmlns="http://www.w3.org/2000/svg">
             <rect x="${MOUNT - 1}" y="${MOUNT - 1}" width="${PANEL_W + 2}" height="${PANEL_H + 2}"
                   fill="none" stroke="#8d7c60" stroke-opacity="0.35" stroke-width="1"/>
           </svg>`
        ),
        left: 0,
        top: 0,
      },
    ])
    .png()
    .toBuffer();

  // 5. Encode within the per-asset budget.
  const out = await sharp(mounted).webp({ quality: 78, effort: 5 }).toBuffer();

  fs.mkdirSync(OUT_DIR, { recursive: true });
  const dest = path.join(OUT_DIR, job.file);
  fs.writeFileSync(dest, out);

  const meta = await sharp(dest).metadata();
  return {
    no: job.no,
    file: job.file,
    bytes: out.length,
    width: meta.width,
    height: meta.height,
  };
}

(async () => {
  const results = [];
  for (const job of BUILDINGS) {
    const r = await deriveOne(job);
    if (r) {
      results.push(r);
      console.log(
        `[ok] ${r.no} ${r.file.padEnd(38)} ${String(r.width).padStart(4)}x${String(r.height).padEnd(4)} ${(r.bytes / 1024).toFixed(1)} KB`
      );
    }
  }
  const total = results.reduce((s, r) => s + r.bytes, 0);
  console.log(`\n${results.length}/8 buildings derived. Total ${(total / 1024).toFixed(1)} KB.`);
  if (total > 1024 * 1024) {
    console.warn("WARNING: total delivery exceeds the 1 MB budget.");
  }
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
