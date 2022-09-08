<script lang="ts" setup>
import { ref } from 'vue';
/**
 * 特殊资源后缀
 * 1、?url：表示获取资源的路径
 * 2、?raw：表示获取资源的字符串内容
 * 3、?inline：表示资源强制内联，而不是打包成单独的文件
 */
import ViteLogo from '/vite.svg';

type Lang = 'zhCn' | 'en';

const str = ref<Lang>('en');
const handleMsg = () => {
  ElMessage({
    message: '牛啊',
    type: 'success'
  });
};
</script>
<script lang="ts">
export default {
  name: 'HomePage'
};
</script>

<template>
  <h1>Home</h1>
  <h1>{{ str }}</h1>
  <el-button type="primary" @click="handleMsg">中文</el-button>
  <img :src="ViteLogo" alt="ViteImg" />
  <svg-icon name="avatar"></svg-icon>
</template>
