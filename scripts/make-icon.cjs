const sharp = require('sharp');
const path = require('path');

const SRC = path.join(__dirname, '..', 'public', 'brand', 'logo-light.png');
const OUT = path.join(__dirname, '..', 'app', 'icon.png');
const APPLE = path.join(__dirname, '..', 'app', 'apple-icon.png');

async function build(size, out, pad) {
  const inner = await sharp(SRC)
    .resize({
      width: size - pad * 2,
      height: size - pad * 2,
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();

  await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { r: 0x0e, g: 0x1a, b: 0x14, alpha: 1 },
    },
  })
    .composite([{ input: inner, top: pad, left: pad }])
    .png({ compressionLevel: 9 })
    .toFile(out);
}

Promise.all([build(256, OUT, 26), build(180, APPLE, 18)])
  .then(() => console.log('icons written'))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
