<template>
  <div id="app-wrapper">
    <header class="navbar">
      <div class="container nav-inner">
        <router-link to="/" class="logo">🗾 JAPAN TRAVEL</router-link>

        <nav class="nav-links" :class="{ open: menuOpen }">
          <router-link to="/" @click="menuOpen = false">ホーム</router-link>
          <router-link to="/hotels" @click="menuOpen = false">宿泊を探す</router-link>
          <router-link to="/package" @click="menuOpen = false">交通+宿泊</router-link>
        </nav>

        <div class="nav-right">
          <template v-if="user">
            <span class="user-name">{{ user.name }}</span>
            <router-link to="/my-page" class="btn btn-outline btn-sm">マイページ</router-link>
            <button class="btn btn-secondary btn-sm" @click="handleLogout">ログアウト</button>
          </template>
          <template v-else>
            <router-link to="/login" class="btn btn-primary btn-sm">ログイン</router-link>
          </template>
        </div>

        <button class="hamburger" @click="menuOpen = !menuOpen" aria-label="メニュー">
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>

    <main class="main-content">
      <router-view />
    </main>

    <footer class="footer">
      <div class="container">
        <p>© 2025 JAPAN TRAVEL Demo &mdash; このサービスはデモです。実際の予約・決済は行いません。</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { store, currentUser, logout } from './store/index.js'

const router = useRouter()
const menuOpen = ref(false)
const user = computed(() => currentUser())

function handleLogout() {
  logout()
  menuOpen.value = false
  router.push('/')
}
</script>

<style scoped>
#app-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.navbar {
  background: #fff;
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 1px 4px rgba(0,0,0,0.06);
}

.nav-inner {
  display: flex;
  align-items: center;
  gap: 24px;
  height: 60px;
}

.logo {
  font-size: 18px;
  font-weight: 800;
  color: var(--primary);
  white-space: nowrap;
  letter-spacing: -0.5px;
}

.nav-links {
  display: flex;
  gap: 4px;
  flex: 1;
}

.nav-links a {
  padding: 6px 14px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-sub);
  transition: all var(--transition);
}
.nav-links a:hover,
.nav-links a.router-link-active {
  color: var(--primary);
  background: #e0f2fe;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
}

.user-name {
  font-size: 13px;
  color: var(--text-sub);
  font-weight: 500;
}

.btn-sm { padding: 6px 14px; font-size: 13px; }

.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  padding: 4px;
  margin-left: auto;
}
.hamburger span {
  display: block;
  width: 22px;
  height: 2px;
  background: var(--text);
  border-radius: 2px;
  transition: var(--transition);
}

.main-content { flex: 1; }

.footer {
  background: #0f172a;
  color: #94a3b8;
  padding: 16px 0;
  text-align: center;
  font-size: 12px;
  margin-top: 40px;
}

@media (max-width: 768px) {
  .hamburger { display: flex; }

  .nav-links {
    display: none;
    position: absolute;
    top: 60px;
    left: 0;
    right: 0;
    background: #fff;
    flex-direction: column;
    padding: 12px 16px;
    border-bottom: 1px solid var(--border);
    box-shadow: var(--shadow);
    gap: 4px;
  }
  .nav-links.open { display: flex; }

  .user-name { display: none; }
  .nav-right { gap: 6px; }
}
</style>
