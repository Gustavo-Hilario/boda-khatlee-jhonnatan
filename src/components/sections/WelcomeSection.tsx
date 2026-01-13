import { motion } from 'framer-motion'
import { weddingConfig } from '../../config/wedding'
import { Flourish } from '../ui/Flourish'

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
          transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
        >
          <img
            src="/images/gallery/Foto8.jpg"
            alt={`${couple.bride} y ${couple.groom}`}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Decorative corner flourishes on image */}
        <div className="absolute top-4 left-4 opacity-40">
          <Flourish variant="corner" className="w-16 h-16 md:w-20 md:h-20 text-white" />
        </div>
        <div className="absolute bottom-4 right-4 opacity-40 transform rotate-180">
          <Flourish variant="corner" className="w-16 h-16 md:w-20 md:h-20 text-white" />
        </div>
      </div>

      {/* Text side */}
      <div className="flex-1 bg-cream flex flex-col justify-center items-center px-6 py-12 md:py-0 text-center relative">
        {/* Decorative corner */}
        <div className="absolute top-4 right-4 opacity-30 hidden md:block">
          <Flourish variant="corner" className="w-16 h-16 text-olive transform scale-x-[-1]" />
        </div>

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
          className="mt-8"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Flourish variant="header" />
        </motion.div>
      </div>
    </section>
  )
}
