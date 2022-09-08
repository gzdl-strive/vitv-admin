<script lang="ts" setup>
import { computed } from 'vue';

type Props = {
  name: string;
  color?: string;
  width?: string;
  height?: string;
  circle?: string;
};
const props = withDefaults(defineProps<Props>(), {
  name: 'avatar',
  color: '',
  width: '2rem',
  height: '2rem',
  circle: '0%'
});

const iconName = computed(() => `#icon-${props.name}`);
const svgClass = computed(() => {
  if (props.name) return `svg-icon icon-${props.name}`;
  return 'svg-icon';
});
</script>
<script lang="ts">
export default {
  name: 'SvgIcon'
};
</script>

<template>
  <svg
    :class="svgClass"
    v-bind="$attrs"
    :style="{ color, width, height, borderRadius: circle }"
  >
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<style scoped>
.svg-icon {
  fill: currentcolor;
  outline: none;
  vertical-align: middle;
  cursor: pointer;
}
</style>
