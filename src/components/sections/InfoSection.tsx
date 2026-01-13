import { motion } from 'framer-motion'
import { weddingConfig } from '../../config/wedding'
import { InfoCard, InfoCardTitle, InfoCardContent } from '../ui/InfoCard'
import { Button } from '../ui/Button'

export function InfoSection() {
  const { rsvp, photoUpload } = weddingConfig

  const whatsappUrl = `https://wa.me/${rsvp.whatsappNumber}?text=${encodeURIComponent(
    'Hola! Confirmo mi asistencia a la boda.'
  )}`

  return (
    <section id="info" className="py-16 px-6 md:px-12 bg-white">
      <motion.div
        className="max-w-5xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Gift suggestions */}
          <InfoCard delay={0}>
            <InfoCardTitle>Sugerencia de Regalos</InfoCardTitle>
            <InfoCardContent>
              <div className="flex flex-col items-center justify-center h-full">
                <span className="text-5xl mb-4">💝</span>
                <p className="text-lg">Sobre / Efectivo</p>
              </div>
            </InfoCardContent>
          </InfoCard>

          {/* Adults only */}
          <InfoCard delay={0.1}>
            <InfoCardTitle>Solo Adultos</InfoCardTitle>
            <InfoCardContent>
              <div className="flex flex-col items-center justify-center h-full">
                <span className="text-5xl mb-4">🥂</span>
                <p>
                  Amamos a sus ninos, pero queremos que ustedes puedan bailar y
                  disfrutar sin parar. Invitacion solo para adultos.
                </p>
              </div>
            </InfoCardContent>
          </InfoCard>

          {/* Photo sharing */}
          <InfoCard delay={0.2}>
            <InfoCardTitle>Comparte tus Fotos</InfoCardTitle>
            <InfoCardContent>
              <div className="flex flex-col items-center justify-center h-full">
                <span className="text-5xl mb-4">📸</span>
                <p className="mb-4">
                  Haz eterno este dia compartiendo tus momentos especiales.
                </p>
              </div>
            </InfoCardContent>
            <Button href={photoUpload} external>
              Subir Fotos
            </Button>
          </InfoCard>

          {/* RSVP */}
          <InfoCard delay={0.3}>
            <InfoCardTitle>Asistencia</InfoCardTitle>
            <InfoCardContent>
              <div className="flex flex-col items-center justify-center h-full">
                <span className="text-5xl mb-4">✉️</span>
                <p className="mb-4">
                  Confirma {rsvp.deadline} para mantener nuestra lista.
                </p>
              </div>
            </InfoCardContent>
            <Button href={whatsappUrl} external>
              Confirmar
            </Button>
          </InfoCard>
        </div>
      </motion.div>
    </section>
  )
}
