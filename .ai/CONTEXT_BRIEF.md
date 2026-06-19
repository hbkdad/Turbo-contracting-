# Context Brief — Turbo Contracting and Mining Services
**Last updated:** 2026-06-19

## Project Purpose
Marketing/conversion site for an owner-operated industrial and mining contractor in Northern Ontario. Goal: generate quote requests via the contact form and rank locally for mining/millwright/welding searches.

## Stack
- Pure static HTML/CSS/JS — zero build tooling, zero framework, no package.json
- Deployed to Cloudflare Pages project `turbo-contracting` from branch `claude/gifted-curie-1aptk1`
- Repository: `hbkdad/Turbo-contracting-` (only one branch; it is the default/production branch)
- Cloudflare Pages is **GitHub-connected** — every push auto-deploys (~20 sec build time)
- Build: no build command, static files deployed directly from repo root

## Live URLs
- `https://turbocontracting.ca/` (primary, DNS + SSL provisioning — active within ~30 min of 2026-06-18)
- `https://www.turbocontracting.ca/` (www redirect, same)
- `https://turbo-contracting.pages.dev/` (always-live Pages subdomain)
- Worker `turbocontracting` at `turbocontracting.8ss7wrqgv2.workers.dev` redirects → `turbocontracting.ca`

## Pages
| File | Title | Key sections |
|---|---|---|
| `index.html` | Industrial Mining Contractor Northern Ontario \| Turbo Contracting | Hero (3D canvas), service tags, feature cards (6), B/A slider, industry gallery cards, stats, CTA |
| `about.html` | Owner-Operated Mining Contractor \| About Turbo Contracting ON | Story, certifications, values, process, CTA |
| `services.html` | Mining & Industrial Services \| Turbo Contracting ON | 13 service sections + sticky jump nav |
| `contact.html` | Request a Quote \| Turbo Contracting Mining Services ON | Info panel + Web3Forms form |
| `careers.html` | Now Hiring: Welders & Millwrights \| Turbo Contracting ON | Job listing, apply form (file upload) |
| `maintenance.html` | Temporarily Unavailable | Dark branded maintenance splash, noindex |
| `404.html` | Page Not Found | Branded 404 with nav links, noindex |

## Design System (css/styles.css)
- Palette: `--amber: #F0C400`, `--ink: #0E0C14`, `--cream: #F4F2F8`, `--steel: #5F5B6B`, `--muted` for secondary text
- `--border: var(--line)` — alias added so modal borders render correctly
- Fonts: Bebas Neue (display) + Inter (body) — Google Fonts CDN
- All spacing/sizing via CSS custom properties in `:root`
- BEM-ish class names, prefix `tc-`

## JavaScript Files
| File | Responsibility |
|---|---|
| `js/main.js` | Nav toggle, header scroll, year fill, scroll progress bar, back-to-top, services jump nav, **industry gallery modal**, **lightbox**, Web3Forms handler |
| `js/gsap-site.js` | GSAP ScrollTrigger section reveals + hero entry animation |
| `js/logo3d.js` | Three.js 3D logo: gold sparks, mouse tilt, orbiting light |

## Industry Gallery (Homepage)
- Cards with `data-industry-trigger` attribute for 6 industries: `mining`, `exploration`, `manufacturing`, `construction`, `pulp`, `utilities`
- `industryPhotos` map in `main.js` — `leachtank.jpg` in mining only
- Modal: `#tc-ind-modal` (role=dialog, aria-modal, is-open class pattern)
- Lightbox: `#tc-lightbox` (z-index 1001, above skip-link at 1000)
- Event delegation on `#tc-ind-modal-grid` (single listener, no accumulation)
- Focus restore: `lastPhotoBtn` tracks last clicked photo button, restored on lightbox close

## Services (13 categories)
01 Millwright & Mechanical  02 Welding & Fabrication  03 Industrial Painting & Coatings
04 Hoisting & Rigging  05 Confined Space Entry  06 Surface & Underground Construction
07 Electrical & Instrumentation  08 Crane Services  09 Scaffolding & Fall Protection
10 NDE & Inspection  11 Safety & Supervision  12 Pipe Fitting, Grooving & Installation (2–24 inch)
13 Environmental & Waste

## CDN Libraries (all deferred)
- GSAP 3.12.5 + ScrollTrigger
- Lenis 1.1.13 (smooth scroll, integrated with GSAP ticker)
- Three.js 0.158.0

## Owner / Contact
- **Name:** Rob Montgomery, owner-operator
- **Phone:** 705-262-4046 (`tel:+17052624046`)
- **Email:** inspirationwelding@gmail.com
- **Brand email:** info@turbocontracting.ca (Cloudflare Email Routing → inspirationwelding@gmail.com, pending setup)

## Cloudflare Account
- Account ID: `5eaff81128c20ee2b28554073d687264`
- Pages project ID: `e1a9c571-6d4e-464a-ba71-81c7c7a2e5cb`
- Zone ID for turbocontracting.ca: `3502f058eb9af3acda0225856a126259`
- GitHub owner_id: `93459210` (hbkdad), repo_id: `1267904508` (Turbo-contracting-)
- Worker `pages-worker--15190163-production` serves the Pages site internally

## Known Placeholders / Action Items
- `contact.html:116` + `careers.html:265` — `value="YOUR_WEB3FORMS_ACCESS_KEY"` — forms non-functional until replaced
  - Client registers at web3forms.com with inspirationwelding@gmail.com, then provides key
- Cloudflare Email Routing: set up `info@turbocontracting.ca` → `inspirationwelding@gmail.com` once domain is active
- Google Search Console: submit sitemap once turbocontracting.ca is confirmed active
- FAQPage schema written (`SEO/schema/faq.json`) but not yet embedded in HTML

## SEO Status (as of 2026-06-19)
- Titles: all unique, correct length (50–60 chars rendered)
- Meta descriptions: all unique, correct length (≤160 chars rendered)
- Canonical tags: present on all public pages
- `twitter:image` tag: added to all 5 pages
- JSON-LD: LocalBusiness + GeneralContractor + 14-service hasOfferCatalog on index; per-page schemas on all pages
- Open Graph: complete on all pages
- sitemap.xml: 5 URLs (index, services, about, contact, careers)
- robots.txt: allows all, references sitemap at turbocontracting.ca

## Architecture Notes
- No `main` branch — only `claude/gifted-curie-1aptk1` exists in remote (it IS the default branch)
- All pages share the same header/footer (copy-paste, no templating)
- `css/styles.css` is a single monolithic file (~1600+ lines); sections marked with `/* ─── */` comments
- `css/careers.css` — careers-page-only styles
- Images in `images/` — JPEGs + favicon.svg, no WebP conversion
- `_headers` sets security headers (nosniff, sameorigin, referrer-policy, permissions-policy)
- No `_redirects` file — removing it unpaused the site; presence of `/* /maintenance.html 200` pauses it
