import { defineStore } from 'pinia';
import { UserStoreState, AuthorityLevel } from './typing';
import { useLoginStore } from '@/store';

const useUserStore = defineStore('user', {
  state: (): UserStoreState => {
    return {
      avatar: 'dm',
      username: '',
      password: '',
      personalSignature: "Life was like a box of chocolates. You never know what you're gonna get.",
      baseCity: '杭州',
      limitOfAuthority: 0
    }
  },
  actions: {
    changeAvatar(avatar: string) {
      this.avatar = avatar;
    },
    changeUsername(name: string, oldName = '', changeLocalStorage = false) {
      if (changeLocalStorage) {
        const loginStore = useLoginStore();
        // 判断用户名新的用户名是否已经存在
        const user = loginStore.loginInfo.find(info => info.username === name);
        if (user) {
          window.$toast('error', '该用户名已存在!');
          return;
        }
        loginStore.loginInfo.forEach(info => {
          info.username === oldName && (info.username = name);
        });
      }
      this.username = name;
    },
    changePwd(pwd: string) {
      this.password = pwd;
    },
    changePersonalSignature(signature: string) {
      this.personalSignature = signature;
    },
    changeCity(city: string) {
      this.baseCity = city;
    },
    setLimitOfAuthority(level: AuthorityLevel) {
      this.limitOfAuthority = level;
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'user-store',
        storage: localStorage,
        paths: ['username', 'avatar', 'personalSignature', 'baseCity', 'password', 'limitOfAuthority']
      },
    ]
  }
});

export default useUserStore;