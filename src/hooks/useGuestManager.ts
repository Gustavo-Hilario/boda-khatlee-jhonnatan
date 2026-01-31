import { useState, useCallback, useEffect } from 'react'
import type { Guest, GuestFormData } from '../types'
import {
  addGuestToFirestore,
  updateGuestInFirestore,
  deleteGuestFromFirestore,
  clearGuestConfirmation,
  subscribeToGuests,
} from '../utils/firebaseStorage'
import { exportGuestsJson, validateGuestsJson } from '../utils/guestStorage'
import { generateUniqueGuestId } from '../utils/idGenerator'

interface UseGuestManagerReturn {
  guests: Guest[]
  loading: boolean
  error: string | null
  addGuest: (data: GuestFormData) => Promise<Guest>
  updateGuest: (id: string, data: GuestFormData) => Promise<void>
  deleteGuest: (id: string) => Promise<void>
  confirmGuest: (id: string, confirmed: number) => Promise<void>
  clearConfirmation: (id: string) => Promise<void>
  exportJson: () => void
  importJson: (file: File) => Promise<boolean>
  totalPasses: number
  totalConfirmed: number
  confirmedGuests: number
}

/**
 * Hook for managing guest CRUD operations with Firestore persistence
 */
export function useGuestManager(): UseGuestManagerReturn {
  const [guests, setGuests] = useState<Guest[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Subscribe to real-time updates on mount
  useEffect(() => {
    const unsubscribe = subscribeToGuests(
      (updatedGuests) => {
        setGuests(updatedGuests)
        setLoading(false)
        setError(null)
      },
      (err) => {
        console.error('Error loading guests:', err)
        setError('Error al cargar invitados')
        setLoading(false)
      }
    )

    return () => unsubscribe()
  }, [])

  const addGuest = useCallback(async (data: GuestFormData): Promise<Guest> => {
    const newGuest: Guest = {
      id: generateUniqueGuestId(guests.map((g) => g.id)),
      name: data.name.trim(),
      passes: data.passes,
    }

    // Optimistic update - add to local state immediately
    setGuests((prev) => [...prev, newGuest])

    // Fire Firestore operation in background (don't await)
    addGuestToFirestore(newGuest).catch((err) => {
      // Revert on error
      setGuests((prev) => prev.filter((g) => g.id !== newGuest.id))
      console.error('Error adding guest:', err)
      setError('Error al agregar invitado')
    })

    return newGuest
  }, [guests])

  const updateGuest = useCallback(async (id: string, data: GuestFormData): Promise<void> => {
    // Store previous guest for rollback
    const previousGuest = guests.find((g) => g.id === id)

    // Optimistic update
    setGuests((prev) =>
      prev.map((g) =>
        g.id === id ? { ...g, name: data.name.trim(), passes: data.passes } : g
      )
    )

    // Fire Firestore operation in background (don't await)
    updateGuestInFirestore(id, {
      name: data.name.trim(),
      passes: data.passes,
    }).catch((err) => {
      // Revert on error
      if (previousGuest) {
        setGuests((prev) =>
          prev.map((g) => (g.id === id ? previousGuest : g))
        )
      }
      console.error('Error updating guest:', err)
      setError('Error al actualizar invitado')
    })
  }, [guests])

  const deleteGuest = useCallback(async (id: string): Promise<void> => {
    // Store deleted guest for rollback
    const deletedGuest = guests.find((g) => g.id === id)

    // Optimistic update - remove from local state immediately
    setGuests((prev) => prev.filter((g) => g.id !== id))

    // Fire Firestore operation in background (don't await)
    deleteGuestFromFirestore(id).catch((err) => {
      // Revert on error
      if (deletedGuest) {
        setGuests((prev) => [...prev, deletedGuest])
      }
      console.error('Error deleting guest:', err)
      setError('Error al eliminar invitado')
    })
  }, [guests])

  const confirmGuest = useCallback(async (id: string, confirmed: number): Promise<void> => {
    // Store previous guest for rollback
    const previousGuest = guests.find((g) => g.id === id)

    // Optimistic update
    setGuests((prev) =>
      prev.map((g) => (g.id === id ? { ...g, confirmed } : g))
    )

    // Fire Firestore operation in background (don't await)
    updateGuestInFirestore(id, { confirmed }).catch((err) => {
      // Revert on error
      if (previousGuest) {
        setGuests((prev) =>
          prev.map((g) => (g.id === id ? previousGuest : g))
        )
      }
      console.error('Error confirming guest:', err)
      setError('Error al confirmar invitado')
    })
  }, [guests])

  const clearConfirmation = useCallback(async (id: string): Promise<void> => {
    // Store previous guest for rollback
    const previousGuest = guests.find((g) => g.id === id)

    // Optimistic update
    setGuests((prev) =>
      prev.map((g) => (g.id === id ? { ...g, confirmed: undefined } : g))
    )

    // Fire Firestore operation in background (don't await)
    clearGuestConfirmation(id).catch((err) => {
      // Revert on error
      if (previousGuest) {
        setGuests((prev) =>
          prev.map((g) => (g.id === id ? previousGuest : g))
        )
      }
      console.error('Error clearing confirmation:', err)
      setError('Error al limpiar confirmación')
    })
  }, [guests])

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

      // Import all guests to Firestore
      const { importGuestsToFirestore } = await import('../utils/firebaseStorage')
      await importGuestsToFirestore(validatedGuests)
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
    error,
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
