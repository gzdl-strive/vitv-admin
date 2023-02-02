import { RouteRecordRaw } from 'vue-router';

const BackStageRoutes: RouteRecordRaw = {
  name: 'backStage',
  path: 'backStage',
  redirect: '/backStage/account',
  meta: {
    type: 'sub-menu',
    label: '后台管理',
    icon: 'back-stage',
    limitOfAuthority: 2,
    noKeepAlive: true,
  },
  children: [
    {
      name: 'account',
      path: 'account',
      component: () => import('@/views/pages/back-stage/account'),
      meta: {
        type: 'menu-item',
        label: "账号管理",
        icon: 'account',
        limitOfAuthority: 2,
        noKeepAlive: true,
      }
    },
  ]
};

export default BackStageRoutes;