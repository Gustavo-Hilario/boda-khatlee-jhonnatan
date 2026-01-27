import { useState } from 'react'
import { useAdminAuth } from '../../hooks/useAdminAuth'
import { useGuestManager } from '../../hooks/useGuestManager'
import { AdminLogin } from './AdminLogin'
import { AdminHeader } from './AdminHeader'
import { GuestTable } from './GuestTable'
import { GuestForm } from './GuestForm'
import { ConfirmDialog } from './ConfirmDialog'
import type { Guest, GuestFormData } from '../../types'

export function AdminPage() {
  const { isAuthenticated, login, logout, error } = useAdminAuth()
  const {
    guests,
    loading,
    addGuest,
    updateGuest,
    deleteGuest,
    confirmGuest,
    clearConfirmation,
    exportJson,
    importJson,
    totalPasses,
    totalConfirmed,
    confirmedGuests,
  } = useGuestManager()

  // Modal states
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingGuest, setEditingGuest] = useState<Guest | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<Guest | null>(null)
  const [importConfirm, setImportConfirm] = useState<File | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  // Filter guests by search query
  const filteredGuests = guests.filter((guest) => {
    if (!searchQuery.trim()) return true
    const query = searchQuery.toLowerCase()
    return (
      guest.name.toLowerCase().includes(query) ||
      guest.id.toLowerCase().includes(query)
    )
  })

  // Show login if not authenticated
  if (!isAuthenticated) {
    return <AdminLogin onLogin={login} error={error} />
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-olive text-lg">Cargando...</div>
      </div>
    )
  }

  const handleAddGuest = () => {
    setEditingGuest(null)
    setIsFormOpen(true)
  }

  const handleEditGuest = (guest: Guest) => {
    setEditingGuest(guest)
    setIsFormOpen(true)
  }

  const handleFormSubmit = (data: GuestFormData) => {
    if (editingGuest) {
      updateGuest(editingGuest.id, data)
    } else {
      addGuest(data)
    }
  }

  const handleDeleteClick = (guest: Guest) => {
    setDeleteConfirm(guest)
  }

  const handleDeleteConfirm = () => {
    if (deleteConfirm) {
      deleteGuest(deleteConfirm.id)
      setDeleteConfirm(null)
    }
  }

  const handleImport = async (file: File): Promise<boolean> => {
    // Show confirmation before importing
    setImportConfirm(file)
    return true // We'll handle the actual import in confirm
  }

  const handleImportConfirm = async () => {
    if (importConfirm) {
      const success = await importJson(importConfirm)
      setImportConfirm(null)
      if (!success) {
        alert('Error al importar. Verifica que el archivo JSON sea válido.')
      }
    }
  }

  return (
    <div className="min-h-screen bg-cream">
      <AdminHeader
        totalGuests={guests.length}
        totalPasses={totalPasses}
        totalConfirmed={totalConfirmed}
        confirmedGuests={confirmedGuests}
        onAddGuest={handleAddGuest}
        onExport={exportJson}
        onImport={handleImport}
        onLogout={logout}
      />

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Search */}
        <div className="mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar por nombre o ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-80 px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-olive focus:border-transparent transition-shadow"
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          {searchQuery && (
            <p className="mt-2 text-sm text-gray-500">
              {filteredGuests.length} de {guests.length} invitados
            </p>
          )}
        </div>

        <GuestTable
          guests={filteredGuests}
          onEdit={handleEditGuest}
          onDelete={handleDeleteClick}
          onConfirm={confirmGuest}
          onClearConfirm={clearConfirmation}
        />
      </main>

      {/* Add/Edit Guest Modal */}
      <GuestForm
        isOpen={isFormOpen}
        guest={editingGuest}
        onSubmit={handleFormSubmit}
        onClose={() => setIsFormOpen(false)}
      />

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={deleteConfirm !== null}
        title="Eliminar Invitado"
        message={`¿Estás seguro que deseas eliminar a "${deleteConfirm?.name}"? Esta acción no se puede deshacer.`}
        confirmText="Eliminar"
        cancelText="Cancelar"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteConfirm(null)}
        variant="danger"
      />

      {/* Import Confirmation */}
      <ConfirmDialog
        isOpen={importConfirm !== null}
        title="Importar Lista de Invitados"
        message="Esto reemplazará toda la lista actual de invitados. ¿Deseas continuar?"
        confirmText="Importar"
        cancelText="Cancelar"
        onConfirm={handleImportConfirm}
        onCancel={() => setImportConfirm(null)}
        variant="warning"
      />
    </div>
  )
}
