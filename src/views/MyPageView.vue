<template>
  <div class="my-page">
    <div class="container">
      <h1 class="page-title">マイページ</h1>

      <!-- User Card -->
      <div class="user-card card">
        <div class="avatar">{{ user?.name?.slice(0, 1) }}</div>
        <div class="user-info">
          <div class="user-name">{{ user?.name }}</div>
          <div class="user-email">{{ user?.email }}</div>
          <div v-if="userPref" class="user-pref">
            <span class="badge badge-primary">📍 {{ userPref.name }}在住</span>
          </div>
        </div>
      </div>

      <!-- Bookings -->
      <section class="bookings-section">
        <h2 class="section-title">予約履歴</h2>
        <p class="section-sub">{{ bookings.length }}件の予約</p>

        <!-- Skeleton loading -->
        <div v-if="isLoadingHistory" class="skeleton-list">
          <div v-for="n in 3" :key="n" class="skeleton-card">
            <div class="sk-line sk-title"></div>
            <div class="sk-line sk-meta"></div>
            <div class="sk-line sk-meta sk-short"></div>
            <div class="sk-line sk-price"></div>
          </div>
        </div>

        <template v-else>
          <div v-if="bookings.length === 0" class="empty-state card">
            <div class="empty-icon">📋</div>
            <p>予約履歴はありません</p>
            <router-link to="/" class="btn btn-primary">旅行を探す</router-link>
          </div>

          <div v-else class="booking-list">
            <div v-for="b in bookings" :key="b.id" class="booking-card card">
              <div class="bc-header">
                <div class="bc-id">
                  <span class="bid-label">予約番号</span>
                  <span class="bid">{{ b.id }}</span>
                </div>
                <span class="status-badge badge badge-accent">確認済み</span>
              </div>

              <div class="bc-body">
                <div class="bc-hotel">
                  <span class="hotel-emoji">{{ b.hotelEmoji }}</span>
                  <div>
                    <div class="hotel-name">{{ b.hotelName }}</div>
                    <div class="hotel-loc">📍 {{ b.prefName }} / {{ b.hotelArea }}</div>
                  </div>
                </div>

                <div class="bc-details">
                  <div class="bd-row">
                    <span class="bd-label">チェックイン</span>
                    <span>{{ b.checkin }}</span>
                  </div>
                  <div class="bd-row">
                    <span class="bd-label">チェックアウト</span>
                    <span>{{ b.checkout }}</span>
                  </div>
                  <div class="bd-row">
                    <span class="bd-label">泊数・人数</span>
                    <span>{{ b.nights }}泊 {{ b.guests }}名</span>
                  </div>
                  <template v-if="b.transport">
                    <div class="bd-row">
                      <span class="bd-label">移動手段</span>
                      <span>{{ getTransportLabel(b.transport) }}</span>
                    </div>
                    <div class="bd-row">
                      <span class="bd-label">経路</span>
                      <span>{{ b.originPrefName }} → {{ b.destPrefName }}</span>
                    </div>
                  </template>
                </div>
              </div>

              <div class="bc-footer">
                <div class="bc-date">予約日: {{ formatDate(b.createdAt) }}</div>
                <div class="bc-footer-right">
                  <button
                    v-if="getUserReview(b.hotelId)"
                    class="review-toggle-btn"
                    @click="toggleReview(b.id)"
                  >⭐ レビューを{{ expandedReview === b.id ? '閉じる' : '見る' }}</button>
                  <div class="bc-total">¥{{ b.grandTotal?.toLocaleString() }}</div>
                </div>
              </div>

              <!-- Expanded review -->
              <div v-if="expandedReview === b.id && getUserReview(b.hotelId)" class="review-expanded">
                <canvas
                  :ref="el => { if (el) radarCanvases[b.id] = el }"
                  width="200"
                  height="200"
                  class="radar-small"
                ></canvas>
                <p class="review-comment-text">{{ getUserReview(b.hotelId).comment }}</p>
              </div>
            </div>
          </div>
        </template>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick, onMounted } from 'vue'
import { currentUser, getMyBookings, getUserReview } from '../store/index.js'
import { getPrefById } from '../data/prefectures.js'

const user = computed(() => currentUser())
const userPref = computed(() => user.value?.prefecture ? getPrefById(user.value.prefecture) : null)
const bookings = computed(() => getMyBookings())

const isLoadingHistory = ref(true)
const expandedReview = ref(null)
const radarCanvases = ref({})

onMounted(async () => {
  await new Promise(r => setTimeout(r, 1500))
  isLoadingHistory.value = false
})

function toggleReview(bookingId) {
  expandedReview.value = expandedReview.value === bookingId ? null : bookingId
}

watch(expandedReview, async (bookingId) => {
  if (!bookingId) return
  await nextTick()
  const booking = bookings.value.find(b => b.id === bookingId)
  if (!booking) return
  const review = getUserReview(booking.hotelId)
  if (!review) return
  const canvas = radarCanvases.value[bookingId]
  if (canvas) drawRadar(canvas, review)
})

