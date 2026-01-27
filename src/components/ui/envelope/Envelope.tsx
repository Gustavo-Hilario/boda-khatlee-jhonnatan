import { useState, useCallback } from 'react'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { WaxSeal } from './WaxSeal'
import { useMobile } from '../../../hooks/useMobile'

interface EnvelopeProps {
  isOpening: boolean
  onOpenComplete?: () => void
  onSealClick?: () => void
  fullScreen?: boolean
}

type AnimationPhase = 'idle' | 'seal-breaking' | 'flaps-opening' | 'complete'

// Envelope paper colors
const ENVELOPE_COLOR = '#faf8f5'

// Flap animation variants for X rotation (top/bottom flaps)
const createFlapVariantsX = (
  rotateValue: number,
  delay: number
): Variants => ({
  closed: {
    rotateX: 0,
    opacity: 1,
  },
  open: {
    rotateX: rotateValue,
    opacity: 0,
    transition: {
      duration: 0.6,
      delay,
      ease: [0.22, 1, 0.36, 1],
    },
  },
})

// Flap animation variants for Y rotation (left/right flaps)
const createFlapVariantsY = (
  rotateValue: number,
  delay: number
): Variants => ({
  closed: {
    rotateY: 0,
    opacity: 1,
  },
  open: {
    rotateY: rotateValue,
    opacity: 0,
    transition: {
      duration: 0.6,
      delay,
      ease: [0.22, 1, 0.36, 1],
    },
  },
})

// Base flap styles
const baseFlapStyle = {
  position: 'absolute' as const,
  backgroundColor: ENVELOPE_COLOR,
  backfaceVisibility: 'hidden' as const,
}

