<template>
  <div class="hotel-list">
    <!-- Filter loading modal -->
    <Transition name="fl">
      <div v-if="filterLoading" class="filter-modal-overlay">
        <div class="filter-modal-card">
          <span class="filter-hourglass">⏳</span>
          <p class="filter-modal-text">絞り込み中…</p>
        </div>
      </div>
    </Transition>

    <div class="container">
      <!-- Breadcrumb -->
      <nav v-if="destPref" class="breadcrumb-nav" aria-label="パンくずリスト">
        <router-link to="/" class="bc-link">ホーム</router-link>
        <span class="bc-sep">›</span>
        <router-link :to="`/search?mode=dest&region=${destPref.regionId}`" class="bc-link">{{ regionName }}</router-link>
        <span class="bc-sep">›</span>
        <template v-if="filterArea !== 'all'">
          <button class="bc-link bc-btn" @click="filterArea = 'all'">{{ destPref.name }}</button>
          <span class="bc-sep">›</span>
          <span class="bc-current">{{ filterArea }}</span>
        </template>
        <template v-else>
          <span class="bc-current">{{ destPref.name }}</span>
        </template>
      </nav>

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
          <p v-if="!isLoading" class="result-count-header">{{ filteredHotels.length }}件の宿泊施設が見つかりました</p>
        </div>
        <div class="sort-row">
          <label class="sort-label">並び替え:</label>
          <select v-model="sortBy" class="sort-select">
            <option value="popular">人気順</option>
            <option value="price_asc">価格安い順</option>
            <option value="rating">評価順</option>
          </select>
        </div>
      </div>

      <div class="list-layout">
        <!-- Filters -->
        <aside class="filters card">
          <h3>絞り込み</h3>

          <!-- Area -->
          <div class="filter-group">
            <button class="filter-section-head" @click="toggleSection('area')">
              <span class="filter-label-text">エリア</span>
              <span class="fsarrow">{{ openSections.has('area') ? '▲' : '▼' }}</span>
            </button>
            <div v-show="openSections.has('area')" class="filter-body">
              <label class="filter-option">
                <input type="radio" v-model="filterArea" value="all" />
                すべて
              </label>
              <label v-for="area in prefAreas" :key="area" class="filter-option">
                <input type="radio" v-model="filterArea" :value="area" />
                {{ area }}
              </label>
            </div>
          </div>

          <!-- Type -->
          <div class="filter-group">
            <button class="filter-section-head" @click="toggleSection('type')">
              <span class="filter-label-text">宿泊タイプ</span>
              <span class="fsarrow">{{ openSections.has('type') ? '▲' : '▼' }}</span>
            </button>
            <div v-show="openSections.has('type')" class="filter-body">
              <label v-for="t in typeOptions" :key="t.value" class="filter-option">
                <input type="radio" v-model="filterType" :value="t.value" />
                {{ t.label }}
              </label>
            </div>
          </div>

          <!-- Price (dual range slider) -->
          <div class="filter-group">
            <button class="filter-section-head" @click="toggleSection('price')">
              <span class="filter-label-text">価格帯（1泊）</span>
              <span class="fsarrow">{{ openSections.has('price') ? '▲' : '▼' }}</span>
            </button>
            <div v-show="openSections.has('price')" class="filter-body">
              <div class="price-range-display">
                <span>¥{{ priceMin.toLocaleString() }}</span>
                <span>〜</span>
                <span>¥{{ priceMax.toLocaleString() }}</span>
              </div>
              <div class="range-wrap">
                <input type="range" v-model.number="priceMin" :min="0" :max="100000" :step="1000" class="range-slider" @input="onPriceMinInput" />
                <input type="range" v-model.number="priceMax" :min="0" :max="100000" :step="1000" class="range-slider" @input="onPriceMaxInput" />
              </div>
            </div>
          </div>

          <!-- Stars -->
          <div class="filter-group">
            <button class="filter-section-head" @click="toggleSection('stars')">
              <span class="filter-label-text">星評価</span>
              <span class="fsarrow">{{ openSections.has('stars') ? '▲' : '▼' }}</span>
            </button>
            <div v-show="openSections.has('stars')" class="filter-body">
              <label v-for="s in starOptions" :key="s.value" class="filter-option">
                <input type="radio" v-model="filterStars" :value="s.value" />
                {{ s.label }}
              </label>
            </div>
          </div>

          <!-- Amenity -->
          <div class="filter-group">
            <button class="filter-section-head" @click="toggleSection('amenity')">
              <span class="filter-label-text">設備・サービス</span>
              <span class="fsarrow">{{ openSections.has('amenity') ? '▲' : '▼' }}</span>
            </button>
            <div v-show="openSections.has('amenity')" class="filter-body">
              <div class="amenity-chips">
                <button
                  v-for="am in FILTER_AMENITIES"
                  :key="am"
                  class="amenity-chip"
                  :class="{ active: filterAmenities.includes(am) }"
                  @click="toggleAmenity(am)"
                >{{ am }}</button>
              </div>
            </div>
          </div>

          <button class="btn btn-secondary btn-block" @click="resetFilters">リセット</button>
        </aside>

        <!-- Hotel Cards -->
        <div class="hotel-cards">
          <p v-if="!isLoading" class="result-count">
            {{ filteredHotels.length }}件の宿泊施設
            <span v-if="filteredHotels.length > 0">
              （{{ (currentPage - 1) * PAGE_SIZE + 1 }}〜{{ Math.min(currentPage * PAGE_SIZE, displayHotels.length) }}件表示）
            </span>
          </p>

          <!-- Initial skeleton -->
          <template v-if="isLoading">
            <div v-for="n in 4" :key="n" class="hotel-card card">
              <div class="sk-img sk-anim"></div>
              <div class="hotel-body">
                <div class="sk-line sk-anim" style="width:65%;height:18px;margin-bottom:10px"></div>
                <div class="sk-line sk-anim" style="width:45%;height:12px;margin-bottom:8px"></div>
                <div class="sk-line sk-anim" style="width:80%;height:12px;margin-bottom:8px"></div>
                <div class="sk-line sk-anim" style="width:40%;height:22px;margin-top:auto"></div>
              </div>
            </div>
          </template>

          <template v-else>
            <div v-if="filteredHotels.length === 0" class="empty-state card">
              <p>条件に合う宿泊施設が見つかりませんでした。</p>
              <button class="btn btn-outline" @click="resetFilters">絞り込みをリセット</button>
            </div>

            <div
              v-for="hotel in pagedHotels"
            :key="hotel.isPr ? 'pr-' + hotel.id : hotel.id"
            class="hotel-card card"
            :class="{ 'ad-card': hotel.isPr }"
          >
            <div class="hotel-img" :style="{ background: typeColor(hotel.type) }">
              <span class="hotel-emoji">{{ hotel.emoji }}</span>
              <span class="type-badge badge" :class="typeBadgeClass(hotel.type)">{{ typeLabel(hotel.type) }}</span>
              <div v-if="hotel.isPr" class="pr-banner">広告</div>
            </div>
            <div class="hotel-body">
              <div class="hotel-name">
                {{ hotel.name }}
                <span v-if="hotel.isPr" class="pr-label">[PR]</span>
              </div>
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
                  <span class="price-unit">/泊〜</span>
                  <span v-if="nights > 0" class="price-total">
                    （{{ nights }}泊 ¥{{ (hotel.pricePerNight * nights).toLocaleString() }}〜）
                  </span>
                  <span v-else class="price-nodates">日程未指定</span>
                </div>
                <div class="card-actions">
                  <button
                    v-if="isLoggedIn()"
                    class="fav-btn"
                    :class="{ active: isFavorite(hotel.id) }"
                    @click.prevent="toggleFavorite(hotel.id)"
                    :title="isFavorite(hotel.id) ? 'お気に入りから削除' : 'お気に入りに追加'"
                  >{{ isFavorite(hotel.id) ? '♥' : '♡' }}</button>
                  <router-link :to="`/hotel/${hotel.id}`" class="btn btn-primary detail-btn">詳細を見る</router-link>
                </div>
              </div>
            </div>
          </div>

            <!-- Pagination -->
            <div v-if="totalPages > 1" class="pagination">
              <button
                class="page-btn page-nav"
                :disabled="currentPage <= 1"
                @click="currentPage--; scrollToTop()"
              >‹ 前へ</button>

              <template v-for="(p, i) in pageNumbers" :key="p">
                <span v-if="i > 0 && pageNumbers[i-1] + 1 < p" class="page-ellipsis">…</span>
                <button
                  class="page-btn"
                  :class="{ active: p === currentPage }"
                  @click="currentPage = p; scrollToTop()"
                >{{ p }}</button>
              </template>

              <button
                class="page-btn page-nav"
                :disabled="currentPage >= totalPages"
                @click="currentPage++; scrollToTop()"
              >次へ ›</button>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { store, isLoggedIn, toggleFavorite, isFavorite } from '../store/index.js'
