import { useState, useCallback, useEffect } from 'react'

const AUTH_KEY = 'admin_authenticated'
const CREDENTIALS = {
  username: 'admin',
  password: '@Brocal2018.@',
}

interface UseAdminAuthReturn {
  isAuthenticated: boolean
  login: (username: string, password: string) => boolean
  logout: () => void
  error: string | null
  clearError: () => void
}

/**
 * Hook for admin authentication using sessionStorage
 * Session expires when browser tab is closed
 */
export function useAdminAuth(): UseAdminAuthReturn {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem(AUTH_KEY) === 'true'
  })
  const [error, setError] = useState<string | null>(null)

  // Sync state with sessionStorage changes (e.g., from other components)
  useEffect(() => {
    const handleStorage = () => {
      setIsAuthenticated(sessionStorage.getItem(AUTH_KEY) === 'true')
    }
    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  const login = useCallback((username: string, password: string): boolean => {
    if (username === CREDENTIALS.username && password === CREDENTIALS.password) {
      sessionStorage.setItem(AUTH_KEY, 'true')
      setIsAuthenticated(true)
      setError(null)
      return true
    }
    setError('Usuario o contraseña incorrectos')
    return false
  }, [])

  const logout = useCallback(() => {
    sessionStorage.removeItem(AUTH_KEY)
    setIsAuthenticated(false)
    setError(null)
  }, [])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return {
    isAuthenticated,
    login,
    logout,
    error,
    clearError,
  }
}
