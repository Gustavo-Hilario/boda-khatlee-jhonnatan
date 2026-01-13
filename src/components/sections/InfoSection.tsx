import { motion, type Variants } from 'framer-motion'
import { weddingConfig } from '../../config/wedding'
import { Button } from '../ui/Button'
import { Flourish } from '../ui/Flourish'

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  },
}

export function InfoSection() {
  const { rsvp, photoUpload } = weddingConfig

  const whatsappUrl = `https://wa.me/${rsvp.whatsappNumber}?text=${encodeURIComponent(
    'Hola! Confirmo mi asistencia a la boda.'
  )}`

  return (
    <section id="info" className="py-16 md:py-24 px-4 md:px-8 bg-white">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-cursive text-4xl md:text-5xl text-olive mb-4">
            Información Importante
          </h2>
          <Flourish variant="header" />
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {/* Gift suggestions */}
          <motion.div
            variants={cardVariants}
            className="bg-olive text-white p-8 rounded-2xl shadow-xl text-center flex flex-col items-center"
          >
            <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mb-4">
              <span className="text-4xl">💝</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Sugerencia de Regalos</h3>
            <p className="text-white/90 text-lg flex-1 flex items-center">
              Sobre / Efectivo
            </p>
            <p className="text-white/70 text-sm mt-3">
              Tu presencia es el mejor regalo
            </p>
          </motion.div>

          {/* Adults only */}
          <motion.div
            variants={cardVariants}
            className="bg-olive text-white p-8 rounded-2xl shadow-xl text-center flex flex-col items-center"
          >
            <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mb-4">
              <span className="text-4xl">🥂</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Solo Adultos</h3>
            <p className="text-white/90 flex-1">
              Amamos a sus niños, pero queremos que ustedes puedan bailar y
              disfrutar sin parar. Invitación solo para adultos.
            </p>
          </motion.div>

          {/* Photo sharing */}
          <motion.div
            variants={cardVariants}
            className="bg-burgundy text-white p-8 rounded-2xl shadow-xl text-center flex flex-col items-center"
          >
            <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mb-4">
              <span className="text-4xl">📸</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Comparte tus Fotos</h3>
            <p className="text-white/90 mb-4 flex-1">
              Haz eterno este día compartiendo tus momentos especiales con nosotros.
            </p>
            <Button href={photoUpload} external variant="outline-light">
              Subir Fotos
            </Button>
          </motion.div>

          {/* RSVP */}
          <motion.div
            variants={cardVariants}
            className="bg-burgundy text-white p-8 rounded-2xl shadow-xl text-center flex flex-col items-center"
          >
            <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mb-4">
              <span className="text-4xl">✉️</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Confirma tu Asistencia</h3>
            <p className="text-white/90 mb-4 flex-1">
              Por favor confirma tu asistencia {rsvp.deadline} para ayudarnos con la organización.
            </p>
            <Button href={whatsappUrl} external variant="outline-light">
              Confirmar por WhatsApp
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
