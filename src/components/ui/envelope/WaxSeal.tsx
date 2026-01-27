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
    <motion.div
      className="absolute z-20 flex items-center justify-center"
      style={{
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
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

        {/* Interlocking rings SVG */}
        <svg
          viewBox="0 0 48 48"
          className={config.svg}
          fill="none"
          stroke="rgba(255, 255, 255, 0.85)"
          strokeWidth="1.5"
        >
          {/* Left ring */}
          <circle cx="18" cy="24" r="8" />
          {/* Right ring */}
          <circle cx="30" cy="24" r="8" />
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
            y: [0, 5, 0],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5 md:w-6 md:h-6"
            fill="none"
            stroke="rgba(161, 125, 66, 0.7)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
