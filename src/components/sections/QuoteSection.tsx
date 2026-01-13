import { motion } from 'framer-motion'
import { quotes } from '../../config/wedding'

export function QuoteSection() {
  return (
    <section
      id="quote"
      className="bg-olive flex items-center justify-center px-6 py-20 md:py-28 relative overflow-hidden"
    >
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" preserveAspectRatio="none">
          <pattern id="quote-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="1" fill="white" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#quote-pattern)" />
        </svg>
      </div>

      <motion.div
        className="max-w-3xl text-center relative z-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Opening quote mark */}
        <motion.span
          className="block text-6xl text-white/30 font-serif leading-none mb-4"
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          "
        </motion.span>

        <p className="text-white font-serif text-lg md:text-xl lg:text-2xl leading-relaxed italic px-4">
          {quotes.main}
        </p>

        {/* Closing quote mark */}
        <motion.span
          className="block text-6xl text-white/30 font-serif leading-none mt-4"
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          "
        </motion.span>
      </motion.div>
    </section>
  )
}
