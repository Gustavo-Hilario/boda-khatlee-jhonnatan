import { useEffect, useCallback, useState, useRef } from 'react'
import type Lenis from 'lenis'

interface UseKeyboardNavOptions {
  sectionIds: string[]
  lenis: Lenis | null
  enabled?: boolean
}

export function useKeyboardNav({ sectionIds, lenis, enabled = true }: UseKeyboardNavOptions) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const isScrollingRef = useRef(false)

  const scrollToSection = useCallback((index: number) => {
    if (!lenis || index < 0 || index >= sectionIds.length) return

    const sectionId = sectionIds[index]
    const element = document.getElementById(sectionId)

    if (element) {
      isScrollingRef.current = true
      setCurrentIndex(index)

      lenis.scrollTo(element, {
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        onComplete: () => {
          isScrollingRef.current = false
        },
      })
    }
  }, [lenis, sectionIds])

  // Update current index based on scroll position (for manual scrolling)
  useEffect(() => {
    if (!enabled) return

    const updateCurrentIndex = () => {
      // Don't update while programmatic scrolling is in progress
      if (isScrollingRef.current) return

      const viewportHeight = window.innerHeight

      // Find which section is most visible (closest to viewport center)
      let bestIndex = 0
      let bestVisibility = -Infinity

      for (let i = 0; i < sectionIds.length; i++) {
        const element = document.getElementById(sectionIds[i])
        if (!element) continue

        const rect = element.getBoundingClientRect()

        // Calculate how close the section center is to viewport center
        const viewportCenter = viewportHeight / 2
        const sectionCenter = rect.top + rect.height / 2
        const distanceFromCenter = Math.abs(sectionCenter - viewportCenter)
        const visibility = -distanceFromCenter // Higher (less negative) = more centered

        if (visibility > bestVisibility) {
          bestVisibility = visibility
          bestIndex = i
        }
      }

      setCurrentIndex(bestIndex)
    }

    // Update on scroll
    window.addEventListener('scroll', updateCurrentIndex, { passive: true })

    // Initial update after a short delay to let DOM settle
    const timeoutId = setTimeout(updateCurrentIndex, 100)

    return () => {
      window.removeEventListener('scroll', updateCurrentIndex)
      clearTimeout(timeoutId)
    }
  }, [enabled, sectionIds])

  // Handle keyboard navigation
  useEffect(() => {
    if (!enabled || !lenis) return

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return
      }

      // Ignore if already scrolling
      if (isScrollingRef.current) return

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
  }, [enabled, lenis, sectionIds, currentIndex, scrollToSection])

  return { scrollToSection, currentIndex }
}
