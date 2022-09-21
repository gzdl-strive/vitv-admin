<script lang="ts" setup>
import { useSettingStore } from '@/store';
import SystemTitle from './components/SystemTitle';
import NavMenu from './components/NavMenu';

const settingStore = useSettingStore();
</script>
<script lang="ts">
export default {
  name: 'AsideBar'
};
</script>

<template>
  <el-aside
    class="aside-bar"
    :style="{ width: settingStore.asideWidth + 'px' }"
  >
    <system-title></system-title>
    <nav-menu></nav-menu>
  </el-aside>
</template>

<style scoped lang="scss">
.aside-bar {
  background-color: $aside-bar_bg-color;
  color: $aside-bar_text-color;
}
</style>
