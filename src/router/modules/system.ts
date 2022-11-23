import { RouteRecordRaw } from 'vue-router';

const AboutUs: RouteRecordRaw = {
  name: 'about',
  path: 'about',
  redirect: '/about/systemIntro',
  meta: {
    type: 'sub-menu',
    label: '关于我们',
    icon: 'about-us',
    limitOfAuthority: 0
  },
  children: [
    {
      name: 'systemIntro',
      path: 'systemIntro',
      component: () => import('@/views/pages/about-us/system-intro'),
      meta: {
        type: 'menu-item',
        label: "系统介绍",
        icon: 'system-intro',
        noKeepAlive: true,
        limitOfAuthority: 0
      }
    },
    {
      name: '系统信息',
      path: 'systemInfo',
      component: () => import('@/views/pages/about-us/system-info'),
      meta: {
        type: 'menu-item',
        label: "系统信息",
        icon: 'system-info',
        noKeepAlive: true,
        limitOfAuthority: 0
      }
    },
    {
      name: 'referenceAndThank',
      path: 'referenceAndThank',
      component: () => import('@/views/pages/about-us/reference-thank'),
      meta: {
        type: 'menu-item',
        label: "参考/致谢",
        icon: 'thank',
        noKeepAlive: true,
        limitOfAuthority: 0
      }
    }
  ]
};

export default AboutUs;