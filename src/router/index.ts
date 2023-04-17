import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    name: 'Home',
    path: '/',
    component: () => import('@/views/Home/index.vue')
  },
  {
    name: 'Video',
    path: '/Video/:id',
    component: () => import('@/views/Video/index.vue')
  },
  {
    name: 'Login',
    path: '/Login',
    component: () => import('@/views/Login/index.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
