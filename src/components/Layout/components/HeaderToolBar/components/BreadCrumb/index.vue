<script lang="ts" setup>
import { computed } from 'vue';
import { ArrowRight } from '@element-plus/icons-vue';
import { useRoute } from 'vue-router';
import { BreadCrumbItemProps } from '../../typing';
import { MenuItemType } from '../../../AsideBar/typing';

const route = useRoute();
const breadcrumb = computed(() => {
  let result = route.meta.breadcrumb as BreadCrumbItemProps[];
  if (!result) {
    result = [
      {
        name: 'home',
        label: '首页',
        type: 'item' as MenuItemType
      }
    ];
  }
  if (result[0].name !== 'home') {
    result.unshift({
      name: 'home',
      label: '首页',
      type: 'item' as MenuItemType
    });
  }
  return result;
});
</script>
<script lang="ts">
export default {
  name: 'BreadCrumb'
};
</script>

<template>
  <el-breadcrumb :separator-icon="ArrowRight">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="item in breadcrumb" :key="item.name">
        <router-link :to="{ name: item.name }" class="breadcrumb-text">
          {{ item.label }}
        </router-link>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<style scoped lang="scss">
.breadcrumb-text {
  color: $theme-text-color;
}
</style>
