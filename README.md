# Kiro download site

The public page for [Kiro](https://github.com/biaruuu/KiroApp), an anime app for Android: what it
does, screenshots, how to install, and a download button that always points at the newest release.

Built with **Next.js** (App Router), **styled-components** and **Fluent icons**
(`@fluentui/react-icons`). The look follows the app: dark, one white accent, pill buttons,
hairline dividers.

## How the download button works

`lib/release.js` asks the GitHub API for the latest release of `biaruuu/KiroApp` on the server and
caches it for 10 minutes. The button links straight to that release's `.apk`, and the page shows
the version, size and date. If GitHub can't be reached it falls back to the releases page.

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
