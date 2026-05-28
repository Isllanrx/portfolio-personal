'use client'
import { m, useInView } from 'framer-motion'




import { useRef } from 'react'
import { MapPin, Briefcase, GraduationCap, CheckCircle2 } from 'lucide-react'
import Script from 'next/script'


export function ExperienceSection({ dict: t }: { dict: any }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://isllan.dev"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": t.nav.experience,
        "item": "https://isllan.dev#experience"
      }
    ]
  };

  return (
    <section id="experience" ref={ref} className="py-24 px-6 md:px-12 lg:px-24 border-t border-border scroll-mt-20">
      <Script
        id="experience-breadcrumb-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="max-w-6xl mx-auto">
        <m.header
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-primary font-mono text-sm tracking-[0.2em] font-bold uppercase mb-4 block">
            {t.experience.sectionLabel}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            {t.experience.title}
          </h2>
        </m.header>

        <div className="grid lg:grid-cols-[1fr_300px] gap-12">
          {/* Work Experience */}
          <div className="space-y-10 relative">
            <div className="absolute left-0 top-0 bottom-0 w-px bg-border hidden md:block ml-[7px]" />
            
            {t.experience.items.map((exp: any, index: number) => (
              <m.article
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="relative pl-0 md:pl-10"
              >
                <div className="absolute left-0 top-2 w-4 h-4 rounded-full border-2 border-primary bg-background hidden md:block" aria-hidden="true" />
                
                <header className="flex flex-col mb-4">
                  <span className="text-xs font-bold text-primary uppercase tracking-tighter mb-1">
                    {exp.period}
                  </span>
                  <h3 className="text-2xl font-bold tracking-tight">{exp.title}</h3>
                  <div className="text-muted-foreground font-semibold text-lg">{exp.company}</div>
                </header>
                
                <p className="text-base text-muted-foreground mb-4 max-w-2xl leading-relaxed">
                  {exp.description}
                </p>

                {exp.bullets && (
                  <ul className="space-y-3" aria-label={`Responsabilidades em ${exp.company}`}>
                    {exp.bullets.map((bullet: string, i: number) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-1 shrink-0" aria-hidden="true" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
              </m.article>
            ))}
          </div>

          {/* Education */}
          <aside className="space-y-6">
            <m.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="p-6 rounded-xl bg-secondary/20 border border-border"
            >
              <div className="flex items-center gap-2 mb-6">
                <GraduationCap className="w-5 h-5 text-primary" />
                <h3 className="font-bold uppercase text-xs tracking-widest">{t.experience.education.title}</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="text-[10px] font-bold text-primary uppercase mb-1">{t.experience.education.period}</div>
                  <h4 className="text-sm font-bold leading-tight mb-1">{t.experience.education.degree}</h4>
                  <div className="text-xs text-muted-foreground mb-4">{t.experience.education.institution}</div>
                  
                  <ul className="space-y-2">
                    {t.experience.education.bullets.map((bullet: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-[11px] text-muted-foreground leading-tight">
                        <div className="w-1 h-1 rounded-full bg-primary mt-1.5 shrink-0" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <p className="text-muted-foreground italic pt-4 border-t border-border/50">
                  {t.experience.education.status}
                </p>
                </div>
                </m.div>

                {/* Military Service Card */}
                {t.experience.military && (
                <m.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="p-6 rounded-2xl bg-card border border-border relative overflow-hidden group hover:border-primary/50 transition-colors mt-6"
                >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Briefcase className="w-12 h-12 text-primary" />
                </div>

                <div className="relative z-10 space-y-4">
                  <div>
                    <h4 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">
                      {t.experience.military.title}
                    </h4>
                    <p className="text-sm font-semibold mt-1">
                      {t.experience.military.company}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1 font-mono">
                      {t.experience.military.period}
                    </p>
                  </div>

                  <ul className="space-y-3">
                    {t.experience.military.bullets.map((bullet: string, i: number) => (
                      <li key={i} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                </m.div>
                )}
                </aside>
        </div>
      </div>
    </section>
  )
}
