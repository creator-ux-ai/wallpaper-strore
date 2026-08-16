import React from 'react'

import Hero from '../components/Hero'
import CategoryFilter from '../components/CategoryFilter'
import FeaturedWallpapers from '../components/FeaturedWallpapers'
import WallpaperGrid from '../components/WallpaperGrid'
import FourKSection from '../components/FourKSection'
import AboutSection from '../components/AboutSection'
import SocialSection from '../components/SocialSection'

export default function Home({
  wallpapers,
  filtered,
  latest,
  query,
  setQuery,
  activeCategory,
  setActiveCategory,
  getCategoryCount,
  favorites,
  toggleFavorite,
  onView,
  onDownload,
  resetFilters,
  isSearchOrFilterActive
}) {
  return (
    <main>
      <Hero
        query={query}
        setQuery={setQuery}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      <CategoryFilter
        active={activeCategory}
        onChange={setActiveCategory}
        getCategoryCount={getCategoryCount}
        favoritesCount={favorites.length}
      />

      {!isSearchOrFilterActive && (
        <FeaturedWallpapers
          wallpapers={wallpapers}
          onView={onView}
          onDownload={onDownload}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
        />
      )}

      <WallpaperGrid
        id="gallery"
        title={
          query || activeCategory !== 'All'
            ? activeCategory === 'Favorites'
              ? 'Your Saved Wallpapers'
              : 'Search & Filter Results'
            : 'Explore Wallpapers'
        }
        wallpapers={filtered}
        onView={onView}
        onDownload={onDownload}
        favorites={favorites}
        onToggleFavorite={toggleFavorite}
        activeCategory={activeCategory}
        query={query}
        onResetFilters={resetFilters}
      />

      {!isSearchOrFilterActive && (
        <>
          <WallpaperGrid
            id="latest"
            title="Latest Additions"
            wallpapers={latest}
            onView={onView}
            onDownload={onDownload}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
          />
          <FourKSection
            wallpapers={wallpapers}
            onView={onView}
            onDownload={onDownload}
          />
        </>
      )}

      <AboutSection />
      <SocialSection />
    </main>
  )
}
