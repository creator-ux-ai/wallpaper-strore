import React from 'react'
import { Instagram, Send, Youtube } from 'lucide-react'
import { socialLinks, siteConfig } from '../data/socialLinks'
import { categories } from '../data/wallpapers'

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Wallpapers', href: '#gallery' },
  { label: '4K Wallpapers', href: '#4k', category: '4K' },
  { label: 'Categories', href: '#categories' },
  { label: 'About Us', href: '#about' }
]

const footerCategories = categories.filter((c) => !['All', 'Favorites'].includes(c)).slice(0, 8)

const socials = [
  { label: 'Instagram', href: socialLinks.instagram1, icon: Instagram },
  { label: 'Instagram', href: socialLinks.instagram2, icon: Instagram },
  { label: 'Telegram', href: socialLinks.telegram, icon: Send },
  { label: 'YouTube', href: socialLinks.youtube, icon: Youtube }
]

export default function Footer({ onCategorySelect }) {
  const scrollTo = (href, category) => {
    if (category && onCategorySelect) {
      onCategorySelect(category)
    }
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleCategoryClick = (category) => {
    if (onCategorySelect) {
      onCategorySelect(category)
    }
    document.querySelector('#gallery')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="relative pt-16 pb-8 divine-border border-t bg-navy-dark/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="/logo/logo.svg" alt="" className="h-8 w-8" />
              <span className="font-display text-gold tracking-widest text-sm font-semibold">SANATAN STROKES</span>
            </div>
            <p className="text-ivory/60 text-sm leading-relaxed">
              Divine 4K wallpapers, Sanatan culture, deities, temples, and spiritual inspiration.
            </p>
          </div>

          <div>
            <h4 className="text-ivory font-display font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <button
                    onClick={() => scrollTo(l.href, l.category)}
                    className="text-ivory/60 text-sm hover:text-gold transition-colors"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-ivory font-display font-semibold mb-4">Categories</h4>
            <ul className="space-y-2.5">
              {footerCategories.map((c) => (
                <li key={c}>
                  <button
                    onClick={() => handleCategoryClick(c)}
                    className="text-ivory/60 text-sm hover:text-gold transition-colors text-left"
                  >
                    {c} Wallpapers
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-ivory font-display font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-3">
              {socials.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="h-11 w-11 flex items-center justify-center rounded-full divine-border text-gold hover:bg-gold/10 hover:-translate-y-0.5 hover:shadow-gold transition-all"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-ivory/40">
          <p>© {siteConfig.year} Sanatan Strokes. All Rights Reserved.</p>
          <p>Made with ❤️ for Sanatan Dharma</p>
        </div>
      </div>
    </footer>
  )
}
