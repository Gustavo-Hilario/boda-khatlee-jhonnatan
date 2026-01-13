import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { weddingConfig, quotes } from '../../config/wedding'

export function ClosingSection() {
  const { couple } = weddingConfig
  const ref = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])

  return (
    <section ref={ref} id="closing" className="py-0 bg-white overflow-hidden">
      {/* Full-width image with parallax */}
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <motion.img
          src="/images/gallery/Foto7.jpg"
          alt={`${couple.bride} y ${couple.groom}`}
          className="w-full h-full object-cover scale-110"
          style={{ y }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
      </div>

      {/* Message */}
      <motion.div
        className="max-w-3xl mx-auto px-6 py-12 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <p className="text-gray-600 font-serif text-base md:text-lg leading-relaxed mb-6">
          {quotes.closing}
        </p>

        <p className="text-gray-600 font-serif text-base md:text-lg leading-relaxed mb-8">
          {quotes.closingFull}
        </p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <p className="font-cursive text-3xl md:text-4xl text-olive">
            Con todo nuestro amor,
          </p>
          <p className="font-cursive text-4xl md:text-5xl text-burgundy mt-2">
            {couple.bride} & {couple.groom}
          </p>
        </motion.div>
      </motion.div>
    </section>
  )
}
