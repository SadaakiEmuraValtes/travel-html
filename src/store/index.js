import { reactive, watch } from 'vue'
import { DEFAULT_USERS } from '../data/users.js'

const STORAGE_KEY = 'japantravel_v1'

function loadSaved() { try { return JSON.parse(sessionStorage.getItem(STORAGE_KEY)) } catch { return null } }
function save(s) { try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ currentUserId: s.currentUserId, userBookings: s.userBookings, lastCompletedBookingId: s.lastCompletedBookingId })) } catch {} }

const saved = loadSaved()

export const store = reactive({
  currentUserId: saved?.currentUserId ?? null,
  users: DEFAULT_USERS,
  userBookings: saved?.userBookings ?? {},   // { userId: booking[] }
  lastCompletedBookingId: saved?.lastCompletedBookingId ?? null,

  // Booking draft (not persisted)
  draft: {
    mode: 'hotel',        // 'hotel' | 'package'
    destPrefId: null,
    destArea: null,
    checkin: '',
    checkout: '',
    guests: 2,
    originPrefId: null,
    tripType: 'roundtrip',
    transportType: 'any',
    selectedTransport: null,  // { type, line?, minutes, price }
    selectedHotelId: null,
  },
})

watch(store, () => save(store), { deep: true, flush: 'sync' })

export const currentUser = () => store.users.find(u => u.id === store.currentUserId) ?? null
export const isLoggedIn = () => store.currentUserId !== null

export function login(email, password) {
  const user = store.users.find(u => u.email === email && u.password === password)
  if (!user) return false
  store.currentUserId = user.id
  return true
}

export function logout() {
  store.currentUserId = null
}

export function getMyBookings() {
  if (!store.currentUserId) return []
  return store.userBookings[store.currentUserId] ?? []
}

export function addBooking(booking) {
  if (!store.currentUserId) return null
  if (!store.userBookings[store.currentUserId]) store.userBookings[store.currentUserId] = []
  const id = 'TRV-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).slice(2,6).toUpperCase()
  const b = { ...booking, id, userId: store.currentUserId, createdAt: new Date().toISOString(), status: 'confirmed' }
  store.userBookings[store.currentUserId].unshift(b)
  store.lastCompletedBookingId = id
  return b
}

export function resetDraft() {
  Object.assign(store.draft, {
    mode: 'hotel', destPrefId: null, destArea: null,
    checkin: '', checkout: '', guests: 2,
    originPrefId: null, tripType: 'roundtrip', transportType: 'any',
    selectedTransport: null, selectedHotelId: null,
  })
}
