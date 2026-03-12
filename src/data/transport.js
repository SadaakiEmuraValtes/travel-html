function makeRand(seed) {
  let s = seed >>> 0
  return () => { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 0xffffffff }
}

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

export function generateTimeSlots(transportType, fromId, toId, date) {
  // Use date + fromId + toId as seed for deterministic availability
  const dateNum = date ? parseInt(date.replace(/-/g, '')) : 20260401
  const seed = dateNum + fromId * 100 + toId * 10 + (transportType === 'flight' ? 1 : transportType === 'shinkansen' ? 2 : 3)
  const rand = makeRand(seed)

  const options = getTransportOptions(fromId, toId)
  const opt = options.find(o => o.type === transportType) || options[0]
  if (!opt) return []

  // Define departure times based on type
  let departures = []
  if (transportType === 'flight') {
    // Flights: roughly every 1-2 hours, 6:00-19:00
    departures = ['06:00','07:30','08:45','10:15','11:30','13:00','14:30','16:00','17:15','18:30','19:45']
  } else if (transportType === 'shinkansen') {
    // Shinkansen: every ~30 min, 6:00-20:30
    const times = []
    for (let h = 6; h <= 20; h++) {
      times.push(`${String(h).padStart(2,'0')}:00`)
      if (h < 20) times.push(`${String(h).padStart(2,'0')}:30`)
    }
    times.push('20:30')
    departures = times
  } else {
    // Bus: every 2 hours
    departures = ['07:00','09:00','11:00','13:00','15:00','17:00','19:00']
  }

  return departures.map((dep, i) => {
    const [dh, dm] = dep.split(':').map(Number)
    const arrMins = dh * 60 + dm + opt.minutes
    const arrH = Math.floor(arrMins / 60) % 24
    const arrM = arrMins % 60
    const arrival = `${String(arrH).padStart(2,'0')}:${String(arrM).padStart(2,'0')}`

    // Price variation ±10%
    const priceVar = Math.round((opt.price * (0.9 + rand() * 0.2)) / 100) * 100

    // Availability: ~70% available, ~15% few, ~15% sold_out
    const r = rand()
    const availability = r < 0.15 ? 'sold_out' : r < 0.30 ? 'few' : 'available'
    // Peak hours (7-9, 17-19) more likely sold out or few
    const isPeak = (dh >= 7 && dh <= 9) || (dh >= 17 && dh <= 19)
    const finalAvailability = isPeak && rand() < 0.35 ? (rand() < 0.5 ? 'sold_out' : 'few') : availability

    return { id: i, departure: dep, arrival, price: priceVar, availability: finalAvailability, type: transportType }
  })
}
