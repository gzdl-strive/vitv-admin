<script lang="ts" setup>
import { computed, ref, nextTick, provide } from 'vue';
import useSetting from './useSetting';
import useUser from './useUser';
import useFixHmr from './useFixHmr';
import { useTagStore } from '@/store';

const { isCollapse, fullScreen, settingVisible } = useSetting();

const tagStore = useTagStore();
const cacheList = computed(() => tagStore.cacheList);

const reload = ref<boolean>(true);

//刷新: 通过修改vue-router的标志位，使用v-if,来达到刷新的效果
function Reload() {
  reload.value = false;
  nextTick(() => {
    reload.value = true;
  });
}

provide('page-reload', Reload);

const { userVisible } = useUser();

const { wrap } = useFixHmr();
</script>
<script lang="ts">
export default {
  name: 'LayoutCom'
};
</script>

<template>
  <el-container id="container" v-fullscreen="fullScreen" style="height: 100%">
    <aside-bar :is-collapse="isCollapse"></aside-bar>
    <el-container class="flex column" style="overflow: hidden">
      <header-com :is-collapse="isCollapse"></header-com>
      <assist-header></assist-header>
      <el-main class="main-container">
        <router-view v-slot="{ Component, route }">
          <transition name="transformFade" mode="out-in">
            <keep-alive v-if="reload" :include="cacheList">
              <component
                :is="wrap(route.fullPath, Component)"
                :key="route.fullPath"
              ></component>
            </keep-alive>
          </transition>
        </router-view>
      </el-main>
      <!-- <el-footer>Footer</el-footer> -->
    </el-container>
  </el-container>
  <setting-pane v-if="settingVisible" v-model="settingVisible" />
  <user-pane v-if="userVisible" v-model="userVisible"></user-pane>
</template>

<style scoped lang="scss">
.main-container {
  background-color: $content-bg;
  overflow-x: hidden;
}
</style>
