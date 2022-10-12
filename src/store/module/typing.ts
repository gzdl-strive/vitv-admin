export interface SettingStoreState {
  asideWidth: number;
  collapse: boolean;
  fullScreen: boolean;
  themeName: string;
  showTag: boolean;
}

export interface LoginStoreState {
  remeberMe: boolean;
}

export type ViewList = {
  name: string;
  label: string;
}

export interface TagStoreState {
  activeView: string;
  viewList: ViewList[];
  cacheList: string[];
}

export interface UserStoreState {
  avatar: string;
  username: string;
  personalSignature: string;
}