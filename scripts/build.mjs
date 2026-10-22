import { mkdir, writeFile, cp } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { loadRelease } from './release.mjs';
import { renderPage } from '../src/page.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
export function validateOrigin(value) {
  const u = new URL(value);
  if (u.protocol !== 'https:' || u.username || u.password || u.pathname !== '/' || u.search || u.hash) {
    throw new Error('SITE_URL must be an HTTPS origin, e.g. https://netwatch.pkqa.top');
  }
  return u.origin;
}
export async function build({ outDir = path.join(root, 'dist'), origin = 'https://netwatch.pkqa.top', release } = {}) {
  origin = validateOrigin(origin);
  release ??= await loadRelease({ offline: process.argv.includes('--offline'), token: process.env.GITHUB_TOKEN });
  await mkdir(path.join(outDir, 'zh-CN'), { recursive: true });
  await cp(path.join(root, 'assets'), path.join(outDir, 'assets'), { recursive: true });
  await cp(path.join(root, 'src/style.css'), path.join(outDir, 'style.css'));
  await cp(path.join(root, 'LICENSE'), path.join(outDir, 'LICENSE'));
  for (const lang of ['en', 'zh-CN']) {
    await writeFile(path.join(outDir, lang === 'en' ? 'index.html' : 'zh-CN/index.html'), renderPage({ lang, origin, release }));
  }
  await writeFile(path.join(outDir, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);
  await writeFile(path.join(outDir, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${['/', '/zh-CN/'].map(route => `<url><loc>${origin}${route}</loc><xhtml:link rel="alternate" hreflang="en" href="${origin}/"/><xhtml:link rel="alternate" hreflang="zh-CN" href="${origin}/zh-CN/"/><xhtml:link rel="alternate" hreflang="x-default" href="${origin}/"/></url>`).join('')}</urlset>\n`);
  await writeFile(path.join(outDir, 'release.json'), JSON.stringify({ ...release, checkedAt: new Date().toISOString() }, null, 2) + '\n');
  await writeFile(path.join(outDir, '_headers'), `/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  X-Frame-Options: DENY\n  Content-Security-Policy: default-src 'none'; style-src 'self'; img-src 'self'; script-src 'none'; connect-src 'none'; font-src 'self'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'\n  Permissions-Policy: camera=(), microphone=(), geolocation=()\n`);
  const notFound = '<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Page not found · Codex Netwatch</title><link rel="stylesheet" href="/style.css"><main class="container section"><p class="eyebrow">404</p><h1>Page not found.</h1><p><a href="/">English home →</a> &nbsp; <a href="/zh-CN/">简体中文首页 →</a></p></main></html>';
  await writeFile(path.join(outDir, '404.html'), notFound);
  await writeFile(path.join(outDir, '.nojekyll'), '');
  return release;
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const release = await build({ origin: process.env.SITE_URL || 'https://netwatch.pkqa.top' });
  console.log(`Built dist/ · release ${release.version ?? 'fallback'} · ${release.reason ?? 'GitHub verified'}`);
}
