import { RouteRecordRaw } from 'vue-router';

const TestRoutes: RouteRecordRaw = {
  name: 'test',
  path: 'test',
  redirect: '/test/test1',
  meta: {
    type: 'sub-menu',
    label: '测试',
    icon: 'home',
  },
  children: [
    {
      name: 'test1',
      path: 'test1',
      component: () => import('@/views/test/test1'),
      meta: {
        type: 'menu-item',
        label: "Test1",
        icon: 'home'
      }
    },
    {
      name: 'test2',
      path: 'test2',
      component: () => import('@/views/test/test2'),
      meta: {
        type: 'menu-item',
        label: "Test2",
        icon: 'home'
      }
    }
  ]
};

export default TestRoutes;