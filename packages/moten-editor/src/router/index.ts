import icon from '@/config/icon'
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/login.vue'),
      meta: {
        title: '登录',
        hidden: true,
      },
    },
    {
      path: '/',
      component: () => import('@/pages/list.vue'),
      redirect: '/package',
      children: [
        {
          path: '/package',
          name: 'package',
          component: () => import('@/components/menu/package.vue'),
          meta: {
            title: '套件管理',
            hidden: false,
            icon: 'Edit',
          },
        },
        {
          path: '/user',
          name: 'user',
          component: () => import('@/components/menu/user.vue'),
          meta: {
            title: '用户管理',
            hidden: false,
            icon: 'Edit',
          },
        },
        {
          path: '/page',
          name: 'page',
          component: () => import('@/components/menu/page.vue'),
          meta: {
            title: '页面管理',
            hidden: false,
            icon: 'Edit',
          },
        },
      ],
    },
    {
      path: '/edit',
      name: 'edit',
      component: () => import('@/pages/edit.vue'),
      meta: {
        title: '设计页面',
        hidden: false,
        icon: 'Edit',
      },
    },
  ],
})

export default router
