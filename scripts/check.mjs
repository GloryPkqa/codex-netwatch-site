import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const root = fileURLToPath(new URL('../dist/', import.meta.url));
const fontCoverage = JSON.parse(await readFile(new URL('./font-coverage.json', import.meta.url), 'utf8'));
const glyphs = new Set(fontCoverage.codepoints);
const font = await readFile(path.join(root, 'assets/fonts/netwatch-sans-sc.woff2'));
assert.equal(createHash('sha256').update(font).digest('hex'), fontCoverage.fontSha256, 'Font does not match its coverage manifest');
let checked = 0;
function imageSize(data, name) {
  if (name.endsWith('.png')) return [data.readUInt32BE(16), data.readUInt32BE(20)];
  assert.equal(data.readUInt16BE(0), 0xffd8, 'invalid JPEG: ' + name);
  let offset = 2;
  while (offset + 4 <= data.length) {
    assert.equal(data[offset++], 0xff, 'invalid JPEG marker: ' + name);
    while (data[offset] === 0xff) offset++;
    const marker = data[offset++];
    if (marker === 0xda || marker === 0xd9) break;
    const length = data.readUInt16BE(offset);
    assert.ok(length >= 2 && offset + length <= data.length, 'invalid JPEG segment: ' + name);
    if ([0xc0, 0xc1, 0xc2].includes(marker)) return [data.readUInt16BE(offset + 5), data.readUInt16BE(offset + 3)];
    offset += length;
  }
  throw new Error('JPEG dimensions not found: ' + name);
}
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
  assert.ok(html.includes('http-equiv="Content-Security-Policy"'), 'Missing Pages meta CSP');
  assert.ok(html.includes("font-src 'self'"), 'Missing local-font CSP permission');
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
  for (const [, img, w, h] of html.matchAll(/<img src="\/assets\/([^\"]+\.(?:png|jpg))"[^>]*width="(\d+)" height="(\d+)"/g)) {
    const data = await readFile(path.join(root, 'assets', img));
    assert.deepEqual([Number(w), Number(h)], imageSize(data, img), img);
  }
  if (lang === 'zh-CN') {
    assert.ok(html.includes('/assets/dashboard.zh-CN.jpg'));
    assert.ok(html.includes('/assets/investigation.zh-CN.jpg'));
    assert.ok(html.includes('合成数据'));
    for (const char of html) {
      if (/\p{Script=Han}/u.test(char)) assert.ok(glyphs.has(char.codePointAt(0)), `Rebuild the Chinese font subset for: ${char}`);
    }
  }
}
for (const f of ['robots.txt', 'sitemap.xml', '_headers', '404.html', 'release.json', 'LICENSE', '.nojekyll']) await access(path.join(root, f));
console.log(`PASS: bilingual static pages, metadata, ${checked} link/resource references, image dimensions, no browser JS or local-controller requests.`);
