'use client'

import { useEffect, useRef } from 'react'

const POINTS_COUNT = 40
const DOTS_DENSITY = 0.5

export function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -200, y: -200 })
  const isPointerRef = useRef(false)
  const pointsRef = useRef<{ x: number; y: number }[]>([])
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return
    if (window.innerWidth < 1024) return

    const canvas = canvasRef.current
    if (!canvas) return

    // Get context once — canvas.width reset clears transforms but not the context ref
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const setupCanvas = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      ctx.scale(dpr, dpr)
    }

    setupCanvas()
    mouseRef.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    pointsRef.current = Array.from({ length: POINTS_COUNT }, () => ({ ...mouseRef.current }))

    // Cached theme color — reading getComputedStyle per frame forces a style recalc
    let primaryColor =
      getComputedStyle(document.documentElement).getPropertyValue('--primary').trim() || '#6366f1'
    const themeObserver = new MutationObserver(() => {
      primaryColor =
        getComputedStyle(document.documentElement).getPropertyValue('--primary').trim() || '#6366f1'
    })
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    // Rastro estilo spline: histórico da posição real + dots interpolados entre pontos
    const draw = () => {
      pointsRef.current.unshift({ ...mouseRef.current })
      if (pointsRef.current.length > POINTS_COUNT) pointsRef.current.pop()

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

      const isPointer = isPointerRef.current

      for (let i = 0; i < pointsRef.current.length - 1; i++) {
        const p1 = pointsRef.current[i]
        const p2 = pointsRef.current[i + 1]
        const dx = p2.x - p1.x
        const dy = p2.y - p1.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const steps = Math.max(1, distance * DOTS_DENSITY)

        for (let j = 0; j < steps; j++) {
          const t = j / steps
          const progress = (i + t) / POINTS_COUNT
          ctx.beginPath()
          ctx.arc(p1.x + dx * t, p1.y + dy * t, Math.max(0.5, (isPointer ? 5 : 3.5) * (1 - progress)), 0, Math.PI * 2)
          ctx.fillStyle = primaryColor
          ctx.globalAlpha = Math.max(0, (isPointer ? 0.8 : 0.5) * (1 - progress))
          ctx.fill()
        }
      }

      const head = pointsRef.current[0]
      if (head) {
        ctx.beginPath()
        ctx.arc(head.x, head.y, isPointer ? 15 : 6, 0, Math.PI * 2)
        ctx.fillStyle = primaryColor
        ctx.globalAlpha = isPointer ? 0.15 : 0.9
        ctx.fill()

        if (isPointer) {
          ctx.strokeStyle = primaryColor
          ctx.lineWidth = 2
          ctx.globalAlpha = 0.8
          ctx.stroke()
        }
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
      const el = e.target as HTMLElement
      isPointerRef.current = !!(
        el?.tagName === 'A' ||
        el?.tagName === 'BUTTON' ||
        el?.closest('a') ||
        el?.closest('button') ||
        (el && window.getComputedStyle(el).cursor === 'pointer')
      )
    }

    const onResize = () => setupCanvas()

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('resize', onResize)
    document.documentElement.classList.add('cursor-none')

    rafRef.current = requestAnimationFrame(draw)

    // Show only after canvas is initialized — avoids the blurry flash on F5
    canvas.style.opacity = '1'

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      themeObserver.disconnect()
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      document.documentElement.classList.remove('cursor-none')
    }
  }, []) // single run — isPointer is a ref, never causes re-run

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .cursor-none, .cursor-none * { cursor: none !important; }
        canvas#cursor-canvas {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          pointer-events: none;
          z-index: 100000;
          opacity: 0;
          transition: opacity 0.2s;
        }
      `}} />
      <canvas id="cursor-canvas" ref={canvasRef} className="hidden lg:block" />
    </>
  )
}
