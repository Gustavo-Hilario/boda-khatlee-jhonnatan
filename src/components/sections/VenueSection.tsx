import { motion } from 'framer-motion'
import { weddingConfig } from '../../config/wedding'
import { InfoCard, InfoCardTitle, InfoCardContent, InfoCardImage } from '../ui/InfoCard'
import { Button } from '../ui/Button'

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
}

export function VenueSection() {
  const { venues, dressCode } = weddingConfig

  return (
    <section
      id="venue"
      className="py-16 px-6 md:px-12 bg-gray-50"
    >
      <motion.div
        className="max-w-5xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Religious Ceremony */}
          <InfoCard delay={0}>
            {venues.religious.image && (
              <InfoCardImage
                src={venues.religious.image}
                alt={venues.religious.name}
              />
            )}
            <InfoCardTitle>{venues.religious.name}</InfoCardTitle>
            <InfoCardContent>
              <p>Se realizara en: {venues.religious.location}</p>
            </InfoCardContent>
            <Button
              href={venues.religious.mapUrl}
              external
              size="sm"
              className="mt-4"
            >
              Ver Ubicacion
            </Button>
          </InfoCard>

          {/* Civil Ceremony */}
          <InfoCard delay={0.1}>
            <div className="w-full aspect-video max-h-[150px] rounded-xl bg-white/10 mb-4 flex items-center justify-center">
              <span className="text-white/50 text-sm">Imagen</span>
            </div>
            <InfoCardTitle>{venues.civil.name}</InfoCardTitle>
            <InfoCardContent>
              <p>Se realizara en: {venues.civil.location}</p>
            </InfoCardContent>
            <Button
              href={venues.civil.mapUrl}
              external
              size="sm"
              className="mt-4"
            >
              Ver Ubicacion
            </Button>
          </InfoCard>

          {/* Reception */}
          <InfoCard delay={0.2}>
            <div className="w-full aspect-video max-h-[150px] rounded-xl bg-white/10 mb-4 flex items-center justify-center">
              <span className="text-white/50 text-sm">Imagen</span>
            </div>
            <InfoCardTitle>{venues.reception.name}</InfoCardTitle>
            <InfoCardContent>
              <p>Los esperamos en: {venues.reception.location}</p>
            </InfoCardContent>
            <Button
              href={venues.reception.mapUrl}
              external
              size="sm"
              className="mt-4"
            >
              Ver Ubicacion
            </Button>
          </InfoCard>

          {/* Dress Code */}
          <InfoCard delay={0.3}>
            <InfoCardTitle>Dress Code</InfoCardTitle>
            <InfoCardContent>
              <p className="text-xl font-bold mb-3">{dressCode.style}</p>
              <p className="text-sm mb-2">
                El color <strong>{dressCode.reserved.join(', ')}</strong> esta
                reservado exclusivamente para la novia.
              </p>
              <p className="text-sm">
                <strong>{dressCode.bridal.join(' y ')}</strong> reservados para
                damas y caballeros de honor.
              </p>
            </InfoCardContent>
            <div className="flex flex-wrap gap-3 mt-4 justify-center">
              {dressCode.pinterestWomen && (
                <Button href={dressCode.pinterestWomen} external size="sm">
                  Pinterest Mujeres
                </Button>
              )}
              {dressCode.pinterestMen && (
                <Button href={dressCode.pinterestMen} external size="sm">
                  Pinterest Hombres
                </Button>
              )}
            </div>
          </InfoCard>
        </div>
      </motion.div>
    </section>
  )
}
