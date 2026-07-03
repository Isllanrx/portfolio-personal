'use client'
import type { Dictionary } from '@/i18n/get-dictionary'
import { m, useInView } from 'framer-motion'
import { useRef } from 'react'
import { GraduationCap, CheckCircle2 } from 'lucide-react'

export function ExperienceSection({ dict: t }: { dict: Dictionary }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="experience" ref={ref} className="py-16 lg:py-24 px-6 md:px-12 lg:px-24 border-t border-border scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <m.header
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-8 lg:mb-12"
        >
          <span className="text-primary font-mono text-xs lg:text-sm tracking-[0.2em] font-bold uppercase mb-4 block">
            {t.experience.sectionLabel}
          </span>
          <h2 className="text-3xl lg:text-5xl font-bold tracking-tight">
            {t.experience.title}
          </h2>
        </m.header>

        <div className="grid lg:grid-cols-[1fr_320px] gap-8 lg:gap-12">
          {/* Work Experience Timeline */}
          <div className="space-y-8 lg:space-y-12 relative">
            <div className="absolute left-[7.5px] top-2 bottom-2 w-px bg-border hidden md:block" />
            
            {t.experience.items.map((exp, index) => (
              <article
                key={index}
                className="relative pl-0 md:pl-10 group"
              >
                <div className="absolute left-0 top-2.5 w-4 h-4 rounded-full border-2 border-primary bg-background hidden md:block transition-transform group-hover:scale-125" aria-hidden="true" />
                
                <header className="flex flex-col mb-3 lg:mb-4">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">
                    {exp.period}
                  </span>
                  <h3 className="text-xl lg:text-2xl font-bold tracking-tight">{exp.title}</h3>
                  <div className="text-muted-foreground font-semibold text-base lg:text-lg">{exp.company}</div>
                </header>
                
                <ul className="space-y-2 lg:space-y-3" aria-label={`Responsabilidades em ${exp.company}`}>
                  {exp.bullets.map((bullet: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-sm lg:text-[15px] text-muted-foreground leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-1 shrink-0" aria-hidden="true" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          {/* Sidebar: Education & Military */}
          <aside className="space-y-6">
            <div className="p-6 rounded-2xl bg-secondary/10 border border-border">
              <div className="flex items-center gap-2 mb-6">
                <GraduationCap className="w-5 h-5 text-primary" />
                <h3 className="font-bold uppercase text-[10px] tracking-[0.2em]">{t.experience.education.title}</h3>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="text-[10px] font-bold text-primary uppercase mb-2">{t.experience.education.period}</div>
                  <h4 className="text-sm font-bold leading-snug mb-1">{t.experience.education.degree}</h4>
                  <div className="text-xs text-muted-foreground mb-4">{t.experience.education.institution}</div>
                  
                  <ul className="space-y-2">
                    {t.experience.education.bullets.map((bullet: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-[11px] text-muted-foreground leading-tight">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary/40 mt-1 shrink-0" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <p className="text-[10px] text-muted-foreground/80 italic pt-4 border-t border-border/50">
                  {t.experience.education.status}
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-card border border-border group hover:border-primary/30 transition-colors">
              <h4 className="font-bold text-base group-hover:text-primary transition-colors">
                {t.experience.military.title}
              </h4>
              <div className="text-xs font-semibold mt-1">{t.experience.military.company}</div>
              <div className="text-[10px] text-muted-foreground mt-1 font-mono">{t.experience.military.period}</div>

              <ul className="mt-4 space-y-2">
                {t.experience.military.bullets.map((bullet: string, i: number) => (
                  <li key={i} className="flex gap-2 text-[11px] leading-relaxed text-muted-foreground">
                    <div className="w-1 h-1 rounded-full bg-primary/40 mt-1.5 shrink-0" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
