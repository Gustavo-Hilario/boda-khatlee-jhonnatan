import { memo, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useMobile } from '../../hooks/useMobile'

interface ParticleProps {
  index: number
  isMobile: boolean
}

// Individual floating particle
const Particle = memo(function Particle({ index, isMobile }: ParticleProps) {
  // Deterministic random values based on index
  const seed = index * 137.5
  const startX = ((seed * 2.3) % 100)
  const size = isMobile ? 2 + (seed % 2) : 2 + (seed % 4)
  const duration = isMobile ? 12 + (seed % 8) : 8 + (seed % 6)
  // Stagger delays to prevent all particles appearing at once (adds 1-3s based on index)
  const delay = 1 + (seed % 5) + (index * 0.3)

  // Color palette
  const colors = [
    'rgba(193, 154, 91, 0.25)',  // gold
    'rgba(141, 158, 120, 0.2)',  // olive
    'rgba(193, 154, 91, 0.15)',  // lighter gold
    'rgba(255, 253, 245, 0.3)',  // cream
  ]
  const color = colors[index % colors.length]

  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        left: `${startX}%`,
        bottom: '-5%',
        backgroundColor: color,
        filter: 'blur(0.5px)',
      }}
      initial={{ opacity: 0, y: 0, scale: 0.5 }}
      animate={{
        y: [0, -1200],
        x: [0, ((seed % 40) - 20)],
        opacity: [0, 0.6, 0.6, 0],
        scale: [0.5, 1, 1, 0.5],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  )
})

// Gradient orb that slowly drifts
interface OrbProps {
  color: string
  size: number
  initialPosition: { x: number; y: number }
  targetPosition: { x: number; y: number }
  duration: number
}

const GradientOrb = memo(function GradientOrb({
  color,
  size,
  initialPosition,
  targetPosition,
  duration,
}: OrbProps) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        left: `${initialPosition.x}%`,
        top: `${initialPosition.y}%`,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: 'blur(40px)',
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        left: [`${initialPosition.x}%`, `${targetPosition.x}%`, `${initialPosition.x}%`],
        top: [`${initialPosition.y}%`, `${targetPosition.y}%`, `${initialPosition.y}%`],
        opacity: [0.3, 0.5, 0.3],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration,
        delay: 0.5, // Delay orbs to let page settle first
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  )
})

interface AnimatedBackgroundProps {
  /** Number of particles (reduced on mobile) */
  particleCount?: number
  /** Enable gradient orbs animation */
  enableOrbs?: boolean
  /** Enable particles */
  enableParticles?: boolean
  /** Additional CSS classes */
  className?: string
}

export function AnimatedBackground({
  particleCount = 15,
  enableOrbs = true,
  enableParticles = true,
  className = '',
}: AnimatedBackgroundProps) {
  const isMobile = useMobile()

  // Reduce effects on mobile
  const actualParticleCount = isMobile ? Math.min(5, particleCount) : particleCount
  const showOrbs = enableOrbs && !isMobile

  // Memoize particle array to prevent re-renders
  const particles = useMemo(() => {
    return Array.from({ length: actualParticleCount }, (_, i) => (
      <Particle key={i} index={i} isMobile={isMobile} />
    ))
  }, [actualParticleCount, isMobile])

  // Orb configurations
  const orbs = useMemo(() => [
    {
      color: 'rgba(141, 158, 120, 0.08)',
      size: 400,
      initialPosition: { x: 10, y: 20 },
      targetPosition: { x: 30, y: 60 },
      duration: 18,
    },
    {
      color: 'rgba(193, 154, 91, 0.06)',
      size: 350,
      initialPosition: { x: 70, y: 10 },
      targetPosition: { x: 50, y: 40 },
      duration: 22,
    },
    {
      color: 'rgba(141, 158, 120, 0.05)',
      size: 300,
      initialPosition: { x: 80, y: 70 },
      targetPosition: { x: 60, y: 80 },
      duration: 15,
    },
  ], [])

  return (
    <div
      className={`fixed inset-0 overflow-hidden pointer-events-none z-0 ${className}`}
      aria-hidden="true"
    >
      {/* Gradient orbs (desktop only) */}
      {showOrbs && orbs.map((orb, i) => (
        <GradientOrb key={i} {...orb} />
      ))}

      {/* Floating particles */}
      {enableParticles && particles}

      {/* Very subtle color wash that shifts */}
      {!isMobile && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            background: [
              'linear-gradient(135deg, rgba(141,158,120,0.02) 0%, transparent 50%, rgba(193,154,91,0.02) 100%)',
              'linear-gradient(225deg, rgba(193,154,91,0.02) 0%, transparent 50%, rgba(141,158,120,0.02) 100%)',
              'linear-gradient(135deg, rgba(141,158,120,0.02) 0%, transparent 50%, rgba(193,154,91,0.02) 100%)',
            ],
          }}
          transition={{
            opacity: { duration: 1, delay: 0.3 },
            background: {
              duration: 20,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1, // Wait for page to settle
            },
          }}
        />
      )}
    </div>
  )
}

// Simpler background for specific sections
export function SectionBackground({
  variant = 'dots',
  opacity = 0.2,
}: {
  variant?: 'dots' | 'floral' | 'gradient'
  opacity?: number
}) {
  if (variant === 'gradient') {
    return (
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ opacity }}
        animate={{
          background: [
            'radial-gradient(ellipse at 20% 30%, rgba(193,154,91,0.1) 0%, transparent 50%)',
            'radial-gradient(ellipse at 80% 70%, rgba(193,154,91,0.1) 0%, transparent 50%)',
            'radial-gradient(ellipse at 20% 30%, rgba(193,154,91,0.1) 0%, transparent 50%)',
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    )
  }

  const patternClass = variant === 'floral' ? 'bg-pattern-floral' : 'bg-pattern-dots'

  return (
    <div
      className={`absolute inset-0 ${patternClass} pointer-events-none`}
      style={{ opacity }}
    />
  )
}
