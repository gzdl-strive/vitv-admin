import { RouteRecordRaw } from 'vue-router';

const Model: RouteRecordRaw = {
  name: 'model',
  path: 'model',
  redirect: '/model/dice',
  meta: {
    type: 'sub-menu',
    label: 'Blender模型',
    icon: 'blender',
  },
  children: [
    {
      name: 'dice',
      path: 'dice',
      component: () => import('@/views/pages/model/dice'),
      meta: {
        type: 'menu-item',
        label: "骰子",
        icon: 'dice'
      }
    },
  ]
};

export default Model;