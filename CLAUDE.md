# CLAUDE.md — Jessica Villaseñor Real Estate Site

## Project
- **Pages:** `index.html` (home), `about.html`, `listings.html`, `contact.html`, `faq.html`, `process.html`, `home-search.html`, `valuation.html`, `testimonials.html` — each self-contained with all CSS+JS inline (no shared stylesheet)
- **Server:** `node serve.mjs` → localhost:3000. Routes: `/` → `index.html`, `/about`, `/listings`, `/contact`, `/process`, `/home-search`, `/valuation`, `/testimonials` (cleanURLs), `/faq.html`, `/api/contact` → `api/contact.js`
- **Deployed:** `villrealestate.com` (GitHub → Vercel auto-deploy on push to `main`)
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
- `to`: `process.env.CONTACT_EMAIL` (= `villasrealestate27@gmail.com`) — **permanent, no changes planned**
- Fields: Name, Email, Phone (optional), "What are you looking for?" dropdown (Buying/Selling/Both/Exploring), Message
- Slide-to-send: drag to 88% threshold → `fetch('/api/contact', ...)` → check `data.success === true` → show ✓/✗ → auto-reset 2.5s/2s
- `form.checkValidity()` runs before slide fires — snaps back if invalid
- Auto-reply fires after successful send → goes to submitter's email from `onboarding@resend.dev`
- FormSubmit.co is **no longer used** — fully replaced by Resend
- **No professional email planned** — `villasrealestate27@gmail.com` is permanent

## Local Dev
- `.env` file in project root holds `RESEND_API_KEY` and `CONTACT_EMAIL` — gitignored, never commit
- `serve.mjs` auto-loads `.env` on startup
- Vercel env vars must be set manually in Vercel dashboard (RESEND_API_KEY + CONTACT_EMAIL) — redeploy after any change

## SEO / Analytics (all completed, live on all 9 pages)
- **GA4:** `G-D7P8XZKV6Q` — gtag snippet on every page before Google Fonts preconnect
- **Open Graph + Twitter Card** meta tags on all 9 pages; `og:image` uses absolute Vercel URL
- **Meta descriptions** on all 9 pages
- **`sitemap.xml`** — all 9 pages, `villrealestate.com` domain, priorities set (/ = 1.0, etc.)
- **`robots.txt`** — `Allow: /`, Sitemap points to `villrealestate.com/sitemap.xml`
- **Uptime monitor** — Uptimerobot watching `villrealestate.com` every 5 min; add second monitor for `villrealestate.com` once domain is live

## Section Order (home page index.html, top → bottom)
Hero → Intro Strip → About Teaser → Contact CTA Strip → CMA vs Appraisal → Testimonials → Footer → Sticky CTA

## Nav (all pages)
- `/about` · `/listings` (label: **Transactions**) · `/valuation` · `/home-search` · `testimonials.html` (label: **Testimonials**) · `/contact` (Referrals) · `/faq.html`
- Brand logo → `/` on sub-pages, `#` on home
- Scroll threshold for solid background: `window.scrollY > 120`
- Sub-pages (`about`, `listings`, `contact`, `process`, `home-search`, `valuation`, `testimonials`): nav brand is `<a href="/">` link

## Page Notes
- **`about.html`**: sticky CTA appears via `setTimeout(2200ms)` (no hero scroll trigger)
- **`listings.html`**: 10 transaction cards in 4-col grid, sorted oldest → newest by date; lightbox on image click; no sticky CTA; no "Represented" labels; no status badges; page/nav label is "Transactions"
- **`contact.html`**: entire page bg is `var(--green-dk)`, no sticky CTA; no paragraph under title
- **`process.html`**: standalone buying + selling process page with 4 steps each, CTA strip, footer; step descriptions are agent-neutral (no "Jessica does X" language)
- **`home-search.html`**: 5 area cards (Reno, Sparks, Fernley, Carson City, Northern Lake Tahoe) — name only on each card, no tag/description text; "Get in Touch" CTA button; subtitle is "Browse active listings."
- **`valuation.html`**: standalone valuation page — eyebrow "Home Valuations across Northern Nevada"; split form panel; 2-card Why-It-Matters grid (Thinking of Selling + Planning Improvements only); Daisy Martinez testimonial; Agent Trust Panel with badges "Northern Nevada" + "#NV S.0202253"; No Obligation badge (no subtext); FAQ accordion (4 items); all city names replaced with Northern Nevada; em dashes → `~` throughout
- **`testimonials.html`**: standalone testimonials page — 2×2 static grid of all 4 client reviews (no carousel); no buyer/seller labels; "Ready to write your own story?" CTA strip; added to `sitemap.xml`

## Remaining Launch Plan (domain not yet purchased)
- **Phase 1:** Jessica buys `villrealestate.com` on Namecheap (~$12/yr, auto-renew ON, her card)
- **Phase 2:** Connect domain to Vercel — A record `76.76.21.21`, CNAME `www` → `cname.vercel-dns.com`; add domain in Vercel dashboard
- **Phase 3:** Google Search Console — verify domain, submit `sitemap.xml` (already built)
- **Phase 4:** Google Business Profile — Jessica sets up at `business.google.com` (requires domain live; ~1 week to verify)

## Copy Style
- **Em dashes** `—` in prose → replaced with ` ~ ` (tilde with spaces). Apply to new copy too.
- **City lists** (Reno, Sparks, Fernley) in prose descriptions → "Northern Nevada". Individual city names in testimonial attributions, addresses, and brokerage names ("Engel & Völkers Reno") stay as-is.
- **No self-promotion / Jessica praise** in prose — avoid "Jessica knows…", "Jessica delivers…", "Jessica can…" etc. Use passive voice, "your agent", or "we" instead. Exception: verbatim client testimonial quotes.

## Hard Rules
- All edits to a page go in that page's HTML file — no separate CSS/JS files
- Do not add sections or features not explicitly requested
- Do not use `transition-all`
- Do not use default Tailwind blue/indigo
- Always serve on localhost before screenshotting — never `file:///`
- Python is NOT available on this machine — use PowerShell string splicing for large HTML replacements
- **Do not suggest changing the contact email** — `villasrealestate27@gmail.com` is permanent
- **Do not suggest professional email or Google Workspace** — decided against it
