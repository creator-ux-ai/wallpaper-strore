import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen({ visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-navy"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          <motion.span
            className="text-gold text-6xl font-display"
            initial={{ opacity: 0.3, scale: 0.85 }}
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.85, 1, 0.85] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            ॐ
          </motion.span>
          <motion.p
            className="mt-4 tracking-[0.35em] text-sm font-display text-ivory/80"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            SANATAN STROKES
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
