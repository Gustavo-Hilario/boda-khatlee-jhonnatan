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

    try {
      await addGuestToFirestore(newGuest)
      return newGuest
    } catch (err) {
      console.error('Error adding guest:', err)
      throw new Error('Error al agregar invitado')
    }
  }, [guests])

  const updateGuest = useCallback(async (id: string, data: GuestFormData): Promise<void> => {
    try {
      await updateGuestInFirestore(id, {
        name: data.name.trim(),
        passes: data.passes,
      })
    } catch (err) {
      console.error('Error updating guest:', err)
      throw new Error('Error al actualizar invitado')
    }
  }, [])

  const deleteGuest = useCallback(async (id: string): Promise<void> => {
    try {
      await deleteGuestFromFirestore(id)
    } catch (err) {
      console.error('Error deleting guest:', err)
      throw new Error('Error al eliminar invitado')
    }
  }, [])

  const confirmGuest = useCallback(async (id: string, confirmed: number): Promise<void> => {
    try {
      await updateGuestInFirestore(id, { confirmed })
    } catch (err) {
      console.error('Error confirming guest:', err)
      throw new Error('Error al confirmar invitado')
    }
  }, [])

  const clearConfirmation = useCallback(async (id: string): Promise<void> => {
    try {
      await clearGuestConfirmation(id)
    } catch (err) {
      console.error('Error clearing confirmation:', err)
      throw new Error('Error al limpiar confirmación')
    }
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
