<template>
  <div class="package-view">
    <!-- Loading overlay -->
    <div v-if="isSearching" class="loading-overlay">
      <div class="loading-card">
        <div class="spinner"></div>
        <p class="loading-text">空席・料金を検索中...</p>
        <p class="loading-sub">少々お待ちください</p>
      </div>
    </div>

    <div class="container">
      <h1 class="page-title">交通 + 宿泊セット検索</h1>
      <p class="page-sub">移動手段と宿泊をまとめて手配できます</p>

      <div class="pkg-form card">
        <div class="form-section">
          <h2>旅程の設定</h2>
          <div class="form-row">
            <div class="form-field">
              <label>出発地</label>
              <button class="select-btn" @click="router.push('/search?mode=origin')">
                {{ originPref ? originPref.name : '出発地を選ぶ' }}
                <span class="arrow">›</span>
              </button>
            </div>
            <div class="arrow-center">→</div>
            <div class="form-field">
              <label>目的地</label>
              <button class="select-btn" @click="router.push('/search?mode=dest')">
                {{ destPref ? destPref.name : '目的地を選ぶ' }}
                <span class="arrow">›</span>
              </button>
            </div>
          </div>

          <div class="form-row">
            <div class="form-field">
              <label>チェックイン</label>
              <input type="date" v-model="store.draft.checkin" :min="today" class="input" />
            </div>
            <div class="form-field">
              <label>チェックアウト</label>
              <input type="date" v-model="store.draft.checkout" :min="store.draft.checkin || today" class="input" />
            </div>
            <div class="form-field">
              <label>人数</label>
              <div class="guests-ctrl">
                <button @click="changeGuests(-1)">−</button>
                <span>{{ store.draft.guests }}名</span>
                <button @click="changeGuests(1)">+</button>
              </div>
            </div>
          </div>

          <div class="form-row">
            <div class="form-field">
              <label>旅程タイプ</label>
              <div class="radio-group">
                <label class="radio-label">
                  <input type="radio" v-model="store.draft.tripType" value="roundtrip" />
                  往復
                </label>
                <label class="radio-label">
                  <input type="radio" v-model="store.draft.tripType" value="oneway" />
                  片道
                </label>
              </div>
            </div>
            <div class="form-field">
              <label>移動手段</label>
              <div class="radio-group">
                <label class="radio-label"><input type="radio" v-model="store.draft.transportType" value="any" /> おまかせ</label>
                <label class="radio-label"><input type="radio" v-model="store.draft.transportType" value="flight" /> 飛行機</label>
                <label class="radio-label"><input type="radio" v-model="store.draft.transportType" value="shinkansen" /> 新幹線</label>
              </div>
            </div>
          </div>

          <button class="btn btn-accent search-btn" @click="doSearch" :disabled="!canSearch || isSearching">
            空席・料金を検索
          </button>
          <p v-if="!canSearch" class="hint-text">出発地と目的地を選択してください</p>
        </div>
      </div>

      <!-- Results -->
      <div v-if="showResults" class="results-section">
        <h2>移動手段の選択</h2>
        <p class="results-sub">{{ originPref?.name }} → {{ destPref?.name }}　{{ store.draft.tripType === 'roundtrip' ? '（往復）' : '（片道）' }}</p>

        <div v-if="filteredOptions.length === 0" class="empty-state card">
          <p>条件に合う移動手段が見つかりませんでした。</p>
          <p class="hint-text">移動手段を「おまかせ」に変更してお試しください。</p>
        </div>

        <div class="transport-cards">
          <div
            v-for="opt in filteredOptions"
            :key="opt.type + opt.line"
            class="transport-card card"
            :class="{ selected: isSelected(opt) }"
            @click="selectTransport(opt)"
          >
            <div class="tc-icon">{{ opt.type === 'flight' ? '✈️' : opt.type === 'shinkansen' ? '🚄' : '🚌' }}</div>
            <div class="tc-info">
              <div class="tc-name">
                {{ opt.type === 'flight' ? '飛行機' : opt.type === 'shinkansen' ? `${opt.line}新幹線` : 'バス・特急' }}
              </div>
              <div class="tc-detail">所要時間: {{ formatDuration(opt.minutes) }}</div>
            </div>
            <div class="tc-price">
              <div class="price-label">片道 / 1人</div>
              <div class="price-value">¥{{ opt.price.toLocaleString() }}</div>
              <div v-if="store.draft.tripType === 'roundtrip'" class="price-rt">往復: ¥{{ (opt.price * 2).toLocaleString() }}</div>
            </div>
            <div class="tc-select">
              <span v-if="isSelected(opt)" class="sel-mark">✓ 選択中</span>
              <span v-else class="sel-btn">選択する</span>
            </div>
          </div>
        </div>

        <!-- Time slot selection -->
        <div v-if="selectedOption" class="slots-section card">
          <h3>{{ store.draft.tripType === 'roundtrip' ? '往路' : '出発時間' }}を選択</h3>
          <div class="slots-grid">
            <button
              v-for="slot in outboundSlots"
              :key="slot.id"
              class="slot-btn"
              :class="[`avail-${slot.availability}`, { selected: selectedOutSlot?.id === slot.id }]"
              :disabled="slot.availability === 'sold_out'"
              @click="selectedOutSlot = slot"
            >
              <div class="slot-time">{{ slot.departure }}<span class="arr">→ {{ slot.arrival }}</span></div>
              <div class="slot-price">¥{{ slot.price.toLocaleString() }}</div>
              <div class="slot-avail">
                <span v-if="slot.availability === 'available'" class="badge-avail">○</span>
                <span v-else-if="slot.availability === 'few'" class="badge-few">△ 残りわずか</span>
                <span v-else class="badge-sold">✕ 満席</span>
              </div>
            </button>
          </div>

          <!-- 復路 (roundtrip only, shown after outbound selected) -->
          <template v-if="store.draft.tripType === 'roundtrip' && selectedOutSlot">
            <h3 class="mt-24">復路を選択</h3>
            <div class="slots-grid">
              <button
                v-for="slot in inboundSlots"
                :key="slot.id"
                class="slot-btn"
                :class="[`avail-${slot.availability}`, { selected: selectedInSlot?.id === slot.id }]"
                :disabled="slot.availability === 'sold_out'"
                @click="selectedInSlot = slot"
              >
                <div class="slot-time">{{ slot.departure }}<span class="arr">→ {{ slot.arrival }}</span></div>
                <div class="slot-price">¥{{ slot.price.toLocaleString() }}</div>
                <div class="slot-avail">
                  <span v-if="slot.availability === 'available'" class="badge-avail">○</span>
                  <span v-else-if="slot.availability === 'few'" class="badge-few">△ 残りわずか</span>
                  <span v-else class="badge-sold">✕ 満席</span>
                </div>
              </button>
            </div>
          </template>
        </div>

        <div v-if="canProceed" class="next-bar">
          <div class="next-info">
            <span class="sel-type">{{ selectedTransportLabel }}</span> を選択しました
          </div>
          <button class="btn btn-primary" @click="goToHotels">次へ（宿泊先を選ぶ） →</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { store } from '../store/index.js'
