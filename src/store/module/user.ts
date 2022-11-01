import { defineStore } from 'pinia';
import { UserStoreState } from './typing';

const useUserStore = defineStore('user', {
  state: (): UserStoreState => {
    return {
      avatar: 'dm',
      username: '张三',
      personalSignature: "Life was like a box of chocolates. You never know what you're gonna get.",
      baseCity: '杭州'
    }
  },
  actions: {
    changeAvatar(avatar: string) {
      this.avatar = avatar;
    },
    changeUsername(name: string) {
      this.username = name;
    },
    changePersonalSignature(signature: string) {
      this.personalSignature = signature;
    },
    changeCity(city: string) {
      this.baseCity = city;
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'user-store',
        storage: localStorage,
        paths: ['username', 'avatar', 'personalSignature', 'baseCity']
      },
    ]
  }
});

export default useUserStore;