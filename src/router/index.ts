import { createRouter, createWebHistory } from 'vue-router';
import nProgress from '@/utils/progress';
import routes from './routes';
import routeFlat from './routeFlat';
import { useTagStore, useLoginStore, useUserStore } from '@/store';
import { CHANGE_ACTIVE_NAME, ADD_VIEW, ADD_CACHE } from '@/constant/module';
import { AuthorityLevel } from '@/store/module/typing';

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
  const loginStore = useLoginStore();
  const userStore = useUserStore();

  // 当没有登陆过且要去的页面不是，重定向到登录页
  if (!loginStore.isLogin && to.path !== '/login') {
    window.$toast('error', '未通过账号登录!');
    router.push('/login');
  }

  // 判断当前权限是否能访问
  if (userStore.limitOfAuthority < (to.meta.limitOfAuthority as AuthorityLevel)) {
    window.$toast('error', '当前账号权限不足!');
    next(from.path);
    return;
  }

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