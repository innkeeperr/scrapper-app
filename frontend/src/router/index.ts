import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '@/views/DashboardView.vue'
import ProductConfigsView from '@/views/ProductConfigsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView,
    },
    {
      path: '/product-configs',
      name: 'productConfigs',
      component: ProductConfigsView,
    },
    {
      path: '/scraper-configs',
      name: 'scraperConfigs',
      component: () => import('../views/ScraperConfigsView.vue'),
    },
  ],
})

export default router
