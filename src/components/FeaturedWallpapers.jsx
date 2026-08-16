import React from 'react'
import { motion } from 'framer-motion'
import WallpaperCard from './WallpaperCard'

export default function FeaturedWallpapers({ wallpapers, onView, onDownload, favorites = [], onToggleFavorite }) {
  const featured = wallpapers.filter((w) => w.featured)

  if (featured.length === 0) return null

  return (
    <section className="relative py-14 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="text-gold text-xs tracking-[0.3em] font-medium uppercase mb-2">HAND-PICKED</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-ivory">Featured Wallpapers</h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
          {featured.map((w, i) => (
            <div key={w.id} className={i === 0 ? 'col-span-2 md:col-span-1 lg:col-span-2' : ''}>
              <WallpaperCard
                wallpaper={w}
                onView={onView}
                onDownload={onDownload}
                isFavorite={favorites.includes(w.id)}
                onToggleFavorite={onToggleFavorite}
                index={i}
                large
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
