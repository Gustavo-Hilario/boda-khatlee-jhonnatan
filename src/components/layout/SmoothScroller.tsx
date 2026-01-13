import { useEffect, type ReactNode } from 'react'
import { useLenis } from '../../hooks/useLenis'
import { useKeyboardNav } from '../../hooks/useKeyboardNav'

interface SmoothScrollerProps {
  children: ReactNode
  sectionIds: string[]
}

export function SmoothScroller({ children, sectionIds }: SmoothScrollerProps) {
  const { lenis, isReady } = useLenis({
    duration: 1.2,
    smoothWheel: true,
    wheelMultiplier: 1,
  })

  // Enable keyboard navigation when lenis is ready
  useKeyboardNav({
    sectionIds,
    lenis,
    enabled: isReady,
  })

  // Add lenis class to html element
  useEffect(() => {
    document.documentElement.classList.add('lenis')
    return () => {
      document.documentElement.classList.remove('lenis')
    }
  }, [])

  return <>{children}</>
}
