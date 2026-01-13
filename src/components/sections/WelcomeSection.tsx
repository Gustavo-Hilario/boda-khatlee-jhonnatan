import { motion } from 'framer-motion'
import { weddingConfig } from '../../config/wedding'
import { Flourish } from '../ui/Flourish'

export function WelcomeSection() {
  const { couple } = weddingConfig

  return (
    <section
      id="welcome"
      className="h-screen flex flex-col md:flex-row overflow-hidden"
    >
      {/* Photo side - takes 45% on mobile, more on desktop */}
      <div className="h-[45vh] md:h-full md:flex-[1.2] relative overflow-hidden flex-shrink-0">
        <motion.div
          className="w-full h-full"
          initial={{ opacity: 0, scale: 1.1 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
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

      {/* Text side - takes remaining 55% on mobile */}
      <div className="flex-1 md:flex-1 bg-cream flex flex-col justify-center items-center px-6 py-6 md:py-0 text-center relative overflow-hidden">
        {/* Decorative corner */}
        <div className="absolute top-4 right-4 opacity-30 hidden md:block">
          <Flourish variant="corner" className="w-16 h-16 text-olive transform scale-x-[-1]" />
        </div>

        {/* "¡NOS CASAMOS!" - BIGGER */}
        <motion.p
          className="text-gold-warm font-serif text-xl md:text-3xl lg:text-4xl tracking-widest uppercase mb-4 md:mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          ¡Nos Casamos!
        </motion.p>

        {/* Couple names - BIGGER */}
        <motion.h1
          className="font-cursive text-4xl md:text-6xl lg:text-7xl xl:text-8xl text-olive mb-4 md:mb-6 leading-tight"
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {couple.bride} & {couple.groom}
        </motion.h1>

        {/* Invitation text - BIGGER */}
        <motion.p
          className="text-gray-600 font-serif text-base md:text-xl lg:text-2xl max-w-md leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          Tenemos el honor de invitarte a nuestra boda
        </motion.p>

        {/* Decorative flourish */}
        <motion.div
          className="mt-6 md:mt-8"
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
