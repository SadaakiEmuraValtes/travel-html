<template>
  <div class="hotel-detail">
    <div v-if="!hotel" class="not-found container">
      <p>ホテルが見つかりません。</p>
      <router-link to="/hotels" class="btn btn-primary">一覧に戻る</router-link>
    </div>

    <template v-else>
      <!-- Header -->
      <div class="hotel-hero">
        <div :class="['hero-bg', hotelTypeClass]">
          <span class="hero-emoji">{{ hotel.emoji }}</span>
        </div>
        <div class="container">
          <div class="hero-info">
            <div class="hero-badges">
              <span class="badge" :class="typeBadgeClass">{{ typeLabel }}</span>
              <span class="stars">{{ '★'.repeat(hotel.stars) }}{{ '☆'.repeat(5 - hotel.stars) }}</span>
            </div>
            <h1 class="hero-name">{{ hotel.name }}</h1>
            <div class="hero-meta">
              <span>📍 {{ pref?.name }} / {{ hotel.area }}</span>
              <span class="rating-badge">⭐ {{ hotel.rating }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="container detail-body">
        <!-- Left: details -->
        <div class="detail-main">
          <section class="section-card card">
            <h2>ホテルについて</h2>
            <p class="description">{{ hotel.description }}</p>
          </section>

          <section class="section-card card">
            <h2>設備・サービス</h2>
            <div class="amenities-grid">
              <span v-for="a in hotel.amenities" :key="a" class="amenity-item">
                ✓ {{ a }}
              </span>
            </div>
          </section>

          <section class="section-card card">
            <h2>アクセス・エリア</h2>
            <p>📍 {{ pref?.name }}県 / {{ hotel.area }}エリア</p>
            <div class="kana">{{ pref?.kana }}</div>
          </section>
        </div>

        <!-- Right: booking panel -->
        <div class="booking-panel card">
          <h2>ご予約</h2>

          <div class="panel-row">
            <label>チェックイン</label>
            <input type="date" v-model="checkin" :min="today" class="input" />
          </div>
          <div class="panel-row">
            <label>チェックアウト</label>
            <input type="date" v-model="checkout" :min="checkin || today" class="input" />
          </div>
          <div class="panel-row">
            <label>人数</label>
            <div class="guests-ctrl">
              <button @click="changeGuests(-1)">−</button>
              <span>{{ guests }}名</span>
              <button @click="changeGuests(1)">+</button>
            </div>
          </div>

          <div v-if="nights > 0" class="price-breakdown">
            <div class="pb-row">
              <span>宿泊料金</span>
              <span>¥{{ hotel.pricePerNight.toLocaleString() }} × {{ nights }}泊 × {{ guests }}名</span>
            </div>
            <div class="pb-row hotel-total">
              <span>宿泊合計</span>
              <span>¥{{ hotelTotal.toLocaleString() }}</span>
            </div>

            <template v-if="store.draft.mode === 'package' && store.draft.selectedTransport">
              <div class="transport-info">
                <div class="ti-label">移動手段</div>
                <div class="ti-row">
                  <span>{{ transportLabel }}</span>
                  <span>{{ formatDuration(store.draft.selectedTransport.minutes) }}</span>
                </div>
              </div>
              <div class="pb-row">
                <span>交通費 ({{ store.draft.tripType === 'roundtrip' ? '往復' : '片道' }} × {{ guests }}名)</span>
                <span>¥{{ transportTotal.toLocaleString() }}</span>
              </div>
            </template>

            <div class="pb-total">
              <span>合計金額</span>
              <span>¥{{ grandTotal.toLocaleString() }}</span>
            </div>
          </div>

          <div v-else class="price-hint">
            チェックインとチェックアウトを選択してください
          </div>

          <div v-if="!isLoggedIn()" class="login-notice">
            <p>予約にはログインが必要です</p>
            <router-link to="/login" class="btn btn-outline btn-block">ログインする</router-link>
          </div>
          <button
            v-else
            class="btn btn-primary btn-block book-btn"
            :disabled="nights <= 0"
            @click="doBook"
          >
            予約する
          </button>

          <p class="disclaimer">※ このサービスはデモです。実際の決済は行いません。</p>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { store, isLoggedIn } from '../store/index.js'
import { getHotelById } from '../data/hotels.js'
import { getPrefById } from '../data/prefectures.js'
import { formatDuration } from '../data/transport.js'

const route  = useRoute()
const router = useRouter()

const hotel  = computed(() => getHotelById(parseInt(route.params.id)))
const pref   = computed(() => hotel.value ? getPrefById(hotel.value.prefId) : null)

const today    = new Date().toLocaleDateString('sv-SE')
const tomorrow = new Date(Date.now() + 86400000).toLocaleDateString('sv-SE')

const checkin  = ref(store.draft.checkin  || today)
const checkout = ref(store.draft.checkout || tomorrow)
const guests   = ref(store.draft.guests   || 2)

const nights = computed(() => {
  if (!checkin.value || !checkout.value) return 0
  const d = (new Date(checkout.value) - new Date(checkin.value)) / 86400000
  return d > 0 ? Math.round(d) : 0
})

const hotelTotal = computed(() => hotel.value ? hotel.value.pricePerNight * nights.value * guests.value : 0)

const transportTotal = computed(() => {
  if (!store.draft.selectedTransport) return 0
  const base = store.draft.selectedTransport.price * guests.value
  return store.draft.tripType === 'roundtrip' ? base * 2 : base
})

const grandTotal = computed(() => hotelTotal.value + transportTotal.value)

const typeLabel     = computed(() => hotel.value?.type === 'hotel' ? 'ホテル' : hotel.value?.type === 'ryokan' ? '旅館' : 'リゾート')
const typeBadgeClass = computed(() => hotel.value?.type === 'hotel' ? 'badge-primary' : hotel.value?.type === 'ryokan' ? 'badge-warning' : 'badge-accent')
const hotelTypeClass = computed(() => hotel.value?.type === 'hotel' ? 'bg-hotel' : hotel.value?.type === 'ryokan' ? 'bg-ryokan' : 'bg-resort')

const transportLabel = computed(() => {
  const t = store.draft.selectedTransport
  if (!t) return ''
  if (t.type === 'flight') return '✈️ 飛行機'
  if (t.type === 'shinkansen') return '🚄 ' + t.line + '新幹線'
  return '🚌 バス・特急'
})

function changeGuests(d) {
  const v = guests.value + d
  if (v >= 1 && v <= 8) guests.value = v
}

function doBook() {
  store.draft.checkin      = checkin.value
  store.draft.checkout     = checkout.value
  store.draft.guests       = guests.value
  store.draft.selectedHotelId = hotel.value.id
  router.push('/confirm')
}
</script>

<style scoped>
.hotel-detail { padding-bottom: 60px; }
.not-found { padding: 60px 0; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 20px; }

.hotel-hero { margin-bottom: 32px; }
.hero-bg {
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.bg-hotel  { background: linear-gradient(135deg, #e0f2fe, #bae6fd); }
.bg-ryokan { background: linear-gradient(135deg, #fef3c7, #fde68a); }
.bg-resort { background: linear-gradient(135deg, #dcfce7, #bbf7d0); }
.hero-emoji { font-size: 80px; }

.hero-info { padding: 24px 0; }
.hero-badges { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
.stars { color: #f59e0b; font-size: 16px; letter-spacing: 2px; }
.hero-name { font-size: 28px; font-weight: 800; margin-bottom: 8px; }
.hero-meta { display: flex; align-items: center; gap: 16px; color: var(--text-sub); font-size: 14px; }
.rating-badge { font-weight: 700; color: #92400e; background: #fef3c7; padding: 2px 10px; border-radius: 999px; }

.detail-body {
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 28px;
  align-items: start;
}

.detail-main { display: flex; flex-direction: column; gap: 20px; }

.section-card { padding: 24px; }
.section-card h2 { font-size: 16px; font-weight: 700; margin-bottom: 14px; border-bottom: 2px solid var(--primary); padding-bottom: 8px; }
.description { font-size: 15px; line-height: 1.7; color: var(--text); }
.kana { font-size: 12px; color: var(--text-sub); margin-top: 4px; }

.amenities-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 8px;
}
.amenity-item { font-size: 13px; color: var(--accent); font-weight: 500; }

/* Booking Panel */
.booking-panel { padding: 24px; position: sticky; top: 80px; }
.booking-panel h2 { font-size: 18px; font-weight: 700; margin-bottom: 20px; }

.panel-row { margin-bottom: 14px; }
.panel-row label { display: block; font-size: 12px; font-weight: 600; color: var(--text-sub); margin-bottom: 4px; }

.input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid var(--border);
  border-radius: 8px;
  font-size: 14px;
  font-family: inherit;
  background: #f8fafc;
}

.guests-ctrl {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 8px 12px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: #f8fafc;
}
.guests-ctrl button {
  width: 28px; height: 28px;
  border-radius: 50%;
  border: 1px solid var(--border);
  background: #fff;
  font-size: 16px;
  display: flex; align-items: center; justify-content: center;
}
.guests-ctrl span { font-size: 15px; font-weight: 600; }

.price-breakdown {
  background: #f8fafc;
  border-radius: 10px;
  padding: 16px;
  margin: 16px 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.pb-row {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: var(--text-sub);
}
.hotel-total { font-weight: 600; color: var(--text); border-top: 1px solid var(--border); padding-top: 8px; }
.pb-total {
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  font-weight: 800;
  color: var(--primary);
  border-top: 2px solid var(--primary);
  padding-top: 10px;
  margin-top: 4px;
}

.transport-info {
  background: #dcfce7;
  border-radius: 8px;
  padding: 10px 12px;
  margin: 4px 0;
}
.ti-label { font-size: 11px; font-weight: 600; color: #166534; margin-bottom: 4px; }
.ti-row { display: flex; justify-content: space-between; font-size: 13px; }

.price-hint { color: var(--text-sub); font-size: 13px; margin: 16px 0; text-align: center; }

.login-notice { text-align: center; margin: 16px 0; }
.login-notice p { font-size: 13px; color: var(--text-sub); margin-bottom: 10px; }

.btn-block { width: 100%; }
.book-btn { padding: 14px; font-size: 16px; margin-top: 8px; }
.book-btn:disabled { opacity: 0.4; cursor: not-allowed; }

.disclaimer { font-size: 11px; color: var(--text-sub); text-align: center; margin-top: 12px; }

@media (max-width: 900px) {
  .detail-body { grid-template-columns: 1fr; }
  .booking-panel { position: static; }
}
</style>
