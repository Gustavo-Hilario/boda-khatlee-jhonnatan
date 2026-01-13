import { useState, useRef, useCallback } from 'react'
import { useSpring, useMotionValue } from 'framer-motion'

interface MagneticState {
  x: number
  y: number
}

export function useMagneticHover(intensity = 8) {
  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  // Use motion values for smooth spring animations
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Spring config for smooth, natural movement
  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 }
  const rotateX = useSpring(0, springConfig)
  const rotateY = useSpring(0, springConfig)

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return

      const rect = ref.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      // Calculate offset from center
      const offsetX = (e.clientX - centerX) / intensity
      const offsetY = (e.clientY - centerY) / intensity

      // Update motion values (inverted for natural tilt feel)
      rotateX.set(offsetY * -1)
      rotateY.set(offsetX)
      x.set(offsetX * 0.5)
      y.set(offsetY * 0.5)
    },
    [intensity, rotateX, rotateY, x, y]
  )

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    // Reset to center
    rotateX.set(0)
    rotateY.set(0)
    x.set(0)
    y.set(0)
  }, [rotateX, rotateY, x, y])

  return {
    ref,
    isHovered,
    style: {
      rotateX,
      rotateY,
      x,
      y,
    },
    handlers: {
      onMouseMove: handleMouseMove,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
    },
  }
}
