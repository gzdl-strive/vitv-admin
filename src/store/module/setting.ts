import { defineStore } from 'pinia';

const useSettingStore = defineStore('setting', {
  state: () => {
    return {
      count: 10
    }
  },
  getters: {
    count5(state) {
      return state.count + 5;
    }
  },
  actions: {
    changeState() {
      this.count += 10;
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
        paths: ['count']
      }
    ]
  }
});

export default useSettingStore;