'use client'

import { useEffect, useState, useCallback, useRef } from 'react'

const POINTS_COUNT = 30 // Optimal length
const PHYSICS_TICK = 1000 / 120 // 120Hz internal physics for ultra smoothness

export function CustomCursor() {
  const [mounted, setMounted] = useState(false)
  const [isPointer, setIsPointer] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const pointsRef = useRef<{ x: number, y: number }[]>([])
  const lastTickRef = useRef<number>(0)
  const lastFrameTimeRef = useRef<number>(0)
  const requestRef = useRef<number>(null)

  const draw = useCallback((time: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx || !pointsRef.current.length) {
      requestRef.current = requestAnimationFrame(draw)
      return
    }

    // Delta time calculation for Hz independence
    const dt = time - lastFrameTimeRef.current
    lastFrameTimeRef.current = time

    // Internal physics tick to ensure consistent trail length across 30-360Hz
    if (time - lastTickRef.current > PHYSICS_TICK) {
      const head = { ...mouseRef.current }
      pointsRef.current.unshift(head)
      if (pointsRef.current.length > POINTS_COUNT) {
        pointsRef.current.pop()
      }
      lastTickRef.current = time
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim() || '#6366f1'

    // Smooth movement logic (Harmonic decay)
    for (let i = 1; i < pointsRef.current.length; i++) {
      const p = pointsRef.current[i]
      const prev = pointsRef.current[i - 1]

      // Time-independent easing
      const easing = 0.35 * Math.pow(0.9, i)
      const actualEasing = 1 - Math.pow(1 - easing, dt / 16.67)
      
      p.x += (prev.x - p.x) * (actualEasing || easing)
      p.y += (prev.y - p.y) * (actualEasing || easing)
    }

    // Render as harmonic dots
    pointsRef.current.forEach((p, i) => {
      const progress = i / POINTS_COUNT
      const size = Math.max(0.5, (isPointer ? 5 : 3.5) * (1 - progress))
      const opacity = Math.max(0, (isPointer ? 0.7 : 0.4) * (1 - progress))

      ctx.beginPath()
      ctx.arc(p.x, p.y, size, 0, Math.PI * 2)
      ctx.fillStyle = primaryColor
      ctx.globalAlpha = opacity
      ctx.fill()
    })

    // Lead point (instant)
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

    requestRef.current = requestAnimationFrame(draw)
  }, [isPointer])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseRef.current = { x: e.clientX, y: e.clientY }

    const target = e.target as HTMLElement
    if (!target) return

    const isInteractive = 
      window.getComputedStyle(target).cursor === 'pointer' ||
      target.tagName === 'A' ||
      target.tagName === 'BUTTON' ||
      target.closest('a') !== null ||
      target.closest('button') !== null
    
    setIsPointer(isInteractive)
  }, [])

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouchDevice || window.innerWidth < 1024) return

    // Capture initial position
    // @ts-ignore
    if (window.__mousePos && window.__mousePos.x !== -100) {
      // @ts-ignore
      mouseRef.current = { ...window.__mousePos }
    } else {
      // Fallback: center of screen if no movement yet
      mouseRef.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    }

    setMounted(true)
    
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth
        canvasRef.current.height = window.innerHeight
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('resize', handleResize)
    handleResize()
    
    // Seed points with current position
    pointsRef.current = Array.from({ length: POINTS_COUNT }, () => ({ ...mouseRef.current }))
    
    // DELAY hiding default cursor slightly to ensure canvas is warm
    const hideTimer = setTimeout(() => {
      document.documentElement.classList.add('cursor-none')
    }, 100)
    
    lastFrameTimeRef.current = performance.now()
    requestRef.current = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      clearTimeout(hideTimer)
      if (requestRef.current) cancelAnimationFrame(requestRef.current)
      document.documentElement.classList.remove('cursor-none')
    }
  }, [handleMouseMove, draw])

  if (!mounted) return null

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .cursor-none, .cursor-none * {
          cursor: none !important;
        }
        canvas#cursor-canvas {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          pointer-events: none;
          z-index: 100000;
          opacity: 0;
          animation: cursor-fade-in 0.3s forwards;
        }
        @keyframes cursor-fade-in {
          to { opacity: 1; }
        }
      `}} />
      <canvas 
        id="cursor-canvas" 
        ref={canvasRef} 
        className="hidden lg:block"
      />
    </>
  )
}
