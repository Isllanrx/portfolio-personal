import { Header } from '@/shared/layout/header'
import { Footer } from '@/shared/layout/footer'
import { CertificationsSection } from '@/features/certifications/certifications-section'
import { getDictionary } from '@/i18n/get-dictionary'
import type { Locale } from '@/lib/i18n/translations'
import type { Metadata } from 'next'
import { Suspense } from 'react'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const dict = await getDictionary(locale as Locale)

  return {
    title: dict.nav.certifications,
    alternates: {
      canonical: `/${locale}/certifications`,
      languages: {
        'pt-BR': `/pt/certifications`,
        'en-US': `/en/certifications`,
        'es-ES': `/es/certifications`,
        'x-default': `/pt/certifications`,
      },
    },
  }
}

export default async function CertificationsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const dict = await getDictionary(locale as Locale)

  return (
    <>
      <Header dict={dict} locale={locale} />
      <main className="pt-24">
        <CertificationsSection dict={dict} />
      </main>
      {/* Boundary exigido por cacheComponents: Footer usa new Date() */}
      <Suspense>
        <Footer dict={dict} />
      </Suspense>
    </>
  )
}
