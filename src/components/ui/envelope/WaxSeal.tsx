import { motion, type Variants } from 'framer-motion'

interface WaxSealProps {
  isBreaking: boolean
  onBreakComplete?: () => void
  size?: 'medium' | 'large' | 'xlarge'
}

// Subtle pulse glow animation for idle state
const pulseVariants: Variants = {
  animate: {
    boxShadow: [
      '0 0 20px rgba(193, 154, 91, 0.3)',
      '0 0 40px rgba(193, 154, 91, 0.5)',
      '0 0 20px rgba(193, 154, 91, 0.3)',
    ],
    transition: {
      duration: 2,
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
      ease: [0.22, 1, 0.36, 1],
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

export function WaxSeal({ isBreaking, onBreakComplete, size = 'medium' }: WaxSealProps) {
  const config = sizeConfig[size]

  return (
    <div
      className="absolute z-20 inset-0 flex items-center justify-center pointer-events-none"
    >
      <motion.div
        className="flex items-center justify-center pointer-events-auto"
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
          background: 'radial-gradient(circle, rgba(193, 154, 91, 0.25) 0%, transparent 70%)',
        }}
        variants={!isBreaking ? pulseVariants : undefined}
        animate={!isBreaking ? 'animate' : undefined}
      />

      {/* Main seal */}
      <motion.div
        className={`relative ${config.seal} rounded-full flex items-center justify-center`}
        style={{
          background: 'linear-gradient(145deg, #d4a857 0%, #c19a5b 50%, #a17d42 100%)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 2px 4px rgba(255, 255, 255, 0.2)',
        }}
        variants={!isBreaking ? pulseVariants : undefined}
        animate={!isBreaking ? 'animate' : undefined}
      >
        {/* Inner circle decoration */}
        <div
          className="absolute w-[85%] h-[85%] rounded-full"
          style={{
            border: '2px solid rgba(255, 255, 255, 0.15)',
          }}
        />

        {/* Elegant Interlocking Rings SVG */}
        <svg
          viewBox="0 0 40 40"
          className={config.svg}
          fill="none"
        >
          <defs>
            {/* Gold metallic gradient - elegant warm tones */}
            <linearGradient id="goldMetal" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e8d5a3" />
              <stop offset="30%" stopColor="#d4b86a" />
              <stop offset="60%" stopColor="#c9a84c" />
              <stop offset="100%" stopColor="#a68a3a" />
            </linearGradient>

            {/* Inner highlight for 3D effect */}
            <linearGradient id="goldInner" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f5ecd3" />
              <stop offset="50%" stopColor="#d9c27a" />
              <stop offset="100%" stopColor="#b8984a" />
            </linearGradient>

            {/* Dark edge for depth */}
            <linearGradient id="goldEdge" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b7335" />
              <stop offset="100%" stopColor="#6b5625" />
            </linearGradient>
          </defs>

          {/* Subtle shadow for depth */}
          <circle cx="17.5" cy="20.5" r="9" fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="2.5" />
          <circle cx="23.5" cy="20.5" r="9" fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="2.5" />

          {/* Right ring - BACK half (behind left ring) */}
          {/* Circumference = 2 * PI * 9 ≈ 56.55, half = 28.27 */}
          <circle
            cx="23"
            cy="20"
            r="9"
            fill="none"
            stroke="url(#goldEdge)"
            strokeWidth="2.8"
            strokeDasharray="28.27 28.27"
            strokeDashoffset="-14.14"
          />
          <circle
            cx="23"
            cy="20"
            r="9"
            fill="none"
            stroke="url(#goldMetal)"
            strokeWidth="2.2"
            strokeDasharray="28.27 28.27"
            strokeDashoffset="-14.14"
          />
          <circle
            cx="23"
            cy="20"
            r="9"
            fill="none"
            stroke="url(#goldInner)"
            strokeWidth="1"
            strokeDasharray="28.27 28.27"
            strokeDashoffset="-14.14"
            opacity="0.6"
          />

          {/* Left ring - COMPLETE */}
          <circle cx="17" cy="20" r="9" fill="none" stroke="url(#goldEdge)" strokeWidth="2.8" />
          <circle cx="17" cy="20" r="9" fill="none" stroke="url(#goldMetal)" strokeWidth="2.2" />
          <circle cx="17" cy="20" r="9" fill="none" stroke="url(#goldInner)" strokeWidth="1" opacity="0.6" />

          {/* Right ring - FRONT half (in front of left ring) */}
          <circle
            cx="23"
            cy="20"
            r="9"
            fill="none"
            stroke="url(#goldEdge)"
            strokeWidth="2.8"
            strokeDasharray="28.27 28.27"
            strokeDashoffset="14.14"
          />
          <circle
            cx="23"
            cy="20"
            r="9"
            fill="none"
            stroke="url(#goldMetal)"
            strokeWidth="2.2"
            strokeDasharray="28.27 28.27"
            strokeDashoffset="14.14"
          />
          <circle
            cx="23"
            cy="20"
            r="9"
            fill="none"
            stroke="url(#goldInner)"
            strokeWidth="1"
            strokeDasharray="28.27 28.27"
            strokeDashoffset="14.14"
            opacity="0.6"
          />
        </svg>

        {/* Subtle texture overlay */}
        <div
          className="absolute inset-0 rounded-full opacity-30"
          style={{
            backgroundImage: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4) 0%, transparent 50%)',
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
            color: 'rgba(161, 125, 66, 0.9)',
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
            stroke="rgba(161, 125, 66, 0.6)"
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
