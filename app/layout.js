import StyledComponentsRegistry from '../lib/registry';
import Providers from '../components/Providers';

export const metadata = {
  title: 'Kiro: anime, simply',
  description: 'Kiro is a minimalist anime streaming app for Android. Download the APK, free.',
  icons: { icon: '/icon.svg' },
  openGraph: {
    title: 'Kiro: anime, simply',
    description: 'A minimalist anime streaming app for Android.',
    type: 'website',
  },
};

export const viewport = {
  themeColor: '#121212',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <Providers>{children}</Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
