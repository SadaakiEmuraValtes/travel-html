<template>
  <div class="search-view">
    <div class="container">
      <div class="page-header">
        <h1>{{ mode === 'origin' ? '出発地を選ぶ' : '目的地を選ぶ' }}</h1>
        <p class="subtitle">地図またはリストから選択してください</p>
      </div>

      <!-- Breadcrumb -->
      <div v-if="selectedPref" class="breadcrumb">
        <span>{{ REGIONS[selectedPref.regionId].name }}</span>
        <span class="sep">›</span>
        <span class="sel">{{ selectedPref.name }}</span>
        <span v-if="selectedArea" class="sep">›</span>
        <span v-if="selectedArea" class="sel">{{ selectedArea }}</span>
      </div>

      <!-- View tabs -->
      <div class="view-tabs">
        <button :class="['vt', { active: viewTab === 'map' }]" @click="viewTab = 'map'">🗾 地図から選ぶ</button>
        <button :class="['vt', { active: viewTab === 'list' }]" @click="viewTab = 'list'">📋 地域・県から選ぶ</button>
      </div>

      <!-- Map View -->
      <div v-show="viewTab === 'map'" class="map-tab">
        <p class="map-hint">都道府県をクリックして選択してください</p>
        <div class="map-scroll">
          <div class="japan-map">
            <div
              v-for="pref in PREFECTURES"
              :key="pref.id"
              class="map-cell"
              :class="{ selected: selectedPref && selectedPref.id === pref.id }"
              :style="{
                left: pref.mapCol * 42 + 'px',
                top: pref.mapRow * 42 + 'px',
                background: selectedPref && selectedPref.id === pref.id ? '#0ea5e9' : REGIONS[pref.regionId].color + 'cc',
              }"
              :title="pref.name"
              @click="selectPref(pref)"
            >
              {{ pref.name.length <= 3 ? pref.name : pref.name.slice(0, 3) }}
            </div>
          </div>
        </div>

        <!-- Area selector -->
        <div v-if="selectedPref" class="area-panel">
          <h3>エリアを選ぶ（任意）</h3>
          <div class="area-chips">
            <button
              v-for="area in selectedPref.areas"
              :key="area"
              class="area-chip"
              :class="{ active: selectedArea === area }"
              @click="selectedArea = selectedArea === area ? null : area"
            >{{ area }}</button>
          </div>
        </div>
      </div>

      <!-- List View -->
      <div v-show="viewTab === 'list'" class="list-tab">
        <div v-for="region in REGIONS" :key="region.id" class="region-group">
          <button
            class="region-header"
            :style="{ '--rc': region.color }"
            @click="toggleRegion(region.id)"
          >
            <span>{{ region.name }}</span>
            <span class="count">{{ getPrefsByRegion(region.id).length }}県</span>
            <span class="arrow">{{ openRegions.has(region.id) ? '▲' : '▼' }}</span>
          </button>
          <div v-if="openRegions.has(region.id)" class="pref-chips">
            <button
              v-for="pref in getPrefsByRegion(region.id)"
              :key="pref.id"
              class="pref-chip"
              :class="{ active: selectedPref && selectedPref.id === pref.id }"
              @click="selectPref(pref)"
            >{{ pref.name }}</button>
          </div>
          <div v-if="openRegions.has(region.id) && selectedPref && getPrefsByRegion(region.id).some(p => p.id === selectedPref.id)" class="area-chips">
            <p class="area-label">エリアを選ぶ（任意）:</p>
            <button
              v-for="area in selectedPref.areas"
              :key="area"
              class="area-chip"
              :class="{ active: selectedArea === area }"
              @click="selectedArea = selectedArea === area ? null : area"
            >{{ area }}</button>
          </div>
        </div>
      </div>

      <!-- Confirm -->
      <div class="confirm-bar">
        <div class="confirm-summary">
          <template v-if="selectedPref">
            <span class="sel-name">{{ selectedPref.name }}</span>
            <span v-if="selectedArea" class="sel-area">/ {{ selectedArea }}</span>
          </template>
          <span v-else class="placeholder">都道府県を選択してください</span>
        </div>
        <div class="confirm-btns">
          <button class="btn btn-secondary" @click="goBack">戻る</button>
          <button class="btn btn-primary" :disabled="!selectedPref" @click="confirmSelection">
            この{{ mode === 'origin' ? '出発地' : '目的地' }}に決める
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { store } from '../store/index.js'
import { REGIONS, PREFECTURES, getPrefById, getPrefsByRegion } from '../data/prefectures.js'

const route  = useRoute()
const router = useRouter()

const mode     = computed(() => route.query.mode || 'dest')
const viewTab  = ref('map')
const openRegions = ref(new Set())

const selectedPref = ref(null)
const selectedArea = ref(null)

