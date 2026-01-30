import { motion, type Variants } from 'framer-motion'
import { weddingConfig } from '../../config/wedding'
import { Flourish } from '../ui/Flourish'
import { getAssetPath } from '../../utils/assets'
import { useMobile } from '../../hooks/useMobile'
import { memo, useState } from 'react'

// ==========================================
// FLOATING ROSE PETALS COMPONENT
// ==========================================
interface PetalProps {
  index: number
  isMobile: boolean
}

const petalColors = [
  'rgba(255, 182, 193, 0.6)', // Light pink
  'rgba(255, 218, 233, 0.5)', // Soft pink
  'rgba(255, 192, 203, 0.55)', // Pink
  'rgba(248, 200, 220, 0.5)', // Blush
  'rgba(255, 228, 225, 0.45)', // Misty rose
]

const FloatingPetal = memo(function FloatingPetal({ index, isMobile }: PetalProps) {
  // Deterministic random values based on index
  const seed = index * 137.5
  const startX = (seed * 2.7) % 100
  const size = isMobile ? 8 + (seed % 6) : 12 + (seed % 10)
  const duration = isMobile ? 10 + (seed % 6) : 8 + (seed % 5)
  const delay = 0.5 + (seed % 8)
  const rotateStart = (seed * 3) % 360
  const swayAmount = 30 + (seed % 40)
  const color = petalColors[index % petalColors.length]

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        width: size,
        height: size * 0.6,
        left: `${startX}%`,
        top: '-5%',
        background: color,
        borderRadius: '50% 0 50% 50%',
        filter: 'blur(0.5px)',
        boxShadow: `0 0 ${size / 3}px ${color}`,
      }}
      initial={{ opacity: 0, y: 0, rotate: rotateStart }}
      animate={{
        y: ['0vh', '110vh'],
        x: [0, swayAmount, -swayAmount / 2, swayAmount / 3, 0],
        rotate: [rotateStart, rotateStart + 180, rotateStart + 360],
        opacity: [0, 0.8, 0.8, 0.6, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'linear',
        times: [0, 0.1, 0.5, 0.9, 1],
      }}
    />
  )
})

function FloatingPetals({ count = 12, isMobile }: { count?: number; isMobile: boolean }) {
  const actualCount = isMobile ? Math.min(6, count) : count

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {Array.from({ length: actualCount }).map((_, i) => (
        <FloatingPetal key={i} index={i} isMobile={isMobile} />
      ))}
    </div>
  )
}

// ==========================================
// GOLD DUST PARTICLES FOR LETTER ANIMATION
// ==========================================
interface GoldDustProps {
  isAnimating: boolean
}

function GoldDustParticles({ isAnimating }: GoldDustProps) {
  const particles = Array.from({ length: 6 })

  return (
    <div className="absolute inset-0 pointer-events-none overflow-visible">
      {particles.map((_, i) => {
        const angle = (i / particles.length) * 360
        const distance = 15 + (i % 3) * 8
        const size = 2 + (i % 2) * 2

        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              background: 'radial-gradient(circle, rgba(255,215,0,0.9) 0%, rgba(193,154,91,0.6) 100%)',
              left: '50%',
              top: '50%',
              boxShadow: '0 0 4px rgba(255,215,0,0.8)',
            }}
            initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
            animate={isAnimating ? {
              opacity: [0, 1, 0],
              scale: [0, 1.2, 0],
              x: [0, Math.cos(angle * Math.PI / 180) * distance],
              y: [0, Math.sin(angle * Math.PI / 180) * distance - 10],
            } : {}}
            transition={{
              duration: 0.6,
              delay: i * 0.05,
              ease: 'easeOut',
            }}
          />
        )
      })}
    </div>
  )
}

// ==========================================
// KEN BURNS AND OTHER EXISTING ANIMATIONS
// ==========================================

// Ken Burns effect for photo - mobile-aware with enhanced scale
const getKenBurnsVariants = (isMobile: boolean): Variants => ({
  animate: {
    scale: isMobile ? [1, 1.05, 1.02] : [1, 1.12, 1.06],
    x: isMobile ? ['0%', '1%', '-0.5%'] : ['0%', '3%', '-1.5%'],
    y: isMobile ? ['0%', '0.5%', '-0.3%'] : ['0%', '2%', '-1%'],
    transition: {
      duration: isMobile ? 18 : 14,
      repeat: Infinity,
      repeatType: 'reverse',
      ease: 'linear',
    },
  },
})

