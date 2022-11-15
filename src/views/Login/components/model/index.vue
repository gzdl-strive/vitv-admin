<script lang="ts" setup>
import { onMounted } from 'vue';
import useRoom from './useRoom';

onMounted(() => {
  const canvas = document.querySelector('canvas.webgl') as HTMLCanvasElement;
  useRoom(canvas);
});
</script>
<script lang="ts">
export default {
  name: 'ThreeModelGlb'
};
</script>

<template>
  <section class="model-container">
    <canvas class="webgl"></canvas>
  </section>
</template>

<style scoped lang="scss">
.model-container {
  width: 100%;
  height: 100%;
  background-image: linear-gradient(#66a6ff 0%, #50bcca 100%);
  border-radius: 0.5rem;
  overflow: hidden;

  .webgl {
    width: 100%;
    height: 100%;
  }
}
</style>
