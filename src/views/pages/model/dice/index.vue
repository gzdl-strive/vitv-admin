<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import useModel from '@/hooks/useModel';

const canvasRef = ref<HTMLCanvasElement>();

onMounted(() => {
  if (!canvasRef.value) return;
  useModel(canvasRef.value, 'dice_baked', 'dice');
});
</script>
<script lang="ts">
export default {
  name: 'DiceModel'
};
</script>

<template>
  <section class="model-container">
    <canvas ref="canvasRef"></canvas>
  </section>
</template>

<style scoped lang="scss">
.model-container {
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
  overflow: hidden;

  .webgl {
    width: 100%;
    height: 100%;
  }
}
</style>
