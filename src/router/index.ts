import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';
import nProgress from '@/utils/progress';
import routeFlat from './routeFlat';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // 路由404匹配
    {
      name: 'Error',
      path: '/:pathMatch(.*)*',
      component: () => import('@/views/Error')
    },
    ...routes
  ]
});

router.beforeEach((to, from ,next) => {
  nProgress.start();
  routeFlat(to);
  next();
});

router.afterEach(() => {
  nProgress.done();
});

export default router;