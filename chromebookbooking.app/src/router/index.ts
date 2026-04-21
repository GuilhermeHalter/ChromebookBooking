import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('../views/DashboardView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/access-denied',
    name: 'AccessDenied',
    component: () => import('../views/AccessDeniedView.vue')
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore()

  const isAuthenticated = !!authStore.user
  const isAuthorized = !!authStore.profile

  if (to.meta.requiresAuth) {
    if (!isAuthenticated) {
      return next({ name: 'Login' })
    }
    if (isAuthenticated && !isAuthorized) {
      return next({ name: 'AccessDenied' })
    }
    return next()
  } else if (to.name === 'Login' && isAuthenticated) {
    if (isAuthorized) {
      return next({ name: 'Dashboard' })
    } else {
      return next({ name: 'AccessDenied' })
    }
  } else {
    return next()
  }
})
