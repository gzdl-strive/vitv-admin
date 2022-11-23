export interface SettingStoreState {
  asideWidth: number;
  collapse: boolean;
  fullScreen: boolean;
  themeName: string;
  showTag: boolean;
}

export type LoginInfoItem = {
  username: string;
  password: string;
  count: number;
}

export type LoginStoreState = {
  remeberMe: boolean;
  loginInfo: LoginInfoItem[];
  isLogin: boolean;
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

export type AuthorityLevel = 0 | 1 | 2 | 3;

export interface UserStoreState {
  avatar: string;
  username: string;
  password: string;
  personalSignature: string;
  baseCity: string;
  limitOfAuthority: AuthorityLevel;
}