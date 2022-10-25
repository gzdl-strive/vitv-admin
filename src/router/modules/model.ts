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
    {
      name: 'yjcModel',
      path: 'yjcModel',
      component: () => import('@/views/pages/model/yjc'),
      meta: {
        type: 'menu-item',
        label: "羊角锤",
        icon: 'yjc',
        noKeepAlive: true
      }
    }
  ]
};

export default Model;