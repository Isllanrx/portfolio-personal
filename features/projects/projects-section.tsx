'use client'
import type { Dictionary } from '@/i18n/get-dictionary'
import { m, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ExternalLink, Github } from 'lucide-react'
import { Badge } from '@/shared/ui/badge'

interface Project {
  id: string
  github?: string
  demo?: string
  featured: boolean
  private?: boolean
}

const projectsData: Project[] = [
  {
    id: 'sistema-veicular',
    demo: 'https://sistema-veicular.isllan.dev',
    featured: true,
    private: true,
  },
  {
    id: 'paulo-veiculos',
    demo: 'https://www.pauloveiculo.com.br/',
    github: 'https://github.com/Isllanrx/automotive-sales-platform',
    featured: true,
  },
  {
    id: 'gerador-contratos',
    github: 'https://github.com/Isllanrx/vehicle-contract-generator',
    featured: true,
  },
  {
    id: 'conversor-webp',
    demo: 'https://conversor-webp.isllan.dev/',
    github: 'https://github.com/Isllanrx/webp-converter-tool',
    featured: true,
  },
  {
    id: 'analytics-converter',
    github: 'https://github.com/Isllanrx/analytics-converter',
    featured: true,
  },
  {
    id: 'blog-esporte-uvv',
    demo: 'https://blog-esporte-uvv.isllan.dev/',
    github: 'https://github.com/Isllanrx/sports-blog',
    featured: true,
  },
  {
    id: 'dashboard-viagens',
    featured: true,
    private: true,
  },
  {
    id: 'estoquei',
    github: 'https://github.com/Isllanrx/Estoquei',
    featured: true,
  },
  {
    id: 'formacao-crisma',
    demo: 'https://meucrisma.isllan.dev/',
    github: 'https://github.com/Isllanrx/Projeto-Crisma',
    featured: true,
  },
]

// Agrupa por segmento: privado (0) → com site (1) → só projeto/github (2). Ordem estável mantém a ordem original dentro do grupo.
const segmentRank = (p: Project) => (p.private ? 0 : p.demo ? 1 : 2)
const orderedProjects = [...projectsData].sort((a, b) => segmentRank(a) - segmentRank(b))

function ProjectCard({ project, t, hiddenOnMobile }: { project: Project; t: Dictionary; hiddenOnMobile?: boolean }) {
  const projectTranslation = t.projects.items[project.id as keyof typeof t.projects.items]

  return (
    <m.article
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      className={`group p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border hover:border-primary/50 transition-all h-full flex-col shadow-sm hover:shadow-xl hover:shadow-primary/5 relative overflow-hidden ${hiddenOnMobile ? 'hidden md:flex' : 'flex'}`}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primary/10 transition-colors" />

      {project.private && (
        <span className="absolute top-3 right-3 z-20 text-[9px] font-bold uppercase tracking-widest text-muted-foreground bg-secondary/60 border border-border rounded-full px-2.5 py-1">
          {t.projects.privateLabel}
        </span>
      )}

      <header className="mb-3 relative z-10">
        <h3 className="text-xl font-bold group-hover:text-primary transition-colors bg-clip-text">
          {projectTranslation.title}
        </h3>
      </header>

      <p className="text-muted-foreground text-sm mb-4 leading-relaxed relative z-10">
        {projectTranslation.shortDescription}
      </p>

      <div className="mt-auto relative z-10">
        <div
          className="flex flex-nowrap gap-1 mb-3 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-label="Tecnologias utilizadas"
        >
          {projectTranslation.techStack.split(', ').map((tech: string) => (
            <Badge key={tech} variant="secondary" className="shrink-0 whitespace-nowrap px-1.5 py-0.5 text-[10px] font-medium bg-secondary/50 border-none">
              {tech}
            </Badge>
          ))}
        </div>

        <div className="flex gap-2 min-h-8" aria-label="Ações rápidas do projeto">
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 h-8 px-4 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 transition-all active:scale-95 shadow-sm shadow-primary/20"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              {t.projects.viewDemo}
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto inline-flex items-center justify-center gap-1.5 h-8 px-4 rounded-lg border border-border text-xs font-semibold hover:bg-secondary transition-all active:scale-95"
            >
              <Github className="w-3.5 h-3.5" />
              {t.projects.sourceCode}
            </a>
          )}
        </div>
      </div>
    </m.article>
  )
}

export function ProjectsSection({ dict: t }: { dict: Dictionary }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="projects" ref={ref} className="py-16 lg:py-24 px-6 md:px-12 lg:px-24 border-t border-border scroll-mt-20">
      <div className="max-w-5xl mx-auto">
        <m.header
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-8 lg:mb-12"
        >
          <span className="text-primary font-mono text-xs lg:text-sm tracking-[0.2em] font-bold uppercase mb-4 block">
            {t.projects.sectionLabel}
          </span>
          <h2 className="text-3xl lg:text-5xl font-bold mb-4 tracking-tight">
            {t.projects.title}
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            {t.projects.description}
          </p>
        </m.header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {orderedProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              t={t}
              hiddenOnMobile={index >= 4}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
