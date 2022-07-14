// Setting
export type SettingStoreProps = {
  systemTheme: string;
  asideBarWidth: number;
  collapse: boolean;
};

// User
export type UserStoreProps = {
  username: string;
  headAvatar: string;
  isLogin: boolean;
  isLoaded: boolean;
}