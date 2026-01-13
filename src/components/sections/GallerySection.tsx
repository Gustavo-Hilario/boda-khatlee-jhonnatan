import { useState } from 'react'
import { motion } from 'framer-motion'
import Lightbox from 'yet-another-react-lightbox'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import 'yet-another-react-lightbox/styles.css'
import { galleryImages } from '../../config/wedding'
import { GalleryImage } from '../ui/GalleryImage'

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

export function GallerySection() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  const slides = galleryImages.map((img) => ({
    src: img.src,
    alt: img.alt,
  }))

  // Create masonry-like arrangement
  const getImageClass = (index: number) => {
    const patterns = [
      'aspect-[3/4]',    // tall
      'aspect-[4/5]',    // medium tall
      'aspect-square',   // square
      'aspect-[4/3]',    // landscape
      'aspect-[3/4]',    // tall
      'aspect-[4/5]',    // medium tall
      'aspect-square',   // square
      'aspect-[3/4]',    // tall
      'aspect-[4/3]',    // landscape
      'aspect-square',   // square
    ]
    return patterns[index % patterns.length]
  }

  return (
    <section id="gallery" className="py-16 px-4 md:px-8 bg-gray-50">
      <motion.div
        className="max-w-6xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
      >
        {/* Masonry grid */}
        <div className="columns-2 md:columns-3 gap-4 space-y-4">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.src}
              variants={itemVariants}
              className="break-inside-avoid"
            >
              <GalleryImage
                src={image.src}
                alt={image.alt}
                onClick={() => openLightbox(index)}
                className={getImageClass(index)}
                priority={index < 3}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Lightbox */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={slides}
        plugins={[Zoom]}
        animation={{ fade: 300, zoom: 400 }}
        zoom={{
          maxZoomPixelRatio: 3,
          zoomInMultiplier: 2,
        }}
        carousel={{
          finite: false,
          preload: 2,
        }}
        styles={{
          container: { backgroundColor: 'rgba(0, 0, 0, 0.95)' },
        }}
      />
    </section>
  )
}
