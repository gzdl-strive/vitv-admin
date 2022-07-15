import { defineStore } from 'pinia';
import { SystemTheme } from '@/types/setting';
import { SettingStoreProps } from '../typing';
import { Theme } from '@/types/setting';
import Setting from '@/setting';

const themeMode = {
  'light': 'rgba(0, 0, 0, 1)',
  'dark': 'rgba(21, 21, 21, 1)'
};

const useSettingStore = defineStore({
  id: 'setting',
  state: (): SettingStoreProps => {
    return {
      themeMode: 'light',
      systemTheme: 'default',
      asideBarWidth: 200,
      collapse: false,
      showTagsView: true,
    }
  },
  actions: {
    SET_THEME_MODE(mode: Theme) {
      this.themeMode = mode;
      console.log('===>', themeMode[mode])
      document.body.setAttribute(
        '--theme-color',
        themeMode[mode]
      )
    },
    SET_SYS_THEME(sysTheme: SystemTheme) {
      // 存储新的主题
      this.systemTheme = sysTheme;
      // 变更其他非element组件的主题色
      document.body.setAttribute(
        '--system-theme-color',
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        Setting.SYSTEM_THEME_LIST.find(item => item.name === sysTheme)!.color
      )
    },
    CHANGE_ASIDEBAR_WIDTH(width: number) {
      this.asideBarWidth = width;
    },
    CHANGE_COLLAPSE(status: boolean) {
      this.collapse = status;
    },
    CHANGE_TAGS_VIEW(status: boolean) {
      this.showTagsView = status;
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        // 自定义名称
        key: 'setting-store',
        storage: localStorage,
        paths: ['themeMode', 'sysTheme', 'asideBarWidth', 'collapse', 'showTagsView']
      }
    ]
  }
});

export default useSettingStore;
