<script setup lang="ts">
import { ref } from 'vue';

const count = ref<number>(1);
</script>

<template>
  <router-view></router-view>

  {{ count }}
</template>