import { REGIONS, getPrefById } from '../data/prefectures.js'
import { getHotelsByPref } from '../data/hotels.js'

const isLoading    = ref(true)
const filterLoading = ref(false)

onMounted(async () => {
  const delay = 2000 + Math.random() * 3000
  await new Promise(r => setTimeout(r, delay))
  isLoading.value = false
})

const destPref   = computed(() => store.draft.destPrefId ? getPrefById(store.draft.destPrefId) : null)
const originPref = computed(() => store.draft.originPrefId ? getPrefById(store.draft.originPrefId) : null)

const nights = computed(() => {
  if (!store.draft.checkin || !store.draft.checkout) return 0
  const d = (new Date(store.draft.checkout) - new Date(store.draft.checkin)) / 86400000
  return d > 0 ? d : 0
})

const pref = computed(() => getPrefById(Number(store.draft.destPrefId)))
const prefAreas = computed(() => pref.value ? pref.value.areas : [])

const allHotels = computed(() => {
  if (!pref.value) return []
  return getHotelsByPref(pref.value.id, pref.value.areas)
})

// ── UI filter state (what the user sees/clicks) ──
const filterType      = ref('all')
const priceMin        = ref(0)
const priceMax        = ref(100000)
const filterStars     = ref(0)
const filterAmenities = ref([])
const filterArea      = ref('all')
const sortBy          = ref('popular')

