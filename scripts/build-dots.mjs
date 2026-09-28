// One-off build script: Nigeria dot grid for the Sector Pulse hero.
// Reads src/data/nigeria-states.geojson (geoBoundaries ADM1, simplified),
// projects with geoMercator().fitSize([1000, 800]), fills the country with a
// hex-offset dot grid via geoContains, and writes src/data/nigeria-dots.json.
//
// Usage: node scripts/build-dots.mjs
// Re-run only when the boundary source changes — the hero loads the JSON,
// never runs a polygon test at runtime.

import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { geoMercator, geoContains, geoCentroid, geoPath } from 'd3-geo'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const W = 1000
const H = 800
const SPACING = 15 // hex grid column spacing in px

const CITIES = [
  { name: 'Abuja', lon: 7.3986, lat: 9.0765, role: 'regulator' },
  { name: 'Lagos', lon: 3.3792, lat: 6.5244, role: 'hub' },
  { name: 'Kano', lon: 8.5167, lat: 12.0022, role: 'hub' },
  { name: 'Port Harcourt', lon: 7.0498, lat: 4.8156, role: 'hub' },
  { name: 'Kaduna', lon: 10.5105, lat: 7.4403, role: 'hub' },
  { name: 'Enugu', lon: 7.4951, lat: 6.4483, role: 'hub' },
  { name: 'Ibadan', lon: 3.947, lat: 7.3775, role: 'hub' },
  { name: 'Maiduguri', lon: 13.15, lat: 11.8333, role: 'hub' },
]

const fc = JSON.parse(readFileSync(join(root, 'src/data/nigeria-states.geojson'), 'utf8'))
const projection = geoMercator().fitSize([W, H], fc)
const [[x0, y0], [x1, y1]] = geoPath(projection).bounds(fc)

// state index table (keeps dots small: s = index into states)
const states = fc.features.map((f, i) => {
  const [lon, lat] = geoCentroid(f)
  const [cx, cy] = projection([lon, lat])
  return {
    i,
    id: f.properties.shapeID,
    name: f.properties.shapeName,
    cx: Math.round(cx * 10) / 10,
    cy: Math.round(cy * 10) / 10,
  }
})

// hex-offset grid: alternate rows shifted by half spacing
const dy = SPACING * Math.sqrt(3) / 2
const dots = []
let row = 0
for (let y = y0; y <= y1; y += dy, row++) {
  const off = row % 2 === 0 ? 0 : SPACING / 2
  for (let x = x0 + off; x <= x1; x += SPACING) {
    const lonLat = projection.invert([x, y])
    if (!lonLat) continue
    for (let s = 0; s < fc.features.length; s++) {
      if (geoContains(fc.features[s], lonLat)) {
        dots.push({ x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10, s })
        break
      }
    }
  }
}

const cities = CITIES.map((c) => {
  const [x, y] = projection([c.lon, c.lat])
  return { ...c, x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 }
})

const out = { width: W, height: H, spacing: SPACING, states, dots, cities }
const path = join(root, 'src/data/nigeria-dots.json')
writeFileSync(path, JSON.stringify(out))

const kb = Buffer.byteLength(JSON.stringify(out)) / 1024
console.log(`dots: ${dots.length}, states: ${states.length}, cities: ${cities.length} -> ${kb.toFixed(1)}kb`)
for (const c of cities) console.log(`  ${c.role === 'regulator' ? '*' : ' '} ${c.name} (${c.x}, ${c.y})`)
