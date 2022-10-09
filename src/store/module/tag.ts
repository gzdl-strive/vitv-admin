import { defineStore } from 'pinia';
import { RouteLocationNormalized } from 'vue-router';
import { TagStoreState } from './typing';
import { capitalize } from '@/utils';

const useTagStore = defineStore('tag', {
  state: (): TagStoreState => {
    return {
      activeView: 'home',
      viewList: [{
        name: 'home',
        label: '主页'
      }],
      cacheList: []
    }
  },
  getters: {},
  actions: {
    addView(route: RouteLocationNormalized) {
      const routeName = route.name as string;
      const routeLabel = route.meta.label as string;

      const isViewExist = this.viewList.some(view => view.name === routeName);

      if (!isViewExist) {
        this.viewList.push({
          name: routeName,
          label: routeLabel
        })
      }
      //将激活路由切换为该路由
      this.activeView = routeName;
    },
    changeActiveName(name: string) {
      this.activeView = name;
    },
    addCache(routeName: string) {
      const componentName = capitalize(routeName);
      // 判断路由是否已经存在
      const isViewExist = this.cacheList.some(viewName => viewName === componentName);
      if (!isViewExist) {
        this.cacheList.push(componentName);
      }
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'tag-store',
        storage: sessionStorage,
      }
    ]
  }
});

export default useTagStore;