<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Variables from '@/style/Variables.module.scss';
import { uuid } from '@/utils';
import MenuItem from '../MenuItem';
type Props = {
  collapse: boolean;
};
defineProps<Props>();

const route = useRoute();
const router = useRouter();
// 当前路由名
const routeName = computed(() => route.name);
// 路由列表
const routeList = computed(() => {
  const indexRoute = router.options.routes.find(
    route => route.name === 'index'
  );
  return indexRoute?.children;
});
// 独一无二的key
const menuKey = ref<string>(uuid());
const onItemClick = () => {
  menuKey.value = uuid(); //修改key
};
</script>
<script lang="ts">
export default {
  name: 'NavMenu'
};
</script>

<template>
  <el-menu
    :key="menuKey"
    :collapse="collapse"
    :collapse-transition="false"
    :background-color="Variables.ASIDE_BAR_BG_COLOR"
    :text-color="Variables.ASIDE_BAR_TEXT_COLOR"
    :active-text-color="Variables.ASIDE_BAR_ACTIVE_COLOR"
    :default-active="routeName"
    unique-opened
    class="aside-bar-menu el-menu-vertical-demo"
    :class="collapse ? 'width' : ''"
  >
    <menu-item :route-list="routeList!" @item-click="onItemClick"></menu-item>
  </el-menu>
</template>

<style scoped lang="scss">
.aside-bar-menu {
  border-right: none !important;

  li {
    i {
      color: inherit;
    }
  }

  .el-submenu {
    li {
      background-color: $aside-bar_submenu-item_bg-color !important;

      /* stylelint-disable-next-line selector-class-pattern */
      .el-submenu__title {
        background-color: $aside-bar_submenu-item_bg-color !important;

        &:hover {
          background-color: $aside-bar_submenu-item_bg-color-hover !important;
        }
      }

      &.el-menu-item:hover {
        background-color: $aside-bar_submenu-item_bg-color-hover !important;
      }
    }
  }
}

.width {
  width: 110%;
}
</style>
