<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero">
      <div class="container hero-inner">
        <h1 class="hero-title">日本の旅を、もっと自由に。</h1>
        <p class="hero-sub">47都道府県の宿泊・移動手段をまとめて検索・予約</p>

        <div class="search-box card">
          <div class="tabs">
            <button class="tab" :class="{ active: tab === 'hotel' }" @click="tab = 'hotel'">🏨 宿泊のみ</button>
            <button class="tab" :class="{ active: tab === 'package' }" @click="tab = 'package'">🚄 交通+宿泊セット</button>
          </div>

          <!-- 宿泊のみ tab -->
          <div v-if="tab === 'hotel'" class="tab-content">
            <div class="search-row">
              <button class="search-field dest-btn" @click="goToSearch('dest')">
                <span class="field-label">目的地</span>
                <span class="field-value" :class="{ placeholder: !destPref }">
                  {{ destPref ? destPref.name : '目的地を選ぶ' }}
                </span>
              </button>
              <div class="search-field">
                <span class="field-label">チェックイン</span>
                <input type="date" v-model="store.draft.checkin" :min="today" class="date-input" />
              </div>
              <div class="search-field">
                <span class="field-label">チェックアウト</span>
                <input type="date" v-model="store.draft.checkout" :min="store.draft.checkin || today" class="date-input" />
              </div>
              <div class="search-field guests-field">
                <span class="field-label">人数</span>
                <div class="guests-ctrl">
                  <button @click="changeGuests(-1)">−</button>
                  <span>{{ store.draft.guests }}名</span>
                  <button @click="changeGuests(1)">+</button>
                </div>
              </div>
            </div>
            <button class="btn btn-primary search-btn" @click="hotelSearch">宿泊施設を検索</button>
          </div>

          <!-- 交通+宿泊 tab -->
          <div v-if="tab === 'package'" class="tab-content">
            <div class="search-row">
              <button class="search-field dest-btn" @click="goToSearch('origin')">
                <span class="field-label">出発地</span>
                <span class="field-value" :class="{ placeholder: !originPref }">
                  {{ originPref ? originPref.name : '出発地を選ぶ' }}
                </span>
              </button>
              <button class="search-field dest-btn" @click="goToSearch('dest')">
                <span class="field-label">目的地</span>
                <span class="field-value" :class="{ placeholder: !destPref }">
                  {{ destPref ? destPref.name : '目的地を選ぶ' }}
                </span>
              </button>
              <div class="search-field">
                <span class="field-label">チェックイン</span>
                <input type="date" v-model="store.draft.checkin" :min="today" class="date-input" />
              </div>
              <div class="search-field">
                <span class="field-label">チェックアウト</span>
                <input type="date" v-model="store.draft.checkout" :min="store.draft.checkin || today" class="date-input" />
              </div>
            </div>
            <div class="search-row2">
              <div class="search-field guests-field">
                <span class="field-label">人数</span>
                <div class="guests-ctrl">
                  <button @click="changeGuests(-1)">−</button>
                  <span>{{ store.draft.guests }}名</span>
                  <button @click="changeGuests(1)">+</button>
                </div>
              </div>
              <div class="trip-type">
                <label><input type="radio" v-model="store.draft.tripType" value="roundtrip" /> 往復</label>
                <label><input type="radio" v-model="store.draft.tripType" value="oneway" /> 片道</label>
              </div>
            </div>
            <button class="btn btn-accent search-btn" @click="packageSearch">プランを検索</button>
          </div>
        </div>
      </div>
    </section>

    <!-- Popular Destinations -->
    <section class="section">
      <div class="container">
        <h2 class="section-title">人気の旅行先</h2>
        <div class="dest-grid">
          <div
            v-for="dest in popularDests"
            :key="dest.id"
            class="dest-card card"
            @click="goDest(dest.id)"
          >
            <div class="dest-emoji">{{ dest.emoji }}</div>
            <div class="dest-info">
              <div class="dest-name">{{ dest.name }}</div>
              <span class="badge" :style="{ background: dest.regionColor + '22', color: dest.regionColor }">{{ dest.regionName }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Popular Regions -->
    <section class="section section-gray">
      <div class="container">
        <h2 class="section-title">地域から探す</h2>
        <div class="region-grid">
          <button
            v-for="region in REGIONS"
            :key="region.id"
            class="region-btn"
            :style="{ '--rc': region.color }"
            @click="goRegion(region.id)"
          >
            {{ region.name }}
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { store } from '../store/index.js'
import { REGIONS, getPrefById } from '../data/prefectures.js'

const router = useRouter()
const tab = ref('hotel')

const today = new Date().toLocaleDateString('sv-SE')
const tomorrow = new Date(Date.now() + 86400000).toLocaleDateString('sv-SE')

if (!store.draft.checkin) store.draft.checkin = today
if (!store.draft.checkout) store.draft.checkout = tomorrow

const destPref   = computed(() => store.draft.destPrefId   ? getPrefById(store.draft.destPrefId)   : null)
const originPref = computed(() => store.draft.originPrefId ? getPrefById(store.draft.originPrefId) : null)

function changeGuests(d) {
  const v = store.draft.guests + d
  if (v >= 1 && v <= 8) store.draft.guests = v
}

function goToSearch(mode) {
  store.draft.mode = tab.value
  router.push({ path: '/search', query: { mode } })
}

function hotelSearch() {
  if (store.draft.destPrefId) {
    router.push('/hotels')
  } else {
    router.push('/search?mode=dest')
  }
}

function packageSearch() {
  store.draft.mode = 'package'
  if (store.draft.originPrefId && store.draft.destPrefId) {
    router.push('/package')
  } else {
    router.push({ path: '/search', query: { mode: store.draft.originPrefId ? 'dest' : 'origin' } })
  }
}

function goDest(prefId) {
  store.draft.destPrefId = prefId
  store.draft.mode = 'hotel'
  router.push('/hotels')
}

function goRegion(regionId) {
  router.push({ path: '/search', query: { mode: 'dest', region: regionId } })
}

const popularDestsData = [
  { id: 1,  emoji: '🏔️', name: '北海道' },
  { id: 13, emoji: '🗼', name: '東京' },
  { id: 26, emoji: '🌸', name: '京都' },
  { id: 27, emoji: '🍜', name: '大阪' },
  { id: 47, emoji: '🌺', name: '沖縄' },
  { id: 40, emoji: '🍲', name: '福岡' },
  { id: 20, emoji: '🌲', name: '長野' },
  { id: 34, emoji: '⛩️', name: '広島' },
]

const popularDests = computed(() => popularDestsData.map(d => {
  const pref = getPrefById(d.id)
  const region = REGIONS[pref.regionId]
  return { ...d, regionName: region.name, regionColor: region.color }
}))
</script>

<style scoped>
.hero {
  background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 50%, #0369a1 100%);
  padding: 60px 0 80px;
  color: #fff;
}
.hero-inner { text-align: center; }
.hero-title {
  font-size: clamp(28px, 5vw, 48px);
  font-weight: 800;
  letter-spacing: -1px;
  margin-bottom: 12px;
}
.hero-sub {
  font-size: clamp(14px, 2vw, 18px);
  opacity: 0.85;
  margin-bottom: 32px;
}

.search-box {
  max-width: 900px;
  margin: 0 auto;
  padding: 0;
  overflow: hidden;
}

.tabs {
  display: flex;
  border-bottom: 1px solid var(--border);
}
.tab {
  flex: 1;
  padding: 14px;
  background: #f8fafc;
  border: none;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-sub);
  transition: var(--transition);
  border-bottom: 3px solid transparent;
}
.tab.active {
  background: #fff;
  color: var(--primary);
  border-bottom-color: var(--primary);
}

