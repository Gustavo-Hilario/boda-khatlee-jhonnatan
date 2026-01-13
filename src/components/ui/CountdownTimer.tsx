import { motion, AnimatePresence } from 'framer-motion'
import { useCountdown } from '../../hooks/useCountdown'
import { cn } from '../../utils/cn'

interface CountdownTimerProps {
  targetDate: Date
  className?: string
}

interface TimeBoxProps {
  value: number
  label: string
}

function TimeBox({ value, label }: TimeBoxProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-olive text-white rounded-lg p-4 min-w-[70px] md:min-w-[90px] shadow-lg">
        <AnimatePresence mode="wait">
          <motion.span
            key={value}
            initial={{ opacity: 0.5, scale: 0.9, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0.5, scale: 0.9, y: 10 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="block text-3xl md:text-4xl font-bold tabular-nums"
          >
            {String(value).padStart(2, '0')}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="mt-2 text-sm text-gray-600 font-medium">{label}</span>
    </div>
  )
}

export function CountdownTimer({ targetDate, className }: CountdownTimerProps) {
  const { days, hours, minutes, seconds, isExpired } = useCountdown(targetDate)

  if (isExpired) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={cn('text-center', className)}
      >
        <p className="text-2xl font-serif text-burgundy">
          El gran dia ha llegado!
        </p>
      </motion.div>
    )
  }

  return (
    <div className={cn('flex justify-center gap-3 md:gap-6', className)}>
      <TimeBox value={days} label="Dias" />
      <TimeBox value={hours} label="Horas" />
      <TimeBox value={minutes} label="Min" />
      <TimeBox value={seconds} label="Seg" />
    </div>
  )
}
