import { RouteRecordRaw } from 'vue-router';

const Model: RouteRecordRaw = {
  name: 'model',
  path: 'model',
  redirect: '/model/diceModel',
  meta: {
    type: 'sub-menu',
    label: 'Blender模型',
    icon: 'blender',
  },
  children: [
    {
      name: 'diceModel',
      path: 'diceModel',
      component: () => import('@/views/pages/model/dice'),
      meta: {
        type: 'menu-item',
        label: "骰子",
        icon: 'dice',
        noKeepAlive: true
      }
    },
  ]
};

export default Model;