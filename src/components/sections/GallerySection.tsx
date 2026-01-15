import { useState, useRef } from 'react'
import { motion, type Variants, useMotionValue, useSpring, useTransform } from 'framer-motion'
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

// Enhanced Ken Burns effect for slideshow - 4 variation patterns
// Each image gets a unique movement pattern based on its index
// Returns animation props for direct use with animate prop (not variants)
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

export function GallerySection() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [activeSlide, setActiveSlide] = useState(0)

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  const slides = galleryImages.map((img) => ({
    src: getAssetPath(img.src),
    alt: img.alt,
  }))

  // First 5 for slideshow, ALL images for grid gallery
  const slideshowImages = galleryImages.slice(0, 5)
  const gridImages = galleryImages // Show ALL images in gallery

  return (
    <section id="gallery" className="py-16 md:py-24 bg-cream overflow-hidden relative">
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

      {/* Visual separator between slideshow and gallery */}
      <motion.div
        className="max-w-4xl mx-auto px-4 my-16 relative z-10"
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

      {/* Gallery sub-header - separate scroll target */}
      <motion.div
        id="galeria"
        className="text-center mb-10 px-4 pt-8 -mt-8 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <motion.h3
          className="font-cursive text-3xl md:text-4xl text-olive mb-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          Galería
        </motion.h3>
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
