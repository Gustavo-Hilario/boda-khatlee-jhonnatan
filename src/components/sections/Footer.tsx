import { motion } from 'framer-motion'
import { weddingConfig } from '../../config/wedding'

export function Footer() {
  const { contact } = weddingConfig
  const whatsappUrl = `https://wa.me/${contact.invitationCreator}`

  return (
    <motion.footer
      className="bg-black py-8 px-6"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-gray-400 text-sm">
          Deseas una invitacion o una pagina web para tus eventos?{' '}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white font-semibold hover:text-burgundy transition-colors"
          >
            Contactame aqui
          </a>
        </p>

        <p className="text-gray-600 text-xs mt-4">
          Hecho con ❤️
        </p>
      </div>
    </motion.footer>
  )
}
