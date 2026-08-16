import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Download, Gem, Eye } from 'lucide-react'

export default function FourKSection({ wallpapers, onDownload, onView }) {
  const featured4k = useMemo(() => wallpapers.find((w) => w.quality === '4K') || wallpapers[0], [wallpapers])

  if (!featured4k) return null

  return (
    <section id="4k" className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold-900/10 to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 text-gold text-xs tracking-[0.3em] font-medium uppercase mb-3">
            <Gem size={14} /> ULTRA HIGH DEFINITION
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-ivory">4K Quality Wallpapers</h2>
          <p className="text-ivory/60 mt-3 max-w-xl mx-auto text-sm sm:text-base">
            Experience divine beauty in stunning 4K resolution with ultra crisp detail.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative max-w-3xl mx-auto rounded-3xl overflow-hidden divine-border shadow-gold-lg group"
        >
          <img
            src={featured4k.image}
            alt={featured4k.title}
            className="w-full aspect-[16/10] sm:aspect-[16/9] object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-navy-dark/30 to-transparent" />
          <span className="absolute top-5 left-5 rounded-full bg-gold px-4 py-1.5 text-xs font-bold tracking-wider text-navy-dark">
            4K ULTRA HD
          </span>
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-ivory">{featured4k.title}</h3>
              <p className="text-gold/90 text-sm mt-1">{featured4k.resolution} • {featured4k.format}</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => onView(featured4k)}
                className="inline-flex items-center gap-1.5 rounded-full divine-border bg-navy-dark/60 text-ivory px-5 py-2.5 text-sm hover:bg-gold/20 hover:text-gold transition-all"
              >
                <Eye size={15} /> Preview
              </button>
              <button
                onClick={() => onDownload(featured4k)}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold to-bronze text-navy-dark font-semibold px-5 py-2.5 text-sm hover:shadow-gold transition-shadow"
              >
                <Download size={15} /> Download 4K
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
