import { readFileSync, writeFileSync, rmSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const { render } = await import('./.ssr-build/entry-server.js')
const appHtml = render()

const template = readFileSync(resolve(__dirname, 'dist/index.html'), 'utf-8')
const html = template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
writeFileSync(resolve(__dirname, 'dist/index.html'), html)

// Clean up SSR build dir — not needed for deployment
rmSync(resolve(__dirname, '.ssr-build'), { recursive: true, force: true })

console.log('Pre-render complete — content injected into dist/index.html')
