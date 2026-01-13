import { motion } from 'framer-motion'
import { weddingConfig } from '../../config/wedding'

export function WelcomeSection() {
  const { couple } = weddingConfig

  return (
    <section
      id="welcome"
      className="min-h-screen flex flex-col md:flex-row"
    >
      {/* Photo side */}
      <div className="flex-1 md:flex-[1.2] relative overflow-hidden">
        <motion.div
          className="w-full h-[50vh] md:h-full"
          initial={{ opacity: 0, scale: 1.1 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <img
            src="/images/gallery/Foto8.jpg"
            alt={`${couple.bride} y ${couple.groom}`}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>

      {/* Text side */}
      <div className="flex-1 bg-white flex flex-col justify-center items-center px-6 py-12 md:py-0 text-center">
        <motion.p
          className="text-olive font-serif italic text-lg md:text-xl mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          ¡NOS CASAMOS!
        </motion.p>

        <motion.h1
          className="font-cursive text-4xl md:text-5xl lg:text-6xl text-olive mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {couple.bride} & {couple.groom}
        </motion.h1>

        <motion.p
          className="text-gray-600 font-serif text-base md:text-lg max-w-md"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          Tenemos el honor de invitarte a nuestra boda
        </motion.p>

        {/* Decorative flourish */}
        <motion.div
          className="mt-8 flex items-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <span className="h-px w-12 bg-olive/30" />
          <span className="text-olive text-xl">❤</span>
          <span className="h-px w-12 bg-olive/30" />
        </motion.div>
      </div>
    </section>
  )
}
