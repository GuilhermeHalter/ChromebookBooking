import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import AppLayout from '../components/AppLayout.vue'

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
          const role = authStore.profile?.role
          return role === 'Admin' ? { name: 'Dashboard' } : { name: 'Schedule' }
        }
      },
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('../views/DashboardView.vue'),
        meta: { roles: ['Admin'] }
      },
      {
        path: 'schedule',
        name: 'Schedule',
        component: () => import('../views/ScheduleView.vue'),
        meta: { roles: ['Admin', 'Teacher'] }
      },
      {
        path: 'history',
        name: 'History',
        component: () => import('../views/HistoryView.vue'),
        meta: { roles: ['Admin'] }
      },
      {
        path: 'settings',
        name: 'Settings',
        component: () => import('../views/SettingsView.vue'),
        meta: { roles: ['Admin'] }
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

  const isAuthenticated = !!authStore.user
  const isAuthorized = !!authStore.profile
  const userRole = authStore.profile?.role

  const requiresAuth = to.meta.requiresAuth || to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth) {
    if (!isAuthenticated) {
      return next({ name: 'Login' })
    }
    if (isAuthenticated && !isAuthorized) {
      return next({ name: 'AccessDenied' })
    }
    const routeRoles = to.meta.roles as string[] | undefined
    if (routeRoles && (!userRole || !routeRoles.includes(userRole))) {
      return next({ name: 'AccessDenied' })
    }
    return next()
  }

  if (to.name === 'Login' && isAuthenticated) {
    if (isAuthorized) {
      return next({ name: userRole === 'Admin' ? 'Dashboard' : 'Schedule' })
    } else {
      return next({ name: 'AccessDenied' })
    }
  }

  return next()
})
