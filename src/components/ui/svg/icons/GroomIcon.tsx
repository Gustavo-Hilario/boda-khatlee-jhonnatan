import { motion, type Variants, useInView } from 'framer-motion'
import { useRef } from 'react'

interface GroomIconProps {
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

// Boutonniere glow animation
const boutonniereGlowVariants: Variants = {
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

// Bow tie subtle pulse
const bowTiePulseVariants: Variants = {
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

export function GroomIcon({
  size = 64,
  className = '',
  animate = true,
  color = 'currentColor',
}: GroomIconProps) {
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
        cy="14"
        r="8"
        stroke={color}
        strokeWidth="2"
        fill="none"
        variants={drawVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      />

      {/* Hair - short styled */}
      <motion.path
        d="M24 12C24 12 26 6 32 6C38 6 40 12 40 12"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        variants={drawVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        transition={{ delay: 0.2 }}
      />

      {/* Neck */}
      <motion.path
        d="M29 22V26M35 22V26"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        variants={drawVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        transition={{ delay: 0.3 }}
      />

      {/* Shirt collar - V shape */}
      <motion.path
        d="M26 26L32 34L38 26"
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

      {/* Bow tie with pulse */}
      <motion.g
        variants={animate ? bowTiePulseVariants : undefined}
        animate={animate && isInView ? 'animate' : undefined}
        style={{ originX: '32px', originY: '28px' }}
      >
        <motion.path
          d="M26 28L29 26V30L26 28Z"
          fill="#800020"
          stroke="#800020"
          strokeWidth="1"
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.8, type: 'spring' }}
        />
        <motion.path
          d="M38 28L35 26V30L38 28Z"
          fill="#800020"
          stroke="#800020"
          strokeWidth="1"
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.85, type: 'spring' }}
        />
        <motion.circle
          cx="32"
          cy="28"
          r="2"
          fill="#800020"
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.9, type: 'spring' }}
        />
      </motion.g>

      {/* Suit jacket - left side */}
      <motion.path
        d="M26 26L18 58H30"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        variants={drawVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        transition={{ delay: 0.5 }}
      />

      {/* Suit jacket - right side */}
      <motion.path
        d="M38 26L46 58H34"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        variants={drawVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        transition={{ delay: 0.5 }}
      />

      {/* Jacket lapel left */}
      <motion.path
        d="M26 26L28 38"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity={0.7}
        variants={drawVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        transition={{ delay: 0.6 }}
      />

      {/* Jacket lapel right */}
      <motion.path
        d="M38 26L36 38"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity={0.7}
        variants={drawVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        transition={{ delay: 0.6 }}
      />

      {/* Shirt front / placket */}
      <motion.path
        d="M32 34V58"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity={0.6}
        variants={drawVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        transition={{ delay: 0.7 }}
      />

      {/* Shirt buttons */}
      <motion.circle
        cx="32"
        cy="40"
        r="1"
        fill={color}
        opacity={0.6}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.6 } : {}}
        transition={{ delay: 1 }}
      />
      <motion.circle
        cx="32"
        cy="46"
        r="1"
        fill={color}
        opacity={0.6}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.6 } : {}}
        transition={{ delay: 1.1 }}
      />
      <motion.circle
        cx="32"
        cy="52"
        r="1"
        fill={color}
        opacity={0.6}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.6 } : {}}
        transition={{ delay: 1.2 }}
      />

      {/* Boutonniere (flower on lapel) with glow */}
      <motion.g
        variants={animate ? boutonniereGlowVariants : undefined}
        animate={animate && isInView ? 'animate' : undefined}
      >
        <motion.circle
          cx="24"
          cy="34"
          r="2.5"
          fill="#c19a5b"
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 1.3, type: 'spring' }}
        />
        <motion.path
          d="M24 36.5L23 40M24 36.5L25 39"
          stroke="#8d9e78"
          strokeWidth="1"
          strokeLinecap="round"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.8 } : {}}
          transition={{ delay: 1.4 }}
        />
      </motion.g>

      {/* Pocket square */}
      <motion.path
        d="M40 36L42 34L44 36L43 40H41L40 36Z"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity={0.7}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.7 } : {}}
        transition={{ delay: 1.5 }}
      />
    </motion.svg>
  )
}
