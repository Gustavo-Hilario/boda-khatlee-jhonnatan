import { useState } from 'react'
import { motion } from 'framer-motion'
import type { Guest } from '../../types'

interface GuestTableProps {
  guests: Guest[]
  onEdit: (guest: Guest) => void
  onDelete: (guest: Guest) => void
}

export function GuestTable({ guests, onEdit, onDelete }: GuestTableProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const getInvitationUrl = (guestId: string): string => {
    const baseUrl = window.location.origin + window.location.pathname
    // Remove any existing query params and add guest param
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
      // Fallback for older browsers
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
                ID
              </th>
              <th className="text-right px-6 py-4 text-sm font-semibold text-gray-700">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {guests.map((guest, index) => (
              <motion.tr
                key={guest.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 font-medium text-gray-900">
                  {guest.name}
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-olive/10 text-olive rounded-full font-semibold">
                    {guest.passes}
                  </span>
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
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden divide-y divide-gray-100">
        {guests.map((guest, index) => (
          <motion.div
            key={guest.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03 }}
            className="p-4"
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
        ))}
      </div>
    </div>
  )
}
