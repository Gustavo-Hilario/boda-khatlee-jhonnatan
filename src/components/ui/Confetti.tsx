import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Particle {
  id: number
  x: number
  y: number
  rotation: number
  scale: number
  color: string
  shape: 'circle' | 'rectangle' | 'heart'
  velocity: { x: number; y: number }
}

interface ConfettiProps {
  trigger: boolean
  count?: number
  colors?: string[]
  duration?: number
  spread?: number
  origin?: { x: number; y: number }
  shapes?: ('circle' | 'rectangle' | 'heart')[]
  gravity?: number
}

export function Confetti({
  trigger,
  count = 50,
  colors = ['#c19a5b', '#c9a961', '#8d9e78', '#800020', '#ffffff'],
  duration = 3000,
  spread = 400,
  origin = { x: 50, y: 50 },
  shapes = ['circle', 'rectangle', 'heart'],
  gravity = 0.5,
}: ConfettiProps) {
  const [particles, setParticles] = useState<Particle[]>([])
  const [key, setKey] = useState(0)
  const clearTimeoutRef = useRef<number | null>(null)

  const generateParticles = useCallback(() => {
    const newParticles: Particle[] = Array.from({ length: count }).map((_, i) => {
      const angle = (Math.random() * Math.PI * 2)
      const velocity = 5 + Math.random() * 10

      return {
        id: i,
        x: origin.x,
        y: origin.y,
        rotation: Math.random() * 360,
        scale: 0.5 + Math.random() * 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        velocity: {
          x: Math.cos(angle) * velocity * (spread / 100),
          y: Math.sin(angle) * velocity * (spread / 100) - 5,
        },
      }
    })
    setParticles(newParticles)
    setKey((k) => k + 1)

    if (clearTimeoutRef.current) {
      window.clearTimeout(clearTimeoutRef.current)
    }
    // Clear particles after duration
    clearTimeoutRef.current = window.setTimeout(() => {
      setParticles([])
    }, duration)
  }, [count, colors, duration, spread, origin, shapes])

  useEffect(() => {
    if (trigger) {
      generateParticles()
    }
    return () => {
      if (clearTimeoutRef.current) {
        window.clearTimeout(clearTimeoutRef.current)
        clearTimeoutRef.current = null
      }
    }
  }, [trigger, generateParticles])

  const renderShape = (shape: string, color: string, scale: number) => {
    const size = 10 * scale

    switch (shape) {
      case 'circle':
        return (
          <div
            className="rounded-full"
            style={{
              width: size,
              height: size,
              backgroundColor: color,
            }}
          />
        )
      case 'rectangle':
        return (
          <div
            style={{
              width: size * 0.6,
              height: size * 1.2,
              backgroundColor: color,
              borderRadius: 2,
            }}
          />
        )
      case 'heart':
        return (
          <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill={color}
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={`${key}-${particle.id}`}
            className="absolute"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            initial={{
              x: 0,
              y: 0,
              rotate: 0,
              opacity: 1,
              scale: 0,
            }}
            animate={{
              x: [0, particle.velocity.x * 20, particle.velocity.x * 40],
              y: [0, particle.velocity.y * 20 - 50, particle.velocity.y * 20 + 200 * gravity],
              rotate: [0, particle.rotation * 2, particle.rotation * 4],
              opacity: [0, 1, 1, 0],
              scale: [0, particle.scale, particle.scale, particle.scale * 0.5],
            }}
            transition={{
              duration: duration / 1000,
              ease: 'easeOut',
              times: [0, 0.1, 0.7, 1],
            }}
          >
            {renderShape(particle.shape, particle.color, particle.scale)}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

// Pre-configured celebration variants
export function HeartConfetti({ trigger }: { trigger: boolean }) {
  return (
    <Confetti
      trigger={trigger}
      count={30}
      colors={['#800020', '#a30029', '#c19a5b']}
      shapes={['heart']}
      spread={300}
      duration={2500}
    />
  )
}

export function GoldenConfetti({ trigger }: { trigger: boolean }) {
  return (
    <Confetti
      trigger={trigger}
      count={40}
      colors={['#c19a5b', '#c9a961', '#d4af37', '#ffd700']}
      shapes={['circle', 'rectangle']}
      spread={350}
      duration={3000}
    />
  )
}

export function WeddingConfetti({ trigger }: { trigger: boolean }) {
  return (
    <Confetti
      trigger={trigger}
      count={60}
      colors={['#c19a5b', '#8d9e78', '#800020', '#ffffff', '#c9a961']}
      shapes={['circle', 'rectangle', 'heart']}
      spread={400}
      duration={3500}
    />
  )
}
