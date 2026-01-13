import { motion, type Variants } from 'framer-motion'
import { weddingConfig } from '../../config/wedding'
import { CountdownTimer } from '../ui/CountdownTimer'
import { Button } from '../ui/Button'
import { getWeddingCalendarUrl } from '../../utils/calendar'
import { Flourish } from '../ui/Flourish'

// Stamp effect for date
const stampVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 2,
    rotate: -15,
    y: -50,
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 20,
      delay: 0.3,
    },
  },
}

// Impact shake after stamp lands
const shakeVariants: Variants = {
  shake: {
    x: [0, -3, 3, -2, 2, 0],
    transition: {
      duration: 0.4,
      delay: 0.5,
    },
  },
}

// Ink spread effect
const inkSpreadVariants: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: [0, 1.2, 1],
    opacity: [0, 0.3, 0],
    transition: {
      duration: 0.6,
      delay: 0.4,
      ease: 'easeOut',
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

// Float animation for decorations
const floatVariants: Variants = {
  animate: {
    y: [0, -10, 0],
    rotate: [0, 2, -2, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

// Corner flourish entrance
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

// Button pulse
const buttonPulseVariants: Variants = {
  animate: {
    boxShadow: [
      '0 0 0 0 rgba(193, 154, 91, 0.4)',
      '0 0 0 10px rgba(193, 154, 91, 0)',
    ],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeOut',
    },
  },
}

export function CountdownSection() {
  const { date, displayDate } = weddingConfig
  const calendarUrl = getWeddingCalendarUrl()

  return (
    <section
      id="countdown"
      className="min-h-screen flex flex-col justify-center items-center py-16 px-6 bg-white relative overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 bg-pattern-dots opacity-30" />

      {/* Decorative corners with float animation */}
      <motion.div
        className="absolute top-8 left-8 opacity-15 hidden md:block"
        variants={cornerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={0.2}
      >
        <motion.div variants={floatVariants} animate="animate">
          <Flourish variant="corner" className="w-24 h-24 text-olive" />
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute top-8 right-8 opacity-15 hidden md:block transform scale-x-[-1]"
        variants={cornerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={0.4}
      >
        <motion.div variants={floatVariants} animate="animate" transition={{ delay: 1 }}>
          <Flourish variant="corner" className="w-24 h-24 text-olive" />
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-8 opacity-10 hidden md:block transform rotate-180"
        variants={cornerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={0.6}
      >
        <motion.div variants={floatVariants} animate="animate" transition={{ delay: 2 }}>
          <Flourish variant="corner" className="w-20 h-20 text-gold-warm" />
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 right-8 opacity-10 hidden md:block transform rotate-180 scale-x-[-1]"
        variants={cornerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={0.8}
      >
        <motion.div variants={floatVariants} animate="animate" transition={{ delay: 3 }}>
          <Flourish variant="corner" className="w-20 h-20 text-gold-warm" />
        </motion.div>
      </motion.div>

      <motion.div
        className="text-center max-w-3xl relative z-10"
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* "Queremos que nos acompañes" with text reveal */}
        <motion.p
          className="text-gray-600 font-elegant text-2xl md:text-3xl lg:text-4xl mb-6 leading-relaxed italic"
          variants={textRevealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Queremos que nos acompañes en nuestro día:
        </motion.p>

        {/* Date display with stamp effect */}
        <motion.div
          className="relative inline-block mb-4"
          variants={shakeVariants}
          animate="shake"
        >
          {/* Ink spread behind stamp */}
          <motion.div
            className="absolute inset-0 bg-burgundy/20 rounded-lg blur-xl"
            variants={inkSpreadVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          />

          <motion.h2
            className="font-serif text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-burgundy font-semibold uppercase tracking-wide relative"
            variants={stampVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{
              textShadow: '2px 2px 0 rgba(128, 0, 32, 0.1)',
            }}
          >
            {displayDate}
          </motion.h2>
        </motion.div>

        {/* Flourish divider with draw animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <Flourish variant="header" />
        </motion.div>

        {/* "Faltan:" label with shimmer */}
        <motion.p
          className="text-gold-warm uppercase tracking-[0.3em] text-sm md:text-base mb-8 mt-8 relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <motion.span
            className="relative inline-block"
            animate={{
              backgroundPosition: ['200% center', '-200% center'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{
              background: 'linear-gradient(90deg, #c19a5b 0%, #d4af37 50%, #c19a5b 100%)',
              backgroundSize: '200% 100%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Faltan:
          </motion.span>
        </motion.p>

        {/* Enhanced Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <CountdownTimer targetDate={date} size="md" showMilestones={true} />
        </motion.div>

        {/* Calendar button with pulse glow */}
        <motion.div
          className="mt-14 relative"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="absolute inset-0 rounded-full"
            variants={buttonPulseVariants}
            animate="animate"
          />
          <Button href={calendarUrl} external>
            Agendar el Evento
          </Button>
        </motion.div>
      </motion.div>

      {/* Floating decorative elements */}
      <motion.div
        className="absolute top-1/4 left-10 w-3 h-3 rounded-full bg-gold-warm/30 hidden md:block"
        animate={{
          y: [0, -15, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-1/3 right-12 w-4 h-4 rounded-full bg-olive/20 hidden md:block"
        animate={{
          y: [0, -20, 0],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />
      <motion.div
        className="absolute top-1/3 right-20 w-2 h-2 rounded-full bg-burgundy/20 hidden md:block"
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
