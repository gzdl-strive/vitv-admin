// 路由表
import { RouteRecordRaw } from 'vue-router';
import Layout from '@/components/Layout';

const modules: RouteRecordRaw[] = [];
const moduleFiles = import.meta.globEager('./modules/*.ts');
// eslint-disable-next-line @typescript-eslint/no-explicit-any
Object.values(moduleFiles).forEach((moduleVal: any) => {
  modules.push(moduleVal.default);
});

const routes: RouteRecordRaw[] = [
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/Login'),
    meta: {
      type: 'menu-item',
      label: '登录页',
      icon: 'login',
      noKeepAlive: true
    }
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
        component: () => import('@/views/Home'),
        meta: {
          type: 'menu-item',
          label: '主页',
          icon: 'home'
        }
      },
      ...modules
    ]
  }
];

export default routes;