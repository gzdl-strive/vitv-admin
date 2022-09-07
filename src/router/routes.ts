// 路由表
import { RouteRecordRaw } from 'vue-router';

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