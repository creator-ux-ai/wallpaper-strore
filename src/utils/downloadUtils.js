export async function downloadWallpaper(wallpaper) {
  try {
    const response = await fetch(wallpaper.download)
    const blob = await response.blob()
    const blobUrl = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = blobUrl
    link.download = wallpaper.fileName || `${wallpaper.title.toLowerCase().replace(/\s+/g, '-')}.${(wallpaper.format || 'jpg').toLowerCase()}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(blobUrl)
  } catch {
    // Fallback direct link download
    const link = document.createElement('a')
    link.href = wallpaper.download
    link.download = wallpaper.fileName || `${wallpaper.title.toLowerCase().replace(/\s+/g, '-')}.${(wallpaper.format || 'jpg').toLowerCase()}`
    link.target = '_blank' // In case the direct link opens instead of downloading
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}
