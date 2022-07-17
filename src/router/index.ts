import { createRouter, createWebHistory } from 'vue-router';
import type { RouteLocationNormalized } from 'vue-router';
import { BreadCrumbItemProps } from '@/components/Layout/components/HeaderToolBar/typing';
import { MenuItemType } from '@/components/Layout/components/AsideBar/typing'
import routes from './routes';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    ...routes
  ]
});

// 路由扁平化 ==> 目的：制作面包屑导航
const handleKeepAlive = (to: RouteLocationNormalized) => {
  //判断目标路由记录是否大于2
  if (to.matched && to.matched.length > 2) {
    //遍历路由记录，制作面包屑导航列表，并删除依赖与AppMain组件的中间组件，实现路由扁平化
    for (let i = 0; i < to.matched.length; i++) {
      const element = to.matched[i];
      if (to.meta.breadcrumb && element.name !== 'index') {
        (to.meta.breadcrumb as BreadCrumbItemProps[]).push({
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          name: element.name!,
          label: element.meta.label as string,
          type: element.meta.type as MenuItemType
        })
      }
      if (!to.meta.breadcrumb) {
        to.meta.breadcrumb = [];
      }
      if (element.components.default.name === 'AppMain') {
        to.matched.splice(i, 1);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        handleKeepAlive(to);
      }
    }
  } else {
    //当路由扁平化完毕的时候，将目标路由自身加入到面包屑中
    const toBreadcrumb = to.meta.breadcrumb as BreadCrumbItemProps[];
    if (!toBreadcrumb) return;
    const isToInToBreadcrumb = toBreadcrumb.some(
      (item: BreadCrumbItemProps) => item.name === to.name
    );
    if (!isToInToBreadcrumb) {
      (to.meta.breadcrumb as BreadCrumbItemProps[]).push({
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        name: to.name!,
        label: to.meta.label as string,
        type: to.meta.type as MenuItemType,
      })
    }
  }
}

router.beforeEach((to, _f, next) => {
  handleKeepAlive(to);
  next();
});

export default router;