import { ContextMenuItemProps } from '@/components/Contextmenu/typing';
import type { VNode } from 'vue';
import { RouteRecordName } from 'vue-router';

export type NavChange = (val: boolean) => void;

export interface ContextMenuProps {
  show: boolean,
  style: {
    top: string,
    left: string
  },
  routeName: RouteRecordName | string,
  menu: ContextMenuItemProps[]
}

export type Reload = (routeName: string | RouteRecordName) => void

export type Wrapper = {
  name: string;
  render: () => VNode;
}