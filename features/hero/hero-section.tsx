'use client'
import { m } from 'framer-motion'
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export function HeroSection({ dict: t }: { dict: any }) {
  return (
    <section className="relative min-h-[85vh] lg:min-h-[90vh] flex flex-col justify-center px-6 md:px-12 lg:px-24 pt-24 pb-12 lg:pt-32 lg:pb-16 overflow-hidden">
      {/* Background decoration - optimized with pointer-events-none */}
      <div className="absolute top-1/4 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10 animate-pulse pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-1/4 -left-24 w-72 h-72 bg-secondary/20 rounded-full blur-3xl -z-10 pointer-events-none" aria-hidden="true" />

      <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-[1fr_400px] gap-8 lg:gap-12 items-center">
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
            <p className="text-lg lg:text-xl text-muted-foreground max-w-xl leading-relaxed">
              {t.hero.description}
            </p>
          </m.div>

          <nav className="flex flex-wrap gap-3 lg:gap-4" aria-label="Ações principais">
            <Link
              href="#projects"
              className="px-6 py-3 lg:px-8 lg:py-4 bg-[image:var(--grad-primary)] text-primary-foreground rounded-full font-bold hover:opacity-90 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20 text-sm lg:text-base border border-primary/20"
            >
              {t.hero.viewProjects}
            </Link>
            <Link
              href="#contact"
              className="px-6 py-3 lg:px-8 lg:py-4 bg-secondary/50 backdrop-blur-sm text-secondary-foreground rounded-full font-bold hover:bg-secondary/80 transition-all hover:scale-105 active:scale-95 text-sm lg:text-base border border-border"
            >
              {t.hero.getInTouch}
            </Link>
          </nav>

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
          <div className="relative w-[220px] h-[280px] md:w-[400px] md:h-[500px] rounded-[2rem] overflow-hidden border border-border bg-card shadow-[0_20px_50px_rgba(0,0,0,0.2)] group">
            {/* Circuit Line Animation Overlay */}
            <div className="absolute inset-0 z-10 pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-500">
              <svg className="w-full h-full" viewBox="0 0 400 500" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect 
                  x="2" y="2" width="396" height="496" rx="30" 
                  stroke="var(--primary)" 
                  strokeWidth="2" 
                  strokeDasharray="100 300"
                  className="animate-circuit-flow"
                />
              </svg>
            </div>

            <Image
              src="/perfil.webp"
              alt="Isllan Toso Pereira - Desenvolvedor Backend Python"
              fill
              sizes="(max-width: 768px) 220px, 400px"
              className="object-cover transition-transform duration-700"
              priority
              quality={100}
              // @ts-ignore
              fetchPriority="high"
              style={{
                filter: 'contrast(1.04) brightness(1.02) saturate(1.04)',
                imageRendering: '-webkit-optimize-contrast'
              }}
            />
          </div>
          
          <style jsx global>{`
            @keyframes circuit-flow {
              0% { stroke-dashoffset: 400; }
              100% { stroke-dashoffset: 0; }
            }
            .animate-circuit-flow {
              animation: circuit-flow 3s linear infinite;
              filter: drop-shadow(0 0 8px var(--primary));
            }
          `}</style>
          
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
          <div className="absolute top-0 left-1/2 lg:left-0 -translate-x-1/2 lg:translate-x-4 -inset-4 border-2 border-primary/20 rounded-[2.5rem] -z-10 translate-y-4 w-[220px] h-[280px] md:w-[400px] md:h-[500px] hidden lg:block" aria-hidden="true" />
        </m.div>
      </div>

      <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-muted-foreground animate-bounce z-10">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{t.hero.scrollDown}</span>
        <ArrowDown className="w-4 h-4" />
      </div>
    </section>
  )
}
