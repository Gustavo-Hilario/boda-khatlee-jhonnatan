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

      {/* Center X pattern where flaps meet */}
      <AnimatePresence>
        {!isFlapsOpening && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
          >
            <svg className="w-full h-full" preserveAspectRatio="none">
              <line
                x1="0"
                y1="0"
                x2="100%"
                y2="100%"
                stroke="rgba(161, 125, 66, 0.1)"
                strokeWidth="1"
              />
              <line
                x1="100%"
                y1="0"
                x2="0"
                y2="100%"
                stroke="rgba(161, 125, 66, 0.1)"
                strokeWidth="1"
              />
            </svg>
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
