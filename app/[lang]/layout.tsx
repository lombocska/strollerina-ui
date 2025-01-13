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

import { GoogleAnalytics } from '@next/third-parties/google'
import { font, fontSans, albert_font, alata_font, spartan_font } from 'config/fonts'
import { i18n, type Locale } from "../../i18n-config"
import "../globals.css"
import { ThemeProviders } from './theme-providers'
import Script from 'next/script'
import CookieConsentComponent from '@/components/cookieconsent/CookieConsent'
import { Navbar } from '@/components/strollerina/navbar'
import { getDictionary } from 'get-dictionary'
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
}

export default async function RootLayout({ children, params }: { children: React.ReactNode; params: { lang: Locale } }) {
    const dictionary = await getDictionary(params.lang);
  
    return (
      <html
        lang={params.lang}
        className={`${font.variable} scroll-smooth`}
        suppressHydrationWarning
      >
        {/* GTM Header */}
        <Script
          id="google-tag-manager"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-N8QDRF8F');`,
          }}
        />
  
        <body className="bg-background antialiased ">
          {/* GTM Body */}
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-N8QDRF8F"
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            ></iframe>
          </noscript>
  
          <ThemeProviders>
            <Analytics />
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
      </html>
    );
  }
  
