import { useState, useCallback, useEffect } from 'react'
import type { Guest, GuestFormData } from '../types'
import { loadGuests, saveGuests, exportGuestsJson, validateGuestsJson } from '../utils/guestStorage'
import { generateUniqueGuestId } from '../utils/idGenerator'

interface UseGuestManagerReturn {
  guests: Guest[]
  loading: boolean
  addGuest: (data: GuestFormData) => Guest
  updateGuest: (id: string, data: GuestFormData) => void
  deleteGuest: (id: string) => void
  confirmGuest: (id: string, confirmed: number) => void
  clearConfirmation: (id: string) => void
  exportJson: () => void
  importJson: (file: File) => Promise<boolean>
  totalPasses: number
  totalConfirmed: number
  confirmedGuests: number
}

/**
 * Hook for managing guest CRUD operations with localStorage persistence
 */
export function useGuestManager(): UseGuestManagerReturn {
  const [guests, setGuests] = useState<Guest[]>([])
  const [loading, setLoading] = useState(true)

  // Load guests on mount
  useEffect(() => {
    const loadedGuests = loadGuests()
    setGuests(loadedGuests)
    setLoading(false)
  }, [])

  // Save to localStorage whenever guests change (after initial load)
  useEffect(() => {
    if (!loading) {
      saveGuests(guests)
    }
  }, [guests, loading])

  const addGuest = useCallback((data: GuestFormData): Guest => {
    const newGuest: Guest = {
      id: generateUniqueGuestId(guests.map((g) => g.id)),
      name: data.name.trim(),
      passes: data.passes,
    }
    setGuests((prev) => [...prev, newGuest])
    return newGuest
  }, [guests])

  const updateGuest = useCallback((id: string, data: GuestFormData): void => {
    setGuests((prev) =>
      prev.map((guest) =>
        guest.id === id
          ? { ...guest, name: data.name.trim(), passes: data.passes }
          : guest
      )
    )
  }, [])

  const deleteGuest = useCallback((id: string): void => {
    setGuests((prev) => prev.filter((guest) => guest.id !== id))
  }, [])

  const confirmGuest = useCallback((id: string, confirmed: number): void => {
    setGuests((prev) =>
      prev.map((guest) =>
        guest.id === id ? { ...guest, confirmed } : guest
      )
    )
  }, [])

  const clearConfirmation = useCallback((id: string): void => {
    setGuests((prev) =>
      prev.map((guest) =>
        guest.id === id ? { ...guest, confirmed: undefined } : guest
      )
    )
  }, [])

  const exportJson = useCallback((): void => {
    exportGuestsJson(guests)
  }, [guests])

  const importJson = useCallback(async (file: File): Promise<boolean> => {
    try {
      const text = await file.text()
      const data = JSON.parse(text)
      const validatedGuests = validateGuestsJson(data)

      if (!validatedGuests) {
        throw new Error('Formato de JSON inválido')
      }

      setGuests(validatedGuests)
      return true
    } catch (error) {
      console.error('Error importing JSON:', error)
      return false
    }
  }, [])

  const totalPasses = guests.reduce((sum, guest) => sum + guest.passes, 0)
  const totalConfirmed = guests.reduce((sum, guest) => sum + (guest.confirmed ?? 0), 0)
  const confirmedGuests = guests.filter((guest) => guest.confirmed !== undefined).length

  return {
    guests,
    loading,
    addGuest,
    updateGuest,
    deleteGuest,
    confirmGuest,
    clearConfirmation,
    exportJson,
    importJson,
    totalPasses,
    totalConfirmed,
    confirmedGuests,
  }
}
