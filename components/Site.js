'use client';

import styled from 'styled-components';
import {
  ArrowDownload24Regular,
  ArrowDownload20Regular,
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
  Checkmark20Regular,
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

export default function Site({ release, dateLabel }) {
  const meta = [
    release.version ? `Version ${release.version}` : null,
    release.size ? `${release.size} MB` : null,
    'Android 8.0 or newer',
  ].filter(Boolean);

  return (
    <Page>
      <Nav>
        <Wrap $row>
          <Brand href="#top">KIRO</Brand>
          <NavLinks>
            <NavLink href="#features">Features</NavLink>
            <NavLink href="#screens">Screens</NavLink>
            <NavLink href="#install">Install</NavLink>
          </NavLinks>
          <Pill href={release.url} $small>
            <ArrowDownload20Regular />
            Download
          </Pill>
        </Wrap>
      </Nav>

      <Hero id="top">
        <Wrap $hero>
          <HeroText>
            <Eyebrow>Free for Android</Eyebrow>
            <H1>Anime, simply.</H1>
            <Lead>
              A calm, fast anime app. Find a show, press play, and pick up exactly where you stopped,
              on any phone, even offline.
            </Lead>
            <Actions>
              <Pill href={release.url}>
                <ArrowDownload24Regular />
                Download for Android
              </Pill>
              <Ghost href="#features">See features</Ghost>
            </Actions>
            <Meta>
              {meta.map((m) => (
                <span key={m}>{m}</span>
              ))}
              {dateLabel ? <span>Released {dateLabel}</span> : null}
            </Meta>
          </HeroText>
          <HeroPhone>
            <Frame>
              <img src="/screens/home.jpg" alt="Kiro home screen" width="640" height="1279" />
            </Frame>
          </HeroPhone>
        </Wrap>
      </Hero>

      <Section id="features">
        <Wrap>
          <SectionHead>
            <H2>Everything you need, nothing you don’t</H2>
            <Sub>What Kiro does today.</Sub>
          </SectionHead>
          <Grid>
            {FEATURES.map(({ icon: Icon, title, text }) => (
              <Feature key={title}>
                <Icon />
                <h3>{title}</h3>
                <p>{text}</p>
              </Feature>
            ))}
          </Grid>
        </Wrap>
      </Section>

      <Section id="screens">
        <Wrap>
          <SectionHead>
            <H2>A look inside</H2>
            <Sub>One accent, plenty of space, content first.</Sub>
          </SectionHead>
        </Wrap>
        <Rail>
          {SCREENS.map((s) => (
            <Shot key={s.name}>
              <Frame>
                <img src={s.src} alt={`Kiro ${s.name} screen`} width="640" height={s.h} loading="lazy" />
              </Frame>
              <strong>{s.name}</strong>
              <span>{s.note}</span>
            </Shot>
          ))}
        </Rail>
      </Section>

      <Section id="install">
        <Wrap>
          <SectionHead>
            <H2>Install in a minute</H2>
            <Sub>Kiro is an APK, so there is no store listing to wait for.</Sub>
          </SectionHead>
          <Steps>
            {STEPS.map((s, i) => (
              <Step key={s.title}>
                <Num>{i + 1}</Num>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </Step>
            ))}
          </Steps>
          <Final>
            <Pill href={release.url}>
              <ArrowDownload24Regular />
              Download Kiro{release.version ? ` ${release.version}` : ''}
            </Pill>
            <Notes>
              <li><Checkmark20Regular /> Free, no ads from us</li>
              <li><Checkmark20Regular /> Updates arrive inside the app</li>
              <li><Checkmark20Regular /> Works on Android 8.0 and newer</li>
            </Notes>
          </Final>
        </Wrap>
      </Section>

      <Footer>
        <Wrap $row>
          <Brand href="#top">KIRO</Brand>
          <FootNote>
            Kiro does not host any video. Anime information comes from AniList. Kiro is not affiliated
            with any studio or streaming service.
          </FootNote>
          <NavLink href="https://github.com/biaruuu/KiroApp/releases" target="_blank" rel="noreferrer">
            All releases
          </NavLink>
        </Wrap>
      </Footer>
    </Page>
  );
}

/* ---------------------------------------------------------------- styles */

const Page = styled.main`
  min-height: 100vh;
`;

const Wrap = styled.div`
  max-width: ${({ theme }) => theme.max};
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.gutter};
  ${({ $row }) => $row && 'display: flex; align-items: center; justify-content: space-between; gap: 24px;'}
  ${({ $hero }) => $hero && `
    display: grid;
    grid-template-columns: 1.1fr 0.9fr;
    align-items: center;
    gap: clamp(32px, 6vw, 80px);
    @media (max-width: 860px) { grid-template-columns: 1fr; }
  `}
`;

const Nav = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;
  height: 64px;
  display: flex;
  align-items: center;
  background: rgba(18, 18, 18, 0.82);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-bottom: 1px solid ${({ theme }) => theme.line};
  > div { width: 100%; }
`;

const Brand = styled.a`
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 0.28em;
`;

const NavLinks = styled.nav`
  display: flex;
  gap: 28px;
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
  height: ${({ $small }) => ($small ? '38px' : '52px')};
  padding: 0 ${({ $small }) => ($small ? '16px' : '28px')};
  border-radius: ${({ theme }) => theme.pill};
  background: #fff;
  color: #000;
  font-size: ${({ $small }) => ($small ? '14px' : '16px')};
  font-weight: 600;
  white-space: nowrap;
  transition: transform 0.15s, opacity 0.15s;
  &:hover { opacity: 0.9; }
  &:active { transform: scale(0.98); }
  svg { flex: none; }
`;

const Ghost = styled.a`
  display: inline-flex;
  align-items: center;
  height: 52px;
  padding: 0 24px;
  border-radius: ${({ theme }) => theme.pill};
  border: 1px solid ${({ theme }) => theme.lineStrong};
  font-size: 16px;
  font-weight: 500;
  transition: border-color 0.15s;
  &:hover { border-color: #fff; }
`;

const Hero = styled.section`
  padding: clamp(40px, 8vw, 96px) 0 clamp(48px, 8vw, 96px);
`;

const HeroText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
`;

const Eyebrow = styled.span`
  color: ${({ theme }) => theme.muted};
  font-size: 14px;
  letter-spacing: 0.04em;
`;

const H1 = styled.h1`
  font-size: clamp(44px, 8vw, 84px);
  line-height: 1;
  font-weight: 700;
  letter-spacing: -0.03em;
`;

const Lead = styled.p`
  max-width: 480px;
  color: ${({ theme }) => theme.muted};
  font-size: clamp(16px, 2vw, 19px);
  line-height: 1.55;
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 8px;
`;

const Meta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px 16px;
  color: ${({ theme }) => theme.dim};
  font-size: 13px;
`;

const HeroPhone = styled.div`
  display: flex;
  justify-content: center;
`;

const Frame = styled.div`
  width: 100%;
  max-width: 300px;
  overflow: hidden;
  border-radius: 32px;
  border: 1px solid ${({ theme }) => theme.lineStrong};
  background: ${({ theme }) => theme.card};
  img { width: 100%; height: auto; }
`;

const Section = styled.section`
  padding: clamp(48px, 8vw, 96px) 0;
  border-top: 1px solid ${({ theme }) => theme.line};
`;

const SectionHead = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: clamp(28px, 5vw, 56px);
`;

const H2 = styled.h2`
  font-size: clamp(26px, 4vw, 40px);
  line-height: 1.15;
  font-weight: 700;
  letter-spacing: -0.02em;
`;

const Sub = styled.p`
  color: ${({ theme }) => theme.muted};
  font-size: 16px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr));
  gap: 0 clamp(24px, 4vw, 48px);
`;

const Feature = styled.article`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 28px 0;
  border-top: 1px solid ${({ theme }) => theme.line};
  svg { width: 24px; height: 24px; color: #fff; }
  h3 { font-size: 17px; font-weight: 600; }
  p { color: ${({ theme }) => theme.muted}; font-size: 15px; line-height: 1.55; }
`;

const Rail = styled.div`
  display: flex;
  gap: clamp(16px, 3vw, 28px);
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  padding: 0 ${({ theme }) => theme.gutter} 8px;
  max-width: calc(${({ theme }) => theme.max} + 2 * ${({ theme }) => theme.gutter});
  margin: 0 auto;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
`;

const Shot = styled.figure`
  flex: none;
  width: clamp(200px, 62vw, 260px);
  margin: 0;
  scroll-snap-align: start;
  display: flex;
  flex-direction: column;
  gap: 4px;
  ${Frame} { max-width: none; margin-bottom: 14px; border-radius: 28px; }
  strong { font-size: 15px; font-weight: 600; }
  span { color: ${({ theme }) => theme.muted}; font-size: 14px; }
`;

const Steps = styled.ol`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: clamp(24px, 4vw, 48px);
  @media (max-width: 760px) { grid-template-columns: 1fr; gap: 0; }
`;

const Step = styled.li`
  display: flex;
  gap: 16px;
  padding: 24px 0;
  border-top: 1px solid ${({ theme }) => theme.line};
  h3 { font-size: 17px; font-weight: 600; margin-bottom: 6px; }
  p { color: ${({ theme }) => theme.muted}; font-size: 15px; line-height: 1.55; }
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

const Final = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 20px 32px;
  margin-top: clamp(28px, 5vw, 48px);
`;

const Notes = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 8px 24px;
  color: ${({ theme }) => theme.muted};
  font-size: 14px;
  li { display: inline-flex; align-items: center; gap: 6px; }
  svg { color: #fff; }
`;

const Footer = styled.footer`
  padding: 32px 0 48px;
  border-top: 1px solid ${({ theme }) => theme.line};
  > div { align-items: flex-start; flex-wrap: wrap; }
`;

const FootNote = styled.p`
  flex: 1 1 280px;
  max-width: 520px;
  color: ${({ theme }) => theme.dim};
  font-size: 13px;
  line-height: 1.6;
`;
