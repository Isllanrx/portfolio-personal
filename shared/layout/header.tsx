'use client'
import { AnimatePresence, m } from 'framer-motion'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Sun, Moon, Globe } from 'lucide-react'
import { useTheme } from '@/shared/theme-provider'
import { type Locale } from '@/lib/i18n/translations'
import { useRouter, usePathname } from 'next/navigation'

const locales: Locale[] = ['pt', 'en', 'es']

export function Header({ dict: t, locale }: { dict: any, locale: string }) {
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

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
    window.history.pushState({}, '', `/${locale}`)
  }

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isHome = pathname === `/${locale}` || pathname === `/${locale}/`

  const navItems = [
    { label: t.nav.projects, href: isHome ? '#projects' : `/${locale}#projects` },
    { label: t.nav.experience, href: isHome ? '#experience' : `/${locale}#experience` },
    { label: t.nav.about, href: isHome ? '#about' : `/${locale}#about` },
    { label: t.nav.contact, href: isHome ? '#contact' : `/${locale}#contact` },
    { label: t.nav.certifications, href: `/${locale}/certifications` },
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
        <Link href="#" onClick={scrollToTop} className="flex items-center gap-2 group">
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
        <div className="hidden md:flex items-center gap-6">
          <ul className="flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 ml-4 border-l border-border pl-4">
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
            className="p-2 -mr-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? t.nav.closeMenu : t.nav.openMenu}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <m.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-background border-b border-border overflow-hidden"
          >
            <ul className="px-6 py-4 space-y-4">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block text-sm font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  )
}
