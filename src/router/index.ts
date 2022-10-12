import { createRouter, createWebHistory } from 'vue-router';
import nProgress from '@/utils/progress';
import routes from './routes';
import routeFlat from './routeFlat';
import { useTagStore } from '@/store';
import { CHANGE_ACTIVE_NAME, ADD_VIEW, ADD_CACHE } from '@/constant/module';

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

  const tagStore = useTagStore();

  // 判断是否需要缓存
  if (!to.meta.noKeepAlive) {
    tagStore[ADD_VIEW](to);
    tagStore[ADD_CACHE](to.name as string);
  } else {
    tagStore[CHANGE_ACTIVE_NAME]('');
  }

  routeFlat(to);
  next();
});

router.afterEach(() => {
  nProgress.done();
});

export default router;