import { getPrefById } from '../data/prefectures.js'
import { getTransportOptions, generateTimeSlots, formatDuration } from '../data/transport.js'

const router = useRouter()
const isSearching = ref(false)
const showResults = ref(false)
const transportOptions = ref([])
const selectedOption = ref(null)
const selectedOutSlot = ref(null)
const selectedInSlot = ref(null)

const today = new Date().toLocaleDateString('sv-SE')
if (!store.draft.checkin) store.draft.checkin = today
if (!store.draft.checkout) store.draft.checkout = new Date(Date.now() + 86400000).toLocaleDateString('sv-SE')

const originPref = computed(() => store.draft.originPrefId ? getPrefById(store.draft.originPrefId) : null)
const destPref   = computed(() => store.draft.destPrefId   ? getPrefById(store.draft.destPrefId)   : null)
const canSearch  = computed(() => !!store.draft.originPrefId && !!store.draft.destPrefId)

const filteredOptions = computed(() => {
  if (store.draft.transportType === 'any') return transportOptions.value
  return transportOptions.value.filter(o => o.type === store.draft.transportType)
})

const outboundSlots = computed(() => {
  if (!selectedOption.value) return []
  return generateTimeSlots(selectedOption.value.type, store.draft.originPrefId, store.draft.destPrefId, store.draft.checkin)
})

