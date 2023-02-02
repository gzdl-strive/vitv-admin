<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import * as echarts from 'echarts/core';
import { GaugeChart, GaugeSeriesOption } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

type Props = {
  data: number;
};
const props = defineProps<Props>();

echarts.use([GaugeChart, CanvasRenderer]);

type EChartsOption = echarts.ComposeOption<GaugeSeriesOption>;

const devRef = ref();

const renderCharts = () => {
  const chartDom = devRef.value;
  const myChart = echarts.init(chartDom);
  let option: EChartsOption;

  option = {
    series: [
      {
        type: 'gauge',
        center: ['50%', '58%'],
        radius: '115%',
        axisLine: {
          lineStyle: {
            width: 30,
            color: [
              [0.3, '#67e0e3'],
              [0.7, '#37a2da'],
              [1, '#fd666d']
            ]
          }
        },
        pointer: {
          itemStyle: {
            color: 'inherit'
          }
        },
        axisTick: {
          distance: -30,
          length: 10,
          lineStyle: {
            color: '#fff',
            width: 2
          }
        },
        splitLine: {
          distance: -30,
          length: 30,
          lineStyle: {
            color: '#fff',
            width: 4
          }
        },
        axisLabel: {
          color: 'inherit',
          distance: 40,
          fontSize: 20
        },
        detail: {
          valueAnimation: true,
          formatter: '{value} %',
          color: 'inherit'
        },
        data: [
          {
            value: props.data,
            name: '当前进度'
          }
        ]
      }
    ]
  };

  option && myChart.setOption(option);

  window.addEventListener('resize', () => {
    myChart.resize();
  });
};

onMounted(() => {
  renderCharts();
});
</script>
<script lang="ts">
export default {
  name: 'DevelopProgress'
};
</script>

<template>
  <div ref="devRef" style="height: 300px"></div>
</template>
