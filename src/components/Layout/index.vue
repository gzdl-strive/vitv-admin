<script lang="ts" setup>
import AsideBar from './components/AsideBar';
import HeaderToolBar from './components/HeaderToolBar';
import { useIconClick } from './useIconClick';
import Setting from '@/setting';
import SystemSetting from './components/SystemSetting';

const { collapse, IconClick, settingVisible } = useIconClick();
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
          <router-view></router-view>
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
  }

  .footer {
    background: $theme-color;
  }
}
</style>
