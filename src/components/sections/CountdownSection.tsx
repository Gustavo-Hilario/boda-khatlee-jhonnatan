import { motion } from 'framer-motion'
import { weddingConfig } from '../../config/wedding'
import { CountdownTimer } from '../ui/CountdownTimer'
import { Button } from '../ui/Button'
import { getWeddingCalendarUrl } from '../../utils/calendar'
import { Flourish } from '../ui/Flourish'

export function CountdownSection() {
  const { date, displayDate } = weddingConfig
  const calendarUrl = getWeddingCalendarUrl()

  return (
    <section
      id="countdown"
      className="min-h-screen flex flex-col justify-center items-center py-16 px-6 bg-white relative overflow-hidden"
    >
      {/* Decorative corners */}
      <div className="absolute top-8 left-8 opacity-15 hidden md:block">
        <Flourish variant="corner" className="w-24 h-24 text-olive" />
      </div>
      <div className="absolute top-8 right-8 opacity-15 hidden md:block transform scale-x-[-1]">
        <Flourish variant="corner" className="w-24 h-24 text-olive" />
      </div>

      <motion.div
        className="text-center max-w-3xl"
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* "Queremos que nos acompañes" - BIGGER */}
        <motion.p
          className="text-gray-600 font-serif text-xl md:text-2xl lg:text-3xl font-light mb-6 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          Queremos que nos acompañes en nuestro día:
        </motion.p>

        {/* Date display - BIGGER & UPPERCASE */}
        <motion.h2
          className="font-serif text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-burgundy font-semibold mb-4 uppercase tracking-wide"
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {displayDate}
        </motion.h2>

        <Flourish variant="header" />

        <motion.p
          className="text-gold-warm uppercase tracking-[0.3em] text-sm md:text-base mb-8 mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          Faltan:
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <CountdownTimer targetDate={date} />
        </motion.div>

        <motion.div
          className="mt-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <Button href={calendarUrl} external>
            Agendar el Evento
          </Button>
        </motion.div>
      </motion.div>
    </section>
  )
}
