import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Home, Image, LayoutGrid, Sparkles, Info, Instagram, Send, Youtube } from 'lucide-react'
import { socialLinks } from '../data/socialLinks'

const items = [
  { label: 'Home', href: '#home', icon: Home },
  { label: 'Wallpapers', href: '#gallery', icon: Image },
  { label: 'Categories', href: '#categories', icon: LayoutGrid },
  { label: '4K Wallpapers', href: '#4k', icon: Sparkles, category: '4K' },
  { label: 'About Us', href: '#about', icon: Info }
]

const socials = [
  { label: 'Instagram', href: socialLinks.instagram1, icon: Instagram },
  { label: 'Instagram', href: socialLinks.instagram2, icon: Instagram },
  { label: 'Telegram', href: socialLinks.telegram, icon: Send },
  { label: 'YouTube', href: socialLinks.youtube, icon: Youtube }
]

export default function MobileMenu({ open, onClose, onCategorySelect }) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      const onKey = (e) => e.key === 'Escape' && onClose()
      window.addEventListener('keydown', onKey)
      return () => {
        document.body.style.overflow = ''
        window.removeEventListener('keydown', onKey)
      }
    }
  }, [open, onClose])

  const scrollTo = (href, category) => {
    onClose()
    if (category && onCategorySelect) {
      onCategorySelect(category)
    }
    setTimeout(() => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' }), 150)
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[90] bg-black/70 backdrop-blur-sm md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            className="fixed top-0 left-0 bottom-0 z-[95] w-[80%] max-w-xs bg-navy-light divine-border border-r md:hidden flex flex-col"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 280, damping: 30 }}
          >
            <div className="flex items-center justify-between px-5 h-16 divine-border border-b">
              <div className="flex items-center gap-2">
                <img src="/logo/logo.svg" alt="" className="h-8 w-8" />
                <span className="font-display text-gold tracking-widest font-semibold">SANATAN</span>
              </div>
              <button
                onClick={onClose}
                aria-label="Close menu"
                className="h-10 w-10 flex items-center justify-center rounded-full divine-border text-gold hover:bg-gold/10"
              >
                <X size={18} />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto py-4">
              {items.map(({ label, href, icon: Icon, category }) => (
                <button
                  key={href}
                  onClick={() => scrollTo(href, category)}
                  className="w-full flex items-center gap-4 px-6 py-4 text-ivory/85 hover:text-gold hover:bg-gold/5 transition-colors text-left"
                >
                  <Icon size={18} className="text-gold" />
                  <span className="tracking-wide text-lg sm:text-base">{label}</span>
                </button>
              ))}
            </nav>

            <div className="px-6 py-5 divine-border border-t space-y-3">
              <p className="text-xs uppercase tracking-[0.2em] text-ivory/50">Connect</p>
              <div className="flex gap-3">
                {socials.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="h-11 w-11 flex items-center justify-center rounded-full divine-border text-gold hover:bg-gold/10 hover:-translate-y-0.5 transition-all"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
