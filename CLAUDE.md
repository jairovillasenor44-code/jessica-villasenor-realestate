# CLAUDE.md — Jessica Villaseñor Real Estate Site

## Project
- **Main file:** `Jessica Villaseñor — Engel & Völkers Reno.html` — single HTML file, all CSS and JS inline.
- **FAQ page:** `faq.html` — self-contained, separate stylesheet/JS, no shared file with main.
- **Server:** `node serve.mjs` → localhost:3000. `/` serves main HTML, `/faq.html` serves FAQ page.

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

## Contact Form
- Submits via FormSubmit.co to `villasrealestate27@gmail.com`
- Uses slide-to-send JS button — not a standard `<form>` submit
- First submission triggers a one-time activation email — user must click it once

## Section Order (main page, top → bottom)
Hero → Intro Strip → About → Process → Search → Listings → Contact → Areas → Testimonials → Footer → Sticky CTA

## Hard Rules
- All edits to main site go in the single HTML file — no separate CSS/JS files
- Do not add sections or features not explicitly requested
- Do not use `transition-all`
- Do not use default Tailwind blue/indigo
- Always serve on localhost before screenshotting — never `file:///`
