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

// Gentle veil flow animation
const veilFlowVariants: Variants = {
  animate: {
    d: [
      'M24 12C24 12 14 18 10 30C8 38 10 52 10 52',
      'M24 12C24 12 12 19 9 31C7 39 11 52 11 52',
      'M24 12C24 12 14 18 10 30C8 38 10 52 10 52',
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
      'M40 12C40 12 50 18 54 30C56 38 54 52 54 52',
      'M40 12C40 12 52 19 55 31C57 39 53 52 53 52',
      'M40 12C40 12 50 18 54 30C56 38 54 52 54 52',
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
      'drop-shadow(0 0 2px rgba(193, 154, 91, 0.3))',
      'drop-shadow(0 0 6px rgba(193, 154, 91, 0.6))',
      'drop-shadow(0 0 2px rgba(193, 154, 91, 0.3))',
    ],
    transition: {
      duration: 2.5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

// Tiara sparkle animation
const tiaraSparkleVariants: Variants = {
  animate: {
    opacity: [0.6, 1, 0.6],
    scale: [1, 1.1, 1],
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
      {/* Flowing veil - left side */}
      <motion.path
        d="M24 12C24 12 14 18 10 30C8 38 10 52 10 52"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        opacity={0.35}
        variants={animate ? veilFlowVariants : drawVariants}
        initial="hidden"
        animate={isInView ? (animate ? 'animate' : 'visible') : 'hidden'}
      />

      {/* Flowing veil - right side */}
      <motion.path
        d="M40 12C40 12 50 18 54 30C56 38 54 52 54 52"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        opacity={0.35}
        variants={animate ? veilFlowVariants2 : drawVariants}
        initial="hidden"
        animate={isInView ? (animate ? 'animate' : 'visible') : 'hidden'}
      />

      {/* Inner veil layer - left */}
      <motion.path
        d="M26 14C26 14 18 20 15 30C13 38 14 48 14 48"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
        fill="none"
        opacity={0.2}
        variants={drawVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        transition={{ delay: 0.2 }}
      />

      {/* Inner veil layer - right */}
      <motion.path
        d="M38 14C38 14 46 20 49 30C51 38 50 48 50 48"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
        fill="none"
        opacity={0.2}
        variants={drawVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        transition={{ delay: 0.2 }}
      />

      {/* Head/face - elegant oval */}
      <motion.ellipse
        cx="32"
        cy="14"
        rx="6"
        ry="7"
        stroke={color}
        strokeWidth="2"
        fill="none"
        variants={drawVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      />

      {/* Elegant updo hair */}
      <motion.path
        d="M26 11C26 11 28 5 32 5C36 5 38 11 38 11"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        variants={drawVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        transition={{ delay: 0.15 }}
      />

      {/* Hair bun */}
      <motion.ellipse
        cx="32"
        cy="6"
        rx="4"
        ry="2.5"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
        variants={drawVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        transition={{ delay: 0.2 }}
      />

      {/* Tiara/headpiece with sparkle */}
      <motion.g
        variants={animate ? tiaraSparkleVariants : undefined}
        animate={animate && isInView ? 'animate' : undefined}
      >
        <motion.path
          d="M28 8L30 5L32 7L34 5L36 8"
          stroke="#c19a5b"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        />
        {/* Tiara gem */}
        <motion.circle
          cx="32"
          cy="6"
          r="1"
          fill="#c19a5b"
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.9, type: 'spring' }}
        />
      </motion.g>

      {/* Neck */}
      <motion.path
        d="M30 21V24M34 21V24"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        variants={drawVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        transition={{ delay: 0.25 }}
      />

      {/* Shoulders/dress bodice - sweetheart neckline */}
      <motion.path
        d="M22 28C22 28 26 24 32 24C38 24 42 28 42 28"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        variants={drawVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        transition={{ delay: 0.3 }}
      />

      {/* Dress bodice detail - sweetheart curve */}
      <motion.path
        d="M26 26C26 26 29 28 32 28C35 28 38 26 38 26"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        opacity={0.6}
        variants={drawVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        transition={{ delay: 0.35 }}
      />

      {/* Wedding dress - elegant A-line/ballgown silhouette */}
      <motion.path
        d="M22 28C22 28 20 35 18 44C16 53 14 60 14 60H50C50 60 48 53 46 44C44 35 42 28 42 28"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        variants={drawVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        transition={{ delay: 0.4 }}
      />

      {/* Waist sash/belt */}
      <motion.path
        d="M24 34H40"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
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
        {/* Main flower - center */}
        <motion.circle
          cx="32"
          cy="40"
          r="3"
          fill="#c19a5b"
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 0.9, scale: 1 } : {}}
          transition={{ delay: 1.05, type: 'spring', stiffness: 200 }}
        />

        {/* Flower - left */}
        <motion.circle
          cx="28"
          cy="41"
          r="2.5"
          fill="#c19a5b"
          opacity={0.8}
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 0.8, scale: 1 } : {}}
          transition={{ delay: 1.1, type: 'spring', stiffness: 200 }}
        />

        {/* Flower - right */}
        <motion.circle
          cx="36"
          cy="41"
          r="2.5"
          fill="#c19a5b"
          opacity={0.8}
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 0.8, scale: 1 } : {}}
          transition={{ delay: 1.15, type: 'spring', stiffness: 200 }}
        />
      </motion.g>

      {/* Veil edge detail - bottom left */}
      <motion.path
        d="M10 52C12 52 13 51 14 52"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
        fill="none"
        opacity={0.25}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.25 } : {}}
        transition={{ delay: 0.7 }}
      />

      {/* Veil edge detail - bottom right */}
      <motion.path
        d="M54 52C52 52 51 51 50 52"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
        fill="none"
        opacity={0.25}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.25 } : {}}
        transition={{ delay: 0.7 }}
      />
    </motion.svg>
  )
}
