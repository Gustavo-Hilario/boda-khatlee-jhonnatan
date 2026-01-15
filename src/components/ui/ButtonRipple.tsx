import { useState, useCallback, type MouseEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Ripple {
  id: number
  x: number
  y: number
  size: number
}

interface UseRippleReturn {
  ripples: Ripple[]
  onRipple: (e: MouseEvent<HTMLElement>) => void
  removeRipple: (id: number) => void
}

/**
 * Hook for creating ripple effect on click
 */
export function useRipple(): UseRippleReturn {
  const [ripples, setRipples] = useState<Ripple[]>([])

  const onRipple = useCallback((e: MouseEvent<HTMLElement>) => {
    const element = e.currentTarget
    const rect = element.getBoundingClientRect()

    // Calculate ripple position relative to element
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Ripple size should cover the entire element from click point
    const size = Math.max(rect.width, rect.height) * 2.5

    const id = Date.now()
    setRipples((prev) => [...prev, { id, x, y, size }])

    // Auto-remove ripple after animation
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id))
    }, 600)
  }, [])

  const removeRipple = useCallback((id: number) => {
    setRipples((prev) => prev.filter((r) => r.id !== id))
  }, [])

  return { ripples, onRipple, removeRipple }
}

interface RippleContainerProps {
  ripples: Ripple[]
  color?: 'light' | 'gold' | 'dark'
}

/**
 * Renders ripple effects - place inside a button/element with position: relative and overflow: hidden
 */
export function RippleContainer({ ripples, color = 'light' }: RippleContainerProps) {
  const colors = {
    light: 'rgba(255, 255, 255, 0.4)',
    gold: 'rgba(193, 154, 91, 0.4)',
    dark: 'rgba(0, 0, 0, 0.2)',
  }

  return (
    <AnimatePresence>
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
            backgroundColor: colors[color],
            transform: 'translate(-50%, -50%)',
          }}
          initial={{ scale: 0, opacity: 0.6 }}
          animate={{ scale: 1, opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.6,
            ease: 'easeOut',
          }}
        />
      ))}
    </AnimatePresence>
  )
}

interface RippleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  rippleColor?: 'light' | 'gold' | 'dark'
  className?: string
}

/**
 * Button with built-in ripple effect
 */
export function RippleButton({
  children,
  rippleColor = 'light',
  className = '',
  onClick,
  ...props
}: RippleButtonProps) {
  const { ripples, onRipple } = useRipple()

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    onRipple(e)
    onClick?.(e)
  }

  return (
    <button
      className={`relative overflow-hidden ${className}`}
      onClick={handleClick}
      {...props}
    >
      <RippleContainer ripples={ripples} color={rippleColor} />
      {children}
    </button>
  )
}
