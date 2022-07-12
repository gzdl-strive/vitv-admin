<script lang="ts" setup>
import AsideBar from './components/AsideBar';
</script>
<script lang="ts">
export default {
  name: 'LayoutComponent'
};
</script>

<template>
  <div class="layout-wrapper">
    <el-container class="content-wrapper">
      <aside-bar></aside-bar>
      <el-container>
        <el-header>Header</el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped lang="scss">
.layout-wrapper {
  height: 100%;

  .content-wrapper {
    height: 100%;
  }
}
</style>
