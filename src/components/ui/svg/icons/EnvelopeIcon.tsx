import { motion, type Variants, useInView } from 'framer-motion'
import { useRef } from 'react'

interface EnvelopeIconProps {
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

// Flap open animation
const flapVariants: Variants = {
  closed: { rotateX: 0 },
  open: {
    rotateX: -180,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
      delay: 0.5,
    },
  },
}

// Heart emerge animation
const heartEmergeVariants: Variants = {
  hidden: { y: 20, opacity: 0, scale: 0.5 },
  visible: {
    y: -10,
    opacity: 1,
    scale: 1,
    transition: {
      delay: 1,
      type: 'spring',
      stiffness: 200,
      damping: 10,
    },
  },
}

// Heart float animation
const heartFloatVariants: Variants = {
  animate: {
    y: [-10, -15, -10],
    scale: [1, 1.1, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

// Sparkle animation
const sparkleVariants: Variants = {
  animate: (delay: number) => ({
    scale: [0, 1, 0],
    opacity: [0, 1, 0],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      repeatDelay: 1.5,
      delay: delay,
    },
  }),
}

export function EnvelopeIcon({
  size = 48,
  className = '',
  animate = true,
  color = 'currentColor',
}: EnvelopeIconProps) {
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
      {/* Envelope body */}
      <motion.path
        d="M6 14H42V38C42 39.1 41.1 40 40 40H8C6.9 40 6 39.1 6 38V14Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        variants={drawVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      />

      {/* Inner fold lines */}
      <motion.path
        d="M6 14L24 28L42 14"
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

      {/* Back flap (opens) */}
      <motion.g
        style={{
          originX: '24px',
          originY: '14px',
          transformStyle: 'preserve-3d',
        }}
        variants={animate ? flapVariants : undefined}
        initial="closed"
        animate={isInView ? 'open' : 'closed'}
      >
        <motion.path
          d="M6 14L24 4L42 14"
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
        {/* Flap fill for depth */}
        <motion.path
          d="M6 14L24 4L42 14L24 24Z"
          fill={color}
          opacity={0.1}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.1 } : {}}
          transition={{ delay: 0.4 }}
        />
      </motion.g>

      {/* Emerging heart */}
      <motion.g
        variants={animate ? heartFloatVariants : undefined}
        animate={animate && isInView ? 'animate' : undefined}
      >
        <motion.g
          variants={heartEmergeVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.path
            d="M24 18L20 14C17 11 17 7 20 5C22 3.5 24 4.5 24 6C24 4.5 26 3.5 28 5C31 7 31 11 28 14L24 18Z"
            fill="#c19a5b"
            stroke="#c19a5b"
            strokeWidth="1"
          />
          {/* Heart shine */}
          <motion.ellipse
            cx="21"
            cy="9"
            rx="2"
            ry="1.5"
            fill="white"
            opacity={0.4}
          />
        </motion.g>
      </motion.g>

      {/* Wax seal */}
      <motion.circle
        cx="24"
        cy="34"
        r="4"
        fill="#c19a5b"
        initial={{ opacity: 0, scale: 0 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.6, type: 'spring' }}
      />
      {/* Seal detail */}
      <motion.path
        d="M24 36L22.5 34.5C21.5 33.5 21.5 32.5 22.5 32C23 31.7 24 32 24 32.5C24 32 25 31.7 25.5 32C26.5 32.5 26.5 33.5 25.5 34.5L24 36Z"
        fill="white"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.8 } : {}}
        transition={{ delay: 0.8 }}
      />

      {/* Sparkles around heart */}
      {animate && (
        <>
          <motion.circle
            cx="16"
            cy="6"
            r="1.5"
            fill="#c19a5b"
            variants={sparkleVariants}
            animate={isInView ? 'animate' : undefined}
            custom={1.2}
          />
          <motion.circle
            cx="32"
            cy="4"
            r="1.5"
            fill="#c19a5b"
            variants={sparkleVariants}
            animate={isInView ? 'animate' : undefined}
            custom={1.4}
          />
          <motion.circle
            cx="24"
            cy="0"
            r="1"
            fill="#c19a5b"
            variants={sparkleVariants}
            animate={isInView ? 'animate' : undefined}
            custom={1.6}
          />
        </>
      )}

      {/* Envelope corner decoration */}
      <motion.path
        d="M38 36L40 40M40 36L38 40"
        stroke="#c19a5b"
        strokeWidth="1"
        strokeLinecap="round"
        opacity={0.5}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.5 } : {}}
        transition={{ delay: 0.7 }}
      />
    </motion.svg>
  )
}
