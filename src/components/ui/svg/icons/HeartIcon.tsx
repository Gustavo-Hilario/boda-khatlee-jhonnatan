import { motion, type Variants, useInView } from 'framer-motion'
import { useRef } from 'react'

interface HeartIconProps {
  size?: number
  className?: string
  animate?: boolean
  color?: string
  accentColor?: string
}

// Elegant draw animation - slow and graceful
const drawVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 2.5, ease: [0.22, 1, 0.36, 1] },
      opacity: { duration: 0.8 },
    },
  },
}

// Soft breathing animation - gentle and romantic
const breatheVariants: Variants = {
  animate: {
    scale: [1, 1.15, 1],
    opacity: [0.9, 1, 0.9],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

// Subtle glow pulse - soft and dreamy
const softGlowVariants: Variants = {
  animate: {
    opacity: [0.15, 0.25, 0.15],
    scale: [1, 1.1, 1],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

export function HeartIcon({
  size = 48,
  className = '',
  animate = true,
  color = '#800020',
  accentColor = '#c19a5b',
}: HeartIconProps) {
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
      {/* Soft glow behind heart - dreamy effect (only for larger hearts) */}
      {animate && size > 30 && (
        <motion.ellipse
          cx="24"
          cy="26"
          rx="16"
          ry="14"
          fill={color}
          variants={softGlowVariants}
          animate={isInView ? 'animate' : undefined}
          style={{ filter: 'blur(8px)' }}
        />
      )}

      {/* Main heart group with gentle breathing */}
      <motion.g
        variants={animate ? breatheVariants : undefined}
        animate={animate && isInView ? 'animate' : undefined}
        style={{ originX: '24px', originY: '26px' }}
      >
        {/* Heart fill - elegant gradient effect via opacity layers */}
        <motion.path
          d="M24 42C24 42 6 30 6 18C6 12 10.5 7 16 7C19.5 7 22.5 8.8 24 11.5C25.5 8.8 28.5 7 32 7C37.5 7 42 12 42 18C42 30 24 42 24 42Z"
          fill={color}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.9 } : {}}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />

        {/* Subtle inner shadow for depth */}
        <motion.path
          d="M24 42C24 42 6 30 6 18C6 12 10.5 7 16 7C19.5 7 22.5 8.8 24 11.5C25.5 8.8 28.5 7 32 7C37.5 7 42 12 42 18C42 30 24 42 24 42Z"
          fill="url(#heartGradient)"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1.5, delay: 0.3 }}
        />

        {/* Delicate outline with elegant draw */}
        <motion.path
          d="M24 42C24 42 6 30 6 18C6 12 10.5 7 16 7C19.5 7 22.5 8.8 24 11.5C25.5 8.8 28.5 7 32 7C37.5 7 42 12 42 18C42 30 24 42 24 42Z"
          stroke={accentColor}
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          variants={drawVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          style={{ opacity: 0.6 }}
        />

        {/* Soft highlight - gentle reflection */}
        <motion.ellipse
          cx="14"
          cy="16"
          rx="3"
          ry="2"
          fill="white"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.2 } : {}}
          transition={{ delay: 1.5, duration: 1 }}
          style={{ filter: 'blur(1px)' }}
        />
      </motion.g>

      {/* Gradient definitions */}
      <defs>
        <radialGradient id="heartGradient" cx="50%" cy="30%" r="60%">
          <stop offset="0%" stopColor="white" stopOpacity="0.15" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>
    </motion.svg>
  )
}
