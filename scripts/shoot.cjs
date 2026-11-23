/* Visual QA: screenshots of every route, light + dark, desktop + mobile. */
const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const BASE = process.env.BASE || 'http://localhost:3100';
const OUT = process.env.OUT || path.join(__dirname, '..', '.shots');

const ROUTES = (process.env.ROUTES || '/,/about,/programs,/programs/academic,/why-us,/contact,/privacy-policy,/admin,/nope')
  .split(',')
  .filter(Boolean);

const slug = (r) => (r === '/' ? 'home' : r.replace(/^\//, '').replace(/\//g, '-'));

async function shoot(page, route, name, { dark, full, width, height }) {
  await page.setViewport({ width, height, deviceScaleFactor: 1 });
  await page.emulateMediaFeatures([
    { name: 'prefers-color-scheme', value: dark ? 'dark' : 'light' },
  ]);
  await page.evaluateOnNewDocument((d) => {
    try {
      localStorage.setItem('theme', d ? 'dark' : 'light');
    } catch (e) {}
  }, dark);

  await page.goto(BASE + route, { waitUntil: 'networkidle2', timeout: 60000 });

  // Let scroll-triggered reveals run, then settle at the top.
  await page.evaluate(async () => {
    const root = document.documentElement;
    const previous = root.style.scrollBehavior;
    root.style.scrollBehavior = 'auto';

    const step = window.innerHeight * 0.6;
    let y = 0;
    for (let guard = 0; guard < 400; guard++) {
      window.scrollTo({ top: y, behavior: 'instant' });
      await new Promise((r) => setTimeout(r, 190));
      if (y >= root.scrollHeight - window.innerHeight) break;
      y += step;
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
    await new Promise((r) => setTimeout(r, 500));
    root.style.scrollBehavior = previous;
  });

  // Wait until every image has actually decoded before capturing.
  await page
    .waitForFunction(
      () => Array.from(document.images).every((img) => img.complete && img.naturalWidth > 0),
      { timeout: 45000, polling: 400 },
    )
    .catch(() => console.log('  (timed out waiting for images on ' + name + ')'));

  await new Promise((r) => setTimeout(r, 900));
  await page.screenshot({ path: path.join(OUT, name + '.png'), fullPage: full });
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });

  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: 'new',
    args: ['--no-sandbox', '--disable-dev-shm-usage', '--hide-scrollbars'],
  });

  const page = await browser.newPage();
  page.on('console', (m) => {
    if (m.type() === 'error') console.log('[console error]', m.text().slice(0, 200));
  });
  page.on('pageerror', (e) => console.log('[page error]', String(e).slice(0, 200)));

  const mode = process.env.MODE || 'all';

  for (const route of ROUTES) {
    const s = slug(route);
    if (mode === 'all' || mode === 'desktop') {
      await shoot(page, route, `${s}-light`, { dark: false, full: true, width: 1440, height: 900 });
      await shoot(page, route, `${s}-dark`, { dark: true, full: true, width: 1440, height: 900 });
    }
    if (mode === 'all' || mode === 'mobile') {
      await shoot(page, route, `${s}-mobile`, { dark: false, full: true, width: 390, height: 844 });
    }
    console.log('shot', route);
  }

  await browser.close();
  console.log('done ->', OUT);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
