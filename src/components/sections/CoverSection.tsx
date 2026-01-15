import { useState } from 'react'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { useMusic } from '../../context/MusicContext'
import { getAssetPath } from '../../utils/assets'
import { useMobile } from '../../hooks/useMobile'

interface CoverSectionProps {
  onOpen?: () => void
}

// Card floating animation
const cardVariants: Variants = {
  initial: {
    scale: 0.9,
    opacity: 0,
    y: 20,
  },
  animate: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  hover: {
    scale: 1.02,
    y: -5,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
  tap: {
    scale: 0.98,
    transition: {
      duration: 0.1,
    },
  },
}

// Continuous subtle float animation for the card
const floatVariants: Variants = {
  animate: {
    y: [0, -8, 0],
    rotate: [-0.5, 0.5, -0.5],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

// Ken Burns effect for background - mobile-aware
const getKenBurnsVariants = (isMobile: boolean): Variants => ({
  animate: {
    scale: [1, isMobile ? 1.06 : 1.15],
    x: ['0%', isMobile ? '1%' : '3%'],
    y: ['0%', isMobile ? '0.5%' : '2%'],
    transition: {
      duration: isMobile ? 25 : 18,
      repeat: Infinity,
      repeatType: 'reverse',
      ease: 'linear',
    },
  },
})

// Arrow with glow pulse
const arrowVariants: Variants = {
  animate: {
    y: [0, 12, 0],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

// Glow ring animation
const glowRingVariants: Variants = {
  animate: {
    scale: [1, 1.5, 1],
    opacity: [0.5, 0, 0.5],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

// Text reveal animation
const textVariants: Variants = {
  initial: { opacity: 0, y: 20, filter: 'blur(4px)' },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      delay: 0.6,
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

// Shimmer effect for text
const shimmerVariants: Variants = {
  animate: {
    backgroundPosition: ['200% center', '-200% center'],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'linear',
    },
  },
}

export function CoverSection({ onOpen }: CoverSectionProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { togglePlay, hasInteracted } = useMusic()
  const isMobile = useMobile()
  const kenBurnsVariants = getKenBurnsVariants(isMobile)

  const handleOpen = () => {
    setIsOpen(true)

    // Prompt to play music if user hasn't interacted yet
    if (!hasInteracted) {
      setTimeout(() => {
        togglePlay()
      }, 400)
    }

    onOpen?.()
  }

  return (
    <>

      <AnimatePresence>
        {!isOpen && (
          <motion.button
            id="cover"
            type="button"
            className="fixed inset-0 z-50 cursor-pointer overflow-hidden border-0 p-0 bg-transparent text-left focus:outline-none"
            onClick={handleOpen}
            aria-label="Abrir invitación"
            initial={{ y: 0 }}
            exit={{
              y: '-100%',
              transition: {
                duration: 1.2,
                ease: [0.43, 0.13, 0.23, 0.96],
                delay: 0.2,
              },
            }}
          >
            {/* Background with Ken Burns effect */}
            <motion.div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${getAssetPath('images/portada/Fondo.jpg')}')` }}
              variants={kenBurnsVariants}
              animate="animate"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/40" />

            {/* Vignette effect */}
            <div
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%)',
              }}
            />

            {/* Content */}
            <div className="relative h-full flex flex-col items-center justify-center px-4">
              {/* Floating card with shadow */}
              <motion.div
                className="relative"
                variants={floatVariants}
                animate="animate"
              >
                {/* Card glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-lg"
                  style={{
                    background: 'radial-gradient(ellipse at center, rgba(193, 154, 91, 0.3) 0%, transparent 70%)',
                    filter: 'blur(20px)',
                  }}
                  animate={{
                    opacity: [0.5, 0.8, 0.5],
                    scale: [0.95, 1.05, 0.95],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />

                {/* Envelope/Card image */}
                <motion.img
                  src={getAssetPath('images/portada/Tarjeta.png')}
                  alt="Invitación de boda"
                  className="relative w-full max-w-[400px] md:max-w-[600px] lg:max-w-[800px] drop-shadow-2xl"
                  variants={cardVariants}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                  whileTap="tap"
                  style={{
                    filter: 'drop-shadow(0 25px 50px rgba(0, 0, 0, 0.4))',
                  }}
                />
              </motion.div>

              {/* Tap to open text with shimmer */}
              <motion.div
                className="mt-8 relative"
                variants={textVariants}
                initial="initial"
                animate="animate"
              >
                <motion.p
                  className="text-white/90 text-sm tracking-[0.3em] uppercase font-light"
                  variants={shimmerVariants}
                  animate="animate"
                  style={{
                    background: 'linear-gradient(90deg, rgba(255,255,255,0.9) 0%, rgba(193,154,91,1) 50%, rgba(255,255,255,0.9) 100%)',
                    backgroundSize: '200% 100%',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Toca para abrir
                </motion.p>
              </motion.div>

              {/* Animated arrow with glow */}
              <div className="mt-4 relative">
                {/* Glow ring behind arrow */}
                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-gold-warm/30"
                  variants={glowRingVariants}
                  animate="animate"
                />

                <motion.div
                  variants={arrowVariants}
                  animate="animate"
                  className="relative"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="white"
                    className="w-6 h-6"
                    style={{
                      filter: 'drop-shadow(0 0 8px rgba(193, 154, 91, 0.6))',
                    }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </motion.div>
              </div>

              {/* Decorative corner flourishes */}
              <motion.div
                className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-white/20 rounded-tl-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              />
              <motion.div
                className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-white/20 rounded-tr-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9, duration: 0.6 }}
              />
              <motion.div
                className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-white/20 rounded-bl-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.0, duration: 0.6 }}
              />
              <motion.div
                className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-white/20 rounded-br-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.1, duration: 0.6 }}
              />
            </div>

          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}
