import { motion } from 'framer-motion'

export function Footer() {
  return (
    <motion.footer
      className="bg-black py-8 px-6"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-gray-600 text-xs">
          Hecho con ❤️
        </p>
      </div>
    </motion.footer>
  )
}
