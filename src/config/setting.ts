import { Setting } from './typing';

const defaultSetting: Setting = {
  SYSTEM_NAME: 'vitv-admin',
  LOGO: 'logo',
  THEME_LIST: [
    { name: '蓝', color: '#228CF6' },
    { name: '绿', color: '#00B3A1' },
    { name: '粉', color: '#FB7299' },
    { name: '紫', color: '#DA70D6' },
    { name: '棕', color: '#F4A460' }
  ],
  AVATAR_LIST: [
    { name: '死侍', icon: 'dm' },
    { name: '蜘蛛侠', icon: 'sm' },
    { name: '钢铁侠', icon: 'im' },
    { name: '毒液', icon: 'vm' },
    { name: '金刚狼', icon: 'wm' },
    { name: '格鲁特', icon: 'gt' },
    { name: '雷神', icon: 'tr' },
    { name: '黑寡妇', icon: 'bwm' },
  ],
  TECHNICALTYPE: [
    'Vue3',
    'TS',
    'Vite',
    'Scss',
    'Vue-Router',
    'Pinia',
    'Element-Plus',
    'ThreeJS',
    'Echarts'
  ],
  TECHNICALINNERDATA: [
    { value: 1200, name: 'Vue3' },
    { value: 1000, name: 'TS', selected: true },
    { value: 500, name: 'Scss' }
  ],
  TECHNICALOUTTERDATA: [
    { value: 50, name: 'Vite' },
    { value: 80, name: 'Vue3' },
    { value: 70, name: 'TS' },
    { value: 50, name: 'Scss' },
    { value: 40, name: 'Vue-Router' },
    { value: 40, name: 'Pinia' },
    { value: 50, name: 'Element-Plus' },
    { value: 20, name: 'ThreeJS' },
    { value: 30, name: 'Echarts' }
  ],
  QUICK_NAV_LIST: [
    {
      id: '001',
      title: 'TS类型挑战',
      icon: 'ts',
      iconColor: '#00d8ff',
      path: '/challenge/tsChallenge'
    },
    {
      id: '002',
      title: '基础挑战',
      icon: 'development',
      iconColor: '#ebad6c',
      path: '/challenge/frontEndBase'
    },
    {
      id: '003',
      title: '模型合集',
      icon: 'model',
      iconColor: '#59e3d7',
      path: '/model/commonModel'
    },
    {
      id: '004',
      title: '账号管理',
      icon: 'account',
      iconColor: '#386bf3',
      path: '/backStage/account'
    },
    {
      id: '005',
      title: '系统介绍',
      icon: 'system-intro',
      iconColor: '#e89176',
      path: '/about/systemIntro'
    }
  ],
  DEVELOPMENT_PROCESS: 90,
  USER_PANNEL_LIMIT: {
    USERNAME: 2,
    AVATAR: 1,
    SIGNATURE: 2,
    CITY: 2
  },
  REGISTER_ADMIN_PWD: 'admin'
};

export {
  defaultSetting
}