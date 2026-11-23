const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const SRC = process.argv[2];
const OUT_DIR = process.argv[3];

const INK = { r: 0x14, g: 0x1a, b: 0x1f }; // near-black used on light surfaces

async function build() {
  const base = sharp(SRC).ensureAlpha();
  const { data, info } = await base.raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  const light = Buffer.alloc(width * height * 4); // for dark surfaces: white mark
  const dark = Buffer.alloc(width * height * 4); // for light surfaces: ink mark

  for (let i = 0, p = 0; i < data.length; i += channels, p += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    // Black background -> alpha 0, white/red marks -> alpha 255
    const a = Math.max(r, g, b);

    if (a === 0) {
      light[p] = light[p + 1] = light[p + 2] = light[p + 3] = 0;
      dark[p] = dark[p + 1] = dark[p + 2] = dark[p + 3] = 0;
      continue;
    }

    // Un-premultiply so edges stay clean instead of going grey
    const scale = 255 / a;
    const ur = Math.min(255, Math.round(r * scale));
    const ug = Math.min(255, Math.round(g * scale));
    const ub = Math.min(255, Math.round(b * scale));

    light[p] = ur;
    light[p + 1] = ug;
    light[p + 2] = ub;
    light[p + 3] = a;

    // Neutral (white) pixels become ink; coloured (red) pixels keep their hue
    const maxc = Math.max(ur, ug, ub);
    const minc = Math.min(ur, ug, ub);
    const saturation = maxc === 0 ? 0 : (maxc - minc) / maxc;

    if (saturation < 0.25) {
      dark[p] = INK.r;
      dark[p + 1] = INK.g;
      dark[p + 2] = INK.b;
    } else {
      dark[p] = ur;
      dark[p + 1] = ug;
      dark[p + 2] = ub;
    }
    dark[p + 3] = a;
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });

  const raw = { raw: { width, height, channels: 4 } };

  await sharp(light, raw)
    .trim({ threshold: 1 })
    .resize({ width: 512, height: 512, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9 })
    .toFile(path.join(OUT_DIR, 'logo-light.png')); // white mark, for dark surfaces

  await sharp(dark, raw)
    .trim({ threshold: 1 })
    .resize({ width: 512, height: 512, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9 })
    .toFile(path.join(OUT_DIR, 'logo-dark.png')); // ink mark, for light surfaces

  // Favicon source: mark on brand-dark tile so it reads at small sizes
  await sharp(light, raw)
    .trim({ threshold: 1 })
    .resize({ width: 150, height: 150, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .extend({ top: 29, bottom: 29, left: 29, right: 29, background: { r: 0x0e, g: 0x1a, b: 0x14, alpha: 1 } })
    .png({ compressionLevel: 9 })
    .toFile(path.join(OUT_DIR, 'icon.png'));

  // Also keep a full-bleed original for the hero collage
  await sharp(SRC).resize({ width: 1200 }).jpeg({ quality: 86 }).toFile(path.join(OUT_DIR, 'brandmark-original.jpg'));

  const meta = await sharp(path.join(OUT_DIR, 'logo-dark.png')).metadata();
  console.log('done', meta.width + 'x' + meta.height);
}

build().catch((e) => {
  console.error(e);
  process.exit(1);
});
