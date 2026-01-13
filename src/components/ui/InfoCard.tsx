import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'
import type { ReactNode } from 'react'

interface InfoCardProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function InfoCard({ children, className, delay = 0 }: InfoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={cn(
        'bg-olive text-white p-6 md:p-8 rounded-2xl text-center',
        'shadow-xl flex flex-col justify-between items-center',
        'min-h-[280px] md:min-h-[350px]',
        className
      )}
    >
      {children}
    </motion.div>
  )
}

interface InfoCardTitleProps {
  children: ReactNode
  className?: string
}

export function InfoCardTitle({ children, className }: InfoCardTitleProps) {
  return (
    <h3 className={cn('text-lg md:text-xl font-semibold mb-3', className)}>
      {children}
    </h3>
  )
}

interface InfoCardContentProps {
  children: ReactNode
  className?: string
}

export function InfoCardContent({ children, className }: InfoCardContentProps) {
  return (
    <div className={cn('text-sm md:text-base leading-relaxed flex-1', className)}>
      {children}
    </div>
  )
}

interface InfoCardImageProps {
  src: string
  alt: string
  className?: string
}

export function InfoCardImage({ src, alt, className }: InfoCardImageProps) {
  return (
    <div className={cn(
      'w-full aspect-video max-h-[150px] rounded-xl overflow-hidden mb-4',
      'bg-white/10',
      className
    )}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </div>
  )
}
