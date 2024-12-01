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

export default async function RootLayout({ children, params, }: { children: React.ReactNode; params: { lang: Locale }; }) {
    const dictionary = await getDictionary(params.lang);
    return (
        <html
            lang={params.lang}
            className={`${font.variable} scroll-smooth`}
            suppressHydrationWarning
        >
            <link
                rel="apple-touch-icon"
                sizes="76x76"
                href="/static/favicons/apple-touch-icon.png"
            />
            <link
                rel="icon"
                type="image/png"
                sizes="32x32"
                href="/static/favicons/favicon-32x32.png"
            />
            <link
                rel="icon"
                type="image/png"
                sizes="16x16"
                href="/static/favicons/favicon-16x16.png"
            />

            <link rel="manifest" href="/static/favicons/site.webmanifest" />
            <link rel="mask-icon" href="/static/favicons/safari-pinned-tab.svg" color="#5bbad5" />
            <meta name="msapplication-TileColor" content="#000000" />
            <meta name="theme-color" media="(prefers-color-scheme: light)" content="#E9D3B6" />
            <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000000" />
            <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
            {/* <Script type="text/javascript"  src="//cdn.cookie-script.com/s/9daf868f81da50915192beccc1e1edc3.js"/> */}
            <Script 
                async 
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1946644893911245" 
                crossOrigin='anonymous'
                strategy="lazyOnload"
            />

            <body className="bg-background antialiased ">
                <ThemeProviders>
                    <Analytics />
                        <div className="flex flex-col min-h-screen">
                            <SearchProvider searchConfig={siteMetadata.search as SearchConfig}>
                            {/* <Header /> */}
                            <Navbar dictionary={dictionary}/>
                            <main className="flex-grow container mx-auto max-w-7xl px-6 mt-[80px]">
                                {children}
                            </main>
                            <Footer />
                            </SearchProvider>
                        </div>
                </ThemeProviders>
                
                {/* <Script
                    src="https://cdn.cookie-script.com/s/9daf868f81da50915192beccc1e1edc3.js"
                    strategy="beforeInteractive"
             /> */}
            </body>
            <GoogleAnalytics gaId="G-M1NBC50F94" />
        </html>
    )
}
