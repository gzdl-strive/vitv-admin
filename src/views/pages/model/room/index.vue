<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import useModel from '@/hooks/useModel';
import { Vec3 } from '../typing';

const canvasRef = ref<HTMLCanvasElement>();

const cameraPos: Vec3 = {
  x: -20,
  y: 7,
  z: 3
};

onMounted(() => {
  if (!canvasRef.value) return;
  useModel(canvasRef.value, 'room_baked', 'room', {
    cameraPosition: cameraPos
  });
});
</script>
<script lang="ts">
export default {
  name: 'RoomModel'
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
