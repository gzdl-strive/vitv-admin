import { defineStore } from 'pinia';
import { UserStoreProps } from '../typing';

const useUserStore = defineStore({
  id: 'user',
  state: (): UserStoreProps => {
    return {
      username: '张三',
      headAvatar: 'head_p_boy',
      isLogin: false, // 是否登陆过
      isLoaded: false // 是否展示过load动画
    }
  },
  actions: {
    SET_LOGIN_STATUS(status: boolean) {
      this.isLogin = status;
    },
    SET_LOAD_STATUS(status: boolean) {
      this.isLoaded = status;
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        // 自定义名称
        key: 'user-store',
        storage: localStorage,
        paths: ['isLoaded', 'isLogin']
      }
    ]
  }
});

export default useUserStore;
