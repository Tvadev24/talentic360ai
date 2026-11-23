/* Element-level screenshots + network/console error report for one route. */
const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const BASE = process.env.BASE || 'http://localhost:3100';
const OUT = process.env.OUT || path.join(__dirname, '..', '.shots');
const ROUTE = process.env.ROUTE || '/';
const SELECTORS = (process.env.SELECTORS || '').split('|').filter(Boolean);
const DARK = process.env.DARK === '1';
const WIDTH = Number(process.env.WIDTH || 1440);

(async () => {
  fs.mkdirSync(OUT, { recursive: true });

  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: 'new',
    args: ['--no-sandbox', '--hide-scrollbars'],
  });

  const page = await browser.newPage();
  const failures = [];
  const errors = [];

  page.on('requestfailed', (r) => failures.push(`${r.failure()?.errorText} ${r.url().slice(0, 140)}`));
  page.on('response', (r) => {
    if (r.status() >= 400) failures.push(`HTTP ${r.status()} ${r.url().slice(0, 140)}`);
  });
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text().slice(0, 220)));
  page.on('pageerror', (e) => errors.push('PAGEERROR ' + String(e).slice(0, 220)));

  await page.setViewport({ width: WIDTH, height: 900 });
  await page.emulateMediaFeatures([
    { name: 'prefers-color-scheme', value: DARK ? 'dark' : 'light' },
  ]);
  await page.evaluateOnNewDocument((d) => {
    try {
      localStorage.setItem('theme', d ? 'dark' : 'light');
    } catch (e) {}
  }, DARK);

  await page.goto(BASE + ROUTE, { waitUntil: 'networkidle2', timeout: 60000 });

  await page.evaluate(async () => {
    const root = document.documentElement;
    root.style.scrollBehavior = 'auto';
    const step = window.innerHeight * 0.6;
    let y = 0;
    for (let g = 0; g < 400; g++) {
      window.scrollTo({ top: y, behavior: 'instant' });
      await new Promise((r) => setTimeout(r, 190));
      if (y >= root.scrollHeight - window.innerHeight) break;
      y += step;
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
    await new Promise((r) => setTimeout(r, 500));
  });

  const tag = DARK ? 'dark' : 'light';

  for (const sel of SELECTORS) {
    const [selector, name] = sel.split('::');
    const el = await page.$(selector);
    if (!el) {
      console.log('NOT FOUND:', selector);
      continue;
    }
    await el.screenshot({ path: path.join(OUT, `${name || selector.replace(/\W+/g, '_')}-${tag}.png`) });
    console.log('shot', selector);
  }

  // Report images that never painted
  const brokenImages = await page.evaluate(() =>
    Array.from(document.images)
      .filter((img) => !img.complete || img.naturalWidth === 0)
      .map((img) => img.currentSrc || img.src)
      .slice(0, 20),
  );

  await browser.close();

  console.log('\n--- failed requests ---');
  console.log([...new Set(failures)].slice(0, 25).join('\n') || 'none');
  console.log('\n--- console errors ---');
  console.log([...new Set(errors)].slice(0, 15).join('\n') || 'none');
  console.log('\n--- broken images ---');
  console.log(brokenImages.join('\n') || 'none');
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
