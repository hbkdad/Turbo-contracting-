# Visual Audit — Turbo Contracting and Mining Services
**Date:** 2026-06-14
**Auditor:** Visual Web AI Agent
**Scope:** All 4 pages (index, about, services, contact) + CSS + JS

---

## 1. Performance

| Check | Status | Notes |
|---|---|---|
| Hero image `fetchpriority="high"` | ✅ Done | `images/1.jpg` — eager load, no lazy |
| Gallery images `loading="lazy"` | ✅ Done | All 8 gallery photos deferred |
| Scripts `defer` | ✅ Done | GSAP, Lenis, Three.js, main.js, gsap-site.js, logo3d.js |
| Google Fonts preconnect | ✅ Done | Both `fonts.googleapis.com` + `fonts.gstatic.com` |
| Image `decoding="async"` | ✅ Done | All lazy images |
| Favicon SVG | ✅ Done | `images/favicon.svg` — TC lettermark, amber on ink |
| sitemap.xml | ✅ Done | 4 URLs, correct priorities |
| robots.txt with sitemap ref | ✅ Done | `Sitemap: https://turbocontracting.ca/sitemap.xml` |

**Outstanding:** No WebP conversion (original JPEGs retained). Consider Cloudflare Image Resizing for format negotiation.

---

## 2. Accessibility

| Check | Status | Notes |
|---|---|---|
| Skip link | ✅ Done | Fixed-position, reveals on focus |
| `aria-label` on nav | ✅ Done | `aria-label="Primary navigation"` |
| `aria-current="page"` | ✅ Done | Applied per page |
| Focus ring | ✅ Done | Amber box-shadow, 3px offset |
| Hero image has `alt=""` (decorative) | ✅ Done | Background img is presentational |
| Gallery `alt` text | ✅ Done | Descriptive alt per image |
| B/A slider `role="img"` + `aria-label` | ✅ Done | Comparison labelled correctly |
| Industries grid `aria-labelledby` | ✅ Done | Points to `#industries-heading` |
| Stats section semantic | ✅ Fixed | Changed `<div>` → `<section>` with `aria-label` |
| **`--steel` contrast on cream** | ✅ Fixed | `#858090` → `#5F5B6B` (was 3.29:1, now ~5.5:1 on `#F4F2F8`) |
| Noscript fallback for 3D canvas | ✅ Fixed | Logo image shown when JS disabled |
| Form labels linked to inputs | ✅ Done | `for`/`id` pairs on all form fields |
| `aria-live` on form status | ✅ Done | `role="status"` + JS adds `aria-live="polite"` |
| Reduced motion media query | ✅ Done | Collapses all transitions/animations |

---

## 3. Layout & UX

| Check | Status | Notes |
|---|---|---|
| Mobile hamburger nav | ✅ Done | Animated X, body lock, Escape key closes |
| Services jump navigation | ✅ Done | Sticky below header, 13 links, active-state tracking |
| Services jump nav — keyboard | ✅ Done | Standard anchor links, tabIndex works |
| Before/After drag slider | ✅ Done | Pure JS, touch-enabled |
| Scroll progress bar | ✅ Fixed | 3px amber bar, fixed top 0, z-index 999 |
| Back-to-top button | ✅ Fixed | Appears after 400px, amber, animated show/hide |
| Hero alignment (split layout) | ✅ Fixed | Left-aligned text, actions `justify-content: flex-start` |
| Gallery photo captions | ✅ Done | CSS `::after` overlay via `data-caption` attribute |
| Service cards with sidebar | ✅ Done | Desktop: 3-col grid + sticky sidebar quote CTA |
| Stats row hover | ✅ Done | Amber-tinted background on hover |

---

## 4. Motion & Polish

| Check | Status | Notes |
|---|---|---|
| GSAP section reveal animations | ✅ Done | Fade-up `{ y: 36 }`, stagger on grids |
| Hero entry animation | ✅ Done | Kicker → H1 → rule → sub → CTA, 0.2s stagger |
| Lenis smooth scroll | ✅ Done | Integrated with GSAP ticker |
| Three.js 3D logo canvas | ✅ Done | Gold sparks, mouse tilt, orbiting light |
| Logo float animation removed | ✅ Fixed | Replaced with scale-on-hover (was distracting infinite loop) |
| Button shimmer on hover | ✅ Fixed | CSS `::before` sweep on `.btn-primary` |
| Nav CTA lift on hover | ✅ Done | `translateY(-1px)` |
| Brand logo float animation | ✅ Fixed | Removed — was `tc-float 4s` infinite loop |

---

## 5. SEO & Structured Data

| Check | Status | Notes |
|---|---|---|
| Page titles optimised | ✅ Done | All 4 pages — see `SEO/metadata/titles.csv` |
| Meta descriptions optimised | ✅ Done | All 4 pages — see `SEO/metadata/descriptions.csv` |
| JSON-LD LocalBusiness schema | ✅ Done | All 4 pages inline + `SEO/schema/localbusiness.json` |
| Service schemas | ✅ Done | `SEO/schema/services.json` (13 services) |
| FAQPage schema | ⚠️ Pending | Written in `SEO/schema/faq.json`, not yet embedded in HTML |
| Canonical tags | ✅ Done | All 4 pages |
| OG image | ✅ Done | `servicetruck.jpg` referenced on all pages |
| robots meta `index, follow` | ✅ Done | All pages |
| sitemap.xml + robots.txt | ✅ Done | Both present and correct |
| **Phone number** | ❌ Missing | Highest-priority local SEO signal — add to header/footer when available |

---

## 6. Outstanding Items

| Priority | Task |
|---|---|
| HIGH | Add phone number to header + footer + LocalBusiness schema |
| HIGH | Replace `YOUR_WEB3FORMS_ACCESS_KEY` with real key in `contact.html` |
| HIGH | Embed FAQPage schema in `contact.html` or `index.html` |
| MED | Verify Google Search Console (DNS TXT via Cloudflare) |
| MED | Claim Google Business Profile |
| MED | Convert JPEGs to WebP (or enable Cloudflare Image Resizing) |
| LOW | Add "Service Areas" section to homepage (Timmins, Sudbury, Thunder Bay…) |
| LOW | City landing pages for geo+service combos |

---

## 7. WCAG Contrast Values

| Token | Old Value | New Value | Old Ratio (on cream) | New Ratio |
|---|---|---|---|---|
| `--steel` | `#858090` | `#5F5B6B` | 3.29:1 ❌ | ~5.46:1 ✅ |
| `--steel-2` | `#A09AAC` | `#A09AAC` | 2.44:1 — used on dark bg only | n/a |
| `--steel-3` | `#C8C5D0` | `#C8C5D0` | Used on dark backgrounds only | n/a |

`--steel-2` and `--steel-3` are only used on dark (`var(--ink)` / `var(--ink-2)`) backgrounds in the footer and service cards — contrast is well above 4.5:1 in those contexts.
