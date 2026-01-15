import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { useCountdown } from '../../hooks/useCountdown'
import { useMobile } from '../../hooks/useMobile'
import { cn } from '../../utils/cn'
import { FlipDigit, ClockSeparator } from './FlipDigit'
import {
  CalendarIcon,
  ClockIcon,
  HourglassIcon,
  StopwatchIcon,
} from './svg'

interface CountdownTimerProps {
  targetDate: Date
  className?: string
  size?: 'sm' | 'md' | 'lg'
  showMilestones?: boolean
}

// Progress ring variants
const ringVariants: Variants = {
  initial: { pathLength: 0, opacity: 0 },
  animate: (progress: number) => ({
    pathLength: progress,
    opacity: 1,
    transition: {
      pathLength: { duration: 2, ease: 'easeOut' },
      opacity: { duration: 0.5 },
    },
  }),
}

// Celebration message variants
const celebrationVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 15,
    },
  },
}

// Size configuration
const sizeConfig = {
  sm: {
    digitSize: 'sm' as const,
    gap: 'gap-2',
    separatorSize: 'w-1.5 h-1.5',
  },
  md: {
    digitSize: 'md' as const,
    gap: 'gap-3 md:gap-4',
    separatorSize: 'w-2 h-2',
  },
  lg: {
    digitSize: 'lg' as const,
    gap: 'gap-4 md:gap-6',
    separatorSize: 'w-2.5 h-2.5',
  },
}

// Digit pair widths for each size (2 digits + gap between them)
// sm: 2 * 40px + 4px = 84px, md: 2 * 48px + 4px = 100px at sm, 2 * 64px = 132px at md
const digitPairWidthClasses = {
  sm: 'w-[84px]',
  md: 'w-[84px] sm:w-[100px] md:w-[132px]',
  lg: 'w-[116px] sm:w-[132px] md:w-[164px]',
}

// Helper components for three-row layout
function DigitPair({ value, size }: { value: number; size: 'sm' | 'md' | 'lg' }) {
  return (
    <div className="flex gap-0.5 md:gap-1">
      <FlipDigit digit={Math.floor(value / 10)} size={size} />
      <FlipDigit digit={value % 10} size={size} />
    </div>
  )
}

function CountdownIcon({ children, delay, size }: { children: React.ReactNode; delay: number; size: 'sm' | 'md' | 'lg' }) {
  return (
    <motion.div
      className={cn('flex justify-center', digitPairWidthClasses[size])}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  )
}

function CountdownLabel({ children, size }: { children: React.ReactNode; size: 'sm' | 'md' | 'lg' }) {
  return (
    <span className={cn(
      'text-gray-600 font-medium uppercase tracking-wider text-center',
      digitPairWidthClasses[size],
      size === 'sm' ? 'text-xs' : size === 'md' ? 'text-[10px] sm:text-xs md:text-sm' : 'text-sm md:text-base'
    )}>
      {children}
    </span>
  )
}

// Spacer that matches ClockSeparator's horizontal padding
function SeparatorSpacer() {
  return <div className="w-1 sm:w-2 md:w-4" />
}

