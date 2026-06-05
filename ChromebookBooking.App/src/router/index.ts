import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import AppLayout from '../components/AppLayout.vue'
import { type UserModule } from '../types/user'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: AppLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'Redirect',
        redirect: () => {
          const authStore = useAuthStore()
          const accessibleModules = authStore.profile?.modules || []
          console.log('modules', accessibleModules)
          //if (accessibleModules.length === 0) return { name: 'AccessDenied' }
          if (accessibleModules.length === 0) return { name: 'Login' }
          if (accessibleModules.includes('Dashboard')) {
            return { name: 'Dashboard' }
          }
          return { name: 'Schedule' }
        }
      },
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('../views/DashboardView.vue')
      },
      {
        path: 'schedule',
        name: 'Schedule',
        component: () => import('../views/ScheduleView.vue')
      },
      {
        path: 'history',
        name: 'History',
        component: () => import('../views/HistoryView.vue')
      },
      {
        path: 'settings',
        name: 'Settings',
        component: () => import('../views/SettingsView.vue')
      }
    ]
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

  console.log('user', authStore.user);
  console.log('profile', authStore.profile);

  const isAuthenticated = !!authStore.user
  const isAuthorized = !!authStore.profile
  const accessibleModules = authStore.profile?.modules || []

  const requiresAuth = to.meta.requiresAuth || to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth) {
    if (!isAuthenticated) {
      return next({ name: 'Login' })
    }
    if (isAuthenticated && !isAuthorized) {
      return next({ name: 'AccessDenied' })
    }
    const routeName = to.name as string
    if (routeName !== 'Redirect' && !accessibleModules.includes(routeName as UserModule)) {
      return next({ name: 'AccessDenied' })
    }
    return next()
  }

  if (to.name === 'Login' && isAuthenticated) {
    if (isAuthorized && accessibleModules.length > 0) {
      const targetRoute = accessibleModules.includes('Dashboard') ? 'Dashboard' : 'Schedule'
      return next({ name: targetRoute })
    } else {
      return next({ name: 'AccessDenied' })
    }
  }

  return next()
})
