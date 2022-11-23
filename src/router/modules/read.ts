import { RouteRecordRaw } from 'vue-router';

const Read: RouteRecordRaw = {
  name: 'read',
  path: 'read',
  redirect: '/read/professionalJS',
  meta: {
    type: 'sub-menu',
    label: '阅读',
    icon: 'read',
    limitOfAuthority: 2
  },
  children: [
    {
      name: 'professionalJS',
      path: 'professionalJS',
      component: () => import('@/views/pages/read/professionalJS'),
      meta: {
        type: 'menu-item',
        label: "JS高级程序设计",
        icon: 'js',
        noKeepAlive: true,
        limitOfAuthority: 2
      }
    },
  ]
};

export default Read;