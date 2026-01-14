import { motion, type Variants, useInView } from 'framer-motion'
import { useRef } from 'react'

interface DinnerIconProps {
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

// Plate shine rotation
const plateShineVariants: Variants = {
  animate: {
    rotate: [0, 360],
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: 'linear',
    },
  },
}

// Steam float animation
const steamVariants: Variants = {
  animate: (delay: number) => ({
    y: [0, -12],
    opacity: [0, 0.6, 0],
    scale: [0.8, 1.2],
    transition: {
      duration: 2.5,
      repeat: Infinity,
      delay,
      ease: 'easeOut',
    },
  }),
}

// Utensil gleam
const gleamVariants: Variants = {
  animate: {
    opacity: [0.3, 0.8, 0.3],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

export function DinnerIcon({
  size = 64,
  className = '',
  animate = true,
  color = 'currentColor',
}: DinnerIconProps) {
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
      {/* Plate */}
      <motion.ellipse
        cx="32"
        cy="38"
        rx="22"
        ry="8"
        stroke={color}
        strokeWidth="2"
        fill="none"
        variants={drawVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      />

      {/* Inner plate ring */}
      <motion.ellipse
        cx="32"
        cy="38"
        rx="16"
        ry="5"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.6 } : {}}
        transition={{ delay: 0.4 }}
      />

      {/* Plate shine effect */}
      <motion.g
        style={{ originX: '32px', originY: '38px' }}
        variants={animate ? plateShineVariants : undefined}
        animate={animate && isInView ? 'animate' : undefined}
      >
        <motion.ellipse
          cx="32"
          cy="38"
          rx="18"
          ry="6"
          fill="url(#plateGradient)"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.15 } : {}}
          transition={{ delay: 0.5 }}
        />
      </motion.g>

      {/* Fork (left) */}
      <motion.g
        variants={animate ? gleamVariants : undefined}
        animate={animate && isInView ? 'animate' : undefined}
      >
        <motion.path
          d="M8 20V48"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          variants={drawVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ delay: 0.2 }}
        />
        {/* Fork tines */}
        <motion.path
          d="M4 20V30M8 20V30M12 20V30"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          variants={drawVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ delay: 0.3 }}
        />
        {/* Fork connector */}
        <motion.path
          d="M4 30Q8 34 12 30"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        />
      </motion.g>

      {/* Knife (right) */}
      <motion.g
        variants={animate ? gleamVariants : undefined}
        animate={animate && isInView ? 'animate' : undefined}
        transition={{ delay: 0.5 }}
      >
        <motion.path
          d="M56 20V48"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          variants={drawVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ delay: 0.3 }}
        />
        {/* Knife blade */}
        <motion.path
          d="M56 20C60 20 60 32 56 34"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          variants={drawVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ delay: 0.4 }}
        />
      </motion.g>

      {/* Food on plate - decorative dome/cloche hint */}
      <motion.path
        d="M22 36Q32 24 42 36"
        stroke="#c19a5b"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.7 } : {}}
        transition={{ delay: 0.7 }}
      />

      {/* Steam wisps */}
      {animate && (
        <>
          <motion.path
            d="M28 24Q26 20 28 16"
            stroke="#c19a5b"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
            variants={steamVariants}
            animate={isInView ? 'animate' : undefined}
            custom={0}
          />
          <motion.path
            d="M32 22Q30 18 32 14"
            stroke="#c19a5b"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
            variants={steamVariants}
            animate={isInView ? 'animate' : undefined}
            custom={0.4}
          />
          <motion.path
            d="M36 24Q34 20 36 16"
            stroke="#c19a5b"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
            variants={steamVariants}
            animate={isInView ? 'animate' : undefined}
            custom={0.8}
          />
        </>
      )}

      {/* Gradient definitions */}
      <defs>
        <linearGradient id="plateGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="white" stopOpacity="0" />
          <stop offset="50%" stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
    </motion.svg>
  )
}
