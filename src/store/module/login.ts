import { defineStore } from 'pinia';
import { LoginStoreState } from './typing';

const useLoginStore = defineStore('login', {
  state: (): LoginStoreState => {
    return {
      remeberMe: false,
    }
  },
  actions: {
    changeRemeber(status: boolean) {
      this.remeberMe = status;
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'login-store',
        storage: localStorage,
        paths: ['remeberMe']
      }
    ]
  }
});

export default useLoginStore;