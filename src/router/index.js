import { createRouter, createWebHashHistory } from 'vue-router'
import { isLoggedIn } from '../store/index.js'
import HomeView from '../views/HomeView.vue'
import SearchView from '../views/SearchView.vue'
import HotelListView from '../views/HotelListView.vue'
import HotelDetailView from '../views/HotelDetailView.vue'
import PackageView from '../views/PackageView.vue'
import ConfirmView from '../views/ConfirmView.vue'
import CompleteView from '../views/CompleteView.vue'
import MyPageView from '../views/MyPageView.vue'
import LoginView from '../views/LoginView.vue'

const routes = [
  { path: '/',         name: 'home',        component: HomeView },
  { path: '/search',   name: 'search',      component: SearchView },
  { path: '/hotels',   name: 'hotels',      component: HotelListView },
  { path: '/hotel/:id',name: 'hotelDetail', component: HotelDetailView },
  { path: '/package',  name: 'package',     component: PackageView },
  { path: '/confirm',  name: 'confirm',     component: ConfirmView },
  { path: '/complete', name: 'complete',    component: CompleteView },
  { path: '/my-page',  name: 'myPage',      component: MyPageView, meta: { requiresAuth: true } },
  { path: '/login',    name: 'login',       component: LoginView },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() { return { top: 0 } }
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isLoggedIn()) {
    next({ path: '/login', query: { redirect: to.fullPath } })
  } else {
    next()
  }
})

export default router
