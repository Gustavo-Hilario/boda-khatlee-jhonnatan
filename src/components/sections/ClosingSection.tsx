import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { weddingConfig, quotes } from '../../config/wedding'
import { Flourish } from '../ui/Flourish'

export function ClosingSection() {
  const { couple } = weddingConfig
  const ref = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // Subtle parallax - reduced from 20% to 10% to avoid clipping
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '10%'])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3])

  return (
    <section
      ref={ref}
      id="closing"
      className="bg-cream overflow-hidden"
    >
      {/* Image with subtle parallax */}
      <div className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{ y }}
        >
          <img
            src="/images/gallery/Foto7.jpg"
            alt={`${couple.bride} y ${couple.groom}`}
            className="w-full h-[120%] object-cover"
          />
        </motion.div>

        {/* Gradient overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-cream via-cream/30 to-transparent"
          style={{ opacity }}
        />

        {/* Decorative corner flourishes */}
        <div className="absolute top-4 left-4 opacity-50">
          <Flourish variant="corner" className="w-16 h-16 md:w-20 md:h-20 text-white" />
        </div>
        <div className="absolute top-4 right-4 opacity-50 transform scale-x-[-1]">
          <Flourish variant="corner" className="w-16 h-16 md:w-20 md:h-20 text-white" />
        </div>
      </div>

      {/* Message content */}
      <motion.div
        className="max-w-3xl mx-auto px-6 py-12 md:py-16 text-center -mt-20 relative z-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Heart decoration */}
        <motion.div
          className="mb-6"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        >
          <svg className="w-10 h-10 mx-auto text-burgundy" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </motion.div>

        <motion.p
          className="text-gray-600 font-serif text-lg md:text-xl leading-relaxed mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {quotes.closing}
        </motion.p>

        <motion.p
          className="text-gray-500 font-serif text-base md:text-lg leading-relaxed mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {quotes.closingFull}
        </motion.p>

        {/* Flourish divider */}
        <Flourish variant="header" className="mb-8" />

        {/* Signature */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <p className="font-cursive text-2xl md:text-3xl text-olive mb-2">
            Con todo nuestro amor,
          </p>
          <p className="font-cursive text-4xl md:text-5xl text-burgundy">
            {couple.bride} & {couple.groom}
          </p>
        </motion.div>

        {/* Bottom flourish corners */}
        <div className="flex justify-center mt-10 gap-4 opacity-40">
          <Flourish variant="corner" className="w-12 h-12 text-olive transform rotate-180" />
          <Flourish variant="corner" className="w-12 h-12 text-olive transform rotate-180 scale-x-[-1]" />
        </div>
      </motion.div>

      {/* Footer */}
      <div className="bg-olive py-6 text-center">
        <p className="text-white/80 text-sm">
          {couple.bride} & {couple.groom} &bull; 7 de Marzo, 2026
        </p>
      </div>
    </section>
  )
}
