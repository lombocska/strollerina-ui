import Footer from '@/components/Footer'
import Header from '@/components/Header'
import siteMetadata from '@/data/siteMetadata'
import { Analytics } from '@vercel/analytics/react'
import 'css/tailwind.css'
import { Metadata } from 'next'
import { SearchConfig, SearchProvider } from 'pliny/search'
import 'pliny/search/algolia.css'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'
import { font, fontSans, albert_font, alata_font, spartan_font } from 'config/fonts'
import { i18n, type Locale } from "../../i18n-config"
import "../globals.css"
import { ThemeProviders } from './theme-providers'
import Script from 'next/script'
import CookieConsentComponent from '@/components/cookieconsent/CookieConsent'
import { Navbar } from '@/components/strollerina/navbar'
import { getDictionary } from 'get-dictionary'
import GoogleAdsense from '../../components/monetization/GoogleAdsense'
import Head from 'next/head'
// import CookieConsentComponent from '../components/CookieConsent';

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}
export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),

  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.title}`,
  },
  keywords: [
    'top rated infant stroller',
    'good strollers',
    'best prams and strollers',
    'best infant stroller',
    'recommended strollers for newborns',
    'strollers reviews',
    'strollers comparison',
    'best affordable strollers',
  ],
  description: siteMetadata.description,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: './',
    siteName: siteMetadata.title,
    images: [siteMetadata.socialBanner],
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: './',
    types: {
      'application/rss+xml': `${siteMetadata.siteUrl}/feed.xml`,
    },
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
  twitter: {
    title: siteMetadata.title,
    card: 'summary_large_image',
    images: [siteMetadata.socialBanner],
  },
  // Include custom meta tags here
  other: {
    // 'impact-site-verification': 'be0e4293-937f-4230-b938-660eb162efde',
  },
}

export default async function RootLayout({ children, params }: { children: React.ReactNode; params: { lang: Locale } }) {
  const dictionary = await getDictionary(params.lang);

  return (
    <html
      lang={params.lang}
      className={`${font.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <Head>
        {/* Favicon Links */}
        <link rel="icon" href="/static/favicons/favicon.ico" />
        {/* <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" /> */}
        <link rel="icon" type="image/png" sizes="16x16" href="/static/favicons/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/static/favicons/apple-touch-icon.png" />
        <link rel="manifest" href="/static/favicons/site.webmanifest" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <body className="bg-background antialiased ">
        <ThemeProviders>
          {/* <Analytics /> */}
          <div className="flex flex-col min-h-screen">
            <SearchProvider searchConfig={siteMetadata.search as SearchConfig}>
              <Navbar dictionary={dictionary} />
              <main className="flex-grow container mx-auto max-w-7xl px-6 mt-[80px]">
                {children}
              </main>
              <Footer />
            </SearchProvider>
          </div>
        </ThemeProviders>
      </body>
      {/* <GoogleTagManager gtmId='GTM-N8QDRF8F'/> */}
      <GoogleAnalytics gaId='G-M1NBC50F94' />
      <GoogleAdsense pId="1946644893911245" />
    </html>
  );
}

