'use client'
import { m, useInView } from 'framer-motion'




import { useRef } from 'react'
import { Globe, ShoppingBag, BookOpen, ChevronRight } from 'lucide-react'


const icons = [Globe, ShoppingBag, BookOpen]

export function ServicesSection({ dict: t }: { dict: any }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-24 px-6 md:px-12 lg:px-24 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-primary font-mono text-sm tracking-wider mb-4 block">
            {t.services.sectionLabel}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            {t.services.title}
          </h2>
        </m.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.services.items.map((service: any, index: number) => {
            const Icon = icons[index]
            return (
              <m.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all group h-full flex flex-col">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground mb-6 flex-grow">
                    {service.description}
                  </p>
                  <button className="flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all">
                    {service.link}
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </m.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
