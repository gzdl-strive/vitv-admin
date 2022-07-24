<script lang="ts" setup>
import { computed } from 'vue';
import { Plus, Minus } from '@element-plus/icons-vue';
import { useSettingStore } from '@/store';
import {
  SET_THEME_MODE,
  CHANGE_ASIDEBAR_WIDTH,
  SET_SYS_THEME,
  CHANGE_TAGS_VIEW
} from '@/conststant';
import { moonCom, sunCom } from './useThemeModeCom';
import Variables from '@/style/Variables.module.scss';
import Setting from '@/setting';
import { SystemTheme } from '@/types/setting';

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

// 修改系统主题配色
const changeSystemTheme = (themeName: SystemTheme) => {
  settingStore[SET_SYS_THEME](themeName);
};

// 侧边栏宽度
const asideBarWidth = computed({
  get: () => settingStore.asideBarWidth - 200,
  set: newVal => settingStore[CHANGE_ASIDEBAR_WIDTH](newVal + 200)
});
const colors = [
  { color: '#6f7ad3', percentage: 20 },
  { color: '#5cb87a', percentage: 40 },
  { color: '#1989fa', percentage: 60 },
  { color: '#e6a23c', percentage: 80 },
  { color: '#f56c6c', percentage: 100 }
];
// 修改侧边栏宽度
const updateAsideWidth = (num: number) => {
  asideBarWidth.value += num;
};

// 标签页状态
const showTagsView = computed({
  get: () => settingStore.showTagsView,
  set: newVal => settingStore[CHANGE_TAGS_VIEW](newVal)
});
</script>
<script lang="ts">
export default {
  name: 'SystemSetting'
};
</script>

<template>
  <div class="drawer-container" :class="!status ? 'dark' : ''">
    <el-drawer v-model="visible" title="系统设置" size="25%">
      <ul>
        <li class="setting-li-style">
          <span class="setting-section-title">主题</span>
          <el-switch
            v-model="status"
            size="large"
            inline-prompt
            :active-icon="moonCom"
            :inactive-icon="sunCom"
            :border-color="status ? '#fff' : 'transparent'"
            active-color="#000"
            :inactive-color="Variables.SYSTEM_THEME"
            class="setting-theme-switch"
          />
        </li>
        <li class="setting-li-style">
          <span class="setting-section-title">系统主题</span>
          <div class="flex setting-system-section">
            <template
              v-for="item in Setting.SYSTEM_THEME_LIST"
              :key="item.name"
            >
              <el-tooltip :content="item.label">
                <div
                  class="setting-system-theme"
                  :style="{ background: item.color }"
                  @click="changeSystemTheme(item.name)"
                ></div>
              </el-tooltip>
            </template>
          </div>
        </li>
        <li class="setting-li-style">
          <span class="setting-section-title">侧边栏宽度</span>
          <div class="flex a_center" style="margin-top: 0.5rem">
            <el-progress
              type="dashboard"
              :percentage="asideBarWidth"
              :color="colors"
            >
              <template #default="{ percentage }">
                <span class="percentage-value">{{ percentage + 200 }}px</span>
              </template>
            </el-progress>
            <el-button-group style="margin-left: 2rem">
              <el-button
                :icon="Minus"
                :disabled="asideBarWidth <= 0"
                color="#626aef"
                @click="updateAsideWidth(-1)"
              ></el-button>
              <el-button
                :icon="Plus"
                :disabled="asideBarWidth >= 100"
                @click="updateAsideWidth(1)"
              />
            </el-button-group>
          </div>
        </li>
        <li class="setting-li-style">
          <span class="setting-section-title">标签页</span>
          <el-switch
            v-model="showTagsView"
            size="large"
            inline-prompt
            :active-color="Variables.SYSTEM_THEME"
            class="setting-theme-switch"
          />
        </li>
      </ul>
    </el-drawer>
  </div>
</template>

<style scoped lang="scss">
.drawer-container {
  background: $system-theme-color;

  /* stylelint-disable-next-line selector-class-pattern */
  :deep(.el-drawer__title) {
    font-size: 1.3rem;
  }

  /* stylelint-disable-next-line selector-class-pattern */
  :deep(.el-drawer__body) {
    margin-top: -2rem;
    display: flex;
    flex-direction: column;
  }

  .setting-li-style {
    margin: 0.5rem 0;

    .setting-section-title {
      font-size: 1.1rem;
      display: flex;
      align-items: center;
      font-weight: bold;
      letter-spacing: 0.1rem;
    }

    .setting-section-title::before {
      /* stylelint-disable-next-line string-quotes */
      content: '';
      display: inline-block;
      width: 0.4rem;
      height: 1.3rem;
      border-radius: 0.5rem;
      background-color: $system-theme-color;
      margin-right: 0.8rem;
      margin-top: 0.15rem;
    }

    .setting-theme-switch {
      margin: 0 0 0 1rem;
    }
  }

  .setting-system-section {
    height: 3.2rem;
    margin-top: 0.5rem;

    .setting-system-theme {
      flex: 1;
      margin: 0.3rem;
      border-radius: 0.5rem;
      transition: transform 0.2s linear;
      cursor: pointer;

      &:hover {
        transform: scale(1.1);
      }
    }
  }

  .percentage-value {
    color: $theme-text-color;
  }
}

.dark {
  :deep(.el-drawer) {
    background: rgb(36 32 32);
    border-left: 1px solid rgb(85 82 82);
  }

  /* stylelint-disable-next-line selector-class-pattern */
  :deep(.el-drawer__title) {
    color: #fff;
    text-shadow: 0.1rem 0.1rem 0.2rem $system-theme-color;
  }
}
</style>
