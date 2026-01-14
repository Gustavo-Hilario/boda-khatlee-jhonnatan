import { motion, type Variants, useInView } from 'framer-motion'
import { useRef } from 'react'

interface DancingIconProps {
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

// Dance sway for the couple
const dancerSwayVariants: Variants = {
  animate: {
    rotate: [-5, 5, -5],
    x: [-2, 2, -2],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

// Music note float
const noteVariants: Variants = {
  animate: (custom: { x: number; delay: number }) => ({
    y: [0, -15, -25],
    x: [0, custom.x],
    opacity: [0, 1, 0],
    scale: [0.5, 1, 0.8],
    transition: {
      duration: 2.5,
      repeat: Infinity,
      delay: custom.delay,
      ease: 'easeOut',
    },
  }),
}

// Sparkle animation
const sparkleVariants: Variants = {
  animate: (delay: number) => ({
    scale: [0, 1, 0],
    opacity: [0, 1, 0],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      repeatDelay: 2,
      delay,
    },
  }),
}

export function DancingIcon({
  size = 64,
  className = '',
  animate = true,
  color = 'currentColor',
}: DancingIconProps) {
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
      {/* Dancing couple group */}
      <motion.g
        style={{ originX: '32px', originY: '48px' }}
        variants={animate ? dancerSwayVariants : undefined}
        animate={animate && isInView ? 'animate' : undefined}
      >
        {/* Left dancer (bride) - dress silhouette */}
        <motion.g>
          {/* Head */}
          <motion.circle
            cx="24"
            cy="16"
            r="5"
            stroke={color}
            strokeWidth="2"
            fill="none"
            variants={drawVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          />

          {/* Body/Dress - elegant A-line shape */}
          <motion.path
            d="M24 21V28L16 52H32L24 28"
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

          {/* Arm reaching to partner */}
          <motion.path
            d="M24 26L32 24"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            variants={drawVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={{ delay: 0.3 }}
          />

          {/* Dress sparkle */}
          <motion.circle
            cx="24"
            cy="36"
            r="1.5"
            fill="#c19a5b"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 0.6 } : {}}
            transition={{ delay: 0.8 }}
          />
        </motion.g>

        {/* Right dancer (groom) - suit silhouette */}
        <motion.g>
          {/* Head */}
          <motion.circle
            cx="40"
            cy="14"
            r="5"
            stroke={color}
            strokeWidth="2"
            fill="none"
            variants={drawVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={{ delay: 0.1 }}
          />

          {/* Body/Suit */}
          <motion.path
            d="M40 19V32"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            variants={drawVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={{ delay: 0.25 }}
          />

          {/* Shoulders */}
          <motion.path
            d="M34 24H46"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            variants={drawVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={{ delay: 0.3 }}
          />

          {/* Arm reaching to partner */}
          <motion.path
            d="M34 24L32 24"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            variants={drawVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={{ delay: 0.35 }}
          />

          {/* Other arm */}
          <motion.path
            d="M46 24L50 30"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            variants={drawVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={{ delay: 0.35 }}
          />

          {/* Legs */}
          <motion.path
            d="M40 32L36 52M40 32L44 52"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            variants={drawVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={{ delay: 0.4 }}
          />
        </motion.g>

        {/* Joined hands - heart shape hint */}
        <motion.circle
          cx="32"
          cy="24"
          r="2"
          fill="#c19a5b"
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.6, type: 'spring', stiffness: 200 }}
        />
      </motion.g>

      {/* Music notes floating */}
      {animate && (
        <>
          <motion.g
            variants={noteVariants}
            animate={isInView ? 'animate' : undefined}
            custom={{ x: -8, delay: 0 }}
          >
            <motion.path
              d="M8 20C8 18 10 16 12 16V24C12 26 10 28 8 28C6 28 6 26 8 24V20Z"
              stroke="#c19a5b"
              strokeWidth="1.5"
              fill="none"
            />
          </motion.g>

          <motion.g
            variants={noteVariants}
            animate={isInView ? 'animate' : undefined}
            custom={{ x: 8, delay: 0.8 }}
          >
            <motion.path
              d="M52 22C52 20 54 18 56 18V26C56 28 54 30 52 30C50 30 50 28 52 26V22Z"
              stroke="#c19a5b"
              strokeWidth="1.5"
              fill="none"
            />
          </motion.g>

          <motion.g
            variants={noteVariants}
            animate={isInView ? 'animate' : undefined}
            custom={{ x: 5, delay: 1.5 }}
          >
            <motion.path
              d="M48 12C48 10 50 8 52 8V14"
              stroke="#c19a5b"
              strokeWidth="1.5"
              fill="none"
            />
            <motion.circle cx="48" cy="14" r="2" fill="#c19a5b" />
          </motion.g>
        </>
      )}

      {/* Sparkles around dancers */}
      {animate && (
        <>
          <motion.circle
            cx="12"
            cy="32"
            r="1.5"
            fill="#c19a5b"
            variants={sparkleVariants}
            animate={isInView ? 'animate' : undefined}
            custom={0.5}
          />
          <motion.circle
            cx="52"
            cy="36"
            r="1.5"
            fill="#c19a5b"
            variants={sparkleVariants}
            animate={isInView ? 'animate' : undefined}
            custom={1}
          />
          <motion.circle
            cx="32"
            cy="8"
            r="1"
            fill="#c19a5b"
            variants={sparkleVariants}
            animate={isInView ? 'animate' : undefined}
            custom={1.5}
          />
        </>
      )}

      {/* Floor/ground line */}
      <motion.path
        d="M10 54H54"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="4 4"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.3 } : {}}
        transition={{ delay: 0.7 }}
      />
    </motion.svg>
  )
}
