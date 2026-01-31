/**
 * Generate a unique 12-character alphanumeric ID using cryptographic randomness
 * Uses Web Crypto API for secure random generation
 * Excludes ambiguous characters (0, O, l, 1, I) for readability
 */
export function generateGuestId(): string {
  const chars = 'abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  const length = 12

  // Use crypto.getRandomValues for cryptographic randomness
  const randomValues = new Uint32Array(length)
  crypto.getRandomValues(randomValues)

  let id = ''
  for (let i = 0; i < length; i++) {
    id += chars.charAt(randomValues[i] % chars.length)
  }
  return id
}

/**
 * Generate a unique ID that doesn't exist in the provided list
 */
export function generateUniqueGuestId(existingIds: string[]): string {
  let id = generateGuestId()
  const existingSet = new Set(existingIds)
  
  while (existingSet.has(id)) {
    id = generateGuestId()
  }
  
  return id
}
