<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Variables from '@/style/Variables.module.scss';
// import { uuid } from '@/utils';
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
</script>
<script lang="ts">
export default {
  name: 'NavMenu'
};
</script>

<template>
  <el-menu
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
    <menu-item :route-list="routeList"></menu-item>
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
}

.width {
  width: 110%;
}

/* stylelint-disable-next-line selector-class-pattern */
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 14.6rem;
  height: 100%;
}
</style>
