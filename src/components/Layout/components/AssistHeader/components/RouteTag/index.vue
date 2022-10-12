<script lang="ts" setup>
import { computed, reactive, inject } from 'vue';
import { RouteRecordName, useRouter } from 'vue-router';
import { VueDraggableNext as Draggable } from 'vue-draggable-next';
import { useTagStore } from '@/store';
import {
  SET_VIEW_LIST,
  REMOVE_VIEW,
  REMOVE_ALL_VIEW,
  REMOVE_RIGHT_VIEW,
  REMOVE_OTHER_VIEW
} from '@/constant/module';
import { ContextMenuProps, Reload } from '@/components/Layout/typing';

const tagStore = useTagStore();
const router = useRouter();

const activeView = computed(() => tagStore.activeView);
const viewList = computed({
  get: () => tagStore.viewList,
  set: newValue => tagStore[SET_VIEW_LIST](newValue)
});
//拖拽标签
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const onTagMove = (e: any) => {
  //如果是工作台标签，则不允许拖拽
  if (e.relatedContext.element.name === 'home') return false;
  if (e.draggedContext.element.name === 'home') return false;
};

//点击标签跳转
const onTagClick = (viewName: string | RouteRecordName) => {
  router.push({
    name: viewName
  });
};

//点击关闭图标
const onTagClose = (viewName: string | RouteRecordName) => {
  tagStore[REMOVE_VIEW](viewName);
};

// 重新加载
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const reload = inject<Reload>('page-reload')!;

//右键框
const contextmenu = reactive<ContextMenuProps>({
  show: false,
  style: { top: '0', left: '0' },
  routeName: '',
  menu: [
    {
      label: '重新加载',
      onClick: (routeName: RouteRecordName) => reload(routeName)
    },
    {
      label: '关闭当前标签页',
      disabled: (routeName: string | RouteRecordName) => routeName === 'home',
      onClick: (routeName: RouteRecordName | string) => {
        tagStore[REMOVE_VIEW](routeName);
      }
    },
    {
      label: '关闭右侧标签页',
      onClick: (routeName: RouteRecordName | string) => {
        tagStore[REMOVE_RIGHT_VIEW](routeName);
      }
    },
    {
      label: '关闭其他标签页',
      onClick: (routeName: RouteRecordName | string) => {
        tagStore[REMOVE_OTHER_VIEW](routeName);
      }
    },
    {
      label: '关闭所有标签页',
      onClick: () => {
        tagStore[REMOVE_ALL_VIEW]();
      }
    }
  ]
});
//右键
const onTagRightClick = (
  event: MouseEvent,
  viewName: string | RouteRecordName
) => {
  contextmenu.style.top = event.clientY + 'px';
  contextmenu.style.left = event.clientX + 'px';
  contextmenu.routeName = viewName;
  contextmenu.show = true;
};
</script>
<script lang="ts">
export default {
  name: 'RouteTag'
};
</script>

<template>
  <div class="tags-view" v-bind="$attrs">
    <draggable
      v-model="viewList"
      filter=".no-drag"
      animation="300"
      ghost-class="tag-ghost"
      :move="onTagMove"
    >
      <transition-group
        :duration="500"
        enter-active-class="animate__animated animate__lightSpeedInRight"
        leave-active-class="animate__animated animate__bounceOutRight"
      >
        <div
          v-for="view in viewList"
          :key="view.name"
          class="route-tag"
          :class="[
            { active: view.name === activeView },
            { 'no-drag': view.name === 'home' }
          ]"
          @click="onTagClick(view.name)"
          @contextmenu.prevent="onTagRightClick($event, view.name)"
        >
          <span class="tag-text">{{ view.label }}</span>
          <el-icon
            v-if="view.name !== 'home'"
            class="tag-close"
            @click.stop="onTagClose(view.name)"
            @contextmenu.stop.prevent
          >
            <i-ep-close-bold />
          </el-icon>
        </div>
      </transition-group>
    </draggable>
    <context-menu
      v-model="contextmenu.show"
      :menu="contextmenu.menu"
      :route-name="contextmenu.routeName"
      :style="contextmenu.style"
    ></context-menu>
  </div>
</template>

<style scoped lang="scss">
.tags-view {
  white-space: nowrap;

  .route-tag {
    height: 1.8rem;
    background-color: $color-white;
    border-radius: 0.2rem;
    border: 1px solid rgba(138 137 137 / 20%);
    cursor: pointer;
    display: inline-block;
    position: relative;
    margin-right: 0.6rem;
    padding: 0 0.8rem;

    .tag-text {
      font-size: 0.85rem;
      line-height: 1.8rem;
    }

    .tag-close {
      transform: translate(0.25rem, 0.16rem);
      font-size: 0.8rem;
      border-radius: 100%;
      padding: 0.1rem;

      &:hover {
        background-color: rgba(0 0 0 / 20%);
      }
    }

    &:hover {
      background-color: rgba($color: $color-gray, $alpha: 30%);
    }

    &.active {
      background-color: $theme-color;
      border-color: $theme-color;
      color: $color-white;
    }
  }

  .tag-ghost {
    opacity: 0;
  }
}
</style>
