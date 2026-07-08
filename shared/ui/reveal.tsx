'use client'
import { m } from 'framer-motion'
import type { ReactNode } from 'react'

// Reveal ao entrar na viewport: o texto "ressurge" com blur + leve subida.
export function Reveal({
  children,
  className,
  delay = 0,
  as = 'div',
}: {
  children: ReactNode
  className?: string
  delay?: number
  as?: 'div' | 'article' | 'li' | 'section' | 'span'
}) {
  const Comp = m[as]
  return (
    <Comp
      initial={{ opacity: 0, y: 22, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </Comp>
  )
}
