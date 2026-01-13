import { motion, type Variants, useInView } from 'framer-motion'
import { useRef } from 'react'

interface SparkleProps {
  size?: number
  className?: string
  animate?: boolean
  color?: string
  delay?: number
}

// Sparkle animation
const sparkleVariants: Variants = {
  hidden: { scale: 0, opacity: 0, rotate: -45 },
  visible: {
    scale: 1,
    opacity: 1,
    rotate: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 15,
    },
  },
}

// Twinkle animation
const twinkleVariants: Variants = {
  animate: {
    scale: [1, 0.5, 1],
    opacity: [1, 0.3, 1],
    rotate: [0, 180, 360],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

export function Sparkle({
  size = 24,
  className = '',
  animate = true,
  color = '#c19a5b',
  delay = 0,
}: SparkleProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
      variants={sparkleVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={{ delay }}
    >
      <motion.g
        variants={animate ? twinkleVariants : undefined}
        animate={animate && isInView ? 'animate' : undefined}
      >
        {/* Four-pointed star */}
        <motion.path
          d="M12 2L14 9L21 12L14 15L12 22L10 15L3 12L10 9L12 2Z"
          fill={color}
          stroke={color}
          strokeWidth="0.5"
          strokeLinejoin="round"
        />

        {/* Inner glow */}
        <motion.path
          d="M12 6L13 10L17 12L13 14L12 18L11 14L7 12L11 10L12 6Z"
          fill="white"
          opacity={0.4}
        />
      </motion.g>
    </motion.svg>
  )
}

// Multi-sparkle group for decorative use
interface SparkleGroupProps {
  className?: string
  count?: number
  baseSize?: number
  color?: string
}

export function SparkleGroup({
  className = '',
  count = 3,
  baseSize = 16,
  color = '#c19a5b',
}: SparkleGroupProps) {
  const sparkles = Array.from({ length: count }, (_, i) => ({
    size: baseSize * (0.6 + Math.random() * 0.8),
    delay: i * 0.2,
    x: (i - (count - 1) / 2) * baseSize * 1.5,
    y: Math.random() * 8 - 4,
  }))

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {sparkles.map((sparkle, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            transform: `translate(${sparkle.x}px, ${sparkle.y}px)`,
          }}
        >
          <Sparkle
            size={sparkle.size}
            delay={sparkle.delay}
            color={color}
          />
        </motion.div>
      ))}
    </div>
  )
}
