<!-- eslint-disable @typescript-eslint/no-non-null-assertion -->
<script lang="ts" setup>
import { ref } from 'vue';

// 播放媒体设备ref
const videoRef = ref<HTMLVideoElement>();
// 进度条Ref
const progressRef = ref<HTMLDivElement>();
// 进度条是否进入拖动状态
const progressDrag = ref<boolean>(false);
// 进度条进度
const progressBarVal = ref<string>('50%');
// 播放/暂停
const playFlag = ref<boolean>(false);
// 音量
const volume = ref<number>(1);
// 播放速率
const playbackRate = ref<number>(1);

// 切换状态 播放/暂停
const togglePlay = () => {
  const video: HTMLVideoElement = videoRef.value!;
  const method: 'pause' | 'play' = playFlag.value ? 'pause' : 'play';
  video[method]();
  playFlag.value = !playFlag.value;
};
// 快进/后退时间
const skipTime = (time: string) => {
  const video: HTMLVideoElement = videoRef.value!;
  video.currentTime += parseFloat(time);
};
// 音量/速率改变
const changeSlider = (type: 'volume' | 'playbackRate') => {
  const video: HTMLVideoElement = videoRef.value!;
  video[type] = type === 'volume' ? volume.value : playbackRate.value;
};

// 进度条点击
const scrub = (e: MouseEvent) => {
  if (!progressRef.value || !videoRef.value) return;
  const video: HTMLVideoElement = videoRef.value!;
  const progress: HTMLDivElement = progressRef.value;
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
};

// 进度条随播放器播放改变
const handleProgressBar = () => {
  if (!videoRef.value) return;
  const video: HTMLVideoElement = videoRef.value;
  const percent = (video.currentTime / video.duration) * 100;
  progressBarVal.value = `${percent}%`;
};
</script>
<script lang="ts">
export default {
  name: 'CustomVideo'
};
</script>

<template>
  <section class="container">
    <section class="video-container">
      <video
        ref="videoRef"
        src="/video/test.mp4"
        class="video"
        @click="togglePlay"
        @timeupdate="handleProgressBar"
      />

      <footer class="controls">
        <div
          ref="progressRef"
          class="progress"
          @click="scrub"
          @mousemove="progressDrag === true && scrub($event)"
          @mousedown="progressDrag = true"
          @mouseup="progressDrag = false"
          @mouseout="progressDrag = false"
        >
          <div
            class="progress-filled"
            :style="{ flexBasis: progressBarVal }"
          ></div>
        </div>
        <button
          class="btn"
          :title="playFlag ? '暂停' : '播放'"
          @click="togglePlay"
        >
          {{ playFlag ? '❚ ❚' : '►' }}
        </button>
        <el-slider
          v-model="volume"
          class="slider"
          :format-tooltip="(val: number) => `音量：${val}`"
          :max="1"
          :step="0.05"
          @change="changeSlider('volume')"
        />
        <el-slider
          v-model="playbackRate"
          class="slider"
          :format-tooltip="(val: number) => `播放速率：${val}`"
          :min="0.1"
          :max="2"
          :step="0.05"
          @change="changeSlider('playbackRate')"
        />
        <button class="btn" title="后退10s" @click="skipTime('-10')">
          «10s
        </button>
        <button class="btn" title="快进25秒" @click="skipTime('25')">
          25»
        </button>
      </footer>
    </section>
  </section>
</template>

<style scoped lang="scss">
.container {
  height: 65vh;
  background-image: linear-gradient(to top, #accbee 0%, #e7f0fd 100%);
  display: flex;
  justify-content: center;
  align-items: center;

  .video-container {
    max-width: 50rem;
    border: 0.3rem solid rgba(0 0 0 / 20%);
    box-shadow: 0 0 2rem rgba(0 0 0 / 20%);
    overflow: hidden;
    position: relative;

    .video {
      width: 100%;
      border: 0;
      margin-bottom: -0.5rem;
    }

    .controls {
      display: flex;
      flex-wrap: wrap;
      position: absolute;
      bottom: 0;
      width: 100%;
      transform: translateY(100%) translateY(-0.5rem);
      transition: all 0.3s;
      background: rgba(0 0 0 / 10%);

      .progress {
        flex: 10;
        position: relative;
        display: flex;
        flex-basis: 100%;
        height: 5px;
        transition: height 0.3s;
        background: rgba(0 0 0 / 50%);
        cursor: ew-resize;

        .progress-filled {
          background: #ffc600;
          flex: 0;
          flex-basis: 50%;
        }
      }

      & > * {
        flex: 1;
      }

      .btn {
        background: none;
        border: 0;
        color: #fff;
        text-align: center;
        cursor: pointer;
        max-width: 5rem;
        line-height: 1;
      }

      .slider {
        margin: 0 1rem;
      }
    }

    &:hover {
      .controls {
        transform: translateY(0);

        .progress {
          height: 0.8rem;
        }
      }
    }
  }
}
</style>