const inboundSlots = computed(() => {
  if (!selectedOption.value) return []
  return generateTimeSlots(selectedOption.value.type, store.draft.destPrefId, store.draft.originPrefId, store.draft.checkout)
})

const canProceed = computed(() => {
  if (!selectedOption.value) return false
  if (!selectedOutSlot.value) return false
  if (store.draft.tripType === 'roundtrip' && !selectedInSlot.value) return false
  return true
})

const selectedTransportLabel = computed(() => {
  const t = selectedOption.value
  if (!t) return ''
  if (t.type === 'flight') return '飛行機'
  if (t.type === 'shinkansen') return t.line + '新幹線'
  return 'バス・特急'
})

function changeGuests(d) {
  const v = store.draft.guests + d
  if (v >= 1 && v <= 8) store.draft.guests = v
}

async function doSearch() {
  if (!canSearch.value) return
  isSearching.value = true
  showResults.value = false
  selectedOption.value = null
  selectedOutSlot.value = null
  selectedInSlot.value = null

  // Random delay 3000-7000ms
  const delay = 3000 + Math.random() * 4000
  await new Promise(r => setTimeout(r, delay))

  transportOptions.value = getTransportOptions(store.draft.originPrefId, store.draft.destPrefId)
  isSearching.value = false
  showResults.value = true
}

function isSelected(opt) {
  if (!selectedOption.value) return false
  return selectedOption.value.type === opt.type && selectedOption.value.line === opt.line
}

function selectTransport(opt) {
  selectedOption.value = opt
  selectedOutSlot.value = null
  selectedInSlot.value = null
}

function goToHotels() {
  store.draft.selectedTransport = {
    ...selectedOption.value,
    outbound: selectedOutSlot.value,
    inbound: selectedInSlot.value,
  }
  store.draft.mode = 'package'
  router.push('/hotels')
}
</script>

<style scoped>
.package-view { padding: 32px 0 80px; }
.page-title { font-size: 26px; font-weight: 800; margin-bottom: 6px; }
.page-sub { color: var(--text-sub); margin-bottom: 28px; }

.pkg-form { padding: 28px; margin-bottom: 32px; }
.form-section h2 { font-size: 18px; font-weight: 700; margin-bottom: 20px; }

.form-row {
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
  align-items: flex-end;
  flex-wrap: wrap;
}
.arrow-center { font-size: 20px; color: var(--text-sub); align-self: flex-end; padding-bottom: 10px; }

.form-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
  min-width: 140px;
}
.form-field label { font-size: 12px; font-weight: 600; color: var(--text-sub); }

