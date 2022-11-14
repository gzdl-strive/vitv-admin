import { RouteRecordRaw } from 'vue-router';

const Model: RouteRecordRaw = {
  name: 'model',
  path: 'model',
  redirect: '/model/commonModel',
  meta: {
    type: 'sub-menu',
    label: 'Blender模型',
    icon: 'blender',
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
        noKeepAlive: true
      }
    },
    {
      name: 'roomModel',
      path: 'roomModel',
      component: () => import('@/views/pages/model/room'),
      meta: {
        type: 'menu-item',
        label: "ROOM IN 3D",
        icon: 'room',
        noKeepAlive: true
      }
    }
  ]
};

export default Model;