<script lang="ts" setup>
import AsideBar from './components/AsideBar/index.vue';
import HeaderCom from './components/Header/index.vue';
import useSetting from './useSetting';

const { isCollapse } = useSetting();
</script>
<script lang="ts">
export default {
  name: 'LayoutCom'
};
</script>

<template>
  <el-container style="height: 100%">
    <aside-bar :is-collapse="isCollapse"></aside-bar>
    <el-container class="flex column">
      <header-com :is-collapse="isCollapse"></header-com>
      <el-main>
        <router-view v-slot="{ Component }">
          <transition name="transformFade" mode="out-in">
            <component :is="Component"></component>
          </transition>
        </router-view>
      </el-main>
      <!-- <el-footer>Footer</el-footer> -->
    </el-container>
  </el-container>
  <!-- <router-view></router-view> -->
</template>
