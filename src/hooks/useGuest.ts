import { useState, useEffect } from 'react'
import type { Guest } from '../types'
import { loadGuestById } from '../utils/firebaseStorage'

interface UseGuestReturn {
  guest: Guest | null
  loading: boolean
  error: string | null
}

/**
 * Hook to get guest information from URL query parameter
 * Usage: Add ?guest=xK9m2p to your URL
 * Example: https://yoursite.com/?guest=xK9m2p
 */
export function useGuest(): UseGuestReturn {
  const [guest, setGuest] = useState<Guest | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchGuest = async () => {
      const params = new URLSearchParams(window.location.search)
      const guestId = params.get('guest')

      if (!guestId) {
        setLoading(false)
        return
      }

      try {
        const foundGuest = await loadGuestById(guestId)
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

  return { guest, loading, error }
}
