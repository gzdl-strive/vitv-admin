<script lang="ts" setup>
import { ref } from 'vue';

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
</template>
