import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const puppeteer = require('C:/Users/jairo/AppData/Local/Temp/puppeteer-test/node_modules/puppeteer');
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const selector = process.argv[2] || 'body';
const label    = process.argv[3] || 'section';
const outDir = path.join(__dirname, 'temporary screenshots');

const existing = fs.readdirSync(outDir).filter(f => f.endsWith('.png'));
const nums = existing.map(f => parseInt(f.match(/^screenshot-(\d+)/)?.[1] || '0')).filter(Boolean);
const next = nums.length ? Math.max(...nums) + 1 : 1;
const outPath = path.join(outDir, `screenshot-${next}-${label}.png`);

const browser = await puppeteer.launch({
  executablePath: 'C:/Users/jairo/.cache/puppeteer/chrome/win64-147.0.7727.57/chrome-win64/chrome.exe',
  headless: 'new',
  args: ['--no-sandbox'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.5 });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 30000 });

// Scroll through the page to trigger all animations
await page.evaluate(async () => {
  const totalHeight = document.body.scrollHeight;
  const step = 400;
  for (let y = 0; y < totalHeight; y += step) {
    window.scrollTo(0, y);
    await new Promise(r => setTimeout(r, 30));
  }
  window.scrollTo(0, 0);
  await new Promise(r => setTimeout(r, 200));
});

const el = await page.$(selector);
if (el) {
  await el.screenshot({ path: outPath });
  console.log('Saved:', outPath);
} else {
  console.error('Selector not found:', selector);
}
await browser.close();
