'use client'
import { AnimatePresence, m } from 'framer-motion'


import { useState, useEffect } from 'react'

import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Sun, Moon, Monitor, Globe, Check } from 'lucide-react'
import { useTheme } from '@/shared/theme-provider'
import { type Locale } from '@/lib/i18n/translations'
import { useRouter, usePathname } from 'next/navigation'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const localeFlags: Record<Locale, string> = {
  pt: '🇧🇷',
  en: '🇺🇸',
  es: '🇪🇸',
}

export function Header({ dict: t, locale }: { dict: any, locale: string }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const router = useRouter();
  const pathname = usePathname();
  const setLocale = (newLocale: Locale) => {
    const segments = pathname.split('/');
    segments[1] = newLocale;
    router.push(segments.join('/'), { scroll: false });
  };


  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { label: t.nav.projects, href: '#projects' },
    { label: t.nav.experience, href: '#experience' },
    { label: t.nav.about, href: '#about' },
    { label: t.nav.contact, href: '#contact' },
  ]

  const themeOptions = [
    { value: 'light', label: t.theme.light, icon: Sun },
    { value: 'dark', label: t.theme.dark, icon: Moon },
    { value: 'system', label: t.theme.system, icon: Monitor },
  ]

  const localeOptions: { value: Locale; label: string }[] = [
    { value: 'pt', label: t.language.pt },
    { value: 'en', label: t.language.en },
    { value: 'es', label: t.language.es },
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
        <Link href="#" className="flex items-center gap-2 group">
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
            {/* Theme Toggle */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="p-2 rounded-lg hover:bg-secondary transition-colors"
                  aria-label="Toggle theme"
                >
                  {mounted && (
                    <>
                      {theme === 'dark' && <Moon className="w-4 h-4" />}
                      {theme === 'light' && <Sun className="w-4 h-4" />}
                      {theme === 'system' && <Monitor className="w-4 h-4" />}
                    </>
                  )}
                  {!mounted && <Sun className="w-4 h-4" />}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {themeOptions.map((option) => (
                  <DropdownMenuItem
                    key={option.value}
                    onClick={() => setTheme(option.value)}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <option.icon className="w-4 h-4" />
                    {option.label}
                    {theme === option.value && (
                      <Check className="w-4 h-4 ml-auto" />
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Language Toggle */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="p-2 rounded-lg hover:bg-secondary transition-colors flex items-center gap-1.5"
                  aria-label={t.language.label}
                >
                  <Globe className="w-4 h-4" />
                  <span className="text-sm font-bold uppercase">{locale}</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {localeOptions.map((option) => (
                  <DropdownMenuItem
                    key={option.value}
                    onClick={() => setLocale(option.value)}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <span>{localeFlags[option.value]}</span>
                    {option.label}
                    {locale === option.value && (
                      <Check className="w-4 h-4 ml-auto" />
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Mobile Controls */}
        <div className="md:hidden flex items-center gap-2">
          {/* Theme Toggle Mobile */}
          <button
            className="p-2 rounded-lg hover:bg-secondary transition-colors"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle theme"
          >
            {mounted && theme === 'dark' && <Moon className="w-5 h-5" />}
            {mounted && theme !== 'dark' && <Sun className="w-5 h-5" />}
            {!mounted && <Sun className="w-5 h-5" />}
          </button>

          {/* Language Toggle Mobile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="p-2 rounded-lg hover:bg-secondary transition-colors"
                aria-label={t.language.label}
              >
                <Globe className="w-5 h-5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {localeOptions.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => setLocale(option.value)}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <span>{localeFlags[option.value]}</span>
                  {option.label}
                  {locale === option.value && (
                    <Check className="w-4 h-4 ml-auto" />
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu Button */}
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
