'use client'
import { m } from 'framer-motion'
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export function HeroSection({ dict: t }: { dict: any }) {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center px-6 md:px-12 lg:px-24 pt-32 pb-16 overflow-hidden">
      {/* Background decoration - optimized with pointer-events-none */}
      <div className="absolute top-1/4 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10 animate-pulse pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-1/4 -left-24 w-72 h-72 bg-secondary/20 rounded-full blur-3xl -z-10 pointer-events-none" aria-hidden="true" />

      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="max-w-6xl mx-auto w-full grid lg:grid-cols-[1fr_400px] gap-12 items-center"
      >
        <header className="space-y-12">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <span className="text-primary font-mono text-sm tracking-[0.2em] font-bold uppercase block">
              {t.hero.role}
            </span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-balance leading-[1.1]">
              {t.hero.title} <br />
              <span className="text-muted-foreground">{t.hero.titleHighlight}</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-xl leading-relaxed">
              {t.hero.description}
            </p>
          </m.div>

          <nav className="flex flex-wrap gap-4" aria-label="Ações principais">
            <Link
              href="#projects"
              className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-bold hover:opacity-90 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20"
            >
              {t.hero.viewProjects}
            </Link>
            <Link
              href="#contact"
              className="px-8 py-4 bg-secondary text-secondary-foreground rounded-full font-bold hover:bg-secondary/80 transition-all hover:scale-105 active:scale-95"
            >
              {t.hero.getInTouch}
            </Link>
          </nav>

          <nav className="flex gap-6" aria-label="Redes sociais">
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
          initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative hidden lg:block"
        >
          <div className="relative w-[400px] h-[500px] rounded-[2rem] overflow-hidden border border-border bg-card shadow-2xl group">
            <Image
              src="/perfil.webp"
              alt="Isllan Toso Pereira - Desenvolvedor Backend Python"
              fill
              sizes="400px"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              priority
            />
            {/* Subtle Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent pointer-events-none" />
          </div>
          
          {/* Decorative frame element */}
          <div className="absolute -inset-4 border-2 border-primary/20 rounded-[2.5rem] -z-10 translate-x-4 translate-y-4" aria-hidden="true" />
        </m.div>
      </m.div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground animate-bounce">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Olhe abaixo</span>
        <ArrowDown className="w-4 h-4" />
      </div>
    </section>
  )
}
