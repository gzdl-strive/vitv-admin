<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import useRouteList from './useRouteList';
import MenuItem from './MenuItem';
import Variable from '@/style/variable.module.scss';

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
    :background-color="Variable.ASIDE_BAR_BG_COLOR"
    :text-color="Variable.ASIDE_BAR_COLOR"
    :active-text-color="Variable.ASIDE_BAR_ACTIVE_COLOR"
    :default-active="activeRouteName"
    unique-opened
    class="aside-bar-menu el-menu-vertical"
  >
    <menu-item :route-list="routeList!"></menu-item>
  </el-menu>
</template>

<style scoped lang="scss">
.aside-bar-menu {
  border-right: 0;
}
</style>
