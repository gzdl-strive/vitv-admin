<script lang="ts" setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { RouteRecordRaw } from 'vue-router';
import { MenuItemProps } from '../../typing';
import { MenuItemRegistered } from 'element-plus/lib/components/menu/src/types';

type Props = {
  routeList: (MenuItemProps | RouteRecordRaw)[];
};

const props = defineProps<Props>();
const emits = defineEmits(['itemClick']);

const router = useRouter();
const menuItems = computed(() => {
  return props.routeList.map(route => {
    let temp: MenuItemProps = { key: route.name as string };
    route.meta && (temp = { ...temp, ...route.meta });
    route.children && (temp.children = route.children);
    return temp;
  });
});
const getItemShow = computed(() => (item: MenuItemProps) => {
  /**
   * 这里暂时不写关于用户权限控制的逻辑了，因为我也不知道你们会怎么存储用户的role字段
   * 权限控制思路：
   * 1. 假设你的role字段存在了store.userModule.role中
   * 2. 使用instanceof判断一下menuitem中的roles是数组还是字符串
   * 3. 如果是字符串：return store.userModule.role === item.roles
   * 4. 如果是数组：return item.roles.includes(store.userModule.role)
   * 5. 但是要注意修改一下分支结构，因为item.hidden的优先级在item.roles前面
   */
  return !item.hidden;
});

const onMenuItemClick = (event: MenuItemRegistered, item: MenuItemProps) => {
  if (item.onClick) {
    item.onClick(event, item);
    emits('itemClick'); //因为是新开页，所以不需要导航栏选中，所以需要修改它的key
    return;
  }
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
    <template v-if="getItemShow(item)">
      <!-- v-if submenu -->
      <el-sub-menu
        v-if="item.type === 'subPage'"
        :index="item.key"
        :disabled="item.disabled || false"
      >
        <template #title>
          <svg-icon
            v-if="item.icon"
            width="1.6rem"
            height="1.6rem"
            :name="item.icon"
            size="xl"
            class="item-icon"
          />
          <span>{{ item.label }}</span>
        </template>
        <template v-if="item.children">
          <menu-item :route-list="item.children" />
        </template>
      </el-sub-menu>
      <!-- v-if item -->
      <el-menu-item
        v-if="`${item.type}` === 'page'"
        :index="item.key"
        :disabled="item.disabled || false"
        @click="onMenuItemClick($event, item)"
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

<style lang="scss" scoped>
.aside-bar-menu {
  .item-icon {
    margin-right: 0.5rem;
    fill: $aside-bar_text-color !important;
    transition: fill 300ms;
  }

  .item-icon-size {
    font-size: 1rem;
    user-select: none;
  }

  .el-menu-item {
    &.is-active {
      svg {
        fill: $system-theme-color !important;
      }
    }

    /* stylelint-disable-next-line no-descending-specificity */
    svg {
      fill: $aside-bar_text-color !important;
    }
  }

  /* stylelint-disable-next-line selector-class-pattern */
  .el-sub-menu__title * {
    font-size: 1rem;
  }
}
</style>
