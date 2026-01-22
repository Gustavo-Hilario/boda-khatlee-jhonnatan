import { useState, useRef } from 'react'
import { motion, type Variants, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Lightbox from 'yet-another-react-lightbox'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import 'yet-another-react-lightbox/styles.css'
import { galleryImages } from '../../config/wedding'
import { getAssetPath } from '../../utils/assets'
import { useTiltConfig, useMobile } from '../../hooks/useMobile'
import { useScrollParallax } from '../../hooks/useScrollParallax'

// Container stagger variants
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

// 3D tilt image card component
interface GalleryImageProps {
  src: string
  alt: string
  index: number
  isLarge: boolean
  onClick: () => void
}

function GalleryImage({ src, alt, index, isLarge, onClick }: GalleryImageProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const tiltConfig = useTiltConfig()
  const isMobile = useMobile()

  // Scroll parallax for grid items
  const { ref: scrollRef, y: scrollY, scale: scrollScale, opacity: scrollOpacity } = useScrollParallax({
    yIntensity: 0.2,
    scaleRange: [0.94, 1],
    opacityRange: [0.7, 1],
    disableOnMobile: true,
  })

  // Alternating entrance direction based on index
  const entranceX = isMobile ? 0 : (index % 2 === 0 ? -40 : 40)

  // Mouse position for 3D tilt
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Enhanced spring physics for smooth tilt with configurable range
  const range = tiltConfig.rotationRange
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [range, -range]), {
    stiffness: tiltConfig.stiffness,
    damping: tiltConfig.damping,
  })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-range, range]), {
    stiffness: tiltConfig.stiffness,
    damping: tiltConfig.damping,
  })

  // Dynamic shadow based on tilt direction
  const shadowX = useTransform(rotateY, [-range, range], [15, -15])
  const shadowY = useTransform(rotateX, [-range, range], [-15, 15])

  // Z-axis depth on hover
  const translateZ = useSpring(isHovered ? tiltConfig.translateZ : 0, {
    stiffness: 300,
    damping: 30,
  })

  // Handle mouse move for 3D tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return
    const rect = buttonRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    setIsHovered(false)
  }

  return (
    <motion.div
      ref={scrollRef}
      className={`${isLarge ? 'row-span-2' : ''}`}
      style={{
        y: scrollY,
        scale: scrollScale,
        opacity: scrollOpacity,
      }}
      initial={{ opacity: 0, x: entranceX, scale: 0.9 }}
      whileInView={{ opacity: 1, x: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
        delay: Math.min(index * 0.05, 0.4),
      }}
    >
      <motion.button
        ref={buttonRef}
        type="button"
        aria-label={`Ver ${alt}`}
        className="relative overflow-hidden rounded-xl cursor-pointer bg-transparent border-0 p-0 text-left focus:outline-none w-full h-full"
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          perspective: 1000,
          transformStyle: 'preserve-3d',
        }}
      >
      <motion.div
        className="relative w-full h-full will-change-transform"
        style={{
          rotateX,
          rotateY,
          z: translateZ,
          transformStyle: 'preserve-3d',
          boxShadow: isHovered
            ? `${shadowX.get()}px ${shadowY.get()}px 30px rgba(0, 0, 0, ${tiltConfig.shadowIntensity})`
            : '0 5px 15px rgba(0, 0, 0, 0.2)',
        }}
      >
        <div className={`relative w-full ${isLarge ? 'aspect-[3/4]' : 'aspect-square'}`}>
          {/* Image with scale on hover */}
          <motion.img
            src={src}
            alt={alt}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
            animate={{
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />

          {/* Gradient overlay that reveals on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Shine effect on hover */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
              background: isHovered
                ? 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.2) 50%, transparent 60%)'
                : 'linear-gradient(105deg, transparent 40%, transparent 50%, transparent 60%)',
              backgroundPosition: isHovered ? '200% center' : '-100% center',
            }}
            transition={{ duration: 0.6 }}
            style={{ backgroundSize: '200% 100%' }}
          />

          {/* Zoom icon */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-xl"
              animate={{ scale: isHovered ? [0.8, 1] : 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <svg
                className="w-6 h-6 text-burgundy"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                />
              </svg>
            </motion.div>
          </motion.div>

          {/* Border glow */}
          <motion.div
            className="absolute inset-0 rounded-xl pointer-events-none"
            animate={{
              boxShadow: isHovered
                ? 'inset 0 0 0 2px rgba(193, 154, 91, 0.5)'
                : 'inset 0 0 0 0px rgba(193, 154, 91, 0)',
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </motion.div>

        {/* Card shadow that increases on hover */}
        <motion.div
          className="absolute inset-0 -z-10 rounded-xl"
          animate={{
            boxShadow: isHovered
              ? '0 25px 50px -12px rgba(0, 0, 0, 0.35)'
              : '0 10px 30px -12px rgba(0, 0, 0, 0.15)',
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.button>
    </motion.div>
  )
}

export function GallerySection() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  const slides = galleryImages.map((img) => ({
    src: getAssetPath(img.src),
    alt: img.alt,
  }))

  // ALL images for grid gallery
  const gridImages = galleryImages

  return (
    <section id="gallery" className="py-16 md:py-24 bg-cream overflow-hidden relative">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-pattern-dots opacity-20" />

      {/* Gallery header */}
      <motion.div
        className="text-center mb-10 px-4 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2
          className="font-cursive text-3xl md:text-4xl lg:text-5xl text-olive mb-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          Galería
        </motion.h2>
        <motion.p
          className="text-gray-600 font-elegant text-xl italic"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Momentos que atesoramos
        </motion.p>
      </motion.div>

      {/* Grid gallery */}
      {gridImages.length > 0 && (
        <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
          >
            {gridImages.map((image, gridIndex) => {
              const isLarge = gridIndex === 0 || gridIndex === 5

              return (
                <GalleryImage
                  key={`gallery-${image.src}`}
                  src={getAssetPath(image.src)}
                  alt={image.alt}
                  index={gridIndex}
                  isLarge={isLarge}
                  onClick={() => openLightbox(gridIndex)}
                />
              )
            })}
          </motion.div>
        </div>
      )}

      {/* Lightbox */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={slides}
        plugins={[Zoom]}
        animation={{ fade: 400, zoom: 500 }}
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

      {/* Floating decorative element */}
      <motion.div
        className="absolute bottom-1/3 left-12 w-4 h-4 rounded-full bg-olive/20 hidden md:block"
        animate={{
          y: [0, -20, 0],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1.5,
        }}
      />
    </section>
  )
}
