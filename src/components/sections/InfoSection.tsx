import { useState, useRef } from 'react'
import { motion, type Variants, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { weddingConfig } from '../../config/wedding'
import { Button } from '../ui/Button'
import { Flourish } from '../ui/Flourish'

// Container stagger
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
}

// Card entrance with 3D rotation
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
      damping: 12,
      delay: 0.2,
    },
  },
}

// Sparkle animation for icons
const sparkleVariants: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: (i: number) => ({
    scale: [0, 1, 0],
    opacity: [0, 1, 0],
    transition: {
      delay: 0.5 + i * 0.1,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
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

// Info Card component with 3D tilt
interface InfoCardProps {
  icon: string
  title: string
  description: React.ReactNode
  bgColor: 'olive' | 'burgundy'
  action?: {
    label: string
    href: string
  }
  footer?: React.ReactNode
}

function InfoCard({ icon, title, description, bgColor, action, footer }: InfoCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  // Mouse position for 3D tilt
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Spring physics for smooth tilt
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), {
    stiffness: 150,
    damping: 20,
  })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), {
    stiffness: 150,
    damping: 20,
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

  // Sparkle positions
  const sparklePositions = [
    { x: -15, y: -15 },
    { x: 15, y: -15 },
    { x: -20, y: 5 },
    { x: 20, y: 5 },
  ]

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
        className={`${bgClass} text-white p-8 rounded-2xl shadow-xl text-center flex flex-col items-center relative overflow-hidden h-full`}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)',
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

        {/* Icon container with sparkles */}
        <div className="relative mb-4">
          {/* Sparkles around icon */}
          {sparklePositions.map((pos, i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-gold-warm"
              style={{
                transform: `translate(${pos.x}px, ${pos.y}px)`,
              }}
              variants={sparkleVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
            />
          ))}

          {/* Glow ring */}
          <motion.div
            className="absolute inset-0 rounded-full bg-white/20"
            animate={
              isHovered
                ? {
                    scale: [1, 1.3, 1],
                    opacity: [0.2, 0.4, 0.2],
                  }
                : {}
            }
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          <motion.div
            className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center relative z-10"
            variants={iconVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{
              scale: 1.1,
              rotate: [0, -5, 5, 0],
              transition: { duration: 0.4 },
            }}
          >
            <motion.span
              className="text-4xl"
              animate={isHovered ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              {icon}
            </motion.span>
          </motion.div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold mb-3 text-white">
          {title}
        </h3>

        {/* Description */}
        <motion.div
          className="text-white/90 flex-1 flex items-center"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {description}
        </motion.div>

        {/* Footer text */}
        {footer && (
          <motion.div
            className="text-white/70 text-sm mt-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            {footer}
          </motion.div>
        )}

        {/* Action button */}
        {action && (
          <motion.div
            className="mt-4 relative"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Button glow */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gold-warm/30 blur-md"
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />
            <Button href={action.href} external variant="outline-light" className="relative z-10">
              {action.label}
            </Button>
          </motion.div>
        )}

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

export function InfoSection() {
  const { rsvp, photoUpload } = weddingConfig

  const whatsappUrl = `https://wa.me/${rsvp.whatsappNumber}?text=${encodeURIComponent(
    'Hola! Confirmo mi asistencia a la boda.'
  )}`

  return (
    <section
      id="info"
      className="py-16 md:py-24 px-4 md:px-8 bg-white relative overflow-hidden"
      style={{ perspective: 1200 }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 bg-pattern-dots opacity-20" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-12"
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
            Información Importante
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
          {/* Gift suggestions */}
          <InfoCard
            icon="💝"
            title="Sugerencia de Regalos"
            description={<p className="text-lg">Sobre / Efectivo</p>}
            footer="Tu presencia es el mejor regalo"
            bgColor="olive"
          />

          {/* Adults only */}
          <InfoCard
            icon="🥂"
            title="Solo Adultos"
            description={
              <p>
                Amamos a sus niños, pero queremos que ustedes puedan bailar y disfrutar
                sin parar. Invitación solo para adultos.
              </p>
            }
            bgColor="olive"
          />

          {/* Photo sharing */}
          <InfoCard
            icon="📸"
            title="Comparte tus Fotos"
            description={
              <p>
                Haz eterno este día compartiendo tus momentos especiales con nosotros.
              </p>
            }
            bgColor="burgundy"
            action={{
              label: 'Subir Fotos',
              href: photoUpload,
            }}
          />

          {/* RSVP */}
          <InfoCard
            icon="✉️"
            title="Confirma tu Asistencia"
            description={
              <p>
                Por favor confirma tu asistencia {rsvp.deadline} para ayudarnos con la
                organización.
              </p>
            }
            bgColor="burgundy"
            action={{
              label: 'Confirmar por WhatsApp',
              href: whatsappUrl,
            }}
          />
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
