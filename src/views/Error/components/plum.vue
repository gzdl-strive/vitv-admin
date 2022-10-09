<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { Point, Branch } from './typing';

type Props = {
  initX: number;
  initY: number;
  initTheta: number;
};
const props = defineProps<Props>();

const el = ref<HTMLCanvasElement>();
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const ctx = computed(() => el.value!.getContext('2d'))!;
let cancelRAF: number;

function init() {
  if (!ctx.value) return;
  ctx.value.strokeStyle = '#666';

  step({
    start: { x: props.initX, y: props.initY },
    length: 10,
    theta: props.initTheta
  });
}

// eslint-disable-next-line @typescript-eslint/ban-types
let pendingTasks: Function[] = [];

function step(b: Branch, depth = 0): void {
  const end: Point = getEndPoint(b);
  drawBranch(b);

  if (depth < 4 || Math.random() < 0.5) {
    depth < 35 &&
      pendingTasks.push(() =>
        step(
          {
            start: end,
            length: b.length + (Math.random() * 2 - 1),
            theta: b.theta - 0.2 * Math.random()
          },
          depth + 1
        )
      );
  }
  if (depth < 4 || Math.random() < 0.5) {
    depth < 35 &&
      pendingTasks.push(() =>
        step(
          {
            start: end,
            length: b.length + (Math.random() * 2 - 1),
            theta: b.theta + 0.2 * Math.random()
          },
          depth + 1
        )
      );
  }
}
function frame() {
  // eslint-disable-next-line @typescript-eslint/ban-types
  const tasks: Function[] = [];
  pendingTasks = pendingTasks.filter(i => {
    if (Math.random() > 0.4) {
      tasks.push(i);
      return false;
    }
    return true;
  });
  if (pendingTasks.length === 0 && tasks.length === 0) {
    cancelAnimationFrame(cancelRAF);
    return;
  }
  tasks.forEach(task => task());
}

let frameCount = 0;
function startFrame() {
  cancelRAF = requestAnimationFrame(() => {
    frameCount += 1;
    if (frameCount % 3 === 0) {
      frame();
    }
    startFrame();
  });
}

startFrame();

function getEndPoint(b: Branch): Point {
  return {
    x: b.start.x + b.length * Math.cos(b.theta),
    y: b.start.y + b.length * Math.sin(b.theta)
  };
}

function drawBranch(b: Branch): void {
  lineTo(b.start, getEndPoint(b));
}

function lineTo(p1: Point, p2: Point) {
  if (!ctx.value) return;
  ctx.value.beginPath();
  ctx.value.moveTo(p1.x, p1.y);
  ctx.value.lineTo(p2.x, p2.y);
  ctx.value.stroke();
}

onMounted(() => {
  init();
});
</script>
<script lang="ts">
export default {
  name: 'PlumCom'
};
</script>

<template>
  <canvas ref="el" width="400" height="600" class="canvas"></canvas>
</template>
