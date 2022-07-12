import { SettingConfig } from './types/setting';

// 系统的配置
const Setting: SettingConfig = {
  SYSTEM_NAME: 'vitv-admin',
  SYSTEM_ICON: 'leaf',
  SYSTEM_THEME_LIST: [
    { name: 'default', color: '#409EFF' },
    { name: 'green', color: '#00B3A1' },
    { name: 'pink', color: '#FB7299' },
    { name: 'purple', color: '#DA70D6' },
    { name: 'brown', color: '#F4A460' }
  ]
}

export default Setting;