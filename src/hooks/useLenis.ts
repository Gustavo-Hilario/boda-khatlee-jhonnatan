import { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'

interface UseLenisOptions {
  autoRaf?: boolean
  duration?: number
  easing?: (t: number) => number
  smoothWheel?: boolean
  wheelMultiplier?: number
}

export function useLenis(options: UseLenisOptions = {}) {
  const lenisRef = useRef<Lenis | null>(null)
  const [isReady, setIsReady] = useState(false)
  const rafIdRef = useRef<number | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: options.duration ?? 1.2,
      easing: options.easing ?? ((t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))),
      smoothWheel: options.smoothWheel ?? true,
      wheelMultiplier: options.wheelMultiplier ?? 1,
    })

    lenisRef.current = lenis
    setIsReady(true)

    function raf(time: number) {
      lenis.raf(time)
      rafIdRef.current = requestAnimationFrame(raf)
    }

    if (options.autoRaf !== false) {
      rafIdRef.current = requestAnimationFrame(raf)
    }

    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current)
        rafIdRef.current = null
      }
      lenis.destroy()
      lenisRef.current = null
      setIsReady(false)
    }
  }, [])

  return { lenis: lenisRef.current, isReady }
}
