import { motion, type Variants, useInView } from 'framer-motion'
import { useRef } from 'react'

interface GiftBoxIconProps {
  size?: number
  className?: string
  animate?: boolean
  color?: string
}

// Draw animation
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

// Bow bounce animation
const bowBounceVariants: Variants = {
  animate: {
    scale: [1, 1.1, 1],
    rotate: [-3, 3, -3],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

// Sparkle burst animation
const sparkleVariants: Variants = {
  animate: (delay: number) => ({
    scale: [0, 1, 0],
    opacity: [0, 1, 0],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      repeatDelay: 2,
      delay: delay,
    },
  }),
}

export function GiftBoxIcon({
  size = 48,
  className = '',
  animate = true,
  color = 'currentColor',
}: GiftBoxIconProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* Box bottom */}
      <motion.path
        d="M6 22V42C6 43.1 6.9 44 8 44H40C41.1 44 42 43.1 42 42V22"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        variants={drawVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      />

      {/* Box lid */}
      <motion.path
        d="M4 16H44V22H4V16Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        variants={drawVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        transition={{ delay: 0.2 }}
      />

      {/* Vertical ribbon */}
      <motion.path
        d="M24 22V44"
        stroke="#c19a5b"
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.5 }}
      />

      {/* Horizontal ribbon */}
      <motion.path
        d="M6 33H42"
        stroke="#c19a5b"
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.6 }}
      />

      {/* Bow */}
      <motion.g
        style={{ originX: '24px', originY: '12px' }}
        variants={animate ? bowBounceVariants : undefined}
        animate={animate && isInView ? 'animate' : undefined}
      >
        {/* Left loop */}
        <motion.path
          d="M24 12C24 12 18 8 14 10C10 12 10 16 14 18C18 20 24 16 24 16"
          stroke="#c19a5b"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
        />
        {/* Right loop */}
        <motion.path
          d="M24 12C24 12 30 8 34 10C38 12 38 16 34 18C30 20 24 16 24 16"
          stroke="#c19a5b"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        />
        {/* Center knot */}
        <motion.circle
          cx="24"
          cy="14"
          r="3"
          fill="#c19a5b"
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.9, type: 'spring' }}
        />
        {/* Ribbon tails */}
        <motion.path
          d="M22 16L18 22M26 16L30 22"
          stroke="#c19a5b"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
        />
      </motion.g>

      {/* Sparkles */}
      {animate && (
        <>
          <motion.circle
            cx="10"
            cy="10"
            r="2"
            fill="#c19a5b"
            variants={sparkleVariants}
            animate={isInView ? 'animate' : undefined}
            custom={0}
          />
          <motion.circle
            cx="38"
            cy="8"
            r="1.5"
            fill="#c19a5b"
            variants={sparkleVariants}
            animate={isInView ? 'animate' : undefined}
            custom={0.3}
          />
          <motion.circle
            cx="8"
            cy="28"
            r="1.5"
            fill="#c19a5b"
            variants={sparkleVariants}
            animate={isInView ? 'animate' : undefined}
            custom={0.6}
          />
        </>
      )}

      {/* Heart on box */}
      <motion.path
        d="M24 38L22 36C20.5 34.5 20.5 32.5 22 31.5C23 30.8 24 31.2 24 32C24 31.2 25 30.8 26 31.5C27.5 32.5 27.5 34.5 26 36L24 38Z"
        fill={color}
        opacity={0.5}
        initial={{ opacity: 0, scale: 0 }}
        animate={isInView ? { opacity: 0.5, scale: 1 } : {}}
        transition={{ delay: 1.1, type: 'spring' }}
      />
    </motion.svg>
  )
}
