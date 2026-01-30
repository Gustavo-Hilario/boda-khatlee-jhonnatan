import { useRef } from 'react'

interface AdminHeaderProps {
  totalGuests: number
  totalPasses: number
  totalConfirmed: number
  confirmedGuests: number
  onAddGuest: () => void
  onExport: () => void
  onImport: (file: File) => Promise<boolean>
  onLogout: () => void
}

export function AdminHeader({
  totalGuests,
  totalPasses,
  totalConfirmed,
  confirmedGuests,
  onAddGuest,
  onExport,
  onImport,
  onLogout,
}: AdminHeaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImportClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const success = await onImport(file)
      if (!success) {
        alert('Error al importar. Verifica que el archivo JSON sea válido.')
      }
      // Reset input so same file can be selected again
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Top row: Title and logout */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-serif text-burgundy">
            Panel de invitados
          </h1>
          <button
            onClick={onLogout}
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            Cerrar sesión
          </button>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap gap-4 md:gap-6 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-gray-500 text-sm">Invitados:</span>
            <span className="font-semibold text-olive">{totalGuests}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-500 text-sm">Pases:</span>
            <span className="font-semibold text-olive">{totalPasses}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-500 text-sm">Confirmados:</span>
            <span className="font-semibold text-green-600">
              {confirmedGuests}/{totalGuests}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-500 text-sm">Personas confirmadas:</span>
            <span className="font-semibold text-green-600">{totalConfirmed}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={onAddGuest}
            className="px-4 py-2 bg-olive text-white text-sm font-medium rounded-lg hover:bg-olive-light transition-colors"
          >
            + Agregar invitado
          </button>

          <button
            onClick={onExport}
            className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
          >
            Exportar JSON
          </button>

          <button
            onClick={handleImportClick}
            className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
          >
            Importar JSON
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept=".json,application/json"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </div>
    </header>
  )
}
