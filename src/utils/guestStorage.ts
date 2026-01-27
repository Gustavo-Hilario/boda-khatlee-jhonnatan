import type { Guest } from '../types'
import initialGuestsData from '../data/guests.json'

const STORAGE_KEY = 'wedding_guests'

/**
 * Load guests from localStorage, fallback to initial JSON data
 */
export function loadGuests(): Guest[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      if (Array.isArray(parsed) && parsed.every(isValidGuest)) {
        return parsed
      }
    }
  } catch {
    console.warn('Failed to load guests from localStorage, using default data')
  }
  return initialGuestsData as Guest[]
}

/**
 * Save guests to localStorage
 */
export function saveGuests(guests: Guest[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(guests))
  } catch (error) {
    console.error('Failed to save guests to localStorage:', error)
    throw new Error('No se pudo guardar los cambios')
  }
}

/**
 * Clear localStorage and revert to initial data
 */
export function resetGuests(): Guest[] {
  localStorage.removeItem(STORAGE_KEY)
  return initialGuestsData as Guest[]
}

/**
 * Export guests as JSON file download
 */
export function exportGuestsJson(guests: Guest[]): void {
  const dataStr = JSON.stringify(guests, null, 2)
  const blob = new Blob([dataStr], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  
  const link = document.createElement('a')
  link.href = url
  link.download = 'guests.json'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

/**
 * Validate imported JSON structure
 */
export function validateGuestsJson(data: unknown): Guest[] | null {
  if (!Array.isArray(data)) return null
  
  for (const item of data) {
    if (!isValidGuest(item)) return null
  }
  
  return data as Guest[]
}

/**
 * Type guard to check if an object is a valid Guest
 */
function isValidGuest(obj: unknown): obj is Guest {
  if (typeof obj !== 'object' || obj === null) return false
  
  const guest = obj as Record<string, unknown>
  return (
    typeof guest.id === 'string' &&
    typeof guest.name === 'string' &&
    typeof guest.passes === 'number' &&
    guest.id.length > 0 &&
    guest.name.length > 0 &&
    guest.passes >= 1
  )
}
