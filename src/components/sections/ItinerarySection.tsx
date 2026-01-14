import { useRef, useState } from 'react'
import { motion, useScroll, useSpring, useTransform, type Variants } from 'framer-motion'
import { timelineEvents } from '../../config/wedding'
import { Flourish } from '../ui/Flourish'
import { getAssetPath } from '../../utils/assets'
import { TimelinePath, TimelinePathVertical } from '../ui/TimelinePath'
import { Sparkles } from '../ui/Sparkles'
import { useMobile } from '../../hooks/useMobile'
import { useMagneticHover } from '../../hooks/useMagneticHover'

// Container with staggered children
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.4,
    },
  },
}

// 3D perspective item entrance
const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 80,
    rotateX: 45,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.34, 1.56, 0.64, 1], // Elastic overshoot
      type: 'spring',
      stiffness: 80,
      damping: 20,
    },
  },
}

// Mobile-friendly simpler variant
const itemVariantsMobile: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

// Icon entrance with spin
const iconVariants: Variants = {
  hidden: { scale: 0, rotate: -180, opacity: 0 },
  visible: {
    scale: 1,
    rotate: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 15,
      delay: 0.1,
    },
  },
}

// Continuous float animation
const floatVariants: Variants = {
  float: {
    y: [0, -8, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

// Wiggle on hover
const wiggleVariants: Variants = {
  idle: { rotate: 0 },
  wiggle: {
    rotate: [0, 8, -8, 5, -5, 0],
    transition: { duration: 0.6, ease: 'easeInOut' },
  },
}

// Timeline Item Component with magnetic hover
function TimelineItem({
  event,
  index,
  isActive,
  onHover,
  onLeave,
  isMobile,
}: {
  event: (typeof timelineEvents)[0]
  index: number
  isActive: boolean
  onHover: () => void
  onLeave: () => void
  isMobile: boolean
}) {
  const { ref, style, handlers } = useMagneticHover(10)
  const [showSparkles, setShowSparkles] = useState(false)

  const handleMouseEnter = () => {
    onHover()
    if (!isMobile) {
      setShowSparkles(true)
      setTimeout(() => setShowSparkles(false), 100)
    }
    handlers.onMouseEnter()
  }

  const handleMouseLeave = () => {
    onLeave()
    handlers.onMouseLeave()
  }

  return (
    <motion.div
      variants={isMobile ? itemVariantsMobile : itemVariants}
      className={`flex flex-col items-center text-center perspective-1000 ${
        isMobile
          ? 'w-full max-w-[200px] relative'
          : 'flex-shrink-0 min-w-[120px] md:min-w-[140px]'
      }`}
    >
      {/* Icon circle with 3D effects */}
      <div className="relative mb-6 pt-2">
        {/* Glow ring for active state */}
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            boxShadow: isActive
              ? [
                  '0 0 20px 8px rgba(193, 154, 91, 0.3)',
                  '0 0 35px 12px rgba(193, 154, 91, 0.5)',
                  '0 0 20px 8px rgba(193, 154, 91, 0.3)',
                ]
              : '0 0 0px 0px rgba(193, 154, 91, 0)',
          }}
          transition={{
            duration: 2,
            repeat: isActive ? Infinity : 0,
            ease: 'easeInOut',
          }}
        />

        {/* Outer burst ring on entrance */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gold-warm/20"
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1.4, opacity: [0, 0.6, 0] }}
          viewport={{ once: true }}
          transition={{
            delay: 0.5 + index * 0.12,
            duration: 0.8,
            ease: 'easeOut',
          }}
        />

        {/* Main icon container with magnetic effect */}
        <motion.div
          ref={!isMobile ? ref : undefined}
          className="relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-cream border-3 border-olive shadow-lg flex items-center justify-center overflow-hidden cursor-pointer preserve-3d will-change-transform"
          variants={iconVariants}
          style={!isMobile ? { ...style, transformStyle: 'preserve-3d' } : undefined}
          onMouseMove={!isMobile ? handlers.onMouseMove : undefined}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          whileHover={{
            scale: 1.1,
            boxShadow: '0 15px 40px rgba(141, 158, 120, 0.4)',
            borderColor: '#c19a5b',
          }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Floating icon content */}
          <motion.div
            animate="float"
            variants={floatVariants}
            whileHover="wiggle"
          >
            <motion.div variants={wiggleVariants}>
              {event.icon ? (
                <motion.img
                  src={getAssetPath(event.icon)}
                  alt={event.title}
                  className="w-full h-full object-cover"
                  initial={{ scale: 0, rotate: -20 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.3 + index * 0.1,
                    type: 'spring',
                    stiffness: 200,
                  }}
                />
              ) : (
                <motion.span
                  className="text-3xl md:text-4xl"
                  initial={{ scale: 0, rotate: -30 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.4 + index * 0.12,
                    type: 'spring',
                    stiffness: 300,
                    damping: 15,
                  }}
                >
                  {getDefaultEmoji(index)}
                </motion.span>
              )}
            </motion.div>
          </motion.div>

          {/* Sparkles on hover */}
          <Sparkles
            trigger={showSparkles}
            count={isMobile ? 4 : 8}
            colors={['#c19a5b', '#c9a961', '#ffffff']}
          />
        </motion.div>

        {/* Connection dot with pulse */}
        <motion.div
          className="absolute -bottom-3 left-1/2 -translate-x-1/2 hidden md:block"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{
            delay: 0.6 + index * 0.1,
            type: 'spring',
            stiffness: 300,
          }}
        >
          <motion.div
            className="w-3 h-3 rounded-full bg-burgundy border-2 border-white shadow-md"
            animate={{
              scale: isActive ? [1, 1.3, 1] : [1, 1.05, 1],
              boxShadow: isActive
                ? [
                    '0 0 0px rgba(128, 0, 32, 0.4)',
                    '0 0 10px rgba(128, 0, 32, 0.6)',
                    '0 0 0px rgba(128, 0, 32, 0.4)',
                  ]
                : '0 0 0px rgba(128, 0, 32, 0)',
            }}
            transition={{
              duration: isActive ? 1.5 : 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.div>
      </div>

      {/* Time with slide-up and 3D flip */}
      <motion.span
        className="text-burgundy font-bold text-lg md:text-xl mb-1"
        initial={{ opacity: 0, y: 20, rotateX: 45 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true }}
        transition={{
          delay: 0.5 + index * 0.1,
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {event.time}
      </motion.span>

      {/* Title with gradient reveal */}
      <motion.p
        className="text-gray-700 font-elegant text-base md:text-lg leading-tight"
        initial={{ opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
        whileInView={{ opacity: 1, clipPath: 'inset(0 0% 0 0)' }}
        viewport={{ once: true }}
        transition={{
          delay: 0.6 + index * 0.1,
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {event.title}
      </motion.p>
    </motion.div>
  )
}

export function ItinerarySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeIndex, setActiveIndex] = useState(-1)
  const isMobile = useMobile()

  // Scroll-linked animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'center center'],
  })

  // Smooth spring for path drawing
  const pathProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  // Transform for background effects
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])

  return (
    <section
      ref={sectionRef}
      id="itinerary"
      className="py-16 md:py-24 px-4 md:px-8 bg-white overflow-x-hidden relative"
    >
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-cream/30 via-transparent to-cream/30 pointer-events-none"
        style={{ opacity: backgroundOpacity }}
      />

      <div className="max-w-6xl mx-auto relative">
        {/* Section header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="font-cursive text-3xl sm:text-4xl md:text-5xl text-olive mb-4 whitespace-nowrap">
            Itinerario del Día
          </h2>
          <Flourish variant="header" />
        </motion.div>

        {/* Timeline container */}
        <div className="relative">
          {/* SVG Timeline Path - Desktop only */}
          {!isMobile && (
            <TimelinePath
              progress={pathProgress}
              eventCount={timelineEvents.length}
              activeIndex={activeIndex}
              className="hidden md:block"
            />
          )}

          {/* Vertical timeline path for mobile with scroll animation */}
          {isMobile && (
            <TimelinePathVertical
              progress={pathProgress}
              eventCount={timelineEvents.length}
              activeIndex={activeIndex}
              className="absolute left-1/2 -translate-x-1/2 top-0 w-16 h-full z-0"
            />
          )}

          {/* Timeline items - vertical on mobile, horizontal on desktop */}
          <motion.div
            className={
              isMobile
                ? 'flex flex-col items-center gap-8 py-4 relative z-10'
                : 'flex flex-nowrap justify-center gap-6 md:gap-8 pt-20'
            }
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: isMobile ? 0.05 : 0.1 }}
            variants={containerVariants}
          >
            {timelineEvents.map((event, index) => (
              <TimelineItem
                key={event.id}
                event={event}
                index={index}
                isActive={activeIndex === index}
                onHover={() => setActiveIndex(index)}
                onLeave={() => setActiveIndex(-1)}
                isMobile={isMobile}
              />
            ))}
          </motion.div>
        </div>

        {/* Decorative bottom flourish */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <Flourish variant="divider" />
        </motion.div>
      </div>
    </section>
  )
}

// Helper function to get default emojis for timeline items
function getDefaultEmoji(index: number): string {
  const emojis = ['⛪', '💍', '🎊', '🍽️', '💃']
  return emojis[index % emojis.length]
}
