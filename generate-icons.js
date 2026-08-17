import sharp from 'sharp'
import { promises as fs } from 'fs'

async function generateIcons() {
  const svgPath = 'public/logo/logo.svg'
  
  // Create icons directory if it doesn't exist
  await fs.mkdir('public/icons', { recursive: true })

  try {
    // Generate 192x192
    await sharp(svgPath)
      .resize(192, 192, {
        fit: 'contain',
        background: { r: 10, g: 14, b: 26, alpha: 1 } // Navy dark
      })
      .toFile('public/icons/icon-192x192.png')
    console.log('Created icon-192x192.png')

    // Generate 512x512
    await sharp(svgPath)
      .resize(512, 512, {
        fit: 'contain',
        background: { r: 10, g: 14, b: 26, alpha: 1 } // Navy dark
      })
      .toFile('public/icons/icon-512x512.png')
    console.log('Created icon-512x512.png')

  } catch (error) {
    console.error('Error generating icons:', error)
  }
}

generateIcons()
