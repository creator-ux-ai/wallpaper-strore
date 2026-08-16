import React, { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, Sparkles } from 'lucide-react'

const suggestionTags = ['Shiva', 'Krishna', 'Hanuman', 'Mahadev', 'Ganesha', '4K', 'Temples', 'Ram', 'Festival']

export default function SearchBar({ open, onClose, query, setQuery, onSelectCategory }) {
  const inputRef = useRef(null)

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      inputRef.current?.focus()
      const onKey = (e) => e.key === 'Escape' && onClose()
      window.addEventListener('keydown', onKey)
      return () => {
        document.body.style.overflow = ''
        window.removeEventListener('keydown', onKey)
      }
    }
  }, [open, onClose])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onClose()
      document.querySelector('#gallery')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleTagClick = (tag) => {
    onSelectCategory(tag)
    onClose()
    document.querySelector('#gallery')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-start justify-center pt-20 sm:pt-32 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.97 }}
            transition={{ duration: 0.25 }}
            className="relative w-full max-w-2xl glass-panel divine-border rounded-2xl p-4 sm:p-6 shadow-gold-lg"
          >
            <div className="flex items-center gap-3">
              <Search size={20} className="text-gold flex-shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                type="text"
                placeholder="Search Shiva, Krishna, Ganesha, 4K wallpapers..."
                className="flex-1 bg-transparent outline-none text-ivory placeholder:text-ivory/40 text-base sm:text-lg"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  aria-label="Clear search"
                  className="text-ivory/50 hover:text-gold transition-colors p-1"
                >
                  <X size={18} />
                </button>
              )}
              <button
                onClick={onClose}
                aria-label="Close search"
                className="flex h-9 w-9 items-center justify-center rounded-full divine-border text-gold hover:bg-gold/10 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Quick Suggestion Chips */}
            <div className="mt-4 pt-3 border-t border-gold/10">
              <p className="text-xs text-ivory/50 tracking-wider font-medium mb-2.5 flex items-center gap-1.5">
                <Sparkles size={12} className="text-gold" /> QUICK CATEGORIES
              </p>
              <div className="flex flex-wrap gap-2">
                {suggestionTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleTagClick(tag)}
                    className="rounded-full bg-navy/60 divine-border px-3 py-1 text-xs text-ivory/80 hover:text-gold hover:border-gold/60 transition-all"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
