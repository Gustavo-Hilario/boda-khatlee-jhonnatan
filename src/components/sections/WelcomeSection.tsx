import { motion, type Variants } from 'framer-motion'
import { weddingConfig } from '../../config/wedding'
import { Flourish } from '../ui/Flourish'

// Ken Burns effect for photo
const kenBurnsVariants: Variants = {
  animate: {
    scale: [1, 1.08, 1.04],
    x: ['0%', '2%', '-1%'],
    y: ['0%', '1%', '-0.5%'],
    transition: {
      duration: 15,
      repeat: Infinity,
      repeatType: 'reverse',
      ease: 'linear',
    },
  },
}

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
const letterContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.3,
    },
  },
}

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

// Shimmer effect passing through text
const shimmerVariants: Variants = {
  animate: {
    backgroundPosition: ['200% center', '-200% center'],
    transition: {
      duration: 4,
      repeat: Infinity,
      repeatDelay: 3,
      ease: 'linear',
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

// Animated letter component
function AnimatedLetter({ letter }: { letter: string }) {
  const isSpace = letter === ' '

  if (isSpace) {
    return <span className="inline-block w-[0.15em]">&nbsp;</span>
  }

  return (
    <motion.span
      className="inline-block"
      variants={letterVariants}
      style={{ display: 'inline-block' }}
    >
      {letter}
    </motion.span>
  )
}

// Animated name with shimmer
function AnimatedName({ name }: { name: string }) {
  const letters = name.split('')

  return (
    <motion.span
      className="inline-flex flex-wrap justify-center"
      variants={letterContainerVariants}
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
            src="/images/gallery/Foto8.jpg"
            alt={`${couple.bride} y ${couple.groom}`}
            className="w-full h-full object-cover"
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

        {/* "¡NOS CASAMOS!" - Bounces down */}
        <motion.p
          className="text-gold-warm font-serif text-xl md:text-3xl lg:text-4xl tracking-widest uppercase mb-4 md:mb-6"
          variants={bounceDownVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          ¡Nos Casamos!
        </motion.p>

        {/* Couple names - Letter by letter with shimmer */}
        <motion.h1
          className="font-cursive text-4xl md:text-6xl lg:text-7xl xl:text-8xl text-olive mb-4 md:mb-6 leading-tight relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
        >
          {/* Base text layer */}
          <span className="relative">
            <AnimatedName name={couple.bride} />
            <motion.span
              className="inline-block mx-2 md:mx-4"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.5,
                type: 'spring',
                stiffness: 300,
              }}
            >
              &
            </motion.span>
            <AnimatedName name={couple.groom} />
          </span>

          {/* Shimmer overlay */}
          <motion.span
            className="absolute inset-0 pointer-events-none"
            variants={shimmerVariants}
            animate="animate"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(193,154,91,0.3) 50%, transparent 100%)',
              backgroundSize: '200% 100%',
              mixBlendMode: 'overlay',
            }}
          />
        </motion.h1>

        {/* Invitation text - Word by word */}
        <motion.p
          className="text-gray-600 font-serif text-base md:text-xl lg:text-2xl max-w-md leading-relaxed flex flex-wrap justify-center gap-x-[0.3em]"
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
