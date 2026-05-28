import { Inter, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/shared/theme-provider'
import { MotionProvider } from '@/shared/ui/motion-provider'
import { CustomCursor } from '@/shared/ui/custom-cursor'
import './globals.css'
import { headers } from 'next/headers'
import Script from 'next/script'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const locale = headersList.get('x-locale') || 'pt';

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://isllan.dev/#person",
        "name": "Isllan Toso Pereira",
        "url": "https://isllan.dev",
        "jobTitle": "Backend Developer",
        "image": "https://isllan.dev/perfil.png",
        "worksFor": {
          "@type": "Organization",
          "name": "Globalsys"
        },
        "sameAs": [
          "https://github.com/Isllanrx",
          "https://linkedin.com/in/isllantoso"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://isllan.dev/#website",
        "url": "https://isllan.dev",
        "name": "Isllan Toso Portfolio",
        "publisher": {
          "@id": "https://isllan.dev/#person"
        },
        "inLanguage": ["pt-BR", "en-US", "es-ES"]
      },
      {
        "@type": "ProfilePage",
        "@id": "https://isllan.dev/#webpage",
        "url": "https://isllan.dev",
        "name": "Isllan Toso | Backend Developer",
        "isPartOf": {
          "@id": "https://isllan.dev/#website"
        },
        "about": {
          "@id": "https://isllan.dev/#person"
        }
      }
    ]
  };

  return (
    <html 
      lang={locale} 
      className={`${inter.variable} ${jetbrainsMono.variable} bg-background`}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme') || 'dark';
                  var root = document.documentElement;
                  if (theme === 'system') {
                    var dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                    root.classList.add(dark ? 'dark' : 'light');
                  } else {
                    root.classList.add(theme);
                  }
                } catch (e) {}
              })()
            `,
          }}
        />
        <Script
          id="schema-graph"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          strategy="afterInteractive"
        />
      </head>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
          enableColorScheme={false}
        >
          <MotionProvider>
            <CustomCursor />
            {children}
          </MotionProvider>
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