.tab-content { padding: 20px; }

.search-row {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 12px;
}
.search-row2 {
  display: flex;
  gap: 16px;
  align-items: center;
  margin-bottom: 12px;
}

.search-field {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  min-width: 130px;
  background: #f8fafc;
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 10px 14px;
  text-align: left;
}
.dest-btn { cursor: pointer; transition: var(--transition); }
.dest-btn:hover { border-color: var(--primary); background: #e0f2fe; }

.field-label {
  font-size: 10px;
  font-weight: 600;
  color: var(--text-sub);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.field-value {
  font-size: 14px;
  font-weight: 600;
  color: var(--text);
}
.field-value.placeholder { color: var(--text-sub); font-weight: 400; }

.date-input {
  border: none;
  background: transparent;
  font-size: 14px;
  font-weight: 600;
  color: var(--text);
  font-family: inherit;
  padding: 0;
  width: 100%;
}
.date-input:focus { outline: none; }

.guests-field { flex: 0 0 auto; min-width: 110px; }
.guests-ctrl {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  font-weight: 600;
}
.guests-ctrl button {
  width: 24px; height: 24px;
  border-radius: 50%;
  border: 1px solid var(--border);
  background: #fff;
  font-size: 16px;
  line-height: 1;
  display: flex; align-items: center; justify-content: center;
}
.guests-ctrl button:hover { border-color: var(--primary); color: var(--primary); }

.trip-type {
  display: flex;
  gap: 16px;
  font-size: 14px;
}
.trip-type label {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  font-weight: 500;
}

.search-btn {
  width: 100%;
  padding: 14px;
  font-size: 15px;
  border-radius: 8px;
}

/* Sections */
.section { padding: 56px 0; }
.section-gray { background: #f8fafc; }
.section-title {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 24px;
  color: var(--text);
}

.dest-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 16px;
}
.dest-card {
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: transform var(--transition), box-shadow var(--transition);
}
.dest-card:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(0,0,0,0.12); }
.dest-emoji { font-size: 40px; margin-bottom: 8px; }
.dest-name { font-size: 16px; font-weight: 700; margin-bottom: 6px; }

.region-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
.region-btn {
  padding: 10px 24px;
  border-radius: 999px;
  border: 2px solid var(--rc);
  background: transparent;
  color: var(--rc);
  font-size: 14px;
  font-weight: 600;
  transition: var(--transition);
}
.region-btn:hover {
  background: var(--rc);
  color: #fff;
}

@media (max-width: 640px) {
  .search-row { flex-direction: column; }
  .hero { padding: 40px 0 60px; }
  .dest-grid { grid-template-columns: repeat(2, 1fr); }
}
</style>
