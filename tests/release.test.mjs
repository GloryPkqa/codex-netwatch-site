import { test } from 'node:test';
import assert from 'node:assert/strict';
import { loadRelease, parseRelease, LATEST, REPOSITORY, WINDOWS, CHECKSUMS } from '../scripts/release.mjs';
import { renderPage } from '../src/page.mjs';

const stable = () => ({
  tag_name: 'v8.1.2', draft: false, prerelease: false,
  html_url: `${REPOSITORY}/releases/tag/v8.1.2`,
  assets: [
    { name: 'source.zip', browser_download_url: `${REPOSITORY}/archive/main.zip` },
    { name: CHECKSUMS, browser_download_url: `${REPOSITORY}/releases/download/v8.1.2/${CHECKSUMS}` },
    { name: WINDOWS, browser_download_url: `${REPOSITORY}/releases/download/v8.1.2/${WINDOWS}` },
  ],
});
test('selects exact Windows asset regardless of ordering; keeps download pointed at Latest', () => {
  const result = parseRelease(stable());
  assert.equal(result.status, 'verified');
  assert.equal(result.version, 'v8.1.2');
  assert.equal(result.downloadUrl, `${LATEST}/download/${WINDOWS}`);
  assert.equal(result.checksumUrl, `${LATEST}/download/${CHECKSUMS}`);
});
test('missing Windows package never silently uses source ZIP or another platform', () => {
  const data = stable(); data.assets = data.assets.filter(a => a.name !== WINDOWS);
  const result = parseRelease(data);
  assert.equal(result.status, 'fallback'); assert.equal(result.downloadUrl, LATEST);
});
test('missing checksums, malformed fields, drafts and prereleases fall back safely', () => {
  for (const data of [null, {}, { ...stable(), tag_name: null }, { ...stable(), draft: true }, { ...stable(), prerelease: true }, { ...stable(), assets: [] }, { ...stable(), assets: stable().assets.filter(a => a.name !== CHECKSUMS) }]) {
    const result = parseRelease(data);
    assert.equal(result.status, 'fallback'); assert.equal(result.version, null);
  }
});
test('untrusted download and release URLs are not rendered', () => {
  const data = stable(); data.assets[2].browser_download_url = 'https://example.com/malware.zip';
  assert.equal(parseRelease(data).downloadUrl, LATEST);
  assert.equal(parseRelease({ ...stable(), html_url: 'javascript:alert(1)' }).releaseUrl, LATEST);
});
for (const status of [403, 404, 429, 500]) test(`GitHub HTTP ${status} yields usable bilingual pages`, async () => {
  const result = await loadRelease({ fetcher: async () => ({ ok: false, status }) });
  for (const lang of ['en', 'zh-CN']) {
    const html = renderPage({ lang, origin: 'https://netwatch.pkqa.top', release: result });
    assert.ok(html.includes(`href="${LATEST}"`));
    assert.ok(html.includes(lang === 'en' ? 'View latest release' : '查看最新发行版'));
    assert.ok(!html.includes('undefined'));
    assert.ok(!html.includes('<script'));
  }
});
test('network, timeout, invalid JSON and offline builds remain navigable', async () => {
  const cases = [
    { fetcher: async () => { throw new Error('no network'); } },
    { fetcher: async () => { throw new DOMException('timeout', 'TimeoutError'); } },
    { fetcher: async () => ({ ok: true, json: async () => { throw new Error('invalid JSON'); } }) },
    { offline: true, fetcher: async () => { throw new Error('must not fetch'); } },
  ];
  for (const options of cases) {
    const result = await loadRelease(options);
    assert.equal(result.status, 'fallback'); assert.equal(result.downloadUrl, LATEST);
  }
});
test('fetch passes a timeout signal and public headers, without credentials', async () => {
  const result = await loadRelease({ fetcher: async (url, options) => {
    assert.ok(url.endsWith('/releases/latest'));
    assert.ok(options.signal instanceof AbortSignal);
    assert.ok(!('Authorization' in options.headers));
    return { ok: true, json: async () => stable() };
  } });
  assert.equal(result.status, 'verified');
});

test('an optional build token is confined to the API request and never enters output', async () => {
  const token = 'synthetic-build-token';
  const result = await loadRelease({ token, fetcher: async (url, options) => {
    assert.equal(url, 'https://api.github.com/repos/GloryPkqa/codex-netwatch/releases/latest');
    assert.equal(options.headers.Authorization, `Bearer ${token}`);
    return { ok: true, json: async () => stable() };
  }});
  assert.equal(JSON.stringify(result).includes(token), false);
  for (const lang of ['en', 'zh-CN']) {
    const html = renderPage({ lang, origin: 'https://netwatch.pkqa.top', release: result });
    assert.ok(html.includes('v8.1.2'));
    assert.ok(!html.includes(token));
  }
});
