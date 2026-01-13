import { useRef } from 'react'
import { motion, useScroll, useTransform, type Variants, AnimatePresence, useInView } from 'framer-motion'
import { weddingConfig, quotes } from '../../config/wedding'
import { Flourish } from '../ui/Flourish'

// Ken Burns effect for closing photo
const kenBurnsVariants: Variants = {
  animate: {
    scale: [1, 1.1, 1.05],
    x: ['0%', '2%', '-1%'],
    y: ['0%', '1%', '-0.5%'],
    transition: {
      duration: 20,
      repeat: Infinity,
      repeatType: 'reverse',
      ease: 'linear',
    },
  },
}

// Light leak overlay
const lightLeakVariants: Variants = {
  animate: {
    x: ['-100%', '200%'],
    opacity: [0, 0.4, 0],
    transition: {
      duration: 10,
      repeat: Infinity,
      repeatDelay: 5,
      ease: 'easeInOut',
    },
  },
}

// Heart pulse animation
const heartPulseVariants: Variants = {
  animate: {
    scale: [1, 1.15, 1],
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

// Text reveal with blur
const textRevealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    filter: 'blur(10px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

// Signature letter animation
const signatureContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.3,
    },
  },
}

const signatureLetterVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
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

// Flourish corner animation
const cornerVariants: Variants = {
  hidden: { opacity: 0, scale: 0.5, rotate: -20 },
  visible: {
    opacity: 0.5,
    scale: 1,
    rotate: 0,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 15,
    },
  },
}

// Animated signature component
function AnimatedSignature({ text, className }: { text: string; className: string }) {
  const letters = text.split('')

  return (
    <motion.span
      className={`inline-flex flex-wrap justify-center ${className}`}
      variants={signatureContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          variants={signatureLetterVariants}
          className={letter === ' ' ? 'w-[0.2em]' : 'inline-block'}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </motion.span>
  )
}

export function ClosingSection() {
  const { couple } = weddingConfig
  const ref = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(contentRef, { once: true, amount: 0.5 })

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // Subtle parallax
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '10%'])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3])

  return (
    <section
      ref={ref}
      id="closing"
      className="bg-cream overflow-hidden relative"
    >
      {/* Image with Ken Burns and parallax */}
      <div className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{ y }}
        >
          <motion.img
            src="/images/gallery/Foto7.jpg"
            alt={`${couple.bride} y ${couple.groom}`}
            className="w-full h-[120%] object-cover"
            variants={kenBurnsVariants}
            animate="animate"
          />
        </motion.div>

        {/* Light leak overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
            width: '50%',
          }}
          variants={lightLeakVariants}
          animate="animate"
        />

        {/* Gradient overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-cream via-cream/30 to-transparent"
          style={{ opacity }}
        />

        {/* Vignette effect */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.2) 100%)',
          }}
        />

        {/* Decorative corner flourishes with animation */}
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
          className="absolute top-4 right-4 transform scale-x-[-1]"
          variants={cornerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Flourish variant="corner" className="w-16 h-16 md:w-20 md:h-20 text-white" />
        </motion.div>
      </div>

      {/* Message content */}
      <motion.div
        ref={contentRef}
        className="max-w-3xl mx-auto px-6 py-12 md:py-16 text-center -mt-20 relative z-10"
        variants={textRevealVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Heart decoration with pulse */}
        <motion.div
          className="mb-6 relative"
          initial={{ scale: 0, rotate: -180 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        >
          {/* Glow behind heart */}
          <motion.div
            className="absolute inset-0 blur-xl"
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              background: 'radial-gradient(circle, rgba(128,0,32,0.3) 0%, transparent 70%)',
            }}
          />

          <motion.svg
            className="w-10 h-10 mx-auto text-burgundy relative z-10"
            viewBox="0 0 24 24"
            fill="currentColor"
            variants={heartPulseVariants}
            animate="animate"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </motion.svg>
        </motion.div>

        {/* Closing quote */}
        <motion.p
          className="text-gray-600 font-serif text-lg md:text-xl leading-relaxed mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {quotes.closing}
        </motion.p>

        {/* Full closing text */}
        <motion.p
          className="text-gray-500 font-serif text-base md:text-lg leading-relaxed mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {quotes.closingFull}
        </motion.p>

        {/* Animated flourish divider */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <Flourish variant="header" className="mb-8" />
        </motion.div>

        {/* Signature with letter animation */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <p className="font-cursive text-2xl md:text-3xl text-olive mb-2">
            Con todo nuestro amor,
          </p>

          {/* Animated names */}
          <div className="font-cursive text-4xl md:text-5xl text-burgundy">
            <AnimatedSignature
              text={`${couple.bride} & ${couple.groom}`}
              className=""
            />
          </div>

          {/* Signature underline with draw animation */}
          <motion.div
            className="mx-auto mt-4 h-0.5 bg-gradient-to-r from-transparent via-gold-warm to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ width: '60%' }}
          />
        </motion.div>

        {/* Bottom flourish corners with animation */}
        <motion.div
          className="flex justify-center mt-10 gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 0.4, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <motion.div
            animate={{
              rotate: [180, 185, 175, 180],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <Flourish variant="corner" className="w-12 h-12 text-olive" />
          </motion.div>
          <motion.div
            animate={{
              rotate: [180, 175, 185, 180],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.5,
            }}
          >
            <Flourish variant="corner" className="w-12 h-12 text-olive transform scale-x-[-1]" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Floating hearts */}
      <AnimatePresence>
        {isInView && (
          <>
            <motion.div
              className="absolute bottom-1/4 left-10 text-2xl hidden md:block"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 0.5, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 1.5 }}
            >
              <motion.span
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                💕
              </motion.span>
            </motion.div>
            <motion.div
              className="absolute bottom-1/3 right-16 text-xl hidden md:block"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 0.4, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 2 }}
            >
              <motion.span
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, -10, 10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                💗
              </motion.span>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Footer */}
      <motion.div
        className="bg-olive py-6 text-center relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        {/* Shimmer effect on footer */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            x: ['-100%', '200%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatDelay: 5,
            ease: 'linear',
          }}
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)',
          }}
        />

        <motion.p
          className="text-white/80 text-sm relative z-10"
          animate={{
            backgroundPosition: ['0% center', '200% center'],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            background: 'linear-gradient(90deg, rgba(255,255,255,0.8) 0%, rgba(193,154,91,1) 50%, rgba(255,255,255,0.8) 100%)',
            backgroundSize: '200% 100%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {couple.bride} & {couple.groom} &bull; 7 de Marzo, 2026
        </motion.p>
      </motion.div>
    </section>
  )
}
