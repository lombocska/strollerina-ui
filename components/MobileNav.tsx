'use client';

import { useState } from 'react';
import headerNavLinks from '@/data/headerNavLinks';
import { Menu } from 'lucide-react';
import Link from './Link';
import LocaleSwitcher from './locale-switcher';
import { Button } from './shadcn/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './shadcn/dropdown-menu';

const MobileNav = ({handleOpenChange}) => {

  return (
    <>

      <DropdownMenu onOpenChange={handleOpenChange}>
        <DropdownMenuTrigger asChild>
          <Button
            className="flex size-9 items-center justify-center p-2 lg:hidden"
            type="button"
            aria-label="Toggle menu"
            variant="ghost"
          >
            <span className="sr-only">Toggle menu</span>
            <Menu />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-[10rem] z-50">
          {headerNavLinks.map((link) => (
            <DropdownMenuItem key={link.title} asChild>
              <Link href={link.href} className="flex items-center gap-4">
                <div>{link.title}</div>
              </Link>
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem key={"locale-switcher"} asChild>
            <LocaleSwitcher isDesktop={false} />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default MobileNav;
