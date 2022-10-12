<script lang="ts" setup>
import { ref } from 'vue';

const test = ref<string>('');
</script>
<script lang="ts">
export default {
  name: 'FrontEndBase'
};
</script>

<template>
  <div>
    <h1>前端基础</h1>
    <el-input v-model="test" placeholder="请输入"></el-input>
  </div>
</template>
