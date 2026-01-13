import { motion, type Variants, useInView } from 'framer-motion'
import { useRef } from 'react'

interface ClockIconProps {
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

// Minute hand tick animation
const minuteHandVariants: Variants = {
  animate: {
    rotate: [0, 6, 0],
    transition: {
      duration: 1,
      repeat: Infinity,
      repeatDelay: 1,
      ease: 'easeOut',
    },
  },
}

// Hour hand slow move
const hourHandVariants: Variants = {
  animate: {
    rotate: [0, 0.5, 0],
    transition: {
      duration: 12,
      repeat: Infinity,
      ease: 'linear',
    },
  },
}

// Tick marks reveal
const tickVariants: Variants = {
  hidden: { opacity: 0, scale: 0 },
  visible: (i: number) => ({
    opacity: 0.5,
    scale: 1,
    transition: {
      delay: 0.5 + i * 0.05,
      duration: 0.2,
    },
  }),
}

export function ClockIcon({
  size = 32,
  className = '',
  animate = true,
  color = 'currentColor',
}: ClockIconProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  // Generate 12 tick positions
  const ticks = Array.from({ length: 12 }, (_, i) => {
    const angle = (i * 30 - 90) * (Math.PI / 180)
    const innerR = 11
    const outerR = 13
    return {
      x1: 16 + innerR * Math.cos(angle),
      y1: 16 + innerR * Math.sin(angle),
      x2: 16 + outerR * Math.cos(angle),
      y2: 16 + outerR * Math.sin(angle),
    }
  })

  return (
    <motion.svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* Clock face */}
      <motion.circle
        cx="16"
        cy="16"
        r="14"
        stroke={color}
        strokeWidth="2"
        fill="none"
        variants={drawVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      />

      {/* Inner ring */}
      <motion.circle
        cx="16"
        cy="16"
        r="12"
        stroke={color}
        strokeWidth="0.5"
        fill="none"
        opacity={0.3}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.3 } : {}}
        transition={{ delay: 0.4 }}
      />

      {/* Tick marks */}
      {ticks.map((tick, i) => (
        <motion.line
          key={i}
          x1={tick.x1}
          y1={tick.y1}
          x2={tick.x2}
          y2={tick.y2}
          stroke={color}
          strokeWidth={i % 3 === 0 ? '2' : '1'}
          strokeLinecap="round"
          variants={tickVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          custom={i}
        />
      ))}

      {/* Hour hand */}
      <motion.g
        style={{ originX: '16px', originY: '16px' }}
        variants={animate ? hourHandVariants : undefined}
        animate={animate && isInView ? 'animate' : undefined}
      >
        <motion.line
          x1="16"
          y1="16"
          x2="16"
          y2="9"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
        />
      </motion.g>

      {/* Minute hand */}
      <motion.g
        style={{ originX: '16px', originY: '16px' }}
        variants={animate ? minuteHandVariants : undefined}
        animate={animate && isInView ? 'animate' : undefined}
      >
        <motion.line
          x1="16"
          y1="16"
          x2="22"
          y2="10"
          stroke="#c19a5b"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
        />
      </motion.g>

      {/* Center dot */}
      <motion.circle
        cx="16"
        cy="16"
        r="2"
        fill="#c19a5b"
        initial={{ opacity: 0, scale: 0 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.8, type: 'spring' }}
      />

      {/* Decorative gold ring */}
      <motion.circle
        cx="16"
        cy="16"
        r="2.5"
        stroke="#c19a5b"
        strokeWidth="0.5"
        fill="none"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.6 } : {}}
        transition={{ delay: 0.9 }}
      />
    </motion.svg>
  )
}
