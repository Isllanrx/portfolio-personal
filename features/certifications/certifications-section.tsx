'use client'
import type { Dictionary } from '@/i18n/get-dictionary'
import { m, useInView, useMotionValue, useMotionTemplate } from 'framer-motion'
import { useRef, MouseEvent } from 'react'
import { Award, Clock, ExternalLink } from 'lucide-react'

interface Cert {
  title: string
  platform: string
  hours: string
  link?: string
}

function CertificationCard({ cert, index, isInView, t }: { cert: Cert; index: number; isInView: boolean; t: Dictionary }) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onMouseMove={handleMouseMove}
      className="group relative p-6 rounded-2xl bg-card border border-border overflow-hidden transition-all hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/5"
    >
      {/* Spotlight Effect Overlay */}
      <m.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              350px circle at ${mouseX}px ${mouseY}px,
              color-mix(in oklch, var(--primary), transparent 85%),
              transparent 80%
            )
          `,
        }}
      />
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-start mb-4">
          <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
            <Award className="w-5 h-5" />
          </div>
        </div>

        <h3 className="font-bold text-lg mb-2 leading-tight group-hover:text-primary transition-colors line-clamp-2 min-h-[3.5rem]">
          {cert.title}
        </h3>

        <div className="space-y-4 mt-auto">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">{t.certifications.platformLabel}</span>
            <span className="text-sm font-semibold">{cert.platform}</span>
          </div>

          <div className="flex items-center gap-2 pt-4 border-t border-border/50">
            <Clock className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-tighter">
              {cert.hours} {t.certifications.hoursLabel}
            </span>
          </div>

          {cert.link && (
            <a
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto flex w-fit items-center justify-center gap-1.5 h-8 px-3 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 transition-all active:scale-95 shadow-sm shadow-primary/20"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              {t.certifications.viewCertificate}
            </a>
          )}
        </div>
      </div>
    </m.div>
  )
}

export function CertificationsSection({ dict: t }: { dict: Dictionary }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-16 lg:py-24 px-6 md:px-12 lg:px-24 border-t border-border overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
      
      <div className="max-w-6xl mx-auto">
        <m.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-8 lg:mb-16"
        >
          <span className="text-primary font-mono text-xs lg:text-sm tracking-[0.2em] font-bold uppercase mb-4 block">
            {t.certifications.sectionLabel}
          </span>
          <h2 className="text-3xl lg:text-5xl font-bold mb-4 tracking-tight">
            {t.certifications.viewAll}
          </h2>
          <div className="w-16 lg:w-20 h-1 lg:h-1.5 bg-primary rounded-full" />
        </m.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {t.certifications.items.map((cert: Cert, index: number) => (
            <CertificationCard
              key={cert.title}
              cert={cert}
              index={index}
              isInView={isInView}
              t={t}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
