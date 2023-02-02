<script lang="ts" setup>
import { PwdIntensityLevel } from './typing';

type Props = {
  level: PwdIntensityLevel[];
};

defineProps<Props>();
</script>
<script lang="ts">
export default {
  name: 'PwdIntensity'
};
</script>

<template>
  <span class="line" :class="level.includes('low') ? 'low' : ''"></span>
  <span class="line" :class="level.includes('middle') ? 'middle' : ''"></span>
  <span class="line" :class="level.includes('high') ? 'high' : ''"></span>
  <span
    class="line"
    :class="level.includes('very-high') ? 'very-high' : ''"
  ></span>
</template>

<style scoped lang="scss">
.line {
  display: inline-block;
  width: 2.2rem;
  height: 0.3rem;
  background-color: $color-gray;
  margin-left: 0.3rem;
  transition: all 0.3s linear;

  &.low {
    background-color: #f4664a;
  }

  &.middle {
    background: #ffb700;
  }

  &.high {
    background: $color-primary;
  }

  &.very-high {
    background-color: #2cbb79;
  }
}
</style>
