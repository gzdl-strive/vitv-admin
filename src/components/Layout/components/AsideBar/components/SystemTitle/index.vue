<script lang="ts" setup>
import { defaultSetting } from '@/config/setting';
</script>
<script lang="ts">
export default {
  name: 'SystemTitle'
};
</script>

<template>
  <header class="system-container flex j_center a_center gap_half">
    <svg-icon :name="defaultSetting.LOGO"></svg-icon>
    <span class="system-text">{{ defaultSetting.SYSTEM_NAME }}</span>
  </header>
</template>

<style scoped lang="scss">
.system-container {
  height: $aside-bar-system-title_height;

  .system-text {
    font-size: 1.2rem;
    letter-spacing: 0.1rem;
  }
}
</style>
