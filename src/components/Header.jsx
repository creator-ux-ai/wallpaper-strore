import React, { useEffect, useState } from 'react'
import { Menu, Search, Compass } from 'lucide-react'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Wallpapers', href: '#gallery' },
  { label: 'Categories', href: '#categories' },
  { label: '4K', href: '#4k' },
  { label: 'About', href: '#about' }
]

export default function Header({ onMenuOpen, onSearchOpen, onCategorySelect }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (href) => {
    if (href === '#4k' && onCategorySelect) {
      onCategorySelect('4K')
    }
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-panel divine-border border-b shadow-gold/10 shadow-lg py-1' : 'bg-gradient-to-b from-navy-dark/90 to-transparent py-2'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between">
        {/* Mobile: hamburger */}
        <button
          onClick={onMenuOpen}
          aria-label="Open menu"
          className="md:hidden flex items-center justify-center h-11 w-11 rounded-full divine-border text-gold hover:bg-gold/10 transition-colors"
        >
          <Menu size={20} />
        </button>

        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault()
            scrollTo('#home')
          }}
          className="flex items-center gap-2 md:gap-3 mx-auto md:mx-0 group"
        >
          <img src="/logo/logo.svg" alt="Sanatan Strokes logo" className="h-9 w-9 md:h-10 md:w-10 group-hover:scale-105 transition-transform" />
          <span className="font-display text-lg md:text-xl tracking-widest text-gradient-gold font-semibold">
            SANATAN STROKES
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8 font-body text-sm tracking-wide text-ivory/80">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="relative hover:text-gold transition-colors py-1 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-gold after:transition-all hover:after:w-full"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2 md:gap-4">
          <button
            onClick={onSearchOpen}
            aria-label="Search wallpapers"
            className="flex items-center justify-center h-11 w-11 rounded-full divine-border text-gold hover:bg-gold/10 transition-colors"
          >
            <Search size={18} />
          </button>
          <button
            onClick={() => scrollTo('#gallery')}
            className="hidden md:inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold to-bronze text-navy-dark font-semibold text-sm px-5 py-2.5 hover:shadow-gold transition-shadow"
          >
            <Compass size={16} />
            Explore
          </button>
        </div>
      </div>
    </header>
  )
}
