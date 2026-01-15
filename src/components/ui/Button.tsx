import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'
import type { ReactNode, MouseEvent } from 'react'
import { useRipple, RippleContainer } from './ButtonRipple'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'outline-light'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  external?: boolean
  className?: string
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  external,
  className,
  onClick,
  disabled,
  type = 'button',
}: ButtonProps) {
  const { ripples, onRipple } = useRipple()

  // Determine ripple color based on variant
  const rippleColor = variant === 'outline-light' || variant === 'primary' || variant === 'secondary'
    ? 'light' as const
    : 'gold' as const

  const baseStyles = cn(
    'inline-flex items-center justify-center rounded-full font-semibold uppercase tracking-wider',
    'transition-all duration-300 ease-out',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'relative overflow-hidden', // Required for ripple effect
    {
      'bg-burgundy text-white hover:bg-burgundy-light focus:ring-burgundy shadow-lg hover:shadow-xl hover:-translate-y-0.5': variant === 'primary',
      'bg-olive text-white hover:bg-olive-light focus:ring-olive shadow-lg hover:shadow-xl hover:-translate-y-0.5': variant === 'secondary',
      'bg-transparent border-2 border-burgundy text-burgundy hover:bg-burgundy hover:text-white focus:ring-burgundy': variant === 'outline',
      'bg-transparent border-2 border-white/80 text-white hover:bg-white hover:text-burgundy focus:ring-white': variant === 'outline-light',
      'px-4 py-2 text-xs': size === 'sm',
      'px-6 py-3 text-sm': size === 'md',
      'px-8 py-4 text-base': size === 'lg',
      'opacity-50 cursor-not-allowed': disabled,
    },
    className
  )

  const handleClick = (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    if (!disabled) {
      onRipple(e as MouseEvent<HTMLElement>)
    }
    onClick?.()
  }

  if (href) {
    return (
      <motion.a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className={baseStyles}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleClick}
      >
        <RippleContainer ripples={ripples} color={rippleColor} />
        <span className="relative z-10">{children}</span>
      </motion.a>
    )
  }

  return (
    <motion.button
      type={type}
      className={baseStyles}
      whileHover={disabled ? undefined : { scale: 1.02 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      onClick={handleClick}
      disabled={disabled}
    >
      <RippleContainer ripples={ripples} color={rippleColor} />
      <span className="relative z-10">{children}</span>
    </motion.button>
  )
}
