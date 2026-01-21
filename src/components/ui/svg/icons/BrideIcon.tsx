import { motion, type Variants, useInView } from 'framer-motion'
import { useRef } from 'react'

interface BrideIconProps {
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

// Veil flow animation
const veilFlowVariants: Variants = {
  animate: {
    d: [
      'M32 18C32 18 22 22 18 28C14 34 12 42 12 42',
      'M32 18C32 18 20 23 17 29C14 35 13 42 13 42',
      'M32 18C32 18 22 22 18 28C14 34 12 42 12 42',
    ],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

const veilFlowVariants2: Variants = {
  animate: {
    d: [
      'M32 18C32 18 42 22 46 28C50 34 52 42 52 42',
      'M32 18C32 18 44 23 47 29C50 35 51 42 51 42',
      'M32 18C32 18 42 22 46 28C50 34 52 42 52 42',
    ],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut',
      delay: 0.5,
    },
  },
}

// Bouquet glow animation
const bouquetGlowVariants: Variants = {
  animate: {
    filter: [
      'drop-shadow(0 0 2px rgba(193, 154, 91, 0.2))',
      'drop-shadow(0 0 6px rgba(193, 154, 91, 0.5))',
      'drop-shadow(0 0 2px rgba(193, 154, 91, 0.2))',
    ],
    transition: {
      duration: 2.5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

// Sparkle animation for bouquet flowers
const sparkleVariants: Variants = {
  animate: {
    scale: [0.8, 1.2, 0.8],
    opacity: [0.6, 1, 0.6],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

export function BrideIcon({
  size = 64,
  className = '',
  animate = true,
  color = 'currentColor',
}: BrideIconProps) {
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
      {/* Head/face circle */}
      <motion.circle
        cx="32"
        cy="16"
        r="8"
        stroke={color}
        strokeWidth="2"
        fill="none"
        variants={drawVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      />

      {/* Hair/veil top */}
      <motion.path
        d="M24 14C24 14 26 8 32 8C38 8 40 14 40 14"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        variants={drawVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        transition={{ delay: 0.2 }}
      />

      {/* Veil left side - animated */}
      <motion.path
        d="M32 18C32 18 22 22 18 28C14 34 12 42 12 42"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        opacity={0.6}
        variants={animate ? veilFlowVariants : drawVariants}
        initial="hidden"
        animate={isInView ? (animate ? 'animate' : 'visible') : 'hidden'}
        transition={{ delay: 0.3 }}
      />

      {/* Veil right side - animated */}
      <motion.path
        d="M32 18C32 18 42 22 46 28C50 34 52 42 52 42"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        opacity={0.6}
        variants={animate ? veilFlowVariants2 : drawVariants}
        initial="hidden"
        animate={isInView ? (animate ? 'animate' : 'visible') : 'hidden'}
        transition={{ delay: 0.4 }}
      />

      {/* Dress body - A-line silhouette */}
      <motion.path
        d="M26 24L20 58H44L38 24"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        variants={drawVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        transition={{ delay: 0.3 }}
      />

      {/* Dress neckline */}
      <motion.path
        d="M26 24C26 24 29 28 32 28C35 28 38 24 38 24"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        variants={drawVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        transition={{ delay: 0.4 }}
      />

      {/* Waist detail */}
      <motion.path
        d="M24 36H40"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity={0.7}
        variants={drawVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        transition={{ delay: 0.5 }}
      />

      {/* Bouquet with glow */}
      <motion.g
        variants={animate ? bouquetGlowVariants : undefined}
        animate={animate && isInView ? 'animate' : undefined}
      >
        {/* Bouquet stems */}
        <motion.path
          d="M28 42L32 48L36 42"
          stroke="#8d9e78"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
        />

        {/* Bouquet flowers */}
        <motion.g
          variants={animate ? sparkleVariants : undefined}
          animate={animate && isInView ? 'animate' : undefined}
        >
          <motion.circle
            cx="28"
            cy="40"
            r="3"
            fill="#c19a5b"
            opacity={0.8}
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 0.8, scale: 1 } : {}}
            transition={{ delay: 1.1, type: 'spring' }}
          />
          <motion.circle
            cx="32"
            cy="38"
            r="3.5"
            fill="#c19a5b"
            opacity={0.9}
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 0.9, scale: 1 } : {}}
            transition={{ delay: 1.2, type: 'spring' }}
          />
          <motion.circle
            cx="36"
            cy="40"
            r="3"
            fill="#c19a5b"
            opacity={0.8}
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 0.8, scale: 1 } : {}}
            transition={{ delay: 1.3, type: 'spring' }}
          />
        </motion.g>
      </motion.g>

      {/* Small decorative dots on dress */}
      <motion.circle
        cx="32"
        cy="32"
        r="1"
        fill={color}
        opacity={0.5}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.5 } : {}}
        transition={{ delay: 0.8 }}
      />
      <motion.circle
        cx="30"
        cy="44"
        r="0.8"
        fill={color}
        opacity={0.4}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.4 } : {}}
        transition={{ delay: 0.9 }}
      />
      <motion.circle
        cx="34"
        cy="50"
        r="0.8"
        fill={color}
        opacity={0.4}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.4 } : {}}
        transition={{ delay: 1 }}
      />
    </motion.svg>
  )
}
