import { motion, type Variants, useInView, useScroll, useTransform, useSpring } from 'framer-motion'
import { useRef } from 'react'
import { useGuest } from '../../hooks/useGuest'
import { Flourish } from '../ui/Flourish'
import { weddingConfig } from '../../config/wedding'
import { HeartIcon } from '../ui/svg'

// Phrases for the journey
const phrases = [
  'Eres especial para nosotros',
  'Por eso queremos invitarte',
  'A compartir este momento',
  'El día de nuestra boda',
]

// Monogram animation
const monogramVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.5,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.5,
      type: 'spring',
      stiffness: 150,
      damping: 15,
    },
  },
}

// Ring draw animation
const ringVariants: Variants = {
  hidden: {
    pathLength: 0,
    opacity: 0,
  },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: {
        delay: 0.8,
        duration: 1.5,
        ease: 'easeInOut',
      },
      opacity: {
        delay: 0.8,
        duration: 0.3,
      },
    },
  },
}

// Rotating glow animation
const glowVariants: Variants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: 'linear',
    },
  },
}

// Side Monogram Component (K&J with rotating ring) - reversible animation
function SideMonogram({ position }: { position: 'left' | 'right' }) {
  const { couple } = weddingConfig
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: '-10% 0px -10% 0px' })

  return (
    <motion.div
      ref={ref}
      className={`absolute top-1/2 -translate-y-1/2 hidden lg:flex items-center justify-center ${
        position === 'left' ? 'left-8 xl:left-16' : 'right-8 xl:right-16'
      }`}
      variants={monogramVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {/* Outer rotating glow */}
      <motion.div
        className="absolute w-28 h-28 xl:w-32 xl:h-32 rounded-full opacity-40"
        variants={glowVariants}
        animate="animate"
        style={{
          background:
            'conic-gradient(from 0deg, transparent 0%, rgba(193, 154, 91, 0.4) 25%, transparent 50%, rgba(193, 154, 91, 0.4) 75%, transparent 100%)',
        }}
      />

      {/* SVG Ring */}
      <svg
        className="absolute w-24 h-24 xl:w-28 xl:h-28"
        viewBox="0 0 100 100"
        fill="none"
      >
        {/* Outer ring */}
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          stroke="url(#sideRingGradient)"
          strokeWidth="1"
          strokeLinecap="round"
          variants={ringVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        />

        {/* Inner dashed ring */}
        <motion.circle
          cx="50"
          cy="50"
          r="38"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="0.5"
          strokeDasharray="3 6"
          variants={ringVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        />

        {/* Decorative dots */}
        {[0, 90, 180, 270].map((angle) => (
          <motion.circle
            key={angle}
            cx={50 + 45 * Math.cos((angle * Math.PI) / 180)}
            cy={50 + 45 * Math.sin((angle * Math.PI) / 180)}
            r="2"
            fill="#c19a5b"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ delay: 1.8 + angle / 500, type: 'spring' }}
          />
        ))}

        <defs>
          <linearGradient id="sideRingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(193, 154, 91, 0.6)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.3)" />
            <stop offset="100%" stopColor="rgba(193, 154, 91, 0.6)" />
          </linearGradient>
        </defs>
      </svg>

      {/* Central initials */}
      <motion.div
        className="relative z-10 text-center"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <p className="font-cursive text-xl xl:text-2xl text-white/80">
          {couple.bride.charAt(0)} & {couple.groom.charAt(0)}
        </p>
      </motion.div>
    </motion.div>
  )
}

