import type { RouteRecordRaw } from 'vue-router';

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
    name: 'Error',
    path: "/:pathMatch(.*)*",
    component: () => import("@/views/Error"),
    meta: {
      type: 'error'
    }
  }
];

export default routes;