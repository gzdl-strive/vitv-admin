<script lang="ts" setup>
import { MenuItemProps } from '../../typing';
import { RouteRecordRaw } from 'vue-router';

type Props = {
  routeList: (MenuItemProps | RouteRecordRaw)[];
};
const props = defineProps<Props>();
console.log(props.routeList);
</script>
<script lang="ts">
export default {
  name: 'MenuItem'
};
</script>

<template>
  <el-sub-menu index="1">
    <template #title>
      <svg-icon name="system" width="2rem" height="2rem"></svg-icon>
      <span>Navigator One</span>
    </template>
    <el-menu-item-group>
      <template #title><span>Group One</span></template>
      <el-menu-item index="1-1">item one</el-menu-item>
      <el-menu-item index="1-2">item two</el-menu-item>
    </el-menu-item-group>
    <el-menu-item-group title="Group Two">
      <el-menu-item index="1-3">item three</el-menu-item>
    </el-menu-item-group>
    <el-sub-menu index="1-4">
      <template #title><span>item four</span></template>
      <el-menu-item index="1-4-1">item one</el-menu-item>
    </el-sub-menu>
  </el-sub-menu>
  <el-menu-item index="2">
    <template #title>Navigator Two</template>
  </el-menu-item>
  <el-sub-menu index="3">
    <template #title>
      <span>Navigator One</span>
    </template>
    <el-menu-item-group>
      <template #title><span>Group One</span></template>
      <el-menu-item index="1-1">item one</el-menu-item>
      <el-menu-item index="1-2">item two</el-menu-item>
    </el-menu-item-group>
    <el-menu-item-group title="Group Two">
      <el-menu-item index="1-3">item three</el-menu-item>
    </el-menu-item-group>
    <el-sub-menu index="1-4">
      <template #title><span>item four</span></template>
      <el-menu-item index="1-4-1">item one</el-menu-item>
    </el-sub-menu>
  </el-sub-menu>
  <el-menu-item index="4">
    <template #title>Navigator Four</template>
  </el-menu-item>
</template>
