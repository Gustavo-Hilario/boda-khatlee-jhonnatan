import { motion, type Variants, useInView } from 'framer-motion'
import { useRef } from 'react'

interface CocktailIconProps {
  size?: number
  className?: string
  animate?: boolean
  color?: string
}

// Draw animation for glass
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

// Gentle sway animation for the glass
const swayVariants: Variants = {
  animate: {
    rotate: [-3, 3, -3],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

// Olive bob animation
const oliveVariants: Variants = {
  animate: {
    y: [0, -2, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

// Liquid shimmer
const shimmerVariants: Variants = {
  animate: {
    opacity: [0.4, 0.7, 0.4],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

export function CocktailIcon({
  size = 64,
  className = '',
  animate = true,
  color = 'currentColor',
}: CocktailIconProps) {
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
      <motion.g
        style={{ originX: '32px', originY: '58px' }}
        variants={animate ? swayVariants : undefined}
        animate={animate && isInView ? 'animate' : undefined}
      >
        {/* Martini glass bowl */}
        <motion.path
          d="M12 12L32 40L52 12"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          variants={drawVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        />

        {/* Glass rim */}
        <motion.path
          d="M8 12H56"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          variants={drawVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ delay: 0.2 }}
        />

        {/* Stem */}
        <motion.path
          d="M32 40V54"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          variants={drawVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ delay: 0.3 }}
        />

        {/* Base */}
        <motion.path
          d="M22 58H42"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          variants={drawVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ delay: 0.4 }}
        />

        {/* Liquid fill */}
        <motion.path
          d="M16 18L32 36L48 18"
          fill="#c19a5b"
          variants={shimmerVariants}
          initial={{ opacity: 0 }}
          animate={isInView ? (animate ? 'animate' : { opacity: 0.5 }) : {}}
          transition={{ delay: 0.6 }}
        />

        {/* Olive on stick */}
        <motion.g
          variants={animate ? oliveVariants : undefined}
          animate={animate && isInView ? 'animate' : undefined}
        >
          {/* Stick */}
          <motion.path
            d="M24 16L40 28"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 0.8 } : {}}
            transition={{ delay: 0.8 }}
          />
          {/* Olive */}
          <motion.ellipse
            cx="28"
            cy="20"
            rx="4"
            ry="3"
            fill="#8d9e78"
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.9, type: 'spring', stiffness: 200 }}
          />
          {/* Olive pimento */}
          <motion.circle
            cx="28"
            cy="20"
            r="1.5"
            fill="#800020"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.1 }}
          />
        </motion.g>

        {/* Sparkle effects */}
        {animate && (
          <>
            <motion.circle
              cx="20"
              cy="14"
              r="1.5"
              fill="#c19a5b"
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
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1,
                delay: 1.2,
              }}
            />
            <motion.circle
              cx="44"
              cy="14"
              r="1"
              fill="#c19a5b"
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
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1,
                delay: 1.5,
              }}
            />
          </>
        )}
      </motion.g>
    </motion.svg>
  )
}
