const puppeteer = require('puppeteer-core');
const SHOTS = [
  { name: 'hero-vision', sel: '#hero-figure', scrollTo: 0 },
  { name: 'engine-full', sel: '#engine', scrollTo: 4200 },
];
(async () => {
  const b = await puppeteer.launch({
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--hide-scrollbars'],
  });
  const p = await b.newPage();
  await p.setViewport({ width: 1440, height: 900 });
  await p.goto('http://localhost:3100/', { waitUntil: 'networkidle2' });
  await p.evaluate(async () => {
    document.documentElement.style.scrollBehavior = 'auto';
    for (let y = 0; y < 5200; y += 420) {
      window.scrollTo({ top: y, behavior: 'instant' });
      await new Promise((r) => setTimeout(r, 150));
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  });
  await new Promise((r) => setTimeout(r, 2600));
  for (const s of SHOTS) {
    const box = await p.evaluate((sel) => {
      const el = document.querySelector(sel);
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return {
        x: Math.round(r.x + window.scrollX),
        y: Math.round(r.y + window.scrollY),
        width: Math.round(r.width),
        height: Math.round(r.height),
      };
    }, s.sel);
    if (!box) { console.log('missing', s.sel); continue; }
    await p.screenshot({ path: `.shots/${s.name}.png`, clip: box, captureBeyondViewport: true });
    console.log('shot', s.name, JSON.stringify(box));
  }
  await b.close();
})();
