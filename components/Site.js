'use client';

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  ArrowDownload24Regular,
  Search24Regular,
  CalendarLtr24Regular,
  Alert24Regular,
  People24Regular,
  Star24Regular,
  Cloud24Regular,
  Translate24Regular,
  ClosedCaption24Regular,
  Trophy24Regular,
  PictureInPicture24Regular,
  DataBarVertical24Regular,
  Library24Regular,
  Video24Regular,
} from '@fluentui/react-icons';

const FEATURES = [
  { icon: Video24Regular, title: 'Every source, one tap', text: 'Kiro checks several streaming sources and plays the best one that works. Sub or dub, with Japanese, English and Filipino audio where it exists.' },
  { icon: ArrowDownload24Regular, title: 'Download and watch offline', text: 'Save episodes to your phone with a queue you control. Wi-Fi only, a storage limit, pause, resume and reorder.' },
  { icon: ClosedCaption24Regular, title: 'A player that stays out of the way', text: 'Skip intro and outro, a next episode button, double-tap to skip 10 seconds, picture in picture, HDR, and captions you can restyle.' },
  { icon: People24Regular, title: 'Watch party', text: 'Start a party, share a six letter code, and everyone follows the host: play, pause, seeking and the next episode.' },
  { icon: CalendarLtr24Regular, title: 'Schedule', text: 'The week’s airing anime in your own time zone, with a live countdown and a filter for shows in your list.' },
  { icon: Alert24Regular, title: 'New episode alerts', text: 'A quiet nudge when something in your list airs. Switch it off per show and set quiet hours.' },
  { icon: Library24Regular, title: 'Your library', text: 'Recently watched, My List, Completed and Rated, plus Watching, Plan to watch, On hold and Dropped. Synced with your account.' },
  { icon: Search24Regular, title: 'Search that filters', text: 'Combine genre, year, season, format and airing status, and sort by popularity, rating or date.' },
  { icon: DataBarVertical24Regular, title: 'Watch stats', text: 'Hours this week, your top genres, daily quests and a weekly recap, with a streak that keeps you coming back.' },
  { icon: Trophy24Regular, title: 'XP, levels and badges', text: 'Earn XP for watching, finishing and rating. Collect badges and show off your level on your profile.' },
  { icon: Star24Regular, title: 'Make it yours', text: 'Customize your profile, rearrange or hide rows on Home, and rate and mark shows the way you like.' },
  { icon: Cloud24Regular, title: 'Cloud sync', text: 'Sign in and your list, progress and profile follow you to a new phone.' },
  { icon: Translate24Regular, title: 'English and Filipino', text: 'The whole app speaks Filipino too. Pick it in Me > Language.' },
  { icon: PictureInPicture24Regular, title: 'Updates inside the app', text: 'Kiro tells you when a new version is out and installs it for you, with a page of what changed.' },
];

const SCREENS = [
  { src: '/screens/home.jpg', h: 1279, name: 'Home', note: 'Trending, and where you left off.' },
  { src: '/screens/search.jpg', h: 1284, name: 'Search', note: 'Genres, filters and sorting.' },
  { src: '/screens/schedule.jpg', h: 1268, name: 'Schedule', note: 'What airs today and next.' },
  { src: '/screens/library.jpg', h: 1288, name: 'Library', note: 'Everything you have watched.' },
  { src: '/screens/me.jpg', h: 1282, name: 'Me', note: 'Profile, stats and settings.' },
];

const STEPS = [
  { title: 'Download the APK', text: 'Tap the download button on this page from your Android phone.' },
  { title: 'Allow the install', text: 'When Android asks, allow installs from your browser or file manager. It is a one-time setting.' },
  { title: 'Open Kiro', text: 'Sign in to sync your library, or continue as a guest and start watching.' },
];

const TAGS = ['Anime', 'Streaming', 'Offline', 'Watch party', 'Sub & dub', 'Free'];

/** The download total, refreshed every few seconds while the page is open (and right after Install is tapped). */
function useDownloads() {
  const [count, setCount] = useState(null);
  useEffect(() => {
    let live = true;
    const load = async () => {
      if (document.hidden) return;
      try {
        const res = await fetch('/api/count', { cache: 'no-store' });
        const json = await res.json();
        if (live && typeof json.count === 'number') setCount(json.count);
      } catch (e) {
        /* keep the last number */
      }
    };
    load();
    const timer = setInterval(load, 4000);
    const onShow = () => load();
    document.addEventListener('visibilitychange', onShow);
    return () => {
      live = false;
      clearInterval(timer);
      document.removeEventListener('visibilitychange', onShow);
    };
  }, []);
  const bump = () => setTimeout(() => fetch('/api/count', { cache: 'no-store' }).then((r) => r.json()).then((j) => typeof j.count === 'number' && setCount(j.count)).catch(() => {}), 2500);
  return [count, bump];
}

