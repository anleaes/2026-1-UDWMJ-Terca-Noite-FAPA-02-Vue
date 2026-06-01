import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '../layouts/MainLayout.vue'

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '', name: 'home', component: () => import('../pages/HomePage.vue') },
    ],
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
