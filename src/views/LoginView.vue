<template>
  <div class="login-view">
    <div class="container">
      <div class="login-card card">
        <div class="login-header">
          <div class="login-logo">🗾</div>
          <h1>JAPAN TRAVEL</h1>
          <p class="login-sub">ログインしてご予約ください</p>
        </div>

        <form @submit.prevent="doLogin" class="login-form">
          <div class="form-group">
            <label for="email">メールアドレス</label>
            <input
              id="email"
              type="email"
              v-model="email"
              placeholder="example@example.com"
              class="input"
              autocomplete="email"
              required
            />
          </div>

          <div class="form-group">
            <label for="password">パスワード</label>
            <input
              id="password"
              :type="showPw ? 'text' : 'password'"
              v-model="password"
              placeholder="パスワードを入力"
              class="input"
              autocomplete="current-password"
              required
            />
            <button type="button" class="pw-toggle" @click="showPw = !showPw">
              {{ showPw ? '非表示' : '表示' }}
            </button>
          </div>

          <div v-if="errorMsg" class="error-msg">{{ errorMsg }}</div>

          <button type="submit" class="btn btn-primary login-btn">ログイン</button>
        </form>

        <!-- Test accounts -->
        <div class="test-accounts">
          <h3>テストアカウント一覧</h3>
          <p class="ta-hint">以下のアカウントでテストログインできます</p>
          <div class="ta-table-wrap">
            <table class="ta-table">
              <thead>
                <tr>
                  <th>名前</th>
                  <th>メール</th>
                  <th>パスワード</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="u in TEST_USERS" :key="u.email">
                  <td>{{ u.name }}</td>
                  <td class="mono">{{ u.email }}</td>
                  <td class="mono">{{ u.password }}</td>
                  <td>
                    <button class="use-btn" @click="fillAccount(u)">使用</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { login } from '../store/index.js'
import { DEFAULT_USERS } from '../data/users.js'

const router = useRouter()
const route  = useRoute()

const email    = ref('')
const password = ref('')
const showPw   = ref(false)
const errorMsg = ref('')

const TEST_USERS = DEFAULT_USERS

function fillAccount(u) {
  email.value    = u.email
  password.value = u.password
  errorMsg.value = ''
}

function doLogin() {
  errorMsg.value = ''
  const ok = login(email.value, password.value)
  if (ok) {
    const redirect = route.query.redirect
    router.push(redirect ? String(redirect) : '/my-page')
  } else {
    errorMsg.value = 'メールアドレスまたはパスワードが正しくありません。'
  }
}
</script>

<style scoped>
.login-view {
  padding: 48px 0 60px;
  min-height: calc(100vh - 120px);
  display: flex;
  align-items: center;
}

.login-card {
  max-width: 560px;
  margin: 0 auto;
  padding: 40px;
}

.login-header { text-align: center; margin-bottom: 32px; }
.login-logo { font-size: 48px; margin-bottom: 8px; }
.login-header h1 { font-size: 24px; font-weight: 800; color: var(--primary); }
.login-sub { color: var(--text-sub); font-size: 14px; margin-top: 4px; }

.login-form { display: flex; flex-direction: column; gap: 18px; margin-bottom: 32px; }

.form-group { display: flex; flex-direction: column; gap: 6px; position: relative; }
.form-group label { font-size: 13px; font-weight: 600; color: var(--text-sub); }

.input {
  padding: 12px 14px;
  border: 1px solid var(--border);
  border-radius: 8px;
  font-size: 14px;
  font-family: inherit;
  background: #f8fafc;
  transition: border-color var(--transition);
  width: 100%;
}
.input:focus { outline: none; border-color: var(--primary); background: #fff; }

.pw-toggle {
  position: absolute;
  right: 12px;
  bottom: 12px;
  background: none;
  border: none;
  font-size: 12px;
  color: var(--primary);
  cursor: pointer;
  font-weight: 600;
}

.error-msg {
  padding: 10px 14px;
  background: #fee2e2;
  border: 1px solid #fca5a5;
  border-radius: 8px;
  color: #dc2626;
  font-size: 13px;
}

.login-btn { width: 100%; padding: 14px; font-size: 15px; }

/* Test accounts */
.test-accounts {
  border-top: 1px solid var(--border);
  padding-top: 24px;
}
.test-accounts h3 { font-size: 14px; font-weight: 700; margin-bottom: 4px; }
.ta-hint { font-size: 12px; color: var(--text-sub); margin-bottom: 14px; }

.ta-table-wrap { overflow-x: auto; }
.ta-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}
.ta-table th {
  text-align: left;
  padding: 8px 10px;
  background: #f8fafc;
  border-bottom: 2px solid var(--border);
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--text-sub);
}
.ta-table td {
  padding: 10px;
  border-bottom: 1px solid var(--border);
  vertical-align: middle;
}
.mono { font-family: monospace; font-size: 12px; }

.use-btn {
  padding: 4px 10px;
  border: 1px solid var(--primary);
  border-radius: 6px;
  background: transparent;
  color: var(--primary);
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  white-space: nowrap;
}
.use-btn:hover { background: var(--primary); color: #fff; }

@media (max-width: 480px) {
  .login-card { padding: 28px 20px; }
}
</style>
