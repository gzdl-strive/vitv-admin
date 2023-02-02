<script lang="ts" setup>
import HeaderWorkbench from './components/HomeWorkbench';
import QuickNav from './components/QuickNav';
import TechnicalComposition from './components/TechnicalComposition';
import DevelopProgress from './components/DevelopProgress';
import { defaultSetting } from '@/config/setting';
</script>
<script lang="ts">
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Home'
};
</script>

<template>
  <section class="flex column gap_one">
    <header-workbench></header-workbench>
    <el-card style="width: 100%">
      <div class="flex">
        <quick-nav
          v-for="nav in defaultSetting.QUICK_NAV_LIST"
          :key="nav.id"
          :title="nav.title"
          :icon="nav.icon"
          :path="nav.path"
          :icon-color="nav.iconColor"
          :query="nav?.query || ''"
        />
      </div>
    </el-card>
    <section class="flex gap_one" style="width: 100%">
      <el-card shadow="hover" style="flex: 6">
        <template #header>
          <section class="flex j_between">
            <span>技术栈</span>
            <el-tag effect="dark">壹</el-tag>
          </section>
        </template>
        <technical-composition></technical-composition>
      </el-card>
      <el-card shadow="hover" style="flex: 4">
        <template #header>
          <section class="flex j_between">
            <span>开发进度</span>
            <el-tag type="success" effect="dark">贰</el-tag>
          </section>
        </template>
        <develop-progress :data="defaultSetting.DEVELOPMENT_PROCESS" />
      </el-card>
    </section>
  </section>
</template>
