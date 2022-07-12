<script setup lang="ts">
import { computed, ref } from 'vue';
import zhCn from 'element-plus/lib/locale/lang/zh-cn';
import en from 'element-plus/lib/locale/lang/en';

const language = ref('zh-cn');
const locale = computed(() => (language.value === 'zh-cn' ? zhCn : en));

// const toggle = () => {
//   language.value = language.value === 'zh-cn' ? 'en' : 'zh-cn';
// };
</script>

<template>
  <!-- <el-button mb-2 @click="toggle">Switch Language</el-button> -->
  <!-- <br /> -->
  <el-config-provider :locale="locale">
    <!-- <el-table mb-1 :data="[]" />
    <el-pagination :total="100" /> -->
    <router-view></router-view>
  </el-config-provider>
</template>
