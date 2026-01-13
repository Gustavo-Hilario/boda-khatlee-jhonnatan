import { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'

interface GalleryImageProps {
  src: string
  alt: string
  onClick?: () => void
  className?: string
  priority?: boolean
}

export function GalleryImage({ src, alt, onClick, className, priority = false }: GalleryImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  return (
    <motion.button
      className={cn(
        'relative overflow-hidden rounded-xl bg-gray-100 cursor-pointer border-0 p-0 text-left focus:outline-none',
        className
      )}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      type="button"
      aria-label={`Ver ${alt}`}
    >
      {/* Loading placeholder */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
          <span className="text-gray-400 text-sm">Error</span>
        </div>
      )}

      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={cn(
          'w-full h-full object-cover transition-opacity duration-500',
          isLoaded ? 'opacity-100' : 'opacity-0'
        )}
      />

      {/* Hover overlay */}
      <motion.div
        className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-300"
        whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}
      />
    </motion.button>
  )
}
