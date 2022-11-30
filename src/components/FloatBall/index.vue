<script lang="ts" setup>
import { ref } from 'vue';
import { FloatBallItemProps } from './typing';

type Props = {
  num: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  style: any;
  list: FloatBallItemProps[];
};
defineProps<Props>();

const hover = ref<boolean>(false);
</script>
<script lang="ts">
export default {
  name: 'FloatBall'
};
</script>

<template>
  <Teleport to="#floatball">
    <section
      class="floatball-container"
      :style="style"
      @mouseenter="hover = true"
      @mouseleave="hover = false"
    >
      <section
        class="container"
        :class="{
          warning: parseInt(num + '') >= 60,
          danger: parseInt(num + '') >= 80
        }"
      >
        <div class="wave"></div>
        <div
          class="wave-mask"
          :style="`top: ${40 - parseInt(num + '')}px`"
        ></div>
        <div class="num">
          {{ num }}
          <span class="unit">%</span>
        </div>
      </section>
      <transition
        :duration="300"
        enter-active-class="animate__animated animate__tada"
      >
        <section v-if="list.length && hover" class="list-container">
          <section
            v-for="item in list"
            :key="item.id"
            class="list-item"
            @click="!item.disabled && item.onClick()"
          >
            {{ item.label }}
          </section>
        </section>
      </transition>
    </section>
  </Teleport>
</template>

<style scoped lang="scss">
.floatball-container {
  position: fixed;
  z-index: 10;
  top: 50%;
  right: -4rem;
  transition: right 0.5s linear;

  &:hover {
    right: 1%;
    cursor: pointer;
  }

  .container {
    background-color: $color-white;
    border-radius: 50%;
    width: 100%;
    height: 100%;
    border: 0.3rem solid #67c23a;
    padding: 0.3rem;
    position: relative;
    overflow: hidden;
    z-index: 5;

    .wave {
      width: 100%;
      height: 100%;
      background-image: linear-gradient(-180deg, #aaff80 13%, #67c23a 91%);
      border-radius: 50%;
    }

    .wave-mask {
      position: absolute;
      width: 200%;
      height: 200%;
      left: 50%;
      border-radius: 40%;
      background-color: rgba(255 255 255 / 90%);
      transform: translate(-50%, -70%) rotate(0);
      animation: to-rotate 10s linear -5s infinite;
    }

    .num {
      position: absolute;
      width: 100%;
      text-align: center;
      top: 50%;
      left: 50%;
      color: $theme-color;
      font-size: 1.5rem;
      transform: translate(-48%, -50%);
      user-select: none;

      .unit {
        font-size: 1rem;
        user-select: none;
      }
    }

    &.warning {
      border: 3px solid #e6a23c;

      .wave {
        background-image: linear-gradient(-180deg, #f0c78a 13%, #e6a23c 91%);
      }

      .num {
        color: #f1940a;
      }

      &.danger {
        border: 3px solid #f56c6c;

        .wave {
          background-image: linear-gradient(-180deg, #f78989 13%, #f56c6c 91%);
        }

        .num {
          color: $color-danger;
        }
      }
    }
  }

  .list-container {
    width: 100%;
    position: absolute;

    .list-item {
      width: 100%;
      background-color: $theme-color;
      padding: 0.5rem 0.3rem;
      color: $color-white;
      border-radius: 0.3rem;
      text-align: center;
      font-size: 1rem;
      user-select: none;
      z-index: 1;

      &:nth-child(n + 2) {
        margin-top: 0.3rem;
      }

      &:active {
        transform: scale(0.98);
      }
    }
  }
}

@keyframes to-rotate {
  50% {
    transform: translate(-50%, -70%) rotate(180deg);
  }

  100% {
    transform: translate(-50%, -70%) rotate(360deg);
  }
}
</style>
