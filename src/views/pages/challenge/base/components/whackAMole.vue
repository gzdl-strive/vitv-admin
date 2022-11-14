<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue';
import { HoleObj, WhackHoleScoreItem } from './typing';
import { ScorePanelProps } from '@/components/ScorePanel/typing';
import { uuid } from '@/utils/index';

const score = ref<number>(0);
const timeUp = ref<boolean>(false);
let lastHole: number | null;

// 得分面板
const scorepanel = reactive<ScorePanelProps>({
  show: false,
  style: { top: '24%', right: '2%' },
  list: []
});

// 列表
const holeList = reactive<HoleObj[]>([
  { id: 1, up: false },
  { id: 2, up: false },
  { id: 3, up: false },
  { id: 4, up: false },
  { id: 5, up: false },
  { id: 6, up: false }
]);
// 点击/打 鼹鼠
const bonk = (event: MouseEvent, hole: HoleObj) => {
  // 为true表明当前事件是由用户行为触发(比如说真实的鼠标点击触发一个click事件)
  // 为false表明事件由一个脚本生成的(使用事件构造方法,比如【event.initEvent】
  if (!event.isTrusted) return;
  score.value += 1;
  hole.up = false;
};
// 随机时间
function randomTime(min: number, max: number) {
  return Math.round(Math.random() * (max - min) + min);
}
// 随机洞口
function randomHole(holes: HoleObj[]): HoleObj {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];
  if (hole.id === lastHole) {
    return randomHole(holes);
  }
  lastHole = hole.id;
  return hole;
}
// 上次成绩
function outputMaxAndLast() {
  let whackHoleScore = localStorage.getItem('whack-hole-score');
  if (whackHoleScore) {
    if (score.value === 0) {
      scorepanel.list = JSON.parse(whackHoleScore);
    } else {
      const arr: WhackHoleScoreItem[] = JSON.parse(whackHoleScore);
      arr.forEach(item => {
        delete item.isLastScore;
      });
      arr.push({
        id: uuid(),
        score: score.value,
        isLastScore: true
      });
      arr.sort((a, b) => {
        if (a.score > b.score) {
          return -1;
        } else if (a.score === b.score && a.isLastScore) {
          return -1;
        } else {
          return 1;
        }
      });
      localStorage.setItem('whack-hole-score', JSON.stringify(arr));
      scorepanel.list = arr;
    }
  } else {
    if (score.value !== 0) {
      const res: WhackHoleScoreItem[] = [];
      res.push({
        id: uuid(),
        score: score.value,
        isLastScore: true
      });
      localStorage.setItem('whack-hole-score', JSON.stringify(res));
      scorepanel.list = res;
    }
  }
}
// peep
const peep = () => {
  const time = randomTime(500, 1000);
  const hole = randomHole(holeList);
  hole.up = true;
  setTimeout(() => {
    hole.up = false;
    if (!timeUp.value) {
      peep();
    } else {
      outputMaxAndLast();
    }
  }, time);
};
// 展示历史记录
// 开始游戏
const startGame = () => {
  score.value = 0;
  timeUp.value = false;
  peep();
  setTimeout(() => {
    timeUp.value = true;
  }, 10000);
};

onMounted(() => {
  outputMaxAndLast();
});
</script>
<script lang="ts">
export default {
  name: 'WhackAMole'
};
</script>

<template>
  <section class="container">
    <h1 class="title">
      Whack-a-mole!
      <span class="score">{{ score }}</span>
    </h1>
    <div class="game">
      <div
        v-for="hole in holeList"
        :key="hole.id"
        :class="['hole', `hole${hole.id}`, hole.up ? 'up' : '']"
      >
        <div class="mole" @click="bonk($event, hole)"></div>
      </div>
    </div>
    <button class="start-btn" @click="startGame">Start!</button>
    <score-panel
      v-model="scorepanel.show"
      :style="scorepanel.style"
      :list="scorepanel.list"
    />
  </section>
</template>

<style scoped lang="scss">
/* stylelint-disable-next-line */
@import '@/style/font.scss';

.container {
  height: 70vh;
  background-color: #ffc600;
  padding-top: 1rem;
  position: relative;

  .title {
    font-size: 5rem;
    text-align: center;
    line-height: 1;
    /* stylelint-disable-next-line string-quotes */
    font-family: 'Amatic SC', cursive;

    .score {
      font-size: 5rem;
      background: rgba(255 255 255 / 20%);
      padding: 0 3rem;
      line-height: 1;
      border-radius: 1rem;
    }
  }

  .game {
    width: 600px;
    height: 400px;
    display: flex;
    flex-wrap: wrap;
    margin: 0 auto;

    .hole {
      flex: 1 0 33.33%;
      overflow: hidden;
      position: relative;
      /* stylelint-disable-next-line string-quotes */
      cursor: url('@/assets/svg-copy/beat.svg'), auto;

      &::after {
        display: block;
        /* stylelint-disable-next-line string-quotes */
        content: '';
        width: 100%;
        height: 70px;
        /* stylelint-disable-next-line string-quotes */
        background: url('@/assets/svg-copy/dirt.svg') bottom center no-repeat;
        background-size: contain;
        position: absolute;
        z-index: 2;
        bottom: -2rem;
      }

      .mole {
        /* stylelint-disable-next-line */
        background: url('@/assets/svg-copy/mole_ani.svg') bottom center
          no-repeat;
        background-size: 60%;
        position: absolute;
        top: 100%;
        width: 100%;
        height: 100%;
        transition: all 0.4s;
      }
    }

    .hole.up {
      .mole {
        top: 0;
      }
    }
  }

  .start-btn {
    position: absolute;
    top: -2%;
    left: 2%;
    width: 5rem;
    height: 5rem;
    font-size: 1.5rem;
    border: none;
    border-radius: 50%;
    background-color: rgba(255 255 255 / 90%);
    cursor: pointer;
    transition: all 0.5s ease-out;
    margin-top: 2rem;
    z-index: 1;

    &:hover {
      background-color: #ed9410;
      box-shadow: 0 0 1rem 1rem #f9f902;
    }
  }
}
</style>
