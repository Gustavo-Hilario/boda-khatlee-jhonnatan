import { useState, useRef, useCallback } from 'react'
import { useSpring, useMotionValue } from 'framer-motion'
import { useMobile } from './useMobile'

interface MagneticHoverOptions {
  /** Movement intensity (higher = more movement) */
  intensity?: number
  /** Enable scale effect on hover */
  enableScale?: boolean
  /** Scale amount on hover */
  scaleAmount?: number
  /** Spring stiffness */
  stiffness?: number
  /** Spring damping */
  damping?: number
  /** Disable on mobile */
  disableOnMobile?: boolean
}

export function useMagneticHover(options: MagneticHoverOptions | number = {}) {
  // Support legacy number parameter
  const opts = typeof options === 'number' ? { intensity: options } : options
  const {
    intensity = 8,
    enableScale = true,
    scaleAmount = 1.05,
    stiffness = 150,
    damping = 15,
    disableOnMobile = true,
  } = opts

  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const isMobile = useMobile()
  const isDisabled = disableOnMobile && isMobile

  // Use motion values for smooth spring animations
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Spring config for smooth, natural movement
  const springConfig = { stiffness, damping, mass: 0.1 }
  const rotateX = useSpring(0, springConfig)
  const rotateY = useSpring(0, springConfig)
  const scale = useSpring(1, { stiffness: 300, damping: 20 })

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current || isDisabled) return

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
    [intensity, rotateX, rotateY, x, y, isDisabled]
  )

  const handleMouseEnter = useCallback(() => {
    if (isDisabled) return
    setIsHovered(true)
    if (enableScale) {
      scale.set(scaleAmount)
    }
  }, [isDisabled, enableScale, scaleAmount, scale])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    // Reset to center
    rotateX.set(0)
    rotateY.set(0)
    x.set(0)
    y.set(0)
    scale.set(1)
  }, [rotateX, rotateY, x, y, scale])

  return {
    ref,
    isHovered,
    isDisabled,
    style: {
      rotateX,
      rotateY,
      x,
      y,
      scale: enableScale ? scale : undefined,
    },
    handlers: {
      onMouseMove: handleMouseMove,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
    },
  }
}
