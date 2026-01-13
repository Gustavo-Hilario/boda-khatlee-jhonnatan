import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'

interface FlourishProps {
  variant?: 'divider' | 'corner' | 'header'
  className?: string
}

export function Flourish({ variant = 'divider', className }: FlourishProps) {
  if (variant === 'corner') {
    return (
      <svg
        className={cn('w-24 h-24 text-olive opacity-30', className)}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 90C10 50 50 10 90 10"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M20 90C20 55 55 20 90 20"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <circle cx="90" cy="10" r="3" fill="currentColor" />
        <circle cx="10" cy="90" r="3" fill="currentColor" />
        <path
          d="M50 70C50 70 60 60 70 60C80 60 85 65 85 75C85 85 75 90 65 85C55 80 50 70 50 70Z"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M30 50C30 50 40 40 50 40C60 40 65 45 65 55C65 65 55 70 45 65C35 60 30 50 30 50Z"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
        />
      </svg>
    )
  }

  if (variant === 'header') {
    return (
      <motion.div
        className={cn('flex items-center justify-center gap-4 my-6', className)}
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <svg className="w-16 h-4 text-olive" viewBox="0 0 64 16" fill="none">
          <path
            d="M0 8H28M28 8C28 8 30 4 32 4C34 4 36 8 36 8M36 8H64"
            stroke="currentColor"
            strokeWidth="1"
          />
          <circle cx="32" cy="8" r="2" fill="currentColor" />
        </svg>
      </motion.div>
    )
  }

  // Default: divider
  return (
    <motion.div
      className={cn('flex items-center justify-center py-8', className)}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex items-center gap-4">
        {/* Left flourish */}
        <svg className="w-20 h-6 text-olive" viewBox="0 0 80 24" fill="none">
          <path
            d="M80 12H50C50 12 45 12 40 8C35 4 30 4 25 8C20 12 15 12 10 12H0"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
          />
          <circle cx="25" cy="12" r="2" fill="currentColor" />
        </svg>

        {/* Center heart */}
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
        >
          <svg className="w-6 h-6 text-burgundy" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </motion.div>

        {/* Right flourish */}
        <svg className="w-20 h-6 text-olive transform scale-x-[-1]" viewBox="0 0 80 24" fill="none">
          <path
            d="M80 12H50C50 12 45 12 40 8C35 4 30 4 25 8C20 12 15 12 10 12H0"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
          />
          <circle cx="25" cy="12" r="2" fill="currentColor" />
        </svg>
      </div>
    </motion.div>
  )
}

// Simple decorative line divider
export function SimpleDivider({ className }: { className?: string }) {
  return (
    <motion.div
      className={cn('w-full max-w-xs mx-auto my-8', className)}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="h-px bg-gradient-to-r from-transparent via-olive to-transparent" />
    </motion.div>
  )
}
