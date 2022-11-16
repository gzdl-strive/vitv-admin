export interface SettingStoreState {
  asideWidth: number;
  collapse: boolean;
  fullScreen: boolean;
  themeName: string;
  showTag: boolean;
}

type loginInfo = {
  username: string;
  password: string;
  count: number;
}

export interface LoginStoreState {
  remeberMe: boolean;
  loginInfoList: loginInfo[];
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
  password: string;
  personalSignature: string;
  baseCity: string;
}