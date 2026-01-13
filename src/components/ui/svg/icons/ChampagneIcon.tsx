import { motion, type Variants, useInView } from 'framer-motion'
import { useRef } from 'react'

interface ChampagneIconProps {
  size?: number
  className?: string
  animate?: boolean
  color?: string
}

// Draw animation for glasses
const drawVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 1.2, ease: 'easeInOut' },
      opacity: { duration: 0.3 },
    },
  },
}

// Clink animation - glasses tilt toward each other
const leftGlassVariants: Variants = {
  animate: {
    rotate: [0, 8, 0],
    x: [0, 2, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatDelay: 3,
      ease: 'easeInOut',
    },
  },
}

const rightGlassVariants: Variants = {
  animate: {
    rotate: [0, -8, 0],
    x: [0, -2, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatDelay: 3,
      ease: 'easeInOut',
    },
  },
}

// Bubble float animation
const bubbleVariants: Variants = {
  animate: (custom: { delay: number; duration: number }) => ({
    y: [-5, -15],
    opacity: [0, 1, 0],
    scale: [0.5, 1, 0.5],
    transition: {
      duration: custom.duration,
      repeat: Infinity,
      delay: custom.delay,
      ease: 'easeOut',
    },
  }),
}

// Sparkle animation
const sparkleVariants: Variants = {
  animate: (delay: number) => ({
    scale: [0, 1, 0],
    opacity: [0, 1, 0],
    transition: {
      duration: 1,
      repeat: Infinity,
      repeatDelay: 2,
      delay: delay,
    },
  }),
}

export function ChampagneIcon({
  size = 64,
  className = '',
  animate = true,
  color = 'currentColor',
}: ChampagneIconProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* Left glass */}
      <motion.g
        style={{ originX: '20px', originY: '58px' }}
        variants={animate ? leftGlassVariants : undefined}
        animate={animate && isInView ? 'animate' : undefined}
      >
        {/* Glass bowl */}
        <motion.path
          d="M12 8C12 8 10 24 16 32C18 35 20 38 20 42V54"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          variants={drawVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        />
        <motion.path
          d="M28 8C28 8 30 24 24 32C22 35 20 38 20 42"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          variants={drawVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        />
        {/* Base */}
        <motion.path
          d="M14 58H26M20 54V58"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          variants={drawVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ delay: 0.3 }}
        />
        {/* Liquid line */}
        <motion.path
          d="M14 20C14 20 16 24 20 24C24 24 26 20 26 20"
          stroke="#c19a5b"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.7 } : {}}
          transition={{ delay: 0.8 }}
        />
        {/* Bubbles */}
        {animate && (
          <>
            <motion.circle
              cx="16"
              cy="18"
              r="1"
              fill="#c19a5b"
              variants={bubbleVariants}
              animate={isInView ? 'animate' : undefined}
              custom={{ delay: 0, duration: 2 }}
            />
            <motion.circle
              cx="20"
              cy="16"
              r="1.5"
              fill="#c19a5b"
              variants={bubbleVariants}
              animate={isInView ? 'animate' : undefined}
              custom={{ delay: 0.5, duration: 2.5 }}
            />
            <motion.circle
              cx="24"
              cy="19"
              r="1"
              fill="#c19a5b"
              variants={bubbleVariants}
              animate={isInView ? 'animate' : undefined}
              custom={{ delay: 1, duration: 2 }}
            />
          </>
        )}
      </motion.g>

      {/* Right glass */}
      <motion.g
        style={{ originX: '44px', originY: '58px' }}
        variants={animate ? rightGlassVariants : undefined}
        animate={animate && isInView ? 'animate' : undefined}
      >
        {/* Glass bowl */}
        <motion.path
          d="M36 8C36 8 34 24 40 32C42 35 44 38 44 42V54"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          variants={drawVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        />
        <motion.path
          d="M52 8C52 8 54 24 48 32C46 35 44 38 44 42"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          variants={drawVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        />
        {/* Base */}
        <motion.path
          d="M38 58H50M44 54V58"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          variants={drawVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ delay: 0.3 }}
        />
        {/* Liquid line */}
        <motion.path
          d="M38 20C38 20 40 24 44 24C48 24 50 20 50 20"
          stroke="#c19a5b"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.7 } : {}}
          transition={{ delay: 0.8 }}
        />
        {/* Bubbles */}
        {animate && (
          <>
            <motion.circle
              cx="40"
              cy="17"
              r="1"
              fill="#c19a5b"
              variants={bubbleVariants}
              animate={isInView ? 'animate' : undefined}
              custom={{ delay: 0.3, duration: 2.2 }}
            />
            <motion.circle
              cx="44"
              cy="15"
              r="1.5"
              fill="#c19a5b"
              variants={bubbleVariants}
              animate={isInView ? 'animate' : undefined}
              custom={{ delay: 0.8, duration: 2.3 }}
            />
            <motion.circle
              cx="48"
              cy="18"
              r="1"
              fill="#c19a5b"
              variants={bubbleVariants}
              animate={isInView ? 'animate' : undefined}
              custom={{ delay: 1.2, duration: 2.1 }}
            />
          </>
        )}
      </motion.g>

      {/* Sparkles at clink point */}
      {animate && (
        <>
          <motion.circle
            cx="32"
            cy="10"
            r="2"
            fill="#c19a5b"
            variants={sparkleVariants}
            animate={isInView ? 'animate' : undefined}
            custom={0}
          />
          <motion.circle
            cx="28"
            cy="6"
            r="1.5"
            fill="#c19a5b"
            variants={sparkleVariants}
            animate={isInView ? 'animate' : undefined}
            custom={0.2}
          />
          <motion.circle
            cx="36"
            cy="6"
            r="1.5"
            fill="#c19a5b"
            variants={sparkleVariants}
            animate={isInView ? 'animate' : undefined}
            custom={0.4}
          />
          <motion.circle
            cx="32"
            cy="3"
            r="1"
            fill="#c19a5b"
            variants={sparkleVariants}
            animate={isInView ? 'animate' : undefined}
            custom={0.3}
          />
        </>
      )}
    </motion.svg>
  )
}
