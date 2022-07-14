import { CommonObject } from '@/types';
import { RouteRecordRaw } from 'vue-router';

export type MenuItemType = 'item' | 'submenu';

export interface MenuItemProps extends CommonObject {
  key: string,
  type?: MenuItemType,
  label?: string,
  icon?: string,
  hidden?: boolean,
  roles?: string | string[],
  disabled?: boolean,
  children?: MenuItemProps[] | RouteRecordRaw[],
  onClick?: (event?: unknown, item?: MenuItemProps) => void
} 