import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import SessionProviderWrapper from '@/components/SessionProviderWrapper'

export const metadata: Metadata = {
  title: 'Skillora - Professional Networking Platform',
  description: 'A modern professional networking platform that blends LinkedIn and Instagram aesthetics',
}

const montserrat = Montserrat({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className={montserrat.className}>
          <SessionProviderWrapper>
            <Navigation />
            <main className="min-h-screen">
              {children}
            </main>
          </SessionProviderWrapper>
        </div>
      </body>
    </html>
  )
} 