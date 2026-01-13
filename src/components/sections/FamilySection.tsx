import { motion, type Variants } from 'framer-motion'
import { weddingConfig } from '../../config/wedding'
import { HeartDivider } from '../ui/HeartDivider'

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
      className="min-h-screen flex flex-col justify-center py-16 px-6 bg-gray-50"
    >
      <motion.div
        className="max-w-4xl mx-auto text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <motion.h2
          className="text-xl md:text-2xl font-serif text-gray-700 mb-2"
          variants={itemVariants}
        >
          CON LA BENDICION DE DIOS Y NUESTROS PADRES
        </motion.h2>

        <HeartDivider />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mt-12">
          {/* Bride's parents */}
          <motion.div variants={itemVariants}>
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
          <motion.div variants={itemVariants}>
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
          <motion.div variants={itemVariants}>
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
      </motion.div>
    </section>
  )
}
