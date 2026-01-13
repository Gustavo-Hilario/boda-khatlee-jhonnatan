import { motion, type Variants } from 'framer-motion'
import { timelineEvents } from '../../config/wedding'
import { Flourish } from '../ui/Flourish'

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
      type: 'spring',
      stiffness: 100,
      damping: 15
    },
  },
}

const iconVariants: Variants = {
  hidden: { scale: 0, rotate: -180 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 15,
      delay: 0.2,
    },
  },
}

const pulseVariants: Variants = {
  pulse: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

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

export function ItinerarySection() {
  return (
    <section
      id="itinerary"
      className="py-16 md:py-24 px-4 md:px-8 bg-white overflow-x-hidden"
    >
      <div className="max-w-6xl mx-auto">
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
          {/* Horizontal connecting line - animated drawing effect */}
          <motion.div
            className="absolute top-16 left-[10%] right-[10%] h-0.5 hidden md:block overflow-visible"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            {/* Line background */}
            <motion.div
              className="h-full bg-gradient-to-r from-olive/30 via-olive to-olive/30"
              initial={{ scaleX: 0, originX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            />

            {/* Traveling dot - simulates time passing */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-gold-warm shadow-lg"
              style={{ boxShadow: '0 0 20px rgba(193, 154, 91, 0.6)' }}
              initial={{ left: '0%', opacity: 0, scale: 0 }}
              whileInView={{
                left: ['0%', '100%'],
                opacity: [0, 1, 1, 0],
                scale: [0, 1, 1, 0],
              }}
              viewport={{ once: true }}
              transition={{
                duration: 3,
                delay: 1,
                ease: 'easeInOut',
                times: [0, 0.1, 0.9, 1],
              }}
            />

            {/* Trail effect behind the dot */}
            <motion.div
              className="absolute top-0 h-full bg-gradient-to-r from-gold-warm to-transparent"
              initial={{ width: '0%', opacity: 0 }}
              whileInView={{ width: '100%', opacity: [0, 0.5, 0] }}
              viewport={{ once: true }}
              transition={{
                duration: 3,
                delay: 1,
                ease: 'easeInOut',
              }}
            />
          </motion.div>

          {/* Timeline items - single row with horizontal scroll on mobile */}
          <motion.div
            className="flex flex-nowrap justify-start md:justify-center gap-6 md:gap-8 overflow-x-auto overflow-y-visible pt-4 pb-4 scrollbar-hide"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
          >
            {timelineEvents.map((event, index) => (
              <motion.div
                key={event.id}
                variants={itemVariants}
                className="flex flex-col items-center text-center flex-shrink-0 min-w-[120px] md:min-w-[140px]"
              >
                {/* Icon circle with animations */}
                <div className="relative mb-6 pt-2">
                  {/* Outer glow ring */}
                  <motion.div
                    className="absolute inset-0 rounded-full bg-olive/20"
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1.2, opacity: [0, 0.5, 0] }}
                    viewport={{ once: true }}
                    transition={{
                      delay: 0.5 + index * 0.15,
                      duration: 1,
                      ease: 'easeOut',
                    }}
                  />

                  {/* Main icon container */}
                  <motion.div
                    className="relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-cream border-3 border-olive shadow-lg flex items-center justify-center overflow-hidden cursor-pointer"
                    variants={iconVariants}
                    whileHover={{
                      scale: 1.1,
                      boxShadow: '0 10px 30px rgba(141, 158, 120, 0.4)',
                      borderColor: '#c19a5b',
                    }}
                    whileTap={{ scale: 0.95 }}
                    animate="float"
                    custom={index}
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <motion.div
                      animate="float"
                      variants={floatVariants}
                      custom={index}
                    >
                      {event.icon ? (
                        <motion.img
                          src={event.icon}
                          alt={event.title}
                          className="w-full h-full object-cover"
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{
                            delay: 0.3 + index * 0.1,
                            type: 'spring',
                            stiffness: 200
                          }}
                        />
                      ) : (
                        <motion.span
                          className="text-3xl md:text-4xl"
                          initial={{ scale: 0, rotate: -30 }}
                          whileInView={{ scale: 1, rotate: 0 }}
                          viewport={{ once: true }}
                          transition={{
                            delay: 0.4 + index * 0.15,
                            type: 'spring',
                            stiffness: 300,
                            damping: 15
                          }}
                        >
                          {getDefaultEmoji(index)}
                        </motion.span>
                      )}
                    </motion.div>
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
                      stiffness: 300
                    }}
                  >
                    <motion.div
                      className="w-3 h-3 rounded-full bg-burgundy border-2 border-white shadow-md"
                      animate="pulse"
                      variants={pulseVariants}
                    />
                  </motion.div>
                </div>

                {/* Time with slide-up animation */}
                <motion.span
                  className="text-burgundy font-bold text-lg md:text-xl mb-1"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.5 + index * 0.1,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                >
                  {event.time}
                </motion.span>

                {/* Title with fade-in */}
                <motion.p
                  className="text-gray-700 text-sm md:text-base font-medium leading-tight"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.6 + index * 0.1,
                    duration: 0.5
                  }}
                >
                  {event.title}
                </motion.p>
              </motion.div>
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
