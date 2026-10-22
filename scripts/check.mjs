import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const root = fileURLToPath(new URL('../dist/', import.meta.url));
let checked = 0;
for (const [lang, route] of [['en', '/'], ['zh-CN', '/zh-CN/']]) {
  const file = path.join(root, route, 'index.html');
  const html = await readFile(file, 'utf8');
  const canonical = html.match(/rel="canonical" href="([^"]+)"/)[1];
  const canonicalOrigin = new URL(canonical).origin;
  assert.equal(canonical, canonicalOrigin + route);
  assert.ok(html.includes(`<html lang="${lang}">`));
  assert.equal((html.match(/<h1\b/g) || []).length, 1);
  for (const value of ['rel="canonical"', 'hreflang="en"', 'hreflang="zh-CN"', 'hreflang="x-default"', 'og:image', 'twitter:card', 'Windows', 'WebView2', 'Mihomo', 'SHA256SUMS.txt', 'GloryPkqa', 'MetaCubeX']) assert.ok(html.includes(value), `${lang}: missing ${value}`);
  assert.ok(!/<script|<iframe|<form|https?:\/\/(?:127\.0\.0\.1|localhost)|undefined/i.test(html));
  const release = JSON.parse(await readFile(path.join(root, 'release.json'), 'utf8'));
  if (release.status === 'verified') assert.ok(html.includes(release.version), 'Verified version missing');
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
  assert.equal(ids.length, new Set(ids).size, 'duplicate IDs');
  for (const [, url] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (url.startsWith('#')) assert.ok(ids.includes(url.slice(1)), 'missing fragment ' + url);
    if (url.startsWith('/')) await access(path.join(root, url, url.endsWith('/') ? 'index.html' : ''));
    if (url.startsWith('https:')) assert.ok(new URL(url).hostname === 'github.com' || new URL(url).origin === canonicalOrigin);
    checked++;
  }
  for (const img of html.matchAll(/<img\b[^>]*>/g)) assert.ok(/\balt="[^"]*"/.test(img[0]));
  for (const [, img, w, h] of html.matchAll(/<img src="\/assets\/([^\"]+\.png)"[^>]*width="(\d+)" height="(\d+)"/g)) {
    const data = await readFile(path.join(root, 'assets', img));
    assert.equal(Number(w), data.readUInt32BE(16)); assert.equal(Number(h), data.readUInt32BE(20));
  }
}
for (const f of ['robots.txt', 'sitemap.xml', '_headers', '404.html', 'release.json', 'LICENSE']) await access(path.join(root, f));
console.log(`PASS: bilingual static pages, metadata, ${checked} link/resource references, image dimensions, no browser JS or local-controller requests.`);
