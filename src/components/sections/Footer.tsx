import { motion, type Variants } from 'framer-motion'

// Container stagger
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

// Item reveal
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

// Heart pulse with glow
const heartPulseVariants: Variants = {
  pulse: {
    scale: [1, 1.3, 1],
    transition: {
      duration: 0.8,
      repeat: Infinity,
      repeatDelay: 2,
      ease: 'easeInOut',
    },
  },
}

// Arrow bounce for back to top
const arrowBounceVariants: Variants = {
  bounce: {
    y: [0, -8, 0],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

// Scroll to top function
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

export function Footer() {
  return (
    <motion.footer
      className="bg-black py-10 px-6 relative overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >

      {/* Subtle gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center top, rgba(141,158,120,0.1) 0%, transparent 50%)',
        }}
      />

      <motion.div
        className="max-w-4xl mx-auto text-center relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Back to top button */}
        <motion.button
          className="mb-6 group"
          onClick={scrollToTop}
          variants={itemVariants}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            className="w-12 h-12 mx-auto rounded-full bg-olive/20 flex items-center justify-center border border-olive/30 transition-colors group-hover:bg-olive/30"
            variants={arrowBounceVariants}
            animate="bounce"
          >
            <svg
              className="w-5 h-5 text-olive"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </motion.div>
          <motion.span
            className="text-olive/60 text-xs mt-2 block"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            Volver arriba
          </motion.span>
        </motion.button>

        {/* Decorative line */}
        <motion.div
          className="w-16 h-px mx-auto mb-6 bg-gradient-to-r from-transparent via-olive/30 to-transparent"
          variants={itemVariants}
        />

        {/* Credits with animated heart */}
        <motion.div
          className="flex items-center justify-center gap-2 text-gray-600 text-sm"
          variants={itemVariants}
        >
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Hecho con
          </motion.span>

          {/* Animated heart */}
          <motion.span
            className="relative inline-block"
            variants={heartPulseVariants}
            animate="pulse"
          >
            <span>❤️</span>
          </motion.span>

          <motion.span
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            para ustedes
          </motion.span>
        </motion.div>

        {/* Copyright */}
        <motion.p
          className="text-gray-700 text-xs mt-6"
          variants={itemVariants}
        >
          © 2026
        </motion.p>

        {/* Floating sparkles */}
        <motion.div
          className="absolute bottom-4 left-1/4 w-1 h-1 rounded-full bg-gold-warm/30"
          animate={{
            opacity: [0.2, 0.5, 0.2],
            y: [0, -10, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-6 right-1/4 w-1.5 h-1.5 rounded-full bg-olive/30"
          animate={{
            opacity: [0.2, 0.4, 0.2],
            y: [0, -12, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
      </motion.div>
    </motion.footer>
  )
}
