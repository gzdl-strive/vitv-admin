import { RouteRecordName } from "vue-router";
import { MenuItemType } from "../AsideBar/typing";

export interface BreadCrumbItemProps {
  name: string | RouteRecordName;
  label: string;
  type: MenuItemType
}