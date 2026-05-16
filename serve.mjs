import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const PORT = 3000;

// Load .env into process.env (local dev only)
try {
  const env = fs.readFileSync(path.join(__dirname, '.env'), 'utf8');
  for (const line of env.split('\n')) {
    const eq = line.indexOf('=');
    if (eq > 0) process.env[line.slice(0, eq).trim()] = line.slice(eq + 1).trim();
  }
} catch {}

const MIME = {
  '.html': 'text/html',
  '.css':  'text/css',
  '.js':   'application/javascript',
  '.mjs':  'application/javascript',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif':  'image/gif',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
  '.woff': 'font/woff',
  '.woff2':'font/woff2',
};

function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', chunk => { data += chunk; });
    req.on('end', () => {
      try { resolve(data ? JSON.parse(data) : {}); }
      catch { resolve({}); }
    });
    req.on('error', reject);
  });
}

const contactHandler = require('./api/contact.js');

http.createServer(async (req, res) => {
  const urlPath = req.url.split('?')[0];

  if (urlPath === '/api/contact' && req.method === 'POST') {
    req.body = await readBody(req);
    res.status = (code) => { res.statusCode = code; return res; };
    res.json = (obj) => {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(obj));
    };
    return contactHandler(req, res);
  }

  let filePath = urlPath === '/' ? '/index.html' : urlPath;
  filePath = path.join(__dirname, decodeURIComponent(filePath));

  function tryServe(fp, cb) {
    fs.readFile(fp, (err, data) => {
      if (!err) return cb(null, fp, data);
      // cleanUrls: try appending .html
      if (!path.extname(fp)) {
        fs.readFile(fp + '.html', (err2, data2) => {
          if (!err2) return cb(null, fp + '.html', data2);
          cb(err);
        });
      } else {
        cb(err);
      }
    });
  }

  tryServe(filePath, (err, resolvedPath, data) => {
    if (err) { res.writeHead(404); res.end('Not found: ' + urlPath); return; }
    const ext = path.extname(resolvedPath).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(data);
  });
}).listen(PORT, () => console.log(`Serving at http://localhost:${PORT}`));
