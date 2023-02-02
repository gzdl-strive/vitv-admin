<script lang="ts" setup>
import { FlexPanelItem } from './typing';

const panelList: FlexPanelItem[] = [
  { describe1: 'Hey', describe2: "Let's", describe3: 'Dance', bg: '#228cf6' },
  { describe1: 'Give', describe2: 'Take', describe3: 'Receive', bg: '#67c23a' },
  { describe1: 'Exp', describe2: 'It', describe3: 'Today', bg: '#e6a23c' },
  { describe1: 'Give', describe2: 'All', describe3: 'You can', bg: '#f56c6c' },
  { describe1: 'Life', describe2: 'In', describe3: 'Motion', bg: '#909399' }
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toggleOpen = (e: any) => {
  if (e.target?.tagName.toLowerCase() === 'section') {
    e.target?.classList.toggle('open');
  } else if (e.target?.parentNode.tagName.toLowerCase() === 'section') {
    e.target?.parentNode.classList.toggle('open');
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toggleActive = (e: any) => {
  if (e.propertyName.includes('flex')) {
    e.target.classList.toggle('open-active');
  }
};
</script>
<script lang="ts">
export default {
  name: 'FlexPanel'
};
</script>

<template>
  <section class="panels">
    <section
      v-for="panel in panelList"
      :key="panel.describe2"
      class="panel"
      :style="{ backgroundColor: panel.bg }"
      @click="toggleOpen"
      @transitionend="toggleActive"
    >
      <p>{{ panel.describe1 }}</p>
      <p>{{ panel.describe2 }}</p>
      <p>{{ panel.describe3 }}</p>
    </section>
  </section>
</template>

<style scoped lang="scss">
/* stylelint-disable*/
@import '@/style/font.scss';

.panels {
  min-height: 70vh;
  display: flex;

  .panel {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: inset 0 0 0 5px rgba(255 255 255 / 10%);
    transition: font-size 0.7s cubic-bezier(0.61, -0.19, 0.7, -0.11),
      flex 0.7s cubic-bezier(0.61, -0.19, 0.7, -0.11), background 0.2s;
    cursor: pointer;

    & > p {
      margin: 0;
      width: 100%;
      flex: 1 0 auto;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: transform 0.5s;
      text-transform: uppercase;
      font-family: 'Amatic SC', cursive;
      font-weight: bold;
      font-size: 2rem;
      transition: all 0.6s ease-out;

      &:nth-child(2) {
        font-size: 4rem;
      }

      &:first-child {
        transform: translateY(-100%);
      }

      &:last-child {
        transform: translateY(100%);
      }
    }
  }

  .panel.open-active > p {
    &:first-child {
      transform: translateY(0);
    }
    &:last-child {
      transform: translateY(0);
    }
  }

  .panel.open {
    flex: 5;

    p {
      font-size: 3rem;

      &:nth-child(2) {
        font-size: 5rem;
      }
    }
  }
}
</style>
