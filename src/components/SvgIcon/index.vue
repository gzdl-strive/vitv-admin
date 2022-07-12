<template>
  <svg
    :class="svgClass"
    v-bind="$attrs"
    :style="{ color, width, height, borderRadius: circle }"
  >
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps({
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: ''
  },
  width: {
    type: String,
    default: '1.3rem'
  },
  height: {
    type: String,
    default: '1.3rem'
  },
  circle: {
    type: String,
    default: '0%'
  }
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

<style scoped lang="scss">
.svg-icon {
  fill: currentcolor;
  outline: none;
  vertical-align: middle;
  cursor: pointer;
}
</style>
