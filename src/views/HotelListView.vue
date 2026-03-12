<template>
  <div class="hotel-list">
    <div class="container">
      <!-- Transport summary bar (package flow) -->
      <div v-if="store.draft.mode === 'package' && store.draft.selectedTransport" class="transport-bar">
        <span class="t-icon">{{ store.draft.selectedTransport.type === 'flight' ? '✈️' : store.draft.selectedTransport.type === 'shinkansen' ? '🚄' : '🚌' }}</span>
        <span>{{ originPref?.name }} → {{ destPref?.name }}</span>
        <span class="t-price">交通費: ¥{{ store.draft.selectedTransport.price.toLocaleString() }}/人</span>
      </div>

      <!-- Header -->
      <div class="list-header">
        <div>
          <h1 class="list-title">
            <span v-if="destPref">{{ destPref.name }}</span>
            <span v-else>全国</span>の宿泊施設
          </h1>
          <p class="list-sub" v-if="store.draft.checkin">
            {{ store.draft.checkin }} 〜 {{ store.draft.checkout }}
            <span v-if="nights > 0">（{{ nights }}泊）</span>
            　{{ store.draft.guests }}名
          </p>
        </div>
        <div class="sort-row">
          <label class="sort-label">並び替え:</label>
          <select v-model="sortBy" class="sort-select">
            <option value="default">人気順</option>
            <option value="price_asc">価格安い順</option>
            <option value="rating">評価順</option>
          </select>
        </div>
      </div>

      <div class="list-layout">
        <!-- Filters -->
        <aside class="filters card">
          <h3>絞り込み</h3>

          <div class="filter-group">
            <div class="filter-label">宿泊タイプ</div>
            <label v-for="t in typeOptions" :key="t.value" class="filter-option">
              <input type="radio" v-model="filterType" :value="t.value" />
              {{ t.label }}
            </label>
          </div>

          <div class="filter-group">
            <div class="filter-label">価格帯（1泊）</div>
            <label v-for="p in priceOptions" :key="p.value" class="filter-option">
              <input type="radio" v-model="filterPrice" :value="p.value" />
              {{ p.label }}
            </label>
          </div>

          <div class="filter-group">
            <div class="filter-label">星評価</div>
            <label v-for="s in starOptions" :key="s.value" class="filter-option">
              <input type="radio" v-model="filterStars" :value="s.value" />
              {{ s.label }}
            </label>
          </div>

          <button class="btn btn-secondary btn-block" @click="resetFilters">リセット</button>
        </aside>

        <!-- Hotel Cards -->
        <div class="hotel-cards">
          <p class="result-count">{{ filteredHotels.length }}件の宿泊施設</p>

          <div v-if="filteredHotels.length === 0" class="empty-state card">
            <p>条件に合う宿泊施設が見つかりませんでした。</p>
            <button class="btn btn-outline" @click="resetFilters">絞り込みをリセット</button>
          </div>

          <div
            v-for="hotel in sortedHotels"
            :key="hotel.id"
            class="hotel-card card"
          >
            <div class="hotel-img" :style="{ background: typeColor(hotel.type) }">
              <span class="hotel-emoji">{{ hotel.emoji }}</span>
              <span class="type-badge badge" :class="typeBadgeClass(hotel.type)">{{ typeLabel(hotel.type) }}</span>
            </div>
            <div class="hotel-body">
              <div class="hotel-name">{{ hotel.name }}</div>
              <div class="hotel-meta">
                <span class="stars">{{ '★'.repeat(hotel.stars) }}</span>
                <span class="rating">{{ hotel.rating }}</span>
                <span class="area">📍 {{ hotel.area }}</span>
              </div>
              <div class="amenities">
                <span v-for="a in hotel.amenities.slice(0,3)" :key="a" class="amenity-tag">{{ a }}</span>
              </div>
              <div class="hotel-footer">
                <div class="price">
                  <span class="price-val">¥{{ hotel.pricePerNight.toLocaleString() }}</span>
                  <span class="price-unit">/泊</span>
                </div>
                <router-link :to="`/hotel/${hotel.id}`" class="btn btn-primary detail-btn">詳細を見る</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { store } from '../store/index.js'
import { getPrefById } from '../data/prefectures.js'
import { getHotelsByPref, HOTELS } from '../data/hotels.js'

const destPref   = computed(() => store.draft.destPrefId ? getPrefById(store.draft.destPrefId) : null)
const originPref = computed(() => store.draft.originPrefId ? getPrefById(store.draft.originPrefId) : null)

const nights = computed(() => {
  if (!store.draft.checkin || !store.draft.checkout) return 0
  const d = (new Date(store.draft.checkout) - new Date(store.draft.checkin)) / 86400000
  return d > 0 ? d : 0
})

const allHotels = computed(() => {
  if (store.draft.destPrefId) return getHotelsByPref(store.draft.destPrefId)
  return HOTELS
})

// Filters
const filterType  = ref('all')
const filterPrice = ref('all')
const filterStars = ref('all')
const sortBy      = ref('default')

const typeOptions  = [
  { value: 'all',     label: 'すべて' },
  { value: 'hotel',   label: 'ホテル' },
  { value: 'ryokan',  label: '旅館' },
  { value: 'resort',  label: 'リゾート' },
]
const priceOptions = [
  { value: 'all',   label: 'すべて' },
  { value: 'low',   label: '〜10,000円' },
  { value: 'mid',   label: '10,000〜30,000円' },
  { value: 'high',  label: '30,000円〜' },
]
const starOptions = [
  { value: 'all', label: 'すべて' },
  { value: '3',   label: '★★★以上' },
  { value: '4',   label: '★★★★以上' },
]

