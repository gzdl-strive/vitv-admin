import { RouteRecordRaw } from "vue-router";

export type MenuItemType = 'menu-item' | 'sub-menu';

export interface MenuItemProps {
  key: string;
  type?: MenuItemType;
  label?: string;
  icon?: string;
  hidden?: boolean;
  disabled?: boolean;
  children?: MenuItemProps[] | RouteRecordRaw[];
}