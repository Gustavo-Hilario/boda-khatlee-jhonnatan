import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'

interface HeartDividerProps {
  className?: string
}

export function HeartDivider({ className }: HeartDividerProps) {
  return (
    <div className={cn('flex items-center justify-center my-8', className)}>
      <motion.div
        className="h-px bg-gray-300 w-16 md:w-24"
        initial={{ scaleX: 0, originX: 1 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      />
      <motion.span
        className="text-burgundy mx-4 text-xl"
        initial={{ scale: 0, rotate: -45 }}
        whileInView={{ scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3, type: 'spring', stiffness: 200 }}
      >
        ❤
      </motion.span>
      <motion.div
        className="h-px bg-gray-300 w-16 md:w-24"
        initial={{ scaleX: 0, originX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      />
    </div>
  )
}
