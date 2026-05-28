import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/shared/theme-provider'
import { MotionProvider } from '@/shared/ui/motion-provider'
import { CustomCursor } from '@/shared/ui/custom-cursor'
import Script from 'next/script'
import { Suspense } from 'react'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
})

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: '--font-jetbrains-mono',
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  metadataBase: new URL('https://isllan.dev'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html 
      lang="pt" 
      className={`${inter.variable} ${jetbrainsMono.variable} bg-background`}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <body className="font-sans antialiased selection:bg-primary/30 selection:text-foreground" suppressHydrationWarning>
        <Script
          id="theme-strategy"
          src="/scripts/theme-init.js"
          strategy="beforeInteractive"
        />
        <Suspense>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
            enableColorScheme={false}
          >
            <MotionProvider>
              <CustomCursor />
              {children}
              {process.env.NODE_ENV === 'production' && <Analytics />}
            </MotionProvider>
          </ThemeProvider>
        </Suspense>
      </body>
    </html>
  )
}
