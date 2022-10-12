import { defineStore } from 'pinia';
import { RouteLocationNormalized, RouteRecordName } from 'vue-router';
import { TagStoreState, ViewList } from './typing';
import router from '@/router';
import { capitalize } from '@/utils';

const clearCache = (state: TagStoreState) => {
  state.cacheList = state.viewList.map(view => capitalize(view.name as string));
}

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
    removeView(routeName: string | RouteRecordName) {
      if (routeName === 'home') return;
      const viewIndex = this.viewList.findIndex(view => view.name === routeName);
      //删除该路由
      this.viewList.splice(viewIndex, 1);
      //如果该路由并未激活，不用关心后续问题
      if (this.activeView !== routeName) {
        clearCache(this.$state);
        return;
      }
      if (viewIndex >= this.viewList.length) {
        //如果该路由的索引值不小于删除后的viewList长度，则将激活路由设置为viewList中最后一个路由
        this.activeView = this.viewList[this.viewList.length - 1].name;
      } else {
        //反之，仍然将激活路由设置为原索引对应的路由
        this.activeView = this.viewList[viewIndex].name;
      }
      //清除路由缓存
      clearCache(this.$state);
      //跳转路由
      router.push({
        name: this.activeView
      })
    },
    removeAllView() {
      if (this.viewList.length === 1) return;
      this.viewList.length = 1;
      this.activeView = 'home';
      router.push({
        name: 'home'
      });
      clearCache(this.$state);
    },
    removeRightView(routeName: string | RouteRecordName) {
      if (routeName === 'home') {
        this.removeAllView();
      } else {
        //获取该view的索引
        const viewIndex = this.viewList.findIndex((view) => view.name === routeName);
        this.viewList = this.viewList.slice(0, viewIndex + 1);
        //如果目前存在的view中，没有已激活的页面,则将传进来的页面作为激活页面
        if (!this.viewList.some(view => view.name === this.activeView)) {
          this.activeView = routeName as string;
          router.push({
            name: routeName
          })
        }
        //清除缓存路由
        clearCache(this.$state);
      }
    },
    removeOtherView(routeName: string | RouteRecordName) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const view = this.viewList.find(view => view.name === routeName)!;
      this.viewList.length = 1;
      if (routeName !== 'home') {
        this.viewList.push(view);
      }
      if (!this.viewList.some(view => view.name === this.activeView)) {
        this.activeView = routeName as string;
        router.push({
          name: routeName
        })
      }
      //清除缓存路由
      clearCache(this.$state);
    },
    changeActiveName(name: string) {
      this.activeView = name;
    },
    setViewList(viewList: ViewList[]) {
      this.viewList = viewList;
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