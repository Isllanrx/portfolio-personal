'use client'

import { Github, Linkedin, Mail } from 'lucide-react'


export function Footer({ dict: t }: { dict: any }) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-4 px-6 md:px-12 lg:px-24 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <div className="font-bold text-base mb-0.5">
              <span className="text-primary tracking-tighter">isllan</span>
              <span className="text-muted-foreground tracking-tighter">.dev</span>
            </div>
            <p className="text-xs text-muted-foreground">
              {t.footer.tagline}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/Isllanrx"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors p-1.5"
              aria-label="GitHub de Isllan Toso"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com/in/isllantoso"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors p-1.5"
              aria-label="LinkedIn de Isllan Toso"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="mailto:isllan.toso79@gmail.com"
              className="text-muted-foreground hover:text-primary transition-colors p-1.5"
              aria-label="Enviar e-mail para Isllan Toso"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

          <div className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">
            © {currentYear} {t.footer.rights}
          </div>
        </div>
      </div>
    </footer>
  )
}
