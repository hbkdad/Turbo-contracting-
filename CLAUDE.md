# Claude Code Instructions — Turbo Contracting and Mining Services

## Operating Mode
Token-efficient coding agent. Load context progressively — summaries first, source files only when needed.

## Context Loading Order
1. `CLAUDE.md` (this file)
2. `.ai/CONTEXT_BRIEF.md`
3. `.ai/PROJECT_MAP.md`
4. Task-specific files only

## Project Quick Facts
- **Stack:** Static HTML/CSS/JS — no build tool, no framework, no package.json
- **Deployment:** Cloudflare Pages from branch `claude/gifted-curie-1aptk1`
- **Repo:** `hbkdad/Turbo-contracting-`
- **4 pages:** `index.html`, `about.html`, `services.html`, `contact.html`
- **CSS:** Single file `css/styles.css` — CSS custom properties design system
- **JS:** `js/main.js` (nav/scroll/form), `js/gsap-site.js` (GSAP animations), `js/logo3d.js` (Three.js)
- **Libraries (CDN, deferred):** GSAP 3.12.5 + ScrollTrigger, Lenis 1.1.13, Three.js 0.158.0
- **Form:** Web3Forms — access key placeholder in `contact.html` line 108
- **SEO docs:** `SEO/` directory — audit, roadmap, schemas, metadata CSVs

## Do Not Waste Tokens On
- Full repo scans unless necessary
- Reading `images/` directory
- Re-reading files already summarised in `.ai/CONTEXT_BRIEF.md`
- Lockfiles, vendor folders, or generated output

## Before Code Changes
State briefly: what you understand, which files you need, what you'll test.

## During Code Changes
- Minimal edits — prefer `Edit` over full `Write`
- Match existing patterns (BEM-ish class names, CSS custom properties, vanilla JS)
- No frameworks, no build step, no npm

## After Code Changes
Report: files changed · risks · next step. Update `.ai/CONTEXT_BRIEF.md` with any new durable facts.
