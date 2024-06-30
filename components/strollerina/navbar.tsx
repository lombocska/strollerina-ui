'use client'

import headerNavLinks from '@/data/headerNavLinks'
import { cn } from '@/scripts/utils/tailwind-helpers'
import { useEffect, useState } from 'react'
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { useTheme } from "next-themes";
import clsx from "clsx";
import NextLink from "next/link";
import LocaleSwitcher from "../locale-switcher";
import SearchButton from "../SearchButton";
import { ThemeSwitch } from "components/strollerina/theme-switch";
import { Logo } from "@/components/icons";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false); // Állapot a menü nyitva tartásához
  const { theme } = useTheme();

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

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleMenuItemClick = () => {
    setMenuOpen(false); // Bezárja a menüt, amikor egy menüpontot kiválasztanak
  };

  return (
    <NextUINavbar isMenuOpen={menuOpen} >
      <header className="fixed inset-x-0 top-4 z-40 flex h-[60px] justify-center">
        <div
          className={cn(
            'mx-6 w-full max-w-[375px] items-center justify-between rounded-3xl border border-border  px-4 shadow-sm saturate-100 backdrop-blur-[10px] sm:max-w-screen-sm lg:max-w-screen-lg xl:max-w-screen-xl',
            isScrolled && 'border-transparent bg-background/80 ',
            theme === 'dark' ? 'dark:bg-transparent' : 'bg-secondary'
          )}
        >
          <div className="mx-auto flex h-[60px] w-full items-center justify-between">
            <NavbarContent>
              <NavbarBrand as="li" className="gap-3 max-w-fit">
                <NextLink className="flex justify-start items-center gap-1" href="/">
                  <Logo />
                </NextLink>
              </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden lg:flex lg:basis-full" justify="end">
              <NavbarItem className="hidden lg:flex gap-2">
                <ul className="hidden lg:flex gap-4 justify-start ml-2">
                  {headerNavLinks.map((item) => (
                    <NavbarItem key={item.href}>
                        <NextLink
                          className={clsx(
                            'data-[active=true]:text-primary data-[active=true]:font-medium font-large text-muted-foreground hover:text-foreground',
                          )}
                          color="foreground"
                          href={item.href}
                        >
                          {item.title}
                        </NextLink>
                    </NavbarItem>
                  ))}
                </ul>
              </NavbarItem>

              <NavbarItem className="hidden lg:flex gap-2">
                <LocaleSwitcher />
              </NavbarItem>

              <ThemeSwitch />
              <SearchButton />
            </NavbarContent>

            <NavbarContent className="lg:hidden basis-1 pl-4" justify="end">
              <ThemeSwitch />
              <SearchButton />
              <NavbarMenuToggle onClick={handleMenuToggle} />
            </NavbarContent>

            <NavbarMenu >
              <div className="mx-4 mt-2 flex flex-col gap-2">
                {headerNavLinks.map((item, index) => (
                  <NavbarMenuItem key={`${item}-${index}`}>
                    <Link
                      color={
                        index === 2
                          ? "primary"
                          : index === headerNavLinks?.length - 1
                          ? "danger"
                          : "foreground"
                      }
                      href={item.href}
                      size="lg"
                      onPress={handleMenuItemClick} // Bezárja a menüt, amikor egy menüpontot kiválasztanak
                    >
                      {item.title}
                    </Link>
                  </NavbarMenuItem>
                ))}
                <LocaleSwitcher />
              </div>
            </NavbarMenu>
          </div>
        </div>
      </header>
    </NextUINavbar>
  );
};