onMounted(() => {
  // Preselect from current draft
  const prefId = mode.value === 'origin' ? store.draft.originPrefId : store.draft.destPrefId
  if (prefId) {
    selectedPref.value = getPrefById(prefId)
    selectedArea.value = mode.value === 'origin' ? null : store.draft.destArea
  }
  // Preselect region if provided
  if (route.query.region !== undefined) {
    const rid = parseInt(route.query.region)
    openRegions.value.add(rid)
    viewTab.value = 'list'
  }
})

function selectPref(pref) {
  selectedPref.value = pref
  selectedArea.value = null
  // Auto-open region in list view
  openRegions.value.add(pref.regionId)
}

function toggleRegion(id) {
  if (openRegions.value.has(id)) openRegions.value.delete(id)
  else openRegions.value.add(id)
}

function confirmSelection() {
  if (!selectedPref.value) return
  if (mode.value === 'origin') {
    store.draft.originPrefId = selectedPref.value.id
  } else {
    store.draft.destPrefId  = selectedPref.value.id
    store.draft.destArea    = selectedArea.value || null
  }
  goBack()
}

function goBack() {
  if (window.history.length > 1) {
    router.go(-1)
  } else {
    router.push('/')
  }
}
</script>

<style scoped>
.search-view { padding: 32px 0 80px; }

.page-header { margin-bottom: 16px; }
.page-header h1 { font-size: 24px; font-weight: 700; }
.subtitle { color: var(--text-sub); font-size: 14px; margin-top: 4px; }

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  padding: 8px 14px;
  background: #e0f2fe;
  border-radius: 6px;
  margin-bottom: 16px;
  color: var(--primary-dark);
  flex-wrap: wrap;
}
.sep { color: #93c5fd; }
.sel { font-weight: 600; }

.view-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
}
.vt {
  padding: 10px 20px;
  border: 2px solid var(--border);
  border-radius: 8px;
  background: #fff;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-sub);
  transition: var(--transition);
}
.vt.active { border-color: var(--primary); color: var(--primary); background: #e0f2fe; }

.map-hint { font-size: 12px; color: var(--text-sub); margin-bottom: 12px; }
.map-scroll { overflow-x: auto; padding-bottom: 12px; }

.japan-map {
  position: relative;
  width: 504px;   /* 12 * 42 */
  height: 798px;  /* 19 * 42 */
  flex-shrink: 0;
}

.map-cell {
  position: absolute;
  width: 38px;
  height: 38px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 9px;
  font-weight: 700;
  color: #fff;
  cursor: pointer;
  transition: transform var(--transition), box-shadow var(--transition);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 1.1;
  text-align: center;
  padding: 2px;
}
.map-cell:hover { transform: scale(1.15); box-shadow: 0 4px 12px rgba(0,0,0,0.25); z-index: 2; }
.map-cell.selected {
  transform: scale(1.15);
  box-shadow: 0 4px 16px rgba(14,165,233,0.5);
  z-index: 3;
  outline: 3px solid #fff;
}

.area-panel {
  margin-top: 20px;
  padding: 16px;
  background: #f8fafc;
  border-radius: 10px;
}
.area-panel h3 { font-size: 14px; font-weight: 600; margin-bottom: 10px; }

.area-chips, .pref-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
}
.area-chip, .pref-chip {
  padding: 6px 14px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: #fff;
  font-size: 13px;
  cursor: pointer;
  transition: var(--transition);
}
.area-chip:hover, .pref-chip:hover { border-color: var(--primary); color: var(--primary); }
.area-chip.active, .pref-chip.active { background: var(--primary); color: #fff; border-color: var(--primary); }

.list-tab { display: flex; flex-direction: column; gap: 8px; }

.region-group { border: 1px solid var(--border); border-radius: 10px; overflow: hidden; }
.region-header {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 16px;
  background: var(--rc) + '11';
  border: none;
  background: color-mix(in srgb, var(--rc) 12%, white);
  font-size: 15px;
  font-weight: 700;
  color: var(--rc);
  cursor: pointer;
  text-align: left;
  transition: var(--transition);
}
.region-header:hover { filter: brightness(0.95); }
.count { font-size: 12px; color: var(--text-sub); margin-left: auto; }
.arrow { font-size: 11px; }

.pref-chips { padding: 12px 16px; display: flex; flex-wrap: wrap; gap: 8px; }
.area-label { font-size: 12px; color: var(--text-sub); width: 100%; }

.confirm-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  border-top: 1px solid var(--border);
  padding: 14px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  box-shadow: 0 -4px 12px rgba(0,0,0,0.08);
  z-index: 50;
}
.confirm-summary { font-size: 15px; }
.sel-name { font-weight: 700; color: var(--primary); font-size: 18px; }
.sel-area { color: var(--text-sub); margin-left: 6px; }
.placeholder { color: var(--text-sub); }
.confirm-btns { display: flex; gap: 10px; }
.btn:disabled { opacity: 0.4; cursor: not-allowed; }

@media (max-width: 600px) {
  .confirm-bar { flex-direction: column; align-items: stretch; }
  .confirm-btns { justify-content: flex-end; }
}
</style>
