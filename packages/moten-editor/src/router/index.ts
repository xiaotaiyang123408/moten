import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'edit',
      component: () => import('@/pages/edit.vue'),
    },
    {
      path: '/tools',
      name: 'tools',
      component: () => import('@/pages/list.vue'),
    },
  ],
})

export default router
