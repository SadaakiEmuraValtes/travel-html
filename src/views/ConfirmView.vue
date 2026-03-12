<template>
  <div class="confirm-view">
    <div class="container">
      <h1 class="page-title">予約内容の確認</h1>
      <p class="page-sub">以下の内容で予約を確定してください</p>

      <div v-if="!hotel || !user" class="error-state card">
        <p>予約情報が見つかりません。</p>
        <router-link to="/" class="btn btn-primary">トップへ戻る</router-link>
      </div>

      <template v-else>
        <div class="confirm-layout">
          <div class="confirm-main">
            <!-- Hotel Info -->
            <section class="confirm-section card">
              <h2>宿泊先</h2>
              <div class="hotel-summary">
                <div class="hotel-emoji-sm">{{ hotel.emoji }}</div>
                <div>
                  <div class="hotel-name">{{ hotel.name }}</div>
                  <div class="hotel-loc">📍 {{ pref?.name }} / {{ hotel.area }}</div>
                  <div class="stars">{{ '★'.repeat(hotel.stars) }}</div>
                </div>
              </div>
            </section>

            <!-- Dates & Guests -->
            <section class="confirm-section card">
              <h2>旅程</h2>
              <div class="info-grid">
                <div class="info-row">
                  <span class="info-label">チェックイン</span>
                  <span class="info-value">{{ store.draft.checkin }}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">チェックアウト</span>
                  <span class="info-value">{{ store.draft.checkout }}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">泊数</span>
                  <span class="info-value">{{ nights }}泊</span>
                </div>
                <div class="info-row">
                  <span class="info-label">人数</span>
                  <span class="info-value">{{ store.draft.guests }}名</span>
                </div>
              </div>
            </section>

            <!-- Transport (package only) -->
            <section v-if="store.draft.mode === 'package' && store.draft.selectedTransport" class="confirm-section card">
              <h2>移動手段</h2>
              <div class="info-grid">
                <div class="info-row">
                  <span class="info-label">経路</span>
                  <span class="info-value">{{ originPref?.name }} → {{ destPref?.name }}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">手段</span>
                  <span class="info-value">{{ transportLabel }}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">所要時間</span>
                  <span class="info-value">{{ formatDuration(store.draft.selectedTransport.minutes) }}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">旅程タイプ</span>
                  <span class="info-value">{{ store.draft.tripType === 'roundtrip' ? '往復' : '片道' }}</span>
                </div>
              </div>
            </section>

            <!-- User Info -->
            <section class="confirm-section card">
              <h2>利用者情報</h2>
              <div class="info-grid">
                <div class="info-row">
                  <span class="info-label">代表者氏名</span>
                  <span class="info-value">{{ extra.repName || user.name }}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">メールアドレス</span>
                  <span class="info-value">{{ extra.repEmail || user.email }}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">大人 / 子供</span>
                  <span class="info-value">{{ extra.adults || store.draft.guests }}名 / {{ extra.children || 0 }}名</span>
                </div>
                <div class="info-row">
                  <span class="info-label">お車でのご来館</span>
                  <span class="info-value">{{ extra.hasCar ? 'はい' : 'いいえ' }}</span>
                </div>
                <div v-if="extra.specialRequest" class="info-row">
                  <span class="info-label">特別リクエスト</span>
                  <span class="info-value">{{ extra.specialRequest }}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">お支払い方法</span>
                  <span class="info-value">{{ extra.paymentMethod === 'card' ? 'クレジットカード' : '現地払い' }}</span>
                </div>
              </div>
            </section>
          </div>

          <!-- Price Summary -->
          <div class="price-panel card">
            <h2>料金内訳</h2>

            <div class="price-rows">
              <div class="pr-row">
                <span>宿泊料金 (1泊)</span>
                <span>¥{{ hotel.pricePerNight.toLocaleString() }}</span>
              </div>
              <div class="pr-row">
                <span>× {{ nights }}泊 × {{ store.draft.guests }}名</span>
                <span>¥{{ hotelTotal.toLocaleString() }}</span>
              </div>

              <template v-if="store.draft.mode === 'package' && store.draft.selectedTransport">
                <div class="pr-separator"></div>
                <div class="pr-row">
                  <span>交通費 ({{ store.draft.tripType === 'roundtrip' ? '往復' : '片道' }})</span>
                  <span>¥{{ store.draft.selectedTransport.price.toLocaleString() }}/人</span>
                </div>
                <div class="pr-row">
                  <span>× {{ store.draft.guests }}名{{ store.draft.tripType === 'roundtrip' ? ' × 2' : '' }}</span>
                  <span>¥{{ transportTotal.toLocaleString() }}</span>
                </div>
              </template>

              <div class="pr-separator"></div>
              <div class="pr-total">
                <span>合計金額</span>
                <span>¥{{ grandTotal.toLocaleString() }}</span>
              </div>
            </div>

            <p class="demo-notice">※ このサービスはデモです。実際の決済は行いません。</p>

            <div class="confirm-actions">
              <button class="btn btn-secondary" @click="router.go(-1)">← 修正する</button>
              <button class="btn btn-primary confirm-btn" @click="doConfirm">予約を確定する</button>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { store, currentUser, addBooking, resetDraft } from '../store/index.js'
