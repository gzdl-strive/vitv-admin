<script lang="ts" setup>
import { computed } from 'vue';
import { useTagStore } from '@/store';

const tagStore = useTagStore();

const activeName = computed(() => tagStore.activeView);
</script>
<script lang="ts">
export default {
  name: 'AssistHelper'
};
</script>

<template>
  <section class="assist-container flex j_between a_center">
    <span>{{ activeName }}</span>
    <span>右</span>
  </section>
</template>

<style scoped lang="scss">
.assist-container {
  height: $assist-header-height;
  background: $color-white;
  border: $assist-header_border;
  box-shadow: $assist-header_box-shadow;
  padding: 0 0.5rem 0 1.5rem;
}
</style>
