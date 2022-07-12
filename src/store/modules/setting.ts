import { defineStore } from 'pinia';
import { Theme } from '@/types/setting';
import Setting from '@/setting';

const useSettingStore = defineStore({
  id: 'setting',
  state: () => {
    return {
      theme: 'default'
    }
  },
  actions: {
    SET_THEME(theme: Theme) {
      // 存储新的主题
      this.theme = theme;
      // 变更其他非element组件的主题色
      document.body.setAttribute(
        '--theme-color',
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        Setting.THEME_LIST.find(item => item.name === theme)!.color
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
        paths: ['theme']
      }
    ]
  }
});

export default useSettingStore;
