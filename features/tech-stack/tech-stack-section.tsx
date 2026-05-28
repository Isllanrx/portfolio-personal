'use client'
import { m, useInView } from 'framer-motion'




import { useRef } from 'react'


interface TechCategory {
  key: 'languages' | 'frameworks' | 'databases' | 'devops' | 'concepts'
  items: string[]
}

const techStack: TechCategory[] = [
  {
    key: 'languages',
    items: ['Python', 'JavaScript', 'SQL', 'Java'],
  },
  {
    key: 'frameworks',
    items: ['FastAPI', 'Flask', 'Django', 'Node.js'],
  },
  {
    key: 'databases',
    items: ['MS SQL Server', 'PostgreSQL', 'MySQL'],
  },
  {
    key: 'devops',
    items: ['Docker', 'Azure DevOps', 'Git'],
  },
  {
    key: 'concepts',
    items: ['APIs REST', 'CI/CD', 'Automação'],
  },
]

export function TechStackSection({ dict: t }: { dict: any }) {
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
            {t.techStack.sectionLabel}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t.techStack.title}
          </h2>
        </m.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {techStack.map((category, index) => (
            <m.div
              key={category.key}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="space-y-6"
            >
              <h3 className="text-xs uppercase tracking-widest text-muted-foreground font-bold">
                {t.techStack.categories[category.key]}
              </h3>
              <ul className="space-y-3">
                {category.items.map((item) => (
                  <li key={item} className="font-medium text-lg flex items-center gap-2">
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
