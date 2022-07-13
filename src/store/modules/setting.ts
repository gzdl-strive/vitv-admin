import { defineStore } from 'pinia';
import { SystemTheme } from '@/types/setting';
import { SettingStoreProps } from '../typing';
import Setting from '@/setting';

const useSettingStore = defineStore({
  id: 'setting',
  state: (): SettingStoreProps => {
    return {
      systemTheme: 'default'
    }
  },
  actions: {
    SET_SYS_THEME(sysTheme: SystemTheme) {
      // 存储新的主题
      this.systemTheme = sysTheme;
      // 变更其他非element组件的主题色
      document.body.setAttribute(
        '--theme-color',
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        Setting.SYSTEM_THEME_LIST.find(item => item.name === sysTheme)!.color
      )
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        // 自定义名称
        key: 'setting-store',
        storage: localStorage,
        paths: ['sysTheme']
      }
    ]
  }
});

export default useSettingStore;
