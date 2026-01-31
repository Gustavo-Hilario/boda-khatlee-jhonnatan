import { useState, useEffect } from 'react'

export function useMobile(breakpoint = 768) {
  // Safe default for SSR - assume mobile-first approach
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return true
    return window.innerWidth < breakpoint
  })

  useEffect(() => {
    // Guard for SSR/test environments
    if (typeof window === 'undefined') return

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

// Enhanced tilt configuration for 3D card effects
export function useTiltConfig() {
  const isMobile = useMobile()

  return isMobile
    ? {
        // Reduced tilt for mobile (saves battery, better performance)
        rotationRange: 6, // ±6 degrees
        stiffness: 150,
        damping: 20,
        translateZ: 0, // No Z translation on mobile
        shadowIntensity: 0.3,
      }
    : {
        // Enhanced tilt for desktop - more dramatic effect
        rotationRange: 12, // ±12 degrees (up from ±5)
        stiffness: 200, // Snappier response
        damping: 25, // Less wobble
        translateZ: 30, // Depth on hover
        shadowIntensity: 0.5,
      }
}
