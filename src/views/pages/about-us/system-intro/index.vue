<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import useScrollAnimation from './useScrollAnimation';
import IntroList from './data';

const systemRef = ref<HTMLDivElement>();
const canvasRef = ref<HTMLCanvasElement>();

onMounted(() => {
  if (!canvasRef.value || !systemRef.value) return;
  useScrollAnimation(systemRef.value, canvasRef.value);
});
</script>
<script lang="ts">
export default {
  name: 'SystemIntro'
};
</script>

<template>
  <section ref="systemRef" class="system-container">
    <canvas ref="canvasRef" class="webgl"></canvas>
    <section v-for="intro in IntroList" :key="intro.id" class="paragraph">
      <h1 class="title">{{ intro.title }}</h1>
      <p class="content">{{ intro.content }}</p>
    </section>
    <section class="paragraph">
      <h1 class="title">项目地址</h1>
      <section class="flex a_center gap_half">
        <svg-icon name="logo" width="2rem" height="2rem"></svg-icon>
        <a
          href="https://github.com/gzdl-strive/vitv-admin"
          class="address"
          target="_blank"
        >
          vitv-admin
        </a>
      </section>
    </section>
  </section>
</template>

<style scoped lang="scss">
.system-container {
  position: relative;
  background-color: #1e1a20;

  .webgl {
    position: absolute;
    left: 0;
    right: 0;
    outline: none;
  }

  .paragraph {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 85vh;
    /* stylelint-disable-next-line */
    font-family: 'Cabin', sans-serif;
    color: #ffeded;
    text-transform: uppercase;
    padding-left: 10%;
    padding-right: 10%;

    &:nth-child(odd) {
      align-items: flex-end;
    }

    .title {
      font-size: 7vmin;
      margin-top: 2rem;
    }

    .content {
      margin-top: 1rem;
      width: 22rem;
      white-space: wrap;
      text-transform: none;
      letter-spacing: 0.1rem;
    }

    .address {
      z-index: 10;
      font-size: 1.2rem;
      color: inherit;

      &:hover {
        color: $theme-color;
      }
    }
  }
}
</style>
