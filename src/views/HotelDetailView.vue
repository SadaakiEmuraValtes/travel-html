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

          <!-- Review section -->
          <section v-if="canReview" class="section-card card review-section">
            <h2>宿泊レビュー</h2>

            <div v-if="myReview">
              <p class="review-done">✅ レビュー投稿済み</p>
              <canvas ref="myRadarCanvas" width="240" height="240" class="radar-canvas"></canvas>
              <p class="review-comment">{{ myReview.comment }}</p>
            </div>

            <div v-else class="review-form">
              <p class="review-hint">この宿泊施設の評価を投稿してください</p>
              <div v-for="criterion in CRITERIA" :key="criterion" class="criterion-row">
                <span class="criterion-label">{{ criterion }}</span>
                <div class="star-select">
                  <button v-for="s in 5" :key="s" class="star-btn" :class="{ filled: reviewScores[criterion] >= s }" @click="reviewScores[criterion] = s">★</button>
                </div>
                <span class="score-val">{{ reviewScores[criterion] || '-' }}</span>
              </div>
              <textarea v-model="reviewComment" placeholder="コメント（任意）" class="review-textarea" rows="3"></textarea>
              <button class="btn btn-primary" :disabled="!canSubmitReview" @click="submitReview">レビューを投稿</button>
            </div>
          </section>
        </div>

        <!-- Right: booking panel -->
        <div class="booking-panel card">
          <h2>ご予約</h2>

          <div class="panel-row">
            <label>チェックイン</label>
            <input type="date" v-model="checkin" :min="today" class="input" style="font-family: inherit;" />
          </div>
          <div class="panel-row">
            <label>チェックアウト</label>
            <input type="date" v-model="checkout" :min="checkin || today" class="input" style="font-family: inherit;" />
          </div>

          <!-- Adults -->
          <div class="panel-row">
            <label>大人</label>
            <div class="qty-row">
              <div class="qty-ctrl">
                <button class="qty-btn" :disabled="adults <= 1" @click="adults > 1 && adults--">−</button>
                <span class="qty-val">{{ adults }}</span>
                <button class="qty-btn" :disabled="adults >= 8" @click="adults < 8 && adults++">+</button>
              </div>
            </div>
          </div>

          <!-- Children -->
          <div class="panel-row">
            <label>子供</label>
            <div class="qty-row">
              <div class="qty-ctrl">
                <button class="qty-btn" :disabled="children <= 0" @click="children > 0 && children--">−</button>
                <span class="qty-val">{{ children }}</span>
                <button class="qty-btn" :disabled="children >= 6" @click="children < 6 && children++">+</button>
              </div>
            </div>
          </div>

          <hr class="panel-divider" />

          <!-- Rep name -->
          <div class="panel-row">
            <label>代表者氏名</label>
            <input type="text" v-model="repName" class="input" placeholder="山田 太郎" />
          </div>

          <!-- Rep email -->
          <div class="panel-row">
            <label>代表者メールアドレス</label>
            <input type="email" v-model="repEmail" class="input" placeholder="example@email.com" />
          </div>

          <!-- Car -->
          <div class="panel-row">
            <label>お車でお越しですか？</label>
            <div class="radio-row">
              <label class="radio-opt"><input type="radio" v-model="hasCar" :value="true" /> はい</label>
              <label class="radio-opt"><input type="radio" v-model="hasCar" :value="false" /> いいえ</label>
            </div>
          </div>

          <hr class="panel-divider" />

          <!-- Special request -->
          <div class="panel-row">
            <label>特別リクエスト（任意）</label>
            <textarea v-model="specialRequest" class="input" rows="3" placeholder="アレルギー・記念日など"></textarea>
          </div>

          <hr class="panel-divider" />

          <!-- Payment -->
          <div class="panel-row">
            <label>お支払い方法</label>
            <div class="radio-col">
              <label class="radio-opt"><input type="radio" v-model="paymentMethod" value="card" /> クレジットカード（申込時決済）</label>
              <label class="radio-opt"><input type="radio" v-model="paymentMethod" value="local" /> 現地払い</label>
            </div>
          </div>

          <div v-if="nights > 0" class="price-breakdown">
            <div class="pb-row">
              <span>宿泊料金</span>
              <span>¥{{ hotel.pricePerNight.toLocaleString() }} × {{ nights }}泊 × {{ adults }}名</span>
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
                <span>交通費 ({{ store.draft.tripType === 'roundtrip' ? '往復' : '片道' }} × {{ adults }}名)</span>
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
import { ref, computed, reactive, watch, onMounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { store, isLoggedIn, currentUser, addReview, getUserReview, getMyBookings } from '../store/index.js'
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
const adults   = ref(store.draft.guests   || 2)
const children = ref(0)
const repName  = ref(currentUser()?.name  || '')
const repEmail = ref(currentUser()?.email || '')
const hasCar   = ref(false)
const specialRequest = ref('')
const paymentMethod  = ref('card')

const nights = computed(() => {
  if (!checkin.value || !checkout.value) return 0
  const d = (new Date(checkout.value) - new Date(checkin.value)) / 86400000
  return d > 0 ? Math.round(d) : 0
})

const hotelTotal = computed(() => hotel.value ? hotel.value.pricePerNight * nights.value * adults.value : 0)

const transportTotal = computed(() => {
  if (!store.draft.selectedTransport) return 0
  const base = store.draft.selectedTransport.price * adults.value
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

function doBook() {
  store.draft.checkin      = checkin.value
  store.draft.checkout     = checkout.value
  store.draft.guests       = adults.value
  store.draft.selectedHotelId = hotel.value.id
  // Store extra fields on draft for ConfirmView
  store.draft._extra = {
    adults: adults.value,
    children: children.value,
    repName: repName.value,
    repEmail: repEmail.value,
    hasCar: hasCar.value,
    specialRequest: specialRequest.value,
    paymentMethod: paymentMethod.value,
  }
  router.push('/confirm')
}

// ── Review ──
const CRITERIA = ['清潔さ', '接客', '立地', '設備', 'コスパ']
const reviewScores = reactive({ 清潔さ: 0, 接客: 0, 立地: 0, 設備: 0, コスパ: 0 })
const reviewComment = ref('')
const myRadarCanvas = ref(null)

const canReview = computed(() => {
  if (!isLoggedIn()) return false
  const bookings = getMyBookings()
  return bookings.some(b => b.hotelId === hotel.value?.id)
})

const myReview = computed(() => getUserReview(hotel.value?.id))

const canSubmitReview = computed(() => CRITERIA.every(c => reviewScores[c] > 0))

function submitReview() {
  addReview(hotel.value.id, { ...reviewScores, comment: reviewComment.value })
  nextTick(() => drawRadar(myRadarCanvas.value, myReview.value))
}

watch(myReview, (v) => { if (v) nextTick(() => drawRadar(myRadarCanvas.value, v)) })
onMounted(() => { if (myReview.value) nextTick(() => drawRadar(myRadarCanvas.value, myReview.value)) })

function drawRadar(canvas, scores) {
  if (!canvas || !scores) return
  const ctx = canvas.getContext('2d')
  const W = canvas.width, H = canvas.height
  const cx = W / 2, cy = H / 2
  const R = Math.min(W, H) / 2 - 36
  const criteria = ['清潔さ', '接客', '立地', '設備', 'コスパ']
  const n = criteria.length
  ctx.clearRect(0, 0, W, H)

  // Draw grid circles
  for (let ring = 1; ring <= 5; ring++) {
    ctx.beginPath()
    for (let i = 0; i < n; i++) {
      const angle = (2 * Math.PI * i / n) - Math.PI / 2
      const r = (R * ring) / 5
      const x = cx + r * Math.cos(angle)
      const y = cy + r * Math.sin(angle)
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
    }
    ctx.closePath()
    ctx.strokeStyle = '#e2e8f0'
    ctx.lineWidth = 1
    ctx.stroke()
  }

  // Draw axes
  criteria.forEach((_, i) => {
    const angle = (2 * Math.PI * i / n) - Math.PI / 2
    ctx.beginPath()
    ctx.moveTo(cx, cy)
    ctx.lineTo(cx + R * Math.cos(angle), cy + R * Math.sin(angle))
    ctx.strokeStyle = '#e2e8f0'
    ctx.lineWidth = 1
    ctx.stroke()
  })

  // Draw data polygon
  ctx.beginPath()
  criteria.forEach((c, i) => {
    const score = scores[c] || 0
    const angle = (2 * Math.PI * i / n) - Math.PI / 2
    const r = (R * score) / 5
    const x = cx + r * Math.cos(angle)
    const y = cy + r * Math.sin(angle)
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
  })
  ctx.closePath()
  ctx.fillStyle = 'rgba(14,165,233,0.25)'
  ctx.fill()
  ctx.strokeStyle = '#0ea5e9'
  ctx.lineWidth = 2
  ctx.stroke()

  // Draw dots
  criteria.forEach((c, i) => {
    const score = scores[c] || 0
    const angle = (2 * Math.PI * i / n) - Math.PI / 2
    const r = (R * score) / 5
    ctx.beginPath()
    ctx.arc(cx + r * Math.cos(angle), cy + r * Math.sin(angle), 4, 0, Math.PI * 2)
    ctx.fillStyle = '#0ea5e9'
    ctx.fill()
  })

  // Draw labels
  ctx.fillStyle = '#1e293b'
  ctx.font = 'bold 11px -apple-system, sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  criteria.forEach((c, i) => {
    const angle = (2 * Math.PI * i / n) - Math.PI / 2
    const labelR = R + 22
    const x = cx + labelR * Math.cos(angle)
    const y = cy + labelR * Math.sin(angle)
    ctx.fillText(c, x, y)
  })
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
  box-sizing: border-box;
}
textarea.input { resize: vertical; }

.panel-divider { border: none; border-top: 1px dashed var(--border); margin: 16px 0; }

/* Qty buttons */
.qty-row { display: flex; align-items: center; gap: 12px; }
.qty-label { font-size: 14px; font-weight: 600; min-width: 40px; }
.qty-ctrl { display: flex; align-items: center; gap: 8px; }
.qty-btn {
  width: 32px; height: 32px; border-radius: 50%;
  border: 1.5px solid var(--border); background: #fff;
  color: var(--text); font-size: 18px; font-weight: 700;
  cursor: pointer; display: flex; align-items: center; justify-content: center;
  transition: all 0.15s; line-height: 1;
}
.qty-btn:hover:not(:disabled) { background: var(--primary); color: #fff; border-color: var(--primary); }
.qty-btn:disabled { opacity: 0.3; cursor: not-allowed; }
.qty-val { font-size: 16px; font-weight: 700; min-width: 24px; text-align: center; }

/* Radio */
.radio-row, .radio-col { display: flex; gap: 16px; flex-wrap: wrap; }
.radio-col { flex-direction: column; gap: 8px; }
.radio-opt { display: flex; align-items: center; gap: 6px; font-size: 13px; cursor: pointer; }

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

/* Review section */
.review-section { }
.review-done { color: var(--accent); font-weight: 600; margin-bottom: 12px; }
.radar-canvas { display: block; margin: 0 auto 12px; }
.review-comment { font-size: 14px; color: var(--text-sub); font-style: italic; }
.review-hint { font-size: 13px; color: var(--text-sub); margin-bottom: 16px; }
.criterion-row { display: flex; align-items: center; gap: 12px; margin-bottom: 10px; }
.criterion-label { font-size: 13px; font-weight: 600; min-width: 44px; }
.star-select { display: flex; gap: 2px; }
.star-btn { background: none; border: none; font-size: 20px; cursor: pointer; color: #d1d5db; padding: 0; line-height: 1; }
.star-btn.filled { color: #f59e0b; }
.score-val { font-size: 13px; font-weight: 700; min-width: 16px; color: var(--text-sub); }
.review-textarea { width: 100%; padding: 10px; border: 1px solid var(--border); border-radius: 8px; font-size: 14px; font-family: inherit; resize: vertical; margin: 12px 0; box-sizing: border-box; }

@media (max-width: 900px) {
  .detail-body { grid-template-columns: 1fr; }
  .booking-panel { position: static; }
}
</style>
