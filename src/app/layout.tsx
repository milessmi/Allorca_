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
  title: 'Allorca - Education-First Investing',
  description: 'Personalized investing education for college students',
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