'use client'
import { m, useInView } from 'framer-motion'




import { useRef } from 'react'
import { Target, BarChart3, LayoutGrid } from 'lucide-react'


const areaIcons = [Target, BarChart3, LayoutGrid]

export function SystemDesignSection({ dict: t }: { dict: any }) {
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
            {t.areas.sectionLabel}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            {t.areas.title}
          </h2>
        </m.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.areas.items.map((item: any, index: number) => {
            const Icon = areaIcons[index]
            
            return (
              <m.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-colors h-full flex flex-col">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </m.div>
            )
          })}
        </div>

        {/* Code in Action Placeholder */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 rounded-2xl bg-[#0d1117] border border-border overflow-hidden shadow-2xl"
        >
          <div className="flex items-center gap-2 px-4 py-3 bg-[#161b22] border-b border-border">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
            </div>
            <div className="ml-4 text-xs font-mono text-muted-foreground">isllan_toso.py — Python</div>
          </div>
          <div className="p-6 font-mono text-sm leading-relaxed overflow-x-auto">
            <pre className="text-[#c9d1d9]">
              <code className="language-python">{`class IsllanToso:
    """Representa o portfólio profissional de Isllan Toso Pereira."""
    def __init__(self):
        self.nome = "Isllan Toso Pereira"
        self.cargo = "Software Developer @ Globalsys"
        self.foco = ["Backend", "Dados", "Automação"]
        self.skills = ["Python", "FastAPI", "Pandas", "SQL"]

    def working_on(self):
        return "Transformando processos complexos em fluxos eficientes."`}</code>
            </pre>
          </div>
        </m.div>
      </div>
    </section>
  )
}
