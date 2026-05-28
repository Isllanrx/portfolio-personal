'use client'
import { m, useInView } from 'framer-motion'
import { useRef, useState, useMemo } from 'react'
import { ExternalLink, Github, ChevronRight } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/shared/ui/dialog'
import { Badge } from '@/shared/ui/badge'
import Script from 'next/script'

interface Project {
  id: string
  github?: string
  demo?: string
  featured: boolean
}

const projectsData: Project[] = [
  {
    id: 'paulo-veiculos',
    demo: 'https://paulo-veiculos.vercel.app/',
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
    demo: 'https://conversor-webp.vercel.app/',
    github: 'https://github.com/Isllanrx/webp-converter-tool',
    featured: true,
  },
  {
    id: 'analytics-converter',
    github: 'https://github.com/Isllanrx/analytics-converter',
    featured: true,
  },
]

function ProjectCard({ project, onClick, t }: { project: Project; onClick: () => void; t: any }) {
  const projectTranslation = t.projects.items[project.id as keyof typeof t.projects.items]
  
  return (
    <m.article
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      className="group cursor-pointer p-8 rounded-3xl bg-card/50 backdrop-blur-sm border border-border hover:border-primary/50 transition-all h-full flex flex-col shadow-sm hover:shadow-xl hover:shadow-primary/5 relative overflow-hidden"
      onClick={onClick}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primary/10 transition-colors" />
      
      <header className="flex items-start justify-between mb-4 relative z-10">
        <h3 className="text-2xl font-bold group-hover:text-primary transition-colors bg-clip-text">
          {projectTranslation.title}
        </h3>
        <div className="p-2 rounded-full bg-secondary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
          <ChevronRight className="w-5 h-5" aria-hidden="true" />
        </div>
      </header>
      
      <p className="text-muted-foreground text-lg mb-6 flex-grow leading-relaxed relative z-10">
        {projectTranslation.shortDescription}
      </p>

      <div className="flex flex-wrap gap-2 mb-6 relative z-10" aria-label="Tecnologias utilizadas">
        {projectTranslation.techStack.split(', ').map((tech: string) => (
          <Badge key={tech} variant="secondary" className="px-3 py-1 font-medium bg-secondary/50 border-none">
            {tech}
          </Badge>
        ))}
      </div>

      {!project.demo && !project.github && (
        <Badge variant="outline" className="w-fit text-primary border-primary/20 bg-primary/5 px-4 py-1 relative z-10">
          {t.projects.comingSoon}
        </Badge>
      )}
    </m.article>
  )
}

function ProjectModal({ project, open, onClose, t }: { project: Project | null; open: boolean; onClose: () => void; t: any }) {
  if (!project) return null

  const projectTranslation = t.projects.items[project.id as keyof typeof t.projects.items]

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-xl p-8 rounded-3xl overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold mb-2 break-words">{projectTranslation.title}</DialogTitle>
          <DialogDescription className="text-lg leading-relaxed break-words">{projectTranslation.shortDescription}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          <div className="flex flex-wrap gap-2">
            {projectTranslation.techStack.split(', ').map((tech: string) => (
              <Badge key={tech} variant="secondary" className="px-4 py-1 text-sm font-medium">
                {tech}
              </Badge>
            ))}
          </div>

          <nav className="flex gap-4 pt-6" aria-label="Links do projeto">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-border hover:bg-secondary transition-all font-semibold active:scale-95"
              >
                <Github className="w-5 h-5" />
                {t.projects.sourceCode}
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition-all font-semibold shadow-lg shadow-primary/20 active:scale-95"
              >
                <ExternalLink className="w-5 h-5" />
                {t.projects.viewDemo}
              </a>
            )}
          </nav>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function ProjectsSection({ dict: t }: { dict: any }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <section id="projects" ref={ref} className="py-16 lg:py-24 px-6 md:px-12 lg:px-24 border-t border-border scroll-mt-20">
      <div className="max-w-6xl mx-auto">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          {projectsData.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => setSelectedProject(project)}
              t={t}
            />
          ))}
        </div>

        <ProjectModal
          project={selectedProject}
          open={!!selectedProject}
          onClose={() => setSelectedProject(null)}
          t={t}
        />
      </div>
    </section>
  )
}
