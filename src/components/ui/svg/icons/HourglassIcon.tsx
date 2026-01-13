import { motion, type Variants, useInView } from 'framer-motion'
import { useRef } from 'react'

interface HourglassIconProps {
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

// Sand flow animation
const sandFlowVariants: Variants = {
  animate: {
    y: [0, 8],
    opacity: [1, 0],
    scaleY: [1, 0.5],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'linear',
    },
  },
}

// Sand pile grow animation
const sandPileVariants: Variants = {
  animate: {
    scaleY: [0.3, 1, 0.3],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'linear',
    },
  },
}

// Subtle rotation
const rotationVariants: Variants = {
  animate: {
    rotate: [0, 180],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatDelay: 3,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

export function HourglassIcon({
  size = 32,
  className = '',
  animate = true,
  color = 'currentColor',
}: HourglassIconProps) {
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
      style={{ originX: '16px', originY: '16px' }}
      variants={animate ? rotationVariants : undefined}
      animate={animate && isInView ? 'animate' : undefined}
    >
      {/* Top frame */}
      <motion.path
        d="M6 4H26"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        variants={drawVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      />

      {/* Bottom frame */}
      <motion.path
        d="M6 28H26"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        variants={drawVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      />

      {/* Glass body left */}
      <motion.path
        d="M8 4V8C8 10 10 14 16 16C10 18 8 22 8 24V28"
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

      {/* Glass body right */}
      <motion.path
        d="M24 4V8C24 10 22 14 16 16C22 18 24 22 24 24V28"
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

      {/* Top sand pile (decreasing) */}
      <motion.path
        d="M10 7C10 7 12 9 16 9C20 9 22 7 22 7"
        stroke="#c19a5b"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.8 } : {}}
        transition={{ delay: 0.6 }}
      />

      {/* Sand stream in middle */}
      {animate && (
        <motion.line
          x1="16"
          y1="14"
          x2="16"
          y2="18"
          stroke="#c19a5b"
          strokeWidth="1.5"
          strokeLinecap="round"
          variants={sandFlowVariants}
          animate={isInView ? 'animate' : undefined}
        />
      )}

      {/* Bottom sand pile (increasing) */}
      <motion.g
        style={{ originX: '16px', originY: '26px' }}
        variants={animate ? sandPileVariants : undefined}
        animate={animate && isInView ? 'animate' : undefined}
      >
        <motion.path
          d="M12 26C12 26 14 24 16 24C18 24 20 26 20 26"
          stroke="#c19a5b"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.8 } : {}}
          transition={{ delay: 0.7 }}
        />
      </motion.g>

      {/* Decorative caps */}
      <motion.rect
        x="7"
        y="3"
        width="18"
        height="2"
        rx="1"
        fill={color}
        opacity={0.3}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.3 } : {}}
        transition={{ delay: 0.5 }}
      />
      <motion.rect
        x="7"
        y="27"
        width="18"
        height="2"
        rx="1"
        fill={color}
        opacity={0.3}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.3 } : {}}
        transition={{ delay: 0.5 }}
      />

      {/* Decorative gold bands */}
      <motion.circle
        cx="8"
        cy="4"
        r="1"
        fill="#c19a5b"
        initial={{ opacity: 0, scale: 0 }}
        animate={isInView ? { opacity: 0.8, scale: 1 } : {}}
        transition={{ delay: 0.8, type: 'spring' }}
      />
      <motion.circle
        cx="24"
        cy="4"
        r="1"
        fill="#c19a5b"
        initial={{ opacity: 0, scale: 0 }}
        animate={isInView ? { opacity: 0.8, scale: 1 } : {}}
        transition={{ delay: 0.85, type: 'spring' }}
      />
      <motion.circle
        cx="8"
        cy="28"
        r="1"
        fill="#c19a5b"
        initial={{ opacity: 0, scale: 0 }}
        animate={isInView ? { opacity: 0.8, scale: 1 } : {}}
        transition={{ delay: 0.9, type: 'spring' }}
      />
      <motion.circle
        cx="24"
        cy="28"
        r="1"
        fill="#c19a5b"
        initial={{ opacity: 0, scale: 0 }}
        animate={isInView ? { opacity: 0.8, scale: 1 } : {}}
        transition={{ delay: 0.95, type: 'spring' }}
      />
    </motion.svg>
  )
}
