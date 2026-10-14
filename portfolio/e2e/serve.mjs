// Static server that mimics Vercel for e2e tests: file, then dir/index.html, then the home page
// (the Angular preset's fallback), with the headers from vercel.json.
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { join, extname, normalize } from 'node:path';

const root = process.env.DIST ?? 'dist/jh-portfolio/browser';
const port = Number(process.env.PORT ?? 4600);
const vercel = JSON.parse(readFileSync('vercel.json', 'utf8'));
const globalHeaders = vercel.headers.find((h) => h.source === '/(.*)')?.headers ?? [];
const types = {
  '.html': 'text/html; charset=utf-8', '.js': 'application/javascript', '.css': 'text/css',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.webp': 'image/webp', '.ico': 'image/x-icon', '.xml': 'application/xml', '.txt': 'text/plain',
  '.webmanifest': 'application/manifest+json', '.pdf': 'application/pdf', '.woff2': 'font/woff2'
};

function resolve(urlPath) {
  const safe = normalize(decodeURIComponent(urlPath.split('?')[0])).replace(/^(\.\.[/\\])+/, '');
  const file = join(root, safe);
  if (existsSync(file) && statSync(file).isFile()) return file;
  if (existsSync(join(file, 'index.html'))) return join(file, 'index.html');
  return join(root, 'index.html');
}

createServer((req, res) => {
  const file = resolve(req.url ?? '/');
  for (const { key, value } of globalHeaders) res.setHeader(key, value);
  res.setHeader('Content-Type', types[extname(file)] ?? 'application/octet-stream');
  res.end(readFileSync(file));
}).listen(port, '127.0.0.1', () => console.log(`e2e server on http://127.0.0.1:${port}`));
