import { RouteRecordRaw } from 'vue-router';

const AboutUs: RouteRecordRaw = {
  name: 'about',
  path: 'about',
  redirect: '/about/system-intro',
  meta: {
    type: 'sub-menu',
    label: '关于我们',
    icon: 'about-us',
  },
  children: [
    {
      name: 'system-intro',
      path: 'system-intro',
      component: () => import('@/views/pages/about-us/system-intro'),
      meta: {
        type: 'menu-item',
        label: "系统介绍",
        icon: 'system-intro'
      }
    },
  ]
};

export default AboutUs;