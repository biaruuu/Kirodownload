# Kiro download site

The public page for Kiro, an anime app for Android: what it
does, screenshots, how to install, and a download button that always points at the newest release.

Built with **Next.js** (App Router), **styled-components** and **Fluent icons**
(`@fluentui/react-icons`). The look follows the app: dark, one white accent, pill buttons,
hairline dividers.

## How the download button works

`lib/release.js` asks the GitHub API for the latest release of this repository (`biaruuu/Kirodownload`,
where new Kiro builds are published; it falls back to the previous source until the first one is here) and
caches it for 10 minutes. The Install button goes to `/api/download`, which counts the download and
redirects to the newest `.apk`. If GitHub can't be reached it falls back to the releases page.

## Live download count

`/api/download` adds 1 to `stats/downloads.total` in Firestore (the same one person tapping again within
10 minutes counts once, crawlers never count). The page reads `/api/count` every 4 seconds, so the number
moves while people watch it. Set this in Vercel (Project settings > Environment variables):

- `FIREBASE_SERVICE_ACCOUNT`: the Firebase service account JSON (Firebase console > Project settings >
  Service accounts > Generate new private key), pasted as is or base64 encoded.

Nothing else is needed and the Firestore rules stay closed: only the server reads and writes the count.
Without the variable the site works and simply hides the counter.

## Run it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

## Deploy on Vercel

Import this repository in Vercel. No settings are needed (framework: Next.js). Every push to
`main` redeploys it.

## Edit the content

- Features, screenshots and install steps: `components/Site.js` (the `FEATURES`, `SCREENS` and
  `STEPS` lists at the top).
- Colours and spacing: `components/GlobalStyle.js` (`theme`).
- Screenshots: `public/screens/`.
