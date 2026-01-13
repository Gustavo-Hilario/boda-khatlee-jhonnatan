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

// Image reveal with circle clip-path
const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    filter: 'grayscale(100%)',
  },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'grayscale(0%)',
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

// Ken Burns effect for slideshow
const kenBurnsVariants: Variants = {
  animate: (i: number) => ({
    scale: [1, 1.08],
    x: i % 2 === 0 ? ['0%', '2%'] : ['0%', '-2%'],
    y: i % 2 === 0 ? ['0%', '1%'] : ['0%', '-1%'],
    transition: {
      duration: 8,
      ease: 'linear',
    },
  }),
}

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

function GalleryImage({ src, alt, isLarge, onClick }: Omit<GalleryImageProps, 'index'>) {
  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  // Mouse position for 3D tilt
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Spring physics for smooth tilt
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 150,
    damping: 20,
  })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 150,
    damping: 20,
  })

  // Handle mouse move for 3D tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
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
      ref={ref}
      variants={itemVariants}
      className={`relative overflow-hidden rounded-xl cursor-pointer ${isLarge ? 'row-span-2' : ''}`}
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
        className="relative w-full h-full"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
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

  return (
    <div
      className="relative w-full h-full cursor-pointer group"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Ken Burns animated image */}
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        variants={kenBurnsVariants}
        animate={isActive ? 'animate' : undefined}
        custom={index}
        style={{ transformOrigin: index % 2 === 0 ? 'center left' : 'center right' }}
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
    </div>
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
    src: img.src,
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
                src={image.src}
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
          className="text-gray-600 font-serif text-lg"
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
                  src={image.src}
                  alt={image.alt}
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
