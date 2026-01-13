import { motion } from 'framer-motion'
import { quotes } from '../../config/wedding'

export function QuoteSection() {
  return (
    <section
      id="quote"
      className="min-h-[50vh] md:min-h-[40vh] bg-olive flex items-center justify-center px-6 py-16"
    >
      <motion.div
        className="max-w-3xl text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <p className="text-white font-serif text-lg md:text-xl lg:text-2xl leading-relaxed italic">
          {quotes.main}
        </p>
      </motion.div>
    </section>
  )
}
