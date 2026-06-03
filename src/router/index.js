import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '../layouts/MainLayout.vue'
import { useAuth } from '../composables/useAuth'

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '',         name: 'home',     component: () => import('../pages/HomePage.vue') },
      { path: 'login',    name: 'login',    component: () => import('../pages/auth/LoginPage.vue') },
      { path: 'register', name: 'register', component: () => import('../pages/auth/RegisterPage.vue') },
      { path: 'profile',  name: 'profile',  component: () => import('../pages/auth/ProfilePage.vue'), meta: { requiresAuth: true } },
      { path: 'properties',             name: 'properties-list',   component: () => import('../pages/properties/PropertyListPage.vue') },
      { path: 'properties/novo',        name: 'properties-add',    component: () => import('../pages/properties/PropertyFormPage.vue'), meta: { requiresAuth: true, requiresEmployee: true } },
      { path: 'properties/:id/editar',  name: 'properties-edit',   component: () => import('../pages/properties/PropertyFormPage.vue'), meta: { requiresAuth: true, requiresEmployee: true } },
      { path: 'properties/:id',         name: 'properties-detail', component: () => import('../pages/properties/PropertyDetailPage.vue') },
    ],
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to) => {
  const auth = useAuth()
  if (!auth.ready.value) await auth.loadMe()

  if (to.meta.requiresAuth && !auth.isAuthenticated.value) {
    return { path: '/login', query: { next: to.fullPath } }
  }
  if (to.meta.requiresEmployee && !auth.isEmployee.value) {
    return { path: '/' }
  }
})
