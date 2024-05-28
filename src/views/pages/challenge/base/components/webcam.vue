<!-- eslint-disable @typescript-eslint/no-non-null-assertion -->
<script lang="ts" setup>
import { ref, onMounted, reactive } from 'vue';
import { ContextMenuProps } from '@/components/Layout/typing';
import { StrengthMode } from './typing';

const videoRef = ref<HTMLVideoElement>();
const canvasRef = ref<HTMLCanvasElement>();
const snapRef = ref<HTMLAudioElement>();
const stripRef = ref<HTMLDivElement>();
const count = ref<number>(0);
// 额外功能标志位
const strengthMode = ref<StrengthMode>('');

// 初始化函数
const initFunc = () => {
  const canvas: HTMLCanvasElement = canvasRef.value!;
  const video: HTMLVideoElement = videoRef.value!;
  const strip: HTMLDivElement = stripRef.value!;
  window.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.ctrlKey && e.key.toLowerCase() === 't') {
      takePhoto(canvas, strip);
    } else if (e.ctrlKey && e.key.toLowerCase() === 'v') {
      getVideo();
      video.addEventListener('canplay', () => paintToCanvas(canvas, video));
    }
  });
};

// 调用摄像头
const getVideo = () => {
  const video: HTMLVideoElement = videoRef.value!;
  navigator.mediaDevices
    .getUserMedia({
      video: true,
      audio: false
    })
    .then(localMediaStream => {
      video.srcObject = localMediaStream;
      video.play();
    })
    .catch(err => {
      window.$toast('error', 'ON NO' + err);
    });
};

// redEffect
const redEffect = (pixels: ImageData) => {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i + 0] = pixels.data[i + 0] + 200; // RED
    pixels.data[i + 1] = pixels.data[i + 1] - 50; // GREEN
    pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // Blue
  }
  return pixels;
};

// rgbSplit
const rgbSplit = (pixels: ImageData) => {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i - 150] = pixels.data[i + 0]; // RED
    pixels.data[i + 500] = pixels.data[i + 1]; // GREEN
    pixels.data[i - 550] = pixels.data[i + 2]; // Blue
  }
  return pixels;
};

// grayEffect
const grayEffect = (pixels: ImageData) => {
  for (let i = 0; i < pixels.width; i++) {
    for (let j = 0; j < pixels.height; j++) {
      let x = j * 4 * pixels.width + i * 4;
      let r = pixels.data[x];
      let g = pixels.data[x + 1];
      let b = pixels.data[x + 2];
      pixels.data[x] =
        pixels.data[x + 1] =
        pixels.data[x + 2] =
          (r + g + b) / 3;
    }
  }
  return pixels;
};

// 绘制到Canvas上
const paintToCanvas = (canvas: HTMLCanvasElement, video: HTMLVideoElement) => {
  const width: number = video.videoWidth;
  const height: number = video.videoHeight;
  const ctx = canvas.getContext('2d')!;
  canvas.width = width;
  canvas.height = height;

  return setInterval(() => {
    ctx?.drawImage(video, 0, 0, width, height);
    // take the pixels out
    let pixels = ctx.getImageData(0, 0, width, height);

    strengthMode.value === 'rgbSplit' && rgbSplit(pixels);
    strengthMode.value === 'redEffect' && redEffect(pixels);
    strengthMode.value === 'grayEffect' && grayEffect(pixels);

    ctx.putImageData(pixels, 0, 0);
  }, 16);
};

// 拍照
const takePhoto = (canvas: HTMLCanvasElement, strip: HTMLDivElement) => {
  const snap: HTMLAudioElement = snapRef.value!;
  // played the sound
  snap.currentTime = 0;
  snap.play();

  // count++
  count.value += 1;

  console.log('count', count.value);

  // take the data out of the canvas
  const data = canvas.toDataURL('image/jpeg');
  const link = document.createElement('a');
  link.href = data;
  link.setAttribute(
    'download',
    `handsome${count.value > 1 ? '_' + count.value : ''}`
  );
  link.innerHTML = `<img src=${data} alt="Handsome Man" />`;
  strip.insertBefore(link, strip.firstChild);
};

//右键框
const contextmenu = reactive<ContextMenuProps>({
  show: false,
  style: { top: '0', left: '0' },
  routeName: '',
  menu: [
    {
      label: '拍照',
      onClick: () => takePhoto(canvasRef.value!, stripRef.value!)
    },
    {
      label: '红色遮罩',
      onClick: () => {
        strengthMode.value = 'redEffect';
      }
    },
    {
      label: '三原色幻影',
      onClick: () => {
        strengthMode.value = 'rgbSplit';
      }
    },
    {
      label: '灰色调',
      onClick: () => {
        strengthMode.value = 'grayEffect';
      }
    },
    {
      label: '正常',
      onClick: () => {
        strengthMode.value = '';
      }
    }
  ]
});

// 右键
const handleRightClick = (event: MouseEvent) => {
  const video: HTMLVideoElement = videoRef.value!;
  if (!video.srcObject) {
    window.$toast('warning', '请按ctrl+v开启摄像头');
    return;
  }
  contextmenu.style.top = event.clientY + 'px';
  contextmenu.style.left = event.clientX + 'px';
  contextmenu.routeName = '';
  contextmenu.show = true;
};

onMounted(() => {
  initFunc();
});
</script>
<script lang="ts">
export default {
  name: 'WebCam'
};
</script>

<template>
  <section class="container">
    <el-alert
      class="alert"
      title="按住ctrl + v开启摄像头、按住ctrl + t进行拍照、右键面板使用更多功能"
      type="info"
    />
    <main class="photobooth bg-wave" @contextmenu.prevent="handleRightClick">
      <canvas ref="canvasRef" class="photo"></canvas>
      <video ref="videoRef" class="player"></video>
      <section ref="stripRef" class="strip"></section>
    </main>
    <audio ref="snapRef" src="/sounds/snap.mp3" hidden></audio>
    <context-menu
      v-model="contextmenu.show"
      :menu="contextmenu.menu"
      :route-name="contextmenu.routeName"
      :style="contextmenu.style"
    ></context-menu>
  </section>
</template>

<style scoped lang="scss">
.container {
  .photobooth {
    max-width: 100%;
    border-radius: 0.2rem;
    margin: 1rem auto;
    position: relative;

    .photo {
      width: 100%;
      height: 60vh;
      float: left;
    }

    .player {
      position: absolute;
      top: 0;
      right: 0;
      width: 13rem;
      height: 8rem;
    }

    .strip {
      padding: 2rem;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;

      &:deep(a:nth-child(5n + 1) img) {
        transform: rotate(10deg);
      }

      &:deep(a:nth-child(5n + 2) img) {
        transform: rotate(-2deg);
      }

      &:deep(a:nth-child(5n + 3) img) {
        transform: rotate(8deg);
      }

      &:deep(a:nth-child(5n + 4) img) {
        transform: rotate(-11deg);
      }

      &:deep(a:nth-child(5n + 5) img) {
        transform: rotate(12deg);
      }

      &:deep(img) {
        width: 100px;
        overflow-x: scroll;
        padding: 0.8rem 0.8rem 1.2rem;
        box-shadow: 0 0 3px rgba(0 0 0 / 20%);
        background-color: #fff;
      }
    }

    &::after {
      /* stylelint-disable-next-line string-quotes */
      content: '';
      display: block;
      clear: both;
    }
  }
}
</style>
