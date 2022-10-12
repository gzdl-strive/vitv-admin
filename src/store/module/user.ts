import { defineStore } from 'pinia';
import { UserStoreState } from './typing';

const useUserStore = defineStore('user', {
  state: (): UserStoreState => {
    return {
      avatar: 'dm',
      username: '张三',
      personalSignature: '码农'
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
    }
  }
});

export default useUserStore;