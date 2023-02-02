<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import useModel from '@/hooks/useModel';
import { ModelOption } from '../typing';

const modelOptions: ModelOption[] = [
  { label: '羊角锤', value: 'yjc' },
  { label: '易拉罐', value: 'ylg' },
  { label: '匕首🗡', value: 'knife' }
];

const canvasRef = ref<HTMLCanvasElement>();
const model = ref<string>('ylg');

const renderModel = (name: string) => {
  if (!canvasRef.value) return;
  const bakedName = `${name}_baked`;
  const modelName = name;
  useModel(canvasRef.value, bakedName, modelName, {
    cameraPosition: {
      x: 20,
      y: 20,
      z: 20
    }
  });
};

onMounted(() => {
  if (!model.value) return;
  renderModel(model.value);
});

watch(
  () => model.value,
  (newVal: string) => {
    renderModel(newVal);
  }
);
</script>
<script lang="ts">
export default {
  name: 'CommonModel'
};
</script>

<template>
  <section class="model-container">
    <el-select v-model="model" placeholder="请选择模型" class="model-select">
      <el-option
        v-for="modelOpt in modelOptions"
        :key="modelOpt.value"
        :label="modelOpt.label"
        :value="modelOpt.value"
      ></el-option>
    </el-select>
    <canvas ref="canvasRef"></canvas>
  </section>
</template>

<style scoped lang="scss">
.model-container {
  width: 100%;
  height: 85vh;
  border-radius: 0.5rem;
  overflow: hidden;
  position: relative;

  .webgl {
    width: 100%;
    height: 100%;
  }

  .model-select {
    position: absolute;
    left: 0;
    top: 0;
  }
}
</style>
