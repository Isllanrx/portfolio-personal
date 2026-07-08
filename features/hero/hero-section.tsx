'use client'
import type { Dictionary } from '@/i18n/get-dictionary'
import { m } from 'framer-motion'
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react'
import Image from 'next/image'

export function HeroSection({ dict: t }: { dict: Dictionary }) {
  return (
    <section className="relative min-h-[85vh] lg:min-h-[90vh] flex flex-col justify-center px-6 md:px-12 lg:px-24 pt-24 pb-12 lg:pt-32 lg:pb-16 overflow-hidden">
      {/* Background decoration - optimized with pointer-events-none */}
      <div className="absolute top-1/4 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10 animate-pulse pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-1/4 -left-24 w-72 h-72 bg-secondary/20 rounded-full blur-3xl -z-10 pointer-events-none" aria-hidden="true" />

      <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-[1fr_360px] gap-8 lg:gap-12 items-center">
        <header className="space-y-8 lg:space-y-12">
          <m.div
            initial={{ opacity: 0.5, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-4"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold bg-primary/10 text-primary border border-primary/20 w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              {t.hero.available}
            </span>
            <span className="text-primary font-mono text-xs lg:text-sm tracking-[0.2em] font-bold uppercase block">
              {t.hero.role}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-balance leading-[1.1]">
              {t.hero.title} <br />
              <span className="bg-clip-text text-transparent bg-[image:var(--grad-primary)]">
                {t.hero.titleHighlight}
              </span>
            </h1>
          </m.div>

          <nav className="hidden lg:flex gap-6" aria-label="Redes sociais">
            <a
              href="https://github.com/Isllanrx"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-all p-2 rounded-lg hover:bg-secondary active:scale-90"
              aria-label="GitHub de Isllan Toso"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href="https://linkedin.com/in/isllantoso"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-all p-2 rounded-lg hover:bg-secondary active:scale-90"
              aria-label="LinkedIn de Isllan Toso"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href="mailto:isllan.toso79@gmail.com"
              className="text-muted-foreground hover:text-primary transition-all p-2 rounded-lg hover:bg-secondary active:scale-90"
              aria-label="Enviar e-mail para Isllan Toso"
            >
              <Mail className="w-6 h-6" />
            </a>
          </nav>
        </header>

        <m.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative flex flex-col items-center lg:block"
        >
          <div className="relative w-[260px] md:w-[340px] aspect-[3/4] rounded-[2.5rem] overflow-hidden border border-border bg-card shadow-[0_20px_50px_rgba(0,0,0,0.2)] group">
            {/* Circuit Line Animation Overlay */}
            <div className="absolute inset-0 z-10 pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-500">
              <svg className="w-full h-full" viewBox="0 0 300 400" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                <rect
                  x="2" y="2" width="296" height="396" rx="34"
                  stroke="var(--primary)"
                  strokeWidth="2"
                  strokeDasharray="100 300"
                  className="animate-circuit-flow"
                />
              </svg>
            </div>

            <Image
              src="/Me.jpeg"
              alt="Isllan Toso Pereira - Desenvolvedor Backend Python"
              fill
              sizes="(max-width: 768px) 260px, 340px"
              className="object-cover object-[center_18%] scale-[1.05] transition-transform duration-700 group-hover:scale-[1.1]"
              priority
              quality={100}
              style={{
                filter: 'contrast(1.04) brightness(1.02) saturate(1.04)',
                imageRendering: '-webkit-optimize-contrast'
              }}
            />
          </div>
          
          {/* Mobile Social Links */}
          <nav className="flex lg:hidden gap-8 mt-12" aria-label="Redes sociais mobile">
            <a
              href="https://github.com/Isllanrx"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-all p-3 rounded-xl bg-secondary/50 active:scale-90"
              aria-label="GitHub de Isllan Toso"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href="https://linkedin.com/in/isllantoso"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-all p-3 rounded-xl bg-secondary/50 active:scale-90"
              aria-label="LinkedIn de Isllan Toso"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href="mailto:isllan.toso79@gmail.com"
              className="text-muted-foreground hover:text-primary transition-all p-3 rounded-xl bg-secondary/50 active:scale-90"
              aria-label="Enviar e-mail para Isllan Toso"
            >
              <Mail className="w-6 h-6" />
            </a>
          </nav>
          
          {/* Decorative frame element */}
          <div className="absolute top-0 left-1/2 lg:left-0 -translate-x-1/2 lg:translate-x-4 -inset-4 border-2 border-primary/20 rounded-[3rem] -z-10 translate-y-4 w-[260px] md:w-[340px] aspect-[3/4] hidden lg:block" aria-hidden="true" />
        </m.div>
      </div>

      <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-muted-foreground animate-bounce z-10">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{t.hero.scrollDown}</span>
        <ArrowDown className="w-4 h-4" />
      </div>
    </section>
  )
}
