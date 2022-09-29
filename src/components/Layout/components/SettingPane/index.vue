<script lang="ts" setup>
import { computed } from 'vue';

type Props = {
  modelValue: boolean;
};
const props = defineProps<Props>();
const emits = defineEmits(['update:modelValue']);

const visible = computed({
  get: () => props.modelValue,
  set: (newVal: boolean) => emits('update:modelValue', newVal)
});
</script>
<script lang="ts">
export default {
  name: 'SettingPane'
};
</script>

<template>
  <div class="setting-pane">
    <el-drawer v-model="visible" :size="400" title="设置面板">
      <span>这是设置</span>
    </el-drawer>
  </div>
</template>

<style scoped lang="scss">
.setting-pane {
  &:deep(.el-drawer) {
    background-color: #fff;
  }

  /* stylelint-disable-next-line selector-class-pattern */
  &:deep(.el-drawer__header) {
    height: 3.6rem;
    margin-bottom: 0;
    padding: 0;
  }

  /* stylelint-disable-next-line selector-class-pattern */
  &:deep(.el-drawer__header > :first-child) {
    font-size: 1.1rem;
    margin-left: 1.2rem;
  }

  /* stylelint-disable-next-line selector-class-pattern */
  &:deep(.el-drawer__close-btn) {
    height: 100%;
    width: 3.6rem;
  }

  /* stylelint-disable-next-line selector-class-pattern */
  &:deep(.el-drawer__close) {
    width: 3.6rem;
    height: 100%;
    font-size: 1.3rem;
  }

  .setting-container {
    .setting-label {
      font-size: 1.1rem;

      &::before {
        /* stylelint-disable-next-line string-quotes */
        content: '';
        width: 0.5rem;
        height: 1.1rem;
        margin-right: 0.5rem;
        display: inline-block;
        background-color: $color-primary;
        border-radius: 0.2rem;
        transform: translateY(0.25rem);
      }
    }

    .setting-item {
      margin: 1rem 0 0;

      .theme-block {
        width: 2rem;
        height: 2rem;
        box-shadow: 0 0.1rem 0.3rem 0 rgb(0 0 0 / 30%);
        border-radius: 0.3rem;
        cursor: pointer;
        margin: 0 0.5rem;
      }
    }
  }
}
</style>
