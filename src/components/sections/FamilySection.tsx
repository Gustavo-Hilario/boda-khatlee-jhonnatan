import { useState } from 'react'
import { motion, type Variants } from 'framer-motion'
import { weddingConfig } from '../../config/wedding'
import { Flourish } from '../ui/Flourish'

// Container stagger variants
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
}

// 3D card entrance with rotation
const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 60,
    rotateX: 15,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

// Icon entrance with spin and bounce
const iconVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0,
    rotate: -180,
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 12,
      delay: 0.2,
    },
  },
}

// Sparkle burst around icon
const sparkleVariants: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: (i: number) => ({
    scale: [0, 1, 0],
    opacity: [0, 1, 0],
    transition: {
      delay: 0.4 + i * 0.1,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
}

// Name typewriter effect
const nameContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
}

const nameVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -20,
    filter: 'blur(4px)',
  },
  visible: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

// Gold line shimmer
const lineVariants: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

// Corner flourish with float
const cornerVariants: Variants = {
  hidden: { opacity: 0, scale: 0.5, rotate: -20 },
  visible: (delay: number) => ({
    opacity: 0.15,
    scale: 1,
    rotate: 0,
    transition: {
      delay,
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

// Float animation
const floatVariants: Variants = {
  animate: {
    y: [0, -8, 0],
    rotate: [0, 1, -1, 0],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

// Card hover glow
const glowVariants: Variants = {
  rest: {
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
  },
  hover: {
    boxShadow: '0 20px 60px rgba(193, 154, 91, 0.2)',
    y: -8,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
}

interface FamilyCardProps {
  title: string
  icon: string
  names: { name: string; relationship?: string }[]
  delay: number
}

function FamilyCard({ title, icon, names, delay }: FamilyCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Generate sparkle positions around icon
  const sparklePositions = [
    { x: -20, y: -20 },
    { x: 20, y: -20 },
    { x: -25, y: 5 },
    { x: 25, y: 5 },
    { x: 0, y: -25 },
  ]

  return (
    <motion.div
      variants={cardVariants}
      initial="rest"
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative"
      style={{ perspective: '1000px' }}
    >
      <motion.div
        variants={glowVariants}
        className="bg-gradient-to-b from-white to-cream p-8 rounded-3xl relative overflow-hidden"
      >
        {/* Background pattern on hover */}
        <motion.div
          className="absolute inset-0 bg-pattern-floral opacity-0 pointer-events-none"
          animate={{ opacity: isHovered ? 0.1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Icon with sparkle burst */}
        <div className="relative mx-auto mb-6 w-20 h-20">
          {/* Sparkles */}
          {sparklePositions.map((pos, i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-gold-warm"
              style={{
                transform: `translate(${pos.x}px, ${pos.y}px)`,
              }}
              variants={sparkleVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
            />
          ))}

          {/* Glow ring */}
          <motion.div
            className="absolute inset-0 rounded-full bg-gold-warm/20"
            animate={
              isHovered
                ? {
                    scale: [1, 1.3, 1],
                    opacity: [0.2, 0.4, 0.2],
                  }
                : {}
            }
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Icon container */}
          <motion.div
            className="w-20 h-20 rounded-full bg-gradient-to-br from-gold-warm/20 to-gold-warm/5 flex items-center justify-center relative z-10"
            variants={iconVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{
              scale: 1.1,
              rotate: [0, -5, 5, 0],
              transition: { duration: 0.4 },
            }}
          >
            <motion.span
              className="text-4xl"
              animate={isHovered ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              {icon}
            </motion.span>
          </motion.div>
        </div>

        {/* Title with gradient */}
        <motion.h3
          className="text-burgundy font-semibold text-xl mb-6 relative"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: delay + 0.2, duration: 0.5 }}
        >
          {title}
        </motion.h3>

        {/* Names with typewriter-like reveal */}
        <motion.div
          className="space-y-3"
          variants={nameContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {names.map((person, index) => (
            <motion.div key={index} variants={nameVariants} className="relative">
              <p className="font-serif text-gray-700 text-lg">
                {person.name}
              </p>
              {/* Typewriter cursor that appears briefly */}
              <motion.span
                className="absolute -right-3 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-gold-warm"
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ delay: 0.5 + index * 0.15, duration: 0.3 }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Gold accent line with shimmer */}
        <motion.div
          className="relative h-0.5 mt-6 overflow-hidden"
          variants={lineVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: delay + 0.5 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold-warm to-transparent" />
          <motion.div
            className="absolute inset-0"
            animate={{
              x: ['-100%', '200%'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3,
              ease: 'linear',
            }}
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)',
            }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export function FamilySection() {
  const { parents, godparents } = weddingConfig

  return (
    <section
      id="family"
      className="min-h-screen flex flex-col justify-center py-16 md:py-24 px-6 bg-cream relative overflow-hidden"
      style={{ perspective: '1200px' }}
    >
      {/* Decorative corner flourishes with float */}
      <motion.div
        className="absolute top-8 left-8 hidden md:block"
        variants={cornerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={0.1}
      >
        <motion.div variants={floatVariants} animate="animate">
          <Flourish variant="corner" className="w-24 h-24 text-gold-warm" />
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute top-8 right-8 hidden md:block transform scale-x-[-1]"
        variants={cornerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={0.2}
      >
        <motion.div
          variants={floatVariants}
          animate="animate"
          transition={{ delay: 1 }}
        >
          <Flourish variant="corner" className="w-24 h-24 text-gold-warm" />
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-8 hidden md:block transform rotate-180 scale-x-[-1]"
        variants={cornerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={0.3}
      >
        <motion.div
          variants={floatVariants}
          animate="animate"
          transition={{ delay: 2 }}
        >
          <Flourish variant="corner" className="w-24 h-24 text-gold-warm" />
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 right-8 hidden md:block transform rotate-180"
        variants={cornerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={0.4}
      >
        <motion.div
          variants={floatVariants}
          animate="animate"
          transition={{ delay: 3 }}
        >
          <Flourish variant="corner" className="w-24 h-24 text-gold-warm" />
        </motion.div>
      </motion.div>

      <motion.div
        className="max-w-5xl mx-auto text-center relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        {/* Section title - elegant with animated gold accents */}
        <motion.div variants={cardVariants}>
          <motion.span
            className="text-gold-warm text-2xl inline-block"
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
          >
            ✦
          </motion.span>

          <motion.h2
            className="font-cursive text-4xl md:text-5xl lg:text-6xl text-olive my-4"
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            Con la Bendición de Dios
          </motion.h2>

          <motion.p
            className="text-gray-600 font-serif text-xl md:text-2xl mb-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            y nuestros padres
          </motion.p>

          <motion.span
            className="text-gold-warm text-2xl inline-block"
            initial={{ opacity: 0, scale: 0, rotate: 180 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
          >
            ✦
          </motion.span>
        </motion.div>

        {/* Animated flourish */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <Flourish variant="header" className="my-8" />
        </motion.div>

        {/* Family cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-8">
          <FamilyCard
            title="Padres de la Novia"
            icon="👰"
            names={parents.bride}
            delay={0.2}
          />

          <FamilyCard
            title="Padres del Novio"
            icon="🤵"
            names={parents.groom}
            delay={0.4}
          />

          <FamilyCard
            title="Padrinos"
            icon="✨"
            names={godparents}
            delay={0.6}
          />
        </div>

        {/* Bottom flourish with fade */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <Flourish variant="divider" />
        </motion.div>
      </motion.div>

      {/* Floating decorative particles */}
      <motion.div
        className="absolute top-1/4 left-16 w-3 h-3 rounded-full bg-gold-warm/30 hidden md:block"
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
        className="absolute bottom-1/3 right-20 w-4 h-4 rounded-full bg-olive/20 hidden md:block"
        animate={{
          y: [0, -20, 0],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1.5,
        }}
      />
    </section>
  )
}
