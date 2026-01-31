import { useState, useCallback, useEffect } from 'react'
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User,
} from 'firebase/auth'
import { auth } from '../config/firebase'

interface UseAdminAuthReturn {
  isAuthenticated: boolean
  loading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
  error: string | null
  clearError: () => void
}

/**
 * Hook for admin authentication using Firebase Auth
 */
export function useAdminAuth(): UseAdminAuthReturn {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    try {
      setError(null)
      await signInWithEmailAndPassword(auth, email, password)
      return true
    } catch (err) {
      console.error('Login error:', err)
      setError('Usuario o contraseña incorrectos')
      return false
    }
  }, [])

  const logout = useCallback(async () => {
    try {
      await signOut(auth)
      setError(null)
    } catch (err) {
      console.error('Logout error:', err)
      setError('Error al cerrar sesión')
    }
  }, [])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return {
    isAuthenticated: !!user,
    loading,
    login,
    logout,
    error,
    clearError,
  }
}