export function CountdownTimer({
  targetDate,
  className,
  size = 'md',
  showMilestones = true,
}: CountdownTimerProps) {
  const { days, hours, minutes, seconds, isExpired } = useCountdown(targetDate)
  const [milestoneTriggered, setMilestoneTriggered] = useState<string | null>(null)
  const lastMilestone = useRef<string | null>(null)
  const config = sizeConfig[size]
  const isExtraSmall = useMobile(480) // Extra small screens need 2x2 grid

  // Calculate total seconds remaining for milestones
  const totalSeconds = days * 86400 + hours * 3600 + minutes * 60 + seconds

  // Check for milestones
  const milestoneTimeoutRef = useRef<number | null>(null)

  useEffect(() => {
    if (!showMilestones) return

    let milestone: string | null = null

    // Wedding day reached
    if (isExpired && lastMilestone.current !== 'wedding') {
      milestone = 'wedding'
    }
    // Less than 1 hour (exact moment)
    else if (totalSeconds <= 3600 && totalSeconds > 3540 && lastMilestone.current !== 'oneHour') {
      milestone = 'oneHour'
    }
    // Less than 24 hours (exact moment)
    else if (totalSeconds <= 86400 && totalSeconds > 86340 && lastMilestone.current !== 'oneDay') {
      milestone = 'oneDay'
    }

    if (milestone && milestone !== lastMilestone.current) {
      lastMilestone.current = milestone
      setMilestoneTriggered(milestone)

      // Reset after celebration
      if (milestoneTimeoutRef.current) {
        window.clearTimeout(milestoneTimeoutRef.current)
      }
      milestoneTimeoutRef.current = window.setTimeout(() => {
        setMilestoneTriggered(null)
      }, 4000)
    }
  }, [totalSeconds, isExpired, showMilestones])

  useEffect(() => {
    return () => {
      if (milestoneTimeoutRef.current) {
        window.clearTimeout(milestoneTimeoutRef.current)
      }
    }
  }, [])

  // Expired state with celebration
  if (isExpired) {
    return (
      <>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={celebrationVariants}
          className={cn('text-center', className)}
        >
          <motion.p
            className="text-3xl md:text-4xl font-serif text-burgundy"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            ¡El gran día ha llegado!
          </motion.p>
          <motion.div
            className="mt-4 flex justify-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {['❤️', '💒', '💍', '🎊', '❤️'].map((emoji, i) => (
              <motion.span
                key={i}
                className="text-2xl"
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              >
                {emoji}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </>
    )
  }

  return (
    <>
      <div className={cn('relative', className)}>
        {/* Milestone notification */}
        <AnimatePresence>
          {milestoneTriggered && (
            <motion.div
              className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap"
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <span className="bg-gold-warm/20 text-gold-warm px-4 py-2 rounded-full text-sm font-medium">
                {milestoneTriggered === 'oneDay' && '¡Solo queda 1 día! 🎉'}
                {milestoneTriggered === 'oneHour' && '¡Solo queda 1 hora! 💕'}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Flip clock display - 2x2 grid on extra small, three-row layout on larger */}
        {isExtraSmall ? (
          // Extra small: 2x2 grid layout (no separators)
          <div className="grid grid-cols-2 gap-4 max-w-[240px] mx-auto">
            {/* Days */}
            <div className="flex flex-col items-center">
              <motion.div
                className="mb-1"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <CalendarIcon size={18} color="#8d9e78" />
              </motion.div>
              <div className="flex gap-0.5">
                <FlipDigit digit={Math.floor(days / 10)} size={config.digitSize} />
                <FlipDigit digit={days % 10} size={config.digitSize} />
              </div>
              <span className={`mt-1 text-gray-600 font-medium uppercase tracking-wider ${
                size === 'sm' ? 'text-xs' : size === 'md' ? 'text-[10px] sm:text-xs' : 'text-sm'
              }`}>
                Días
              </span>
            </div>
            {/* Hours */}
            <div className="flex flex-col items-center">
              <motion.div
                className="mb-1"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <ClockIcon size={18} color="#8d9e78" />
              </motion.div>
              <div className="flex gap-0.5">
                <FlipDigit digit={Math.floor(hours / 10)} size={config.digitSize} />
                <FlipDigit digit={hours % 10} size={config.digitSize} />
              </div>
              <span className={`mt-1 text-gray-600 font-medium uppercase tracking-wider ${
                size === 'sm' ? 'text-xs' : size === 'md' ? 'text-[10px] sm:text-xs' : 'text-sm'
              }`}>
                Horas
              </span>
            </div>
            {/* Minutes */}
            <div className="flex flex-col items-center">
              <motion.div
                className="mb-1"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <HourglassIcon size={18} color="#8d9e78" />
              </motion.div>
              <div className="flex gap-0.5">
                <FlipDigit digit={Math.floor(minutes / 10)} size={config.digitSize} />
                <FlipDigit digit={minutes % 10} size={config.digitSize} />
              </div>
              <span className={`mt-1 text-gray-600 font-medium uppercase tracking-wider ${
                size === 'sm' ? 'text-xs' : size === 'md' ? 'text-[10px] sm:text-xs' : 'text-sm'
              }`}>
                Min
              </span>
            </div>
            {/* Seconds */}
            <div className="flex flex-col items-center">
              <motion.div
                className="mb-1"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <StopwatchIcon size={18} color="#8d9e78" />
              </motion.div>
              <div className="flex gap-0.5">
                <FlipDigit digit={Math.floor(seconds / 10)} size={config.digitSize} />
                <FlipDigit digit={seconds % 10} size={config.digitSize} />
              </div>
              <span className={`mt-1 text-gray-600 font-medium uppercase tracking-wider ${
                size === 'sm' ? 'text-xs' : size === 'md' ? 'text-[10px] sm:text-xs' : 'text-sm'
              }`}>
                Seg
              </span>
            </div>
          </div>
        ) : (
          // Larger screens: Three-row layout for proper separator alignment
          // This structure ensures separators always align with digits regardless of icon size changes
          <div className="flex flex-col items-center">
            {/* Row 1: Icons - using same widths as digit pairs below */}
            <div className={cn('flex justify-center items-end mb-1 sm:mb-2', config.gap)}>
              <CountdownIcon delay={0.2} size={size}>
                <CalendarIcon size={size === 'sm' ? 20 : size === 'md' ? 24 : 28} color="#8d9e78" />
              </CountdownIcon>
              <SeparatorSpacer />
              <CountdownIcon delay={0.3} size={size}>
                <ClockIcon size={size === 'sm' ? 20 : size === 'md' ? 24 : 28} color="#8d9e78" />
              </CountdownIcon>
              <SeparatorSpacer />
              <CountdownIcon delay={0.4} size={size}>
                <HourglassIcon size={size === 'sm' ? 20 : size === 'md' ? 24 : 28} color="#8d9e78" />
              </CountdownIcon>
              <SeparatorSpacer />
              <CountdownIcon delay={0.5} size={size}>
                <StopwatchIcon size={size === 'sm' ? 20 : size === 'md' ? 24 : 28} color="#8d9e78" />
              </CountdownIcon>
            </div>

            {/* Row 2: Digits with Separators - naturally aligned */}
            <div className={cn('flex justify-center items-center', config.gap)}>
              <DigitPair value={days} size={config.digitSize} />
              <ClockSeparator />
              <DigitPair value={hours} size={config.digitSize} />
              <ClockSeparator />
              <DigitPair value={minutes} size={config.digitSize} />
              <ClockSeparator />
              <DigitPair value={seconds} size={config.digitSize} />
            </div>

            {/* Row 3: Labels - matching digit pair widths */}
            <div className={cn('flex justify-center items-start mt-1 sm:mt-2', config.gap)}>
              <CountdownLabel size={size}>Días</CountdownLabel>
              <SeparatorSpacer />
              <CountdownLabel size={size}>Horas</CountdownLabel>
              <SeparatorSpacer />
              <CountdownLabel size={size}>Min</CountdownLabel>
              <SeparatorSpacer />
              <CountdownLabel size={size}>Seg</CountdownLabel>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

// Optional: Progress ring component for visual countdown
interface CountdownProgressProps {
  targetDate: Date
  startDate?: Date
  size?: number
  strokeWidth?: number
}

export function CountdownProgress({
  targetDate,
  startDate,
  size = 120,
  strokeWidth = 8,
}: CountdownProgressProps) {
  const { isExpired } = useCountdown(targetDate)
  const [progress, setProgress] = useState(0)
  const startRef = useRef<Date | null>(startDate ?? null)

  useEffect(() => {
    if (!startRef.current) {
      startRef.current = new Date()
    }
    const total = targetDate.getTime() - startRef.current.getTime()
    if (total <= 0) {
      setProgress(1)
      return
    }
    const remaining = targetDate.getTime() - Date.now()
    const currentProgress = Math.max(0, Math.min(1, 1 - remaining / total))
    setProgress(currentProgress)
  }, [targetDate])

  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI

  if (isExpired) {
    return (
      <motion.div
        className="flex items-center justify-center"
        style={{ width: size, height: size }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        <span className="text-3xl">💍</span>
      </motion.div>
    )
  }

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-gray-200"
        />

        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#progressGradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          custom={progress}
          variants={ringVariants}
          initial="initial"
          animate="animate"
          style={{
            strokeDashoffset: circumference * (1 - progress),
          }}
        />

        {/* Gradient definition */}
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8d9e78" />
            <stop offset="50%" stopColor="#c19a5b" />
            <stop offset="100%" stopColor="#800020" />
          </linearGradient>
        </defs>
      </svg>

      {/* Center percentage */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.span
          className="text-lg font-semibold text-olive"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {Math.round(progress * 100)}%
        </motion.span>
      </div>
    </div>
  )
}
