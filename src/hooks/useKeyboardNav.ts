import { useEffect, useCallback } from 'react'
import type Lenis from 'lenis'

interface UseKeyboardNavOptions {
  sectionIds: string[]
  lenis: Lenis | null
  enabled?: boolean
}

export function useKeyboardNav({ sectionIds, lenis, enabled = true }: UseKeyboardNavOptions) {
  const scrollToSection = useCallback((index: number) => {
    if (!lenis || index < 0 || index >= sectionIds.length) return

    const sectionId = sectionIds[index]
    const element = document.getElementById(sectionId)

    if (element) {
      lenis.scrollTo(element, {
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      })
    }
  }, [lenis, sectionIds])

  const getCurrentSectionIndex = useCallback((): number => {
    const scrollY = window.scrollY
    const viewportHeight = window.innerHeight

    for (let i = sectionIds.length - 1; i >= 0; i--) {
      const element = document.getElementById(sectionIds[i])
      if (element && element.offsetTop <= scrollY + viewportHeight / 2) {
        return i
      }
    }
    return 0
  }, [sectionIds])

  useEffect(() => {
    if (!enabled || !lenis) return

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return
      }

      const currentIndex = getCurrentSectionIndex()

      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault()
        if (currentIndex < sectionIds.length - 1) {
          scrollToSection(currentIndex + 1)
        }
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault()
        if (currentIndex > 0) {
          scrollToSection(currentIndex - 1)
        }
      } else if (e.key === 'Home') {
        e.preventDefault()
        scrollToSection(0)
      } else if (e.key === 'End') {
        e.preventDefault()
        scrollToSection(sectionIds.length - 1)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [enabled, lenis, sectionIds, scrollToSection, getCurrentSectionIndex])

  return { scrollToSection, getCurrentSectionIndex }
}
