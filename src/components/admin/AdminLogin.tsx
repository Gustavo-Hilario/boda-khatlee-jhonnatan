import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'

interface AdminLoginProps {
  onLogin: (username: string, password: string) => boolean
  error: string | null
}

export function AdminLogin({ onLogin, error }: AdminLoginProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Small delay for UX
    await new Promise((resolve) => setTimeout(resolve, 300))
    onLogin(username, password)

    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-4">
      <motion.div
        className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif text-burgundy mb-2">
            Panel de Administración
          </h1>
          <p className="text-gray-600 text-sm">Gestión de Invitados</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Usuario
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-olive focus:border-transparent transition-all"
              placeholder="Ingresa tu usuario"
              required
              autoFocus
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-olive focus:border-transparent transition-all"
              placeholder="Ingresa tu contraseña"
              required
            />
          </div>

          {error && (
            <motion.p
              className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-lg"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              {error}
            </motion.p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-burgundy text-white py-3 rounded-lg font-medium hover:bg-burgundy-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Verificando...' : 'Iniciar Sesión'}
          </button>
        </form>

        <p className="text-center text-gray-400 text-xs mt-8">
          Acceso restringido a administradores
        </p>
      </motion.div>
    </div>
  )
}
