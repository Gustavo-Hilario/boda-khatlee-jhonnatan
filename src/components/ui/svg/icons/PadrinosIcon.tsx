import { motion, type Variants, useInView } from 'framer-motion'
import { useRef } from 'react'

interface PadrinosIconProps {
  size?: number
  className?: string
  animate?: boolean
  color?: string
}

// Draw animation for paths
const drawVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 1.5, ease: 'easeInOut' },
      opacity: { duration: 0.3 },
    },
  },
}

// Flame flicker animation
const flameFlickerVariants: Variants = {
  animate: {
    scaleY: [1, 1.15, 0.95, 1.1, 1],
    scaleX: [1, 0.95, 1.05, 0.98, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

// Flame glow animation
const flameGlowVariants: Variants = {
  animate: {
    filter: [
      'drop-shadow(0 0 3px rgba(193, 154, 91, 0.4))',
      'drop-shadow(0 0 8px rgba(193, 154, 91, 0.7))',
      'drop-shadow(0 0 3px rgba(193, 154, 91, 0.4))',
    ],
    transition: {
      duration: 1.2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

// Light rays pulse animation
const lightRaysVariants: Variants = {
  animate: {
    opacity: [0.2, 0.5, 0.2],
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

export function PadrinosIcon({
  size = 64,
  className = '',
  animate = true,
  color = 'currentColor',
}: PadrinosIconProps) {
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
      {/* Radiating light rays behind flame */}
      <motion.g
        variants={animate ? lightRaysVariants : undefined}
        animate={animate && isInView ? 'animate' : undefined}
      >
        <motion.line
          x1="32"
          y1="8"
          x2="32"
          y2="14"
          stroke="#c19a5b"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity={0.4}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.4 } : {}}
          transition={{ delay: 1.2 }}
        />
        <motion.line
          x1="24"
          y1="12"
          x2="26"
          y2="16"
          stroke="#c19a5b"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity={0.3}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.3 } : {}}
          transition={{ delay: 1.3 }}
        />
        <motion.line
          x1="40"
          y1="12"
          x2="38"
          y2="16"
          stroke="#c19a5b"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity={0.3}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.3 } : {}}
          transition={{ delay: 1.4 }}
        />
      </motion.g>

      {/* Flame with glow */}
      <motion.g
        variants={animate ? flameGlowVariants : undefined}
        animate={animate && isInView ? 'animate' : undefined}
        style={{ originX: '32px', originY: '24px' }}
      >
        {/* Outer flame (golden) */}
        <motion.path
          d="M32 12C32 12 26 18 26 22C26 26 28.5 28 32 28C35.5 28 38 26 38 22C38 18 32 12 32 12Z"
          fill="#c19a5b"
          variants={animate ? flameFlickerVariants : undefined}
          animate={animate && isInView ? 'animate' : undefined}
          initial={{ opacity: 0, scale: 0 }}
          style={{ originX: '32px', originY: '28px' }}
          transition={{ delay: 0.8 }}
        />
        {/* Inner flame (brighter) */}
        <motion.path
          d="M32 16C32 16 29 20 29 22C29 24 30.5 26 32 26C33.5 26 35 24 35 22C35 20 32 16 32 16Z"
          fill="#e8d5a3"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.9 } : {}}
          transition={{ delay: 1 }}
        />
      </motion.g>

      {/* Candle wick */}
      <motion.line
        x1="32"
        y1="26"
        x2="32"
        y2="30"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        variants={drawVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        transition={{ delay: 0.3 }}
      />

      {/* Candle body */}
      <motion.rect
        x="26"
        y="30"
        width="12"
        height="22"
        rx="2"
        stroke={color}
        strokeWidth="2"
        fill="none"
        variants={drawVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        transition={{ delay: 0.4 }}
      />

      {/* Candle drip detail */}
      <motion.path
        d="M28 30C28 30 29 33 29 34C29 35 28 36 28 36"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        opacity={0.5}
        variants={drawVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        transition={{ delay: 0.6 }}
      />

      {/* Candle holder base - elegant curve */}
      <motion.path
        d="M22 52C22 52 24 54 32 54C40 54 42 52 42 52"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        variants={drawVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        transition={{ delay: 0.5 }}
      />

      {/* Holder stem */}
      <motion.path
        d="M28 52V56H36V52"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        variants={drawVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        transition={{ delay: 0.6 }}
      />

      {/* Holder bottom plate */}
      <motion.ellipse
        cx="32"
        cy="58"
        rx="10"
        ry="2"
        stroke={color}
        strokeWidth="2"
        fill="none"
        variants={drawVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        transition={{ delay: 0.7 }}
      />

      {/* Small decorative accent on holder */}
      <motion.circle
        cx="32"
        cy="54"
        r="1.5"
        fill="#c19a5b"
        initial={{ opacity: 0, scale: 0 }}
        animate={isInView ? { opacity: 0.8, scale: 1 } : {}}
        transition={{ delay: 1.1, type: 'spring', stiffness: 200 }}
      />
    </motion.svg>
  )
}
