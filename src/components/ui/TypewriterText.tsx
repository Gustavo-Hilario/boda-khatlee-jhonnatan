import { motion, type Variants } from 'framer-motion'
import { useMemo } from 'react'

interface TypewriterTextProps {
  text: string
  className?: string
  delay?: number
  speed?: number // ms per character
  cursor?: boolean
  cursorColor?: string
  onComplete?: () => void
}

const containerVariants: Variants = {
  hidden: {},
  visible: (speed: number) => ({
    transition: {
      staggerChildren: speed / 1000,
    },
  }),
}

const characterVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.1,
      ease: 'easeOut',
    },
  },
}

export function TypewriterText({
  text,
  className = '',
  delay = 0,
  speed = 50,
  cursor = true,
  cursorColor = '#c19a5b',
  onComplete,
}: TypewriterTextProps) {
  const characters = useMemo(() => text.split(''), [text])
  const totalDuration = (characters.length * speed) / 1000

  return (
    <motion.span
      className={`inline-flex flex-wrap ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={speed}
      transition={{ delayChildren: delay }}
      onAnimationComplete={onComplete}
    >
      {characters.map((char, index) => (
        <motion.span
          key={index}
          variants={characterVariants}
          className={char === ' ' ? 'w-[0.3em]' : ''}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}

      {cursor && (
        <motion.span
          className="ml-0.5"
          style={{ color: cursorColor }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            delay: delay + totalDuration,
            duration: 1,
            repeat: Infinity,
            repeatDelay: 0,
          }}
        >
          |
        </motion.span>
      )}
    </motion.span>
  )
}

// Word-by-word variant
interface TypewriterWordsProps {
  text: string
  className?: string
  wordClassName?: string
  delay?: number
  speed?: number // ms per word
  onComplete?: () => void
}

const wordContainerVariants: Variants = {
  hidden: {},
  visible: (speed: number) => ({
    transition: {
      staggerChildren: speed / 1000,
    },
  }),
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
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

export function TypewriterWords({
  text,
  className = '',
  wordClassName = '',
  delay = 0,
  speed = 150,
  onComplete,
}: TypewriterWordsProps) {
  const words = useMemo(() => text.split(' '), [text])

  return (
    <motion.span
      className={`inline-flex flex-wrap gap-x-[0.3em] ${className}`}
      variants={wordContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={speed}
      transition={{ delayChildren: delay }}
      onAnimationComplete={onComplete}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={wordVariants}
          className={wordClassName}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  )
}

// Gradient reveal variant
interface GradientRevealTextProps {
  text: string
  className?: string
  delay?: number
  duration?: number
  gradient?: string
}

export function GradientRevealText({
  text,
  className = '',
  delay = 0,
  duration = 1.5,
  gradient = 'linear-gradient(90deg, #8d9e78, #c19a5b, #800020)',
}: GradientRevealTextProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Base text (hidden) */}
      <span className="invisible">{text}</span>

      {/* Revealed text with gradient mask */}
      <motion.span
        className="absolute inset-0"
        style={{
          background: gradient,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
        initial={{ clipPath: 'inset(0 100% 0 0)' }}
        whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
        viewport={{ once: true }}
        transition={{
          delay,
          duration,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {text}
      </motion.span>
    </div>
  )
}
