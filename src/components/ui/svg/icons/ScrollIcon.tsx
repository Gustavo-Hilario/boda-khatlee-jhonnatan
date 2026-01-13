import { motion, type Variants, useInView } from 'framer-motion'
import { useRef } from 'react'

interface ScrollIconProps {
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

// Unroll animation
const unrollVariants: Variants = {
  hidden: { scaleY: 0, originY: 0 },
  visible: {
    scaleY: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
      delay: 0.3,
    },
  },
}

// Shimmer on seal
const sealShimmerVariants: Variants = {
  animate: {
    filter: [
      'drop-shadow(0 0 2px rgba(193, 154, 91, 0.4))',
      'drop-shadow(0 0 6px rgba(193, 154, 91, 0.8))',
      'drop-shadow(0 0 2px rgba(193, 154, 91, 0.4))',
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

export function ScrollIcon({
  size = 48,
  className = '',
  animate = true,
  color = 'currentColor',
}: ScrollIconProps) {
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
      {/* Top curl */}
      <motion.path
        d="M8 10C8 6.686 10.686 4 14 4H34C37.314 4 40 6.686 40 10V12"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        variants={drawVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      />

      {/* Main scroll body */}
      <motion.g variants={unrollVariants} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
        <motion.path
          d="M8 10V38C8 41.314 10.686 44 14 44H34C37.314 44 40 41.314 40 38V10"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          variants={drawVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        />
      </motion.g>

      {/* Top roll decoration */}
      <motion.ellipse
        cx="24"
        cy="8"
        rx="16"
        ry="4"
        stroke={color}
        strokeWidth="2"
        fill="none"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.4 }}
      />

      {/* Text lines */}
      <motion.g>
        <motion.path
          d="M14 18H34"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity={0.5}
          initial={{ opacity: 0, x: -10 }}
          animate={isInView ? { opacity: 0.5, x: 0 } : {}}
          transition={{ delay: 0.6 }}
        />
        <motion.path
          d="M14 24H30"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity={0.5}
          initial={{ opacity: 0, x: -10 }}
          animate={isInView ? { opacity: 0.5, x: 0 } : {}}
          transition={{ delay: 0.7 }}
        />
        <motion.path
          d="M14 30H26"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity={0.5}
          initial={{ opacity: 0, x: -10 }}
          animate={isInView ? { opacity: 0.5, x: 0 } : {}}
          transition={{ delay: 0.8 }}
        />
      </motion.g>

      {/* Wax seal */}
      <motion.g
        variants={animate ? sealShimmerVariants : undefined}
        animate={animate && isInView ? 'animate' : undefined}
      >
        <motion.circle
          cx="34"
          cy="36"
          r="5"
          fill="#c19a5b"
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 1, type: 'spring', stiffness: 300 }}
        />
        {/* Heart stamp in seal */}
        <motion.path
          d="M34 38L32.5 36.5C31.5 35.5 31.5 34.5 32.5 34C33.2 33.5 34 33.7 34 34.2C34 33.7 34.8 33.5 35.5 34C36.5 34.5 36.5 35.5 35.5 36.5L34 38Z"
          fill="white"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2 }}
        />
      </motion.g>

      {/* Ribbon */}
      <motion.path
        d="M30 40L28 46M38 40L40 46"
        stroke="#c19a5b"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.8 } : {}}
        transition={{ delay: 1.1 }}
      />
    </motion.svg>
  )
}
