<script lang="ts" setup>
import { computed } from 'vue';
import { useSettingStore } from '@/store';
import SystemLogo from './components/SystemLogo';
import NavMenu from './components/NavMenu';

type Props = {
  collapse: boolean;
  iconName: string;
  systemName: string;
};
defineProps<Props>();
defineEmits(['iconClick']);

const settingStore = useSettingStore();
// 侧边栏宽度--非折叠状态
const asideWidth = computed(() => settingStore.asideBarWidth);
</script>
<script lang="ts">
export default {
  name: 'AsideBar'
};
</script>

<template>
  <el-aside
    :width="collapse ? '4.6rem' : asideWidth + 'px'"
    class="aside-bar-container"
  >
    <system-logo :collapse="collapse">
      <template #logo>
        <svg-icon
          width="2.3rem"
          height="2.3rem"
          :name="iconName"
          @click="$emit('iconClick', 'collapse')"
        ></svg-icon>
      </template>
      <template #label>
        {{ systemName }}
      </template>
    </system-logo>
    <el-scrollbar>
      <nav-menu :collapse="collapse"></nav-menu>
    </el-scrollbar>
  </el-aside>
</template>

<style scoped lang="scss">
.aside-bar-container {
  overflow: hidden !important;
  background-color: $aside-bar_bg-color;
  color: $color-white;
  box-shadow: $aside-bar_shadow;
  transition: width 400ms ease;
  z-index: 150;
}

:deep(.el-menu-item) {
  &:hover {
    background-color: rgba($color: $color-gray, $alpha: 60%);
  }
}
</style>
