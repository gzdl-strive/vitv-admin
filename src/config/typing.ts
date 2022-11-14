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

export interface THEME {
  name: THEME_NAME;
  color: string;
}

export interface AVATAR {
  name: string;
  icon: string;
}

type TechnicalData = {
  name: string;
  value: number;
  selected?: boolean;
}

type NavList = Record<'id' | 'title' | 'icon' | 'iconColor' | 'path', string> & {
  query?: string;
};

export interface Setting {
  SYSTEM_NAME: string;
  LOGO: string;
  THEME_LIST: THEME[];
  AVATAR_LIST: AVATAR[];
  TECHNICALTYPE: string[];
  TECHNICALINNERDATA: TechnicalData[];
  TECHNICALOUTTERDATA: TechnicalData[];
  QUICK_NAV_LIST: NavList[];
  DEVELOPMENT_PROCESS: number;
}