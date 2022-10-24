<script lang="ts" setup>
import { ref, onBeforeUnmount } from 'vue';
import { CountDownTimerItem } from './typing';
import { IntervalHandle } from '@/typing';

const countDownTime = ref<string>('');
const timeLeft = ref<string>('0:00');
const endTime = ref<string>('5:30');
let timer: IntervalHandle;

const controlBtnList: CountDownTimerItem[] = [
  { name: '20 Secs', value: '20' },
  { name: 'Work 5', value: '300' },
  { name: 'Quick 15', value: '900' },
  { name: 'Snack 20', value: '1200' },
  { name: 'Lunch Break', value: '3600' }
];

const calcTimeLeft = (seconds: number) => {
  const minus = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minus < 10 ? '0' + minus : minus}:${
    remainderSeconds === 0 ? '00' : remainderSeconds
  }`;
  timeLeft.value = display;
};
const calcEndTime = (timestamp: number) => {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const minutes = end.getMinutes();
  endTime.value = `Be Back At ${hour}:${
    minutes < 10 ? '0' + minutes : minutes
  }`;
};

const countdown = (seconds: number) => {
  clearInterval(timer);

  const now = Date.now();
  const then = now + seconds * 1000;
  calcTimeLeft(seconds);
  calcEndTime(then);

  timer = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);

    if (secondsLeft < 0) {
      clearInterval(timer);
      return;
    }
    calcTimeLeft(secondsLeft);
  });
};

const inputSubmit = () => {
  if (!countDownTime.value) return;
  countdown(parseInt(countDownTime.value) * 60);
  countDownTime.value = '';
};

onBeforeUnmount(() => {
  clearInterval(timer);
});
</script>
<script lang="ts">
export default {
  name: 'CountDown'
};
</script>

<template>
  <section class="timer-container">
    <header class="timer-controls">
      <button
        v-for="btn in controlBtnList"
        :key="btn.value"
        class="btn"
        @click="countdown(parseInt(btn.value))"
      >
        {{ btn.name }}
      </button>
      <input
        v-model="countDownTime"
        class="input"
        type="text"
        placeholder="请输入倒计时时间(单位:分钟)"
        @blur="inputSubmit"
      />
    </header>
    <main class="timer-show">
      <h1 class="time-left">{{ timeLeft }}</h1>
      <p class="end-time">{{ endTime }}</p>
    </main>
  </section>
</template>

<style scoped lang="scss">
.timer-container {
  height: 70vh;
  background: linear-gradient(45deg, #42a5f5 0%, #478ed1 50%, #0d47a1 100%);
  display: flex;
  flex-direction: column;

  .timer-controls {
    display: flex;

    .btn {
      flex: 1;
      background: transparent;
      border: 0;
      cursor: pointer;
      color: white;
      font-size: 1.2rem;
      text-transform: uppercase;
      border-bottom: 3px solid rgba(0 0 0 / 20%);
      border-right: 1px solid rgba(0 0 0 / 20%);
      padding: 1rem;
      /* stylelint-disable-next-line */
      font-family: 'Inconsolata', monospace;

      &:hover,
      &:focus {
        background-color: rgba(0 0 0 / 20%);
        outline: 0;
      }
    }

    .input {
      flex: 1;
      padding: 1.2rem;
      border: 0;
      border-top: 1px solid rgba(0 0 0 / 20%);
      border-right: 1px solid rgba(0 0 0 / 20%);
      outline: none;

      &:focus::placeholder {
        transition: all 0.3s ease-out;
        text-align: left;
        transform: scale(0.85) translate(-10%, -100%);
      }
    }
  }

  .timer-show {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;

    .time-left {
      font-size: 10rem;
      letter-spacing: 0.2rem;
      font-weight: 100;
      margin: 0;
      text-shadow: 4px 4px 0 rgba(0 0 0 / 5%);
    }

    .end-time {
      font-weight: 100;
      font-size: 3rem;
    }
  }
}
</style>
