import { createContext, useContext, useState, useEffect, useMemo, type ReactNode } from 'react'
import type { Guest } from '../types'
import { loadGuestById } from '../utils/firebaseStorage'

interface GuestContextType {
  guest: Guest | null
  loading: boolean
  error: string | null
  guestId: string | null
}

const GuestContext = createContext<GuestContextType | null>(null)

interface GuestProviderProps {
  children: ReactNode
}

export function GuestProvider({ children }: GuestProviderProps) {
  const [guest, setGuest] = useState<Guest | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [guestId, setGuestId] = useState<string | null>(null)

  useEffect(() => {
    // Guard for SSR/test environments
    if (typeof window === 'undefined') {
      setLoading(false)
      return
    }

    const params = new URLSearchParams(window.location.search)
    const id = params.get('guest')
    setGuestId(id)

    if (!id) {
      setLoading(false)
      return
    }

    const fetchGuest = async () => {
      try {
        const foundGuest = await loadGuestById(id)
        setGuest(foundGuest)
        setError(null)
      } catch (err) {
        console.error('Error loading guest:', err)
        setError('Error al cargar invitado')
      } finally {
        setLoading(false)
      }
    }

    fetchGuest()
  }, [])

  const value = useMemo(
    () => ({ guest, loading, error, guestId }),
    [guest, loading, error, guestId]
  )

  return <GuestContext.Provider value={value}>{children}</GuestContext.Provider>
}

export function useGuest(): GuestContextType {
  const context = useContext(GuestContext)
  if (!context) {
    throw new Error('useGuest must be used within a GuestProvider')
  }
  return context
}