export default function Site({ release, dateLabel }) {
  const [downloads, onInstall] = useDownloads();
  const installHref = release.direct ? '/api/download' : release.url;
  const version = release.version ? `v${release.version}` : 'Latest';
  const stats = [
    { value: release.size ? `${release.size} MB` : 'APK', label: 'Size' },
    { value: 'Android 8+', label: 'Requires' },
    { value: 'Free', label: 'Price' },
    { value: version, label: 'Version' },
    ...(downloads === null ? [] : [{ value: downloads.toLocaleString('en-US'), label: 'Downloads' }]),
  ];

  return (
    <Page>
      <Nav>
        <Wrap $row>
          <Brand href="#top">KIRO</Brand>
          <NavLinks>
            <NavLink href="#screens">Screenshots</NavLink>
            <NavLink href="#about">About</NavLink>
            <NavLink href="#info">App info</NavLink>
          </NavLinks>
        </Wrap>
      </Nav>

      <Wrap id="top">
        <Header>
          <AppIcon src="/icon.svg" alt="Kiro app icon" width="128" height="128" />
          <Titles>
            <Name>Kiro</Name>
            <Dev>Anime streaming</Dev>
            <Tiny>Contains no ads from us</Tiny>
          </Titles>
          <InstallCol>
            <Pill href={installHref} onClick={onInstall}>
              <ArrowDownload24Regular />
              Install
            </Pill>
            <Hint>Android APK{release.size ? ` · ${release.size} MB` : ''}</Hint>
          </InstallCol>
        </Header>

        <Stats>
          {stats.map((st) => (
            <Stat key={st.label}>
              <b>{st.value}</b>
              <span>{st.label}</span>
            </Stat>
          ))}
        </Stats>
      </Wrap>

      <Block id="screens">
        <Wrap>
          <H2>Screenshots</H2>
        </Wrap>
        <Rail>
          {SCREENS.map((sc) => (
            <Shot key={sc.name}>
              <Frame>
                <img src={sc.src} alt={`Kiro ${sc.name} screen`} width="640" height={sc.h} loading="lazy" />
              </Frame>
              <figcaption>{sc.name}</figcaption>
            </Shot>
          ))}
        </Rail>
      </Block>

      <Block id="about">
        <Wrap>
          <H2>About this app</H2>
          <Body>
            Kiro is a calm, fast anime app. Find a show, press play, and pick up exactly where you
            stopped, on any phone, even offline. It checks several sources for you, keeps your
            library in sync, and stays out of the way.
          </Body>
          <Tags>
            {TAGS.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </Tags>
        </Wrap>
      </Block>

      {release.notes && release.notes.length > 0 ? (
        <Block>
          <Wrap>
            <H2>What’s new</H2>
            <Small>
              {version}
              {dateLabel ? ` · ${dateLabel}` : ''}
            </Small>
            <Notes>
              {release.notes.map((n, i) => (
                <li key={i}>{n}</li>
              ))}
            </Notes>
          </Wrap>
        </Block>
      ) : null}

      <Block id="features">
        <Wrap>
          <H2>Features</H2>
          <Grid>
            {FEATURES.map(({ icon: Icon, title, text }) => (
              <Feature key={title}>
                <Icon />
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </Feature>
            ))}
          </Grid>
        </Wrap>
      </Block>

      <Block id="install">
        <Wrap>
          <H2>How to install</H2>
          <Steps>
            {STEPS.map((st, i) => (
              <Step key={st.title}>
                <Num>{i + 1}</Num>
                <div>
                  <h3>{st.title}</h3>
                  <p>{st.text}</p>
                </div>
              </Step>
            ))}
          </Steps>
        </Wrap>
      </Block>

      <Block id="info">
        <Wrap>
          <H2>App info</H2>
          <Info>
            <Row><dt>Version</dt><dd>{release.version || 'Latest'}</dd></Row>
            <Row><dt>Updated</dt><dd>{dateLabel || 'See releases'}</dd></Row>
            <Row><dt>Size</dt><dd>{release.size ? `${release.size} MB` : 'See releases'}</dd></Row>
            <Row><dt>Requires</dt><dd>Android 8.0 or newer</dd></Row>
            <Row><dt>Package</dt><dd>com.biaruuu.kiro</dd></Row>
            <Row><dt>Price</dt><dd>Free</dd></Row>
            <Row>
              <dt>All versions</dt>
              <dd><a href="https://github.com/biaruuu/KiroApp/releases" target="_blank" rel="noreferrer">GitHub releases</a></dd>
            </Row>
          </Info>
        </Wrap>
      </Block>

      <Footer>
        <Wrap>
          <FootNote>
            Kiro does not host any video. Anime information comes from AniList. Kiro is not affiliated
            with any studio or streaming service.
          </FootNote>
        </Wrap>
      </Footer>

      <Bar>
        <Pill href={installHref} onClick={onInstall}>
          <ArrowDownload24Regular />
          Install{release.size ? ` · ${release.size} MB` : ''}
        </Pill>
      </Bar>
    </Page>
  );
}

/* ---------------------------------------------------------------- styles */

const Page = styled.main`
  min-height: 100vh;
  @media (max-width: 720px) { padding-bottom: 88px; }
`;

const Wrap = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.gutter};
  ${({ $row }) => $row && 'display: flex; align-items: center; justify-content: space-between; gap: 24px;'}
