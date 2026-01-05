'use client'

import { useToast } from '@/lib/useToast'
import { AnimatePresence, motion } from 'framer-motion'
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react'

export function ToastProvider() {
    const { toasts, removeToast } = useToast()

    return (
        <div className="fixed top-4 left-0 right-0 z-[100] flex flex-col items-center gap-2 pointer-events-none p-4">
            <AnimatePresence>
                {toasts.map((toast) => (
                    <motion.div
                        key={toast.id}
                        initial={{ opacity: 0, y: -20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.9 }}
                        layout
                        className={`
                            pointer-events-auto flex items-center gap-3 px-6 py-3 rounded-full shadow-lg border-2 min-w-[300px] max-w-[90vw]
                            ${toast.type === 'success' ? 'bg-white border-pop-green text-green-800' : ''}
                            ${toast.type === 'error' ? 'bg-white border-red-200 text-red-600' : ''}
                            ${toast.type === 'info' ? 'bg-white border-pop-cyan text-cyan-800' : ''}
                        `}
                    >
                        {toast.type === 'success' && <CheckCircle className="text-pop-green shrink-0" size={20} />}
                        {toast.type === 'error' && <AlertCircle className="text-red-400 shrink-0" size={20} />}
                        {toast.type === 'info' && <Info className="text-pop-cyan shrink-0" size={20} />}

                        <p className="font-bold text-sm flex-1 whitespace-pre-wrap">{toast.message}</p>

                        <button
                            onClick={() => removeToast(toast.id)}
                            className="text-gray-400 hover:text-gray-600"
                        >
                            <X size={16} />
                        </button>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    )
}
