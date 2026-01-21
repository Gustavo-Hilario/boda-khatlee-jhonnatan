import { useState, useRef, type ReactNode } from 'react'
import { motion, type Variants, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { weddingConfig } from '../../config/wedding'
import { Button } from '../ui/Button'
import { Flourish } from '../ui/Flourish'
import { getAssetPath } from '../../utils/assets'
import { useTiltConfig } from '../../hooks/useMobile'
import {
  ChurchIcon,
  ChampagneIcon,
  MapPinIcon,
  DressCodeIcon,
  PartyIcon,
  Sparkle,
} from '../ui/svg'

// Container stagger
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

// Card entrance with 3D flip
const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
    rotateX: 10,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

// Icon bounce entrance
const iconVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0,
    rotate: -180,
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 15,
      delay: 0.2,
    },
  },
}

// Pin drop animation for location
const pinDropVariants: Variants = {
  hidden: { y: -30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 15,
      delay: 0.3,
    },
  },
}

// Header reveal
const headerVariants: Variants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
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

// 3D Venue Card component
interface VenueCardProps {
  title: string
  icon: ReactNode
  name: string
  location: string
  mapUrl: string
  image?: string
  bgColor: 'olive' | 'burgundy'
  headerIcon?: ReactNode
  children?: React.ReactNode
}