.select-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: #f8fafc;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  text-align: left;
}
.select-btn:hover { border-color: var(--primary); background: #e0f2fe; }
.select-btn .arrow { color: var(--text-sub); }

.input {
  padding: 10px 14px;
  border: 1px solid var(--border);
  border-radius: 8px;
  font-size: 14px;
  font-family: inherit;
  background: #f8fafc;
  width: 100%;
}

.guests-ctrl {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 14px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: #f8fafc;
}
.guests-ctrl button {
  width: 26px; height: 26px;
  border-radius: 50%;
  border: 1px solid var(--border);
  background: #fff;
  font-size: 16px;
  display: flex; align-items: center; justify-content: center;
}
.guests-ctrl span { font-size: 14px; font-weight: 600; min-width: 30px; text-align: center; }

.radio-group { display: flex; gap: 16px; flex-wrap: wrap; }
.radio-label { display: flex; align-items: center; gap: 6px; font-size: 14px; cursor: pointer; font-weight: 500; }

.search-btn { padding: 14px 36px; font-size: 15px; }
.hint-text { font-size: 12px; color: var(--text-sub); margin-top: 8px; }

.results-section { }
.results-section h2 { font-size: 20px; font-weight: 700; margin-bottom: 6px; }
.results-sub { color: var(--text-sub); font-size: 14px; margin-bottom: 20px; }

.transport-cards { display: flex; flex-direction: column; gap: 14px; }

.transport-card {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px;
  cursor: pointer;
  transition: all var(--transition);
}
.transport-card:hover { border-color: var(--primary); box-shadow: 0 4px 16px rgba(14,165,233,0.15); }
.transport-card.selected { border-color: var(--primary); background: #e0f2fe; }

.tc-icon { font-size: 36px; width: 50px; text-align: center; }
.tc-info { flex: 1; }
.tc-name { font-size: 16px; font-weight: 700; margin-bottom: 4px; }
.tc-detail { font-size: 13px; color: var(--text-sub); }

.tc-price { text-align: right; }
.price-label { font-size: 11px; color: var(--text-sub); }
.price-value { font-size: 20px; font-weight: 800; color: var(--primary); }
.price-rt { font-size: 12px; color: var(--text-sub); }

.tc-select { min-width: 80px; text-align: center; }
.sel-mark { color: var(--accent); font-weight: 700; font-size: 14px; }
.sel-btn { color: var(--primary); font-size: 13px; text-decoration: underline; }

.empty-state { padding: 32px; text-align: center; }

/* Time slots */
.slots-section { padding: 24px; margin-top: 24px; }
.slots-section h3 { font-size: 16px; font-weight: 700; margin-bottom: 12px; }
.mt-24 { margin-top: 24px; }

.slots-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 10px;
  margin-top: 12px;
}
.slot-btn {
  padding: 12px;
  border-radius: 8px;
  border: 2px solid var(--border);
  background: white;
  text-align: center;
  cursor: pointer;
  transition: all 0.15s;
}
.slot-btn:hover:not(:disabled) { border-color: var(--primary); }
.slot-btn.selected { border-color: var(--primary); background: #e0f2fe; }
.slot-btn:disabled { opacity: 0.45; cursor: not-allowed; background: #f1f5f9; }
.slot-time { font-size: 15px; font-weight: 700; }
.arr { font-size: 12px; font-weight: 400; color: var(--text-sub); display: block; }
.slot-price { font-size: 13px; color: var(--primary-dark, var(--primary)); font-weight: 600; margin: 4px 0; }
.badge-avail { color: #16a34a; font-weight: 700; }
.badge-few { color: #d97706; font-size: 12px; }
.badge-sold { color: #dc2626; font-size: 12px; }

.next-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 24px;
  padding: 20px;
  background: #dcfce7;
  border-radius: var(--radius);
  border: 1px solid #86efac;
}
.next-info { font-size: 15px; }
.sel-type { font-weight: 700; color: var(--accent); }
.btn:disabled { opacity: 0.4; cursor: not-allowed; }

/* Loading overlay */
.spinner {
  width: 48px; height: 48px;
  border: 4px solid #e2e8f0;
  border-top-color: var(--primary);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin: 0 auto 16px;
}
@keyframes spin { to { transform: rotate(360deg) } }
.loading-overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,0.5);
  display: flex; align-items: center; justify-content: center; z-index: 200;
}
.loading-card {
  background: white; border-radius: 16px; padding: 40px 48px; text-align: center;
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
}
.loading-text { font-size: 16px; font-weight: 700; color: var(--text); margin-bottom: 4px; }
.loading-sub { font-size: 13px; color: var(--text-sub); }

@media (max-width: 640px) {
  .transport-card { flex-wrap: wrap; }
  .arrow-center { display: none; }
  .slots-grid { grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); }
}
</style>