`;

const Nav = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;
  height: 60px;
  display: flex;
  align-items: center;
  background: rgba(18, 18, 18, 0.85);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-bottom: 1px solid ${({ theme }) => theme.line};
  > div { width: 100%; }
`;

const Brand = styled.a`
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0.28em;
`;

const NavLinks = styled.nav`
  display: flex;
  gap: 24px;
  @media (max-width: 640px) { display: none; }
`;

const NavLink = styled.a`
  color: ${({ theme }) => theme.muted};
  font-size: 14px;
  transition: color 0.15s;
  &:hover { color: #fff; }
`;

const Pill = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  height: 48px;
  padding: 0 32px;
  border-radius: ${({ theme }) => theme.pill};
  background: #fff;
  color: #000;
  font-size: 16px;
  font-weight: 600;
  white-space: nowrap;
  transition: transform 0.15s, opacity 0.15s;
  &:hover { opacity: 0.9; }
  &:active { transform: scale(0.98); }
  svg { flex: none; }
`;

const Header = styled.section`
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: clamp(16px, 3vw, 32px);
  padding: clamp(28px, 6vw, 64px) 0 clamp(20px, 4vw, 32px);
  @media (max-width: 720px) {
    grid-template-columns: auto 1fr;
    grid-template-areas: 'icon titles' 'install install';
    > :nth-child(1) { grid-area: icon; }
    > :nth-child(2) { grid-area: titles; }
    > :nth-child(3) { grid-area: install; }
  }
`;

const AppIcon = styled.img`
  width: clamp(88px, 18vw, 128px);
  height: auto;
  aspect-ratio: 1;
  border-radius: 22.5%;
  border: 1px solid ${({ theme }) => theme.lineStrong};
`;

const Titles = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
`;

const Name = styled.h1`
  font-size: clamp(30px, 6vw, 44px);
  line-height: 1.1;
  font-weight: 700;
  letter-spacing: -0.02em;
`;

const Dev = styled.p`
  color: #fff;
  font-size: 16px;
  font-weight: 500;
`;

const Tiny = styled.p`
  color: ${({ theme }) => theme.muted};
  font-size: 13px;
`;

const InstallCol = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 8px;
  text-align: center;
  @media (min-width: 721px) { min-width: 200px; }
  a { width: 100%; }
`;

const Hint = styled.span`
  color: ${({ theme }) => theme.dim};
  font-size: 12px;
`;

const Stats = styled.section`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 16px 0;
  border-top: 1px solid ${({ theme }) => theme.line};
  border-bottom: 1px solid ${({ theme }) => theme.line};
  @media (max-width: 480px) { grid-template-columns: repeat(2, 1fr); row-gap: 16px; }
`;

const Stat = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: 0 8px;
  border-left: 1px solid ${({ theme }) => theme.line};
  &:first-child { border-left: 0; }
  @media (max-width: 480px) { &:nth-child(3) { border-left: 0; } }
  b { font-size: clamp(15px, 2.4vw, 17px); font-weight: 600; white-space: nowrap; }
  span { color: ${({ theme }) => theme.muted}; font-size: 12px; }
`;

