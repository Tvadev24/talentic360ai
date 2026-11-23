# TALENTIC 360.AI LLP — website

A Next.js rebuild of talentic360ai.in. Same copy, same sections, same logo and footer,
rebuilt as a multi-page site with a different visual language: editorial serif
display type, a deep-green and warm-paper palette, hairline rules, real photography,
and motion that is felt rather than noticed.

Buttons are deliberately flat — no shadows anywhere, enforced in `app/globals.css`.

## Running it

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
npm run start        # serve the production build
```

Node 20+ recommended (built and verified on Node 22).

## Stack

| Piece       | Choice                                  |
| ----------- | --------------------------------------- |
| Framework   | Next.js 15 (App Router, Turbopack)      |
| UI          | React 19 + TypeScript                   |
| Styling     | Tailwind CSS v4 (CSS-first `@theme`)    |
| Motion      | Framer Motion 12                        |
| Icons       | lucide-react                            |
| Photography | Unsplash, served through `next/image`   |

## Routes

| Route                  | What it is                                                     |
| ---------------------- | -------------------------------------------------------------- |
| `/`                    | Hero, about, all seven programme bands, stats, why us, contact |
| `/about`               | Positioning, pillars, stats, programme index                    |
| `/programs`            | Index of all seven tracks                                       |
| `/programs/[slug]`     | One track: offerings, how an engagement runs, enquiry form      |
| `/why-us`              | Six reasons, stats, outcomes                                    |
| `/contact`             | Contact details, office hours, enquiry form, FAQs               |
| `/privacy-policy`      | Privacy policy                                                  |
| `/terms-of-service`    | Terms of service                                                |
| `/admin`               | Admin login (demonstration auth — see below)                    |
| `/admin/dashboard`     | Enquiry submissions table with search and counters              |

Programme slugs: `academic`, `vocational`, `corporate`, `government`,
`post-graduate`, `volunteering`, `remote`.

## Where the content lives

Every string on the site is in [`lib/content.ts`](lib/content.ts) — navigation,
hero, about, all seven programmes and their offerings, why-us reasons, stats,
contact fields, footer columns and badges, admin labels. Edit that one file and the
whole site follows.

Photography is mapped by role in [`lib/images.ts`](lib/images.ts). Swap a photo ID
there to change it everywhere it is used.

The logo in `public/brand/` was extracted from the original site and separated from
its black background: `logo-dark.png` (ink mark, for light surfaces) and
`logo-light.png` (white mark, for dark surfaces). `app/icon.png` and
`app/apple-icon.png` are generated from it by `scripts/make-icon.cjs`.

## Enquiry form and admin

The contact form writes submissions to `localStorage` under `talentic_submissions`,
and `/admin/dashboard` reads them back — the same behaviour as the original site.
**Nothing is sent to a server.** To deliver enquiries for real, replace the
`localStorage` write in [`components/contact-form.tsx`](components/contact-form.tsx)
with a POST to an API route, CRM or email service.

Admin login is a browser-side credential check, so it is a demonstration gate, not
security. Defaults are `admin` / `admin123`; override them with
`NEXT_PUBLIC_ADMIN_USERNAME` and `NEXT_PUBLIC_ADMIN_PASSWORD`. Both are public to
anyone who views the bundle. **Put real authentication in front of this before any
genuine enquiry data sits behind it.**

## Theme and language

A light/dark toggle sits in the header; the choice is stored under `theme` and
applied before first paint by an inline script in `app/layout.tsx`, so there is no
flash. The language switcher drives a hidden Google Translate element (English and
Simplified Chinese, as on the original site) from custom UI.

## Things to fill in before launch

- Replace the `+91 XXX XXX XXXX` placeholder in `lib/content.ts` with the real number.
- Point the footer social links (currently `#`) at real profiles.
- Review the dates and specifics in the privacy policy and terms pages.
- Add a real `metadataBase` domain if it differs from `talentic360ai.in`.

## Verification scripts

These drive a headless Chrome against a running production build and are development
aids, not part of the app:

```bash
npm run build && npm run start        # in one terminal, then:
node scripts/audit.cjs                # every route x 3 widths: hidden content,
                                      # broken images, overflow, console errors
node scripts/interactions.cjs         # menus, theme, contact form, admin flow, links
node scripts/shoot.cjs                # full-page screenshots into .shots/
```

They expect Chrome at `C:/Program Files/Google/Chrome/Application/chrome.exe` and a
server on port 3100 (`npx next start -p 3100`); both are configurable at the top of
each script.