const filteredHotels = computed(() => {
  let list = allHotels.value
  if (filterType.value !== 'all') list = list.filter(h => h.type === filterType.value)
  if (filterPrice.value === 'low')  list = list.filter(h => h.pricePerNight <= 10000)
  if (filterPrice.value === 'mid')  list = list.filter(h => h.pricePerNight > 10000 && h.pricePerNight <= 30000)
  if (filterPrice.value === 'high') list = list.filter(h => h.pricePerNight > 30000)
  if (filterStars.value === '3')    list = list.filter(h => h.stars >= 3)
  if (filterStars.value === '4')    list = list.filter(h => h.stars >= 4)
  return list
})

const sortedHotels = computed(() => {
  const list = [...filteredHotels.value]
  if (sortBy.value === 'price_asc') list.sort((a,b) => a.pricePerNight - b.pricePerNight)
  else if (sortBy.value === 'rating') list.sort((a,b) => b.rating - a.rating)
  else list.sort((a,b) => b.rating - a.rating) // default by rating
  return list
})

function resetFilters() {
  filterType.value = 'all'
  filterPrice.value = 'all'
  filterStars.value = 'all'
}

function typeLabel(t) {
  return t === 'hotel' ? 'ホテル' : t === 'ryokan' ? '旅館' : 'リゾート'
}
function typeBadgeClass(t) {
  return t === 'hotel' ? 'badge-primary' : t === 'ryokan' ? 'badge-warning' : 'badge-accent'
}
function typeColor(t) {
  return t === 'hotel' ? '#e0f2fe' : t === 'ryokan' ? '#fef3c7' : '#dcfce7'
}
</script>

<style scoped>
.hotel-list { padding: 28px 0 60px; }

.transport-bar {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 20px;
  background: #dcfce7;
  border-radius: 10px;
  border: 1px solid #86efac;
  margin-bottom: 20px;
  font-size: 14px;
  font-weight: 500;
  flex-wrap: wrap;
}
.t-icon { font-size: 20px; }
.t-price { margin-left: auto; font-weight: 700; color: var(--accent); }

.list-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}
.list-title { font-size: 24px; font-weight: 800; }
.list-sub { color: var(--text-sub); font-size: 14px; margin-top: 4px; }

.sort-row { display: flex; align-items: center; gap: 8px; }
.sort-label { font-size: 13px; color: var(--text-sub); }
.sort-select {
  padding: 6px 12px;
  border: 1px solid var(--border);
  border-radius: 6px;
  font-size: 13px;
  background: #fff;
  font-family: inherit;
}

.list-layout {
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 24px;
}

.filters {
  padding: 20px;
  height: fit-content;
  position: sticky;
  top: 80px;
}
.filters h3 { font-size: 15px; font-weight: 700; margin-bottom: 16px; }

.filter-group { margin-bottom: 20px; }
.filter-label { font-size: 12px; font-weight: 700; color: var(--text-sub); margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px; }
.filter-option {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  padding: 4px 0;
  cursor: pointer;
}
.btn-block { width: 100%; margin-top: 4px; }

.hotel-cards { display: flex; flex-direction: column; gap: 16px; }
.result-count { font-size: 13px; color: var(--text-sub); margin-bottom: 8px; }

.hotel-card {
  display: grid;
  grid-template-columns: 140px 1fr;
  overflow: hidden;
  transition: all var(--transition);
}
.hotel-card:hover { box-shadow: 0 6px 24px rgba(0,0,0,0.12); transform: translateY(-2px); }

.hotel-img {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 140px;
  position: relative;
  flex-direction: column;
  gap: 8px;
}
.hotel-emoji { font-size: 48px; }
.type-badge {
  position: absolute;
  top: 8px;
  left: 8px;
}

.hotel-body { padding: 16px; display: flex; flex-direction: column; gap: 8px; }
.hotel-name { font-size: 16px; font-weight: 700; }
.hotel-meta { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
.stars { color: #f59e0b; font-size: 13px; letter-spacing: 1px; }
.rating { font-size: 13px; font-weight: 700; color: var(--text); }
.area { font-size: 12px; color: var(--text-sub); }

.amenities { display: flex; gap: 6px; flex-wrap: wrap; }
.amenity-tag {
  padding: 3px 8px;
  background: #f1f5f9;
  border-radius: 4px;
  font-size: 11px;
  color: var(--text-sub);
}

.hotel-footer { display: flex; align-items: center; justify-content: space-between; margin-top: auto; }
.price-val { font-size: 22px; font-weight: 800; color: var(--primary); }
.price-unit { font-size: 12px; color: var(--text-sub); margin-left: 2px; }

.detail-btn { padding: 8px 18px; font-size: 13px; }

.empty-state { padding: 40px; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 16px; }

@media (max-width: 768px) {
  .list-layout { grid-template-columns: 1fr; }
  .filters { position: static; display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 16px; }
  .hotel-card { grid-template-columns: 100px 1fr; }
  .hotel-img { min-height: 100px; }
  .hotel-emoji { font-size: 36px; }
}

@media (max-width: 480px) {
  .hotel-card { grid-template-columns: 1fr; }
  .hotel-img { min-height: 100px; }
}
</style>
