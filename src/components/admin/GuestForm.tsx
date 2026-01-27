import { useState, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Guest, GuestFormData } from '../../types'

interface GuestFormProps {
  isOpen: boolean
  guest: Guest | null // null for add, Guest for edit
  onSubmit: (data: GuestFormData) => void
  onClose: () => void
}

interface FormContentProps {
  guest: Guest | null
  onSubmit: (data: GuestFormData) => void
  onClose: () => void
}

/**
 * Internal form content component - receives initial values as props
 * Uses key in parent to reset state when guest changes
 */
function FormContent({ guest, onSubmit, onClose }: FormContentProps) {
  const [name, setName] = useState(guest?.name ?? '')
  const [passes, setPasses] = useState(guest?.passes ?? 1)
  const [errors, setErrors] = useState<{ name?: string; passes?: string }>({})

  const isEditing = guest !== null

  const validate = (): boolean => {
    const newErrors: { name?: string; passes?: string } = {}

    if (!name.trim()) {
      newErrors.name = 'El nombre es requerido'
    }

    if (passes < 1 || passes > 20) {
      newErrors.passes = 'Los pases deben ser entre 1 y 20'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (!validate()) return

    onSubmit({ name: name.trim(), passes })
    onClose()
  }

  return (
    <>
      <h2 className="text-xl font-serif font-semibold text-burgundy mb-6">
        {isEditing ? 'Editar Invitado' : 'Agregar Invitado'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="guestName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Nombre
          </label>
          <input
            type="text"
            id="guestName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-olive focus:border-transparent transition-all ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Nombre del invitado o familia"
            autoFocus
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="guestPasses"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Número de Pases
          </label>
          <input
            type="number"
            id="guestPasses"
            value={passes}
            onChange={(e) => setPasses(parseInt(e.target.value) || 1)}
            min={1}
            max={20}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-olive focus:border-transparent transition-all ${
              errors.passes ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.passes && (
            <p className="text-red-500 text-sm mt-1">{errors.passes}</p>
          )}
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-olive rounded-lg hover:bg-olive-light transition-colors"
          >
            {isEditing ? 'Guardar Cambios' : 'Agregar Invitado'}
          </button>
        </div>
      </form>
    </>
  )
}

export function GuestForm({ isOpen, guest, onSubmit, onClose }: GuestFormProps) {
  // Use key to reset form state when guest changes
  const formKey = guest?.id ?? 'new'

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/50"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <FormContent
              key={formKey}
              guest={guest}
              onSubmit={onSubmit}
              onClose={onClose}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
