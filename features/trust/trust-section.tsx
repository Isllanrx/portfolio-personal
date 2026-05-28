'use client'
import { m, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Code, GraduationCap, TrendingUp } from 'lucide-react'

export function TrustSection({ dict: t }: { dict: any }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const metrics = [
    {
      icon: TrendingUp,
      value: '4+',
      label: t.trust.metrics.yearsTech,
    },
    {
      icon: Code,
      value: '10+',
      label: t.trust.metrics.projectsDelivered,
    },
    {
      icon: GraduationCap,
      value: t.trust.metrics.education,
      label: t.trust.metrics.educationDesc,
    },
  ]

  return (
    <section id="about" ref={ref} className="py-16 lg:py-24 px-6 md:px-12 lg:px-24 border-t border-border scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <m.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <header className="mb-8 lg:mb-12">
            <span className="text-primary font-mono text-xs lg:text-sm tracking-[0.2em] font-bold uppercase mb-4 block">
              {t.trust.sectionLabel}
            </span>
            <h2 className="text-3xl lg:text-5xl font-bold tracking-tight">
              {t.trust.title}
            </h2>
          </header>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
              {t.trust.description}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 lg:gap-4" aria-label="Métricas profissionais">
              {metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="p-4 lg:p-6 rounded-2xl bg-card border border-border flex flex-col items-center text-center shadow-sm"
                >
                  <metric.icon className="w-6 h-6 lg:w-8 lg:h-8 text-primary mb-3 lg:mb-4" aria-hidden="true" />
                  <div className="text-2xl lg:text-3xl font-bold mb-1 tracking-tighter">{metric.value}</div>
                  <div className="text-[9px] lg:text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        </m.div>
      </div>
    </section>
  )
}
