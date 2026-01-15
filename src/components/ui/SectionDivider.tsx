import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useMobile } from '../../hooks/useMobile'

interface SectionDividerProps {
  variant?: 'wave' | 'flourish' | 'simple'
  color?: 'gold' | 'olive' | 'burgundy'
  className?: string
}

export function SectionDivider({
  variant = 'wave',
  color = 'gold',
  className = '',
}: SectionDividerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isMobile = useMobile()

  // Track scroll progress for this element
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'end 0.1'],
  })

  // Smooth spring for path drawing
  const pathLength = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  })

  // Opacity based on scroll
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3])

  // Scale effect
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95])

  // Color mapping
  const colors = {
    gold: {
      stroke: '#c19a5b',
      glow: 'rgba(193, 154, 91, 0.3)',
    },
    olive: {
      stroke: '#8d9e78',
      glow: 'rgba(141, 158, 120, 0.3)',
    },
    burgundy: {
      stroke: '#800020',
      glow: 'rgba(128, 0, 32, 0.3)',
    },
  }

  const currentColor = colors[color]

  if (variant === 'simple') {
    return (
      <motion.div
        ref={ref}
        className={`relative w-full max-w-4xl mx-auto px-4 py-8 ${className}`}
        style={{ opacity, scale }}
      >
        <div className="flex items-center justify-center gap-4">
          <motion.div
            className="flex-1 h-px"
            style={{
              background: `linear-gradient(90deg, transparent 0%, ${currentColor.stroke}40 50%, transparent 100%)`,
              scaleX: pathLength,
              transformOrigin: 'left',
            }}
          />
          <motion.span
            className="text-xl"
            style={{ color: currentColor.stroke }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            ✦
          </motion.span>
          <motion.div
            className="flex-1 h-px"
            style={{
              background: `linear-gradient(90deg, transparent 0%, ${currentColor.stroke}40 50%, transparent 100%)`,
              scaleX: pathLength,
              transformOrigin: 'right',
            }}
          />
        </div>
      </motion.div>
    )
  }

  if (variant === 'flourish') {
    return (
      <motion.div
        ref={ref}
        className={`relative w-full max-w-lg mx-auto py-8 ${className}`}
        style={{ opacity, scale }}
      >
        <svg
          viewBox="0 0 200 40"
          className="w-full h-auto"
          style={{ filter: `drop-shadow(0 0 8px ${currentColor.glow})` }}
        >
          {/* Center flourish */}
          <motion.path
            d="M 20 20 Q 50 5, 100 20 Q 150 35, 180 20"
            fill="none"
            stroke={currentColor.stroke}
            strokeWidth="1.5"
            strokeLinecap="round"
            style={{
              pathLength: isMobile ? 1 : pathLength,
            }}
          />
          {/* Left curl */}
          <motion.path
            d="M 20 20 Q 10 20, 5 15 Q 0 10, 5 5"
            fill="none"
            stroke={currentColor.stroke}
            strokeWidth="1"
            strokeLinecap="round"
            style={{
              pathLength: isMobile ? 1 : pathLength,
            }}
          />
          {/* Right curl */}
          <motion.path
            d="M 180 20 Q 190 20, 195 15 Q 200 10, 195 5"
            fill="none"
            stroke={currentColor.stroke}
            strokeWidth="1"
            strokeLinecap="round"
            style={{
              pathLength: isMobile ? 1 : pathLength,
            }}
          />
          {/* Center diamond */}
          <motion.path
            d="M 95 20 L 100 15 L 105 20 L 100 25 Z"
            fill={currentColor.stroke}
            style={{
              opacity: isMobile ? 1 : pathLength,
            }}
          />
        </svg>
      </motion.div>
    )
  }

  // Wave variant (default)
  return (
    <motion.div
      ref={ref}
      className={`relative w-full max-w-2xl mx-auto py-8 ${className}`}
      style={{ opacity, scale }}
    >
      <svg
        viewBox="0 0 400 30"
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
        style={{ filter: `drop-shadow(0 0 6px ${currentColor.glow})` }}
      >
        {/* Main wave path */}
        <motion.path
          d="M 0 15
             Q 25 5, 50 15
             Q 75 25, 100 15
             Q 125 5, 150 15
             Q 175 25, 200 15
             Q 225 5, 250 15
             Q 275 25, 300 15
             Q 325 5, 350 15
             Q 375 25, 400 15"
          fill="none"
          stroke={currentColor.stroke}
          strokeWidth="1.5"
          strokeLinecap="round"
          style={{
            pathLength: isMobile ? 1 : pathLength,
          }}
        />
        {/* Decorative dots at peaks */}
        {[50, 150, 250, 350].map((x, i) => (
          <motion.circle
            key={i}
            cx={x}
            cy={15}
            r="2"
            fill={currentColor.stroke}
            style={{
              opacity: isMobile ? 0.6 : useTransform(pathLength, [i * 0.25, (i + 1) * 0.25], [0, 1]),
            }}
          />
        ))}
      </svg>
    </motion.div>
  )
}

// Compact divider for use between cards
export function CardDivider({ color = 'gold' }: { color?: 'gold' | 'olive' | 'burgundy' }) {
  const colors = {
    gold: '#c19a5b',
    olive: '#8d9e78',
    burgundy: '#800020',
  }

  return (
    <motion.div
      className="flex items-center justify-center gap-2 py-2"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="w-8 h-px"
        style={{ backgroundColor: `${colors[color]}40` }}
      />
      <motion.div
        className="w-1.5 h-1.5 rounded-full"
        style={{ backgroundColor: colors[color] }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="w-8 h-px"
        style={{ backgroundColor: `${colors[color]}40` }}
      />
    </motion.div>
  )
}
