// 系统设置

// * 1、主题
export type Theme = 'light' | 'dark';

// * 2、系统主题
// 系统主题的类型
export type SystemTheme = 'default' | 'green' | 'pink' | 'purple' | 'brown';
// 系统主题项
export interface SystemThemeListItem {
  name: SystemTheme;
  color: string;
}

// * 3、头像

// * 设置配置
export interface SettingConfig {
  THEME_MODE: Theme;
  SYSTEM_ICON: string; // 系统图标名
  SYSTEM_NAME: string; // 系统名称
  SYSTEM_THEME_LIST: SystemThemeListItem[]; // 主题列表
}