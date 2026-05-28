'use client'
import { m, useInView } from 'framer-motion'




import { useRef } from 'react'


export function AboutSection({ dict: t }: { dict: any }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" ref={ref} className="py-24 px-6 md:px-12 lg:px-24 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-primary font-mono text-sm tracking-wider mb-4 block">
            {t.about.sectionLabel}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-balance">
            {t.about.title}
          </h2>
        </m.div>

        <div className="grid md:grid-cols-2 gap-12">
          <m.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t.about.paragraphs.map((paragraph: string, index: number) => (
              <p key={index} className="text-lg text-muted-foreground leading-relaxed mb-6">
                {paragraph}
              </p>
            ))}
          </m.div>

          <m.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            <div className="p-6 rounded-xl bg-card border border-border">
              <h3 className="font-semibold mb-2">{t.about.principlesTitle}</h3>
              <ul className="space-y-3 text-muted-foreground">
                {t.about.principles.map((principle: any, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    <span>{principle}</span>
                  </li>
                ))}
              </ul>
            </div>
          </m.div>
        </div>
      </div>
    </section>
  )
}
