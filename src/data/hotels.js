import { getPrefById } from './prefectures.js'

// Hotel counts per area [count for area0, area1, area2, ...]
const AREA_COUNTS = {
  1:  [50, 35, 25, 20, 20, 15],  // 北海道(札幌多め)
  4:  [30, 25, 15],              // 宮城
  13: [50, 45, 30, 25],          // 東京(都心多め)
  14: [25, 40, 38, 20],          // 神奈川(箱根・鎌倉多め)
  20: [18, 40, 30, 15],          // 長野(軽井沢多め)
  22: [20, 35, 18, 20],          // 静岡(熱海・伊豆多め)
  23: [35, 20, 15, 18],          // 愛知
  26: [50, 40, 20, 15],          // 京都(市内多め)
  27: [45, 40, 25, 20],          // 大阪
  28: [35, 20, 25, 20],          // 兵庫(神戸多め)
  34: [30, 30, 20, 18],          // 広島
  40: [40, 30, 20, 18, 15],      // 福岡
  44: [18, 40, 40, 15],          // 大分(別府・由布院多め)
  47: [35, 45, 30, 28],          // 沖縄(恩納村多め)
}
// Default for any prefId not listed: [15, 12, 10, 10]

function makeRand(seed) {
  let s = seed >>> 0
  return () => { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 0xffffffff }
}

const HOTEL_NAME_PARTS = {
  hotel: {
    adj: ['グランド','ロイヤル','プレミア','ガーデン','クラウン','コンフォート','ハーバー','スカイ','シティ','パーク'],
    sfx: ['ホテル','ホテル＆リゾート','イン','ホテルズ','スイーツ'],
  },
  ryokan: {
    adj: ['松風','花月','緑水','翠嵐','山楽','鶴亀','月光','春風','桜花','清流','芳泉','雅'],
    sfx: ['旅館','荘','閣','の宿','温泉旅館'],
  },
  resort: {
    adj: ['ブルー','グリーン','サニー','ラグーン','コーラル','マリン','フォレスト','ヴィラ','シーサイド','ヒルズ'],
    sfx: ['リゾート','ヴィレッジ','スパ＆リゾート','リゾートホテル','リトリート'],
  },
}

const ALL_AMENITIES = ['温泉','大浴場','露天風呂','サウナ','プール','レストラン','バー','フィットネス','スパ','駐車場','WiFi','朝食付き','ペット可','無料送迎','会議室']

const HOTEL_EMOJIS = {
  hotel:  ['🏨','🏩','🏢','🌆','🏙️'],
  ryokan: ['🏯','⛩️','🎋','♨️','🌸'],
  resort: ['🌊','🏖️','🌴','🏝️','🌅'],
}

const DESCRIPTIONS = {
  hotel: [
    'city便利な立地と快適な空間を提供する都市型ホテル。ビジネスにも観光にも最適。',
    '洗練されたデザインと上質なサービスが自慢のホテル。快適な滞在をお約束します。',
    '交通アクセス抜群の立地にあるシティホテル。観光の拠点として最適です。',
    '地域の文化と現代的な快適さが融合したホテル。忘れられない滞在体験を。',
    '周辺の観光スポットへのアクセスに優れた便利なホテル。心地よい旅を演出。',
  ],
  ryokan: [
    '伝統的な日本建築と風情ある設えが魅力の旅館。日本の美を堪能できます。',
    '地元の食材を活かした本格的な懐石料理と温泉が自慢の老舗旅館。',
    '自然に囲まれた静かな環境で日本の旅情を満喫できる温泉旅館。',
    '四季折々の景観と伝統的なおもてなしが評判の旅館。心身ともに癒される滞在を。',
    '古き良き日本の宿文化を継承する旅館。丁寧なおもてなしで旅の疲れを癒します。',
  ],
  resort: [
    '豊かな自然に囲まれた開放的なリゾートホテル。日常を離れた特別な体験を。',
    '美しい景色と充実したレジャー施設が揃うリゾート。最高の休暇をお届けします。',
    '海・山・温泉など自然の恵みを満喫できるリゾート施設。非日常の体験を。',
    'プールやスパなど充実した施設でリラックスできるリゾート。特別なひとときを。',
    '絶景の中に佇むラグジュアリーリゾート。ここだけの特別な体験が待っています。',
  ],
}

export function getAreaCount(prefId, areaIdx) {
  const counts = AREA_COUNTS[prefId] || [15, 12, 10, 10]
  return counts[areaIdx] !== undefined ? counts[areaIdx] : (counts[counts.length - 1] || 10)
}

export function generateHotel(prefId, areaIdx, areaName, hotelIndex) {
  const id = prefId * 100000 + areaIdx * 1000 + hotelIndex
  const rand = makeRand(id + 7919)

  // Type
  const typeIdx = Math.floor(rand() * 3)
  const type = ['hotel', 'ryokan', 'resort'][typeIdx]

  // Name
  const parts = HOTEL_NAME_PARTS[type]
  const adj = parts.adj[Math.floor(rand() * parts.adj.length)]
  const sfx = parts.sfx[Math.floor(rand() * parts.sfx.length)]
  const name = adj + ' ' + sfx

  // Stars based on position in count
  const count = getAreaCount(prefId, areaIdx)
  let stars
  if (hotelIndex < Math.ceil(count / 3)) {
    stars = rand() > 0.5 ? 5 : 4
  } else if (hotelIndex < Math.ceil(2 * count / 3)) {
    stars = 3
  } else {
    stars = rand() > 0.5 ? 3 : 2
  }

  // Price per night
  const priceRanges = { 5: [40000, 90000], 4: [20000, 45000], 3: [10000, 22000], 2: [5000, 12000] }
  const [minPrice, maxPrice] = priceRanges[stars]
  const pricePerNight = Math.round((minPrice + rand() * (maxPrice - minPrice)) / 1000) * 1000

  // Rating
  const rating = Math.min(5.0, Math.round((3.0 + rand() * 2.0) * 10) / 10)

  // Amenities: shuffle ALL_AMENITIES with rand, take first 3-6
  const shuffled = [...ALL_AMENITIES]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  const amenityCount = 3 + Math.floor(rand() * 4)
  const amenities = shuffled.slice(0, amenityCount)

  // Emoji
  const emojiList = HOTEL_EMOJIS[type]
  const emoji = emojiList[Math.floor(rand() * emojiList.length)]

  // Description
  const descList = DESCRIPTIONS[type]
  const description = descList[Math.floor(rand() * descList.length)]

  const adRand = makeRand(prefId * 999 + areaIdx * 77 + hotelIndex + 12345)
  const isAd = adRand() < 0.05

  return { id, prefId, areaIdx, area: areaName, name, type, stars, pricePerNight, amenities, description, emoji, rating, isAd }
}

export function getHotelsByPrefArea(prefId, areaIdx, areaName) {
  const count = getAreaCount(prefId, areaIdx)
  return Array.from({ length: count }, (_, i) => generateHotel(prefId, areaIdx, areaName, i))
}

export function getHotelsByPref(prefId, areas) {
  // areas: string[] from prefecture.areas
  return areas.flatMap((areaName, areaIdx) => getHotelsByPrefArea(prefId, areaIdx, areaName))
}

export function getHotelById(id) {
  const prefId = Math.floor(id / 100000)
  const areaIdx = Math.floor((id % 100000) / 1000)
  const hotelIndex = id % 1000
  const pref = getPrefById(prefId)
  if (!pref) return null
  const areaName = pref.areas[areaIdx] || ''
  return generateHotel(prefId, areaIdx, areaName, hotelIndex)
}
