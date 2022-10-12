import { MenuItemType } from '@/components/Layout/components/AsideBar/typing';
import { RouteRecordName } from 'vue-router';

export interface BreadcrumbItemProps {
  name: string | RouteRecordName;
  label: string;
  type: MenuItemType;
}