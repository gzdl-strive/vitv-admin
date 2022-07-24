<script lang="ts" setup>
import AsideBar from './components/AsideBar';
import HeaderToolBar from './components/HeaderToolBar';
import { useIconClick } from './useIconClick';
import Setting from '@/setting';
import SystemSetting from './components/SystemSetting';

const { collapse, IconClick, settingVisible, reload } = useIconClick();
</script>
<script lang="ts">
export default {
  name: 'LayoutComponent'
};
</script>

<template>
  <div class="layout-wrapper">
    <el-container class="content-wrapper">
      <aside-bar
        :collapse="collapse"
        :icon-name="Setting.SYSTEM_ICON"
        :system-name="Setting.SYSTEM_NAME"
        @icon-click="IconClick"
      ></aside-bar>
      <el-container>
        <header-tool-bar
          :collapse="collapse"
          @icon-click="IconClick"
        ></header-tool-bar>
        <el-main class="content-style">
          <router-view v-slot="{ Component }">
            <transition
              enter-active-class="animate__animated animate__fadeInUpBig"
              leave-active-class="animate__animated animate__bounceOutDown"
            >
              <component
                :is="Component"
                v-if="reload"
                :key="$route.name"
              ></component>
            </transition>
          </router-view>
        </el-main>
        <el-footer class="footer">Footer</el-footer>
      </el-container>
    </el-container>
    <system-setting v-if="settingVisible" v-model="settingVisible" />
  </div>
</template>

<style scoped lang="scss">
.layout-wrapper {
  height: 100%;

  .content-wrapper {
    height: 100%;
  }

  .content-style {
    background: $content-bg-color;
    overflow: hidden;
  }

  .footer {
    background: $content-bg-color;
  }
}
</style>
