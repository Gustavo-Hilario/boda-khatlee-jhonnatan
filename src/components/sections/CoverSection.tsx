import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useMusic } from '../../context/MusicContext'

interface CoverSectionProps {
  onOpen?: () => void
}

export function CoverSection({ onOpen }: CoverSectionProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { togglePlay, hasInteracted } = useMusic()

  const handleOpen = () => {
    setIsOpen(true)

    // Prompt to play music if user hasn't interacted yet
    if (!hasInteracted) {
      setTimeout(() => {
        togglePlay()
      }, 800)
    }

    onOpen?.()
  }

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          id="cover"
          className="fixed inset-0 z-50 cursor-pointer"
          onClick={handleOpen}
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{
            duration: 1.2,
            ease: [0.43, 0.13, 0.23, 0.96],
          }}
        >
          {/* Background */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/portada/Fondo.jpg')" }}
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/20" />

          {/* Content */}
          <div className="relative h-full flex flex-col items-center justify-center px-4">
            {/* Envelope/Card image */}
            <motion.img
              src="/images/portada/Tarjeta.png"
              alt="Invitacion de boda"
              className="w-full max-w-[400px] md:max-w-[600px] lg:max-w-[800px] drop-shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              whileHover={{ scale: 1.02 }}
            />

            {/* Tap to open text */}
            <motion.p
              className="mt-8 text-white/90 text-sm tracking-[0.3em] uppercase"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              Toca para abrir
            </motion.p>

            {/* Animated arrow */}
            <motion.div
              className="mt-4"
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="white"
                className="w-6 h-6 opacity-70"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
