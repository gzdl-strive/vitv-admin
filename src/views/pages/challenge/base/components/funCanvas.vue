<script lang="ts" setup>
import { onMounted, ref } from 'vue';

const canvasRef = ref();
// 固定画线宽度
const lineWidth = ref<number>(10);

const canvasChart = () => {
  const canvas = canvasRef.value;
  canvas.width = window.innerWidth - 200;
  const ctx = canvas.getContext('2d');

  ctx.strokeStyle = '#BADA55';
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.lineWidth = lineWidth.value;

  let isDrawing = false;
  let lastX = 0;
  let lastY = 0;
  let hue = 0;

  function draw(e: { offsetX: number; offsetY: number }) {
    if (!isDrawing) return;
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    ctx.beginPath();
    // start from
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];

    hue++;
    if (hue >= 360) {
      hue = 0;
    }

    ctx.lineWidth = lineWidth.value;
  }

  canvas.addEventListener(
    'mousedown',
    (e: { offsetX: number; offsetY: number }) => {
      isDrawing = true;
      [lastX, lastY] = [e.offsetX, e.offsetY];
    }
  );

  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mouseup', () => (isDrawing = false));
  canvas.addEventListener('mouseout', () => (isDrawing = false));

  window.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.ctrlKey && e.key.toLocaleLowerCase() === 'c') {
      canvas.height = canvas.height;
    }
  });
};

onMounted(() => {
  canvasChart();
});
</script>
<script lang="ts">
export default {
  name: 'FunCanvas'
};
</script>

<template>
  <section class="container">
    <section class="control">
      <el-alert class="alert" title="按住ctrl + c进行清除画布" type="info" />
      <section class="line">
        <span>画笔粗细：</span>
        <el-input-number v-model="lineWidth" :min="5" :max="20" />
      </section>
    </section>
    <canvas ref="canvasRef" class="canvas" width="800" height="500"></canvas>
  </section>
</template>

<style scoped lang="scss">
.container {
  height: 75vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  .control {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    padding-bottom: 0.2rem;

    .alert {
      width: 15rem;
    }

    .line {
      display: flex;
      align-items: center;
    }
  }

  .canvas {
    background-color: rgb(203 200 200 / 80%);
    cursor: pointer;
  }
}
</style>
