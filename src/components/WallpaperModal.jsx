import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Download, ChevronLeft, ChevronRight, Heart, Share2, Check } from 'lucide-react'

export default function WallpaperModal({
  wallpaper,
  onClose,
  onDownload,
  onNext,
  onPrev,
  hasNext = false,
  hasPrev = false,
  isFavorite = false,
  onToggleFavorite
}) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (wallpaper) {
      document.body.style.overflow = 'hidden'

      const onKey = (e) => {
        if (e.key === 'Escape') onClose()
        if (e.key === 'ArrowRight' && hasNext && onNext) onNext()
        if (e.key === 'ArrowLeft' && hasPrev && onPrev) onPrev()
      }

      window.addEventListener('keydown', onKey)
      return () => {
        document.body.style.overflow = ''
        window.removeEventListener('keydown', onKey)
      }
    }
  }, [wallpaper, onClose, onNext, onPrev, hasNext, hasPrev])

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: wallpaper.title,
          text: `Check out this divine wallpaper: ${wallpaper.title} on Sanatan Strokes`,
          url: window.location.href
        })
      } catch (err) {
        // User cancelled share
      }
    } else {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <AnimatePresence>
      {wallpaper && (
        <motion.div
          className="fixed inset-0 z-[110] flex items-center justify-center p-2 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ duration: 0.25 }}
            className="relative w-full max-w-4xl max-h-[92vh] glass-panel rounded-t-2xl sm:rounded-2xl divine-border overflow-hidden flex flex-col sm:flex-row shadow-gold-lg z-10"
          >
            {/* Top Bar Actions */}
            <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
              {onToggleFavorite && (
                <button
                  onClick={() => onToggleFavorite(wallpaper.id)}
                  aria-label={isFavorite ? 'Remove favorite' : 'Add favorite'}
                  className="h-10 w-10 flex items-center justify-center rounded-full bg-navy/80 divine-border text-ivory hover:text-ember hover:bg-gold/10 transition-all"
                >
                  <Heart size={18} className={isFavorite ? 'fill-ember text-ember' : 'text-ivory'} />
                </button>
              )}
              <button
                onClick={handleShare}
                aria-label="Share wallpaper"
                className="h-10 w-10 flex items-center justify-center rounded-full bg-navy/80 divine-border text-gold hover:bg-gold/10 transition-all"
              >
                {copied ? <Check size={18} className="text-green-400" /> : <Share2 size={18} />}
              </button>
              <button
                onClick={onClose}
                aria-label="Close preview"
                className="h-10 w-10 flex items-center justify-center rounded-full bg-navy/80 divine-border text-gold hover:bg-gold/10 transition-all"
              >
                <X size={18} />
              </button>
            </div>

            {/* Navigation Arrows */}
            {hasPrev && onPrev && (
              <button
                onClick={onPrev}
                aria-label="Previous wallpaper"
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 h-10 w-10 flex items-center justify-center rounded-full bg-navy-dark/80 divine-border text-gold hover:bg-gold/20 shadow-md backdrop-blur transition-all"
              >
                <ChevronLeft size={20} />
              </button>
            )}
            {hasNext && onNext && (
              <button
                onClick={onNext}
                aria-label="Next wallpaper"
                className="absolute right-3 sm:right-auto sm:left-[55%] lg:left-[57%] top-1/2 -translate-y-1/2 z-20 h-10 w-10 flex items-center justify-center rounded-full bg-navy-dark/80 divine-border text-gold hover:bg-gold/20 shadow-md backdrop-blur transition-all"
              >
                <ChevronRight size={20} />
              </button>
            )}

            {/* Left Image Section */}
            <div className="sm:w-3/5 bg-black/90 flex items-center justify-center relative min-h-[260px] sm:min-h-[480px]">
              <img
                src={wallpaper.image}
                alt={wallpaper.title}
                className="max-h-[50vh] sm:max-h-[75vh] w-full object-contain p-4"
              />
            </div>

            {/* Right Details Section */}
            <div className="sm:w-2/5 p-6 flex flex-col justify-between overflow-y-auto max-h-[50vh] sm:max-h-full">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="rounded-full bg-gold/90 px-3 py-0.5 text-[11px] tracking-wider text-navy-dark font-bold">
                    {wallpaper.quality} WALLPAPER
                  </span>
                  <span className="rounded-full bg-navy divine-border px-3 py-0.5 text-[11px] tracking-wider text-gold">
                    {wallpaper.category}
                  </span>
                </div>

                <h3 id="modal-title" className="font-display text-2xl font-bold text-ivory mb-2 leading-tight">
                  {wallpaper.title}
                </h3>

                <p className="text-ivory/60 text-xs mb-6">
                  {wallpaper.keywords?.slice(0, 5).join(' • ')}
                </p>

                <dl className="space-y-3 text-sm mb-6">
                  <div className="flex justify-between divine-border border-b pb-2">
                    <dt className="text-ivory/50">Resolution</dt>
                    <dd className="text-ivory font-medium">{wallpaper.resolution}</dd>
                  </div>
                  <div className="flex justify-between divine-border border-b pb-2">
                    <dt className="text-ivory/50">Format</dt>
                    <dd className="text-ivory font-medium">{wallpaper.format}</dd>
                  </div>
                  <div className="flex justify-between divine-border border-b pb-2">
                    <dt className="text-ivory/50">Quality</dt>
                    <dd className="text-ivory font-medium">{wallpaper.quality} Ultra HD</dd>
                  </div>
                </dl>
              </div>

              <div className="space-y-3 pt-4 border-t border-gold/10">
                <button
                  onClick={() => onDownload(wallpaper)}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold to-bronze text-navy-dark font-semibold py-3.5 hover:shadow-gold transition-all"
                >
                  <Download size={18} />
                  DOWNLOAD {wallpaper.quality} WALLPAPER
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
