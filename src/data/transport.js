// Shinkansen lines and their prefecture IDs
export const SHINKANSEN_LINES = {
  '東海道': [13,14,22,23,25,26,27,28,33,34,35,40],
  '東北':   [13,11,9,4,3,2],
  '上越':   [13,11,10,15],
  '北陸':   [13,11,10,20,16,17],
  '北海道': [2,1],
  '九州':   [40,43,46],
  '西九州': [41,42],
}

// Prefectures with airports (by prefecture id)
export const AIRPORT_PREFS = [1,2,4,5,6,7,8,12,13,14,15,16,17,18,22,23,26,27,28,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47]

// Check if two prefs are connected by shinkansen (returns line name or null)
export function getShinkansenLine(fromId, toId) {
  for (const [line, prefs] of Object.entries(SHINKANSEN_LINES)) {
    if (prefs.includes(fromId) && prefs.includes(toId)) return line
  }
  return null
}

// Check if flight available
export function hasFlightRoute(fromId, toId) {
  return AIRPORT_PREFS.includes(fromId) && AIRPORT_PREFS.includes(toId) && fromId !== toId
}

// Get available transport options between two prefectures
export function getTransportOptions(fromId, toId) {
  if (fromId === toId) return []
  const options = []
  const line = getShinkansenLine(fromId, toId)
  if (line) {
    // Approximate time and price based on line hops
    const linePrefs = SHINKANSEN_LINES[line]
    const hops = Math.abs(linePrefs.indexOf(fromId) - linePrefs.indexOf(toId))
    const minutes = 30 + hops * 25
    const price = 3000 + hops * 4000
    options.push({ type: 'shinkansen', line, minutes, price })
  }
  if (hasFlightRoute(fromId, toId)) {
    options.push({ type: 'flight', minutes: 90, price: 18000 })
  }
  if (options.length === 0) {
    // Bus/express
    options.push({ type: 'bus', minutes: 180, price: 5000 })
  }
  return options
}

export function formatDuration(minutes) {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return h > 0 ? `${h}時間${m > 0 ? m + '分' : ''}` : `${m}分`
}
