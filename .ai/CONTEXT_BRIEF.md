# Context Brief — Turbo Contracting and Mining Services
**Last updated:** 2026-06-14

## Project Purpose
Marketing/conversion site for an owner-operated industrial and mining contractor in Northern Ontario. Goal: generate quote requests via the contact form and rank locally for mining/millwright/welding searches.

## Stack
- Pure static HTML/CSS/JS — zero build tooling, zero framework
- Deployed to Cloudflare Pages from branch `claude/gifted-curie-1aptk1`
- Repository: `hbkdad/Turbo-contracting-`

## Pages
| File | Title | Key sections |
|---|---|---|
| `index.html` | Homepage | Hero (3D canvas), service tags, feature cards, B/A slider, gallery, stats, CTA |
| `about.html` | About | Story, certifications, values, process, CTA |
| `services.html` | Services | 13 service sections + sticky jump nav |
| `contact.html` | Quote form | Info panel + Web3Forms form |

## Design System (css/styles.css)
- Palette: `--amber: #F0C400`, `--ink: #0E0C14`, `--cream: #F4F2F8`, `--steel: #5F5B6B`
- Fonts: Bebas Neue (display) + Inter (body) — Google Fonts CDN
- All spacing/sizing via CSS custom properties in `:root`

## JavaScript Files
| File | Responsibility |
|---|---|
| `js/main.js` | Nav toggle, header scroll, year fill, scroll progress bar, back-to-top, services jump nav, Web3Forms handler |
| `js/gsap-site.js` | GSAP ScrollTrigger section reveals + hero entry animation |
| `js/logo3d.js` | Three.js 3D logo: gold sparks, mouse tilt, orbiting light |

## CDN Libraries (all deferred)
- GSAP 3.12.5 + ScrollTrigger
- Lenis 1.1.13 (smooth scroll, integrated with GSAP ticker)
- Three.js 0.158.0

## Owner / Contact
- **Name:** Rob Montgomery
- **Phone:** 705-262-4046 (`tel:+17052624046`)
- **Email:** inspirationwelding@gmail.com

## Known Issues / Placeholders
- `contact.html:115` + `careers.html:82` — `value="YOUR_WEB3FORMS_ACCESS_KEY"` — forms non-functional until replaced
- FAQPage schema written (`SEO/schema/faq.json`) but not yet embedded in HTML

## SEO Assets
All under `SEO/`:
- `SEO-AUDIT.md`, `SEO-ROADMAP.md`, `VISUAL-AUDIT.md`
- `schema/localbusiness.json`, `schema/services.json`, `schema/faq.json`
- `metadata/titles.csv`, `metadata/descriptions.csv`
- `checklists/local-seo-checklist.md`, `checklists/search-console-checklist.md`
- `content/gbp-posts.md`, `content/service-page-brief.md`

## Architecture Notes
- No `main` branch — only `claude/gifted-curie-1aptk1` exists in remote
- All 4 pages share the same header/footer structure (copy-paste, no templating)
- `css/styles.css` is a single monolithic file (~1470 lines); sections are marked with `/* ─── */` comments
- Images in `images/` — JPEGs, no WebP conversion yet

## Next Steps
1. Client to provide phone number → add to header, footer, LocalBusiness schema
2. Client to provide Web3Forms key → replace placeholder in `contact.html`
3. Embed FAQPage schema on contact or index page
4. Verify Google Search Console + claim GBP
