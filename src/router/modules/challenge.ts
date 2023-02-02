import { RouteRecordRaw } from 'vue-router';

const ChallengeRoutes: RouteRecordRaw = {
  name: 'challenge',
  path: 'challenge',
  redirect: '/challenge/tsChallenge',
  meta: {
    type: 'sub-menu',
    label: '挑战',
    icon: 'challenge',
    limitOfAuthority: 2
  },
  children: [
    {
      name: 'tsChallenge',
      path: 'tsChallenge',
      component: () => import('@/views/pages/challenge/typescript'),
      meta: {
        type: 'menu-item',
        label: "TS类型挑战",
        icon: 'ts',
        limitOfAuthority: 2
      }
    },
    {
      name: 'frontEndBase',
      path: 'frontEndBase',
      component: () => import('@/views/pages/challenge/base'),
      meta: {
        type: 'menu-item',
        label: "基础挑战",
        icon: 'development',
        limitOfAuthority: 2
      }
    }
  ]
};

export default ChallengeRoutes;