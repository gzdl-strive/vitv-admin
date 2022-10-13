<script lang="ts" setup>
import { CurWeatherType } from '../../../typing';

type Props = {
  weather: CurWeatherType;
  city: string;
  classStr: string;
};
defineProps<Props>();
</script>
<script lang="ts">
export default {
  name: 'WeatherCard'
};
</script>

<template>
  <section class="workbench flex column gap_half" :class="classStr">
    <header class="flex j_center">
      <section class="ellipsis-one">
        <span v-if="city" class="base">{{ city }}</span>
        <span class="date ellipsis-one">{{ weather.date }}</span>
      </section>
    </header>
    <main class="flex j_center a_center gap_half">
      <svg-icon :name="weather.icon" width="3vw" height="3vw"></svg-icon>
      <span class="weather ellipsis-one">{{ weather.weather }}</span>
    </main>
    <footer class="flex j_center">
      <span class="temp">{{ weather.temp }}</span>
    </footer>
  </section>
</template>

<style scoped lang="scss">
.workbench {
  padding: 1rem;
  transition: 0.3s;

  &:hover {
    box-shadow: rgba(100 100 111 / 20%) 0 7px 29px 0;
  }

  .base {
    font-size: 1.5vw;
    color: $theme-color;
    margin-right: 1vw;
  }

  .date {
    font-size: 1.3vw;
    /* stylelint-disable-next-line string-quotes */
    font-family: 'Times New Roman', Times, serif;
  }

  .weather {
    font-size: 1.2vw;
  }

  .temp {
    font-size: 1vw;
  }
}

.cur-day {
  flex: 3;
  border: 3px dashed $theme-color;

  &:hover {
    border: 3px solid $theme-color;
  }
}

.other-day {
  flex: 2;
}
</style>
