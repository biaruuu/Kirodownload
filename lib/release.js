// The newest Kiro release, read from GitHub on the server and cached for 10 minutes by Next.js.
// If GitHub can't be reached the page still works and links to the releases page.
const REPO = 'biaruuu/KiroApp';

export const RELEASES_URL = `https://github.com/${REPO}/releases/latest`;

export async function getRelease() {
  const fallback = { version: null, url: RELEASES_URL, size: null, date: null, direct: false };
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
    };
  } catch (e) {
    return fallback;
  }
}
