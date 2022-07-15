<script lang="ts" setup>
import { computed } from 'vue';
import { Fold, Expand, Setting } from '@element-plus/icons-vue';
import Variables from '@/style/Variables.module.scss';
import { useSettingStore } from '@/store';

type Props = {
  collapse: boolean;
};
defineProps<Props>();
const emits = defineEmits(['iconClick']);

const settingStore = useSettingStore();

const showTagsView = computed(() => settingStore.showTagsView);
</script>
<script lang="ts">
export default {
  name: 'HeaderToolBar'
};
</script>

<template>
  <el-header
    :height="
      showTagsView
        ? Variables.HEADER_TOOLBAR_HEIGHT
        : Variables.HEADER_TOOLBAR_TOOLBOX_HEIGHT
    "
    class="header-tool-bar"
  >
    <div class="flex j_between a_center header-toolar-toolbox">
      <div class="flex a_center">
        <Expand
          v-if="collapse"
          class="collapse-icon"
          @click="emits('iconClick', 'collapse')"
        />
        <Fold
          v-else
          class="collapse-icon"
          @click="emits('iconClick', 'collapse')"
        />
      </div>
      <div class="flex a_center" style="gap: 0.5rem">
        <span>张三</span>
        <Setting class="collapse-icon"></Setting>
      </div>
    </div>
  </el-header>
</template>

<style scoped lang="scss">
.header-tool-bar {
  width: 100%;
  box-shadow: $header-toolbar-toolbox-shadow;
  overflow: hidden;
  background: $header-toolbar-bg-color;
  padding: 0;
  transition: height 0.4s linear;

  .header-toolar-toolbox {
    height: $header-toolbar-toolbox-height;
    box-shadow: $header-toolbar-toolbox-shadow;
    padding: 0 1rem;

    .collapse-icon {
      height: 1.8rem;
      width: 1.8rem;

      &:hover {
        cursor: pointer;
        color: $system-theme-color;
      }
    }
  }
}
</style>
