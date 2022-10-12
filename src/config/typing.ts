export interface ElementDefaultConfig {
  readonly size?: 'small' | 'default' | 'large',
  readonly zIndex?: number;
  readonly button?: {
    autoInsertSpace: boolean;
  };
  readonly message?: {
    max: number;
  }
}

export type THEME_NAME = '蓝' | '绿' | '粉' | '紫' | '棕';

export interface THEME_LIST {
  name: THEME_NAME;
  color: string;
}

export interface AVATAR_LIST {
  name: string;
  icon: string;
}

export interface Setting {
  SYSTEM_NAME: string;
  LOGO: string;
  THEME_LIST: THEME_LIST[];
  AVATAR_LIST: AVATAR_LIST[];
}