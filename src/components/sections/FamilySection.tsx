import { motion, type Variants } from 'framer-motion'
import { weddingConfig } from '../../config/wedding'
import { Flourish } from '../ui/Flourish'

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
}

const nameVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
}

export function FamilySection() {
  const { parents, godparents } = weddingConfig

  return (
    <section
      id="family"
      className="min-h-screen flex flex-col justify-center py-16 md:py-24 px-6 bg-cream relative overflow-hidden"
    >
      {/* Decorative corner flourishes */}
      <div className="absolute top-8 left-8 opacity-15 hidden md:block">
        <Flourish variant="corner" className="w-24 h-24 text-gold-warm" />
      </div>
      <div className="absolute top-8 right-8 opacity-15 hidden md:block transform scale-x-[-1]">
        <Flourish variant="corner" className="w-24 h-24 text-gold-warm" />
      </div>
      <div className="absolute bottom-8 left-8 opacity-15 hidden md:block transform rotate-180 scale-x-[-1]">
        <Flourish variant="corner" className="w-24 h-24 text-gold-warm" />
      </div>
      <div className="absolute bottom-8 right-8 opacity-15 hidden md:block transform rotate-180">
        <Flourish variant="corner" className="w-24 h-24 text-gold-warm" />
      </div>

      <motion.div
        className="max-w-5xl mx-auto text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        {/* Section title - elegant with gold accent */}
        <motion.div variants={cardVariants}>
          <motion.span
            className="text-gold-warm text-2xl"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
          >
            ✦
          </motion.span>
          <h2 className="font-cursive text-4xl md:text-5xl lg:text-6xl text-olive my-4">
            Con la Bendición de Dios
          </h2>
          <p className="text-gray-600 font-serif text-xl md:text-2xl mb-2">
            y nuestros padres
          </p>
          <motion.span
            className="text-gold-warm text-2xl"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
          >
            ✦
          </motion.span>
        </motion.div>

        <Flourish variant="header" className="my-8" />

        {/* Family cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-8">
          {/* Bride's parents */}
          <motion.div
            variants={cardVariants}
            className="card-elegant bg-gradient-to-b from-white to-cream p-8 rounded-3xl shadow-lg"
          >
            <motion.div
              className="w-16 h-16 rounded-full bg-gradient-to-br from-gold-warm/20 to-gold-warm/5 flex items-center justify-center mx-auto mb-6"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <span className="text-3xl">👰</span>
            </motion.div>
            <h3 className="text-burgundy font-semibold text-xl mb-6">
              Padres de la Novia
            </h3>
            <div className="space-y-3">
              {parents.bride.map((parent, index) => (
                <motion.p
                  key={index}
                  custom={index}
                  variants={nameVariants}
                  className="font-serif text-gray-700 text-lg"
                >
                  {parent.name}
                </motion.p>
              ))}
            </div>
            {/* Gold accent line */}
            <motion.div
              className="h-0.5 bg-gradient-to-r from-transparent via-gold-warm to-transparent mt-6"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
          </motion.div>

          {/* Groom's parents */}
          <motion.div
            variants={cardVariants}
            className="card-elegant bg-gradient-to-b from-white to-cream p-8 rounded-3xl shadow-lg"
          >
            <motion.div
              className="w-16 h-16 rounded-full bg-gradient-to-br from-gold-warm/20 to-gold-warm/5 flex items-center justify-center mx-auto mb-6"
              whileHover={{ scale: 1.1, rotate: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <span className="text-3xl">🤵</span>
            </motion.div>
            <h3 className="text-burgundy font-semibold text-xl mb-6">
              Padres del Novio
            </h3>
            <div className="space-y-3">
              {parents.groom.map((parent, index) => (
                <motion.p
                  key={index}
                  custom={index}
                  variants={nameVariants}
                  className="font-serif text-gray-700 text-lg"
                >
                  {parent.name}
                </motion.p>
              ))}
            </div>
            {/* Gold accent line */}
            <motion.div
              className="h-0.5 bg-gradient-to-r from-transparent via-gold-warm to-transparent mt-6"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8 }}
            />
          </motion.div>

          {/* Godparents */}
          <motion.div
            variants={cardVariants}
            className="card-elegant bg-gradient-to-b from-white to-cream p-8 rounded-3xl shadow-lg"
          >
            <motion.div
              className="w-16 h-16 rounded-full bg-gradient-to-br from-gold-warm/20 to-gold-warm/5 flex items-center justify-center mx-auto mb-6"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <span className="text-3xl">✨</span>
            </motion.div>
            <h3 className="text-burgundy font-semibold text-xl mb-6">
              Padrinos
            </h3>
            <div className="space-y-3">
              {godparents.map((godparent, index) => (
                <motion.p
                  key={index}
                  custom={index}
                  variants={nameVariants}
                  className="font-serif text-gray-700 text-lg"
                >
                  {godparent.name}
                </motion.p>
              ))}
            </div>
            {/* Gold accent line */}
            <motion.div
              className="h-0.5 bg-gradient-to-r from-transparent via-gold-warm to-transparent mt-6"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.8 }}
            />
          </motion.div>
        </div>

        {/* Bottom flourish */}
        <motion.div
          className="mt-12"
          variants={cardVariants}
        >
          <Flourish variant="divider" />
        </motion.div>
      </motion.div>
    </section>
  )
}
