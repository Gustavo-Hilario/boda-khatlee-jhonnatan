import { motion, type Variants, useInView } from 'framer-motion'
import { useRef } from 'react'

interface MapPinIconProps {
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
      pathLength: { duration: 1, ease: 'easeInOut' },
      opacity: { duration: 0.3 },
    },
  },
}

// Pin drop/bounce animation
const pinBounceVariants: Variants = {
  hidden: { y: -20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 10,
    },
  },
}

// Pulse animation for the ring
const pulseVariants: Variants = {
  animate: {
    scale: [1, 1.5, 1],
    opacity: [0.6, 0, 0.6],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeOut',
    },
  },
}

// Heart pulse inside pin
const heartPulseVariants: Variants = {
  animate: {
    scale: [1, 1.15, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

export function MapPinIcon({
  size = 32,
  className = '',
  animate = true,
  color = 'currentColor',
}: MapPinIconProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden="true"
      variants={pinBounceVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {/* Pulse ring at bottom */}
      {animate && (
        <motion.ellipse
          cx="16"
          cy="28"
          rx="6"
          ry="2"
          fill="#c19a5b"
          variants={pulseVariants}
          animate={isInView ? 'animate' : undefined}
        />
      )}

      {/* Shadow ellipse */}
      <motion.ellipse
        cx="16"
        cy="28"
        rx="4"
        ry="1.5"
        fill="currentColor"
        opacity={0.2}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.2 } : {}}
        transition={{ delay: 0.5 }}
      />

      {/* Main pin shape */}
      <motion.path
        d="M16 2C10.477 2 6 6.477 6 12C6 18.5 16 28 16 28C16 28 26 18.5 26 12C26 6.477 21.523 2 16 2Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        variants={drawVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      />

      {/* Inner circle */}
      <motion.circle
        cx="16"
        cy="12"
        r="4"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
        initial={{ opacity: 0, scale: 0 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.6, type: 'spring', stiffness: 300 }}
      />

      {/* Heart inside pin */}
      <motion.g
        variants={animate ? heartPulseVariants : undefined}
        animate={animate && isInView ? 'animate' : undefined}
      >
        <motion.path
          d="M16 14.5L14.5 13C13.5 12 13.5 10.5 14.5 9.8C15.2 9.3 16 9.5 16 10C16 9.5 16.8 9.3 17.5 9.8C18.5 10.5 18.5 12 17.5 13L16 14.5Z"
          fill="#c19a5b"
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.8, type: 'spring', stiffness: 300 }}
        />
      </motion.g>
    </motion.svg>
  )
}
