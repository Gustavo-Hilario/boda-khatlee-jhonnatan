import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Particle {
  id: number
  x: number
  y: number
  scale: number
  color: string
  rotation: number
}

interface SparklesProps {
  trigger: boolean
  count?: number
  colors?: string[]
  spread?: number
}

export function Sparkles({
  trigger,
  count = 8,
  colors = ['#c19a5b', '#c9a961', '#ffffff', '#8d9e78'],
  spread = 60,
}: SparklesProps) {
  const [particles, setParticles] = useState<Particle[]>([])
  const [key, setKey] = useState(0)

  const generateParticles = useCallback(() => {
    const newParticles: Particle[] = Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * spread * 2,
      y: (Math.random() - 0.5) * spread - 20, // Bias upward
      scale: 0.4 + Math.random() * 0.6,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
    }))
    setParticles(newParticles)
    setKey((k) => k + 1)
  }, [count, colors, spread])

  useEffect(() => {
    if (trigger) {
      generateParticles()
    }
  }, [trigger, generateParticles])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-visible z-10">
      <AnimatePresence mode="popLayout">
        {particles.map((particle) => (
          <motion.div
            key={`${key}-${particle.id}`}
            className="absolute left-1/2 top-1/2 rounded-full"
            style={{
              width: 8 * particle.scale,
              height: 8 * particle.scale,
              backgroundColor: particle.color,
              boxShadow: `0 0 ${6 * particle.scale}px ${particle.color}`,
            }}
            initial={{
              x: 0,
              y: 0,
              scale: 0,
              opacity: 1,
              rotate: 0,
            }}
            animate={{
              x: particle.x,
              y: particle.y,
              scale: particle.scale,
              opacity: 0,
              rotate: particle.rotation,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.6 + Math.random() * 0.3,
              ease: 'easeOut',
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}

// Star-shaped sparkle variant
export function StarSparkles({ trigger, count = 6 }: { trigger: boolean; count?: number }) {
  const [particles, setParticles] = useState<Particle[]>([])
  const [key, setKey] = useState(0)

  useEffect(() => {
    if (trigger) {
      const newParticles: Particle[] = Array.from({ length: count }).map((_, i) => {
        const angle = (i / count) * Math.PI * 2
        const distance = 40 + Math.random() * 30
        return {
          id: i,
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance - 10,
          scale: 0.5 + Math.random() * 0.5,
          color: '#c19a5b',
          rotation: Math.random() * 180,
        }
      })
      setParticles(newParticles)
      setKey((k) => k + 1)
    }
  }, [trigger, count])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-visible z-10">
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.svg
            key={`${key}-${particle.id}`}
            className="absolute left-1/2 top-1/2"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
            animate={{
              x: particle.x,
              y: particle.y,
              scale: particle.scale,
              opacity: 0,
              rotate: particle.rotation,
            }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <path
              d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"
              fill={particle.color}
            />
          </motion.svg>
        ))}
      </AnimatePresence>
    </div>
  )
}
