import { motion, type Variants, useInView } from 'framer-motion'
import { useRef } from 'react'

interface DressCodeIconProps {
  size?: number
  className?: string
  animate?: boolean
  color?: string
  variant?: 'dress' | 'suit' | 'both'
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

// Gentle sway animation
const swayVariants: Variants = {
  animate: {
    rotate: [-2, 2, -2],
    transition: {
      duration: 3,
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
      repeatDelay: 2,
      delay: delay,
    },
  }),
}

// Dress component
function Dress({
  color,
  animate,
  isInView,
}: {
  color: string
  animate: boolean
  isInView: boolean
}) {
  return (
    <motion.g
      style={{ originX: '16px', originY: '4px' }}
      variants={animate ? swayVariants : undefined}
      animate={animate && isInView ? 'animate' : undefined}
    >
      {/* Dress bodice */}
      <motion.path
        d="M12 4L8 8L10 10L8 24L24 24L22 10L24 8L20 4"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        variants={drawVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      />

      {/* Dress skirt */}
      <motion.path
        d="M8 24L4 44H28L24 24"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        variants={drawVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        transition={{ delay: 0.2 }}
      />

      {/* Neckline detail */}
      <motion.path
        d="M12 4C14 6 18 6 20 4"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        variants={drawVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        transition={{ delay: 0.4 }}
      />

      {/* Waist belt */}
      <motion.path
        d="M10 22H22"
        stroke="#c19a5b"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.6 }}
      />

      {/* Decorative bow */}
      <motion.circle
        cx="16"
        cy="22"
        r="2"
        fill="#c19a5b"
        initial={{ opacity: 0, scale: 0 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.7, type: 'spring' }}
      />
    </motion.g>
  )
}

// Suit component
function Suit({
  color,
  isInView,
  offsetX = 0,
}: {
  color: string
  isInView: boolean
  offsetX?: number
}) {
  return (
    <motion.g transform={`translate(${offsetX}, 0)`}>
      {/* Jacket */}
      <motion.path
        d="M12 4L8 8L10 44H22L24 8L20 4"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        variants={drawVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      />

      {/* Lapels */}
      <motion.path
        d="M12 4L14 14M20 4L18 14"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        variants={drawVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        transition={{ delay: 0.2 }}
      />

      {/* Collar */}
      <motion.path
        d="M12 4C14 2 18 2 20 4"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        variants={drawVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        transition={{ delay: 0.3 }}
      />

      {/* Tie */}
      <motion.path
        d="M16 6L14 10L16 28L18 10L16 6Z"
        stroke="#c19a5b"
        strokeWidth="1"
        fill="#c19a5b"
        fillOpacity={0.3}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.5 }}
      />

      {/* Buttons */}
      <motion.circle
        cx="16"
        cy="20"
        r="1"
        fill={color}
        initial={{ opacity: 0, scale: 0 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.6, type: 'spring' }}
      />
      <motion.circle
        cx="16"
        cy="26"
        r="1"
        fill={color}
        initial={{ opacity: 0, scale: 0 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.7, type: 'spring' }}
      />
    </motion.g>
  )
}

export function DressCodeIcon({
  size = 48,
  className = '',
  animate = true,
  color = 'currentColor',
  variant = 'both',
}: DressCodeIconProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  if (variant === 'both') {
    return (
      <motion.svg
        ref={ref}
        width={size * 2}
        height={size}
        viewBox="0 0 64 48"
        fill="none"
        className={className}
        aria-hidden="true"
      >
        {/* Dress on left */}
        <g transform="translate(0, 2)">
          <Dress color={color} animate={animate} isInView={isInView} />
        </g>

        {/* Suit on right */}
        <g transform="translate(32, 2)">
          <Suit color={color} isInView={isInView} />
        </g>

        {/* Sparkles */}
        {animate && (
          <>
            <motion.circle
              cx="16"
              cy="8"
              r="1.5"
              fill="#c19a5b"
              variants={sparkleVariants}
              animate={isInView ? 'animate' : undefined}
              custom={0}
            />
            <motion.circle
              cx="48"
              cy="8"
              r="1.5"
              fill="#c19a5b"
              variants={sparkleVariants}
              animate={isInView ? 'animate' : undefined}
              custom={0.5}
            />
          </>
        )}
      </motion.svg>
    )
  }

  return (
    <motion.svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 32 48"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {variant === 'dress' ? (
        <Dress color={color} animate={animate} isInView={isInView} />
      ) : (
        <Suit color={color} isInView={isInView} />
      )}

      {/* Sparkle */}
      {animate && (
        <motion.circle
          cx="16"
          cy="6"
          r="1.5"
          fill="#c19a5b"
          variants={sparkleVariants}
          animate={isInView ? 'animate' : undefined}
          custom={0}
        />
      )}
    </motion.svg>
  )
}
