<script lang="ts" setup>
import { computed } from 'vue';
import AsideBar from './components/AsideBar/index.vue';
import HeaderCom from './components/Header/index.vue';
import AssistHeader from './components/Assist';
import useSetting from './useSetting';
import SettingPane from './components/SettingPane';
import { useTagStore } from '@/store';

const { isCollapse, fullScreen, settingVisible } = useSetting();

const tagStore = useTagStore();
const cacheList = computed(() => tagStore.cacheList);
</script>
<script lang="ts">
export default {
  name: 'LayoutCom'
};
</script>

<template>
  <el-container v-fullscreen="fullScreen" style="height: 100%">
    <aside-bar :is-collapse="isCollapse"></aside-bar>
    <el-container class="flex column" style="overflow: hidden">
      <header-com :is-collapse="isCollapse"></header-com>
      <assist-header></assist-header>
      <el-main>
        <router-view v-slot="{ Component }">
          <transition name="transformFade" mode="out-in">
            <keep-alive :include="cacheList">
              <component :is="Component"></component>
            </keep-alive>
          </transition>
        </router-view>
      </el-main>
      <!-- <el-footer>Footer</el-footer> -->
    </el-container>
  </el-container>
  <setting-pane v-if="settingVisible" v-model="settingVisible" />
</template>
