import { useEffect, useState, memo, useCallback } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useMobile } from '../../hooks/useMobile'

interface CursorDotProps {
  index: number
  cursorX: ReturnType<typeof useSpring>
  cursorY: ReturnType<typeof useSpring>
  isHovering: boolean
}

// Individual trailing dot
const CursorDot = memo(function CursorDot({ index, cursorX, cursorY, isHovering }: CursorDotProps) {
  // Each trailing dot has progressively looser spring for trail effect
  const delay = index * 0.03
  const stiffness = 300 - index * 40
  const damping = 30 - index * 3

  const x = useSpring(cursorX, { stiffness, damping })
  const y = useSpring(cursorY, { stiffness, damping })

  // Size decreases for trailing dots
  const size = Math.max(4, 12 - index * 2)
  // Opacity decreases for trailing dots
  const baseOpacity = Math.max(0.2, 1 - index * 0.2)

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] mix-blend-difference"
      style={{
        x,
        y,
        width: size,
        height: size,
        backgroundColor: isHovering ? '#c19a5b' : 'white',
        opacity: isHovering ? baseOpacity : baseOpacity * 0.6,
        transform: 'translate(-50%, -50%)',
        filter: isHovering ? 'blur(0px)' : `blur(${index * 0.5}px)`,
        transition: `background-color 0.3s ease, filter 0.3s ease`,
      }}
      animate={{
        scale: isHovering && index === 0 ? 1.5 : 1,
      }}
      transition={{
        delay,
        scale: { type: 'spring', stiffness: 400, damping: 25 },
      }}
    />
  )
})

interface CustomCursorProps {
  /** Number of trailing dots */
  trailCount?: number
  /** Enable glow effect on interactive elements */
  enableGlow?: boolean
}

export function CustomCursor({ trailCount = 5, enableGlow = true }: CustomCursorProps) {
  const isMobile = useMobile()
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  // Raw cursor position
  const cursorXRaw = useMotionValue(0)
  const cursorYRaw = useMotionValue(0)

  // Smoothed main cursor position
  const cursorX = useSpring(cursorXRaw, { stiffness: 400, damping: 35 })
  const cursorY = useSpring(cursorYRaw, { stiffness: 400, damping: 35 })

  // Track mouse movement
  const handleMouseMove = useCallback((e: MouseEvent) => {
    cursorXRaw.set(e.clientX)
    cursorYRaw.set(e.clientY)
    if (!isVisible) setIsVisible(true)
  }, [cursorXRaw, cursorYRaw, isVisible])

  // Track hover state on interactive elements
  const handleMouseOver = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement
    const isInteractive = target.closest('a, button, [role="button"], input, textarea, select, [data-cursor-hover]')
    setIsHovering(!!isInteractive)
  }, [])

  // Hide cursor when leaving window
  const handleMouseLeave = useCallback(() => {
    setIsVisible(false)
  }, [])

  const handleMouseEnter = useCallback(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    if (isMobile) return

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseover', handleMouseOver)
    document.documentElement.addEventListener('mouseleave', handleMouseLeave)
    document.documentElement.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave)
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [isMobile, handleMouseMove, handleMouseOver, handleMouseLeave, handleMouseEnter])

  // Don't render on mobile or if not visible
  if (isMobile || !isVisible) return null

  return (
    <>
      {/* Trailing dots */}
      {Array.from({ length: trailCount }).map((_, index) => (
        <CursorDot
          key={index}
          index={index}
          cursorX={cursorX}
          cursorY={cursorY}
          isHovering={isHovering}
        />
      ))}

      {/* Glow effect when hovering interactive elements */}
      {enableGlow && (
        <motion.div
          className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998]"
          style={{
            x: cursorX,
            y: cursorY,
            width: 40,
            height: 40,
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(193, 154, 91, 0.3) 0%, transparent 70%)',
            filter: 'blur(8px)',
          }}
          animate={{
            opacity: isHovering ? 1 : 0,
            scale: isHovering ? 1.5 : 0.5,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        />
      )}
    </>
  )
}

// Minimal cursor style to hide default cursor when custom cursor is active
export const cursorHideStyles = `
  @media (pointer: fine) {
    * {
      cursor: none !important;
    }
  }
`
