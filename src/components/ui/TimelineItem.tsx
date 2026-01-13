import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'

interface TimelineItemProps {
  time: string
  title: string
  icon?: string
  index: number
  className?: string
}

export function TimelineItem({ time, title, icon, index, className }: TimelineItemProps) {
  return (
    <motion.div
      className={cn('flex flex-col items-center min-w-[100px] md:min-w-[120px]', className)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Icon circle */}
      <div className="relative z-10 mb-4">
        <div className={cn(
          'w-16 h-16 md:w-20 md:h-20 rounded-full',
          'bg-gray-100 border-2 border-olive',
          'flex items-center justify-center',
          'overflow-hidden shadow-md'
        )}>
          {icon ? (
            <img
              src={icon}
              alt={title}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-2xl">⏰</span>
          )}
        </div>

        {/* Dot below icon */}
        <motion.div
          className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-burgundy border-2 border-white shadow"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 + index * 0.1, type: 'spring', stiffness: 300 }}
        />
      </div>

      {/* Time */}
      <span className="text-burgundy font-bold text-lg mt-4">{time}</span>

      {/* Title */}
      <p className="text-gray-700 text-sm md:text-base font-medium mt-1">{title}</p>
    </motion.div>
  )
}
