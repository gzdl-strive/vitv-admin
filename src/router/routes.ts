// 路由表
import { RouteRecordRaw } from 'vue-router';
import Layout from '@/components/Layout';

const routes: RouteRecordRaw[] = [
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/Login')
  },
  {
    name: 'index',
    path: '/',
    redirect: '/home',
    component: Layout,
    children: [
      {
        name: 'home',
        path: 'home',
        component: () => import('@/views/Home')
      }
    ]
  }
];

export default routes;