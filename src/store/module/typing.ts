export interface SettingStoreState {
  asideWidth: number;
  collapse: boolean;
  fullScreen: boolean;
}

export interface LoginStoreState {
  remeberMe: boolean;
}

type ViewList = {
  name: string;
  label: string;
}

export interface TagStoreState {
  activeView: string;
  viewList: ViewList[];
  cacheList: string[];
}