import { useState } from 'react'
import { motion, type Variants, AnimatePresence } from 'framer-motion'
import { quotes } from '../../config/wedding'

// Container animation
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.02,
      delayChildren: 0.5,
    },
  },
}

// Character animation for typewriter
const characterVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.05,
      ease: 'easeOut',
    },
  },
}

// Quote mark animation
const quoteMarkVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0,
    rotate: -45,
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 15,
    },
  },
}

// Floating quote marks
const floatingVariants: Variants = {
  animate: {
    y: [0, -8, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

// Cursor blink animation
const cursorVariants: Variants = {
  blink: {
    opacity: [1, 0, 1],
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: 'linear',
      times: [0, 0.5, 1],
    },
  },
}

// Background shimmer
const shimmerVariants: Variants = {
  animate: {
    backgroundPosition: ['200% center', '-200% center'],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: 'linear',
    },
  },
}

// TypewriterQuote component
function TypewriterQuote({
  text,
  onComplete,
}: {
  text: string
  onComplete?: () => void
}) {
  const [isComplete, setIsComplete] = useState(false)
  const characters = text.split('')

  return (
    <motion.span
      className="inline"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      onAnimationComplete={() => {
        setIsComplete(true)
        onComplete?.()
      }}
    >
      {characters.map((char, index) => (
        <motion.span
          key={index}
          variants={characterVariants}
          className={char === ' ' ? 'inline-block w-[0.3em]' : 'inline'}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}

      {/* Blinking cursor */}
      <AnimatePresence>
        {!isComplete && (
          <motion.span
            className="inline-block ml-1 w-[3px] h-[1.1em] bg-gold-warm align-middle"
            variants={cursorVariants}
            animate="blink"
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>
    </motion.span>
  )
}

export function QuoteSection() {
  const [, setTypingComplete] = useState(false)

  return (
    <section
      id="quote"
      className="bg-olive flex items-center justify-center px-6 py-20 md:py-28 relative overflow-hidden"
    >
      {/* Animated background pattern */}
      <motion.div
        className="absolute inset-0 opacity-10"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'linear',
        }}
      >
        <svg className="w-full h-full" preserveAspectRatio="none">
          <pattern
            id="quote-pattern"
            x="0"
            y="0"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="20" cy="20" r="1.5" fill="white" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#quote-pattern)" />
        </svg>
      </motion.div>

      {/* Gradient sweep overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        variants={shimmerVariants}
        animate="animate"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.05) 50%, transparent 100%)',
          backgroundSize: '200% 100%',
        }}
      />

      {/* Vignette effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.3) 100%)',
        }}
      />

      <motion.div
        className="max-w-3xl text-center relative z-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Opening quote mark */}
        <motion.div
          className="relative inline-block mb-6"
          variants={quoteMarkVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.span
            className="block text-7xl md:text-8xl font-serif leading-none"
            variants={floatingVariants}
            animate="animate"
            style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.15) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            "
          </motion.span>

          {/* Glow behind quote mark */}
          <motion.div
            className="absolute inset-0 blur-xl"
            animate={{
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              background: 'radial-gradient(circle, rgba(193,154,91,0.3) 0%, transparent 70%)',
            }}
          />
        </motion.div>

        {/* Quote text with typewriter effect */}
        <motion.p
          className="text-white font-elegant text-xl md:text-2xl lg:text-3xl leading-relaxed italic px-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <TypewriterQuote
            text={quotes.main}
            onComplete={() => setTypingComplete(true)}
          />
        </motion.p>

        {/* Closing quote mark */}
        <motion.div
          className="relative inline-block mt-6"
          variants={quoteMarkVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <motion.span
            className="block text-7xl md:text-8xl font-serif leading-none"
            variants={floatingVariants}
            animate="animate"
            transition={{ delay: 2 }}
            style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.4) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            "
          </motion.span>

          {/* Glow behind quote mark */}
          <motion.div
            className="absolute inset-0 blur-xl"
            animate={{
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1.5,
            }}
            style={{
              background: 'radial-gradient(circle, rgba(193,154,91,0.3) 0%, transparent 70%)',
            }}
          />
        </motion.div>

        {/* Decorative line */}
        <motion.div
          className="mt-8 mx-auto w-24 h-px overflow-hidden"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <div className="w-full h-full bg-gradient-to-r from-transparent via-gold-warm to-transparent" />
          <motion.div
            className="absolute inset-0"
            animate={{
              x: ['-100%', '200%'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 2,
              ease: 'linear',
            }}
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)',
            }}
          />
        </motion.div>
      </motion.div>

      {/* Floating decorative particles */}
      <motion.div
        className="absolute top-1/4 left-10 w-2 h-2 rounded-full bg-gold-warm/30 hidden md:block"
        animate={{
          y: [0, -15, 0],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-1/3 right-16 w-3 h-3 rounded-full bg-white/10 hidden md:block"
        animate={{
          y: [0, -20, 0],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />
      <motion.div
        className="absolute top-1/3 right-10 w-1.5 h-1.5 rounded-full bg-gold-warm/40 hidden md:block"
        animate={{
          y: [0, -12, 0],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />
    </section>
  )
}
