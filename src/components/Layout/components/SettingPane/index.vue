<script lang="ts" setup>
import { computed } from 'vue';
import { defaultSetting } from '@/config/setting';
import { THEME_LIST as THEME } from '@/config/typing';
import { useSettingStore } from '@/store';
import {
  SET_THEME,
  CHANGE_TAG_STATUS,
  CHANGE_ASIDE_WIDTH
} from '@/constant/module';

type Props = {
  modelValue: boolean;
};
const props = defineProps<Props>();
const emits = defineEmits(['update:modelValue']);

const settingStore = useSettingStore();

const visible = computed({
  get: () => props.modelValue,
  set: (newVal: boolean) => emits('update:modelValue', newVal)
});
const showTag = computed<boolean>({
  get: () => settingStore.showTag,
  set: (newVal: boolean) => settingStore[CHANGE_TAG_STATUS](newVal)
});
const setTheme = (theme: THEME) => {
  settingStore[SET_THEME](theme.name);
};

const asideWidth = computed<number>({
  get: () => settingStore.asideWidth,
  set: (newVal: number) => settingStore[CHANGE_ASIDE_WIDTH](newVal)
});
</script>
<script lang="ts">
export default {
  name: 'SettingPane'
};
</script>

<template>
  <div class="setting-pane">
    <el-drawer v-model="visible" :size="400" title="系统设置面板">
      <ul>
        <li class="setting-item" style="width: 80%">
          <h3>
            <span>主题配色</span>
          </h3>
          <section class="flex gap_one">
            <section
              v-for="theme in defaultSetting.THEME_LIST"
              :key="theme.name"
              :class="
                theme.name === settingStore.themeName
                  ? 'theme-item active-theme'
                  : 'theme-item'
              "
              :style="{ backgroundColor: theme.color }"
              @click="setTheme(theme)"
            ></section>
          </section>
        </li>
        <el-divider></el-divider>
        <li class="setting-item" style="width: 65%">
          <h3>
            <span>是否展示标签栏</span>
          </h3>
          <el-switch
            v-model="showTag"
            active-text="显示标签"
            inactive-text="隐藏标签"
            class="ml-2 tag-style"
            style="user-select: none"
          />
        </li>
        <el-divider> </el-divider>
        <li class="setting-item" style="width: 55%">
          <h3>
            <span>侧边栏宽度</span>
          </h3>
          <el-input-number
            v-model="asideWidth"
            :step="2"
            :min="200"
            :max="300"
            class="aside-style"
          />
        </li>
      </ul>
    </el-drawer>
  </div>
</template>

<style scoped lang="scss">
/* stylelint-disable selector-class-pattern */
.setting-pane {
  overflow: hidden;

  &:deep(.el-drawer) {
    background-color: #fff;
  }

  &:deep(.el-drawer__header) {
    height: 3.6rem;
    margin-bottom: 0;
    padding: 0;
  }

  &:deep(.el-drawer__header > :first-child) {
    font-size: 1.1rem;
    margin-left: 1.2rem;
  }

  &:deep(.el-drawer__close-btn) {
    height: 100%;
    width: 3.6rem;
  }

  &:deep(.el-drawer__close) {
    width: 3.6rem;
    height: 100%;
    font-size: 1.3rem;
  }

  &:deep(.el-drawer__body) {
    padding-top: 0.8rem;
  }

  .setting-item {
    margin: 2rem 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2rem;

    h3 {
      position: relative;

      &::before {
        /* stylelint-disable-next-line string-quotes */
        content: '';
        border-bottom: 2px solid #4dd0e1;
        width: 100%;
        display: block;
        height: 40px;
        position: absolute;
        left: 0;
        top: 0;
        bottom: -2px;
        margin: auto;
        background-size: 40px 40px;
        /* stylelint-disable-next-line string-quotes */
        background-image: url('/image/write.png');
        background-repeat: no-repeat;
        animation-duration: 8s;
        animation-timing-function: ease;
        animation-iteration-count: infinite;
        animation-fill-mode: none;
        animation-play-state: running;
        animation-name: animation-before;
      }

      &::after {
        /* stylelint-disable-next-line string-quotes */
        content: '';
        display: block;
        height: 40px;
        width: 40px;
        position: absolute;
        right: -20px;
        top: -55%;
        background-size: 40px 40px;
        border: 2px solid #4dd0e1;
        border-radius: 50%;
        /* stylelint-disable-next-line string-quotes */
        background-image: url('/image/write.png');
        background-repeat: no-repeat;
        animation-duration: 8s;
        animation-timing-function: ease;
        animation-iteration-count: infinite;
        animation-fill-mode: none;
        animation-play-state: running;
        animation-name: animation-after;
      }

      span {
        margin-left: 3rem;
        font-size: 1.1rem;
        position: relative;
      }
    }

    .theme-item {
      width: 2rem;
      height: 2rem;
      cursor: pointer;
      transition: all 0.5s ease-out;

      &:hover {
        transform: rotate(45deg);
        border-radius: 50%;
      }
    }

    .active-theme {
      border-radius: 50%;
      box-shadow: $theme-color 0 1px 30px;
      transition-duration: 0.1s;
    }

    .tag-style {
      --el-switch-on-color: #13ce66;
      --el-switch-off-color: #acacac;

      &:deep(.el-switch__label.is-active) {
        color: $theme-color;
      }
    }

    .aside-style {
      &:deep(.el-input-number__decrease:hover) {
        color: $theme-color;
      }

      &:deep(.el-input-number__increase:hover) {
        color: $theme-color;
      }

      &:deep(.el-input__wrapper.is-focus) {
        box-shadow: 0 0 0 1px $theme-color inset;
      }
    }
  }
}

@keyframes animation-before {
  20% {
    width: 100%;
  }

  30% {
    width: 20%;
  }

  40% {
    width: 100%;
  }

  100% {
    width: 100%;
  }
}

@keyframes animation-after {
  0% {
    transform: rotate(0deg);
  }

  10% {
    transform: rotate(0deg);
  }

  30% {
    transform: rotate(300deg);
  }

  45% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(0deg);
  }
}
</style>