// ── Active filter state (what's actually applied to results) ──
const activeType      = ref('all')
const activeMin       = ref(0)
const activeMax       = ref(100000)
const activeStars     = ref(0)
const activeAmenities = ref([])
const activeArea      = ref('all')
const activeSort      = ref('popular')

// Accordion state — amenity closed by default
const openSections = ref(new Set(['area', 'type', 'price', 'stars']))
function toggleSection(key) {
  if (openSections.value.has(key)) openSections.value.delete(key)
  else openSections.value.add(key)
}

const FILTER_AMENITIES = ['温泉', '大浴場', '露天風呂', 'サウナ', 'プール', 'スパ', 'レストラン', '朝食付き', 'フィットネス', 'ペット可', '無料送迎', '駐車場']

const typeOptions = [
  { value: 'all',    label: 'すべて' },
  { value: 'hotel',  label: 'ホテル' },
  { value: 'ryokan', label: '旅館' },
  { value: 'resort', label: 'リゾート' },
]
const starOptions = [
  { value: 0, label: 'すべて' },
  { value: 3, label: '★★★以上' },
  { value: 4, label: '★★★★以上' },
]

function onPriceMinInput() { if (priceMin.value > priceMax.value) priceMax.value = priceMin.value }
function onPriceMaxInput() { if (priceMax.value < priceMin.value) priceMin.value = priceMax.value }

function toggleAmenity(am) {
  const idx = filterAmenities.value.indexOf(am)
  if (idx >= 0) filterAmenities.value.splice(idx, 1)
  else filterAmenities.value.push(am)
}

// filteredHotels reads from ACTIVE state only
const filteredHotels = computed(() => {
  let list = allHotels.value
  if (activeType.value !== 'all') list = list.filter(h => h.type === activeType.value)
  if (activeMin.value > 0 || activeMax.value < 100000) {
    list = list.filter(h => h.pricePerNight >= activeMin.value && h.pricePerNight <= activeMax.value)
  }
  if (activeStars.value > 0) list = list.filter(h => h.stars >= activeStars.value)
  if (activeAmenities.value.length > 0) {
    list = list.filter(h => activeAmenities.value.every(am => h.amenities.includes(am)))
  }
  if (activeArea.value !== 'all') list = list.filter(h => h.area === activeArea.value)

  if (activeSort.value === 'price_asc') list = [...list].sort((a, b) => a.pricePerNight - b.pricePerNight)
  else if (activeSort.value === 'rating') list = [...list].sort((a, b) => b.rating - a.rating)

  return list
})

// PR/Ad injection — 1件をランダム選択して先頭に[PR]表示、通常位置にも重複表示
const displayHotels = computed(() => {
  const list = filteredHotels.value
  const adHotels = list.filter(h => h.isAd)
  if (adHotels.length === 0) return list
  const picked = { ...adHotels[Math.floor(Math.random() * adHotels.length)], isPr: true }
  return [picked, ...list]
})

function applyFilters() {
  activeType.value      = filterType.value
  activeMin.value       = priceMin.value
  activeMax.value       = priceMax.value
  activeStars.value     = filterStars.value
  activeAmenities.value = [...filterAmenities.value]
  activeArea.value      = filterArea.value
  activeSort.value      = sortBy.value
}

