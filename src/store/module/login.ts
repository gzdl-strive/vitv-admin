import { defineStore } from 'pinia';
import { LoginStoreState } from './typing';

const useLoginStore = defineStore('login', {
  state: (): LoginStoreState => {
    return {
      remeberMe: false,
      loginInfoList: []
    }
  },
  actions: {
    changeRemeber(status: boolean) {
      this.remeberMe = status;
    },
    // 设置登录账户的信息数组
    setLoginInfoList(username: string, password: string) {
      // 1、判断是否和之前的用户名一致，如果一致的话，更新密码
      const loginInfo = this.loginInfoList.find(loginInfo => loginInfo.username === username);
      if (loginInfo) {
        loginInfo.password = password;
        loginInfo.count = 1;
      } else {
        this.loginInfoList.push({
          username,
          password,
          count: 1
        });
      }
      // 2、不一致添加到loginInfoList末尾
      this.adjustLoginInfoList();
    },
    // 调整登录信息数组
    adjustLoginInfoList() {
      console.log(this.loginInfoList);
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'login-store',
        storage: localStorage,
        paths: ['remeberMe', 'loginInfoList']
      }
    ]
  }
});

export default useLoginStore;