// Mobile Monogram Component (centered, visible on mobile/tablet only) - reversible animation
function MobileMonogram() {
  const { couple } = weddingConfig
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: '-10% 0px -10% 0px' })

  return (
    <motion.div
      ref={ref}
      className="flex lg:hidden justify-center mb-8"
      variants={monogramVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center">
        {/* Outer rotating glow */}
        <motion.div
          className="absolute w-24 h-24 sm:w-28 sm:h-28 rounded-full opacity-40"
          variants={glowVariants}
          animate="animate"
          style={{
            background:
              'conic-gradient(from 0deg, transparent 0%, rgba(193, 154, 91, 0.4) 25%, transparent 50%, rgba(193, 154, 91, 0.4) 75%, transparent 100%)',
          }}
        />

        {/* SVG Ring */}
        <svg
          className="absolute w-20 h-20 sm:w-24 sm:h-24"
          viewBox="0 0 100 100"
          fill="none"
        >
          {/* Outer ring */}
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            stroke="url(#mobileRingGradient)"
            strokeWidth="1"
            strokeLinecap="round"
            variants={ringVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          />

          {/* Inner dashed ring */}
          <motion.circle
            cx="50"
            cy="50"
            r="38"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="0.5"
            strokeDasharray="3 6"
            variants={ringVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          />

          {/* Decorative dots */}
          {[0, 90, 180, 270].map((angle) => (
            <motion.circle
              key={angle}
              cx={50 + 45 * Math.cos((angle * Math.PI) / 180)}
              cy={50 + 45 * Math.sin((angle * Math.PI) / 180)}
              r="2"
              fill="#c19a5b"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{ delay: 1.8 + angle / 500, type: 'spring' }}
            />
          ))}

          <defs>
            <linearGradient id="mobileRingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(193, 154, 91, 0.6)" />
              <stop offset="50%" stopColor="rgba(255,255,255,0.3)" />
              <stop offset="100%" stopColor="rgba(193, 154, 91, 0.6)" />
            </linearGradient>
          </defs>
        </svg>

        {/* Central initials */}
        <motion.div
          className="relative z-10 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <p className="font-cursive text-lg sm:text-xl text-white/80">
            {couple.bride.charAt(0)} & {couple.groom.charAt(0)}
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}

// Phrase block component - reversible animation
function PhraseBlock({
  text,
  delay,
  align = 'center',
}: {
  text: string
  delay: number
  align?: 'left' | 'center' | 'right'
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once: false, // Allow reverse animation
    margin: '-10% 0px -10% 0px', // Trigger slightly inside viewport
  })

  const alignClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }

  return (
    <motion.div
      ref={ref}
      className={`relative ${alignClass[align]}`}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: {
          opacity: 0,
          y: 20,
          scale: 0.95,
        },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            delay: isInView ? delay * 0.3 : 0, // Reduced delay on reverse
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
    >
      <p className="font-elegant text-white text-xl md:text-2xl lg:text-3xl italic leading-relaxed">
        {text}
      </p>
    </motion.div>
  )
}

// Connecting curved path SVG - scroll-linked for reversible animation
function ConnectingPath() {
  const ref = useRef(null)

  // Scroll-linked animation for reversible path drawing
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'], // Start when 80% visible, end when 20% visible
  })

  // Smooth spring animation for the path
  const pathLength = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  // Opacity based on scroll - fade in as it enters, fade out as it exits
  const pathOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0.8])

  // Dot scales based on scroll progress (appear sequentially)
  const dot1Scale = useTransform(scrollYProgress, [0.1, 0.25], [0, 1])
  const dot2Scale = useTransform(scrollYProgress, [0.3, 0.45], [0, 1])
  const dot3Scale = useTransform(scrollYProgress, [0.5, 0.65], [0, 1])
  const dot4Scale = useTransform(scrollYProgress, [0.7, 0.85], [0, 1])

  return (
    <div ref={ref} className="absolute inset-0 pointer-events-none">
      <svg
        className="w-full h-full"
        viewBox="0 0 400 600"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Main flowing path - scroll-linked */}
        <motion.path
          d="M200 30
             C200 60, 200 80, 200 100
             C200 120, 180 140, 160 150
             C140 160, 120 170, 120 190
             C120 210, 140 230, 200 240
             C260 250, 280 270, 280 290
             C280 310, 260 330, 200 340
             C140 350, 120 370, 120 390
             C120 410, 140 430, 200 440
             C200 460, 200 500, 200 530"
          stroke="url(#goldGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          style={{
            pathLength,
            opacity: pathOpacity,
          }}
        />

        {/* Decorative dots along the path - scroll-linked */}
        <motion.circle
          cx="200"
          cy="100"
          r="4"
          fill="#c19a5b"
          style={{ scale: dot1Scale, opacity: dot1Scale }}
        />
        <motion.circle
          cx="200"
          cy="240"
          r="4"
          fill="#c19a5b"
          style={{ scale: dot2Scale, opacity: dot2Scale }}
        />
        <motion.circle
          cx="200"
          cy="340"
          r="4"
          fill="#c19a5b"
          style={{ scale: dot3Scale, opacity: dot3Scale }}
        />
        <motion.circle
          cx="200"
          cy="440"
          r="4"
          fill="#c19a5b"
          style={{ scale: dot4Scale, opacity: dot4Scale }}
        />

        {/* Gradient definition */}
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
            <stop offset="50%" stopColor="#c19a5b" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.3)" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

