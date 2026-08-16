import React, { useRef } from 'react'
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react'
import { categories } from '../data/wallpapers'

export default function CategoryFilter({ active, onChange, getCategoryCount, favoritesCount = 0 }) {
  const scrollRef = useRef(null)

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -260 : 260
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  return (
    <section id="categories" className="relative py-8 border-y border-gold/10 bg-navy-light/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Scroll Buttons */}
        <div className="hidden md:flex items-center justify-between absolute inset-x-0 top-1/2 -translate-y-1/2 px-2 pointer-events-none z-10">
          <button
            onClick={() => handleScroll('left')}
            aria-label="Scroll left"
            className="pointer-events-auto h-9 w-9 flex items-center justify-center rounded-full divine-border bg-navy-dark/80 text-gold hover:bg-gold/20 shadow-md backdrop-blur transition-all"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => handleScroll('right')}
            aria-label="Scroll right"
            className="pointer-events-auto h-9 w-9 flex items-center justify-center rounded-full divine-border bg-navy-dark/80 text-gold hover:bg-gold/20 shadow-md backdrop-blur transition-all"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-2.5 overflow-x-auto no-scrollbar pb-1 pt-1 px-1 sm:px-6 scroll-smooth scrollbar-none"
        >
          {categories.map((cat) => {
            const isActive = active === cat
            const count = cat === 'Favorites' ? favoritesCount : getCategoryCount ? getCategoryCount(cat) : null
            const isFavCat = cat === 'Favorites'

            return (
              <button
                key={cat}
                onClick={() => onChange(cat)}
                className={`flex-shrink-0 flex items-center gap-2 rounded-full px-5 py-2.5 text-xs sm:text-sm font-medium tracking-wide transition-all duration-300 border ${
                  isActive
                    ? 'bg-gradient-to-r from-gold to-bronze text-navy-dark border-transparent shadow-gold font-semibold scale-105'
                    : 'divine-border text-ivory/80 hover:text-gold hover:bg-gold/10 hover:border-gold/40'
                }`}
              >
                {isFavCat && <Heart size={14} className={isActive ? 'fill-navy-dark' : 'text-ember fill-ember/30'} />}
                <span>{cat}</span>
                {count !== null && (
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                      isActive
                        ? 'bg-navy-dark/30 text-navy-dark'
                        : 'bg-navy-dark divine-border text-gold/90'
                    }`}
                  >
                    {count}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
