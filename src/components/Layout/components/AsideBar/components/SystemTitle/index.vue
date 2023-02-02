<script lang="ts" setup>
import { inject } from 'vue';
import { defaultSetting } from '@/config/setting';
import { NavChange } from '@/components/Layout/typing';

type Props = {
  isCollapse: boolean;
};

const props = defineProps<Props>();

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const navCollapse = inject<NavChange>('nav-collapse')!;
const changeCollapse = () => {
  navCollapse(!props.isCollapse);
};
</script>
<script lang="ts">
export default {
  name: 'SystemTitle'
};
</script>

<template>
  <header class="system-container flex j_center a_center gap_half">
    <svg-icon :name="defaultSetting.LOGO" @click="changeCollapse"></svg-icon>
    <span v-show="!isCollapse" class="system-text">{{
      defaultSetting.SYSTEM_NAME
    }}</span>
  </header>
</template>

<style scoped lang="scss">
.system-container {
  height: $aside-bar-system-title_height;

  .system-text {
    font-size: 1.2rem;
    letter-spacing: 0.1rem;
    white-space: nowrap;
  }
}
</style>
