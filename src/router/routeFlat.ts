import type { RouteLocationNormalized } from 'vue-router';
import { BreadcrumbItemProps } from '@/components/Layout/components/Header/typing';
import { MenuItemType } from '@/components/Layout/components/AsideBar/typing';

const routeFlat = (to: RouteLocationNormalized) => {
  if (to.matched && to.matched.length > 2) {
    for (let i = 0; i < to.matched.length; i++) {
      const element = to.matched[i];
      if (to.meta.breadcrumb && element.name !== 'index') {
        const breadcrumbItem: BreadcrumbItemProps = {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          name: element.name!,
          label: element.meta.label as string,
          type: element.meta.type as MenuItemType,
        };
        (to.meta.breadcrumb as BreadcrumbItemProps[]).push(breadcrumbItem)
      }
      if (!to.meta.breadcrumb) {
        to.meta.breadcrumb = [];
      }
      // if (element?.components?.default.name === 'AppMain') {
      //   to.matched.splice(i, 1);
      //   routeFlat(to);
      // }
    }
  } else {
    const toBreadcrumb = to.meta.breadcrumb as BreadcrumbItemProps[];
    if (!toBreadcrumb) return;
    const isToInToBreadcrumb = toBreadcrumb.some(
      (item: BreadcrumbItemProps) => item.name === to.name
    );
    if (!isToInToBreadcrumb) {
      (to.meta.breadcrumb as BreadcrumbItemProps[]).push({
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        name: to.name!,
        label: to.meta.label as string,
        type: to.meta.type as MenuItemType,
      })
    }
  }
}

export default routeFlat;