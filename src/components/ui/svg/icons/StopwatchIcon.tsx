import { motion, type Variants, useInView } from 'framer-motion'
import { useRef } from 'react'

interface StopwatchIconProps {
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

// Second hand tick animation (fast)
const secondHandVariants: Variants = {
  animate: {
    rotate: [0, 360],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: 'linear',
    },
  },
}

// Button press animation
const buttonPressVariants: Variants = {
  animate: {
    y: [0, 1, 0],
    transition: {
      duration: 0.3,
      repeat: Infinity,
      repeatDelay: 2,
    },
  },
}

// Pulse ring for urgency
const pulseRingVariants: Variants = {
  animate: {
    scale: [1, 1.1, 1],
    opacity: [0.3, 0.1, 0.3],
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

export function StopwatchIcon({
  size = 32,
  className = '',
  animate = true,
  color = 'currentColor',
}: StopwatchIconProps) {
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
    >
      {/* Pulse ring */}
      {animate && (
        <motion.circle
          cx="16"
          cy="18"
          r="12"
          stroke="#c19a5b"
          strokeWidth="1"
          fill="none"
          variants={pulseRingVariants}
          animate={isInView ? 'animate' : undefined}
        />
      )}

      {/* Main watch body */}
      <motion.circle
        cx="16"
        cy="18"
        r="11"
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
        cy="18"
        r="9"
        stroke={color}
        strokeWidth="0.5"
        fill="none"
        opacity={0.3}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.3 } : {}}
        transition={{ delay: 0.4 }}
      />

      {/* Crown/stem */}
      <motion.path
        d="M16 7V4"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        variants={drawVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      />

      {/* Top button (start/stop) */}
      <motion.g
        variants={animate ? buttonPressVariants : undefined}
        animate={animate && isInView ? 'animate' : undefined}
      >
        <motion.rect
          x="14"
          y="2"
          width="4"
          height="3"
          rx="1"
          fill={color}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
        />
      </motion.g>

      {/* Side button (reset) */}
      <motion.path
        d="M26 14L28 12"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.4 }}
      />
      <motion.circle
        cx="27"
        cy="13"
        r="1.5"
        fill={color}
        initial={{ opacity: 0, scale: 0 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.5, type: 'spring' }}
      />

      {/* Tick marks (4 main ones) */}
      {[0, 90, 180, 270].map((angle, i) => {
        const rad = (angle - 90) * (Math.PI / 180)
        const innerR = 7
        const outerR = 9
        return (
          <motion.line
            key={angle}
            x1={16 + innerR * Math.cos(rad)}
            y1={18 + innerR * Math.sin(rad)}
            x2={16 + outerR * Math.cos(rad)}
            y2={18 + outerR * Math.sin(rad)}
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 0.6 } : {}}
            transition={{ delay: 0.5 + i * 0.1 }}
          />
        )
      })}

      {/* Second hand */}
      <motion.g
        style={{ originX: '16px', originY: '18px' }}
        variants={animate ? secondHandVariants : undefined}
        animate={animate && isInView ? 'animate' : undefined}
      >
        <motion.line
          x1="16"
          y1="18"
          x2="16"
          y2="10"
          stroke="#c19a5b"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
        />
      </motion.g>

      {/* Center dot */}
      <motion.circle
        cx="16"
        cy="18"
        r="2"
        fill="#c19a5b"
        initial={{ opacity: 0, scale: 0 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.7, type: 'spring' }}
      />

      {/* Small second dial (subdial) */}
      <motion.circle
        cx="16"
        cy="22"
        r="2"
        stroke={color}
        strokeWidth="0.5"
        fill="none"
        opacity={0.5}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.5 } : {}}
        transition={{ delay: 0.8 }}
      />
    </motion.svg>
  )
}