function resetFilters() {
  filterType.value = 'all'; priceMin.value = 0; priceMax.value = 100000
  filterStars.value = 0; filterAmenities.value = []; filterArea.value = 'all'
  // Apply immediately on reset
  activeType.value = 'all'; activeMin.value = 0; activeMax.value = 100000
  activeStars.value = 0; activeAmenities.value = []; activeArea.value = 'all'
}

// ── Filter loading: show loading BEFORE applying results ──
let filterTimer = null
function triggerFilterLoad() {
  if (isLoading.value) return
  filterLoading.value = true
  clearTimeout(filterTimer)
  filterTimer = setTimeout(() => {
    applyFilters()
    filterLoading.value = false
  }, 600)
}
watch([filterType, priceMin, priceMax, filterStars, filterAmenities, filterArea, sortBy], triggerFilterLoad, { deep: true })

// ── Pagination ──
const PAGE_SIZE = 10
const currentPage = ref(1)

watch(filteredHotels, () => { currentPage.value = 1 })

const totalPages = computed(() => Math.max(1, Math.ceil(displayHotels.value.length / PAGE_SIZE)))

const pagedHotels = computed(() => {
  const start = (currentPage.value - 1) * PAGE_SIZE
  return displayHotels.value.slice(start, start + PAGE_SIZE)
})

const pageNumbers = computed(() => {
  const total = totalPages.value
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  const cur = currentPage.value
  const set = new Set([1, total, cur - 1, cur, cur + 1].filter(p => p >= 1 && p <= total))
  return [...set].sort((a, b) => a - b)
})

// ── Breadcrumb ──
const regionName = computed(() => destPref.value ? REGIONS[destPref.value.regionId]?.name : '')

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
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

/* Skeleton */
.sk-img {
  width: 140px; min-height: 140px;
  background: #e2e8f0; flex-shrink: 0;
}
.sk-line {
  border-radius: 6px;
  background: #e2e8f0;
}
@keyframes skShimmer {
  0%   { background-position: -400px 0; }
  100% { background-position: 400px 0; }
}
.sk-anim {
  background: linear-gradient(90deg, #e2e8f0 25%, #f1f5f9 50%, #e2e8f0 75%);
  background-size: 800px 100%;
  animation: skShimmer 1.4s infinite;
}

/* Filter loading modal */
.filter-modal-overlay {
  position: fixed; inset: 0; z-index: 500;
  background: rgba(0,0,0,0.45);
  display: flex; align-items: center; justify-content: center;
  pointer-events: all;
}
.filter-modal-card {
  background: #fff;
  border-radius: 16px;
  padding: 40px 56px;
  text-align: center;
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
  display: flex; flex-direction: column; align-items: center; gap: 12px;
}
.filter-hourglass {
  font-size: 48px;
  animation: hgSpin 0.8s steps(2, end) infinite;
}
.filter-modal-text {
  font-size: 14px; color: var(--text-sub); font-weight: 500; margin: 0;
}
@keyframes hgSpin { to { transform: rotate(180deg); } }

.fl-enter-active { transition: opacity 0.12s; }
.fl-leave-active { transition: opacity 0.2s; }
.fl-enter-from, .fl-leave-to { opacity: 0; }

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
.result-count-header { font-size: 14px; color: var(--text-sub); margin-top: 6px; font-weight: 500; }

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
  max-height: calc(100vh - 100px);
  overflow-y: auto;
}
.filters h3 { font-size: 15px; font-weight: 700; margin-bottom: 16px; }

.filter-group { margin-bottom: 4px; }
.filter-section-head { width: 100%; display: flex; justify-content: space-between; align-items: center; background: none; border: none; padding: 6px 0; cursor: pointer; font-family: inherit; border-bottom: 1px solid var(--border); margin-bottom: 8px; }
.filter-label-text { font-size: 12px; font-weight: 700; color: var(--text-sub); text-transform: uppercase; letter-spacing: 0.5px; }
.fsarrow { font-size: 10px; color: var(--text-sub); }
.filter-body { padding-bottom: 8px; }

.filter-option {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  padding: 4px 0;
  cursor: pointer;
}
.btn-block { width: 100%; margin-top: 4px; }

