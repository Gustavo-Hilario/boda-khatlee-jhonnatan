import { motion, type Variants, useInView } from 'framer-motion'
import { useRef } from 'react'

interface ChurchIconProps {
  size?: number
  className?: string
  animate?: boolean
  color?: string
}

// Draw animation for paths
const drawVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 1.5, ease: 'easeInOut' },
      opacity: { duration: 0.3 },
    },
  },
}

// Cross glow animation
const crossGlowVariants: Variants = {
  animate: {
    filter: [
      'drop-shadow(0 0 2px rgba(193, 154, 91, 0.3))',
      'drop-shadow(0 0 8px rgba(193, 154, 91, 0.6))',
      'drop-shadow(0 0 2px rgba(193, 154, 91, 0.3))',
    ],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

// Bell swing animation
const bellSwingVariants: Variants = {
  animate: {
    rotate: [-8, 8, -8],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

export function ChurchIcon({
  size = 64,
  className = '',
  animate = true,
  color = 'currentColor',
}: ChurchIconProps) {
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
      {/* Main church building */}
      <motion.path
        d="M12 58V32L32 18L52 32V58H12Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        variants={drawVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      />

      {/* Tower/steeple */}
      <motion.path
        d="M24 32V22L32 12L40 22V32"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        variants={drawVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        transition={{ delay: 0.3 }}
      />

      {/* Cross on top */}
      <motion.g
        variants={animate ? crossGlowVariants : undefined}
        animate={animate && isInView ? 'animate' : undefined}
      >
        <motion.path
          d="M32 4V12M28 8H36"
          stroke="#c19a5b"
          strokeWidth="2.5"
          strokeLinecap="round"
          variants={drawVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ delay: 0.6 }}
        />
      </motion.g>

      {/* Door arch */}
      <motion.path
        d="M26 58V48C26 44.686 28.686 42 32 42C35.314 42 38 44.686 38 48V58"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        variants={drawVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        transition={{ delay: 0.4 }}
      />

      {/* Round window */}
      <motion.circle
        cx="32"
        cy="36"
        r="4"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
        variants={drawVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        transition={{ delay: 0.5 }}
      />

      {/* Bell (left) */}
      <motion.g
        style={{ originX: '26px', originY: '24px' }}
        variants={animate ? bellSwingVariants : undefined}
        animate={animate && isInView ? 'animate' : undefined}
      >
        <motion.path
          d="M24 26C24 24.895 24.895 24 26 24C27.105 24 28 24.895 28 26V28H24V26Z"
          fill={color}
          opacity={0.7}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.7 } : {}}
          transition={{ delay: 1.2 }}
        />
      </motion.g>

      {/* Bell (right) */}
      <motion.g
        style={{ originX: '38px', originY: '24px' }}
        variants={animate ? bellSwingVariants : undefined}
        animate={animate && isInView ? 'animate' : undefined}
        transition={{ delay: 0.2 }}
      >
        <motion.path
          d="M36 26C36 24.895 36.895 24 38 24C39.105 24 40 24.895 40 26V28H36V26Z"
          fill={color}
          opacity={0.7}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.7 } : {}}
          transition={{ delay: 1.4 }}
        />
      </motion.g>

      {/* Side windows */}
      <motion.rect
        x="16"
        y="38"
        width="4"
        height="6"
        rx="1"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.8 }}
      />
      <motion.rect
        x="44"
        y="38"
        width="4"
        height="6"
        rx="1"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.9 }}
      />
    </motion.svg>
  )
}
