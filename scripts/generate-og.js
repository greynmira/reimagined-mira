import sharp from 'sharp'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const src = resolve(__dirname, '../public/og-image.png')
const dest = resolve(__dirname, '../public/og-image.png')

const W = 1200
const H = 630
const LOGO = 380   // logo size inside the canvas
const BG = '#1B4332'  // --color-green

// Resize the logo to fit
const logoBuffer = await sharp(src)
  .resize(LOGO, LOGO, { fit: 'contain', background: { r: 27, g: 67, b: 50, alpha: 0 } })
  .png()
  .toBuffer()

await sharp({
  create: { width: W, height: H, channels: 4, background: BG }
})
  .composite([{
    input: logoBuffer,
    gravity: 'centre',
  }])
  .png()
  .toFile(dest)

console.log(`OG image written → ${dest} (${W}×${H})`)
