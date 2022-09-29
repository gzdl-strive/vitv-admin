<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { ArrowRight } from '@element-plus/icons-vue';
import { BreadcrumbItemProps } from '../../typing';

const route = useRoute();
const routeList = computed(() => {
  let routes = route.meta.breadcrumb as BreadcrumbItemProps[];
  if (!routes) {
    routes = [
      {
        name: 'home',
        label: '首页',
        type: 'menu-item'
      }
    ];
  }
  if (routes[0].name !== 'home') {
    routes.unshift({
      name: 'home',
      label: '首页',
      type: 'menu-item'
    });
  }
  return routes;
});
</script>
<script lang="ts">
export default {
  name: 'RouteBreadcrumb'
};
</script>

<template>
  <section class="flex a_center">
    <el-breadcrumb :separator-icon="ArrowRight">
      <transition-group name="route-breadcrumb">
        <el-breadcrumb-item v-for="item in routeList" :key="item.name">
          <router-link :to="{ name: item.name }">
            {{ item.label }}
          </router-link>
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
  </section>
</template>