// Light leak overlay animation
const lightLeakVariants: Variants = {
  animate: {
    x: ['-100%', '200%'],
    opacity: [0, 0.4, 0],
    transition: {
      duration: 8,
      repeat: Infinity,
      repeatDelay: 4,
      ease: 'easeInOut',
    },
  },
}

// Letter animation for names
const letterVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    rotateZ: -10,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateZ: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 150,
      damping: 12,
    },
  },
}

// Continuous glow pulse for headings
const glowPulseVariants: Variants = {
  initial: {
    textShadow: '0 0 0px rgba(193, 154, 91, 0)',
  },
  animate: {
    textShadow: [
      '0 0 0px rgba(193, 154, 91, 0)',
      '0 0 20px rgba(193, 154, 91, 0.5)',
      '0 0 0px rgba(193, 154, 91, 0)',
    ],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
      delay: 0.5,
    },
  },
}

// Floating text animation - gentle up/down movement
const floatingTextVariants: Variants = {
  animate: {
    y: [0, -4, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

// Bounce down animation for "Nos Casamos"
const bounceDownVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -50,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 15,
      delay: 0.1,
    },
  },
}

// Words reveal for invitation text
const wordContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.8,
    },
  },
}

const wordVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: 'blur(4px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

// Corner flourish rotation on scroll
const cornerVariants: Variants = {
  hidden: { opacity: 0, scale: 0.5, rotate: -45 },
  visible: {
    opacity: 0.4,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

// Animated letter component with gold dust effect - inherits animation state from parent AnimatedName
function AnimatedLetter({ letter }: { letter: string }) {
  const isSpace = letter === ' '
  const [hasAnimated, setHasAnimated] = useState(false)

  if (isSpace) {
    return <span className="inline-block w-[0.15em]">&nbsp;</span>
  }

  return (
    <motion.span
      className="inline-block relative"
      variants={letterVariants}
      style={{ display: 'inline-block' }}
      onAnimationComplete={() => setHasAnimated(true)}
    >
      {letter}
      {/* Gold dust particles that burst when letter appears */}
      <GoldDustParticles isAnimating={hasAnimated} />
    </motion.span>
  )
}

// Animated name with shimmer, gold dust effect, and slide-in direction
function AnimatedName({ name, direction = 'left' }: { name: string; direction?: 'left' | 'right' }) {
  const letters = name.split('')

  // Slide in from left or right
  const slideVariants: Variants = {
    hidden: {
      x: direction === 'left' ? -100 : 100,
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.04,
        delayChildren: 0.2,
      },
    },
  }

  return (
    <motion.span
      className="inline-flex flex-wrap justify-center"
      variants={slideVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {letters.map((letter, index) => (
        <AnimatedLetter key={index} letter={letter} />
      ))}
    </motion.span>
  )
}

export function WelcomeSection() {
  const { couple } = weddingConfig
  const invitationWords = 'Tenemos el honor de invitarte a nuestra boda'.split(' ')
  const isMobile = useMobile()
  const kenBurnsVariants = getKenBurnsVariants(isMobile)

  return (
    <section
      id="welcome"
      className="h-screen flex flex-col md:flex-row overflow-hidden"
    >
      {/* Photo side - takes 45% on mobile, more on desktop */}
      <div className="h-[45vh] md:h-full md:flex-[1.2] relative overflow-hidden flex-shrink-0">
        {/* Ken Burns animated photo */}
        <motion.div
          className="w-full h-full"
          variants={kenBurnsVariants}
          animate="animate"
        >
          <img
            src={getAssetPath('images/gallery/Foto8.jpg')}
            alt={`${couple.bride} y ${couple.groom}`}
            className="w-full h-full object-cover"
            loading="eager"
            decoding="async"
          />
        </motion.div>

        {/* Light leak overlay effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
            width: '50%',
          }}
          variants={lightLeakVariants}
          animate="animate"
        />

        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-cream/20 md:to-cream/40" />

        {/* Decorative corner flourishes on image */}
        <motion.div
          className="absolute top-4 left-4"
          variants={cornerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Flourish variant="corner" className="w-16 h-16 md:w-20 md:h-20 text-white" />
        </motion.div>
        <motion.div
          className="absolute bottom-4 right-4 transform rotate-180"
          variants={cornerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Flourish variant="corner" className="w-16 h-16 md:w-20 md:h-20 text-white" />
        </motion.div>

        {/* Vignette effect */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.2) 100%)',
          }}
        />
      </div>

      {/* Text side - takes remaining 55% on mobile */}
      <div className="flex-1 md:flex-1 bg-cream flex flex-col justify-center items-center px-6 py-6 md:py-0 text-center relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-pattern-floral opacity-30" />

        {/* Floating rose petals */}
        <FloatingPetals count={15} isMobile={isMobile} />

        {/* Decorative corner */}
        <motion.div
          className="absolute top-4 right-4 opacity-30 hidden md:block"
          initial={{ opacity: 0, scale: 0.5, rotate: 45 }}
          whileInView={{ opacity: 0.3, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <Flourish variant="corner" className="w-16 h-16 text-olive transform scale-x-[-1]" />
        </motion.div>

        {/* "¡NOS CASAMOS!" - Bounces down with continuous glow and float */}
        <motion.p
          className="text-gold-warm font-serif text-xl md:text-3xl lg:text-4xl tracking-widest uppercase mb-4 md:mb-6"
          variants={bounceDownVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.span
            variants={!isMobile ? floatingTextVariants : undefined}
            animate={!isMobile ? 'animate' : undefined}
          >
            <motion.span
              variants={glowPulseVariants}
              initial="initial"
              animate="animate"
            >
              ¡Nos casamos!
            </motion.span>
          </motion.span>
        </motion.p>

        {/* Couple names - Vertical layout with slide-in from opposite sides */}
        <motion.div
          className="font-cursive text-4xl md:text-6xl lg:text-7xl xl:text-8xl text-olive mb-4 md:mb-6 leading-tight relative flex flex-col items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
        >
          {/* Continuous glow and float wrapper (desktop only) */}
          <motion.div
            className="relative flex flex-col items-center"
            animate={!isMobile ? {
              y: [0, -4, 0],
              transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
            } : undefined}
          >
            {/* Bride name - slides from left */}
            <motion.div
              className="relative"
              initial={{ textShadow: '0 0 10px rgba(141, 158, 120, 0.2)' }}
              animate={{
                textShadow: [
                  '0 0 10px rgba(141, 158, 120, 0.2)',
                  '0 0 25px rgba(141, 158, 120, 0.4)',
                  '0 0 10px rgba(141, 158, 120, 0.2)',
                ],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            >
              <AnimatedName name={couple.bride} direction="left" />
            </motion.div>

            {/* Ampersand - center with scale animation */}
            <motion.span
              className="block my-1 md:my-2 text-gold-warm"
              initial={{ opacity: 0, scale: 0, rotate: -180 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.6,
                type: 'spring',
                stiffness: 200,
                damping: 12,
              }}
            >
              &
            </motion.span>

            {/* Groom name - slides from right */}
            <motion.div
              className="relative"
              initial={{ textShadow: '0 0 10px rgba(141, 158, 120, 0.2)' }}
              animate={{
                textShadow: [
                  '0 0 10px rgba(141, 158, 120, 0.2)',
                  '0 0 25px rgba(141, 158, 120, 0.4)',
                  '0 0 10px rgba(141, 158, 120, 0.2)',
                ],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
            >
              <AnimatedName name={couple.groom} direction="right" />
            </motion.div>
          </motion.div>

          {/* Enhanced shimmer overlay */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0, backgroundPosition: '200% center' }}
            animate={{
              opacity: 1,
              backgroundPosition: ['200% center', '-200% center'],
            }}
            transition={{
              opacity: { duration: 0.5, delay: 0.3 },
              backgroundPosition: { duration: 5, repeat: Infinity, repeatDelay: 2, ease: 'linear', delay: 1 },
            }}
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(193,154,91,0.5) 50%, transparent 100%)',
              backgroundSize: '200% 100%',
              mixBlendMode: 'overlay',
            }}
          />
        </motion.div>

        {/* Invitation text - Word by word */}
        <motion.p
          className="text-gray-600 font-elegant text-lg md:text-2xl lg:text-3xl max-w-md leading-relaxed flex flex-wrap justify-center gap-x-[0.3em] italic"
          variants={wordContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {invitationWords.map((word, index) => (
            <motion.span key={index} variants={wordVariants}>
              {word}
            </motion.span>
          ))}
        </motion.p>

        {/* Decorative flourish */}
        <motion.div
          className="mt-6 md:mt-8"
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{
            delay: 1.2,
            duration: 0.6,
            type: 'spring',
            stiffness: 200,
          }}
        >
          <Flourish variant="header" />
        </motion.div>

        {/* Floating decorative elements */}
        <motion.div
          className="absolute bottom-10 left-10 w-3 h-3 rounded-full bg-gold-warm/30"
          animate={{
            y: [0, -10, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute top-20 right-20 w-2 h-2 rounded-full bg-olive/30"
          animate={{
            y: [0, -8, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
      </div>
    </section>
  )
}
