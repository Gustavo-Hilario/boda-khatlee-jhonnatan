import { motion, type Variants, useInView } from 'framer-motion'
import { useRef } from 'react'

interface PartyIconProps {
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

// Confetti burst animation
const confettiVariants: Variants = {
  animate: (custom: { x: number; y: number; delay: number }) => ({
    x: [0, custom.x],
    y: [0, custom.y, custom.y + 10],
    opacity: [0, 1, 0],
    scale: [0, 1, 0.5],
    rotate: [0, 360],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      repeatDelay: 2,
      delay: custom.delay,
      ease: 'easeOut',
    },
  }),
}

export function PartyIcon({
  size = 48,
  className = '',
  animate = true,
  color = 'currentColor',
}: PartyIconProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  // Confetti positions
  const confetti = [
    { x: -15, y: -20, delay: 0, color: '#c19a5b' },
    { x: 15, y: -25, delay: 0.1, color: '#c19a5b' },
    { x: -10, y: -30, delay: 0.2, color: color },
    { x: 20, y: -20, delay: 0.3, color: color },
    { x: -20, y: -15, delay: 0.15, color: '#c19a5b' },
    { x: 5, y: -28, delay: 0.25, color: color },
  ]

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
      {/* Party popper cone */}
      <motion.path
        d="M12 44L20 24L28 44"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        variants={drawVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      />

      {/* Cone decoration stripes */}
      <motion.path
        d="M14 40L20 28L26 40"
        stroke="#c19a5b"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.6 } : {}}
        transition={{ delay: 0.5 }}
      />

      {/* Burst from top */}
      <motion.g>
        {/* Center burst */}
        <motion.circle
          cx="20"
          cy="24"
          r="3"
          fill="#c19a5b"
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.6, type: 'spring' }}
        />

        {/* Streamers */}
        <motion.path
          d="M20 20C24 16 16 10 20 4"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          variants={drawVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ delay: 0.3 }}
        />
        <motion.path
          d="M20 20C16 14 24 8 20 2"
          stroke="#c19a5b"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          variants={drawVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ delay: 0.4 }}
        />
        <motion.path
          d="M20 22C26 16 30 18 36 12"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          variants={drawVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ delay: 0.35 }}
        />
        <motion.path
          d="M20 22C14 16 10 18 4 12"
          stroke="#c19a5b"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          variants={drawVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ delay: 0.45 }}
        />
      </motion.g>

      {/* Confetti */}
      {animate &&
        confetti.map((c, i) => (
          <motion.rect
            key={i}
            x="20"
            y="24"
            width="3"
            height="3"
            rx="0.5"
            fill={c.color}
            variants={confettiVariants}
            animate={isInView ? 'animate' : undefined}
            custom={c}
          />
        ))}

      {/* Star bursts */}
      {animate && (
        <>
          <motion.path
            d="M36 8L38 6M40 10L42 8M38 12L40 10"
            stroke="#c19a5b"
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={{ opacity: 0 }}
            animate={
              isInView
                ? {
                    opacity: [0, 1, 0],
                    scale: [0.5, 1, 0.5],
                  }
                : {}
            }
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatDelay: 1,
              delay: 0.5,
            }}
          />
          <motion.path
            d="M6 14L8 12M4 18L6 16"
            stroke="#c19a5b"
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={{ opacity: 0 }}
            animate={
              isInView
                ? {
                    opacity: [0, 1, 0],
                    scale: [0.5, 1, 0.5],
                  }
                : {}
            }
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatDelay: 1,
              delay: 0.8,
            }}
          />
        </>
      )}
    </motion.svg>
  )
}
