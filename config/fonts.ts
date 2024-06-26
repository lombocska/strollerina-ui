import { Alata, Albert_Sans, Aleo, Fira_Code as FontMono, Inter as FontSans, JetBrains_Mono, League_Spartan } from "next/font/google";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});


export const font = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-jetbrains-mono',
})


export const albert_font = Albert_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-albert-sans',
})


export const alata_font = Alata({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-albert-sans',
})


export const aleo_font = Aleo({
  weight: '100',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-albert-sans',
})


export const spartan_font = League_Spartan({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-albert-sans',
})
