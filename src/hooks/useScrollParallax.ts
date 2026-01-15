import { useRef, type RefObject } from 'react'
import { useScroll, useTransform, useSpring, type MotionValue } from 'framer-motion'
import { useMobile } from './useMobile'

interface ScrollParallaxResult {
  ref: RefObject<HTMLDivElement | null>
  y: MotionValue<number>
  scale: MotionValue<number>
  opacity: MotionValue<number>
}

interface ScrollParallaxOptions {
  /** Y-axis movement intensity (0-1). Default: 0.3 */
  yIntensity?: number
  /** Scale range [min, max]. Default: [0.92, 1] */
  scaleRange?: [number, number]
  /** Opacity range [start, end]. Default: [0.6, 1] */
  opacityRange?: [number, number]
  /** Spring stiffness for smooth movement. Default: 100 */
  stiffness?: number
  /** Spring damping. Default: 30 */
  damping?: number
  /** Whether to disable on mobile. Default: true */
  disableOnMobile?: boolean
}

/**
 * Hook for scroll-synced parallax effects on gallery items
 * Creates smooth Y movement, scale, and opacity transitions as elements scroll
 */
export function useScrollParallax(options: ScrollParallaxOptions = {}): ScrollParallaxResult {
  const {
    yIntensity = 0.3,
    scaleRange = [0.92, 1],
    opacityRange = [0.6, 1],
    stiffness = 100,
    damping = 30,
    disableOnMobile = true,
  } = options

  const ref = useRef<HTMLDivElement>(null)
  const isMobile = useMobile()
  const isDisabled = disableOnMobile && isMobile

  // Track scroll progress for this element
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // Y-axis parallax movement
  // At start (0): element is below viewport, offset positive
  // At middle (0.5): element in center, no offset
  // At end (1): element above viewport, offset negative
  const yRange = isDisabled ? 0 : 50 * yIntensity
  const rawY = useTransform(scrollYProgress, [0, 0.5, 1], [yRange, 0, -yRange])
  const y = useSpring(rawY, { stiffness, damping })

  // Scale effect: smaller at edges, full size in center
  const [scaleMin, scaleMax] = isDisabled ? [1, 1] : scaleRange
  const rawScale = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [scaleMin, scaleMax, scaleMax, scaleMin])
  const scale = useSpring(rawScale, { stiffness: stiffness * 1.5, damping: damping * 0.8 })

  // Opacity: fade in/out at edges
  const [opacityMin, opacityMax] = isDisabled ? [1, 1] : opacityRange
  const rawOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [opacityMin, opacityMax, opacityMax, opacityMin])
  const opacity = useSpring(rawOpacity, { stiffness: 80, damping: 25 })

  return { ref, y, scale, opacity }
}

/**
 * Simplified scroll parallax for individual items
 * Returns motion style props ready to spread
 */
export function useItemScrollEffect(index: number, options: ScrollParallaxOptions = {}) {
  const { ref, y, scale, opacity } = useScrollParallax(options)
  const isMobile = useMobile()

  // Alternating entrance directions for visual interest
  const entranceDirection = isMobile ? 0 : (index % 2 === 0 ? -30 : 30)

  return {
    ref,
    style: {
      y,
      scale,
      opacity,
    },
    // Initial state for entrance animation
    initial: {
      opacity: 0,
      x: entranceDirection,
      scale: 0.9,
    },
    // Animate to visible state
    whileInView: {
      opacity: 1,
      x: 0,
      scale: 1,
    },
    viewport: { once: true, amount: 0.1 },
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
      delay: Math.min(index * 0.05, 0.3), // Stagger but cap delay
    },
  }
}
