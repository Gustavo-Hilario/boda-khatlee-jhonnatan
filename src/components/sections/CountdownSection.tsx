import { motion } from 'framer-motion'
import { weddingConfig } from '../../config/wedding'
import { CountdownTimer } from '../ui/CountdownTimer'
import { Button } from '../ui/Button'
import { getWeddingCalendarUrl } from '../../utils/calendar'

export function CountdownSection() {
  const { date, displayDate } = weddingConfig
  const calendarUrl = getWeddingCalendarUrl()

  return (
    <section
      id="countdown"
      className="min-h-screen flex flex-col justify-center items-center py-16 px-6 bg-white"
    >
      <motion.div
        className="text-center max-w-2xl"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.p
          className="text-gray-600 font-serif text-lg mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Queremos que nos acompanes en nuestro dia:
        </motion.p>

        <motion.h2
          className="font-serif text-2xl md:text-3xl lg:text-4xl text-burgundy font-semibold mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          {displayDate}
        </motion.h2>

        <motion.p
          className="text-gray-500 uppercase tracking-widest text-sm mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          Faltan:
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <CountdownTimer targetDate={date} />
        </motion.div>

        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          <Button href={calendarUrl} external>
            Agendar el Evento
          </Button>
        </motion.div>
      </motion.div>
    </section>
  )
}
