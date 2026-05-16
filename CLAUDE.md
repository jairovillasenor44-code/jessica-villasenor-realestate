# CLAUDE.md — Jessica Villaseñor Real Estate Site

## Project
- **Pages:** `index.html` (home), `about.html`, `listings.html`, `contact.html`, `faq.html`, `process.html`, `home-search.html` — each self-contained with all CSS+JS inline (no shared stylesheet)
- **Server:** `node serve.mjs` → localhost:3000. Routes: `/` → `index.html`, `/about`, `/listings`, `/contact`, `/process`, `/home-search` (cleanURLs), `/faq.html`, `/api/contact` → `api/contact.js`
- **Deployed:** `jessica-villasenor-realestate.vercel.app` (GitHub → Vercel auto-deploy on push to `main`)
- **`vercel.json`:** `{ "framework": null, "cleanUrls": true }` — no build step; `cleanUrls` allows `/about` without `.html`; also handles `/process` and `/home-search`

## Running Node on This Machine
PowerShell PATH is not auto-loaded. Always prepend before any `node` command:
```powershell
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
```

## Screenshot Workflow
- Full page: `node screenshot.mjs http://localhost:3000 label`
- Section (handles scroll animations): `node screenshot-scroll.mjs "#section-id" label` — no URL arg
- Output: `./temporary screenshots/screenshot-N-label.png` (auto-incremented)
- After saving, Read the PNG directly — Claude can see it.
- **Do not use** `screenshot-section.mjs` — broken without URL arg.

## Brand
- `--accent: #b18463` (copper) · `--green-dk: #2c3426` (dark olive green) · `--ink: #1a1a1a`
- `--bg: #F0EDE7` (quartz white page background) · cards use `#E8E4DC`
- Fonts: Gilda Display (headings) + Open Sans (body)
- `--parchment: #f7f4ef` — defined in `faq.html` only, NOT in main file

## Contact Form (contact.html + api/contact.js)
- **Active:** Resend API → `villasrealestate27@gmail.com` (must be verified in Resend dashboard as a recipient — free tier requirement)
- `from`: `Jessica Villaseñor Website <onboarding@resend.dev>` — DO NOT change to `oldeapavio.resend.app` (domain not verified → causes 403)
- `to`: `process.env.CONTACT_EMAIL` (= `villasrealestate27@gmail.com`)
- Fields: Name, Email, Phone (optional), "What are you looking for?" dropdown (Buying/Selling/Both/Exploring), Message
- Slide-to-send: drag to 88% threshold → `fetch('/api/contact', ...)` → check `data.success === true` → show ✓/✗ → auto-reset 2.5s/2s
- `form.checkValidity()` runs before slide fires — snaps back if invalid
- FormSubmit.co is **no longer used** — fully replaced by Resend

## Local Dev
- `.env` file in project root holds `RESEND_API_KEY` and `CONTACT_EMAIL` — gitignored, never commit
- `serve.mjs` auto-loads `.env` on startup
- Vercel env vars must be set manually in Vercel dashboard (RESEND_API_KEY + CONTACT_EMAIL) — redeploy after any change

## Section Order (home page index.html, top → bottom)
Hero → Intro Strip → About Teaser → Contact CTA Strip → Home Valuation (split form + Why-it-matters cards) → Valuation FAQ accordion → CMA vs Appraisal → Agent Trust Panel → Testimonials → Footer → Sticky CTA

## Nav (all pages)
- `/about` · `/listings` · `/#home-valuation` · `/home-search` · `/#testimonials` · `/contact` (Referrals) · `/faq.html`
- Brand logo → `/` on sub-pages, `#` on home
- Scroll threshold for solid background: `window.scrollY > 120`
- Sub-pages (`about`, `listings`, `contact`, `process`, `home-search`): nav brand is `<a href="/">` link

## Page Notes
- **`about.html`**: sticky CTA appears via `setTimeout(2200ms)` (no hero scroll trigger)
- **`listings.html`**: all 10 cards in 4-col grid, lightbox on image click, no sticky CTA
- **`contact.html`**: entire page bg is `var(--green-dk)`, no sticky CTA
- **`process.html`**: standalone buying + selling process page with 4 steps each, CTA strip, footer
- **`home-search.html`**: 5 area cards (Reno, Sparks, Fernley, Carson City, Lake Tahoe) linking to coombesgroupre.com search, plus map + "Talk to Jessica" CTA

## Hard Rules
- All edits to a page go in that page's HTML file — no separate CSS/JS files
- Do not add sections or features not explicitly requested
- Do not use `transition-all`
- Do not use default Tailwind blue/indigo
- Always serve on localhost before screenshotting — never `file:///`
- Python is NOT available on this machine — use PowerShell string splicing for large HTML replacements
