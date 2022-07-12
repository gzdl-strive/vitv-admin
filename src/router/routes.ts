import type { RouteRecordRaw } from 'vue-router';
import Layout from '@/components/Layout';

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