// Guest pass information component
function GuestPassInfo() {
  const { guest } = useGuest()

  if (!guest) return null

  const passLabel = guest.passes === 1 ? 'Pase' : 'Pases'

  return (
    <motion.div
      className="mt-16 text-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.15, delayChildren: 0.1 },
        },
      }}
    >
      {/* Decorative line */}
      <motion.div
        className="w-24 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent mx-auto mb-8"
        variants={{
          hidden: { scaleX: 0, opacity: 0 },
          visible: { scaleX: 1, opacity: 1, transition: { duration: 0.8 } },
        }}
      />

      {/* Main message */}
      <motion.p
        className="font-cursive text-xl md:text-2xl lg:text-3xl text-white/90 leading-relaxed mb-6"
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
        }}
      >
        Su presencia es el regalo más valioso que podemos recibir
      </motion.p>

      {/* Heart divider */}
      <motion.div
        className="flex justify-center mb-6"
        variants={{
          hidden: { opacity: 0, scale: 0 },
          visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 200 } },
        }}
      >
        <HeartIcon size={20} color="#ffffff" accentColor="#c19a5b" animate={false} />
      </motion.div>

      {/* Guest name */}
      <motion.h3
        className="font-serif text-xl md:text-2xl lg:text-3xl text-white tracking-[0.15em] uppercase mb-3"
        variants={{
          hidden: { opacity: 0, y: 15 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
        }}
      >
        {guest.name}
      </motion.h3>

      {/* Reserved text */}
      <motion.p
        className="font-elegant text-base md:text-lg text-white/70 mb-1"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 0.5 } },
        }}
      >
        Hemos reservado:
      </motion.p>

      {/* Number of passes */}
      <motion.div
        className="mb-1"
        variants={{
          hidden: { opacity: 0, scale: 0.5 },
          visible: {
            opacity: 1,
            scale: 1,
            transition: { type: 'spring', stiffness: 150, damping: 12 },
          },
        }}
      >
        <span className="font-serif text-3xl md:text-4xl lg:text-5xl text-white tracking-wider">
          {guest.passes} {passLabel}
        </span>
      </motion.div>

      {/* In your honor */}
      <motion.p
        className="font-cursive text-lg md:text-xl text-white/60 italic"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 0.5 } },
        }}
      >
        en su honor
      </motion.p>
    </motion.div>
  )
}

export function QuoteSectionPath() {
  return (
    <section
      id="quote"
      className="bg-olive min-h-screen flex items-center justify-center px-6 py-20 md:py-28 relative overflow-hidden"
    >
      {/* Soft radial gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(255,255,255,0.08) 0%, transparent 60%)',
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

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Mobile monogram (visible on mobile/tablet only) */}
        <MobileMonogram />

        {/* Top decorative star - reversible animation */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: false, margin: '-10% 0px -10% 0px' }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        >
          <span className="text-gold-warm text-3xl">✦</span>
        </motion.div>

        {/* Journey container with relative positioning */}
        <div className="relative" style={{ minHeight: '500px' }}>
          {/* SVG Path (absolute positioned) */}
          <ConnectingPath />

          {/* Phrase blocks (positioned along the journey) */}
          <div className="relative z-10 flex flex-col items-center gap-16 md:gap-20 py-8">
            <PhraseBlock text={phrases[0]} delay={0.3} />
            <PhraseBlock text={phrases[1]} delay={0.8} />
            <PhraseBlock text={phrases[2]} delay={1.3} />
            <PhraseBlock text={phrases[3]} delay={1.8} />

            {/* Heart at the end - reversible animation */}
            <motion.div
              className="mt-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: '-10% 0px -10% 0px' }}
              variants={{
                hidden: { scale: 0, opacity: 0, rotate: -45 },
                visible: {
                  scale: 1,
                  opacity: 1,
                  rotate: 0,
                  transition: {
                    type: 'spring',
                    stiffness: 200,
                    damping: 12,
                  },
                },
              }}
            >
              <HeartIcon size={48} color="#c19a5b" accentColor="#ffffff" animate={true} />
            </motion.div>
          </div>
        </div>

        {/* Bottom flourish - reversible animation */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, margin: '-10% 0px -10% 0px' }}
          transition={{ duration: 0.6 }}
        >
          <Flourish variant="header" className="text-white/30" />
        </motion.div>

        {/* Guest Pass Info */}
        <GuestPassInfo />
      </div>

      {/* K&J Monograms on sides (desktop only) */}
      <SideMonogram position="left" />
      <SideMonogram position="right" />

      {/* Floating decorative particles */}
      <motion.div
        className="absolute top-1/4 left-10 w-2 h-2 rounded-full bg-gold-warm/30 hidden md:block lg:hidden"
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
        className="absolute bottom-1/3 right-16 w-3 h-3 rounded-full bg-white/10 hidden md:block lg:hidden"
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
    </section>
  )
}
