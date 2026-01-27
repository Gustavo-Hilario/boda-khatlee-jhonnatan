import { useState } from 'react'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { useMusic } from '../../context/MusicContext'

import { Envelope } from '../ui/envelope'

interface CoverSectionProps {
  onOpen?: () => void
}

// Envelope entrance animation
const envelopeVariants: Variants = {
  initial: {
    scale: 0.9,
    opacity: 0,
  },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 1,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

export function CoverSection({ onOpen }: CoverSectionProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isEnvelopeOpening, setIsEnvelopeOpening] = useState(false)
  const { togglePlay, hasInteracted } = useMusic()
  const handleEnvelopeClick = () => {
    if (!isEnvelopeOpening) {
      setIsEnvelopeOpening(true)
    }
  }

  const handleEnvelopeOpenComplete = () => {
    // After envelope animation completes, trigger the slide away
    setIsOpen(true)

    // Prompt to play music if user hasn't interacted yet
    if (!hasInteracted) {
      setTimeout(() => {
        togglePlay()
      }, 200)
    }

    onOpen?.()
  }

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          id="cover"
          className="fixed inset-0 z-50 overflow-hidden cursor-pointer"
          initial={{ y: 0 }}
          exit={{
            y: '-100%',
            transition: {
              duration: 1.2,
              ease: [0.43, 0.13, 0.23, 0.96],
              delay: 0.2,
            },
          }}
          onClick={handleEnvelopeClick}
        >
          {/* Full-screen CSS Envelope */}
          <motion.div
            className="w-full h-full"
            variants={envelopeVariants}
            initial="initial"
            animate="animate"
          >
            <Envelope
              isOpening={isEnvelopeOpening}
              onOpenComplete={handleEnvelopeOpenComplete}
              fullScreen
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
