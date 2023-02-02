import { defineStore } from 'pinia';
import { LoginStoreState, LoginInfoItem, EditLoginInfoItem } from './typing';
import getCurDate from '@/utils/date';

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
      const { currentDate } = getCurDate(new Date());
      if (info) {
        info.password === password && (info.count += 1);
        info.password !== password 
          && (info.password = password) 
          && (info.count = 1) 
          && (info.createTime = currentDate);
      } else {
        // 2、不一致添加到loginInfoList末尾
        // 调整
        this.adjustLoginInfo();
        this.loginInfo.push({
          username,
          password,
          count: 1,
          createTime: currentDate,
        });
        this.loginInfo.length > 5 && this.loginInfo.shift();
      }
    },
    // 删除账号
    removeLoginInfoItem(username: string) {
      this.loginInfo = this.loginInfo.filter(info => info.username !== username);
    },
    // 编辑账号
    editLoginInfoItem(oldUser: EditLoginInfoItem, newUser: EditLoginInfoItem) {
      const info = this.loginInfo.find(info => {
        return info.username === oldUser.username;
      });
      if (!info) {
        return {
          code: '404',
          success: false,
          message: '未找到账号',
        }
      }
      info.username = newUser.username;
      info.password = newUser.password;
      info.count = 1;
      const { currentDate } = getCurDate(new Date());
      info.createTime = currentDate;
      return {
        code: '200',
        success: true,
        message: '修改成功'
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