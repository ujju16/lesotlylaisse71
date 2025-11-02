import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import AxeptioConsent from './components/AxeptioConsent';
import ThemeInitializer from './components/ThemeInitializer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://lesotlylaisse71.fr'),
  title: {
    default: "Le Sot l'y Laisse - Restaurant, Bar, Tabac Presse à Messey-sur-Grosne",
    template: "%s | Le Sot l'y Laisse",
  },
  description:
    'Restaurant traditionnel, bar convivial et tabac presse à Messey-sur-Grosne (71). Cuisine locale, produits du terroir, ambiance familiale. Ouvert le midi tous les jours.',
  keywords: [
    'restaurant Messey-sur-Grosne',
    'bar Saône-et-Loire',
    'tabac presse 71',
    'cuisine locale Bourgogne',
    'restaurant traditionnel',
    'commerce de proximité',
    'Messey-sur-Grosne',
    'terroir bourguignon',
    'restaurant 71390',
  ],
  authors: [{ name: "Le Sot l'y Laisse" }],
  creator: "Le Sot l'y Laisse",
  publisher: "Le Sot l'y Laisse",
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://lesotlylaisse71.fr',
    siteName: "Le Sot l'y Laisse",
    title: "Le Sot l'y Laisse - Restaurant, Bar, Tabac Presse",
    description:
      'Restaurant traditionnel, bar convivial et tabac presse à Messey-sur-Grosne. Cuisine locale et ambiance familiale.',
    images: [
      {
        url: '/photo1.jpg',
        width: 1200,
        height: 630,
        alt: "Le Sot l'y Laisse - Restaurant à Messey-sur-Grosne",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Le Sot l'y Laisse - Restaurant, Bar, Tabac Presse",
    description: 'Restaurant traditionnel et bar à Messey-sur-Grosne (71)',
    images: ['/photo1.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeInitializer />
        <AxeptioConsent />
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
