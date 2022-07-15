import { Theme } from '@/types/setting';

// Setting
export type SettingStoreProps = {
  themeMode: Theme;
  systemTheme: string;
  asideBarWidth: number;
  collapse: boolean;
  showTagsView: boolean;
};

// User
export type UserStoreProps = {
  username: string;
  headAvatar: string;
  isLogin: boolean;
  isLoaded: boolean;
}