import { getHotelById } from '../data/hotels.js'
import { getPrefById } from '../data/prefectures.js'
import { formatDuration } from '../data/transport.js'

const router = useRouter()

const hotel     = computed(() => store.draft.selectedHotelId ? getHotelById(store.draft.selectedHotelId) : null)
const user      = computed(() => currentUser())
const pref      = computed(() => hotel.value ? getPrefById(hotel.value.prefId) : null)
const extra     = computed(() => store.draft._extra || {})
const destPref  = computed(() => store.draft.destPrefId   ? getPrefById(store.draft.destPrefId)   : null)
const originPref = computed(() => store.draft.originPrefId ? getPrefById(store.draft.originPrefId) : null)

const nights = computed(() => {
  if (!store.draft.checkin || !store.draft.checkout) return 0
  const d = (new Date(store.draft.checkout) - new Date(store.draft.checkin)) / 86400000
  return d > 0 ? Math.round(d) : 0
})

const hotelTotal = computed(() => hotel.value ? hotel.value.pricePerNight * nights.value * store.draft.guests : 0)

const transportTotal = computed(() => {
  if (!store.draft.selectedTransport) return 0
  const base = store.draft.selectedTransport.price * store.draft.guests
  return store.draft.tripType === 'roundtrip' ? base * 2 : base
})

const grandTotal = computed(() => hotelTotal.value + transportTotal.value)

const transportLabel = computed(() => {
  const t = store.draft.selectedTransport
  if (!t) return ''
  if (t.type === 'flight') return '✈️ 飛行機'
  if (t.type === 'shinkansen') return '🚄 ' + t.line + '新幹線'
  return '🚌 バス・特急'
})

function doConfirm() {
  if (!hotel.value || !user.value) return

  const booking = {
    hotelId: hotel.value.id,
    hotelName: hotel.value.name,
    hotelEmoji: hotel.value.emoji,
    hotelArea: hotel.value.area,
    prefId: hotel.value.prefId,
    prefName: pref.value?.name,
    checkin: store.draft.checkin,
    checkout: store.draft.checkout,
    nights: nights.value,
    guests: store.draft.guests,
    hotelTotal: hotelTotal.value,
    mode: store.draft.mode,
    tripType: store.draft.tripType,
    transport: store.draft.mode === 'package' ? store.draft.selectedTransport : null,
    originPrefId: store.draft.originPrefId,
    originPrefName: originPref.value?.name,
    destPrefId: store.draft.destPrefId,
    destPrefName: destPref.value?.name,
    transportTotal: transportTotal.value,
    grandTotal: grandTotal.value,
    ...(store.draft._extra || {}),
  }

  addBooking(booking)
  resetDraft()
  router.push('/complete')
}
</script>

<style scoped>
.confirm-view { padding: 32px 0 60px; }
.page-title { font-size: 26px; font-weight: 800; margin-bottom: 6px; }
.page-sub { color: var(--text-sub); margin-bottom: 28px; }

.error-state { padding: 40px; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 16px; }

.confirm-layout {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 24px;
  align-items: start;
}

.confirm-main { display: flex; flex-direction: column; gap: 20px; }

.confirm-section { padding: 24px; }
.confirm-section h2 { font-size: 15px; font-weight: 700; color: var(--text-sub); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 16px; border-bottom: 1px solid var(--border); padding-bottom: 8px; }

.hotel-summary { display: flex; align-items: center; gap: 16px; }
.hotel-emoji-sm { font-size: 42px; }
.hotel-name { font-size: 18px; font-weight: 700; margin-bottom: 4px; }
.hotel-loc { font-size: 13px; color: var(--text-sub); margin-bottom: 4px; }
.stars { color: #f59e0b; }

.info-grid { display: flex; flex-direction: column; gap: 10px; }
.info-row { display: flex; justify-content: space-between; align-items: center; }
.info-label { font-size: 13px; color: var(--text-sub); }
.info-value { font-size: 14px; font-weight: 600; }

/* Price Panel */
.price-panel { padding: 24px; position: sticky; top: 80px; }
.price-panel h2 { font-size: 16px; font-weight: 700; margin-bottom: 20px; }

.price-rows { display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px; }
.pr-row { display: flex; justify-content: space-between; font-size: 13px; color: var(--text-sub); }
.pr-separator { border-top: 1px dashed var(--border); margin: 6px 0; }
.pr-total { display: flex; justify-content: space-between; font-size: 20px; font-weight: 800; color: var(--primary); border-top: 2px solid var(--primary); padding-top: 12px; margin-top: 4px; }

.demo-notice { font-size: 11px; color: var(--text-sub); text-align: center; margin-bottom: 16px; }

.confirm-actions { display: flex; flex-direction: column; gap: 10px; }
.confirm-btn { padding: 14px; font-size: 15px; width: 100%; }

@media (max-width: 900px) {
  .confirm-layout { grid-template-columns: 1fr; }
  .price-panel { position: static; }
  .confirm-actions { flex-direction: row; }
}

@media (max-width: 480px) {
  .confirm-actions { flex-direction: column; }
}
</style>
