import { motion, type Variants, useInView } from 'framer-motion'
import { useRef } from 'react'

interface CameraIconProps {
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

// Flash animation
const flashVariants: Variants = {
  animate: {
    opacity: [0, 1, 0],
    scale: [0.8, 1.5, 0.8],
    transition: {
      duration: 0.5,
      repeat: Infinity,
      repeatDelay: 3,
    },
  },
}

// Shutter click animation
const shutterVariants: Variants = {
  animate: {
    scale: [1, 0.95, 1],
    transition: {
      duration: 0.15,
      repeat: Infinity,
      repeatDelay: 3.5,
    },
  },
}

// Lens shine animation
const lensShineVariants: Variants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: 'linear',
    },
  },
}

export function CameraIcon({
  size = 48,
  className = '',
  animate = true,
  color = 'currentColor',
}: CameraIconProps) {
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
      variants={animate ? shutterVariants : undefined}
      animate={animate && isInView ? 'animate' : undefined}
    >
      {/* Camera body */}
      <motion.path
        d="M6 16C6 14.9 6.9 14 8 14H14L18 8H30L34 14H40C41.1 14 42 14.9 42 16V38C42 39.1 41.1 40 40 40H8C6.9 40 6 39.1 6 38V16Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        variants={drawVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      />

      {/* Lens outer ring */}
      <motion.circle
        cx="24"
        cy="26"
        r="9"
        stroke={color}
        strokeWidth="2"
        fill="none"
        variants={drawVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        transition={{ delay: 0.3 }}
      />

      {/* Lens inner ring */}
      <motion.circle
        cx="24"
        cy="26"
        r="5"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.5 }}
      />

      {/* Lens center */}
      <motion.circle
        cx="24"
        cy="26"
        r="2"
        fill="#c19a5b"
        initial={{ opacity: 0, scale: 0 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.6, type: 'spring' }}
      />

      {/* Lens shine highlight */}
      <motion.g
        variants={animate ? lensShineVariants : undefined}
        animate={animate && isInView ? 'animate' : undefined}
        style={{ originX: '24px', originY: '26px' }}
      >
        <motion.circle
          cx="20"
          cy="23"
          r="1.5"
          fill="white"
          opacity={0.6}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.6 } : {}}
          transition={{ delay: 0.7 }}
        />
      </motion.g>

      {/* Flash unit */}
      <motion.rect
        x="10"
        y="16"
        width="6"
        height="4"
        rx="1"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.4 }}
      />

      {/* Viewfinder */}
      <motion.rect
        x="35"
        y="16"
        width="4"
        height="3"
        rx="0.5"
        stroke={color}
        strokeWidth="1"
        fill="none"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.45 }}
      />

      {/* Flash burst effect */}
      {animate && (
        <motion.g
          variants={flashVariants}
          animate={isInView ? 'animate' : undefined}
        >
          <motion.circle cx="13" cy="12" r="4" fill="#c19a5b" opacity={0.5} />
          <motion.path
            d="M13 6L13.5 10H12.5L13 6ZM9 12L10.5 12.5V11.5L9 12ZM17 12L15.5 11.5V12.5L17 12ZM13 16L12.5 14H13.5L13 16Z"
            fill="#c19a5b"
          />
        </motion.g>
      )}

      {/* Decorative hearts (for wedding theme) */}
      <motion.path
        d="M38 36L36.5 34.5C35.5 33.5 35.5 32 36.5 31.3C37.2 30.8 38 31 38 31.5C38 31 38.8 30.8 39.5 31.3C40.5 32 40.5 33.5 39.5 34.5L38 36Z"
        fill="#c19a5b"
        initial={{ opacity: 0, scale: 0 }}
        animate={isInView ? { opacity: 0.8, scale: 1 } : {}}
        transition={{ delay: 0.9, type: 'spring' }}
      />

      {/* Strap holes */}
      <motion.circle
        cx="8"
        cy="20"
        r="1"
        fill={color}
        opacity={0.5}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.5 } : {}}
        transition={{ delay: 0.6 }}
      />
      <motion.circle
        cx="40"
        cy="20"
        r="1"
        fill={color}
        opacity={0.5}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.5 } : {}}
        transition={{ delay: 0.6 }}
      />
    </motion.svg>
  )
}
