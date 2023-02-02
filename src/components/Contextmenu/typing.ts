import { RouteRecordName } from 'vue-router';

export interface ContextMenuItemProps {
  label: string
  disabled?: (routeName: string | RouteRecordName) => boolean
  onClick: (routeName: string | RouteRecordName) => void
}