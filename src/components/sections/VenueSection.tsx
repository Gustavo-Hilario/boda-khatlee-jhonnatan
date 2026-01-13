import { motion, type Variants } from 'framer-motion'
import { weddingConfig } from '../../config/wedding'
import { Button } from '../ui/Button'
import { Flourish } from '../ui/Flourish'

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  },
}

export function VenueSection() {
  const { venues, dressCode } = weddingConfig

  return (
    <section
      id="venue"
      className="py-16 md:py-24 px-4 md:px-8 bg-cream"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-cursive text-4xl md:text-5xl text-olive mb-4">
            Ceremonia & Recepción
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
          {/* Religious Ceremony */}
          <motion.div
            variants={cardVariants}
            className="bg-olive text-white p-6 md:p-8 rounded-2xl shadow-xl flex flex-col"
          >
            {venues.religious.image && (
              <div className="w-full aspect-[16/9] rounded-xl overflow-hidden mb-4 bg-white/10">
                <img
                  src={venues.religious.image}
                  alt={venues.religious.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            )}
            <div className="flex-1 flex flex-col">
              <div className="flex items-center justify-center gap-2 mb-3">
                <span className="text-2xl">⛪</span>
                <h3 className="text-xl font-semibold">Ceremonia Religiosa</h3>
              </div>
              <p className="text-white/90 font-medium text-lg mb-2">{venues.religious.name}</p>
              <p className="text-white/80 text-sm mb-4 flex-1">{venues.religious.location}</p>
              <Button
                href={venues.religious.mapUrl}
                external
                size="sm"
                className="self-center"
              >
                Ver Ubicación
              </Button>
            </div>
          </motion.div>

          {/* Civil Ceremony */}
          <motion.div
            variants={cardVariants}
            className="bg-olive text-white p-6 md:p-8 rounded-2xl shadow-xl flex flex-col"
          >
            <div className="w-full aspect-[16/9] rounded-xl overflow-hidden mb-4 bg-white/10 flex items-center justify-center">
              <span className="text-4xl">💒</span>
            </div>
            <div className="flex-1 flex flex-col">
              <div className="flex items-center justify-center gap-2 mb-3">
                <span className="text-2xl">📜</span>
                <h3 className="text-xl font-semibold">Ceremonia Civil</h3>
              </div>
              <p className="text-white/90 font-medium text-lg mb-2">{venues.civil.name}</p>
              <p className="text-white/80 text-sm mb-4 flex-1">{venues.civil.location}</p>
              <Button
                href={venues.civil.mapUrl}
                external
                size="sm"
                className="self-center"
              >
                Ver Ubicación
              </Button>
            </div>
          </motion.div>

          {/* Reception */}
          <motion.div
            variants={cardVariants}
            className="bg-olive text-white p-6 md:p-8 rounded-2xl shadow-xl flex flex-col"
          >
            <div className="w-full aspect-[16/9] rounded-xl overflow-hidden mb-4 bg-white/10 flex items-center justify-center">
              <span className="text-4xl">🎊</span>
            </div>
            <div className="flex-1 flex flex-col">
              <div className="flex items-center justify-center gap-2 mb-3">
                <span className="text-2xl">🥂</span>
                <h3 className="text-xl font-semibold">Recepción</h3>
              </div>
              <p className="text-white/90 font-medium text-lg mb-2">{venues.reception.name}</p>
              <p className="text-white/80 text-sm mb-4 flex-1">{venues.reception.location}</p>
              <Button
                href={venues.reception.mapUrl}
                external
                size="sm"
                className="self-center"
              >
                Ver Ubicación
              </Button>
            </div>
          </motion.div>

          {/* Dress Code */}
          <motion.div
            variants={cardVariants}
            className="bg-burgundy text-white p-6 md:p-8 rounded-2xl shadow-xl flex flex-col"
          >
            <div className="w-full aspect-[16/9] rounded-xl overflow-hidden mb-4 bg-white/10 flex items-center justify-center">
              <span className="text-4xl">👗</span>
            </div>
            <div className="flex-1 flex flex-col">
              <div className="flex items-center justify-center gap-2 mb-3">
                <span className="text-2xl">✨</span>
                <h3 className="text-xl font-semibold">Dress Code</h3>
              </div>
              <p className="text-white font-bold text-2xl mb-3">{dressCode.style}</p>
              <div className="text-white/80 text-sm space-y-2 mb-4 flex-1">
                <p>
                  El color <strong className="text-white">{dressCode.reserved.join(', ')}</strong> está
                  reservado exclusivamente para la novia.
                </p>
                <p>
                  <strong className="text-white">{dressCode.bridal.join(' y ')}</strong> reservados para
                  damas y caballeros de honor.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 justify-center">
                {dressCode.pinterestWomen && (
                  <Button href={dressCode.pinterestWomen} external size="sm" variant="outline-light">
                    Pinterest Mujeres
                  </Button>
                )}
                {dressCode.pinterestMen && (
                  <Button href={dressCode.pinterestMen} external size="sm" variant="outline-light">
                    Pinterest Hombres
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
