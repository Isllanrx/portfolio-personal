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
    <section id="about" ref={ref} className="py-24 px-6 md:px-12 lg:px-24 border-t border-border scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <header className="mb-16">
            <span className="text-primary font-mono text-sm tracking-[0.2em] font-bold uppercase mb-4 block">
              {t.trust.sectionLabel}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">
              {t.trust.title}
            </h2>
          </header>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <p className="text-xl text-muted-foreground leading-relaxed">
                {t.trust.description}
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6" aria-label="Métricas profissionais">
              {metrics.map((metric, index) => (
                <m.div
                  key={metric.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="p-6 rounded-2xl bg-card border border-border flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow"
                >
                  <metric.icon className="w-8 h-8 text-primary mb-4" aria-hidden="true" />
                  <div className="text-3xl font-bold mb-1 tracking-tighter">{metric.value}</div>
                  <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{metric.label}</div>
                </m.div>
              ))}
            </div>
          </div>
        </m.div>
      </div>
    </section>
  )
}
