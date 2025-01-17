import { Alata, Albert_Sans, Inter as FontSans, JetBrains_Mono, League_Spartan } from "next/font/google";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

// export const fontMono = FontMono({
//   subsets: ["latin"],
//   variable: "--font-mono",
// });


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



export const spartan_font = League_Spartan({
  weight: ['300', '400', '700'], // Multiple weights
  style: ['normal'], // Add italic styles
  subsets: ['latin'], // Subset
  display: 'swap',
  variable: '--font-league-spartan',
})