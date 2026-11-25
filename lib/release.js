// The newest Kiro release, read from GitHub on the server and cached for 10 minutes by Next.js.
// If GitHub can't be reached the page shows "Coming soon" instead of a button. No release or repository link is ever shown on the page.
// Releases live in this public repo (the app's source can stay private). Until the first release is
// published here, the older releases are used so the button never breaks (the file is streamed, never linked).
const REPOS = ['biaruuu/Kirodownload', 'biaruuu/KiroApp'];


export async function getRelease() {
  const fallback = { version: null, url: null, size: null, date: null, direct: false };
  try {
    let json = null;
    for (const repo of REPOS) {
      const res = await fetch(`https://api.github.com/repos/${repo}/releases/latest`, {
        headers: { Accept: 'application/vnd.github+json', 'User-Agent': 'kiro-download-site' },
        next: { revalidate: 600 },
      });
      if (res.ok) {
        json = await res.json();
        break;
      }
    }
    if (!json) return fallback;
    const apk = (json.assets || []).find((a) => /\.apk$/i.test(a.name));
    return {
      version: String(json.tag_name || '').replace(/^v/i, '') || null,
      url: apk ? apk.browser_download_url : null,
      size: apk ? Math.round((apk.size / 1048576) * 10) / 10 : null,
      date: json.published_at || null,
      direct: Boolean(apk),
    };
  } catch (e) {
    return fallback;
  }
}
