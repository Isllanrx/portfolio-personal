'use client'
import type { Dictionary } from '@/i18n/get-dictionary'
import { AnimatePresence, m } from 'framer-motion'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { X, Sun, Moon, Globe } from 'lucide-react'
import { useTheme } from '@/shared/theme-provider'
import { type Locale } from '@/lib/i18n/translations'
import { useRouter, usePathname } from 'next/navigation'

const locales: Locale[] = ['pt', 'en', 'es']

export function Header({ dict: t, locale }: { dict: Dictionary, locale: string }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const router = useRouter()
  const pathname = usePathname()

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const cycleLocale = () => {
    const idx = locales.indexOf(locale as Locale)
    const next = locales[(idx + 1) % locales.length]
    const segments = pathname.split('/')
    segments[1] = next
    router.push(segments.join('/'), { scroll: false })
  }

  const isHome = pathname === `/${locale}` || pathname === `/${locale}/`

  const handleLogoClick = (e: React.MouseEvent) => {
    // Na home apenas rola ao topo; fora dela deixa o Link navegar normalmente
    if (isHome) {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    handleScroll() // sincroniza no mount — após troca de idioma o header remonta e precisa recalcular
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isMobileMenuOpen])

  const navItems = [
    { label: t.nav.projects, href: isHome ? '#projects' : `/${locale}#projects` },
    { label: t.nav.certifications, href: `/${locale}/certifications` },
    { label: t.nav.contact, href: isHome ? '#contact' : `/${locale}#contact` },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/80 backdrop-blur-lg border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 md:px-12 lg:px-24 py-4 flex items-center justify-between">
        <Link href={`/${locale}`} onClick={handleLogoClick} className="flex items-center gap-2 group">
          <div className="relative w-10 h-10 transition-transform duration-300 group-hover:scale-110">
            <Image
              src="/logo.webp"
              alt="Logo"
              fill
              sizes="40px"
              className="object-contain"
              priority
            />
          </div>
          <span className="font-bold text-lg tracking-tighter">
            isllan<span className="text-muted-foreground">.dev</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-2">
          <ul className="flex items-center gap-0.5">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wide text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1 ml-1 border-l border-border pl-2">
            <button
              className="p-2 rounded-lg hover:bg-secondary transition-colors"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {mounted && theme === 'dark'
                ? <Moon className="w-4 h-4" />
                : <Sun className="w-4 h-4" />
              }
            </button>

            <button
              className="p-2 rounded-lg hover:bg-secondary transition-colors flex items-center gap-1.5"
              onClick={cycleLocale}
              aria-label={t.language.label}
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm font-bold uppercase">{locale}</span>
            </button>
          </div>
        </div>

        {/* Mobile Controls */}
        <div className="md:hidden flex items-center gap-2">
          <button
            className="p-2 rounded-lg hover:bg-secondary transition-colors"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {mounted && theme === 'dark'
              ? <Moon className="w-5 h-5" />
              : <Sun className="w-5 h-5" />
            }
          </button>

          <button
            className="p-2 rounded-lg hover:bg-secondary transition-colors flex items-center gap-1.5"
            onClick={cycleLocale}
            aria-label={t.language.label}
          >
            <Globe className="w-5 h-5" />
            <span className="text-sm font-bold uppercase">{locale}</span>
          </button>

          <button
            className="p-2 -mr-2 flex items-center justify-center"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? t.nav.closeMenu : t.nav.openMenu}
            aria-expanded={isMobileMenuOpen}
          >
            <span className="relative block w-5 h-4" aria-hidden="true">
              <m.span
                className="absolute left-0 top-0 h-0.5 w-5 rounded-full bg-foreground"
                animate={isMobileMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              />
              <m.span
                className="absolute left-0 top-[7px] h-0.5 w-5 rounded-full bg-foreground"
                animate={isMobileMenuOpen ? { opacity: 0, x: -8 } : { opacity: 1, x: 0 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
              />
              <m.span
                className="absolute left-0 bottom-0 h-0.5 w-5 rounded-full bg-foreground"
                animate={isMobileMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu — drawer lateral direito */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden fixed inset-0 z-40 bg-background/60 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />

            <m.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              className="md:hidden fixed top-0 right-0 z-50 h-[100dvh] w-72 max-w-[80vw] bg-background border-l border-border shadow-2xl flex flex-col"
              role="dialog"
              aria-modal="true"
            >
              <div className="flex items-center justify-between px-6 h-[72px] border-b border-border">
                <span className="font-bold text-lg tracking-tighter">
                  isllan<span className="text-muted-foreground">.dev</span>
                </span>
                <button
                  className="p-2 -mr-2 rounded-lg hover:bg-secondary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label={t.nav.closeMenu}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <ul className="flex flex-col gap-1 px-4 py-6">
                {navItems.map((item, i) => (
                  <m.li
                    key={item.href}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.07, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={item.href}
                      className="block px-4 py-3 rounded-lg text-sm font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </m.li>
                ))}
              </ul>
            </m.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
