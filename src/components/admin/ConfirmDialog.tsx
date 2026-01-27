import { motion, AnimatePresence } from 'framer-motion'

interface ConfirmDialogProps {
  isOpen: boolean
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  onConfirm: () => void
  onCancel: () => void
  variant?: 'danger' | 'warning'
}

export function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  onConfirm,
  onCancel,
  variant = 'danger',
}: ConfirmDialogProps) {
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
            onClick={onCancel}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Dialog */}
          <motion.div
            className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <h3 className="text-lg font-serif font-semibold text-gray-900 mb-2">
              {title}
            </h3>
            <p className="text-gray-600 mb-6">{message}</p>

            <div className="flex justify-end gap-3">
              <button
                onClick={onCancel}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                {cancelText}
              </button>
              <button
                onClick={onConfirm}
                className={`px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors ${
                  variant === 'danger'
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-amber-600 hover:bg-amber-700'
                }`}
              >
                {confirmText}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