/* Price range slider */
.price-range-display { display: flex; justify-content: space-between; font-size: 13px; font-weight: 600; color: var(--primary-dark); margin-bottom: 8px; }
.range-wrap { position: relative; height: 32px; }
.range-slider { position: absolute; width: 100%; top: 50%; transform: translateY(-50%); height: 4px; -webkit-appearance: none; appearance: none; background: transparent; outline: none; pointer-events: none; }
.range-slider::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 18px; height: 18px; border-radius: 50%; background: var(--primary); cursor: pointer; pointer-events: all; border: 2px solid #fff; box-shadow: 0 1px 4px rgba(0,0,0,0.2); }
.range-slider::-moz-range-thumb { width: 18px; height: 18px; border-radius: 50%; background: var(--primary); cursor: pointer; pointer-events: all; border: 2px solid #fff; }

/* Amenity chips */
.amenity-chips { display: flex; flex-wrap: wrap; gap: 6px; }
.amenity-chip {
  padding: 5px 10px; border-radius: 100px; border: 1px solid var(--border);
  background: white; font-size: 12px; color: var(--text-sub); cursor: pointer;
  transition: all 0.15s;
}
.amenity-chip:hover { border-color: var(--primary); color: var(--primary); }
.amenity-chip.active { background: var(--primary); border-color: var(--primary); color: white; font-weight: 600; }

.hotel-cards { display: flex; flex-direction: column; gap: 16px; }
.result-count { font-size: 13px; color: var(--text-sub); margin-bottom: 8px; }

.hotel-card {
  display: grid;
  grid-template-columns: 140px 1fr;
  overflow: hidden;
  transition: all var(--transition);
}
.hotel-card:hover { box-shadow: 0 6px 24px rgba(0,0,0,0.12); transform: translateY(-2px); }
.ad-card { border: 2px solid #f59e0b; }

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
.pr-banner {
  position: absolute; top: 0; right: 0;
  background: #f59e0b; color: #fff;
  font-size: 10px; font-weight: 800;
  padding: 3px 8px; border-radius: 0 0 0 6px;
  letter-spacing: 0.5px;
}

.hotel-body { padding: 16px; display: flex; flex-direction: column; gap: 8px; }
.hotel-name { font-size: 16px; font-weight: 700; }
.pr-label { font-size: 11px; font-weight: 700; color: #f59e0b; margin-left: 6px; }
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
.price-total { font-size: 11px; color: var(--text-sub); margin-left: 4px; }
.price-nodates { font-size: 10px; background: #f1f5f9; color: var(--text-sub); border-radius: 4px; padding: 1px 6px; margin-left: 4px; }

.card-actions { display: flex; align-items: center; gap: 8px; }
.fav-btn {
  width: 36px; height: 36px; border-radius: 50%;
  border: 1.5px solid #fca5a5; background: #fff;
  font-size: 18px; cursor: pointer; color: #fca5a5;
  display: flex; align-items: center; justify-content: center;
  transition: all 0.15s; flex-shrink: 0;
}
.fav-btn:hover { border-color: #ef4444; color: #ef4444; background: #fef2f2; }
.fav-btn.active { color: #ef4444; border-color: #ef4444; background: #fef2f2; }
.detail-btn { padding: 8px 18px; font-size: 13px; }

.empty-state { padding: 40px; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 16px; }

/* ── Breadcrumb ── */
.breadcrumb-nav {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;
  font-size: 13px;
  padding: 8px 0;
  margin-bottom: 16px;
  color: var(--text-sub);
}
.bc-link {
  color: var(--primary-dark);
  font-weight: 500;
  text-decoration: none;
  transition: color var(--transition);
}
.bc-link:hover { color: var(--primary); text-decoration: underline; }
.bc-btn {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  font-size: 13px;
  font-family: inherit;
}
.bc-sep { color: #94a3b8; margin: 0 2px; }
.bc-current { font-weight: 700; color: var(--text); }

/* ── Pagination ── */
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-top: 24px;
  flex-wrap: wrap;
}
.page-btn {
  min-width: 38px;
  height: 38px;
  padding: 0 10px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: #fff;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-sub);
  cursor: pointer;
  transition: all 0.15s;
}
.page-btn:hover:not(:disabled) { border-color: var(--primary); color: var(--primary); }
.page-btn.active {
  background: var(--primary);
  border-color: var(--primary);
  color: #fff;
  font-weight: 700;
}
.page-btn:disabled { opacity: 0.35; cursor: not-allowed; }
.page-nav { padding: 0 14px; }
.page-ellipsis { color: var(--text-sub); font-size: 14px; padding: 0 2px; line-height: 38px; }

@media (max-width: 768px) {
  .list-layout { grid-template-columns: 1fr; }
  .filters { position: static; max-height: none; }
  .hotel-card { grid-template-columns: 100px 1fr; }
  .hotel-img { min-height: 100px; }
  .hotel-emoji { font-size: 36px; }
}

@media (max-width: 480px) {
  .hotel-card { grid-template-columns: 1fr; }
  .hotel-img { min-height: 100px; }
}
</style>
