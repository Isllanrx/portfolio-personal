'use client'
import { m, useInView } from 'framer-motion'




import { useRef } from 'react'
import { Calendar, Clock, ChevronRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'


export function BlogSection({ dict: t }: { dict: any }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="blog" ref={ref} className="py-24 px-6 md:px-12 lg:px-24 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-primary font-mono text-sm tracking-wider mb-4 block">
            {t.blog.sectionLabel}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            {t.blog.title}
          </h2>
        </m.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {t.blog.items.map((post: any, index: number) => (
            <m.div
              key={post.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="outline" className="text-primary border-primary/20">
                    {post.tag}
                  </Badge>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      ~{post.readTime} {t.blog.readTime.split('·')[0]}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-muted-foreground text-sm mb-6 flex-grow line-clamp-3">
                  {post.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {post.tags.map((tag: string) => (
                    <span key={tag} className="text-[10px] uppercase tracking-wider font-mono text-muted-foreground">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-primary text-sm font-semibold group-hover:gap-3 transition-all">
                  Ler artigo completo
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  )
}
