import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Kalen Solves — Software for the way your business works',
  description: 'Focused software products and custom business tools designed around real workflows, real bottlenecks, and real outcomes.',
  generator: 'Kalen Solves',
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#080a10',
  userScalable: true,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className="bg-background"><body className="antialiased">{children}{process.env.NODE_ENV === 'production' && <Analytics />}</body></html>
}