function drawRadar(canvas, scores) {
  if (!canvas || !scores) return
  const ctx = canvas.getContext('2d')
  const W = canvas.width, H = canvas.height
  const cx = W / 2, cy = H / 2
  const R = Math.min(W, H) / 2 - 28
  const criteria = ['清潔さ', '接客', '立地', '設備', 'コスパ']
  const n = criteria.length
  ctx.clearRect(0, 0, W, H)

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

  criteria.forEach((_, i) => {
    const angle = (2 * Math.PI * i / n) - Math.PI / 2
    ctx.beginPath()
    ctx.moveTo(cx, cy)
    ctx.lineTo(cx + R * Math.cos(angle), cy + R * Math.sin(angle))
    ctx.strokeStyle = '#e2e8f0'
    ctx.lineWidth = 1
    ctx.stroke()
  })

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

  criteria.forEach((c, i) => {
    const score = scores[c] || 0
    const angle = (2 * Math.PI * i / n) - Math.PI / 2
    const r = (R * score) / 5
    ctx.beginPath()
    ctx.arc(cx + r * Math.cos(angle), cy + r * Math.sin(angle), 3, 0, Math.PI * 2)
    ctx.fillStyle = '#0ea5e9'
    ctx.fill()
  })

  ctx.fillStyle = '#1e293b'
  ctx.font = 'bold 9px -apple-system, sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  criteria.forEach((c, i) => {
    const angle = (2 * Math.PI * i / n) - Math.PI / 2
    const labelR = R + 18
    const x = cx + labelR * Math.cos(angle)
    const y = cy + labelR * Math.sin(angle)
    ctx.fillText(c, x, y)
  })
}

function getTransportLabel(t) {
  if (!t) return ''
  if (t.type === 'flight') return '✈️ 飛行機'
  if (t.type === 'shinkansen') return '🚄 ' + t.line + '新幹線'
  return '🚌 バス・特急'
}

function formatDate(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  return d.toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })
}
</script>

<style scoped>
.my-page { padding: 32px 0 60px; }
.page-title { font-size: 26px; font-weight: 800; margin-bottom: 24px; }

.user-card {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 24px;
  margin-bottom: 36px;
}

.avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary), var(--primary-dark));
  color: #fff;
  font-size: 26px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.user-info { display: flex; flex-direction: column; gap: 4px; }
.user-name { font-size: 20px; font-weight: 700; }
.user-email { font-size: 14px; color: var(--text-sub); }

.section-title { font-size: 20px; font-weight: 700; margin-bottom: 4px; }
.section-sub { font-size: 13px; color: var(--text-sub); margin-bottom: 20px; }

/* Skeleton */
@keyframes shimmer { 0% { background-position: -200% 0 } 100% { background-position: 200% 0 } }
.sk-line {
  border-radius: 6px; margin-bottom: 10px;
  background: linear-gradient(90deg, #e2e8f0 25%, #f1f5f9 50%, #e2e8f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}
.skeleton-card { background: #fff; border-radius: 12px; padding: 20px; margin-bottom: 16px; border: 1px solid var(--border); }
.sk-title { height: 20px; width: 60%; }
.sk-meta { height: 14px; width: 80%; }
.sk-short { width: 40%; }
.sk-price { height: 18px; width: 30%; }

.empty-state {
  padding: 48px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}
.empty-icon { font-size: 48px; }
.empty-state p { color: var(--text-sub); }

.booking-list { display: flex; flex-direction: column; gap: 20px; }

.booking-card { overflow: hidden; }

.bc-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  background: #f8fafc;
  border-bottom: 1px solid var(--border);
}

.bid-label { font-size: 11px; color: var(--text-sub); display: block; }
.bid { font-size: 13px; font-weight: 700; font-family: monospace; color: var(--primary); }

.bc-body { padding: 20px; display: grid; grid-template-columns: auto 1fr; gap: 20px; }

.bc-hotel {
  display: flex;
  align-items: center;
  gap: 14px;
  padding-right: 20px;
  border-right: 1px solid var(--border);
}
.hotel-emoji { font-size: 40px; }
.hotel-name { font-size: 16px; font-weight: 700; margin-bottom: 4px; }
.hotel-loc { font-size: 12px; color: var(--text-sub); }

.bc-details { display: flex; flex-direction: column; gap: 8px; }
.bd-row { display: flex; gap: 12px; font-size: 13px; }
.bd-label { color: var(--text-sub); min-width: 90px; }

.bc-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  background: #f0f9ff;
  border-top: 1px solid var(--border);
}
.bc-date { font-size: 12px; color: var(--text-sub); }
.bc-footer-right { display: flex; align-items: center; gap: 16px; }
.bc-total { font-size: 20px; font-weight: 800; color: var(--primary); }

.review-toggle-btn {
  background: none;
  border: 1px solid var(--primary);
  color: var(--primary);
  font-size: 12px;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.15s;
  font-family: inherit;
}
.review-toggle-btn:hover { background: var(--primary); color: #fff; }

/* Expanded review */
.review-expanded {
  padding: 16px 20px;
  border-top: 1px solid var(--border);
  background: #f8fafc;
  display: flex;
  align-items: center;
  gap: 16px;
}
.radar-small { flex-shrink: 0; }
.review-comment-text { font-size: 13px; color: var(--text-sub); font-style: italic; }

@media (max-width: 640px) {
  .bc-body { grid-template-columns: 1fr; }
  .bc-hotel { border-right: none; border-bottom: 1px solid var(--border); padding-right: 0; padding-bottom: 16px; }
  .review-expanded { flex-direction: column; }
}
</style>
