# SEO Audit — Turbo Contracting and Mining Services
**Date:** 2026-06-14
**Site:** https://turbocontracting.ca
**Audited by:** SEO AI Drop-In Pack

---

## Summary

The site has a strong content foundation: real service detail, correct geographic signals, and clear differentiators. The main gaps are technical (missing schema types, no sitemap, no Search Console setup) and off-site (no GBP, no citations). On-page metadata is functional but not keyword-optimized.

**Priority:** Technical first → Local signals → Content expansion

---

## Technical SEO

| Check | Status | Notes |
|---|---|---|
| HTTPS | ✅ | Cloudflare Pages |
| sitemap.xml | ✅ Fixed | Created at /sitemap.xml — submit to Search Console |
| robots.txt | ✅ Fixed | Now references sitemap |
| Canonical URLs | ✅ | Set on all 4 pages |
| Mobile responsive | ✅ | Breakpoints at 920px and 640px |
| Page speed (CDN scripts) | ✅ Fixed | All scripts now deferred |
| Image lazy loading | ✅ Fixed | Below-fold images now lazy |
| Favicon | ✅ Fixed | SVG TC lettermark |
| Google Search Console | ❌ | Not yet verified — do this now |
| Core Web Vitals | ⚠️ | Unknown — check after Search Console setup |
| 404 handling | ⚠️ | Cloudflare Pages serves default 404 — consider custom /404.html |
| Structured data (JSON-LD) | ✅ Fixed | LocalBusiness + GeneralContractor on all pages |
| FAQPage schema | ❌ | Schema written (SEO/schema/faq.json) — not yet embedded in HTML |
| Service schema | ❌ | Schema written (SEO/schema/services.json) — not yet embedded |
| og:image | ✅ Fixed | Points to /images/servicetruck.jpg |
| Twitter card | ✅ | summary_large_image |

---

## On-Page / Metadata

| Page | Current Title | Issue | Recommended Title |
|---|---|---|---|
| / | Turbo Contracting and Mining Services \| Northern Ontario | Not keyword-rich enough | Industrial Mining Contractor Northern Ontario \| Turbo Contracting |
| /services.html | Services \| Turbo Contracting... | "Services" alone is weak | Mining & Industrial Services Northern Ontario \| Turbo Contracting |
| /about.html | About \| Turbo Contracting... | Generic | Owner-Operated Mining Contractor \| About Turbo Contracting ON |
| /contact.html | Request a Quote \| Turbo Contracting... | OK but long (73 chars) | Request a Quote \| Turbo Contracting Mining Services ON |

See `SEO/metadata/titles.csv` and `SEO/metadata/descriptions.csv` for full recommendations.

---

## Content Analysis

**Strengths:**
- 13 service sections with unique, detailed copy — strong for long-tail service keywords
- Geographic signals ("Northern Ontario") appear frequently and naturally
- Differentiators (owner-operated, no subcontracting, certified) stated clearly
- Before/after visual for sandblasting — useful for image search

**Gaps:**
- No FAQ section on any page (FAQPage schema drives featured snippets)
- No testimonials / client social proof
- No blog or news section — no path to ranking for informational queries
- Service section headings are not keyword-optimized (e.g., "Welding & Fabrication" vs. "Welding Contractor Northern Ontario")
- No phone number on the site — hurts local pack ranking and conversion

---

## Local SEO

| Check | Status | Notes |
|---|---|---|
| Google Business Profile | ❌ | Not confirmed — claim/create immediately |
| LocalBusiness schema | ✅ | On all pages |
| areaServed populated | ✅ | Northern Ontario cities listed |
| Phone number on site | ❌ | Critical — add to header and footer |
| NAP consistency | ⚠️ | Can't confirm without GBP — verify once claimed |
| Citation building | ❌ | See local-seo-checklist.md |

---

## Keyword Gaps

These terms have search volume and are not currently targeted:
- "mining contractor Timmins" — no Timmins-specific page
- "millwright Timmins Ontario"
- "sandblasting Sudbury"
- "confined space contractor Ontario"
- "shutdown support mining Ontario"
- "industrial painting Northern Ontario"

**Recommendation:** Add city-specific landing pages or a "Coverage Area" section on the homepage.

---

## Quick Wins (do now)
1. Verify site in Google Search Console + submit sitemap
2. Claim/create Google Business Profile
3. Add phone number to site header and footer
4. Update title tags per `SEO/metadata/titles.csv`
5. Embed FAQPage schema (SEO/schema/faq.json) on contact.html or homepage
6. Add phone to LocalBusiness schema in all pages
