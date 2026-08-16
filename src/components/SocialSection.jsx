import React from 'react'
import { motion } from 'framer-motion'
import { Instagram, Send, Youtube, ArrowUpRight } from 'lucide-react'
import { socialLinks } from '../data/socialLinks'

const cards = [
  {
    key: 'instagram',
    icon: Instagram,
    name: 'Instagram account I',
    text: 'Follow us for daily AI songs',
    href: socialLinks.instagram2
  },
  {
    key: 'instagram',
    icon: Instagram,
    name: 'Instagram account II',
    text: 'Follow us for daily wallpapers',
    href: socialLinks.instagram1
  },
  {
    key: 'telegram',
    icon: Send,
    name: 'Telegram',
    text: 'Join our wallpaper community',
    href: socialLinks.telegram
  },
  {
    key: 'youtube',
    icon: Youtube,
    name: 'YouTube',
    text: 'Watch our latest videos',
    href: socialLinks.youtube
  }
]

export default function SocialSection() {
  return (
    <section className="relative py-20 sm:py-28 flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-gold text-xs tracking-[0.3em] mb-3">STAY CONNECTED</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-ivory mb-3">Follow Us</h2>
          <p className="text-ivory/60 max-w-xl mx-auto">
            Stay connected with us for new wallpapers, devotional content and Sanatan updates.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-5">
          {cards.map(({ key, icon: Icon, name, text, href }, i) => (
            <motion.a
              key={key}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="group rounded-2xl divine-border bg-navy-light/60 p-6 flex items-center gap-4 card-glow"
            >
              <div className="h-12 w-12 flex-shrink-0 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                <Icon size={22} className="text-gold" />
              </div>
              <div className="flex-1">
                <h3 className="font-display text-lg font-semibold text-ivory">{name}</h3>
                <p className="text-ivory/60 text-sm">{text}</p>
              </div>
              <ArrowUpRight size={18} className="text-gold/60 group-hover:text-gold group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
