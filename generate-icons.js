import sharp from 'sharp'
import { promises as fs } from 'fs'

async function generateIcons() {
  const imagePath = 'C:\\Users\\vinay\\.gemini\\antigravity-ide\\brain\\ef470ddf-4cf6-431e-bf87-ae3c623d912d\\media__1786931870420.jpg'
  
  // Create icons directory if it doesn't exist
  await fs.mkdir('public/icons', { recursive: true })

  try {
    // Generate 192x192
    await sharp(imagePath)
      .resize(192, 192, {
        fit: 'cover',
        position: 'center'
      })
      .toFormat('png')
      .toFile('public/icons/icon-192x192.png')
    console.log('Created icon-192x192.png')

    // Generate 512x512
    await sharp(imagePath)
      .resize(512, 512, {
        fit: 'cover',
        position: 'center'
      })
      .toFormat('png')
      .toFile('public/icons/icon-512x512.png')
    console.log('Created icon-512x512.png')

  } catch (error) {
    console.error('Error generating icons:', error)
  }
}

generateIcons()
