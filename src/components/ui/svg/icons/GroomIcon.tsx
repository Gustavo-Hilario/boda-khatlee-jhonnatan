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

// Bow tie glow animation
const bowTieGlowVariants: Variants = {
  animate: {
    filter: [
      'drop-shadow(0 0 2px rgba(128, 0, 32, 0.3))',
      'drop-shadow(0 0 5px rgba(128, 0, 32, 0.5))',
      'drop-shadow(0 0 2px rgba(128, 0, 32, 0.3))',
    ],
    transition: {
      duration: 2.5,
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
      {/* Head circle */}
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

      {/* Short hair - simple curve */}
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

      {/* Shoulders - simple elegant line */}
      <motion.path
        d="M20 30C20 30 25 26 32 26C39 26 44 30 44 30"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        variants={drawVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        transition={{ delay: 0.3 }}
      />

      {/* Suit jacket - left side */}
      <motion.path
        d="M20 30L18 56H30"
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

      {/* Suit jacket - right side */}
      <motion.path
        d="M44 30L46 56H34"
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

      {/* Lapel - simple V */}
      <motion.path
        d="M28 30L32 40L36 30"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity={0.7}
        variants={drawVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        transition={{ delay: 0.5 }}
      />

      {/* Shirt front line */}
      <motion.path
        d="M32 40V56"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity={0.5}
        variants={drawVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        transition={{ delay: 0.6 }}
      />

      {/* Bow tie with glow - cleaner design */}
      <motion.g
        variants={animate ? bowTieGlowVariants : undefined}
        animate={animate && isInView ? 'animate' : undefined}
      >
        {/* Left bow */}
        <motion.ellipse
          cx="27"
          cy="30"
          rx="4"
          ry="2.5"
          fill="#800020"
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.8, type: 'spring', stiffness: 200 }}
        />
        {/* Right bow */}
        <motion.ellipse
          cx="37"
          cy="30"
          rx="4"
          ry="2.5"
          fill="#800020"
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.85, type: 'spring', stiffness: 200 }}
        />
        {/* Center knot */}
        <motion.circle
          cx="32"
          cy="30"
          r="2"
          fill="#800020"
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.9, type: 'spring', stiffness: 200 }}
        />
      </motion.g>

      {/* Small boutonniere flower */}
      <motion.g>
        <motion.circle
          cx="24"
          cy="38"
          r="2"
          fill="#c19a5b"
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 0.9, scale: 1 } : {}}
          transition={{ delay: 1.1, type: 'spring', stiffness: 200 }}
        />
        <motion.path
          d="M24 40L23 43"
          stroke="#8d9e78"
          strokeWidth="1"
          strokeLinecap="round"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.7 } : {}}
          transition={{ delay: 1.2 }}
        />
      </motion.g>
    </motion.svg>
  )
}
