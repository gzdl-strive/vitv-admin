import { RouteRecordRaw } from 'vue-router';

const Model: RouteRecordRaw = {
  name: 'model',
  path: 'model',
  redirect: '/model/commonModel',
  meta: {
    type: 'sub-menu',
    label: 'Blender模型',
    icon: 'blender',
    limitOfAuthority: 2
  },
  children: [
    {
      name: 'commonModel',
      path: 'commonModel',
      component: () => import('@/views/pages/model/common'),
      meta: {
        type: 'menu-item',
        label: "模型合集",
        icon: 'model',
        noKeepAlive: true,
        limitOfAuthority: 2
      }
    }
  ]
};

export default Model;