import { RouteRecordRaw } from "vue-router";
import { AuthorityLevel } from '@/store/module/typing';

export type MenuItemType = 'menu-item' | 'sub-menu';

export interface MenuItemProps {
  key: string;
  type?: MenuItemType;
  label?: string;
  icon?: string;
  limitOfAuthority?: AuthorityLevel;
  hidden?: boolean;
  disabled?: boolean;
  children?: MenuItemProps[] | RouteRecordRaw[];
}