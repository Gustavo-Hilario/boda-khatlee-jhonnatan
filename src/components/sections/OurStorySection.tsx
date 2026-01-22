import { useState } from 'react'
import { motion, type Variants } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, EffectFade } from 'swiper/modules'
import Lightbox from 'yet-another-react-lightbox'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
// @ts-ignore - Swiper CSS imports
import 'swiper/swiper-bundle.css'
import 'yet-another-react-lightbox/styles.css'
import { galleryImages } from '../../config/wedding'
import { Flourish } from '../ui/Flourish'
import { getAssetPath } from '../../utils/assets'
import { useMobile } from '../../hooks/useMobile'

// Enhanced Ken Burns effect for slideshow - 4 variation patterns
// Each image gets a unique movement pattern based on its index
const getKenBurnsAnimation = (index: number, isMobile: boolean) => {
  // Reduce effect on mobile for performance
  const scaleMultiplier = isMobile ? 0.5 : 1
  const patterns = [
    // Pattern 1: Zoom in from top-left
    {
      scale: [1, 1 + 0.15 * scaleMultiplier],
      x: ['0%', `${4 * scaleMultiplier}%`],
      y: ['0%', `${3 * scaleMultiplier}%`],
    },
    // Pattern 2: Zoom out to center
    {
      scale: [1 + 0.12 * scaleMultiplier, 1],
      x: [`${2 * scaleMultiplier}%`, '0%'],
      y: [`${2 * scaleMultiplier}%`, '0%'],
    },
    // Pattern 3: Pan right to left with zoom
    {
      scale: [1, 1 + 0.1 * scaleMultiplier],
      x: [`${3 * scaleMultiplier}%`, `${-3 * scaleMultiplier}%`],
      y: ['0%', `${1 * scaleMultiplier}%`],
    },
    // Pattern 4: Subtle circular motion
    {
      scale: [1, 1 + 0.08 * scaleMultiplier, 1 + 0.12 * scaleMultiplier, 1 + 0.08 * scaleMultiplier, 1],
      x: ['0%', `${2 * scaleMultiplier}%`, '0%', `${-2 * scaleMultiplier}%`, '0%'],
      y: ['0%', `${1 * scaleMultiplier}%`, `${2 * scaleMultiplier}%`, `${1 * scaleMultiplier}%`, '0%'],
    },
  ]
  return patterns[index % patterns.length]
}

// Transition durations per pattern for variety
const kenBurnsTransitions = [
  { duration: 12, ease: 'linear' as const },
  { duration: 10, ease: 'linear' as const },
  { duration: 14, ease: 'linear' as const },
  { duration: 20, ease: 'easeInOut' as const },
]

// Section header reveal
const headerVariants: Variants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

// Slideshow image with Ken Burns
interface SlideshowImageProps {
  src: string
  alt: string
  index: number
  onClick: () => void
  isActive: boolean
}

function SlideshowImage({ src, alt, index, onClick, isActive }: SlideshowImageProps) {
  const [isHovered, setIsHovered] = useState(false)
  const isMobile = useMobile()

  // Get unique Ken Burns pattern based on index
  const kenBurnsAnimation = getKenBurnsAnimation(index, isMobile)
  const kenBurnsTransition = kenBurnsTransitions[index % kenBurnsTransitions.length]

  // Transform origins vary by pattern for more visual interest
  const transformOrigins = ['top left', 'center right', 'bottom center', 'center']

  return (
    <button
      type="button"
      aria-label={`Ver ${alt}`}
      className="relative w-full h-full cursor-pointer group bg-transparent border-0 p-0 text-left focus:outline-none"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Ken Burns animated image with unique pattern per slide */}
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        animate={isActive ? kenBurnsAnimation : undefined}
        transition={kenBurnsTransition}
        style={{ transformOrigin: transformOrigins[index % transformOrigins.length] }}
      />

      {/* Light leak overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          opacity: [0, 0.3, 0],
          x: ['-100%', '200%'],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          repeatDelay: 2,
          ease: 'linear',
        }}
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
          width: '50%',
        }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.3) 100%)',
        }}
      />

      {/* Zoom icon on hover */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-xl"
          animate={{ scale: isHovered ? 1 : 0.8 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <svg
            className="w-8 h-8 text-burgundy"
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
    </button>
  )
}

export function OurStorySection() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [activeSlide, setActiveSlide] = useState(0)

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  // All images for lightbox navigation
  const slides = galleryImages.map((img) => ({
    src: getAssetPath(img.src),
    alt: img.alt,
  }))

  // First 5 for slideshow
  const slideshowImages = galleryImages.slice(0, 5)

  return (
    <section id="our-story" className="py-16 md:py-24 bg-cream overflow-hidden relative">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-pattern-dots opacity-20" />

      {/* Section header */}
      <motion.div
        className="text-center mb-12 px-4 relative z-10"
        variants={headerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.span
          className="text-gold-warm text-2xl inline-block mb-4"
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
        >
          ✦
        </motion.span>

        <motion.h2
          className="font-cursive text-4xl md:text-5xl lg:text-6xl text-olive mb-4"
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          Nuestra Historia
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Flourish variant="header" />
        </motion.div>
      </motion.div>

      {/* Hero Slideshow */}
      <motion.div
        className="mb-12 relative z-10"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <Swiper
          modules={[Autoplay, Pagination, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{
            clickable: true,
            bulletClass: 'swiper-pagination-bullet',
            bulletActiveClass: 'swiper-pagination-bullet-active',
          }}
          loop={true}
          className="swiper-slideshow"
          onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
        >
          {slideshowImages.map((image, index) => (
            <SwiperSlide key={image.src}>
              <SlideshowImage
                src={getAssetPath(image.src)}
                alt={image.alt}
                index={index}
                onClick={() => openLightbox(index)}
                isActive={activeSlide === index}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom progress bar */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-gold-warm/20 z-20"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 5, ease: 'linear', repeat: Infinity }}
          style={{ transformOrigin: 'left' }}
        />
      </motion.div>

      {/* Visual separator */}
      <motion.div
        className="max-w-4xl mx-auto px-4 mt-8 relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center justify-center gap-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold-warm/40 to-transparent" />
          <motion.span
            className="text-gold-warm text-xl"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            ✦
          </motion.span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold-warm/40 to-transparent" />
        </div>
      </motion.div>

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

      {/* Floating decorative elements */}
      <motion.div
        className="absolute top-1/4 right-10 w-3 h-3 rounded-full bg-gold-warm/30 hidden md:block"
        animate={{
          y: [0, -15, 0],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </section>
  )
}
