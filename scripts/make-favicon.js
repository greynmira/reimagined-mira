import sharp from 'sharp'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
const __dirname = dirname(fileURLToPath(import.meta.url))
const src = resolve(__dirname, 'favicon-src.png')
const pub = resolve(__dirname, '../public')
await sharp(src).resize(32, 32, { fit: 'contain', background: { r:0,g:0,b:0,alpha:0 } }).png().toFile(`${pub}/favicon-32.png`)
await sharp(src).resize(180, 180, { fit: 'contain', background: { r:0,g:0,b:0,alpha:0 } }).png().toFile(`${pub}/apple-touch-icon.png`)
await sharp(src).resize(192, 192, { fit: 'contain', background: { r:0,g:0,b:0,alpha:0 } }).png().toFile(`${pub}/favicon-192.png`)
console.log('favicons written')