function VenueCard({
  title,
  icon,
  name,
  location,
  mapUrl,
  image,
  bgColor,
  headerIcon,
  children,
}: VenueCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const tiltConfig = useTiltConfig()

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
  const shadowX = useTransform(rotateY, [-range, range], [20, -20])
  const shadowY = useTransform(rotateX, [-range, range], [-20, 20])

  // Z-axis depth on hover
  const translateZ = useSpring(isHovered ? tiltConfig.translateZ : 0, {
    stiffness: 300,
    damping: 30,
  })

  // Handle mouse move
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

  const bgClass = bgColor === 'olive' ? 'bg-olive' : 'bg-burgundy'

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      className="relative"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1000 }}
    >
      <motion.div
        className={`${bgClass} text-white p-6 md:p-8 rounded-2xl shadow-xl flex flex-col relative overflow-hidden will-change-transform`}
        style={{
          rotateX,
          rotateY,
          z: translateZ,
          transformStyle: 'preserve-3d',
          boxShadow: isHovered
            ? `${shadowX.get()}px ${shadowY.get()}px 40px rgba(0, 0, 0, ${tiltConfig.shadowIntensity})`
            : '0 10px 30px -10px rgba(0, 0, 0, 0.3)',
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Background shimmer on hover */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            opacity: isHovered ? 1 : 0,
            x: isHovered ? ['0%', '100%'] : '0%',
          }}
          transition={{ duration: 0.6 }}
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)',
          }}
        />

        {/* Image or icon placeholder */}
        <div className="w-full aspect-[16/9] rounded-xl overflow-hidden mb-4 bg-white/10 relative">
          {image ? (
            <>
              <motion.img
                src={image ? getAssetPath(image) : undefined}
                alt={name}
                className="w-full h-full object-cover"
                loading="lazy"
                animate={{ scale: isHovered ? 1.05 : 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </>
          ) : (
            <motion.div
              className="w-full h-full flex items-center justify-center"
              animate={{ scale: isHovered ? 1.1 : 1 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                variants={iconVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {icon}
              </motion.div>
            </motion.div>
          )}

          {/* Animated pin drop */}
          <motion.div
            className="absolute top-2 right-2"
            variants={pinDropVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <MapPinIcon size={28} color="white" />
          </motion.div>
        </div>

        <div className="flex-1 flex flex-col relative z-10">
          {/* Title with icon */}
          <motion.div
            className="flex items-center justify-center gap-2 mb-3"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <motion.div
              animate={isHovered ? { rotate: [0, -10, 10, 0], scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.5 }}
            >
              {headerIcon || icon}
            </motion.div>
            <h3 className="text-xl font-semibold font-elegant">{title}</h3>
          </motion.div>

          {/* Venue name */}
          <p className="text-white/90 font-elegant text-xl mb-2">
            {name}
          </p>

          <p className="text-white/80 font-elegant text-base mb-4 flex-1">{location}</p>

          {/* Children (for dress code extras) */}
          {children}

          {/* Button with glow */}
          <motion.div
            className="self-center relative"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="absolute inset-0 rounded-full bg-gold-warm/30 blur-md"
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />
            <Button href={mapUrl} external size="sm" className="relative z-10">
              Ver Ubicación
            </Button>
          </motion.div>
        </div>

        {/* Corner decoration */}
        <motion.div
          className="absolute -top-10 -right-10 w-20 h-20 rounded-full bg-white/5"
          animate={{ scale: isHovered ? 1.5 : 1 }}
          transition={{ duration: 0.5 }}
        />
        <motion.div
          className="absolute -bottom-5 -left-5 w-10 h-10 rounded-full bg-white/5"
          animate={{ scale: isHovered ? 1.3 : 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        />
      </motion.div>
    </motion.div>
  )
}

// Dress Code Card with 3D tilt effect
interface DressCodeCardProps {
  dressCode: {
    style: string
    reserved: string[]
    bridal: string[]
    pinterestWomen?: string
    pinterestMen?: string
  }
}

function DressCodeCard({ dressCode }: DressCodeCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const tiltConfig = useTiltConfig()

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
  const shadowX = useTransform(rotateY, [-range, range], [20, -20])
  const shadowY = useTransform(rotateX, [-range, range], [-20, 20])

  // Z-axis depth on hover
  const translateZ = useSpring(isHovered ? tiltConfig.translateZ : 0, {
    stiffness: 300,
    damping: 30,
  })

  // Handle mouse move
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
      variants={cardVariants}
      className="relative"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1000 }}
    >
      <motion.div
        className="bg-burgundy text-white p-6 md:p-8 rounded-2xl shadow-xl flex flex-col relative overflow-hidden h-full will-change-transform"
        style={{
          rotateX,
          rotateY,
          z: translateZ,
          transformStyle: 'preserve-3d',
          boxShadow: isHovered
            ? `${shadowX.get()}px ${shadowY.get()}px 40px rgba(0, 0, 0, ${tiltConfig.shadowIntensity})`
            : '0 10px 30px -10px rgba(0, 0, 0, 0.3)',
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Background shimmer on hover */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            opacity: isHovered ? 1 : 0,
            x: isHovered ? ['0%', '100%'] : '0%',
          }}
          transition={{ duration: 0.6 }}
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)',
          }}
        />

        {/* Fashion icon placeholder */}
        <div className="w-full aspect-[16/9] rounded-xl overflow-hidden mb-4 bg-white/10 flex items-center justify-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            animate={{ scale: isHovered ? 1.1 : 1 }}
          >
            <DressCodeIcon size={48} color="white" variant="both" />
          </motion.div>

          {/* Sparkle */}
          <div className="absolute top-2 right-2">
            <Sparkle size={24} />
          </div>
        </div>

        <div className="flex-1 flex flex-col relative z-10">
          {/* Title */}
          <motion.div
            className="flex items-center justify-center gap-2 mb-3"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <motion.div
              animate={isHovered ? { rotate: [0, -10, 10, 0], scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.5 }}
            >
              <Sparkle size={28} />
            </motion.div>
            <h3 className="text-xl font-semibold font-elegant">Dress Code</h3>
          </motion.div>

          {/* Style name */}
          <p className="text-white font-elegant text-2xl mb-3">
            {dressCode.style}
          </p>

          <div className="text-white/80 text-sm space-y-2 mb-4 flex-1">
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              El color{' '}
              <strong className="text-white">{dressCode.reserved.join(', ')}</strong>{' '}
              está reservado exclusivamente para la novia.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <strong className="text-white">{dressCode.bridal.join(' y ')}</strong>{' '}
              reservados para damas y caballeros de honor.
            </motion.p>
          </div>

          {/* Pinterest buttons with hover effects */}
          <motion.div
            className="flex flex-wrap gap-3 justify-center"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            {dressCode.pinterestWomen && (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  href={dressCode.pinterestWomen}
                  external
                  size="sm"
                  variant="outline-light"
                >
                  Pinterest Mujeres
                </Button>
              </motion.div>
            )}
            {dressCode.pinterestMen && (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  href={dressCode.pinterestMen}
                  external
                  size="sm"
                  variant="outline-light"
                >
                  Pinterest Hombres
                </Button>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Corner decorations */}
        <motion.div
          className="absolute -top-10 -right-10 w-20 h-20 rounded-full bg-white/5"
          animate={{ scale: isHovered ? 1.5 : 1 }}
          transition={{ duration: 0.5 }}
        />
        <motion.div
          className="absolute -bottom-5 -left-5 w-10 h-10 rounded-full bg-white/5"
          animate={{ scale: isHovered ? 1.3 : 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        />
      </motion.div>
    </motion.div>
  )
}

export function VenueSection() {
  const { venues, dressCode } = weddingConfig

  return (
    <section
      id="venue"
      className="py-16 md:py-24 px-4 md:px-8 bg-cream relative overflow-hidden"
      style={{ perspective: 1200 }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 bg-pattern-dots opacity-20" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-12"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-block mb-4"
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
          >
            <Sparkle size={32} />
          </motion.div>

          <motion.h2
            className="font-cursive text-4xl md:text-5xl lg:text-6xl text-olive mb-4"
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            Ceremonia & Recepción
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

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {/* Religious Ceremony */}
          <VenueCard
            title="Ceremonia Religiosa"
            icon={<ChurchIcon size={64} color="white" />}
            headerIcon={<ChurchIcon size={28} color="white" />}
            name={venues.religious.name}
            location={venues.religious.location}
            mapUrl={venues.religious.mapUrl}
            image={venues.religious.image}
            bgColor="olive"
          />

          {/* Reception */}
          <VenueCard
            title="Recepción"
            icon={<PartyIcon size={64} color="white" />}
            headerIcon={<ChampagneIcon size={32} color="white" />}
            name={venues.reception.name}
            location={venues.reception.location}
            mapUrl={venues.reception.mapUrl}
            bgColor="olive"
          />

          {/* Dress Code - special card */}
          <DressCodeCard dressCode={dressCode} />
        </motion.div>
      </div>

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
