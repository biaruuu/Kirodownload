// The newest Kiro release, read from GitHub on the server and cached for 10 minutes by Next.js.
// If GitHub can't be reached the page still works and links to the releases page.
const REPO = 'biaruuu/KiroApp';

export const RELEASES_URL = `https://github.com/${REPO}/releases/latest`;

export async function getRelease() {
  const fallback = { version: null, url: RELEASES_URL, size: null, date: null, direct: false, notes: [] };
  try {
    const res = await fetch(`https://api.github.com/repos/${REPO}/releases/latest`, {
      headers: { Accept: 'application/vnd.github+json', 'User-Agent': 'kiro-download-site' },
      next: { revalidate: 600 },
    });
    if (!res.ok) return fallback;
    const json = await res.json();
    const apk = (json.assets || []).find((a) => /\.apk$/i.test(a.name));
    return {
      version: String(json.tag_name || '').replace(/^v/i, '') || null,
      url: apk ? apk.browser_download_url : RELEASES_URL,
      size: apk ? Math.round((apk.size / 1048576) * 10) / 10 : null,
      date: json.published_at || null,
      direct: Boolean(apk),
      notes: parseNotes(json.body),
    };
  } catch (e) {
    return fallback;
  }
}

// "What's new" bullets from the release notes (markdown), cleaned up for plain display.
function parseNotes(body) {
  if (!body) return [];
  return String(body)
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => /^[-*]\s+/.test(l))
    .map((l) => l.replace(/^[-*]\s+/, '').replace(/\*\*|`/g, '').replace(/\[([^\]]+)\]\([^)]*\)/g, '$1'))
    .filter(Boolean)
    .slice(0, 8);
}
