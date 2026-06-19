# Project Map — Turbo Contracting and Mining Services
**Updated:** 2026-06-19

## HTML Pages (7 files)
| File | Purpose |
|---|---|
| `index.html` | Homepage — hero, service tags, feature cards, B/A slider, industry gallery, stats, CTA |
| `about.html` | About — story, certifications, values, process |
| `services.html` | 13 service sections + sticky jump nav |
| `contact.html` | Quote form (Web3Forms, key placeholder) |
| `careers.html` | Job listing + application form (file upload, key placeholder) |
| `maintenance.html` | Pause splash — deployed via `_redirects: /* /maintenance.html 200` |
| `404.html` | Branded 404 with nav links |

## Styles
- `css/styles.css` — Single monolithic stylesheet (~1600+ lines)
  - `:root` tokens: lines 7–58
  - Skip link: ~84–116
  - Header/nav: ~124–261
  - Hero + buttons: ~262–406
  - Sections/typography: ~407–600
  - Feature cards: ~700–780
  - Industry gallery cards + `.tc-industry-photo-hint`: ~780–830
  - Gallery modal (`.tc-ind-modal`): ~830–950
  - Lightbox (`.tc-lightbox`, z-index 1001): ~950–1070
  - Service cards + sidebar: ~1100–1170
  - Jump nav: ~1385–1423
  - Scroll progress + back-to-top: ~1425–1470
  - Print + reduced-motion: ~1454–1480
- `css/careers.css` — Careers page only

## JavaScript
- `js/main.js` — Nav, scroll, progress, back-to-top, jump nav, industry gallery + lightbox, Web3Forms
  - `industryPhotos` map (lines ~15–24): 6 industries → photo arrays
  - `openIndModal(industry)` — opens modal, sets title, renders grid
  - Event delegation on `#tc-ind-modal-grid` (single delegated listener)
  - `openLightbox(index)` / `closeLightbox()` — focus: `lbClose` on open, `lastPhotoBtn` on close
  - `lastPhotoBtn` variable — tracks last clicked photo for focus restore
- `js/gsap-site.js` — GSAP ScrollTrigger reveal animations + Lenis smooth scroll init
- `js/logo3d.js` — Three.js 3D logo (sparks, mouse tilt, orbiting light)

## Key Images
- `images/1.jpg` — Hero background (fetchpriority=high, loading=eager, parent aria-hidden)
- `images/logo.jpg` — Brand logo (header)
- `images/favicon.svg` — TC lettermark (amber on ink)
- `images/servicetruck.jpg` — OG image + og:image + twitter:image
- `images/before.jpg`, `images/after.jpg` — B/A slider
- `images/leachtank.jpg` — Mining gallery only
- `images/stairs.jpg`, `images/svt2.jpg` — Multi-industry use
- `images/2.jpg`…`images/23.jpg` — Numbered gallery photos
- `images/Untitled.jpg` — Unused (not referenced in HTML)

## Config & SEO
- `sitemap.xml` — 5 public URLs (index, services, about, contact, careers)
- `robots.txt` — Allow all, sitemap at turbocontracting.ca
- `_headers` — Security headers (nosniff, sameorigin, referrer-policy, permissions)
- `404.html` — Cloudflare Pages serves this on 404 automatically

## Deployment
- Cloudflare Pages project `turbo-contracting` — GitHub-connected, auto-deploys on push to `claude/gifted-curie-1aptk1`
- To **pause** site: add `_redirects` with `/* /maintenance.html 200`, push
- To **unpause**: delete `_redirects`, push

## AI Agent System
- `CLAUDE.md` — Project instructions (operating mode, context loading order, do-nots)
- `.ai/CONTEXT_BRIEF.md` — Persistent project facts (update after significant changes)
- `.ai/PROJECT_MAP.md` — This file
- `.ai/skills/`, `.ai/agents/`, `.ai/workflows/`, `.ai/prompts/` — SEO tooling

## Do Not Read (heavy/irrelevant)
- `images/` — use filenames above, don't scan directory
- `.git/`
- `SEO/` — only load if doing SEO work
