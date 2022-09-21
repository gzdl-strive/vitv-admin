import { defineStore } from 'pinia';
import { SettingStoreState } from './typing';

const useSettingStore = defineStore('setting', {
  state: (): SettingStoreState => {
    return {
      asideWidth: 200,
    }
  },
  getters: {},
  actions: {
    changeAsideWidth(width: number) {
      this.asideWidth = width;
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
        paths: ['asideWidth']
      }
    ]
  }
});

export default useSettingStore;