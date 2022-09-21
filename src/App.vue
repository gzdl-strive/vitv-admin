<script setup lang="ts">
import { ElConfigProvider } from 'element-plus';
import { defaultConfig } from '@/config/element';
import useTitle from '@/hooks/useTitle';

useTitle();
</script>

<template>
  <el-config-provider v-bind="defaultConfig">
    <router-view></router-view>
  </el-config-provider>
</template>
