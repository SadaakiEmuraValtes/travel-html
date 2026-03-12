<template>
  <div class="complete-view">
    <div class="container">
      <div class="complete-card card">
        <div class="check-anim">
          <div class="check-circle">✓</div>
        </div>

        <h1 class="complete-title">予約が完了しました！</h1>
        <p class="complete-sub">ご予約ありがとうございます。以下の内容でご予約を承りました。</p>

        <div class="booking-id">
          <span class="bid-label">予約番号</span>
          <span class="bid-value">{{ booking?.id ?? '---' }}</span>
        </div>

        <div v-if="booking" class="booking-summary">
          <div class="bs-row">
            <span class="bs-label">宿泊先</span>
            <span class="bs-value">{{ booking.hotelEmoji }} {{ booking.hotelName }}</span>
          </div>
          <div class="bs-row">
            <span class="bs-label">場所</span>
            <span class="bs-value">{{ booking.prefName }} / {{ booking.hotelArea }}</span>
          </div>
          <div class="bs-row">
            <span class="bs-label">チェックイン</span>
            <span class="bs-value">{{ booking.checkin }}</span>
          </div>
          <div class="bs-row">
            <span class="bs-label">チェックアウト</span>
            <span class="bs-value">{{ booking.checkout }}</span>
          </div>
          <div class="bs-row">
            <span class="bs-label">泊数・人数</span>
            <span class="bs-value">{{ booking.nights }}泊 {{ booking.guests }}名</span>
          </div>
          <div v-if="booking.transport" class="bs-row">
            <span class="bs-label">移動手段</span>
            <span class="bs-value">{{ transportLabel }} ({{ booking.originPrefName }} → {{ booking.destPrefName }})</span>
          </div>
          <div class="bs-row total-row">
            <span class="bs-label">合計金額</span>
            <span class="bs-total">¥{{ booking.grandTotal?.toLocaleString() }}</span>
          </div>
        </div>

        <p class="demo-note">※ このサービスはデモです。実際の決済・予約確認メールの送信は行いません。</p>

        <div class="complete-btns">
          <router-link to="/my-page" class="btn btn-primary">マイページで予約確認</router-link>
          <router-link to="/" class="btn btn-secondary">トップへ戻る</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { store, getMyBookings } from '../store/index.js'

const booking = computed(() => {
  const id = store.lastCompletedBookingId
  if (!id) return null
  return getMyBookings().find(b => b.id === id) ?? null
})

const transportLabel = computed(() => {
  const t = booking.value?.transport
  if (!t) return ''
  if (t.type === 'flight') return '✈️ 飛行機'
  if (t.type === 'shinkansen') return '🚄 ' + t.line + '新幹線'
  return '🚌 バス・特急'
})
</script>

<style scoped>
.complete-view {
  padding: 60px 0;
  min-height: calc(100vh - 120px);
  display: flex;
  align-items: center;
}

.complete-card {
  max-width: 600px;
  margin: 0 auto;
  padding: 48px 40px;
  text-align: center;
}

.check-anim { margin-bottom: 28px; }
.check-circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: var(--accent);
  color: #fff;
  font-size: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  animation: pop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes pop {
  0%   { transform: scale(0); opacity: 0; }
  60%  { transform: scale(1.2); }
  100% { transform: scale(1); opacity: 1; }
}

.complete-title { font-size: 26px; font-weight: 800; margin-bottom: 8px; }
.complete-sub { color: var(--text-sub); margin-bottom: 24px; }

.booking-id {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  background: #f0f9ff;
  border: 2px solid var(--primary);
  border-radius: 12px;
  padding: 12px 32px;
  margin-bottom: 28px;
}
.bid-label { font-size: 11px; font-weight: 700; color: var(--primary); letter-spacing: 1px; text-transform: uppercase; }
.bid-value { font-size: 16px; font-weight: 800; font-family: monospace; color: var(--text); }

.booking-summary {
  background: #f8fafc;
  border-radius: 12px;
  padding: 20px 24px;
  text-align: left;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.bs-row { display: flex; justify-content: space-between; align-items: center; gap: 12px; }
.bs-label { font-size: 12px; color: var(--text-sub); font-weight: 500; white-space: nowrap; }
.bs-value { font-size: 14px; font-weight: 600; text-align: right; }
.total-row { border-top: 2px solid var(--primary); padding-top: 10px; margin-top: 4px; }
.bs-total { font-size: 20px; font-weight: 800; color: var(--primary); }

.demo-note { font-size: 11px; color: var(--text-sub); margin-bottom: 28px; }

.complete-btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }

@media (max-width: 480px) {
  .complete-card { padding: 32px 20px; }
  .complete-btns { flex-direction: column; }
}
</style>
