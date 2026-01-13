import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Petal {
  id: number
  x: number
  delay: number
  duration: number
  size: number
  rotation: number
  swayAmount: number
  opacity: number
}

interface FloatingPetalsProps {
  active?: boolean
  count?: number
  colors?: string[]
  continuous?: boolean
  duration?: number
}

export function FloatingPetals({
  active = true,
  count = 15,
  colors = ['#ffb6c1', '#ffc0cb', '#ffb7c5', '#ff69b4', '#c19a5b'],
  continuous = true,
  duration = 8000,
}: FloatingPetalsProps) {
  const [petals, setPetals] = useState<Petal[]>([])

  const generatePetals = useCallback(() => {
    const newPetals: Petal[] = Array.from({ length: count }).map((_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 6 + Math.random() * 4,
      size: 8 + Math.random() * 12,
      rotation: Math.random() * 360,
      swayAmount: 20 + Math.random() * 40,
      opacity: 0.6 + Math.random() * 0.4,
    }))
    setPetals(newPetals)
  }, [count])

  useEffect(() => {
    if (active) {
      generatePetals()

      if (continuous) {
        const interval = setInterval(generatePetals, duration)
        return () => clearInterval(interval)
      }
    } else {
      setPetals([])
    }
  }, [active, continuous, duration, generatePetals])

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      <AnimatePresence>
        {petals.map((petal) => (
          <motion.div
            key={petal.id}
            className="absolute"
            style={{
              left: `${petal.x}%`,
              top: '-5%',
            }}
            initial={{ y: 0, opacity: 0 }}
            animate={{
              y: ['0vh', '110vh'],
              x: [
                '0px',
                `${petal.swayAmount}px`,
                `${-petal.swayAmount}px`,
                `${petal.swayAmount / 2}px`,
                '0px',
              ],
              rotate: [0, petal.rotation, petal.rotation * 2],
              opacity: [0, petal.opacity, petal.opacity, 0],
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: petal.duration,
              delay: petal.delay,
              ease: 'linear',
              times: [0, 0.1, 0.9, 1],
              x: {
                duration: petal.duration,
                ease: 'easeInOut',
                repeat: 0,
              },
            }}
          >
            <PetalShape
              size={petal.size}
              color={colors[Math.floor(Math.random() * colors.length)]}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

// Petal SVG shape
function PetalShape({ size, color }: { size: number; color: string }) {
  return (
    <svg
      width={size}
      height={size * 1.2}
      viewBox="0 0 20 24"
      fill="none"
    >
      <path
        d="M10 0C10 0 0 8 0 14C0 18.4183 4.47715 22 10 22C15.5228 22 20 18.4183 20 14C20 8 10 0 10 0Z"
        fill={color}
        opacity="0.8"
      />
      <path
        d="M10 2C10 2 12 10 12 14C12 16.2091 11.1046 18 10 18C8.89543 18 8 16.2091 8 14C8 10 10 2 10 2Z"
        fill={color}
        opacity="0.4"
      />
    </svg>
  )
}

// Rose petals variant (more realistic)
export function RosePetals({
  active = true,
  count = 20,
}: {
  active?: boolean
  count?: number
}) {
  return (
    <FloatingPetals
      active={active}
      count={count}
      colors={['#ffccd5', '#ff8fa3', '#ff758f', '#c9184a', '#a4133c']}
      continuous={true}
      duration={10000}
    />
  )
}

// Golden leaves variant
export function GoldenLeaves({
  active = true,
  count = 12,
}: {
  active?: boolean
  count?: number
}) {
  return (
    <FloatingPetals
      active={active}
      count={count}
      colors={['#c19a5b', '#c9a961', '#d4af37', '#b8860b']}
      continuous={true}
      duration={12000}
    />
  )
}

// Burst effect (one-time)
export function PetalBurst({
  trigger,
  count = 30,
  origin = { x: 50, y: 50 },
}: {
  trigger: boolean
  count?: number
  origin?: { x: number; y: number }
}) {
  const [petals, setPetals] = useState<Array<{
    id: number
    angle: number
    distance: number
    size: number
    color: string
    rotation: number
  }>>([])

  useEffect(() => {
    if (trigger) {
      const colors = ['#ffb6c1', '#ffc0cb', '#c19a5b', '#ff69b4', '#ffffff']
      const newPetals = Array.from({ length: count }).map((_, i) => ({
        id: i,
        angle: (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.5,
        distance: 100 + Math.random() * 150,
        size: 10 + Math.random() * 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 720,
      }))
      setPetals(newPetals)

      setTimeout(() => setPetals([]), 2000)
    }
  }, [trigger, count])

  return (
    <div
      className="fixed inset-0 pointer-events-none z-50 overflow-hidden"
      style={{
        perspective: '1000px',
      }}
    >
      <AnimatePresence>
        {petals.map((petal) => (
          <motion.div
            key={petal.id}
            className="absolute"
            style={{
              left: `${origin.x}%`,
              top: `${origin.y}%`,
            }}
            initial={{
              x: 0,
              y: 0,
              scale: 0,
              opacity: 1,
              rotate: 0,
            }}
            animate={{
              x: Math.cos(petal.angle) * petal.distance,
              y: Math.sin(petal.angle) * petal.distance + 50,
              scale: [0, 1, 0.8],
              opacity: [1, 1, 0],
              rotate: petal.rotation,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 1.5,
              ease: 'easeOut',
            }}
          >
            <PetalShape size={petal.size} color={petal.color} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
