<script setup lang="ts">
import { ElConfigProvider } from 'element-plus';
import { defaultConfig } from '@/config/element';
import useTitle from '@/hooks/useTitle';

useTitle();
</script>

<template>
  <el-config-provider v-bind="defaultConfig">
    <router-view></router-view>
  </el-config-provider>
</template>

<style lang="scss">
/* 滚动条 */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
  background-color: #f5f5f5;
}

/* 滚动条轨道 */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0 0 0 / 30%);
  /* stylelint-disable-next-line property-no-vendor-prefix */
  -webkit-box-shadow: inset 0 0 6px rgba(0 0 0 / 30%);
  background-color: #f5f5f5;
}

::-webkit-scrollbar-thumb {
  box-shadow: inset 0 0 6px rgba(0 0 0 / 30%);
  /* stylelint-disable-next-line property-no-vendor-prefix */
  -webkit-box-shadow: inset 0 0 6px rgba(0 0 0 / 30%);
  background-color: $theme-color;
}
</style>
