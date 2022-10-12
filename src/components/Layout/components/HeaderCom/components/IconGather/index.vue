<script lang="ts" setup>
import { computed } from 'vue';
import { useSettingStore } from '@/store';
import { CHANGE_FULLSCREEN } from '@/constant/module';

const settingStore = useSettingStore();

const fullScreen = computed({
  get: () => settingStore.fullScreen,
  set: (newVal: boolean) => settingStore[CHANGE_FULLSCREEN](newVal)
});

const changeFullScreen = () => {
  fullScreen.value = !fullScreen.value;
};
</script>
<script lang="ts">
export default {
  name: 'IconGather'
};
</script>

<template>
  <el-tooltip content="全屏">
    <svg-icon
      :name="fullScreen ? 'fullScreen-close' : 'fullScreen-open'"
      width="1.6rem"
      height="1.6rem"
      class="icon-style"
      @click="changeFullScreen"
    />
  </el-tooltip>
</template>

<style scoped lang="scss">
.icon-style {
  &:hover {
    color: $theme-color;
    cursor: pointer;
  }
}
</style>
