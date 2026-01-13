import { motion } from 'framer-motion'
import { useMusic } from '../../context/MusicContext'
import { cn } from '../../utils/cn'

interface MusicPlayerProps {
  className?: string
}

export function MusicPlayer({ className }: MusicPlayerProps) {
  const { isPlaying, togglePlay } = useMusic()

  return (
    <motion.button
      onClick={togglePlay}
      className={cn(
        'fixed bottom-6 right-6 z-50',
        'w-14 h-14 rounded-full bg-burgundy text-white',
        'shadow-lg hover:shadow-xl',
        'flex items-center justify-center',
        'focus:outline-none focus:ring-2 focus:ring-burgundy focus:ring-offset-2',
        'transition-colors duration-300',
        className
      )}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label={isPlaying ? 'Pausar musica' : 'Reproducir musica'}
    >
      {isPlaying ? (
        <motion.div
          className="flex items-center gap-1"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <span className="w-1 h-4 bg-white rounded-full" />
          <span className="w-1 h-4 bg-white rounded-full" />
        </motion.div>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path d="M9 6.882l.008-.065A.5.5 0 019.5 6.5h2a.5.5 0 01.5.5v3h2.5a.5.5 0 01.354.854l-4 4a.5.5 0 01-.708 0l-4-4A.5.5 0 016.5 10H9V6.882z" />
          <path d="M12 3a9 9 0 100 18 9 9 0 000-18zM3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
          <path d="M9.383 8.17a.5.5 0 01.724-.447l5 2.5a.5.5 0 010 .894l-5 2.5A.5.5 0 019 13.17v-5z" />
        </svg>
      )}

      {/* Pulsing ring when playing */}
      {isPlaying && (
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-burgundy"
          animate={{
            scale: [1, 1.5],
            opacity: [0.5, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            ease: 'easeOut',
          }}
        />
      )}
    </motion.button>
  )
}
