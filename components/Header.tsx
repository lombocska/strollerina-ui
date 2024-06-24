'use client'

import headerNavLinks from '@/data/headerNavLinks'
import siteMetadata from '@/data/siteMetadata'
import { cn } from '@/scripts/utils/tailwind-helpers'
import NextImage from 'next/image'
import { useEffect, useState } from 'react'

import Link from './Link'
import MobileNav from './MobileNav'
import SearchButton from './SearchButton'
import ThemeSwitch from './ThemeSwitch'
import { Button } from './shadcn/button'
import { Logo } from './icons'

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const changeBackground = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true)
            } else {
                setIsScrolled(false)
            }
        }

        document.addEventListener('scroll', changeBackground)

        return () => document.removeEventListener('scroll', changeBackground)
    }, [])

    return (
        <header className="fixed inset-x-0 top-4 z-40 flex h-[60px] justify-center">
            <div
                className={cn(
                    'mx-6 w-full max-w-[375px] items-center justify-between rounded-3xl border border-border bg-secondary px-4 shadow-sm saturate-100 backdrop-blur-[10px] sm:max-w-screen-sm lg:max-w-screen-lg xl:max-w-screen-xl',
                    isScrolled && 'border-transparent bg-background/80'
                )}
            >
                <div className="mx-auto flex h-[60px] w-full items-center justify-between">
                    <div>
                        <Link href="/" aria-label={siteMetadata.headerTitle}>
                            <div className="flex items-center justify-between rounded-full">
                                <Logo />
                            </div>
                        </Link>
                    </div>
                    <div className="flex items-center sm:space-x-3">
                        <ul className="hidden space-x-2 lg:flex">
                            {headerNavLinks.map((link, i) => (
                                <li key={i}>
                                    <Button
                                        variant="ghost"
                                        className="px-3 py-2 text-sm font-large text-muted-foreground hover:text-foreground"
                                    >
                                        <Link
                                            className="rounded px-3 py-2 text-lg font-medium text-muted-foreground transition-all duration-300 hover:bg-secondary hover:brightness-125"
                                            href={link.href}
                                        >
                                            {link.title}
                                        </Link>
                                    </Button>
                                </li>
                            ))}
                        </ul>
                        <SearchButton />
                        {/* <ThemeSwitch /> */}
                        <MobileNav />
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
