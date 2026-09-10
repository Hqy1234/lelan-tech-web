/**
 * Generate derivatives for ONE additional complete shop pair:
 *   town-research-shop (building, 02) + town-lingshu (character, 02)
 *
 * Phase 1C Step 9: max 2 files (one building + its associated character),
 * WebP only, no crop that changes subject meaning, no watermark removal,
 * no new dependencies. Uses sharp which is already in node_modules transitively.
 */

const path = require("path");
const fs = require("fs");
const sharp = require("sharp");

const ROOT = path.resolve(__dirname, "..");

const JOBS = [
  {
    src: path.join(ROOT, "assets/reference/town/buildings/town-research-shop.png"),
    out: path.join(ROOT, "public/images/town/buildings/town-research-shop.webp"),
    targetW: 1200,
  },
  {
    src: path.join(ROOT, "assets/reference/town/characters/town-lingshu.png"),
    out: path.join(ROOT, "public/images/town/characters/town-lingshu.webp"),
    targetW: 800,
  },
];

(async () => {
  for (const job of JOBS) {
    if (!fs.existsSync(job.src)) {
      console.error(`[skip] missing: ${job.src}`);
      continue;
    }
    const buf = await sharp(job.src)
      .resize({ width: job.targetW, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toBuffer();
    fs.mkdirSync(path.dirname(job.out), { recursive: true });
    fs.writeFileSync(job.out, buf);
    console.log(`[ok] ${path.relative(ROOT, job.out)}  (${buf.length} bytes)`);
  }
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
