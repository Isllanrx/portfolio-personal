import type { Metadata } from 'next'
import { getDictionary } from '@/i18n/get-dictionary'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as any);
  const baseUrl = 'https://isllan.dev';
  
  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: `Isllan Toso | ${dict.hero.role}`,
      template: `%s | Isllan Toso`
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
      'Data Automation'
    ],
    authors: [{ name: 'Isllan Toso Pereira', url: baseUrl }],
    creator: 'Isllan Toso Pereira',
    publisher: 'Isllan Toso Pereira',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    icons: {
      icon: [
        { url: '/logo.webp', type: 'image/webp' },
      ],
      apple: '/logo.webp',
    },
    alternates: {
      canonical: locale === 'pt' ? baseUrl : `${baseUrl}/${locale}`,
      languages: {
        'pt-BR': baseUrl,
        'en-US': `${baseUrl}/en`,
        'es-ES': `${baseUrl}/es`,
        'x-default': baseUrl,
      },
    },
    openGraph: {
      type: 'profile',
      locale: locale,
      url: locale === 'pt' ? baseUrl : `${baseUrl}/${locale}`,
      title: `Isllan Toso | ${dict.hero.titleHighlight}`,
      description: dict.trust.description,
      siteName: 'Isllan Toso Portfolio',
      images: [
        {
          url: '/perfil.png',
          width: 1200,
          height: 630,
          alt: 'Isllan Toso Pereira - Backend Developer',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Isllan Toso | ${dict.hero.role}`,
      description: dict.trust.description,
      creator: '@Isllanrx',
      images: ['/perfil.png'],
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
  };
}

export default function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>
}
