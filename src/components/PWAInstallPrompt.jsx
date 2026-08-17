import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, X, Share, PlusSquare } from 'lucide-react'

export default function PWAInstallPrompt({ pwa }) {
  const { isInstallable, isInstalled, isIOS, promptInstall, needRefresh, updateServiceWorker, closeUpdate } = pwa
  const [showPrompt, setShowPrompt] = useState(false)

  useEffect(() => {
    // Determine if we should show the prompt.
    // If the app is already installed, definitely don't show.
    if (isInstalled) {
      setShowPrompt(false)
      return
    }

    // Only show if the user hasn't explicitly dismissed it recently
    const dismissed = localStorage.getItem('sanatan_pwa_dismissed')
    const now = Date.now()
    
    // If it's an update, always show
    if (needRefresh) {
      setShowPrompt(true)
      return
    }

    // If installable or iOS, check if we should prompt
    if ((isInstallable || isIOS) && (!dismissed || now - parseInt(dismissed) > 7 * 24 * 60 * 60 * 1000)) {
      // Small delay to not overwhelm on load
      const timer = setTimeout(() => {
        setShowPrompt(true)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [isInstallable, isInstalled, isIOS, needRefresh])

  const handleDismiss = () => {
    if (needRefresh) {
      closeUpdate()
    } else {
      localStorage.setItem('sanatan_pwa_dismissed', Date.now().toString())
    }
    setShowPrompt(false)
  }

  const handleInstall = async () => {
    if (needRefresh) {
      updateServiceWorker()
      return
    }
    
    if (isInstallable) {
      const accepted = await promptInstall()
      if (accepted) {
        setShowPrompt(false)
      }
    }
  }

  if (!showPrompt) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50, transition: { duration: 0.2 } }}
        className="fixed bottom-0 inset-x-0 z-[120] p-4 sm:p-6 pointer-events-none flex justify-center"
      >
        <div className="w-full max-w-md glass-panel divine-border rounded-2xl p-5 shadow-gold-lg pointer-events-auto bg-navy-dark/95 backdrop-blur-xl">
          <button 
            onClick={handleDismiss}
            aria-label="Dismiss prompt"
            className="absolute top-3 right-3 text-ivory/50 hover:text-gold transition-colors p-1"
          >
            <X size={18} />
          </button>

          <div className="flex gap-4 items-start">
            <img src="/logo/logo.svg" alt="App Logo" className="w-12 h-12 flex-shrink-0" />
            
            <div className="flex-1">
              <h3 className="font-display text-lg font-bold text-ivory leading-tight mb-1">
                {needRefresh ? 'Update Available' : 'Install Sanatan Strokes'}
              </h3>
              
              {needRefresh ? (
                <p className="text-sm text-ivory/70 mb-4">
                  A new version is available. Refresh to get the latest features.
                </p>
              ) : isIOS ? (
                <div className="text-sm text-ivory/70 mb-4">
                  <p>Install the app for a faster, app-like wallpaper experience.</p>
                  <p className="mt-2 text-gold/90 font-medium flex items-center flex-wrap gap-1">
                    Tap <Share size={14} className="inline mx-0.5" /> then 
                    <span className="inline-flex items-center gap-1 mx-1 px-1.5 py-0.5 bg-ivory/10 rounded">
                      Add to Home Screen <PlusSquare size={12} />
                    </span>
                  </p>
                </div>
              ) : (
                <p className="text-sm text-ivory/70 mb-4">
                  Install the app for a faster, app-like wallpaper experience.
                </p>
              )}

              {!isIOS || needRefresh ? (
                <div className="flex gap-2 w-full">
                  <button
                    onClick={handleInstall}
                    className="flex-1 rounded-full bg-gradient-to-r from-gold to-bronze text-navy-dark font-semibold py-2 text-sm hover:shadow-gold transition-all"
                  >
                    {needRefresh ? 'Refresh Now' : 'Install'}
                  </button>
                  <button
                    onClick={handleDismiss}
                    className="flex-1 rounded-full divine-border text-ivory/90 hover:text-gold py-2 text-sm hover:bg-gold/10 transition-all"
                  >
                    Not now
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
