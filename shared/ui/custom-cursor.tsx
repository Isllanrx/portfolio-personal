'use client'

import { useEffect, useState, useCallback, useRef } from 'react'

export function CustomCursor() {
  const [mounted, setMounted] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isPointer, setIsPointer] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const createTrail = useCallback((e: MouseEvent) => {
    if (!containerRef.current) return

    const dot = document.createElement('div')
    dot.className = 'cursor-trail-dot'
    
    dot.style.left = `${e.clientX - 2}px`
    dot.style.top = `${e.clientY - 2}px`
    
    containerRef.current.appendChild(dot)

    setTimeout(() => {
      if (dot.parentNode) {
        dot.remove()
      }
    }, 500)
  }, [])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY })
    createTrail(e)

    const target = e.target as HTMLElement
    setIsPointer(
      window.getComputedStyle(target).cursor === 'pointer' ||
      target.tagName === 'A' ||
      target.tagName === 'BUTTON' ||
      target.closest('a') !== null ||
      target.closest('button') !== null
    )
  }, [createTrail])

  useEffect(() => {
    setMounted(true)
    document.documentElement.classList.add('cursor-none')
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.documentElement.classList.remove('cursor-none')
    }
  }, [handleMouseMove])

  if (!mounted) return null

  return (
    <>
      <style jsx global>{`
        .cursor-trail-dot {
          position: fixed;
          width: 4px;
          height: 4px;
          background: var(--primary);
          border-radius: 50%;
          pointer-events: none;
          z-index: 99999;
          opacity: 0.4;
          animation: trailFade 0.5s ease-out forwards;
        }

        @keyframes trailFade {
          0% {
            opacity: 0.4;
            transform: scale(1);
          }
          100% {
            opacity: 0;
            transform: scale(0.2);
          }
        }

        .main-cursor {
          position: fixed;
          width: 8px;
          height: 8px;
          background: var(--primary);
          border-radius: 50%;
          pointer-events: none;
          z-index: 100000;
          transition: transform 0.15s ease-out;
          transform: translate(-50%, -50%) scale(${isPointer ? 2 : 1});
        }

        .cursor-ring {
          position: fixed;
          width: 32px;
          height: 32px;
          border: 1px solid var(--primary);
          border-radius: 50%;
          pointer-events: none;
          z-index: 100000;
          transition: transform 0.2s ease-out, opacity 0.2s ease-out;
          transform: translate(-50%, -50%) scale(${isPointer ? 1.5 : 1});
          opacity: ${isPointer ? 0.5 : 0.3};
        }

        /* Support for different cursors on interactive elements */
        a, button, [role="button"], .cursor-pointer {
          cursor: none !important;
        }
      `}</style>
      <div 
        className="main-cursor hidden lg:block" 
        style={{ left: `${position.x}px`, top: `${position.y}px` }} 
      />
      <div 
        className="cursor-ring hidden lg:block" 
        style={{ left: `${position.x}px`, top: `${position.y}px` }} 
      />
      <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[99999] hidden lg:block" />
    </>
  )
}
