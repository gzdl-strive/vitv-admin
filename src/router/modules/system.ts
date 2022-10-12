import { RouteRecordRaw } from 'vue-router';

const AboutUs: RouteRecordRaw = {
  name: 'about',
  path: 'about',
  redirect: '/about/systemIntro',
  meta: {
    type: 'sub-menu',
    label: '关于我们',
    icon: 'about-us',
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
      }
    },
  ]
};

export default AboutUs;