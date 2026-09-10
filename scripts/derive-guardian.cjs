/**
 * Generate delivery derivatives for Guardian assets.
 *
 * Source: assets/reference/guardian/
 * Output: public/images/guardian/
 *
 * All PNGs are ~5MB at 2048px.
 * Resize to display-appropriate sizes for web delivery.
 *
 * Output sizes:
 *   stages: 800px wide (square-ish display)
 *   elements: 600px wide (building thumbnails)
 *   nuwa: 400px wide (small anchor visual)
 */
const path = require("path");
const fs = require("fs");
const sharp = require("sharp");

const ROOT = path.resolve(__dirname, "..");
const REF = path.join(ROOT, "assets/reference/guardian");
const OUT = path.join(ROOT, "public/images/guardian");

const JOBS = [
  // ── 8 lifecycle stages ──
  { src: "stages/stage-01-zhen-infant.png",    out: "stages/stage-01-zhen-infant.webp",    w: 800 },
  { src: "stages/stage-02-xun-child.png",      out: "stages/stage-02-xun-child.webp",      w: 800 },
  { src: "stages/stage-03-li-adolescent.png",  out: "stages/stage-03-li-adolescent.webp",  w: 800 },
  { src: "stages/stage-04-dui-young-adult.png",out: "stages/stage-04-dui-young-adult.webp",w: 800 },
  { src: "stages/stage-05-qian-adult.png",     out: "stages/stage-05-qian-adult.webp",     w: 800 },
  { src: "stages/stage-06-kan-middle-age.png",out: "stages/stage-06-kan-middle-age.webp",w: 800 },
  { src: "stages/stage-07-gen-later-life.png",out: "stages/stage-07-gen-later-life.webp",w: 800 },
  { src: "stages/stage-08-kun-elder.png",      out: "stages/stage-08-kun-elder.webp",      w: 800 },
  // ── 5 five-element buildings ──
  { src: "elements/guardian-wealth-workshop.png",   out: "elements/guardian-wealth-workshop.webp",   w: 600 },
  { src: "elements/guardian-longevity-hall.png",     out: "elements/guardian-longevity-hall.webp",   w: 600 },
  { src: "elements/guardian-cloud-pavilion.png",    out: "elements/guardian-cloud-pavilion.webp",    w: 600 },
  { src: "elements/guardian-harmony-hall.png",      out: "elements/guardian-harmony-hall.webp",      w: 600 },
  { src: "elements/guardian-cuisine-hall.png",      out: "elements/guardian-cuisine-hall.webp",      w: 600 },
  // ── Overview ──
  { src: "overview/guardian-nuwa.png",               out: "overview/guardian-nuwa.webp",              w: 400 },
];

(async () => {
  for (const job of JOBS) {
    const srcPath = path.join(REF, job.src);
    const outPath = path.join(OUT, job.out);
    if (!fs.existsSync(srcPath)) {
      console.warn(`[skip] missing: ${srcPath}`);
      continue;
    }
    const buf = await sharp(srcPath)
      .resize({ width: job.w, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toBuffer();
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, buf);
    const kb = (buf.length / 1024).toFixed(1);
    console.log(`[ok] ${job.out}  (${kb}KB)`);
  }
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
