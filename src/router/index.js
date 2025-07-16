import { createRouter, createWebHistory } from 'vue-router'
import IdeasPage from '@/pages/IdeasPages.vue'

const routes = [
  {
    path: '/',
    name: 'Ideas',
    component: IdeasPage,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
