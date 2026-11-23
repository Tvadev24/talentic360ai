/* Sweeps every route at several widths and reports anything that stayed
   invisible, overflowed horizontally, failed to load, or logged an error. */
const puppeteer = require('puppeteer-core');

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const BASE = process.env.BASE || 'http://localhost:3100';

const ROUTES = [
  '/',
  '/about',
  '/programs',
  '/programs/academic',
  '/programs/vocational',
  '/programs/corporate',
  '/programs/government',
  '/programs/post-graduate',
  '/programs/volunteering',
  '/programs/remote',
  '/why-us',
  '/contact',
  '/privacy-policy',
  '/terms-of-service',
  '/admin',
  '/this-route-does-not-exist',
];

const WIDTHS = [390, 768, 1440];

(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: 'new',
    args: ['--no-sandbox', '--hide-scrollbars'],
  });

  let problems = 0;

  for (const width of WIDTHS) {
    const page = await browser.newPage();
    const errors = [];
    const bad = [];
    page.on('console', (m) => m.type() === 'error' && errors.push(m.text().slice(0, 160)));
    page.on('pageerror', (e) => errors.push('PAGEERROR ' + String(e).slice(0, 160)));
    page.on('response', (r) => {
      if (r.status() >= 400 && !r.url().includes('this-route-does-not-exist')) {
        bad.push(`HTTP ${r.status()} ${r.url().slice(0, 110)}`);
      }
    });

    await page.setViewport({ width, height: 900 });

    for (const route of ROUTES) {
      errors.length = 0;
      bad.length = 0;

      await page.goto(BASE + route, { waitUntil: 'networkidle2', timeout: 60000 });
      await page.evaluate(async () => {
        document.documentElement.style.scrollBehavior = 'auto';
        const root = document.documentElement;
        const step = window.innerHeight * 0.5;
        let y = 0;
        for (let g = 0; g < 900; g++) {
          window.scrollTo({ top: y, behavior: 'instant' });
          await new Promise((r) => setTimeout(r, 70));
          if (y >= root.scrollHeight - window.innerHeight) break;
          y += step;
        }
        window.scrollTo({ top: 0, behavior: 'instant' });
        await new Promise((r) => setTimeout(r, 900));
      });

      await page
        .waitForFunction(
          () =>
            Array.from(document.images)
              .filter((img) => getComputedStyle(img).display !== 'none')
              .every((img) => img.complete && img.naturalWidth > 0),
          { timeout: 40000, polling: 400 },
        )
        .catch(() => {});

      const report = await page.evaluate(() => {
        const hidden = [];
        const describe = (el) => {
          const cls = typeof el.className === 'string' ? el.className : el.getAttribute('class') || '';
          return `${el.tagName.toLowerCase()}.${cls}`.slice(0, 70);
        };
        document.querySelectorAll('main *, footer *').forEach((el) => {
          const cs = getComputedStyle(el);
          if (cs.display === 'none' || cs.visibility === 'hidden') return;
          const rect = el.getBoundingClientRect();
          if (rect.width === 0 && rect.height === 0) return;
          const desc = describe(el);
          // opacity-0 that only shows on hover is intentional
          const intentional = /\bopacity-0\b/.test(desc) || el.closest('[aria-hidden="true"]');
          if (parseFloat(cs.opacity) < 0.08 && !intentional) hidden.push('opacity:' + desc);
          if (cs.clipPath && /100%/.test(cs.clipPath)) hidden.push('clip:' + desc);
        });

        const brokenImages = Array.from(document.images)
          .filter((img) => getComputedStyle(img).display !== 'none')
          .filter((img) => !img.complete || img.naturalWidth === 0)
          .map((img) => (img.currentSrc || img.src).slice(0, 110));

        return {
          hidden: [...new Set(hidden)].slice(0, 6),
          brokenImages: [...new Set(brokenImages)].slice(0, 6),
          overflow: document.documentElement.scrollWidth - window.innerWidth,
          title: document.title,
          h1: document.querySelectorAll('h1').length,
        };
      });

      const issues = [];
      if (report.hidden.length) issues.push('HIDDEN ' + report.hidden.join(' | '));
      if (report.brokenImages.length) issues.push('BROKEN_IMG ' + report.brokenImages.join(' | '));
      if (report.overflow > 1) issues.push('H_OVERFLOW ' + report.overflow + 'px');
      if (report.h1 !== 1) issues.push('H1_COUNT ' + report.h1);
      if (errors.length) issues.push('CONSOLE ' + errors.slice(0, 2).join(' | '));
      if (bad.length) issues.push('REQ ' + bad.slice(0, 2).join(' | '));

      if (issues.length) {
        problems += issues.length;
        console.log(`\n[${width}] ${route}`);
        issues.forEach((i) => console.log('   ! ' + i));
      } else {
        console.log(`[${width}] ${route}  ok  "${report.title.slice(0, 48)}"`);
      }
    }

    await page.close();
  }

  await browser.close();
  console.log('\n=== problems: ' + problems + ' ===');
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
