/**
 * Generate a unique 6-character alphanumeric ID
 * Uses a mix of uppercase, lowercase, and numbers for readable IDs
 */
export function generateGuestId(): string {
  const chars = 'abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let id = ''
  for (let i = 0; i < 6; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length))
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
