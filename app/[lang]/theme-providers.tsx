// 'use client'

// import siteMetadata from '@/data/siteMetadata'
// import { ThemeProvider } from 'next-themes'

// export function ThemeProviders({ children }: { children: React.ReactNode }) {
//     return (
//         <ThemeProvider
//             attribute="class"
//             defaultTheme={siteMetadata.theme}
//             enableSystem
//             disableTransitionOnChange
//         >
//             {children}
//         </ThemeProvider>
//     )
// }


"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { CurrencyProvider } from "lib/context/currency_context";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function ThemeProviders({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  return (
    <NextUIProvider navigate={router.push}>
      <NextThemesProvider defaultTheme="light">
        <CurrencyProvider>
          {children}
        </CurrencyProvider>
        </NextThemesProvider>
    </NextUIProvider>
  );
}