const Block = styled.section`
  padding: clamp(28px, 5vw, 48px) 0 0;
`;

const H2 = styled.h2`
  font-size: clamp(20px, 3vw, 24px);
  line-height: 1.2;
  font-weight: 700;
  letter-spacing: -0.01em;
  margin-bottom: 16px;
`;

const Body = styled.p`
  max-width: 640px;
  color: ${({ theme }) => theme.muted};
  font-size: 16px;
  line-height: 1.65;
`;

const Small = styled.p`
  color: ${({ theme }) => theme.muted};
  font-size: 13px;
  margin: -8px 0 12px;
`;

const Tags = styled.ul`
  list-style: none;
  margin: 20px 0 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  li {
    padding: 7px 14px;
    border: 1px solid ${({ theme }) => theme.lineStrong};
    border-radius: ${({ theme }) => theme.pill};
    font-size: 13px;
    font-weight: 500;
  }
`;

const Frame = styled.div`
  width: 100%;
  overflow: hidden;
  border-radius: 24px;
  border: 1px solid ${({ theme }) => theme.lineStrong};
  background: ${({ theme }) => theme.card};
  img { width: 100%; height: auto; }
`;

const Rail = styled.div`
  display: flex;
  gap: 12px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-padding: 0 ${({ theme }) => theme.gutter};
  padding: 0 ${({ theme }) => theme.gutter} 8px;
  max-width: calc(960px + 2 * ${({ theme }) => theme.gutter});
  margin: 0 auto;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
`;

const Shot = styled.figure`
  flex: none;
  width: clamp(168px, 44vw, 230px);
  margin: 0;
  scroll-snap-align: start;
  figcaption { margin-top: 8px; color: ${({ theme }) => theme.muted}; font-size: 13px; text-align: center; }
`;

const Notes = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 10px;
  max-width: 680px;
  li {
    position: relative;
    padding-left: 18px;
    color: ${({ theme }) => theme.muted};
    font-size: 15px;
    line-height: 1.55;
  }
  li::before {
    content: '';
    position: absolute;
    left: 2px;
    top: 0.62em;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #fff;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0 clamp(24px, 5vw, 56px);
  @media (max-width: 720px) { grid-template-columns: 1fr; }
`;

const Feature = styled.article`
  display: flex;
  gap: 16px;
  padding: 20px 0;
  border-top: 1px solid ${({ theme }) => theme.line};
  > svg { flex: none; width: 24px; height: 24px; margin-top: 1px; color: #fff; }
  h3 { font-size: 16px; font-weight: 600; margin-bottom: 4px; }
  p { color: ${({ theme }) => theme.muted}; font-size: 14px; line-height: 1.55; }
`;

const Steps = styled.ol`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  max-width: 680px;
`;

const Step = styled.li`
  display: flex;
  gap: 16px;
  padding: 18px 0;
  border-top: 1px solid ${({ theme }) => theme.line};
  h3 { font-size: 16px; font-weight: 600; margin-bottom: 4px; }
  p { color: ${({ theme }) => theme.muted}; font-size: 14px; line-height: 1.55; }
`;

const Num = styled.span`
  flex: none;
  width: 28px;
  height: 28px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.lineStrong};
  font-size: 13px;
  font-weight: 600;
`;

const Info = styled.dl`
  margin: 0;
  max-width: 680px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 14px 0;
  border-top: 1px solid ${({ theme }) => theme.line};
  font-size: 15px;
  dt { color: ${({ theme }) => theme.muted}; }
  dd { margin: 0; text-align: right; }
  a { text-decoration: underline; text-underline-offset: 3px; }
`;

const Footer = styled.footer`
  margin-top: clamp(36px, 6vw, 64px);
  padding: 28px 0 40px;
  border-top: 1px solid ${({ theme }) => theme.line};
`;

const FootNote = styled.p`
  max-width: 560px;
  color: ${({ theme }) => theme.dim};
  font-size: 13px;
  line-height: 1.6;
`;

// Phones keep an Install button in reach, like a store page.
const Bar = styled.div`
  display: none;
  @media (max-width: 720px) {
    display: block;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 20;
    padding: 12px ${({ theme }) => theme.gutter} calc(12px + env(safe-area-inset-bottom));
    background: rgba(18, 18, 18, 0.9);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    border-top: 1px solid ${({ theme }) => theme.line};
    a { width: 100%; }
  }
`;
