import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Eye, Download, ImageOff, Heart } from 'lucide-react'

export default function WallpaperCard({
  wallpaper,
  onView,
  onDownload,
  isFavorite = false,
  onToggleFavorite,
  index = 0,
  large = false
}) {
  const [errored, setErrored] = useState(false)
  const [loaded, setLoaded] = useState(false)

  const handleCardClick = (e) => {
    // If clicked on download or favorite button, let their handlers trigger
    if (e.target.closest('button[data-action="download"]') || e.target.closest('button[data-action="favorite"]')) {
      return
    }
    onView(wallpaper)
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.4, delay: (index % 6) * 0.05 }}
      whileHover={{ y: -6 }}
      onClick={handleCardClick}
      className={`group relative overflow-hidden rounded-2xl divine-border bg-navy-light card-glow cursor-pointer select-none ${
        large ? 'aspect-[4/5]' : 'aspect-[3/4]'
      }`}
    >
      {/* Loading Skeleton */}
      {!loaded && !errored && (
        <div className="absolute inset-0 bg-navy-light animate-pulse flex items-center justify-center">
          <div className="h-8 w-8 rounded-full border-2 border-gold/30 border-t-gold animate-spin" />
        </div>
      )}

      {errored ? (
        <div className="h-full w-full flex flex-col items-center justify-center gap-2 text-ivory/40 bg-navy-light">
          <ImageOff size={28} />
          <span className="text-xs">Image unavailable</span>
        </div>
      ) : (
        <img
          src={wallpaper.image}
          alt={wallpaper.title}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setErrored(true)}
          className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-navy-dark/20 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />

      {/* Top Badges */}
      <div className="absolute top-3 left-3 right-3 flex justify-between items-center z-10">
        <div className="flex gap-1.5">
          <span className="rounded-full bg-navy/80 backdrop-blur px-2.5 py-0.5 text-[10px] tracking-wider text-gold divine-border font-medium">
            {wallpaper.category}
          </span>
          <span className="rounded-full bg-gold/90 px-2.5 py-0.5 text-[10px] tracking-wider text-navy-dark font-bold">
            {wallpaper.quality}
          </span>
        </div>

        {/* Favorite Toggle Button */}
        {onToggleFavorite && (
          <button
            data-action="favorite"
            onClick={(e) => {
              e.stopPropagation()
              onToggleFavorite(wallpaper.id)
            }}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            className="h-8 w-8 rounded-full bg-navy-dark/70 divine-border flex items-center justify-center text-ivory hover:text-ember hover:border-ember/50 backdrop-blur transition-all"
          >
            <Heart
              size={15}
              className={isFavorite ? 'fill-ember text-ember' : 'text-ivory/70'}
            />
          </button>
        )}
      </div>

      {/* Bottom Content */}
      <div className="absolute inset-x-0 bottom-0 p-4 flex flex-col gap-2.5 z-10">
        <h3 className="font-display text-ivory text-base sm:text-lg font-semibold leading-tight line-clamp-2 group-hover:text-gold transition-colors">
          {wallpaper.title}
        </h3>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation()
              onView(wallpaper)
            }}
            className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full bg-navy/80 divine-border text-ivory text-xs sm:text-sm py-2 hover:bg-gold/20 hover:text-gold transition-all"
          >
            <Eye size={14} /> View
          </button>
          <button
            data-action="download"
            onClick={(e) => {
              e.stopPropagation()
              onDownload(wallpaper)
            }}
            className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-gold to-bronze text-navy-dark text-xs sm:text-sm font-semibold py-2 hover:shadow-gold transition-shadow"
          >
            <Download size={14} /> Download
          </button>
        </div>
      </div>
    </motion.article>
  )
}
