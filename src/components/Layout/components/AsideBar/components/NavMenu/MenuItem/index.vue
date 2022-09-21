<script lang="ts" setup>
import { computed } from 'vue';
import { RouteRecordRaw, useRouter } from 'vue-router';
import { MenuItemProps } from '../../../typing';

type Props = {
  routeList: RouteRecordRaw[];
};

const props = defineProps<Props>();
const router = useRouter();

// 将route处理成我们想要的结构
const menuItems = computed(() => {
  return props.routeList.map(route => {
    let temp: MenuItemProps = {
      key: route.name as string
    };
    route.meta &&
      (temp = {
        ...temp,
        ...route.meta
      });
    route.children && (temp.children = route.children);
    return temp;
  });
});
// 是否展示
const isShowItem = computed(() => {
  return (item: MenuItemProps): boolean => item.hidden || false;
});

// 点击回调
const handleClick = (item: MenuItemProps) => {
  router.push({
    name: item.key
  });
};
</script>
<script lang="ts">
export default {
  name: 'MenuItem'
};
</script>

<template>
  <template v-for="item in menuItems" :key="item.key">
    <template v-if="!isShowItem(item)">
      <!-- sub-menu -->
      <template v-if="item.type === 'sub-menu'">
        <el-sub-menu :index="item.key" :disabled="item.disabled">
          <template #title>
            <svg-icon
              v-if="item.icon"
              :name="item.icon"
              width="1.6rem"
              height="1.6rem"
              class="item-icon"
            ></svg-icon>
            <span>{{ item.label }}</span>
          </template>
          <template v-if="item.children && item.children.length > 0">
            <menu-item :route-list="item.children"></menu-item>
          </template>
        </el-sub-menu>
      </template>
      <!-- menu-item -->
      <template v-else-if="item.type === 'menu-item'">
        <el-menu-item
          :index="item.key"
          :disabled="item.disabled"
          @click="handleClick(item)"
        >
          <svg-icon
            v-if="item.icon"
            width="1.6rem"
            height="1.6rem"
            :name="item.icon"
            class="item-icon"
          ></svg-icon>
          <span class="item-icon-size">{{ item.label }}</span>
        </el-menu-item>
      </template>
    </template>
  </template>
</template>

<style lang="scss" scoped>
.item-icon {
  margin-right: 0.5rem;
  fill: $aside-bar_text-color !important;
  transition: fill 300ms;

  &:hover {
    fill: $aside-bar_text-color_active;
  }
}

.item-icon-size {
  font-size: 1rem;
  user-select: none;
}

.el-menu-item {
  &.is-active {
    svg {
      fill: $aside-bar_text-color_active !important;
    }
  }

  /* stylelint-disable-next-line no-descending-specificity */
  svg {
    fill: $aside-bar_text-color !important;
  }
}
</style>
