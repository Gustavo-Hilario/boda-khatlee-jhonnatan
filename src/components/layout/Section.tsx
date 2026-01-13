import { motion, type Variants } from 'framer-motion'
import { cn } from '../../utils/cn'
import type { ReactNode } from 'react'

interface SectionProps {
  id: string
  children: ReactNode
  className?: string
  animate?: boolean
  delay?: number
  fullHeight?: boolean
}

const sectionVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
}

export function Section({
  id,
  children,
  className,
  animate = true,
  delay = 0,
  fullHeight = true,
}: SectionProps) {
  const content = (
    <section
      id={id}
      className={cn(
        'w-full scroll-snap-align-start',
        fullHeight && 'min-h-screen',
        className
      )}
    >
      {children}
    </section>
  )

  if (!animate) {
    return content
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
      transition={{ delay }}
    >
      {content}
    </motion.div>
  )
}
