<script lang="ts" setup>
import Plum from './components/plum.vue';
</script>
<script lang="ts">
export default {
  name: 'ErrorPage'
};
</script>

<template>
  <div class="result-container flex column a_center j_center">
    <h2 class="result-item">Sorry, Page Not Found!</h2>
    <h1 class="result-item">404</h1>
    <p class="result-item">We can't find the page you're looking for.</p>
    <a href="/" class="result-item">Go Back Home</a>
  </div>
  <div class="canvas-box">
    <plum :init-x="0" :init-y="200" :init-theta="0" />
  </div>
  <div class="canvas-box2">
    <plum :init-x="400" :init-y="400" :init-theta="-Math.PI" />
  </div>
</template>

<style lang="scss" scoped>
.result-container {
  width: 100%;
  height: 100%;
  font-family: montserrat, sans-serif;
  /* stylelint-disable-next-line declaration-colon-newline-after */
  background-image: linear-gradient(
    -225deg,
    #5d9fff 0%,
    #b8dcff 48%,
    #6bbbff 100%
  );

  .result-item {
    margin: 1rem 0;
  }

  h2 {
    font-size: 2rem;
  }

  h1 {
    font-size: 10.5rem;
    letter-spacing: 1.5rem;
    /* stylelint-disable-next-line string-quotes */
    background: url('@/assets/svg/dm.svg') no-repeat center;
    background-size: cover;
    background-clip: text;
    /* stylelint-disable-next-line property-no-vendor-prefix */
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  p {
    font-size: 1.5rem;
  }

  a {
    margin-top: 1rem;
    background-color: #f86e59;
    color: $color-white;
    padding: 1rem 2rem;
    border-radius: 2rem;
    display: inline-block;
    font-size: 1.2rem;
    text-transform: uppercase;
    transition: all 0.4s ease;

    &:hover {
      background: #e55039;
    }
  }
}

.canvas-box {
  position: fixed;
  width: 26.6rem;
  height: 100%;
  left: 0;
  top: 0;
}

.canvas-box2 {
  position: fixed;
  width: 26.6rem;
  height: 100%;
  right: 0;
  top: 0;
}
</style>
