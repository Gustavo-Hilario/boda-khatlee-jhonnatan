import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, type Variants } from 'framer-motion'

interface FlipDigitProps {
  digit: number
  size?: 'sm' | 'md' | 'lg'
}

// Enhanced glow pulse on change - golden burst effect
const glowVariants: Variants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: {
    opacity: [0, 0.8, 0.4, 0],
    scale: [0.8, 1.2, 1.1, 1],
    boxShadow: [
      '0 0 0px rgba(193, 154, 91, 0)',
      '0 0 25px rgba(193, 154, 91, 0.8)',
      '0 0 15px rgba(193, 154, 91, 0.5)',
      '0 0 0px rgba(193, 154, 91, 0)',
    ],
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

// Digit flip animation
const digitVariants: Variants = {
  initial: {
    opacity: 0,
    y: -20,
    scale: 0.8,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 20,
    },
  },
  exit: {
    opacity: 0,
    y: 20,
    scale: 0.8,
    transition: {
      duration: 0.2,
    },
  },
}

const sizeClasses = {
  sm: {
    container: 'w-8 h-12 sm:w-10 sm:h-14 md:w-12 md:h-16',
    digit: 'text-xl sm:text-2xl md:text-3xl',
  },
  md: {
    container: 'w-10 h-14 sm:w-12 sm:h-16 md:w-16 md:h-20',
    digit: 'text-2xl sm:text-3xl md:text-4xl',
  },
  lg: {
    container: 'w-14 h-18 sm:w-16 sm:h-20 md:w-20 md:h-24',
    digit: 'text-3xl sm:text-4xl md:text-5xl',
  },
}

export function FlipDigit({ digit, size = 'md' }: FlipDigitProps) {
  const [showGlow, setShowGlow] = useState(false)
  const isFirstRender = useRef(true)
  const prevDigit = useRef(digit)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    if (digit !== prevDigit.current) {
      setShowGlow(true)
      prevDigit.current = digit

      const timer = setTimeout(() => {
        setShowGlow(false)
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [digit])

  const classes = sizeClasses[size]

  return (
    <div
      className={`${classes.container} relative`}
      style={{ perspective: '400px' }}
    >
      {/* Enhanced glow effect on change - golden burst */}
      <AnimatePresence>
        {showGlow && (
          <>
            {/* Outer glow ring */}
            <motion.div
              className="absolute -inset-2 rounded-xl bg-gold-warm/40 blur-lg z-0"
              variants={glowVariants}
              initial="initial"
              animate="animate"
              exit={{ opacity: 0 }}
            />
            {/* Inner glow */}
            <motion.div
              className="absolute inset-0 rounded-lg bg-gold-warm/50 blur-md z-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.6, 0] }}
              transition={{ duration: 0.4 }}
            />
          </>
        )}
      </AnimatePresence>

      {/* Card */}
      <div className="relative w-full h-full rounded-lg overflow-hidden shadow-lg bg-olive">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/10 pointer-events-none" />

        {/* Center line decoration */}
        <div className="absolute inset-x-0 top-1/2 h-px bg-black/20 z-10" />

        {/* Digit */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={digit}
            className={`absolute inset-0 flex items-center justify-center ${classes.digit} font-bold text-white tabular-nums`}
            variants={digitVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {digit}
          </motion.div>
        </AnimatePresence>

        {/* Reflection highlight */}
        <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
      </div>
    </div>
  )
}

// Colon separator with pulse - designed to be used in a row with FlipDigits
// Uses the same height as FlipDigit containers so they naturally align
export function ClockSeparator({ className = '' }: { className?: string }) {
  return (
    <motion.div
      className={`flex flex-col justify-center gap-1.5 sm:gap-2 px-0.5 sm:px-1 md:px-2 ${className}`}
      animate={{ opacity: [1, 0.3, 1] }}
      transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
    >
      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 rounded-full bg-gold-warm" />
      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 rounded-full bg-gold-warm" />
    </motion.div>
  )
}
