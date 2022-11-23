import { defineStore } from 'pinia';
import { LoginStoreState, LoginInfoItem } from './typing';

const useLoginStore = defineStore('login', {
  state: (): LoginStoreState => {
    return {
      remeberMe: false,
      loginInfo: [],
      isLogin: false,
    }
  },
  getters: {},
  actions: {
    changeRemeber(status: boolean) {
      this.remeberMe = status;
    },
    // 设置登录账户的信息数组
    changeLoginInfo(username: string, password: string) {
      // 1、判断是否和之前的用户名一致，如果一致的话，判断密码是否一致，密码不一致，更新密码，密码一致，count++
      const info = this.loginInfo.find(info => {
        return info.username === username;
      });
      if (info) {
        info.password === password && (info.count += 1);
        info.password !== password && (info.password = password) && (info.count = 1);
      } else {
        // 2、不一致添加到loginInfoList末尾
        // 调整
        this.adjustLoginInfo();
        this.loginInfo.push({
          username,
          password,
          count: 1
        });
        this.loginInfo.length > 5 && this.loginInfo.shift();
      }
    },
    adjustLoginInfo() {
      this.loginInfo = this.loginInfo.sort((a: LoginInfoItem, b: LoginInfoItem) => a.count - b.count);
    },
    changeLoginStatus(status: boolean) {
      this.isLogin = status;
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'login-store',
        storage: localStorage,
        paths: ['remeberMe', 'loginInfo', 'isLogin']
      },
    ]
  }
});

export default useLoginStore;