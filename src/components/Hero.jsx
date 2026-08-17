import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Search, X } from 'lucide-react'

const quickTags = ['Shiva', 'Krishna', 'Hanuman', 'Mahadev', '4K', 'Temples', 'Festival']

export default function Hero({ query, setQuery, activeCategory, setActiveCategory }) {
  const scrollTo = (href) => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })

  const handleTagClick = (tag) => {
    setActiveCategory(tag)
    scrollTo('#gallery')
  }

  const handleExploreClick = () => {
    scrollTo('#gallery')
  }

  const handle4KClick = () => {
    setActiveCategory('4K')
    scrollTo('#gallery')
  }

  return (
    <section id="home" className="relative min-h-[100svh] flex items-center pt-24 pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center w-full">
        {/* Text column */}
        <div className="text-center lg:text-left">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 text-gold text-xs sm:text-sm tracking-[0.3em] font-deva mb-6"
          >
            ॐ &nbsp;•&nbsp; SANATAN DHARMA &nbsp;•&nbsp; ॐ
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display font-bold leading-[0.95] text-gradient-gold text-4xl sm:text-6xl md:text-7xl xl:text-8xl"
          >
            SANATAN
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-display font-semibold leading-[0.95] text-ivory text-3xl sm:text-5xl md:text-6xl xl:text-7xl mt-1 sm:mt-2"
          >
            STROKES
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-6 text-gold/90 tracking-wide text-sm sm:text-base"
          >
            Divine Wallpapers • Spirituality • Culture • Devotion
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-4 text-ivory/70 max-w-xl mx-auto lg:mx-0 leading-relaxed"
          >
            Explore beautiful high-quality wallpapers inspired by Hindu Sanatan Dharma, Indian culture,
            temples, deities and spirituality.
          </motion.p>

          {/* Interactive Hero Search Input */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 max-w-lg mx-auto lg:mx-0"
          >
            <div className="relative flex items-center glass-panel divine-border rounded-full p-2 focus-within:ring-2 focus-within:ring-gold/50 transition-all shadow-gold/10 shadow-lg">
              <Search size={20} className="text-gold ml-3 flex-shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  if (e.target.value.trim()) {
                    scrollTo('#gallery')
                  }
                }}
                placeholder="Search Shiva, Krishna, Ganesha, 4K..."
                className="flex-1 bg-transparent px-3 py-1.5 outline-none text-ivory placeholder:text-ivory/40 text-base"
              />
              {query ? (
                <button
                  onClick={() => setQuery('')}
                  aria-label="Clear search"
                  className="p-2 text-ivory/50 hover:text-gold transition-colors mr-1"
                >
                  <X size={16} />
                </button>
              ) : null}
              <button
                onClick={handleExploreClick}
                className="rounded-full bg-gradient-to-r from-gold to-bronze text-navy-dark font-semibold text-xs sm:text-sm px-4 py-2 hover:shadow-gold transition-shadow flex-shrink-0"
              >
                Search
              </button>
            </div>

            {/* Quick search tags */}
            <div className="mt-3 flex flex-wrap items-center justify-center lg:justify-start gap-2 text-xs text-ivory/60">
              <span className="text-gold/80 font-medium">Popular:</span>
              {quickTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  className={`rounded-full px-2.5 py-0.5 divine-border transition-colors hover:text-gold hover:border-gold/50 ${
                    activeCategory === tag ? 'bg-gold/20 text-gold border-gold' : 'bg-navy/40 text-ivory/70'
                  }`}
                >
                  #{tag}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
          >
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.03 }}
              onClick={handleExploreClick}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold to-bronze text-navy-dark font-semibold px-7 py-3.5 hover:shadow-gold transition-shadow"
            >
              Explore Wallpapers
              <ArrowRight size={16} />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.03 }}
              onClick={handle4KClick}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full divine-border text-ivory px-7 py-3.5 hover:bg-gold/10 transition-colors"
            >
              <Sparkles size={16} className="text-gold" />
              View 4K Collection
            </motion.button>
          </motion.div>
        </div>

        {/* Visual column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="relative flex justify-center mt-4 lg:mt-0"
        >
          <div className="relative w-[70vw] max-w-[256px] sm:w-80 md:w-96 aspect-[9/16] animate-floaty">
            <div className="absolute -inset-4 rounded-[2rem] bg-gold/10 blur-2xl" />
            <img
              src="/images/shiva.jpg"
              alt="Featured divine Sanatan artwork"
              className="relative h-full w-full object-cover rounded-[2rem] divine-border shadow-gold-lg"
            />
            <span className="absolute top-4 right-4 rounded-full bg-navy/70 divine-border px-3 py-1 text-[11px] tracking-widest text-gold font-semibold">
              4K ULTRA HD
            </span>
          </div>
          <motion.span
            className="absolute -top-6 -left-2 text-gold/70 text-4xl font-display select-none"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          >
            ॐ
          </motion.span>
        </motion.div>
      </div>
    </section>
  )
}
