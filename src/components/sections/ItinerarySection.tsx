import { motion } from 'framer-motion'
import { timelineEvents } from '../../config/wedding'
import { TimelineItem } from '../ui/TimelineItem'

export function ItinerarySection() {
  return (
    <section
      id="itinerary"
      className="py-16 px-6 bg-white overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-2xl md:text-3xl font-serif text-center text-gray-800 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Nuestro Itinerario
        </motion.h2>

        {/* Timeline container */}
        <div className="relative">
          {/* Horizontal line */}
          <motion.div
            className="absolute top-[88px] left-0 right-0 h-0.5 bg-burgundy hidden md:block"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: 'easeOut' }}
            style={{ originX: 0 }}
          />

          {/* Timeline items */}
          <div className="flex flex-wrap justify-center md:justify-around gap-8 md:gap-4 pt-4">
            {timelineEvents.map((event, index) => (
              <TimelineItem
                key={event.id}
                time={event.time}
                title={event.title}
                icon={event.icon}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
