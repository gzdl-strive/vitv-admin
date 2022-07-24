<script lang="ts" setup>
import { computed } from 'vue';
import { Fold, Expand, Setting, Refresh } from '@element-plus/icons-vue';
import Variables from '@/style/Variables.module.scss';
import { useSettingStore } from '@/store';
import BreadCrumb from './components/BreadCrumb';

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
    :class="settingStore.themeMode === 'dark' ? 'dark-border-bottom' : ''"
  >
    <div
      class="flex j_between a_center header-toolar-toolbox"
      :class="settingStore.themeMode === 'dark' ? 'dark-border-bottom' : ''"
    >
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
        <bread-crumb style="margin-left: 0.8rem"></bread-crumb>
      </div>
      <div class="flex a_center" style="gap: 0.5rem">
        <el-tooltip content="刷新">
          <Refresh
            class="collapse-icon"
            @click="$emit('iconClick', 'reload')"
          />
        </el-tooltip>
        <el-tooltip content="设置面板">
          <Setting
            class="collapse-icon"
            @click="$emit('iconClick', 'showSystemSetting')"
          ></Setting>
        </el-tooltip>
        <span>张三</span>
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
  z-index: 1;
  transition: height 0.4s linear;

  .header-toolar-toolbox {
    height: $header-toolbar-toolbox-height;
    box-shadow: $header-toolbar-toolbox-shadow;
    padding: 0 1rem;

    .collapse-icon {
      height: 1.8rem;
      width: 1.8rem;
      outline: none;
      transition: transform 0.5s ease-out;

      &:hover {
        cursor: pointer;
        color: $system-theme-color;
      }

      &:active {
        transform: scale(1.2);
      }
    }
  }
}

.dark-border-bottom {
  border-bottom: 0.2rem solid rgb(48 46 46);
}
</style>
