'use client'

import siteMetadata from '@/data/siteMetadata'
import { Mail, Twitter } from 'lucide-react'
import { usePathname } from 'next/navigation'

import Link from './Link'
import CookieConsentComponent from './cookieconsent/CookieConsent'

export default function Footer() {
    const pathName = usePathname()

    return (
        <footer>
            <div className="mt-16 flex flex-col items-center justify-center">
                <div className="mb-3 flex justify-center space-x-4">
                    {siteMetadata.twitter && (
                        <a
                            href={siteMetadata.twitter}
                            className="text-muted-foreground hover:brightness-125 dark:hover:brightness-125"
                            aria-label="Twitter"
                            title="Twitter (@enscry)"
                        >
                            <Twitter size={24} />
                        </a>
                    )}
                    {siteMetadata.email && (
                        <a
                            href={`mailto:${siteMetadata.email}`}
                            className="text-muted-foreground hover:brightness-125 dark:hover:brightness-125"
                            aria-label="Email"
                            title="Email (jason -at- enscribe -dot- dev)"
                        >
                            <Mail size={24} />
                        </a>
                    )}
                </div>
                <div className="mb-10 flex flex-wrap justify-center space-x-2 text-sm text-muted-foreground">
                    <div>{siteMetadata.author}</div>
                    <div>{` • `}</div>
                    <div>{`© ${new Date().getFullYear()}`}</div>
                    <div>{` • `}</div>
                    <Link href="/">{siteMetadata.title}</Link>
                    <div>{` • `}</div>
                    <Link href="/contact">contact</Link>
                    <div>{` • `}</div>
                    <Link href="/gdpr">GDPR</Link>
                    <div>{` • `}</div>
                    {/* <CookieConsentComponent /> */}
                </div>
            </div>
        </footer>
    )
}
