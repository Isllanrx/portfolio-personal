'use client'
import type { Dictionary } from '@/i18n/get-dictionary'
import { m, useInView } from 'framer-motion'
import { useRef } from 'react'

interface TechCategory {
  key: 'languages' | 'frameworks' | 'databases' | 'devops' | 'concepts'
  items: string[]
}

const techStack: TechCategory[] = [
  {
    key: 'languages',
    items: ['Python', 'TypeScript', 'SQL'],
  },
  {
    key: 'frameworks',
    items: ['FastAPI', 'Node.js', 'React'],
  },
  {
    key: 'databases',
    items: ['PostgreSQL', 'MS SQL Server', 'MongoDB'],
  },
  {
    key: 'devops',
    items: ['Docker', 'GitHub Actions', 'Azure DevOps'],
  },
  {
    key: 'concepts',
    items: ['APIs REST', 'CI/CD', 'Automação'],
  },
]

export function TechStackSection({ dict: t }: { dict: Dictionary }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-16 lg:py-24 px-6 md:px-12 lg:px-24 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <m.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-8 lg:mb-16"
        >
          <span className="text-primary font-mono text-xs lg:text-sm tracking-[0.2em] font-bold uppercase mb-4 block">
            {t.techStack.sectionLabel}
          </span>
          <h2 className="text-3xl lg:text-5xl font-bold mb-4 tracking-tight">
            {t.techStack.title}
          </h2>
        </m.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8">
          {techStack.map((category, index) => (
            <m.div
              key={category.key}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className={`space-y-4 lg:space-y-6 ${category.key === 'concepts' ? 'hidden md:block' : ''}`}
            >
              <h3 className="text-[10px] lg:text-xs uppercase tracking-widest text-muted-foreground font-bold">
                {t.techStack.categories[category.key]}
              </h3>
              <ul className="space-y-2 lg:space-y-3">
                {category.items.map((item) => (
                  <li key={item} className="font-medium text-base lg:text-lg flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  )
}
