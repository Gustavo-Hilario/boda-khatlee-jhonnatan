import { useState, useEffect } from 'react'

export function useMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < breakpoint)
    }

    // Initial check
    checkMobile()

    // Listen for resize events
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [breakpoint])

  return isMobile
}

// Animation config based on device
export function useAnimationConfig() {
  const isMobile = useMobile()

  return isMobile
    ? {
        // Simplified for mobile
        entrance: { opacity: 0, y: 30 },
        entranceVisible: { opacity: 1, y: 0 },
        hover: { scale: 1.05 },
        disableMagnetic: true,
        particleCount: 4,
        staggerDelay: 0.1,
      }
    : {
        // Full desktop experience
        entrance: { opacity: 0, y: 80, rotateX: 45, scale: 0.8 },
        entranceVisible: { opacity: 1, y: 0, rotateX: 0, scale: 1 },
        hover: { scale: 1.08 },
        disableMagnetic: false,
        particleCount: 8,
        staggerDelay: 0.12,
      }
}
