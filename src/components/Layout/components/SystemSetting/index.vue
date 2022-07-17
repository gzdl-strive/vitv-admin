<script lang="ts" setup>
import { computed } from 'vue';
import { useSettingStore } from '@/store';
import { SET_THEME_MODE } from '@/conststant';
import { moonCom, sunCom } from './useThemeModeCom';
import Variables from '@/style/Variables.module.scss';

type Props = {
  modelValue: boolean;
};
const props = defineProps<Props>();
const emits = defineEmits(['update:modelValue']);

const visible = computed({
  get: () => props.modelValue,
  set: newVal => emits('update:modelValue', newVal)
});

// 主题状态
const settingStore = useSettingStore();
const status = computed({
  get: () => (settingStore.themeMode === 'light' ? true : false),
  set: newVal => settingStore[SET_THEME_MODE](newVal ? 'light' : 'dark')
});
</script>
<script lang="ts">
export default {
  name: 'SystemSetting'
};
</script>

<template>
  <div class="drawer-container">
    <el-drawer v-model="visible" title="系统设置" size="25%">
      <el-divider>
        <span class="divider-text">主题</span>
      </el-divider>
      <el-switch
        v-model="status"
        size="large"
        inline-prompt
        :active-icon="moonCom"
        :inactive-icon="sunCom"
        active-color="#000"
        :border-color="status ? '#fff' : 'transparent'"
        :inactive-color="Variables.SYSTEM_THEME"
      />
    </el-drawer>
  </div>
</template>

<style scoped lang="scss">
.drawer-container {
  background: $system-theme-color;

  .divider-text {
    font-size: 1.2rem;
    color: $theme-color;
  }

  /* stylelint-disable-next-line selector-class-pattern */
  :deep(.el-drawer__title) {
    font-size: 1.3rem;
    color: $system-theme-color;
  }

  /* stylelint-disable-next-line selector-class-pattern */
  :deep(.el-drawer__body) {
    margin-top: -3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
