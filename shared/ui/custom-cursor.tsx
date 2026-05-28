'use client'

import { useEffect, useState, useCallback, useRef } from 'react'

const POINTS_COUNT = 40 // Longer trail
const DOTS_DENSITY = 0.5 // Interpolation density

export function CustomCursor() {
  const [mounted, setMounted] = useState(false)
  const [isPointer, setIsPointer] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const pointsRef = useRef<{ x: number, y: number }[]>([])
  const requestRef = useRef<number>(null)

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Update points history
    const head = { ...mouseRef.current }
    pointsRef.current.unshift(head)
    if (pointsRef.current.length > POINTS_COUNT) {
      pointsRef.current.pop()
    }

    if (pointsRef.current.length < 3) {
      requestRef.current = requestAnimationFrame(draw)
      return
    }

    const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim() || '#6366f1'

    // Render as harmonic dots along the spline path
    for (let i = 0; i < pointsRef.current.length - 1; i++) {
      const p1 = pointsRef.current[i]
      const p2 = pointsRef.current[i + 1]

      // Interpolate between points for smoothness
      const dx = p2.x - p1.x
      const dy = p2.y - p1.y
      const distance = Math.sqrt(dx * dx + dy * dy)
      const steps = Math.max(1, distance * DOTS_DENSITY)

      for (let j = 0; j < steps; j++) {
        const t = j / steps
        const x = p1.x + dx * t
        const y = p1.y + dy * t

        // Calculation of size and opacity based on global position in the trail
        const progress = (i + t) / POINTS_COUNT
        const size = Math.max(0.5, (isPointer ? 5 : 3.5) * (1 - progress))
        const opacity = Math.max(0, (isPointer ? 0.8 : 0.5) * (1 - progress))

        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fillStyle = primaryColor
        ctx.globalAlpha = opacity
        ctx.fill()
      }
    }

    // Glowing head
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

    setMounted(true)
    
    // ONLY hide default cursor after custom one is ready
    document.documentElement.classList.add('cursor-none')
    
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth
        canvasRef.current.height = window.innerHeight
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('resize', handleResize)
    handleResize()
    
    pointsRef.current = Array.from({ length: POINTS_COUNT }, () => ({ ...mouseRef.current }))
    requestRef.current = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
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
          pointer-events: none;
          z-index: 100000;
          transition: opacity 0.5s ease;
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
