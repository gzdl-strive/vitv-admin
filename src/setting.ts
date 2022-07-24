import { SettingConfig } from './types/setting';

// 系统的配置
const Setting: SettingConfig = {
  THEME_MODE: 'light',
  SYSTEM_NAME: 'vitv-admin',
  SYSTEM_ICON: 'system',
  SYSTEM_THEME_LIST: [
    { name: 'default', color: '#409EFF', label: '经典蓝' },
    { name: 'green', color: '#00B3A1', label: '生机绿' },
    { name: 'pink', color: '#FB7299', label: '少女粉' },
    { name: 'purple', color: '#DA70D6', label: '神秘紫' },
    { name: 'orange', color: '#f26406', label: '活力橙' },
    { name: 'brown', color: '#F4A460', label: '古典棕' },
    { name: 'yellow', color: '#f2f206', label: '尊贵黄' },
  ]
}

export default Setting;