import type { RouteRecordRaw } from 'vue-router';
import Layout from '@/components/Layout';
import AppMain from '@/components/Layout/components/AppMain';

const routes: RouteRecordRaw[] = [
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/login'),
    meta: {
      type: 'login'
    }
  },
  {
    name: 'index',
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        name: 'home',
        path: 'home',
        component: () => import('@/views/pages/home'),
        meta: {
          type: 'page',
          label: '主页',
          icon: 'home'
        }
      },
      {
        name: 'test',
        path: 'test',
        component: AppMain,
        redirect: '/test/test1',
        meta: {
          type: 'subPage',
          label: '测试',
          icon: 'home'
        },
        children: [
          {
            name: 'test1',
            path: 'test1',
            component: () => import('@/views/pages/test/test1.vue'),
            meta: {
              type: 'page',
              label: '测试11111',
            },
          }
        ]
      }
    ],
    meta: {
      label: '主页',
      icon: 'leafs'
    }
  },
  {
    name: 'Error',
    path: "/:pathMatch(.*)*",
    component: () => import("@/views/Error"),
    meta: {
      type: 'error'
    }
  }
];

export default routes;