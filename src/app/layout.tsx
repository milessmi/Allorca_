import { ClerkProvider } from '@clerk/nextjs'
import { DM_Serif_Display, DM_Mono, DM_Sans } from 'next/font/google'
import './globals.css'

const serif = DM_Serif_Display({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
})

const mono = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
})

const sans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-sans',
})

export const metadata = {
  title: 'Allorca \u2014 Portfolio Demo',
  description: 'An archived demo of Allorca, an investing-education platform built by Miles Smith in 2026. Not an active product.',
  robots: { index: false, follow: false, nocache: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${serif.variable} ${mono.variable} ${sans.variable}`}>
        <body>{children}</body>
      </html>
    </ClerkProvider>
  )
}