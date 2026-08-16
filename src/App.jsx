import React, { useEffect, useState, useMemo } from 'react'
import { Routes, Route } from 'react-router-dom'

import { useFavorites } from './hooks/useFavorites'
import { useWallpapers } from './hooks/useWallpapers'
import { downloadWallpaper } from './utils/downloadUtils'

import Home from './pages/Home'

import BackgroundEffects from './components/BackgroundEffects'
import LoadingScreen from './components/LoadingScreen'
import Header from './components/Header'
import MobileMenu from './components/MobileMenu'
import SearchBar from './components/SearchBar'
import Footer from './components/Footer'
import BackToTop from './components/BackToTop'
import WallpaperModal from './components/WallpaperModal'

import Login from './pages/admin/Login'
import Dashboard from './pages/admin/Dashboard'
import UploadForm from './pages/admin/UploadForm'
import ProtectedRoute from './components/admin/ProtectedRoute'

function PublicApp() {
  const [loading, setLoading] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [activeWallpaper, setActiveWallpaper] = useState(null)

  // Custom Hooks for State Management
  const { favorites, toggleFavorite } = useFavorites()
  const {
    wallpapers,
    filtered,
    latest,
    query,
    setQuery,
    activeCategory,
    setActiveCategory,
    getCategoryCount,
    resetFilters,
    isSearchOrFilterActive
  } = useWallpapers(favorites)

  // Loading Screen Timer
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 900)
    return () => clearTimeout(timer)
  }, [])

  // Lightbox Next / Prev Navigation
  const activeList = useMemo(() => (filtered.length > 0 ? filtered : wallpapers), [filtered, wallpapers])
  const activeIndex = useMemo(() => {
    if (!activeWallpaper) return -1
    return activeList.findIndex((w) => w.id === activeWallpaper.id)
  }, [activeWallpaper, activeList])

  const handleNext = () => {
    if (activeIndex >= 0 && activeIndex < activeList.length - 1) {
      setActiveWallpaper(activeList[activeIndex + 1])
    } else if (activeList.length > 0) {
      setActiveWallpaper(activeList[0])
    }
  }

  const handlePrev = () => {
    if (activeIndex > 0) {
      setActiveWallpaper(activeList[activeIndex - 1])
    } else if (activeList.length > 0) {
      setActiveWallpaper(activeList[activeList.length - 1])
    }
  }

  return (
    <>
      {/* Global Overlays & Layout Effects */}
      <LoadingScreen visible={loading} />
      <BackgroundEffects />

      <Header
        onMenuOpen={() => setMenuOpen(true)}
        onSearchOpen={() => setSearchOpen(true)}
        onCategorySelect={setActiveCategory}
      />
      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onCategorySelect={setActiveCategory}
      />
      <SearchBar
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        query={query}
        setQuery={setQuery}
        onSelectCategory={setActiveCategory}
      />
      <WallpaperModal
        wallpaper={activeWallpaper}
        onClose={() => setActiveWallpaper(null)}
        onDownload={downloadWallpaper}
        onNext={handleNext}
        onPrev={handlePrev}
        hasNext={activeList.length > 1}
        hasPrev={activeList.length > 1}
        isFavorite={activeWallpaper ? favorites.includes(activeWallpaper.id) : false}
        onToggleFavorite={toggleFavorite}
      />

      {/* Main Pages */}
      <Home
        wallpapers={wallpapers}
        filtered={filtered}
        latest={latest}
        query={query}
        setQuery={setQuery}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        getCategoryCount={getCategoryCount}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
        onView={setActiveWallpaper}
        onDownload={downloadWallpaper}
        resetFilters={resetFilters}
        isSearchOrFilterActive={isSearchOrFilterActive}
      />

      <Footer onCategorySelect={setActiveCategory} />
      <BackToTop />
    </>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicApp />} />
      <Route path="/admin/login" element={<Login />} />
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/upload" element={<UploadForm />} />
              <Route path="/edit/:id" element={<UploadForm />} />
            </Routes>
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}
