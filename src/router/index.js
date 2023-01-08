import { createRouter, createWebHistory } from 'vue-router'
import LeTipView from '../views/LeTipView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LeTipView
    }
  ]
})

export default router
