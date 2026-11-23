/* Exercises the interactive paths: menus, theme, form, admin flow. */
const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const BASE = process.env.BASE || 'http://localhost:3100';
const OUT = path.join(__dirname, '..', '.shots', 'ix');

const log = (label, ok, extra = '') =>
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}${extra ? '  — ' + extra : ''}`);

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: 'new',
    args: ['--no-sandbox', '--hide-scrollbars'],
  });

  /* ---------------- desktop: programs dropdown ---------------- */
  {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(BASE + '/', { waitUntil: 'networkidle2' });

    const navLink = await page.$$eval('header nav a', (as) =>
      as.findIndex((a) => a.textContent.trim().startsWith('Programs')),
    );
    const links = await page.$$('header nav a');
    await links[navLink].hover();
    await new Promise((r) => setTimeout(r, 700));

    const items = await page.$$eval('header nav a', (as) => as.map((a) => a.textContent.trim()));
    const hasDropdown = items.some((t) => t.includes('Post-Graduate'));
    log('desktop programs mega-menu opens', hasDropdown);
    await page.screenshot({ path: path.join(OUT, 'dropdown.png'), clip: { x: 0, y: 0, width: 1440, height: 420 } });
    await page.close();
  }

  /* ---------------- mobile: menu panel ---------------- */
  {
    const page = await browser.newPage();
    await page.setViewport({ width: 390, height: 844 });
    await page.goto(BASE + '/', { waitUntil: 'networkidle2' });
    await page.click('button[aria-label="Open menu"]');
    await new Promise((r) => setTimeout(r, 900));
    const visible = await page.$$eval('a', (as) =>
      as.filter(
        (a) => a.textContent.includes('Why Us') && a.getBoundingClientRect().width > 0,
      ).length,
    );
    log('mobile menu panel opens', visible > 0);
    await page.screenshot({ path: path.join(OUT, 'mobile-menu.png') });
    await page.click('button[aria-label="Close menu"]');
    await new Promise((r) => setTimeout(r, 600));
    await page.close();
  }

  /* ---------------- theme toggle persists ---------------- */
  {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(BASE + '/', { waitUntil: 'networkidle2' });
    const before = await page.evaluate(() => document.documentElement.classList.contains('dark'));
    await page.click('button[aria-label*="theme"]');
    await new Promise((r) => setTimeout(r, 500));
    const after = await page.evaluate(() => document.documentElement.classList.contains('dark'));
    const stored = await page.evaluate(() => localStorage.getItem('theme'));
    log('theme toggle flips', before !== after, `${before} -> ${after}`);
    log('theme persisted to storage', stored === (after ? 'dark' : 'light'), String(stored));

    await page.goto(BASE + '/about', { waitUntil: 'networkidle2' });
    const kept = await page.evaluate(() => document.documentElement.classList.contains('dark'));
    log('theme survives navigation', kept === after);
    await page.close();
  }

  /* ---------------- contact form -> admin dashboard ---------------- */
  {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 1000 });
    await page.goto(BASE + '/contact', { waitUntil: 'networkidle2' });

    await page.type('#name', 'Priya Sharma');
    await page.type('#email', 'priya@example.com');
    await page.type('#phone', '+91 98765 43210');
    await page.select('#program', 'corporate');
    await page.type('#message', 'We need a leadership programme for 40 managers in Q1.');
    await page.click('button[type="submit"]');
    await new Promise((r) => setTimeout(r, 1200));

    const toast = await page.$eval('[role="status"]', (el) => el.textContent).catch(() => '');
    log('contact form shows confirmation', /Message Sent Successfully/.test(toast), toast.slice(0, 60));

    const stored = await page.evaluate(() => {
      const raw = localStorage.getItem('talentic_submissions');
      return raw ? JSON.parse(raw) : [];
    });
    log('submission stored', stored.length === 1 && stored[0].program === 'corporate');

    const cleared = await page.$eval('#name', (el) => el.value);
    log('form resets after submit', cleared === '', JSON.stringify(cleared));

    await page.screenshot({ path: path.join(OUT, 'form-toast.png'), clip: { x: 0, y: 0, width: 1440, height: 1000 } });

    /* admin: wrong then right credentials */
    await page.goto(BASE + '/admin', { waitUntil: 'networkidle2' });
    await page.type('#username', 'admin');
    await page.type('#password', 'wrong-password');
    await page.click('button[type="submit"]');
    await new Promise((r) => setTimeout(r, 800));
    const denied = await page.$eval('[role="status"]', (el) => el.textContent).catch(() => '');
    log('admin rejects bad credentials', /Access Denied/.test(denied), denied.slice(0, 40));

    await page.evaluate(() => {
      document.querySelector('#password').value = '';
    });
    await page.click('#password', { clickCount: 3 });
    await page.type('#password', 'admin123');
    await page.click('button[type="submit"]');
    await new Promise((r) => setTimeout(r, 2000));

    const url = page.url();
    log('admin login redirects to dashboard', url.endsWith('/admin/dashboard'), url);

    const rowText = await page
      .$eval('table tbody tr', (tr) => tr.textContent)
      .catch(() => '');
    log('dashboard lists the submission', /Priya Sharma/.test(rowText), rowText.slice(0, 70));

    const totals = await page.$$eval('.display.mt-3', (els) => els.map((e) => e.textContent.trim()));
    log('dashboard stats count correctly', totals[0] === '1' && totals[2] === '1', totals.join('/'));

    await page.screenshot({ path: path.join(OUT, 'dashboard.png'), fullPage: true });

    /* search filter */
    await page.type('input[type="text"][aria-label]', 'zzz-no-match');
    await new Promise((r) => setTimeout(r, 600));
    const empty = await page.$eval('table tbody', (tb) => tb.textContent);
    log('dashboard search filters', /No submissions found/.test(empty));

    /* logout */
    await page.$$eval('button', (bs) => {
      const b = bs.find((x) => x.textContent.trim() === 'Logout');
      if (b) b.click();
    });
    await new Promise((r) => setTimeout(r, 1500));
    log('logout returns to login', page.url().endsWith('/admin'), page.url());

    await page.goto(BASE + '/admin/dashboard', { waitUntil: 'networkidle2' });
    await new Promise((r) => setTimeout(r, 1200));
    log('dashboard blocked when logged out', page.url().endsWith('/admin'), page.url());

    await page.close();
  }

  /* ---------------- internal links all resolve ---------------- */
  {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    const seen = new Set();
    const broken = [];
    for (const route of ['/', '/about', '/programs', '/why-us', '/contact']) {
      await page.goto(BASE + route, { waitUntil: 'domcontentloaded' });
      const hrefs = await page.$$eval('a[href^="/"]', (as) => as.map((a) => a.getAttribute('href')));
      hrefs.forEach((h) => seen.add(h));
    }
    for (const href of seen) {
      const res = await page.goto(BASE + href, { waitUntil: 'domcontentloaded' });
      if (res.status() >= 400) broken.push(`${href} -> ${res.status()}`);
    }
    log(`all ${seen.size} internal links resolve`, broken.length === 0, broken.join(', '));
    await page.close();
  }

  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
