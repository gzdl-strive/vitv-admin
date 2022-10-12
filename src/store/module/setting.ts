import { defineStore } from 'pinia';
import { SettingStoreState } from './typing';
import { THEME, THEME_NAME } from '@/config/typing';
import { defaultSetting } from '@/config/setting';

const useSettingStore = defineStore('setting', {
  state: (): SettingStoreState => {
    return {
      asideWidth: 200,
      collapse: false,
      fullScreen: false,
      themeName: '蓝',
      showTag: true
    }
  },
  getters: {},
  actions: {
    changeAsideWidth(width: number) {
      this.asideWidth = width;
    },
    changeNavExpand(isCollapse: boolean) {
      this.collapse = isCollapse;
    },
    changeFullScreen(status: boolean) {
      this.fullScreen = status;
    },
    setTheme(themeName: THEME_NAME) {
      this.themeName = themeName;
      document.body.style.setProperty(
        '--theme-color',
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        defaultSetting.THEME_LIST.find((theme: THEME) => theme.name === themeName)!.color
      )
    },
    changeTagStatus(status: boolean) {
      this.showTag = status;
    }
  },
  persist: {
    // 数据持久化
    enabled: true,
    strategies: [
      {
        // 自定义名称
        key: 'setting-store',
        storage: localStorage,
        paths: ['asideWidth', 'themeName']
      },
      {
        key: 'setting-session-store',
        storage: sessionStorage,
        paths: ['fullScreen', 'collapse', 'showTag']
      }
    ]
  }
});

export default useSettingStore;