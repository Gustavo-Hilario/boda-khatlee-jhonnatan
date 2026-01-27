import { motion, type Variants, useAnimation } from 'framer-motion'
import { useEffect, useState, useCallback } from 'react'

interface WaxSealProps {
  isBreaking: boolean
  onBreakComplete?: () => void
  size?: 'medium' | 'large' | 'xlarge'
}

// Olive color palette for seal body
const OLIVE = {
  main: '#a8b894',
  light: '#c4d0b4',
  dark: '#8fa37a',
  glow: 'rgba(168, 184, 148, 0.3)',
}

// Gold color palette for rings
const GOLD = {
  main: '#c19a5b',
  light: '#d4b87a',
  bright: '#f0d890',
  dark: '#a07840',
  glow: 'rgba(193, 154, 91, 0.5)',
}

// Diamond colors
const DIAMOND = {
  main: '#e8f4fc',
  facet1: '#d0e8f8',
  facet2: '#b8dcf4',
  sparkle: '#ffffff',
  blue: '#a8d4f0',
}

// Elegant easing for smooth animations
const elegantEase = [0.22, 1, 0.36, 1] as const

// Subtle breathing animation for idle state
const breatheVariants: Variants = {
  animate: {
    scale: [1, 1.03, 1],
    transition: {
      duration: 2.5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

// Subtle glow pulse
const glowVariants: Variants = {
  animate: {
    opacity: [0.4, 0.7, 0.4],
    transition: {
      duration: 2.5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

// Break animation - seal lifts and floats away
const breakVariants: Variants = {
  initial: {
    y: 0,
    scale: 1,
    opacity: 1,
    rotate: 0,
  },
  breaking: {
    y: -200,
    scale: 1.2,
    opacity: 0,
    rotate: 20,
    transition: {
      duration: 0.7,
      ease: elegantEase,
    },
  },
}

// Size configurations
const sizeConfig = {
  medium: {
    seal: 'w-16 h-16 md:w-20 md:h-20',
    glow: 'w-24 h-24 md:w-28 md:h-28',
    svg: 'w-10 h-10 md:w-12 md:h-12',
    textTop: '-top-14',
    textSize: 'text-xs md:text-sm',
  },
  large: {
    seal: 'w-24 h-24 md:w-28 md:h-28',
    glow: 'w-36 h-36 md:w-40 md:h-40',
    svg: 'w-14 h-14 md:w-16 md:h-16',
    textTop: '-top-16',
    textSize: 'text-sm md:text-base',
  },
  xlarge: {
    seal: 'w-28 h-28 md:w-36 md:h-36',
    glow: 'w-44 h-44 md:w-52 md:h-52',
    svg: 'w-16 h-16 md:w-20 md:h-20',
    textTop: '-top-20',
    textSize: 'text-base md:text-lg',
  },
}

// Diamond component - brilliant cut viewed from above
function Diamond({
  cx,
  cy,
  size,
  sparkleIntensity = 0,
}: {
  cx: number
  cy: number
  size: number
  sparkleIntensity: number
}) {
  const s = size / 2

  return (
    <g>
      {/* Diamond glow - soft and subtle */}
      <motion.ellipse
        cx={cx}
        cy={cy}
        rx={s * 1.2}
        ry={s * 1}
        fill={DIAMOND.blue}
        initial={{ opacity: 0 }}
        animate={{ opacity: sparkleIntensity * 0.15 }}
        style={{ filter: 'blur(2px)' }}
      />

      {/* Main diamond body - octagonal brilliant cut */}
      <polygon
        points={`
          ${cx},${cy - s}
          ${cx + s * 0.7},${cy - s * 0.7}
          ${cx + s},${cy}
          ${cx + s * 0.7},${cy + s * 0.7}
          ${cx},${cy + s}
          ${cx - s * 0.7},${cy + s * 0.7}
          ${cx - s},${cy}
          ${cx - s * 0.7},${cy - s * 0.7}
        `}
        fill={DIAMOND.main}
        stroke={DIAMOND.facet2}
        strokeWidth="0.3"
      />

      {/* Inner facets - table */}
      <polygon
        points={`
          ${cx},${cy - s * 0.5}
          ${cx + s * 0.35},${cy - s * 0.35}
          ${cx + s * 0.5},${cy}
          ${cx + s * 0.35},${cy + s * 0.35}
          ${cx},${cy + s * 0.5}
          ${cx - s * 0.35},${cy + s * 0.35}
          ${cx - s * 0.5},${cy}
          ${cx - s * 0.35},${cy - s * 0.35}
        `}
        fill={DIAMOND.facet1}
        stroke={DIAMOND.facet2}
        strokeWidth="0.2"
      />

      {/* Facet lines radiating from center */}
      <line x1={cx} y1={cy - s} x2={cx} y2={cy - s * 0.5} stroke={DIAMOND.facet2} strokeWidth="0.2" />
      <line x1={cx + s * 0.7} y1={cy - s * 0.7} x2={cx + s * 0.35} y2={cy - s * 0.35} stroke={DIAMOND.facet2} strokeWidth="0.2" />
      <line x1={cx + s} y1={cy} x2={cx + s * 0.5} y2={cy} stroke={DIAMOND.facet2} strokeWidth="0.2" />
      <line x1={cx + s * 0.7} y1={cy + s * 0.7} x2={cx + s * 0.35} y2={cy + s * 0.35} stroke={DIAMOND.facet2} strokeWidth="0.2" />
      <line x1={cx} y1={cy + s} x2={cx} y2={cy + s * 0.5} stroke={DIAMOND.facet2} strokeWidth="0.2" />
      <line x1={cx - s * 0.7} y1={cy + s * 0.7} x2={cx - s * 0.35} y2={cy + s * 0.35} stroke={DIAMOND.facet2} strokeWidth="0.2" />
      <line x1={cx - s} y1={cy} x2={cx - s * 0.5} y2={cy} stroke={DIAMOND.facet2} strokeWidth="0.2" />
      <line x1={cx - s * 0.7} y1={cy - s * 0.7} x2={cx - s * 0.35} y2={cy - s * 0.35} stroke={DIAMOND.facet2} strokeWidth="0.2" />

      {/* Sparkle highlights - soft and subtle */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: sparkleIntensity * 0.5 }}
        style={{ filter: 'blur(0.5px)' }}
      >
        {/* Main sparkle cross - softer */}
        <line
          x1={cx - s * 0.6} y1={cy}
          x2={cx + s * 0.6} y2={cy}
          stroke={DIAMOND.sparkle}
          strokeWidth="0.5"
          strokeLinecap="round"
          opacity={0.5}
        />
        <line
          x1={cx} y1={cy - s * 0.6}
          x2={cx} y2={cy + s * 0.6}
          stroke={DIAMOND.sparkle}
          strokeWidth="0.5"
          strokeLinecap="round"
          opacity={0.5}
        />
        {/* Diagonal sparkles - very subtle */}
        <line
          x1={cx - s * 0.4} y1={cy - s * 0.4}
          x2={cx + s * 0.4} y2={cy + s * 0.4}
          stroke={DIAMOND.sparkle}
          strokeWidth="0.3"
          strokeLinecap="round"
          opacity={0.3}
        />
        <line
          x1={cx + s * 0.4} y1={cy - s * 0.4}
          x2={cx - s * 0.4} y2={cy + s * 0.4}
          stroke={DIAMOND.sparkle}
          strokeWidth="0.3"
          strokeLinecap="round"
          opacity={0.3}
        />
      </motion.g>

      {/* Center highlight dot - softer */}
      <circle cx={cx} cy={cy} r={s * 0.12} fill={DIAMOND.sparkle} opacity={0.5} style={{ filter: 'blur(0.3px)' }} />
    </g>
  )
}

// Prong/setting for diamond
function DiamondSetting({ cx, cy, size }: { cx: number; cy: number; size: number }) {
  const s = size / 2
  return (
    <g>
      {/* Four prongs holding the diamond */}
      <circle cx={cx - s * 0.9} cy={cy} r={0.8} fill={GOLD.light} />
      <circle cx={cx + s * 0.9} cy={cy} r={0.8} fill={GOLD.light} />
      <circle cx={cx} cy={cy - s * 0.9} r={0.8} fill={GOLD.light} />
      <circle cx={cx} cy={cy + s * 0.9} r={0.8} fill={GOLD.light} />
    </g>
  )
}

// Sparkle burst effect - soft and subtle
function SparkleBurst({
  cx,
  cy,
  isActive,
  delay = 0,
}: {
  cx: number
  cy: number
  isActive: boolean
  delay?: number
}) {
  return (
    <motion.g
      initial={{ scale: 0, opacity: 0 }}
      animate={isActive ? {
        scale: [0, 1.2, 0],
        opacity: [0, 0.6, 0],
      } : {}}
      transition={{
        duration: 0.8,
        delay,
        ease: elegantEase,
      }}
      style={{ filter: 'blur(0.3px)' }}
    >
      {/* Four-pointed star sparkle - smaller and softer */}
      <path
        d={`M${cx},${cy - 3} L${cx + 0.8},${cy} L${cx},${cy + 3} L${cx - 0.8},${cy} Z
            M${cx - 3},${cy} L${cx},${cy + 0.8} L${cx + 3},${cy} L${cx},${cy - 0.8} Z`}
        fill={DIAMOND.sparkle}
        opacity={0.7}
      />
    </motion.g>
  )
}

export function WaxSeal({ isBreaking, onBreakComplete, size = 'medium' }: WaxSealProps) {
  const config = sizeConfig[size]
  const [animationPhase, setAnimationPhase] = useState<'entering' | 'interlocking' | 'sparkling' | 'idle'>('entering')
  const [sparkleIntensity, setSparkleIntensity] = useState(0)

  const leftRingControls = useAnimation()
  const rightRingControls = useAnimation()
  const diamondControls = useAnimation()

  const runAnimationSequence = useCallback(async () => {
    if (isBreaking) return

    // Reset to initial state
    leftRingControls.set({
      x: -8,
      scaleX: 0.3,
      opacity: 0,
      rotate: -90,
    })
    rightRingControls.set({
      x: 8,
      scaleX: 0.3,
      opacity: 0,
      rotate: 90,
    })
    diamondControls.set({
      scale: 0,
      opacity: 0,
    })
    setSparkleIntensity(0)

    // Phase 1: Rings enter from sides, appearing to rotate in 3D
    setAnimationPhase('entering')

    // Left ring sweeps in
    leftRingControls.start({
      x: 0,
      scaleX: 1,
      opacity: 1,
      rotate: 0,
      transition: {
        duration: 1.2,
        ease: elegantEase,
      },
    })

    // Right ring sweeps in (slight delay)
    await new Promise(resolve => setTimeout(resolve, 200))
    await rightRingControls.start({
      x: 0,
      scaleX: 1,
      opacity: 1,
      rotate: 0,
      transition: {
        duration: 1.2,
        ease: elegantEase,
      },
    })

    // Phase 2: Rings interlock with satisfying "click"
    setAnimationPhase('interlocking')

    // Quick scale pulse to simulate "clicking" together
    leftRingControls.start({
      scale: [1, 1.08, 1],
      transition: { duration: 0.4, ease: elegantEase },
    })
    rightRingControls.start({
      scale: [1, 1.08, 1],
      transition: { duration: 0.4, ease: elegantEase, delay: 0.05 },
    })

    // Diamond appears with dramatic entrance
    await diamondControls.start({
      scale: [0, 1.3, 1],
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: elegantEase,
        delay: 0.2,
      },
    })

    // Diamond sparkle - soft glow
    setSparkleIntensity(0.6)

    // Phase 3: Sparkle burst
    setAnimationPhase('sparkling')
    await new Promise(resolve => setTimeout(resolve, 800))

    // Phase 4: Idle with subtle animations
    setAnimationPhase('idle')

    // Idle sparkle animation - soft pulsing
    const sparkleLoop = async () => {
      while (true) {
        await new Promise(resolve => setTimeout(resolve, 2500))
        setSparkleIntensity(0.2)
        await new Promise(resolve => setTimeout(resolve, 400))
        setSparkleIntensity(0.6)
        await new Promise(resolve => setTimeout(resolve, 300))
        setSparkleIntensity(0.4)
      }
    }

    // Start sparkle loop (will be cleaned up by effect)
    sparkleLoop()

  }, [isBreaking, leftRingControls, rightRingControls, diamondControls])

  // Initial animation and repeat
  useEffect(() => {
    if (isBreaking) return

    let mounted = true
    let timeoutId: ReturnType<typeof setTimeout>

    const runAndRepeat = async () => {
      if (!mounted) return
      await runAnimationSequence()

      // Wait 6 seconds then repeat
      timeoutId = setTimeout(() => {
        if (mounted) runAndRepeat()
      }, 6000)
    }

    runAndRepeat()

    return () => {
      mounted = false
      clearTimeout(timeoutId)
    }
  }, [isBreaking, runAnimationSequence])

  return (
    <div className="absolute z-20 inset-0 flex items-center justify-center pointer-events-none">
      <motion.div
        className="relative flex items-center justify-center pointer-events-auto"
        variants={breakVariants}
        initial="initial"
        animate={isBreaking ? 'breaking' : 'initial'}
        onAnimationComplete={() => {
          if (isBreaking && onBreakComplete) {
            onBreakComplete()
          }
        }}
      >
        {/* Outer glow ring */}
        <motion.div
          className={`absolute ${config.glow} rounded-full`}
          style={{
            background: `radial-gradient(circle, ${OLIVE.glow} 0%, transparent 70%)`,
          }}
          variants={!isBreaking ? glowVariants : undefined}
          animate={!isBreaking ? 'animate' : undefined}
        />

        {/* Main seal */}
        <motion.div
          className={`relative ${config.seal} rounded-full flex items-center justify-center`}
          style={{
            background: `linear-gradient(145deg, ${OLIVE.light} 0%, ${OLIVE.main} 50%, ${OLIVE.dark} 100%)`,
            boxShadow: `0 6px 24px rgba(143, 163, 122, 0.4), inset 0 1px 3px rgba(255, 255, 255, 0.15)`,
          }}
          variants={!isBreaking ? breatheVariants : undefined}
          animate={!isBreaking ? 'animate' : undefined}
        >
          {/* Inner circle decoration */}
          <div
            className="absolute w-[85%] h-[85%] rounded-full"
            style={{
              border: '1.5px solid rgba(255, 255, 255, 0.25)',
            }}
          />

          {/* Animated Interlocking Diamond Rings SVG */}
          <svg viewBox="0 0 40 40" className={config.svg} fill="none">
            <defs>
              {/* Gold gradient for rings */}
              <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={GOLD.light} />
                <stop offset="50%" stopColor={GOLD.main} />
                <stop offset="100%" stopColor={GOLD.dark} />
              </linearGradient>

              {/* Glow filter */}
              <filter id="ringGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="1" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Diamond sparkle filter - softer glow */}
              <filter id="diamondGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="0.8" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Ring glow layer */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: animationPhase === 'idle' ? [0.2, 0.4, 0.2] : 0.3 }}
              transition={
                animationPhase === 'idle'
                  ? { duration: 3, repeat: Infinity, ease: 'easeInOut' }
                  : { duration: 0.3 }
              }
              filter="url(#ringGlow)"
            >
              <circle cx="16" cy="20" r="8" fill="none" stroke={GOLD.glow} strokeWidth="3" />
              <circle cx="24" cy="20" r="8" fill="none" stroke={GOLD.glow} strokeWidth="3" />
            </motion.g>

            {/* Left ring (with diamond) */}
            <motion.g
              initial={{ x: -8, scaleX: 0.3, opacity: 0, rotate: -90 }}
              animate={leftRingControls}
              style={{ transformOrigin: '16px 20px' }}
            >
              {/* Ring band */}
              <circle
                cx="16"
                cy="20"
                r="8"
                fill="none"
                stroke="url(#goldGradient)"
                strokeWidth="2"
              />
              {/* Inner edge highlight */}
              <circle
                cx="16"
                cy="20"
                r="7"
                fill="none"
                stroke={GOLD.light}
                strokeWidth="0.5"
                opacity={0.5}
              />
            </motion.g>

            {/* Right ring - back portion (behind left ring) */}
            <motion.g
              initial={{ x: 8, scaleX: 0.3, opacity: 0, rotate: 90 }}
              animate={rightRingControls}
              style={{ transformOrigin: '24px 20px' }}
            >
              <circle
                cx="24"
                cy="20"
                r="8"
                fill="none"
                stroke="url(#goldGradient)"
                strokeWidth="2"
                strokeDasharray="25.13 25.13"
                strokeDashoffset="-12.57"
              />
            </motion.g>

            {/* Diamond with setting - positioned at top of left ring */}
            <motion.g
              initial={{ scale: 0, opacity: 0 }}
              animate={diamondControls}
              style={{ transformOrigin: '16px 12px' }}
              filter="url(#diamondGlow)"
            >
              <Diamond cx={16} cy={12} size={5} sparkleIntensity={sparkleIntensity} />
              <DiamondSetting cx={16} cy={12} size={5} />
            </motion.g>

            {/* Right ring - front portion (in front of left ring) */}
            <motion.g
              initial={{ x: 8, scaleX: 0.3, opacity: 0, rotate: 90 }}
              animate={rightRingControls}
              style={{ transformOrigin: '24px 20px' }}
            >
              <circle
                cx="24"
                cy="20"
                r="8"
                fill="none"
                stroke="url(#goldGradient)"
                strokeWidth="2"
                strokeDasharray="25.13 25.13"
                strokeDashoffset="12.57"
              />
              {/* Inner edge highlight */}
              <circle
                cx="24"
                cy="20"
                r="7"
                fill="none"
                stroke={GOLD.light}
                strokeWidth="0.5"
                opacity={0.5}
                strokeDasharray="25.13 25.13"
                strokeDashoffset="12.57"
              />
            </motion.g>

            {/* Sparkle bursts around diamond */}
            <SparkleBurst cx={16} cy={5} isActive={animationPhase === 'sparkling'} delay={0} />
            <SparkleBurst cx={10} cy={10} isActive={animationPhase === 'sparkling'} delay={0.1} />
            <SparkleBurst cx={22} cy={10} isActive={animationPhase === 'sparkling'} delay={0.15} />
            <SparkleBurst cx={8} cy={16} isActive={animationPhase === 'sparkling'} delay={0.2} />
            <SparkleBurst cx={24} cy={6} isActive={animationPhase === 'sparkling'} delay={0.25} />

            {/* Idle twinkle effects - soft and subtle */}
            {animationPhase === 'idle' && (
              <>
                <motion.circle
                  cx="16"
                  cy="6"
                  r="0.6"
                  fill={DIAMOND.sparkle}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 0.5, 0],
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3,
                    ease: 'easeInOut',
                  }}
                  style={{ filter: 'blur(0.3px)' }}
                />
                <motion.circle
                  cx="28"
                  cy="20"
                  r="0.5"
                  fill={GOLD.bright}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 0.4, 0],
                    scale: [0, 0.8, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: 4,
                    delay: 1.5,
                    ease: 'easeInOut',
                  }}
                  style={{ filter: 'blur(0.2px)' }}
                />
              </>
            )}
          </svg>

          {/* Subtle highlight overlay */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              backgroundImage: 'radial-gradient(circle at 35% 35%, rgba(255,255,255,0.25) 0%, transparent 50%)',
            }}
          />
        </motion.div>

        {/* "Ver invitación" text and chevron above the seal */}
        <motion.div
          className={`absolute ${config.textTop} left-1/2 -translate-x-1/2 whitespace-nowrap flex flex-col items-center`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isBreaking ? 0 : 1, y: isBreaking ? -10 : 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <span
            className={`${config.textSize} tracking-[0.25em] uppercase font-light`}
            style={{
              color: OLIVE.dark,
              textShadow: '0 1px 2px rgba(255,255,255,0.5)',
            }}
          >
            Ver invitación
          </span>

          {/* Chevron icon below text */}
          <motion.div
            className="mt-2"
            animate={{
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <svg
              viewBox="0 0 24 24"
              className="w-4 h-4 md:w-5 md:h-5"
              fill="none"
              stroke={OLIVE.main}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="7 10 12 15 17 10" />
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}
