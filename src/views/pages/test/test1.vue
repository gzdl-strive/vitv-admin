<script lang="ts" setup>
import { ref } from 'vue';

const str = ref<string>('');
</script>
<script lang="ts">
export default {
  name: 'TestPage'
};
</script>

<template>
  <div>
    <span>test1</span>
    <el-input v-model="str" />
  </div>
</template>
