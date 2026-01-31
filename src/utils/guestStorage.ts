import type { Guest } from '../types'

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
  const hasRequiredFields = (
    typeof guest.id === 'string' &&
    typeof guest.name === 'string' &&
    typeof guest.passes === 'number' &&
    guest.id.length > 0 &&
    guest.name.length > 0 &&
    guest.passes >= 1
  )

  // confirmed is optional, but if present must be a valid number
  const hasValidConfirmed = (
    guest.confirmed === undefined ||
    (typeof guest.confirmed === 'number' && guest.confirmed >= 0)
  )

  return hasRequiredFields && hasValidConfirmed
}
