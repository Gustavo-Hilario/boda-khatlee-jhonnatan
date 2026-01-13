import { motion, type Variants } from 'framer-motion'
import { weddingConfig } from '../../config/wedding'
import { Flourish } from '../ui/Flourish'

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  },
}

export function FamilySection() {
  const { parents, godparents } = weddingConfig

  return (
    <section
      id="family"
      className="min-h-screen flex flex-col justify-center py-16 md:py-24 px-6 bg-cream relative overflow-hidden"
    >
      {/* Decorative corner flourishes */}
      <div className="absolute top-8 left-8 opacity-20 hidden md:block">
        <Flourish variant="corner" className="w-20 h-20 text-olive" />
      </div>
      <div className="absolute top-8 right-8 opacity-20 hidden md:block transform scale-x-[-1]">
        <Flourish variant="corner" className="w-20 h-20 text-olive" />
      </div>
      <div className="absolute bottom-8 left-8 opacity-20 hidden md:block transform rotate-180 scale-x-[-1]">
        <Flourish variant="corner" className="w-20 h-20 text-olive" />
      </div>
      <div className="absolute bottom-8 right-8 opacity-20 hidden md:block transform rotate-180">
        <Flourish variant="corner" className="w-20 h-20 text-olive" />
      </div>

      <motion.div
        className="max-w-4xl mx-auto text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        {/* Section title */}
        <motion.h2
          className="font-cursive text-3xl md:text-4xl text-olive mb-2"
          variants={itemVariants}
        >
          Con la Bendición de Dios
        </motion.h2>

        <motion.p
          className="text-gray-600 font-serif text-lg md:text-xl mb-4"
          variants={itemVariants}
        >
          y nuestros padres
        </motion.p>

        <Flourish variant="header" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mt-12">
          {/* Bride's parents */}
          <motion.div
            variants={itemVariants}
            className="bg-white/50 backdrop-blur-sm p-6 rounded-2xl shadow-sm"
          >
            <div className="w-12 h-12 rounded-full bg-burgundy/10 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">👰</span>
            </div>
            <h3 className="text-burgundy font-semibold text-lg mb-4">
              Padres de la Novia
            </h3>
            <div className="space-y-2">
              {parents.bride.map((parent, index) => (
                <motion.p
                  key={index}
                  className="font-serif text-gray-600 text-base"
                  variants={itemVariants}
                >
                  {parent.name}
                </motion.p>
              ))}
            </div>
          </motion.div>

          {/* Groom's parents */}
          <motion.div
            variants={itemVariants}
            className="bg-white/50 backdrop-blur-sm p-6 rounded-2xl shadow-sm"
          >
            <div className="w-12 h-12 rounded-full bg-burgundy/10 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🤵</span>
            </div>
            <h3 className="text-burgundy font-semibold text-lg mb-4">
              Padres del Novio
            </h3>
            <div className="space-y-2">
              {parents.groom.map((parent, index) => (
                <motion.p
                  key={index}
                  className="font-serif text-gray-600 text-base"
                  variants={itemVariants}
                >
                  {parent.name}
                </motion.p>
              ))}
            </div>
          </motion.div>

          {/* Godparents */}
          <motion.div
            variants={itemVariants}
            className="bg-white/50 backdrop-blur-sm p-6 rounded-2xl shadow-sm"
          >
            <div className="w-12 h-12 rounded-full bg-burgundy/10 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">✨</span>
            </div>
            <h3 className="text-burgundy font-semibold text-lg mb-4">
              Padrinos
            </h3>
            <div className="space-y-2">
              {godparents.map((godparent, index) => (
                <motion.p
                  key={index}
                  className="font-serif text-gray-600 text-base"
                  variants={itemVariants}
                >
                  {godparent.name}
                </motion.p>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom flourish */}
        <motion.div
          className="mt-12"
          variants={itemVariants}
        >
          <Flourish variant="divider" />
        </motion.div>
      </motion.div>
    </section>
  )
}
