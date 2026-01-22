import { useMemo } from 'react'
import type { Guest } from '../types'
import guestsData from '../data/guests.json'

/**
 * Hook to get guest information from URL query parameter
 * Usage: Add ?guest=xK9m2p to your URL
 * Example: https://yoursite.com/?guest=xK9m2p
 */
export function useGuest(): Guest | null {
  const guest = useMemo(() => {
    const params = new URLSearchParams(window.location.search)
    const guestId = params.get('guest')

    if (!guestId) return null

    const foundGuest = (guestsData as Guest[]).find((g) => g.id === guestId)
    return foundGuest || null
  }, [])

  return guest
}
