import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import AxeptioConsent from "./components/AxeptioConsent";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LeSotLyLaisse71 - Restaurant Bar Tabac",
  description: "Restaurant bar tabac à Messey Sur Grosne - Cuisine locale et produits du terroir",
  keywords: ["restaurant", "bar", "tabac", "Messey Sur Grosne", "cuisine locale", "terroir", "Bourgogne"],
  authors: [{ name: "LeSotLyLaisse71" }],
  creator: "LeSotLyLaisse71",
  publisher: "LeSotLyLaisse71",
  metadataBase: new URL('https://lesotlylaisse71.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://lesotlylaisse71.vercel.app',
    title: 'LeSotLyLaisse71 - Restaurant Bar Tabac',
    description: 'Restaurant bar tabac à Messey Sur Grosne - Cuisine locale et produits du terroir',
    siteName: 'LeSotLyLaisse71',
    images: [
      {
        url: '/logo_soly.png',
        width: 1200,
        height: 630,
        alt: 'LeSotLyLaisse71 - Restaurant Bar Tabac',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LeSotLyLaisse71 - Restaurant Bar Tabac',
    description: 'Restaurant bar tabac à Messey Sur Grosne - Cuisine locale et produits du terroir',
    images: ['/logo_soly.png'],
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
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
        <AxeptioConsent />
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
