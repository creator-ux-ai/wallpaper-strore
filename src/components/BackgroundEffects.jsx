import React, { useMemo } from 'react'

// A quiet, layered cosmic backdrop: soft stars, drifting gold dust,
// two slow light rays and a nebula wash. Pure CSS animation so it
// stays cheap on low-power mobile devices.
export default function BackgroundEffects() {
  const stars = useMemo(
    () =>
      Array.from({ length: 40 }).map((_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 4
      })),
    []
  )

  const dust = useMemo(
    () =>
      Array.from({ length: 14 }).map((_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 3 + 2,
        delay: Math.random() * 6
      })),
    []
  )

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-navy" />
      <div className="absolute inset-0 bg-radial-fade" />

      {/* nebula wash */}
      <div className="absolute -top-1/3 left-1/2 -translate-x-1/2 h-[60vh] w-[60vh] rounded-full bg-gold-900/20 blur-[120px]" />
      <div className="absolute bottom-0 right-0 h-[50vh] w-[50vh] rounded-full bg-ember/10 blur-[120px]" />

      {/* light rays */}
      <div className="absolute top-0 left-1/4 h-[140%] w-[2px] bg-gradient-to-b from-transparent via-gold/10 to-transparent animate-raySlide" />
      <div
        className="absolute top-0 right-1/4 h-[140%] w-[2px] bg-gradient-to-b from-transparent via-gold/10 to-transparent animate-raySlide"
        style={{ animationDelay: '2s' }}
      />

      {/* stars */}
      {stars.map((s) => (
        <span
          key={`star-${s.id}`}
          className="absolute rounded-full bg-ivory animate-twinkle"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`
          }}
        />
      ))}

      {/* golden dust */}
      {dust.map((d) => (
        <span
          key={`dust-${d.id}`}
          className="absolute rounded-full bg-gold/40 blur-[1px] animate-drift"
          style={{
            top: `${d.top}%`,
            left: `${d.left}%`,
            width: d.size,
            height: d.size,
            animationDelay: `${d.delay}s`
          }}
        />
      ))}
    </div>
  )
}
