import { motion, type Variants } from 'framer-motion'
import { timelineEvents } from '../../config/wedding'
import { Flourish } from '../ui/Flourish'

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  },
}

export function ItinerarySection() {
  return (
    <section
      id="itinerary"
      className="py-16 md:py-24 px-4 md:px-8 bg-white overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-cursive text-4xl md:text-5xl text-olive mb-4">
            Itinerario del Día
          </h2>
          <Flourish variant="header" />
        </motion.div>

        {/* Timeline container */}
        <div className="relative">
          {/* Horizontal connecting line - only on desktop */}
          <motion.div
            className="absolute top-12 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-transparent via-olive to-transparent hidden md:block"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
          />

          {/* Timeline items */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
          >
            {timelineEvents.map((event, index) => (
              <motion.div
                key={event.id}
                variants={itemVariants}
                className="flex flex-col items-center text-center"
              >
                {/* Icon circle */}
                <div className="relative mb-6">
                  <motion.div
                    className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-cream border-3 border-olive shadow-lg flex items-center justify-center overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    {event.icon ? (
                      <img
                        src={event.icon}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-3xl md:text-4xl">
                        {getDefaultEmoji(index)}
                      </span>
                    )}
                  </motion.div>

                  {/* Connection dot */}
                  <motion.div
                    className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-burgundy border-2 border-white shadow-md hidden md:block"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: 0.4 + index * 0.1,
                      type: 'spring',
                      stiffness: 300
                    }}
                  />
                </div>

                {/* Time */}
                <span className="text-burgundy font-bold text-lg md:text-xl mb-1">
                  {event.time}
                </span>

                {/* Title */}
                <p className="text-gray-700 text-sm md:text-base font-medium leading-tight">
                  {event.title}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Decorative bottom flourish */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
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
