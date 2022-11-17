import { defineStore } from 'pinia';
import { UserStoreState } from './typing';
import { useLoginStore } from '@/store';

const useUserStore = defineStore('user', {
  state: (): UserStoreState => {
    return {
      avatar: 'dm',
      username: '',
      password: '',
      personalSignature: "Life was like a box of chocolates. You never know what you're gonna get.",
      baseCity: '杭州'
    }
  },
  actions: {
    changeAvatar(avatar: string) {
      this.avatar = avatar;
    },
    changeUsername(name: string, oldName = '', changeLocalStorage = false) {
      this.username = name;
      if (changeLocalStorage) {
        const loginStore = useLoginStore();
        loginStore.loginInfo.forEach(info => {
          info.username === oldName && (info.username = name);
        });
      }
    },
    changePwd(pwd: string) {
      this.password = pwd;
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
        paths: ['username', 'avatar', 'personalSignature', 'baseCity', 'password']
      },
    ]
  }
});

export default useUserStore;