import { motion, type MotionValue } from 'framer-motion'

interface TimelinePathProps {
  progress: MotionValue<number>
  eventCount: number
  activeIndex: number
  className?: string
}

export function TimelinePath({
  progress,
  eventCount,
  activeIndex,
  className = '',
}: TimelinePathProps) {
  // Generate smooth curve path based on event count
  const generatePath = (width: number, eventCount: number) => {
    const padding = width * 0.08 // 8% padding on each side
    const usableWidth = width - padding * 2
    const spacing = usableWidth / (eventCount - 1)

    let path = `M ${padding} 50`

    for (let i = 1; i < eventCount; i++) {
      const prevX = padding + spacing * (i - 1)
      const currentX = padding + spacing * i
      const midX = (prevX + currentX) / 2

      // Create gentle wave pattern
      const waveHeight = i % 2 === 0 ? 35 : 65

      path += ` Q ${midX} ${waveHeight} ${currentX} 50`
    }

    return path
  }

  const pathD = generatePath(900, eventCount)

  // Calculate stop positions for markers
  const getStopPosition = (index: number, total: number, width: number) => {
    const padding = width * 0.08
    const usableWidth = width - padding * 2
    const spacing = usableWidth / (total - 1)
    return padding + spacing * index
  }

  return (
    <svg
      className={`absolute top-8 left-0 w-full h-24 pointer-events-none ${className}`}
      viewBox="0 0 900 100"
      preserveAspectRatio="none"
    >
      <defs>
        {/* Gradient for the path */}
        <linearGradient id="timeline-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8d9e78" stopOpacity="0.4" />
          <stop offset="30%" stopColor="#8d9e78" />
          <stop offset="50%" stopColor="#c19a5b" />
          <stop offset="70%" stopColor="#c19a5b" />
          <stop offset="100%" stopColor="#800020" stopOpacity="0.4" />
        </linearGradient>

        {/* Glow filter */}
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Stronger glow for active elements */}
        <filter id="glow-strong" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feFlood floodColor="#c19a5b" floodOpacity="0.6" result="color" />
          <feComposite in="color" in2="blur" operator="in" result="shadow" />
          <feMerge>
            <feMergeNode in="shadow" />
            <feMergeNode in="shadow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background path (faded guide) */}
      <motion.path
        d={pathD}
        stroke="url(#timeline-gradient)"
        strokeWidth="2"
        fill="none"
        opacity="0.15"
        strokeLinecap="round"
      />

      {/* Animated foreground path */}
      <motion.path
        d={pathD}
        stroke="url(#timeline-gradient)"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        filter="url(#glow)"
        style={{
          pathLength: progress,
        }}
        initial={{ pathLength: 0 }}
      />

      {/* Stop markers */}
      {Array.from({ length: eventCount }).map((_, i) => {
        const cx = getStopPosition(i, eventCount, 900)
        const isActive = activeIndex === i
        const isPast = i < activeIndex || activeIndex === -1

        return (
          <g key={i}>
            {/* Outer glow ring for active */}
            {isActive && (
              <motion.circle
                cx={cx}
                cy={50}
                r={16}
                fill="none"
                stroke="#c19a5b"
                strokeWidth="2"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.6, 0, 0.6],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            )}

            {/* Main marker */}
            <motion.circle
              cx={cx}
              cy={50}
              r={isActive ? 10 : 7}
              fill={isActive ? '#c19a5b' : isPast ? '#8d9e78' : '#d4d4d4'}
              filter={isActive ? 'url(#glow-strong)' : undefined}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                delay: 0.3 + i * 0.1,
                type: 'spring',
                stiffness: 300,
                damping: 20,
              }}
            />

            {/* Inner highlight */}
            <motion.circle
              cx={cx}
              cy={48}
              r={isActive ? 3 : 2}
              fill="rgba(255,255,255,0.6)"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                delay: 0.4 + i * 0.1,
                type: 'spring',
                stiffness: 400,
              }}
            />
          </g>
        )
      })}

      {/* Traveling particle effect */}
      <motion.circle
        cx={0}
        cy={50}
        r={5}
        fill="#c19a5b"
        filter="url(#glow-strong)"
        style={{
          offsetPath: `path('${pathD}')`,
          offsetDistance: progress,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{
          duration: 3,
          delay: 0.5,
          times: [0, 0.1, 0.9, 1],
        }}
      />
    </svg>
  )
}

// Simple horizontal line variant for mobile
export function TimelinePathSimple({
  progress,
  className = '',
}: {
  progress: MotionValue<number>
  className?: string
}) {
  return (
    <div className={`relative h-1 bg-olive/20 rounded-full overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-y-0 left-0 bg-gradient-to-r from-olive via-gold-warm to-burgundy rounded-full"
        style={{ scaleX: progress, transformOrigin: 'left' }}
      />
    </div>
  )
}
