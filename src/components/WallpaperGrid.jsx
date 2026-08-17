import React from 'react'
import { motion } from 'framer-motion'
import { SearchX, RotateCcw } from 'lucide-react'
import WallpaperCard from './WallpaperCard'

export default function WallpaperGrid({
  wallpapers,
  onView,
  onDownload,
  favorites = [],
  onToggleFavorite,
  title = 'Explore Wallpapers',
  id = 'gallery',
  activeCategory = 'All',
  query = '',
  onResetFilters
}) {
  const isFiltered = activeCategory !== 'All' || Boolean(query)

  return (
    <section id={id} className="relative py-14 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center mb-10"
        >
          <p className="text-gold text-xs tracking-[0.3em] font-medium mb-2 uppercase">GALLERY</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-ivory">{title}</h2>

          {/* Active Filter Badge Bar */}
          {isFiltered && (
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              <span className="rounded-full bg-gold/10 divine-border text-gold px-4 py-1 text-xs font-medium">
                Showing {wallpapers.length} {wallpapers.length === 1 ? 'wallpaper' : 'wallpapers'}
                {activeCategory !== 'All' ? ` in "${activeCategory}"` : ''}
                {query ? ` for search "${query}"` : ''}
              </span>
              {onResetFilters && (
                <button
                  onClick={onResetFilters}
                  className="inline-flex items-center gap-1.5 rounded-full bg-navy divine-border text-ivory/80 hover:text-gold px-3.5 py-1 text-xs transition-colors"
                >
                  <RotateCcw size={12} /> Clear Filters
                </button>
              )}
            </div>
          )}
        </motion.div>

        {/* Grid or Empty State */}
        {wallpapers.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-16 px-4 text-center divine-border rounded-2xl bg-navy-light/40 max-w-lg mx-auto"
          >
            <div className="h-16 w-16 rounded-full bg-gold/10 flex items-center justify-center mb-4 animate-floaty">
              <SearchX size={32} className="text-gold" />
            </div>
            <h3 className="text-ivory font-display text-xl font-semibold">No wallpapers found</h3>
            <p className="text-ivory/60 text-sm mt-1 mb-6 max-w-xs">
              We couldn't find any wallpapers matching your search or category filter.
            </p>
            {onResetFilters && (
              <button
                onClick={onResetFilters}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold to-bronze text-navy-dark font-semibold px-6 py-2.5 text-sm hover:shadow-gold transition-shadow"
              >
                <RotateCcw size={14} /> Reset Search &amp; Filters
              </button>
            )}
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 min-[400px]:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5 lg:gap-6">
            {wallpapers.map((w, i) => (
              <WallpaperCard
                key={w.id}
                wallpaper={w}
                onView={onView}
                onDownload={onDownload}
                isFavorite={favorites.includes(w.id)}
                onToggleFavorite={onToggleFavorite}
                index={i}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
