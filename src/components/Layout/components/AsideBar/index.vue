<script lang="ts" setup>
import { useSettingStore } from '@/store';

type Props = {
  isCollapse: boolean;
};

defineProps<Props>();

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
    :style="{ width: isCollapse ? '4rem' : settingStore.asideWidth + 'px' }"
  >
    <system-title :is-collapse="isCollapse"></system-title>
    <el-scrollbar>
      <nav-menu :is-collapse="isCollapse"></nav-menu>
    </el-scrollbar>
  </el-aside>
</template>

<style scoped lang="scss">
.aside-bar {
  background-color: $aside-bar_bg-color;
  box-shadow: $aside-bar_box-shaddow;
  color: $aside-bar_text-color;
  overflow: hidden !important;
  transition: width 400ms ease;
  z-index: 150;
}

:deep(.el-menu-item) {
  &:hover {
    background-color: rgba($color: $color-gray, $alpha: 60%);
  }
}
</style>
