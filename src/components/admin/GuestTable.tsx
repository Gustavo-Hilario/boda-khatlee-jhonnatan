import { useState } from 'react'
import { motion } from 'framer-motion'
import type { Guest } from '../../types'

interface GuestTableProps {
  guests: Guest[]
  onEdit: (guest: Guest) => void
  onDelete: (guest: Guest) => void
  onConfirm: (guestId: string, confirmed: number) => void
  onClearConfirm: (guestId: string) => void
}

export function GuestTable({ guests, onEdit, onDelete, onConfirm, onClearConfirm }: GuestTableProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [confirmInputs, setConfirmInputs] = useState<Record<string, string>>({})

  const getInvitationUrl = (guestId: string): string => {
    const baseUrl = window.location.origin + window.location.pathname
    const cleanUrl = baseUrl.replace(/\?.*$/, '')
    return `${cleanUrl}?guest=${guestId}`
  }

  const copyLink = async (guest: Guest) => {
    const url = getInvitationUrl(guest.id)
    try {
      await navigator.clipboard.writeText(url)
      setCopiedId(guest.id)
      setTimeout(() => setCopiedId(null), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
      const textArea = document.createElement('textarea')
      textArea.value = url
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopiedId(guest.id)
      setTimeout(() => setCopiedId(null), 2000)
    }
  }

  const handleConfirmInputChange = (guestId: string, value: string) => {
    setConfirmInputs((prev) => ({ ...prev, [guestId]: value }))
  }

  const handleConfirmSubmit = (guest: Guest) => {
    const inputValue = confirmInputs[guest.id]
    const confirmed = inputValue !== undefined ? parseInt(inputValue) : (guest.confirmed ?? guest.passes)
    
    if (!isNaN(confirmed) && confirmed >= 0 && confirmed <= guest.passes) {
      onConfirm(guest.id, confirmed)
      // Clear the input after confirming
      setConfirmInputs((prev) => {
        const newInputs = { ...prev }
        delete newInputs[guest.id]
        return newInputs
      })
    }
  }

  const getInputValue = (guest: Guest): string => {
    if (confirmInputs[guest.id] !== undefined) {
      return confirmInputs[guest.id]
    }
    return guest.confirmed?.toString() ?? ''
  }

  if (guests.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow">
        <p className="text-gray-500">No hay invitados registrados</p>
        <p className="text-gray-400 text-sm mt-1">
          Agrega el primer invitado usando el botón de arriba
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
                Nombre
              </th>
              <th className="text-center px-6 py-4 text-sm font-semibold text-gray-700">
                Pases
              </th>
              <th className="text-center px-6 py-4 text-sm font-semibold text-gray-700">
                Confirmados
              </th>
              <th className="text-center px-6 py-4 text-sm font-semibold text-gray-700">
                ID
              </th>
              <th className="text-right px-6 py-4 text-sm font-semibold text-gray-700">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {guests.map((guest, index) => {
              const isConfirmed = guest.confirmed !== undefined
              return (
                <motion.tr
                  key={guest.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className={`transition-colors ${
                    isConfirmed 
                      ? 'bg-green-50 hover:bg-green-100' 
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {guest.name}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center justify-center w-8 h-8 bg-olive/10 text-olive rounded-full font-semibold">
                      {guest.passes}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <input
                        type="number"
                        min={0}
                        max={guest.passes}
                        value={getInputValue(guest)}
                        onChange={(e) => handleConfirmInputChange(guest.id, e.target.value)}
                        placeholder="-"
                        className={`w-16 px-2 py-1 text-center border rounded focus:ring-2 focus:ring-olive focus:border-transparent text-sm ${
                          isConfirmed ? 'border-green-300 bg-white' : 'border-gray-300'
                        }`}
                      />
                      <button
                        onClick={() => handleConfirmSubmit(guest)}
                        className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
                          isConfirmed
                            ? 'bg-green-600 text-white hover:bg-green-700'
                            : 'bg-olive text-white hover:bg-olive-light'
                        }`}
                        title={isConfirmed ? 'Actualizar confirmación' : 'Confirmar asistencia'}
                      >
                        ✓
                      </button>
                      {isConfirmed && (
                        <button
                          onClick={() => onClearConfirm(guest.id)}
                          className="px-2 py-1 text-xs font-medium rounded bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                          title="Quitar confirmación"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <code className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">
                      {guest.id}
                    </code>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => copyLink(guest)}
                        className={`px-3 py-1.5 text-xs font-medium rounded transition-all ${
                          copiedId === guest.id
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {copiedId === guest.id ? '¡Copiado!' : 'Copiar Link'}
                      </button>
                      <button
                        onClick={() => onEdit(guest)}
                        className="px-3 py-1.5 text-xs font-medium bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => onDelete(guest)}
                        className="px-3 py-1.5 text-xs font-medium bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </motion.tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden divide-y divide-gray-100">
        {guests.map((guest, index) => {
          const isConfirmed = guest.confirmed !== undefined
          return (
            <motion.div
              key={guest.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
              className={`p-4 ${isConfirmed ? 'bg-green-50' : ''}`}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-medium text-gray-900">{guest.name}</h3>
                  <code className="text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-500">
                    ID: {guest.id}
                  </code>
                </div>
                <span className="inline-flex items-center justify-center w-10 h-10 bg-olive/10 text-olive rounded-full font-semibold">
                  {guest.passes}
                </span>
              </div>
              
              {/* Confirmation row for mobile */}
              <div className="flex items-center gap-2 mb-3 p-2 bg-white rounded border">
                <span className="text-sm text-gray-600">Confirmados:</span>
                <input
                  type="number"
                  min={0}
                  max={guest.passes}
                  value={getInputValue(guest)}
                  onChange={(e) => handleConfirmInputChange(guest.id, e.target.value)}
                  placeholder="-"
                  className={`w-16 px-2 py-1 text-center border rounded text-sm ${
                    isConfirmed ? 'border-green-300' : 'border-gray-300'
                  }`}
                />
                <button
                  onClick={() => handleConfirmSubmit(guest)}
                  className={`px-3 py-1 text-xs font-medium rounded ${
                    isConfirmed
                      ? 'bg-green-600 text-white'
                      : 'bg-olive text-white'
                  }`}
                >
                  ✓
                </button>
                {isConfirmed && (
                  <>
                    <button
                      onClick={() => onClearConfirm(guest.id)}
                      className="px-2 py-1 text-xs font-medium rounded bg-red-100 text-red-600"
                      title="Quitar confirmación"
                    >
                      ✕
                    </button>
                    <span className="text-xs text-green-600 font-medium ml-auto">
                      Confirmado
                    </span>
                  </>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => copyLink(guest)}
                  className={`flex-1 px-3 py-2 text-xs font-medium rounded transition-all ${
                    copiedId === guest.id
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {copiedId === guest.id ? '¡Copiado!' : 'Copiar Link'}
                </button>
                <button
                  onClick={() => onEdit(guest)}
                  className="px-3 py-2 text-xs font-medium bg-blue-100 text-blue-700 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => onDelete(guest)}
                  className="px-3 py-2 text-xs font-medium bg-red-100 text-red-700 rounded"
                >
                  Eliminar
                </button>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
