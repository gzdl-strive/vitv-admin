<script lang="ts" setup>
import { inject, computed } from 'vue';
import { Reload } from '@/components/Layout/typing';
import { useTagStore } from '@/store';
import {
  REMOVE_ALL_VIEW,
  REMOVE_OTHER_VIEW,
  REMOVE_RIGHT_VIEW,
  REMOVE_VIEW
} from '@/constant/module';

const tagStore = useTagStore();

// 重新加载
const reload = inject<Reload>('page-reload');

const closeTagView = (type: string) => {
  switch (type) {
    case 'current':
      tagStore[REMOVE_VIEW](tagStore.activeView);
      return;
    case 'right':
      tagStore[REMOVE_RIGHT_VIEW](tagStore.activeView);
      return;
    case 'all':
      tagStore[REMOVE_ALL_VIEW]();
      return;
    case 'other':
      tagStore[REMOVE_OTHER_VIEW](tagStore.activeView);
      return;
    default:
      return;
  }
};

// 当前页面索引
const activeIndex = computed<number>(() => {
  return tagStore.viewList.findIndex(view => view.name === tagStore.activeView);
});
</script>
<script lang="ts">
export default {
  name: 'BtnGroup'
};
</script>

<template>
  <section class="btn-container flex a_center">
    <i-ep-refresh class="icon-style" @click="reload"></i-ep-refresh>
    <el-dropdown trigger="click">
      <div class="icon-style" style="padding-top: 1rem">
        <i-ep-arrow-down></i-ep-arrow-down>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="reload">重新刷新</el-dropdown-item>
          <el-dropdown-item
            :disabled="activeIndex <= 0"
            @click="activeIndex !== 0 && closeTagView('current')"
          >
            关闭当前标签页
          </el-dropdown-item>
          <el-dropdown-item
            :disabled="
              activeIndex === tagStore.viewList.length - 1 || activeIndex < 0
            "
            @click="
              activeIndex !== tagStore.viewList.length - 1 &&
                closeTagView('right')
            "
          >
            关闭右侧标签页
          </el-dropdown-item>
          <el-dropdown-item
            :disabled="tagStore.viewList.length === 1 || activeIndex < 0"
            @click="tagStore.viewList.length > 1 && closeTagView('all')"
          >
            关闭所有标签页
          </el-dropdown-item>
          <el-dropdown-item
            :disabled="
              tagStore.viewList.length === 1 ||
              (activeIndex === 1 && tagStore.viewList.length === 2) ||
              activeIndex < 0
            "
            @click="closeTagView('other')"
          >
            关闭其他标签页
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </section>
</template>

<style scoped lang="scss">
.btn-container {
  height: 100%;
  overflow-y: hidden;

  .icon-style {
    cursor: pointer;
    width: 1.1rem;
    padding: 0.8rem;
    border-left: 1px solid #ccc;

    &:hover {
      color: $theme-color;
    }

    &:last-child {
      border-right: 1px solid #ccc;
    }
  }
}
</style>
