import { useState, useEffect, useMemo, useCallback } from 'react'
import { wallpapers as initialWallpapers } from '../data/wallpapers'
import { getWallpapers } from '../services/wallpaperService'

export function useWallpapers(favorites = []) {
  const [wallpapers, setWallpapers] = useState(initialWallpapers)
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  // Fetch wallpapers from Firebase
  useEffect(() => {
    async function fetchWallpapers() {
      try {
        const data = await getWallpapers()
        if (data && data.length > 0) {
          setWallpapers(data)
        }
      } catch (error) {
        console.error("Error fetching wallpapers from Firebase:", error)
        // Fallback to initialWallpapers is already handled by initial state
      }
    }
    fetchWallpapers()
  }, [])

  // Helper to match category aliases & keywords
  const matchesCategory = useCallback((w, cat) => {
    if (cat === 'All') return true
    if (cat === '4K') return w.quality === '4K'
    if (cat === 'Favorites') return false

    const targetCat = cat.toLowerCase()
    const itemCat = w.category.toLowerCase()

    if (itemCat === targetCat) return true
    if (targetCat === 'mahadev' && (itemCat === 'shiva' || (w.keywords && w.keywords.includes('mahadev')))) return true
    if (targetCat === 'shiva' && (itemCat === 'mahadev' || (w.keywords && w.keywords.includes('shiva')))) return true
    if (targetCat === 'sanatan' && (w.keywords && w.keywords.includes('sanatan'))) return true
    if (targetCat === 'festival' && (w.keywords && (w.keywords.includes('festival') || w.keywords.includes('navratri') || w.keywords.includes('diwali')))) return true

    return w.keywords && w.keywords.some((k) => k.toLowerCase() === targetCat)
  }, [])

  // Filtered dataset
  const filtered = useMemo(() => {
    let list = wallpapers

    if (activeCategory === 'Favorites') {
      list = list.filter((w) => favorites.includes(w.id))
    } else if (activeCategory !== 'All') {
      list = list.filter((w) => matchesCategory(w, activeCategory))
    }

    const q = query.trim().toLowerCase()
    if (q) {
      list = list.filter((w) => {
        return (
          (w.title && w.title.toLowerCase().includes(q)) ||
          (w.category && w.category.toLowerCase().includes(q)) ||
          (w.quality && w.quality.toLowerCase().includes(q)) ||
          (w.resolution && w.resolution.toLowerCase().includes(q)) ||
          (w.format && w.format.toLowerCase().includes(q)) ||
          (w.keywords && w.keywords.some((k) => k.toLowerCase().includes(q)))
        )
      })
    }

    return list
  }, [activeCategory, query, favorites, matchesCategory, wallpapers])

  // Category counts
  const getCategoryCount = useCallback(
    (cat) => {
      if (cat === 'All') return wallpapers.length
      if (cat === 'Favorites') return favorites.length
      return wallpapers.filter((w) => matchesCategory(w, cat)).length
    },
    [favorites, matchesCategory, wallpapers]
  )

  const latest = useMemo(() => wallpapers.filter((w) => w.latest), [wallpapers])

  const resetFilters = useCallback(() => {
    setActiveCategory('All')
    setQuery('')
  }, [])

  return {
    wallpapers,
    filtered,
    latest,
    query,
    setQuery,
    activeCategory,
    setActiveCategory,
    getCategoryCount,
    resetFilters,
    isSearchOrFilterActive: activeCategory !== 'All' || Boolean(query)
  }
}
