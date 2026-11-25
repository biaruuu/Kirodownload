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

export default function Site({ release }) {
  const [downloads, onInstall] = useDownloads();
  const ready = release.direct;
  const facts = [
    release.version ? `v${release.version}` : null,
    release.size ? `${release.size} MB` : null,
    'Android 8+',
    downloads === null ? null : `${downloads.toLocaleString('en-US')} downloads`,
  ].filter(Boolean);

  return (
    <Page>
      <Nav>
        <Wrap $row>
          <Brand href="#top">KIRO</Brand>
          <NavLinks>
            <NavLink href="#screens">Screens</NavLink>
            <NavLink href="#features">Features</NavLink>
            <NavLink href="#install">Install</NavLink>
          </NavLinks>
        </Wrap>
      </Nav>

      <Hero id="top">
        <Wrap>
          <AppIcon src="/icon.svg" alt="Kiro app icon" width="96" height="96" />
          <Title>Anime, simply.</Title>
          <Lead>
            A calm, fast anime app for Android. Find a show, press play, and pick up exactly where you
            stopped, even offline.
          </Lead>
          {ready ? (
            <Pill href="/api/download" onClick={onInstall}>
              <ArrowDownload24Regular />
              Download for Android
            </Pill>
          ) : (
            <Pill as="span" $off>
              Coming soon
            </Pill>
          )}
          <Facts>
            {facts.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </Facts>
        </Wrap>
      </Hero>

      <Block id="screens">
        <Wrap>
          <Label>Screens</Label>
        </Wrap>
        <Rail>
          {SCREENS.map((sc) => (
            <Shot key={sc.name}>
              <Frame>
                <img src={sc.src} alt={`Kiro ${sc.name} screen`} width="640" height={sc.h} loading="lazy" />
              </Frame>
              <figcaption>
                <b>{sc.name}</b>
                <span>{sc.note}</span>
              </figcaption>
            </Shot>
          ))}
        </Rail>
      </Block>

      <Block id="features">
        <Wrap>
          <Label>Features</Label>
          <List>
            {FEATURES.map(({ icon: Icon, title, text }) => (
              <Item key={title}>
                <Icon />
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </Item>
            ))}
          </List>
        </Wrap>
      </Block>

      <Block id="install">
        <Wrap>
          <Label>Install</Label>
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

      <Footer>
        <Wrap>
          <FootNote>
            Kiro does not host any video. Anime information comes from AniList. Kiro is not affiliated
            with any studio or streaming service.
          </FootNote>
        </Wrap>
      </Footer>

      {ready ? (
        <Bar>
          <Pill href="/api/download" onClick={onInstall}>
            <ArrowDownload24Regular />
            Download{release.size ? ` · ${release.size} MB` : ''}
          </Pill>
        </Bar>
      ) : null}
    </Page>
  );
}

/* ---------------------------------------------------------------- styles */

const Page = styled.main`
  min-height: 100vh;
  @media (max-width: 720px) { padding-bottom: 88px; }
`;

const Wrap = styled.div`
  width: 100%;
  max-width: 880px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.gutter};
  ${({ $row }) => ($row ? 'display: flex; align-items: center; justify-content: space-between; height: 56px;' : '')}
`;

const Nav = styled.nav`
  position: sticky;
  top: 0;
  z-index: 10;
  background: rgba(18, 18, 18, 0.82);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
`;

const Brand = styled.a`
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.32em;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 4px;
`;

const NavLink = styled.a`
  padding: 8px 12px;
  border-radius: 10px;
  font-size: 14px;
  color: ${({ theme }) => theme.muted};
  transition: color 0.15s, background 0.15s;
  &:hover { color: #fff; background: rgba(255, 255, 255, 0.06); }
  @media (max-width: 420px) { padding: 8px 8px; font-size: 13px; }
`;

const Hero = styled.header`
  padding: clamp(56px, 12vw, 112px) 0 clamp(48px, 9vw, 88px);
  text-align: center;
  ${Wrap} { display: flex; flex-direction: column; align-items: center; }
`;

const AppIcon = styled.img`
  width: 96px;
  height: 96px;
  border-radius: 24px;
  margin-bottom: 28px;
`;

const Title = styled.h1`
  margin: 0;
  font-size: clamp(36px, 8vw, 64px);
  line-height: 1.05;
  font-weight: 600;
  letter-spacing: -0.03em;
`;

const Lead = styled.p`
  max-width: 520px;
  margin-top: 18px;
  font-size: clamp(16px, 2.4vw, 18px);
  line-height: 1.6;
  color: ${({ theme }) => theme.muted};
`;

const Pill = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 52px;
  margin-top: 32px;
  padding: 0 28px;
  border-radius: 16px;
  background: ${({ $off }) => ($off ? '#222226' : '#fff')};
  color: ${({ $off }) => ($off ? '#6A6A70' : '#000')};
  font-size: 16px;
  font-weight: 600;
  cursor: ${({ $off }) => ($off ? 'default' : 'pointer')};
  transition: transform 0.15s, opacity 0.15s;
  svg { width: 20px; height: 20px; }
  ${({ $off }) => ($off ? '' : '&:hover { opacity: 0.9; } &:active { transform: scale(0.98); }')}
`;

const Facts = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 6px 0;
  margin: 18px 0 0;
  padding: 0;
  list-style: none;
  font-size: 13px;
  color: ${({ theme }) => theme.dim};
  li + li::before { content: '·'; margin: 0 10px; }
`;

const Block = styled.section`
  padding: clamp(40px, 7vw, 72px) 0;
  border-top: 1px solid ${({ theme }) => theme.line};
`;

const Label = styled.h2`
  margin: 0 0 28px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.dim};
`;

const Rail = styled.div`
  display: flex;
  gap: 16px;
  overflow-x: auto;
  padding: 0 ${({ theme }) => theme.gutter} 8px;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
  @media (min-width: 960px) { justify-content: center; }
`;

const Shot = styled.figure`
  flex: 0 0 auto;
  width: clamp(190px, 52vw, 240px);
  margin: 0;
  scroll-snap-align: center;
  figcaption { margin-top: 12px; display: flex; flex-direction: column; gap: 2px; font-size: 13px; }
  figcaption b { font-weight: 600; }
  figcaption span { color: ${({ theme }) => theme.dim}; }
`;

const Frame = styled.div`
  overflow: hidden;
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.lineStrong};
  background: ${({ theme }) => theme.card};
  img { width: 100%; height: auto; }
`;

const List = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px 48px;
  @media (max-width: 720px) { grid-template-columns: 1fr; gap: 24px; }
`;

const Item = styled.div`
  display: flex;
  gap: 14px;
  svg { flex: 0 0 auto; width: 22px; height: 22px; margin-top: 2px; color: #fff; }
  h3 { margin: 0 0 4px; font-size: 16px; font-weight: 600; }
  p { font-size: 14px; line-height: 1.6; color: ${({ theme }) => theme.muted}; }
`;

const Steps = styled.ol`
  display: grid;
  gap: 24px;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const Step = styled.li`
  display: flex;
  gap: 16px;
  h3 { margin: 0 0 4px; font-size: 16px; font-weight: 600; }
  p { font-size: 14px; line-height: 1.6; color: ${({ theme }) => theme.muted}; }
`;

const Num = styled.span`
  flex: 0 0 auto;
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.lineStrong};
  font-size: 13px;
  font-weight: 600;
`;

const Footer = styled.footer`
  padding: 40px 0 56px;
  border-top: 1px solid ${({ theme }) => theme.line};
`;

const FootNote = styled.p`
  max-width: 560px;
  font-size: 12px;
  line-height: 1.7;
  color: ${({ theme }) => theme.dim};
`;

const Bar = styled.div`
  display: none;
  @media (max-width: 720px) {
    display: flex;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 20;
    justify-content: center;
    padding: 12px ${({ theme }) => theme.gutter} calc(12px + env(safe-area-inset-bottom));
    background: rgba(18, 18, 18, 0.9);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    border-top: 1px solid ${({ theme }) => theme.line};
    a { width: 100%; margin-top: 0; height: 48px; }
  }
`;
