<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import * as echarts from 'echarts/core';
import {
  TooltipComponent,
  TooltipComponentOption,
  LegendComponent,
  LegendComponentOption
} from 'echarts/components';
import { PieChart, PieSeriesOption } from 'echarts/charts';
import { LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { defaultSetting } from '@/config/setting';

echarts.use([
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout
]);

type EChartsOption = echarts.ComposeOption<
  TooltipComponentOption | LegendComponentOption | PieSeriesOption
>;

const chartRef = ref();

const renderCharts = () => {
  const chartDom = chartRef.value;
  const myChart = echarts.init(chartDom);
  let option: EChartsOption;
  option = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      data: defaultSetting.TECHNICALTYPE,
      orient: 'vertical',
      right: 0,
      top: 'center'
    },
    series: [
      {
        name: 'Technical Composition',
        type: 'pie',
        selectedMode: 'single',
        center: ['45%', '50%'],
        radius: [0, '30%'],
        label: {
          position: 'inner',
          fontSize: 14
        },
        labelLine: {
          show: false
        },
        data: defaultSetting.TECHNICALINNERDATA
      },
      {
        name: 'Technical Composition',
        type: 'pie',
        center: ['45%', '50%'],
        radius: ['45%', '60%'],
        labelLine: {
          length: 30
        },
        label: {
          formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
          backgroundColor: '#F6F8FC',
          borderColor: '#8C8D8E',
          borderWidth: 1,
          borderRadius: 4,

          rich: {
            a: {
              color: '#6E7079',
              lineHeight: 22,
              align: 'center'
            },
            hr: {
              borderColor: '#8C8D8E',
              width: '100%',
              borderWidth: 1,
              height: 0
            },
            b: {
              color: '#4C5058',
              fontSize: 14,
              fontWeight: 'bold',
              lineHeight: 33
            },
            per: {
              color: '#fff',
              backgroundColor: '#4C5058',
              padding: [3, 4],
              borderRadius: 4
            }
          }
        },
        data: defaultSetting.TECHNICALOUTTERDATA
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
  name: 'TechnicalComposition'
};
</script>

<template>
  <div ref="chartRef" style="height: 300px"></div>
</template>
