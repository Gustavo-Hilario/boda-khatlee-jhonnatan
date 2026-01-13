import { motion, type Variants, useInView } from 'framer-motion'
import { useRef } from 'react'

interface CalendarIconProps {
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

// Page flip animation
const pageFlipVariants: Variants = {
  animate: {
    rotateX: [0, -5, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatDelay: 3,
      ease: 'easeInOut',
    },
  },
}

// Heart pulse on calendar
const heartVariants: Variants = {
  animate: {
    scale: [1, 1.2, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

export function CalendarIcon({
  size = 32,
  className = '',
  animate = true,
  color = 'currentColor',
}: CalendarIconProps) {
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
      {/* Calendar page with flip */}
      <motion.g
        style={{ originX: '16px', originY: '8px' }}
        variants={animate ? pageFlipVariants : undefined}
        animate={animate && isInView ? 'animate' : undefined}
      >
        {/* Calendar body */}
        <motion.rect
          x="4"
          y="6"
          width="24"
          height="22"
          rx="2"
          stroke={color}
          strokeWidth="2"
          fill="none"
          variants={drawVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        />

        {/* Header bar */}
        <motion.rect
          x="4"
          y="6"
          width="24"
          height="6"
          rx="2"
          fill={color}
          opacity={0.2}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.2 } : {}}
          transition={{ delay: 0.5 }}
        />

        {/* Calendar rings */}
        <motion.path
          d="M10 4V8M22 4V8"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          variants={drawVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        />

        {/* Grid lines */}
        <motion.path
          d="M8 16H24M8 22H24M12 14V26M20 14V26"
          stroke={color}
          strokeWidth="1"
          opacity={0.3}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.3 } : {}}
          transition={{ delay: 0.6 }}
        />

        {/* Heart mark on date */}
        <motion.g
          variants={animate ? heartVariants : undefined}
          animate={animate && isInView ? 'animate' : undefined}
        >
          <motion.path
            d="M16 21L14.5 19.5C13.5 18.5 13.5 17.5 14.5 17C15 16.7 16 17 16 17.5C16 17 17 16.7 17.5 17C18.5 17.5 18.5 18.5 17.5 19.5L16 21Z"
            fill="#c19a5b"
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.8, type: 'spring' }}
          />
        </motion.g>
      </motion.g>
    </motion.svg>
  )
}
