import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getDictionary } from '@/i18n/get-dictionary'
import { LangSetter } from '@/shared/ui/lang-setter'

const VALID_LOCALES = ['pt', 'en', 'es'] as const
type Locale = (typeof VALID_LOCALES)[number]

function isValidLocale(locale: string): locale is Locale {
  return (VALID_LOCALES as readonly string[]).includes(locale)
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isValidLocale(locale)) return {}
  const dict = await getDictionary(locale)

  const baseUrl =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : 'https://isllan.dev'

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: 'Isllan Toso | Backend Developer',
      template: '%s | Isllan Toso',
    },
    description: dict.trust.description,
    keywords: [
      'Isllan Toso Pereira',
      'Backend Developer',
      'Python Developer',
      'Software Engineer Brazil',
      'REST APIs',
      'SQL Server',
      'PostgreSQL',
      'Data Automation',
    ],
    authors: [{ name: 'Isllan Toso Pereira', url: baseUrl }],
    creator: 'Isllan Toso Pereira',
    publisher: 'Isllan Toso Pereira',
    formatDetection: { email: false, address: false, telephone: false },
    icons: {
      icon: [{ url: '/logo.webp', type: 'image/webp' }],
      apple: '/logo.webp',
    },
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'pt-BR': `/pt`,
        'en-US': `/en`,
        'es-ES': `/es`,
        'x-default': `/pt`,
      },
    },
    openGraph: {
      type: 'profile',
      locale,
      url: `/${locale}`,
      title: `Isllan Toso | ${dict.hero.titleHighlight}`,
      description: dict.trust.description,
      siteName: 'Isllan Toso Portfolio',
      images: [{ url: '/perfil.webp', width: 1200, height: 630, alt: 'Isllan Toso Pereira - Backend Developer' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Isllan Toso | ${dict.hero.role}`,
      description: dict.trust.description,
      creator: '@Isllanrx',
      images: ['/perfil.webp'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    category: 'technology',
  }
}

export async function generateStaticParams() {
  return [{ locale: 'pt' }, { locale: 'en' }, { locale: 'es' }]
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isValidLocale(locale)) notFound()

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': 'https://isllan.dev/#person',
        name: 'Isllan Toso Pereira',
        url: 'https://isllan.dev',
        jobTitle: 'Backend Developer',
        image: 'https://isllan.dev/perfil.webp',
        worksFor: { '@type': 'Organization', name: 'Globalsys' },
        sameAs: ['https://github.com/Isllanrx', 'https://linkedin.com/in/isllantoso'],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://isllan.dev/#website',
        url: 'https://isllan.dev',
        name: 'Isllan Toso Portfolio',
        publisher: { '@id': 'https://isllan.dev/#person' },
        inLanguage: ['pt-BR', 'en-US', 'es-ES'],
      },
      {
        '@type': 'ProfilePage',
        '@id': `https://isllan.dev/${locale}#webpage`,
        url: `https://isllan.dev/${locale}`,
        name: 'Isllan Toso | Backend Developer',
        isPartOf: { '@id': 'https://isllan.dev/#website' },
        mainEntity: { '@id': 'https://isllan.dev/#person' },
        about: { '@id': 'https://isllan.dev/#person' },
      },
    ],
  }

  return (
    <>
      <LangSetter locale={locale} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
            .replace(/</g, '\\u003c')
            .replace(/>/g, '\\u003e')
            .replace(/&/g, '\\u0026'),
        }}
      />
      {children}
    </>
  )
}
