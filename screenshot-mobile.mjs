import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const puppeteer = require('C:/Users/jairo/AppData/Local/Temp/puppeteer-test/node_modules/puppeteer');
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, 'temporary screenshots');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const existing = fs.readdirSync(outDir).filter(f => f.endsWith('.png'));
const nums = existing.map(f => parseInt(f.match(/^screenshot-(\d+)/)?.[1] || '0')).filter(Boolean);
let next = nums.length ? Math.max(...nums) + 1 : 1;

const pages = [
  ['http://localhost:3000', 'mobile-home'],
  ['http://localhost:3000/about', 'mobile-about'],
  ['http://localhost:3000/listings', 'mobile-listings'],
  ['http://localhost:3000/contact', 'mobile-contact'],
  ['http://localhost:3000/valuation', 'mobile-valuation'],
  ['http://localhost:3000/home-search', 'mobile-home-search'],
  ['http://localhost:3000/process', 'mobile-process'],
  ['http://localhost:3000/faq.html', 'mobile-faq'],
  ['http://localhost:3000/testimonials', 'mobile-testimonials'],
];

const browser = await puppeteer.launch({
  executablePath: 'C:/Users/jairo/.cache/puppeteer/chrome/win64-147.0.7727.57/chrome-win64/chrome.exe',
  headless: 'new',
  args: ['--no-sandbox'],
});

for (const [url, label] of pages) {
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
  const outPath = path.join(outDir, `screenshot-${next}-${label}.png`);
  await page.screenshot({ path: outPath, fullPage: true });
  await page.close();
  console.log('Saved:', outPath);
  next++;
}

await browser.close();
