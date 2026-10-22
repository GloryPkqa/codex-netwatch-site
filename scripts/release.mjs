export const REPOSITORY = 'https://github.com/GloryPkqa/codex-netwatch';
export const LATEST = `${REPOSITORY}/releases/latest`;
export const WINDOWS = 'codex-netwatch-windows-x64.zip';
export const CHECKSUMS = 'SHA256SUMS.txt';

const fallback = (reason) => ({
  status: 'fallback', version: null, releaseUrl: LATEST,
  downloadUrl: LATEST, checksumUrl: LATEST, reason,
});

function trustedUrl(value, prefix) {
  if (typeof value !== 'string' || !value.startsWith(prefix)) return false;
  try { const u = new URL(value); return u.protocol === 'https:' && !u.username && !u.password && !u.search && !u.hash; }
  catch { return false; }
}

export function parseRelease(data) {
  if (!data || data.draft !== false || data.prerelease !== false ||
      typeof data.tag_name !== 'string' || !/^v?\d+\.\d+\.\d+(?:[.+-][\w.-]+)?$/.test(data.tag_name) ||
      !trustedUrl(data.html_url, `${REPOSITORY}/releases/tag/`) || !Array.isArray(data.assets)) {
    return fallback('Invalid or non-stable release metadata');
  }
  const asset = data.assets.find(a => a?.name === WINDOWS);
  const sums = data.assets.find(a => a?.name === CHECKSUMS);
  const prefix = `${REPOSITORY}/releases/download/`;
  if (!asset || !trustedUrl(asset.browser_download_url, prefix) ||
      !asset.browser_download_url.endsWith(`/${WINDOWS}`)) return fallback('Windows asset missing or invalid');
  if (!sums || !trustedUrl(sums.browser_download_url, prefix) ||
      !sums.browser_download_url.endsWith(`/${CHECKSUMS}`)) return fallback('Checksum asset missing or invalid');
  return {
    status: 'verified', version: data.tag_name, releaseUrl: data.html_url,
    downloadUrl: `${LATEST}/download/${WINDOWS}`,
    checksumUrl: `${LATEST}/download/${CHECKSUMS}`, reason: null,
  };
}

export async function loadRelease({ fetcher = fetch, offline = false, timeoutMs = 10000, token } = {}) {
  if (offline) return fallback('Offline build requested');
  try {
    const response = await fetcher('https://api.github.com/repos/GloryPkqa/codex-netwatch/releases/latest', {
      headers: { Accept: 'application/vnd.github+json', 'User-Agent': 'codex-netwatch-website', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      signal: AbortSignal.timeout(timeoutMs),
    });
    if (!response.ok) return fallback(`GitHub HTTP ${response.status}`);
    return parseRelease(await response.json());
  } catch (error) {
    return fallback(error?.name === 'TimeoutError' ? 'GitHub request timed out' : 'GitHub unavailable or invalid JSON');
  }
}
