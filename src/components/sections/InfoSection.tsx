import { useState, useRef, type ReactNode } from 'react'
import { motion, type Variants, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { weddingConfig } from '../../config/wedding'
import { Button } from '../ui/Button'
import { Flourish } from '../ui/Flourish'
import { useTiltConfig } from '../../hooks/useMobile'
import {
  GiftBoxIcon,
  ChampagneIcon,
  CameraIcon,
  EnvelopeIcon,
  Sparkle,
} from '../ui/svg'

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

// Gift Suggestion Card Component with 3D tilt
function GiftSuggestionCard() {
  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [copiedNo, setCopiedNo] = useState(false)
  const [copiedCci, setCopiedCci] = useState(false)
  const [copiedPhone, setCopiedPhone] = useState(false)
  const tiltConfig = useTiltConfig()

  const accountNo = '2800225282'
  const accountCci = '00928020280022528292'
  const phoneNumber = '967754506'

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

  const copyToClipboard = (text: string, type: 'no' | 'cci' | 'phone') => {
    navigator.clipboard.writeText(text)
    if (type === 'no') {
      setCopiedNo(true)
      setTimeout(() => setCopiedNo(false), 2000)
    } else if (type === 'cci') {
      setCopiedCci(true)
      setTimeout(() => setCopiedCci(false), 2000)
    } else {
      setCopiedPhone(true)
      setTimeout(() => setCopiedPhone(false), 2000)
    }
  }

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      className="md:col-span-2 relative"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1000 }}
    >
      <motion.div
        className="bg-gradient-to-b from-cream to-white p-8 md:p-10 rounded-3xl shadow-xl text-center relative overflow-hidden will-change-transform"
        style={{
          rotateX,
          rotateY,
          z: translateZ,
          transformStyle: 'preserve-3d',
          boxShadow: isHovered
            ? `${shadowX.get()}px ${shadowY.get()}px 40px rgba(0, 0, 0, ${tiltConfig.shadowIntensity})`
            : '0 10px 30px -10px rgba(0, 0, 0, 0.2)',
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
              'linear-gradient(90deg, transparent 0%, rgba(141,158,120,0.1) 50%, transparent 100%)',
          }}
        />

        {/* Gift icon */}
        <motion.div
          className="w-16 h-16 mx-auto mb-6 relative z-10"
          variants={iconVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <GiftBoxIcon size={64} color="#8D9E78" />
        </motion.div>

        {/* Title */}
        <h3 className="font-cursive text-3xl md:text-4xl text-olive mb-6 relative z-10">
          Sugerencia de Regalo
        </h3>

        {/* Description paragraphs */}
        <div className="max-w-2xl mx-auto space-y-4 text-gray-600 font-elegant text-lg mb-8 relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Con la bendición de Dios en nuestras vidas, iniciamos con ilusión esta nueva etapa.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Contamos ya con un hogar lleno de amor y todo lo necesario para comenzar juntos este camino.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Si desean acompañarnos con un detalle, agradeceremos su muestra de cariño a través de la siguiente cuenta:
          </motion.p>
        </div>

        {/* Bank account details */}
        <motion.div
          className="space-y-2 relative z-10"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-olive font-semibold text-xl">Depósito a Cuenta</p>
          <p className="text-gray-600 font-elegant">Cuenta de Ahorro en Soles Scotiabank</p>

          {/* Account Number */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <span className="text-gray-700 font-medium">No: {accountNo}</span>
            <button
              onClick={() => copyToClipboard(accountNo, 'no')}
              className="p-1.5 rounded-lg hover:bg-olive/10 transition-colors"
              title="Copiar número de cuenta"
            >
              {copiedNo ? (
                <span className="text-olive text-sm">✓</span>
              ) : (
                <svg className="w-5 h-5 text-olive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              )}
            </button>
          </div>

          {/* CCI */}
          <div className="flex items-center justify-center gap-2">
            <span className="text-gray-700 font-medium">CCI: {accountCci}</span>
            <button
              onClick={() => copyToClipboard(accountCci, 'cci')}
              className="p-1.5 rounded-lg hover:bg-olive/10 transition-colors"
              title="Copiar CCI"
            >
              {copiedCci ? (
                <span className="text-olive text-sm">✓</span>
              ) : (
                <svg className="w-5 h-5 text-olive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              )}
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-olive/20" />
            <span className="text-olive/60 font-elegant text-sm">o también</span>
            <div className="flex-1 h-px bg-olive/20" />
          </div>

          {/* Yape and Plin */}
          <div className="flex items-center justify-center gap-3 bg-gradient-to-r from-[#742284]/5 via-olive/5 to-[#00D4AA]/5 px-5 py-4 rounded-xl border border-olive/10">
            <div className="flex items-center gap-2">
              <img src="./images/yape.png" alt="Yape" className="h-8 w-auto object-contain" />
              <span className="text-olive/40 font-light">/</span>
              <img src="./images/plin.png" alt="Plin" className="h-8 w-auto object-contain" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-700 font-medium text-lg">{phoneNumber}</span>
              <button
                onClick={() => copyToClipboard(phoneNumber, 'phone')}
                className="p-1.5 rounded-lg hover:bg-olive/10 transition-colors"
                title="Copiar número"
              >
                {copiedPhone ? (
                  <span className="text-olive text-sm">✓</span>
                ) : (
                  <svg className="w-5 h-5 text-olive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Corner decorations */}
        <motion.div
          className="absolute -top-10 -right-10 w-20 h-20 rounded-full bg-olive/5"
          animate={{ scale: isHovered ? 1.5 : 1 }}
          transition={{ duration: 0.5 }}
        />
        <motion.div
          className="absolute -bottom-5 -left-5 w-10 h-10 rounded-full bg-olive/5"
          animate={{ scale: isHovered ? 1.3 : 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        />
      </motion.div>
    </motion.div>
  )
}

// RSVP Card component matching GiftSuggestionCard design
function RSVPCard() {
  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const tiltConfig = useTiltConfig()
  const { rsvp } = weddingConfig

  const whatsappUrl = `https://wa.me/${rsvp.whatsappNumber}?text=${encodeURIComponent(
    'Hola! Confirmo mi asistencia a la boda.'
  )}`

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
      className="md:col-span-2 relative"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1000 }}
    >
      <motion.div
        className="bg-gradient-to-b from-cream to-white p-8 md:p-10 rounded-3xl shadow-xl text-center relative overflow-hidden will-change-transform"
        style={{
          rotateX,
          rotateY,
          z: translateZ,
          transformStyle: 'preserve-3d',
          boxShadow: isHovered
            ? `${shadowX.get()}px ${shadowY.get()}px 40px rgba(0, 0, 0, ${tiltConfig.shadowIntensity})`
            : '0 10px 30px -10px rgba(0, 0, 0, 0.2)',
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
              'linear-gradient(90deg, transparent 0%, rgba(141,158,120,0.1) 50%, transparent 100%)',
          }}
        />

        {/* Envelope icon */}
        <motion.div
          className="w-16 h-16 mx-auto mb-6 relative z-10"
          variants={iconVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <EnvelopeIcon size={64} color="#8D9E78" />
        </motion.div>

        {/* Title */}
        <h3 className="font-cursive text-3xl md:text-4xl text-olive mb-6 relative z-10">
          Confirma tu Asistencia
        </h3>

        {/* Description paragraphs */}
        <div className="max-w-2xl mx-auto space-y-4 text-gray-600 font-elegant text-lg mb-8 relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Decir «No puedo asistir» no es descortés. Es honesto.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-xl"
          >
            Confirma tu asistencia antes del:
            <br />
            <strong className="text-2xl text-olive">Febrero 06</strong>
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Para mantenerte en nuestra lista de invitados y unirte a nuestra celebración.
          </motion.p>
        </div>

        {/* WhatsApp button */}
        <motion.div
          className="relative z-10"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <Button href={whatsappUrl} variant="primary" size="lg">
            Confirmar por WhatsApp
          </Button>
        </motion.div>

        {/* Corner decorations */}
        <motion.div
          className="absolute -top-10 -right-10 w-20 h-20 rounded-full bg-olive/5"
          animate={{ scale: isHovered ? 1.5 : 1 }}
          transition={{ duration: 0.5 }}
        />
        <motion.div
          className="absolute -bottom-5 -left-5 w-10 h-10 rounded-full bg-olive/5"
          animate={{ scale: isHovered ? 1.3 : 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        />
      </motion.div>
    </motion.div>
  )
}

// Info Card component with 3D tilt
interface InfoCardProps {
  icon: ReactNode
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
        className={`${bgClass} text-white p-8 rounded-2xl shadow-xl text-center flex flex-col items-center relative overflow-hidden h-full will-change-transform`}
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
            <motion.div
              animate={isHovered ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              {icon}
            </motion.div>
          </motion.div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold mb-3 text-white font-elegant">
          {title}
        </h3>

        {/* Description */}
        <motion.div
          className="text-white/90 flex-1 flex items-center font-elegant text-lg"
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
  const { photoUpload } = weddingConfig

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
          {/* Gift suggestions - spans full width */}
          <GiftSuggestionCard />

          {/* Adults only */}
          <InfoCard
            icon={<ChampagneIcon size={40} color="white" />}
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
            icon={<CameraIcon size={40} color="white" />}
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

          {/* RSVP - Full width card matching gift section */}
          <RSVPCard />
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
