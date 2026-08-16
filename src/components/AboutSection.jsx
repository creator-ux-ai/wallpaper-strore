import React from 'react'
import { motion } from 'framer-motion'
import { Flower2, HandHeart, BookOpen, Landmark } from 'lucide-react'

const pillars = [
  {
    icon: Flower2,
    title: 'Dharma',
    text: 'The eternal order that guides right living, duty and truth across every walk of life.'
  },
  {
    icon: HandHeart,
    title: 'Devotion',
    text: 'Bhakti expressed through prayer, ritual and quiet surrender to the divine.'
  },
  {
    icon: BookOpen,
    title: 'Knowledge',
    text: 'Wisdom passed down through the Vedas, Puranas and generations of gurus.'
  },
  {
    icon: Landmark,
    title: 'Culture',
    text: 'Temples, festivals and art that carry the living heritage of Bharat forward.'
  }
]

export default function AboutSection() {
  return (
    <section id="about" className="relative py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <p className="text-gold text-xs tracking-[0.3em] mb-3">ॐ SANATAN DHARMA</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-ivory mb-5">Hindu Sanatan</h2>
          <p className="text-ivory/70 leading-relaxed">
            Hindu Sanatan Dharma is one of the world's ancient spiritual traditions. It teaches values of
            dharma, devotion, compassion, knowledge and harmony — a way of life carried through temples,
            scriptures and festivals for thousands of years.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-14">
          {pillars.map(({ icon: Icon, title, text }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl divine-border bg-navy-light/60 p-6 text-center card-glow"
            >
              <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-gold/10 flex items-center justify-center">
                <Icon size={22} className="text-gold" />
              </div>
              <h3 className="font-display text-lg font-semibold text-ivory mb-2">{title}</h3>
              <p className="text-ivory/60 text-sm leading-relaxed">{text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