export function Envelope({ isOpening, onOpenComplete, fullScreen = false }: EnvelopeProps) {
  const [animationPhase, setAnimationPhase] = useState<AnimationPhase>('idle')
  const isMobile = useMobile()
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false

  const handleSealBreakComplete = useCallback(() => {
    setAnimationPhase('flaps-opening')
  }, [])

  const handleFlapsOpenComplete = useCallback(() => {
    setAnimationPhase('complete')
    onOpenComplete?.()
  }, [onOpenComplete])

  // Trigger animation start when isOpening becomes true
  if (isOpening && animationPhase === 'idle') {
    setAnimationPhase('seal-breaking')
  }

  const isFlapsOpening = animationPhase === 'flaps-opening' || animationPhase === 'complete'
  const isSealBreaking = animationPhase === 'seal-breaking' || isFlapsOpening

  // Container classes based on fullScreen prop
  const containerClasses = fullScreen
    ? "relative w-full h-full"
    : "relative w-[85vw] max-w-[320px] md:max-w-[400px] lg:max-w-[500px] aspect-[4/3]"

  // Quick fade for reduced motion
  if (prefersReducedMotion) {
    return (
      <motion.div
        className={containerClasses}
        initial={{ opacity: 1 }}
        animate={{ opacity: isOpening ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        onAnimationComplete={() => isOpening && onOpenComplete?.()}
      >
        <div
          className="w-full h-full"
          style={{ backgroundColor: ENVELOPE_COLOR }}
        />
      </motion.div>
    )
  }

  return (
    <div
      className={containerClasses}
      style={{
        perspective: '1500px',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Envelope body - the main background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: ENVELOPE_COLOR,
        }}
      />

      {/* Subtle paper texture */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 3px,
              rgba(0,0,0,0.03) 3px,
              rgba(0,0,0,0.03) 4px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 3px,
              rgba(0,0,0,0.02) 3px,
              rgba(0,0,0,0.02) 4px
            )
          `,
        }}
      />

      {/* Flaps container */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Top Flap */}
        <motion.div
          style={{
            ...baseFlapStyle,
            top: 0,
            left: 0,
            width: '100%',
            height: '50%',
            clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
            transformOrigin: 'top center',
            zIndex: 15,
          }}
          variants={createFlapVariantsX(-180, 0)}
          initial="closed"
          animate={isFlapsOpening ? 'open' : 'closed'}
        >
          {/* Inner shadow for fold effect */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.03) 0%, transparent 40%)',
            }}
          />
          {/* Fold line */}
          <div
            className="absolute bottom-0 left-1/4 right-1/4 h-px"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.08), transparent)',
            }}
          />
        </motion.div>

        {/* Left Flap */}
        <motion.div
          style={{
            ...baseFlapStyle,
            top: 0,
            left: 0,
            width: '50%',
            height: '100%',
            clipPath: 'polygon(0 0, 100% 50%, 0 100%)',
            transformOrigin: 'left center',
            zIndex: 14,
          }}
          variants={createFlapVariantsY(180, isMobile ? 0.15 : 0.1)}
          initial="closed"
          animate={isFlapsOpening ? 'open' : 'closed'}
        >
          {/* Inner shadow */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to right, rgba(0,0,0,0.03) 0%, transparent 40%)',
            }}
          />
        </motion.div>

        {/* Right Flap */}
        <motion.div
          style={{
            ...baseFlapStyle,
            top: 0,
            right: 0,
            width: '50%',
            height: '100%',
            clipPath: 'polygon(100% 0, 100% 100%, 0 50%)',
            transformOrigin: 'right center',
            zIndex: 14,
          }}
          variants={createFlapVariantsY(-180, isMobile ? 0.2 : 0.15)}
          initial="closed"
          animate={isFlapsOpening ? 'open' : 'closed'}
          onAnimationComplete={() => {
            if (isFlapsOpening) {
              setTimeout(handleFlapsOpenComplete, 200)
            }
          }}
        >
          {/* Inner shadow */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to left, rgba(0,0,0,0.03) 0%, transparent 40%)',
            }}
          />
        </motion.div>

        {/* Bottom Flap */}
        <motion.div
          style={{
            ...baseFlapStyle,
            bottom: 0,
            left: 0,
            width: '100%',
            height: '50%',
            clipPath: 'polygon(0 100%, 50% 0, 100% 100%)',
            transformOrigin: 'bottom center',
            zIndex: 13,
          }}
          variants={createFlapVariantsX(180, isMobile ? 0.25 : 0.2)}
          initial="closed"
          animate={isFlapsOpening ? 'open' : 'closed'}
        >
          {/* Inner shadow */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to top, rgba(0,0,0,0.03) 0%, transparent 40%)',
            }}
          />
        </motion.div>
      </div>

      {/* V-shaped fold pattern - elegant envelope flap effect */}
      <AnimatePresence>
        {!isFlapsOpening && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
          >
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                {/* Subtle gradient for V fold - left side */}
                <linearGradient id="vFoldLeft" x1="0%" y1="0%" x2="50%" y2="55%">
                  <stop offset="0%" stopColor="rgba(180, 160, 140, 0.03)" />
                  <stop offset="50%" stopColor="rgba(160, 140, 120, 0.06)" />
                  <stop offset="100%" stopColor="rgba(180, 160, 140, 0.03)" />
                </linearGradient>
                {/* Subtle gradient for V fold - right side */}
                <linearGradient id="vFoldRight" x1="100%" y1="0%" x2="50%" y2="55%">
                  <stop offset="0%" stopColor="rgba(180, 160, 140, 0.03)" />
                  <stop offset="50%" stopColor="rgba(160, 140, 120, 0.06)" />
                  <stop offset="100%" stopColor="rgba(180, 160, 140, 0.03)" />
                </linearGradient>
                {/* Light highlight for paper crease */}
                <linearGradient id="vHighlightLeft" x1="0%" y1="0%" x2="50%" y2="55%">
                  <stop offset="0%" stopColor="rgba(255, 252, 248, 0.02)" />
                  <stop offset="50%" stopColor="rgba(255, 252, 248, 0.08)" />
                  <stop offset="100%" stopColor="rgba(255, 252, 248, 0.02)" />
                </linearGradient>
                <linearGradient id="vHighlightRight" x1="100%" y1="0%" x2="50%" y2="55%">
                  <stop offset="0%" stopColor="rgba(255, 252, 248, 0.02)" />
                  <stop offset="50%" stopColor="rgba(255, 252, 248, 0.08)" />
                  <stop offset="100%" stopColor="rgba(255, 252, 248, 0.02)" />
                </linearGradient>
              </defs>

              {/* V fold line - left side: top-left corner to center point */}
              <line
                x1="0"
                y1="0"
                x2="50"
                y2="55"
                stroke="url(#vFoldLeft)"
                strokeWidth="0.8"
              />
              {/* Highlight edge - left */}
              <line
                x1="0"
                y1="0"
                x2="50"
                y2="55"
                stroke="url(#vHighlightLeft)"
                strokeWidth="0.4"
                transform="translate(-0.2, -0.2)"
              />

              {/* V fold line - right side: top-right corner to center point */}
              <line
                x1="100"
                y1="0"
                x2="50"
                y2="55"
                stroke="url(#vFoldRight)"
                strokeWidth="0.8"
              />
              {/* Highlight edge - right */}
              <line
                x1="100"
                y1="0"
                x2="50"
                y2="55"
                stroke="url(#vHighlightRight)"
                strokeWidth="0.4"
                transform="translate(0.2, -0.2)"
              />
            </svg>

            {/* Subtle triangular shadow for flap depth */}
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(180deg, rgba(0,0,0,0.015) 0%, transparent 30%)',
                clipPath: 'polygon(0 0, 100% 0, 50% 55%)',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Wax Seal - positioned at center */}
      <WaxSeal
        isBreaking={isSealBreaking}
        onBreakComplete={handleSealBreakComplete}
        size={fullScreen ? (isMobile ? 'large' : 'xlarge') : 'medium'}
      />
    </div>
  )
}
