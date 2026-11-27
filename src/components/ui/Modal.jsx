import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { AnimatePresence } from 'framer-motion'

export default function Modal({ open, onClose, children, title, wide = false }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center p-0 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className={`relative w-full ${wide ? 'max-w-3xl' : 'max-w-lg'} bg-card border border-line rounded-t-3xl sm:rounded-3xl p-6 sm:p-8 max-h-[88vh] overflow-y-auto shadow-2xl`}
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              {title && (
                <h3 className="font-display text-2xl font-semibold text-cream">{title}</h3>
              )}
              <button
                onClick={onClose}
                aria-label="Close"
                className="shrink-0 rounded-full p-2 text-muted hover:text-cream hover:bg-white/5 transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
