import dynamic from 'next/dynamic'
import { Header } from '@/shared/layout/header'
import { Footer } from '@/shared/layout/footer'
import { HeroSection } from '@/features/hero/hero-section'
import { getDictionary } from '@/i18n/get-dictionary'

// Aggressive lazy loading for all below-the-fold sections
const TrustSection = dynamic(() => import('@/features/trust/trust-section').then(mod => mod.TrustSection))
const ProjectsSection = dynamic(() => import('@/features/projects/projects-section').then(mod => mod.ProjectsSection))
const TechStackSection = dynamic(() => import('@/features/tech-stack/tech-stack-section').then(mod => mod.TechStackSection))
const ExperienceSection = dynamic(() => import('@/features/experience/experience-section').then(mod => mod.ExperienceSection))
const ContactSection = dynamic(() => import('@/features/contact/contact-section').then(mod => mod.ContactSection))

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as any);

  return (
    <>
      <Header dict={dict} locale={locale} />
      <main>
        <HeroSection dict={dict} />
        <TrustSection dict={dict} />
        <ProjectsSection dict={dict} />
        <TechStackSection dict={dict} />
        <ExperienceSection dict={dict} />
        <ContactSection dict={dict} />
      </main>
      <Footer dict={dict} />
    </>
  )
}
