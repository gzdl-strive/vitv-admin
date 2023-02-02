<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import useRouteList from './useRouteList';
import Variable from '@/style/variable.module.scss';

type Props = {
  isCollapse: boolean;
};

defineProps<Props>();

const routeList = useRouteList();
const route = useRoute();

const activeRouteName = computed(() => route.name);
</script>
<script lang="ts">
export default {
  name: 'NavMenu'
};
</script>

<template>
  <el-menu
    :collapse="isCollapse"
    :collapse-transition="false"
    :background-color="Variable.ASIDE_BAR_BG_COLOR"
    :text-color="Variable.ASIDE_BAR_COLOR"
    :active-text-color="Variable.ASIDE_BAR_ACTIVE_COLOR"
    :default-active="activeRouteName"
    unique-opened
    class="aside-bar-menu"
    :class="isCollapse ? 'collapse-style' : ''"
  >
    <menu-item :route-list="routeList!"></menu-item>
  </el-menu>
</template>

<style scoped lang="scss">
.aside-bar-menu {
  border-right: 0;
}

.collapse-style {
  /* stylelint-disable-next-line selector-class-pattern */
  :deep(.el-sub-menu__title) {
    padding: 0;
    display: flex;
    justify-content: center;
  }

  /* stylelint-disable-next-line selector-class-pattern */
  :deep(.el-menu-item) {
    padding: 0;
    display: flex;
    justify-content: center;
  }
}
</style>
