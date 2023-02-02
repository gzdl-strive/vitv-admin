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
      noKeepAlive: true, // keep-alive缓存: true不需要，false需要(默认)
      limitOfAuthority: 0 // 访问所需要的权限等级 0-所有人都可以访问 1-游客权限 2-用户权限 3-管理员权限
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
          icon: 'home',
          limitOfAuthority: 0
        }
      },
      ...modules
    ]
  }
];

export default routes;