# Project Map — Turbo Contracting and Mining Services
**Generated:** 2026-06-14

## Important Files

### HTML Pages
- `index.html` — Homepage (hero, gallery, stats, CTA)
- `about.html` — About page (story, certs, values, process)
- `services.html` — All 13 service sections + sticky jump nav
- `contact.html` — Quote form (Web3Forms)

### Styles
- `css/styles.css` — Single monolithic stylesheet (~1470+ lines)
  - `:root` tokens on lines 7–58
  - Header/nav: ~124–261
  - Hero + buttons: ~262–406
  - Sections/typography: ~407–600
  - Service cards + sidebar: ~800–870
  - Jump nav: ~1385–1423
  - Scroll progress + back-to-top + shimmer: ~1425–1470
  - Print + reduced-motion: ~1454–1474

### JavaScript
- `js/main.js` — Nav, scroll, progress bar, back-to-top, jump nav, form
- `js/gsap-site.js` — GSAP reveal animations + Lenis init
- `js/logo3d.js` — Three.js 3D logo canvas

### Images
- `images/logo.jpg` — Brand logo (used in header)
- `images/favicon.svg` — TC lettermark (amber on ink, 32×32)
- `images/servicetruck.jpg` — OG image + gallery
- `images/before.jpg`, `images/after.jpg` — B/A slider
- `images/1.jpg` — Hero background (fetchpriority=high)
- `images/2.jpg`, `images/3.jpg`, `images/4.jpg`, `images/leachtank.jpg`, `images/stairs.jpg`, `images/svt2.jpg` — Gallery

### SEO & Config
- `sitemap.xml` — 4 URLs
- `robots.txt` — Allows all, references sitemap
- `SEO/SEO-ROADMAP.md` — 5-phase action plan
- `SEO/VISUAL-AUDIT.md` — Full visual + accessibility audit

### AI Agent System
- `CLAUDE.md` — Project instructions for Claude Code
- `.ai/CONTEXT_BRIEF.md` — Persistent project context (this project's facts)
- `.ai/PROJECT_MAP.md` — This file
- `.ai/skills/token-optimizer/SKILL.md` — Token efficiency skill
- `.ai/agents/` — SEO + visual agents
- `.ai/workflows/` — SEO workflows
- `.ai/prompts/` — Master prompts

## Ignored / Heavy Folders
- `images/` — don't scan, use filenames above
- `.git/`
- No `node_modules`, `dist`, `build`, or `vendor` folders (static site)
