'use client';

import { createGlobalStyle } from 'styled-components';

export const theme = {
  bg: '#121212',
  card: '#18181B',
  line: '#222226',
  lineStrong: '#2E2E33',
  text: '#FFFFFF',
  muted: '#9A9AA2',
  dim: '#6A6A70',
  radius: '8px',
  pill: '999px',
  gutter: 'clamp(20px, 5vw, 48px)',
  max: '1120px',
};

export default createGlobalStyle`
  *, *::before, *::after { box-sizing: border-box; }
  html { -webkit-text-size-adjust: 100%; scroll-behavior: smooth; }
  body {
    margin: 0;
    background: ${theme.bg};
    color: ${theme.text};
    font-family: 'Helvetica Neue', Helvetica, Arial, system-ui, -apple-system, 'Segoe UI', sans-serif;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }
  a { color: inherit; text-decoration: none; }
  img { display: block; max-width: 100%; }
  h1, h2, h3, p { margin: 0; }
  ::selection { background: #fff; color: #000; }
  @media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } * { transition: none !important; } }
`;
