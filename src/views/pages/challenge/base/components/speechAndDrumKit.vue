<script lang="ts" setup>
import { ref } from 'vue';
import { Speech, DrumItem, DrumAudioItem } from './typing';

const speech_rate = ref<number>(1);
const speech_pitch = ref<number>(0);

const speech_text = ref(
  new SpeechSynthesisUtterance('Hello! I love JavaScript🍷')
);

const toggle = (startOver = true) => {
  speechSynthesis.cancel();
  speech_text.value.rate = speech_rate.value;
  speech_text.value.pitch = speech_pitch.value;
  startOver && speechSynthesis.speak(speech_text.value);
};

// Speech
const handleSpeech = (type: Speech) => {
  type === 'speak' ? toggle() : toggle(false);
};

// Drum Kit List
const drumKitList: DrumItem[] = [
  { name: 'clap', key: 'a', kbd: 'A' },
  { name: 'hihat', key: 's', kbd: 'S' },
  { name: 'kick', key: 'd', kbd: 'D' },
  { name: 'openhat', key: 'f', kbd: 'F' },
  { name: 'boom', key: 'g', kbd: 'G' },
  { name: 'ride', key: 'h', kbd: 'H' },
  { name: 'snare', key: 'j', kbd: 'J' },
  { name: 'tom', key: 'k', kbd: 'K' },
  { name: 'tink', key: 'l', kbd: 'L' }
];
// Drum Kit Audio List
const drumAudioList: DrumAudioItem[] = [
  { key: 'a', path: 'clap.wav' },
  { key: 's', path: 'hihat.wav' },
  { key: 'd', path: 'kick.wav' },
  { key: 'f', path: 'openhat.wav' },
  { key: 'g', path: 'boom.wav' },
  { key: 'h', path: 'ride.wav' },
  { key: 'j', path: 'snare.wav' },
  { key: 'k', path: 'tom.wav' },
  { key: 'l', path: 'tink.wav' }
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const removeTransition = (e: any) => {
  if (e.propertyName !== 'transform') return;
  e.target.classList.remove('playing');
};

window.addEventListener('keyup', e => {
  const key = document.querySelector(`div[data-key="${e.key}"]`);
  const audio = document.querySelector(`audio[data-key="${e.key}"]`);
  if (!key || !audio) return;
  if (key.classList.contains('playing')) {
    key.classList.remove('playing');
  }
  key.classList.add('playing');
  (audio as HTMLAudioElement).currentTime = 0;
  (audio as HTMLAudioElement).play();
});
</script>
<script lang="ts">
export default {
  name: 'DrumKit'
};
</script>

<template>
  <section class="container bg-wave">
    <section class="speech-synthesis">
      <section class="speech-container">
        <h1>The Voiceinator</h1>
        <main class="speech-content">
          <span>Rate: </span>
          <el-slider
            v-model="speech_rate"
            show-stops
            :max="2"
            :step="0.1"
            @change="toggle"
          />
          <span>Pitch</span>
          <el-slider
            v-model="speech_pitch"
            show-stops
            :max="2"
            :step="0.1"
            @change="toggle"
          />
          <textarea
            v-model="speech_text.text"
            placeholder="请输入内容"
          ></textarea>
          <button @click="handleSpeech('stop')">Stop!</button>
          <button @click="handleSpeech('speak')">Speak</button>
        </main>
      </section>
    </section>
    <section class="drum-kit">
      <div
        v-for="drum in drumKitList"
        :key="drum.key"
        :data-key="drum.key"
        class="key"
        @transitionend="removeTransition"
      >
        <kbd>{{ drum.kbd }}</kbd>
        <span class="sound">{{ drum.name }}</span>
      </div>
      <audio
        v-for="audio in drumAudioList"
        :key="audio.key"
        :data-key="audio.key"
        :src="`/sounds/${audio.path}`"
      ></audio>
    </section>
  </section>
</template>

<style scoped lang="scss">
/* stylelint-disable-next-line  */
@import '@/style/font.scss';

.container {
  min-height: 70vh;
  display: flex;
  justify-content: space-between;

  .speech-synthesis,
  .drum-kit {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .speech-synthesis {
    width: 100%;
    padding: 1rem;

    .speech-container {
      box-sizing: border-box;
      height: 100%;
      width: 30rem;
      background: #fff;
      border-radius: 2rem;
      overflow: hidden;

      h1 {
        width: 100%;
        background-color: #ffc600;
        height: 10vh;
        line-height: 10vh;
        /* stylelint-disable-next-line */
        font-family: 'Pacifico', cursive;
        font-size: 5vh;
        text-align: center;
      }

      .speech-content {
        padding: 1.5rem;

        textarea {
          box-sizing: border-box;
          width: 100%;
          height: 12rem;
          margin: 1rem 0;
          padding: 1rem;
          border: 0;
          font-size: 1.5rem;
          background-color: #f7f7f7;
          outline: none;
        }

        button {
          box-sizing: border-box;
          background-color: #ffc600;
          border: 0;
          width: 49%;
          padding: 0.3rem;
          font-size: 1.2rem;
          /* stylelint-disable-next-line */
          font-family: 'Pacifico', cursive;
          margin-bottom: 0;
          border-bottom: 2px solid #f3c100;
          position: relative;
          cursor: pointer;

          &:active {
            top: 2px;
          }

          &:nth-of-type(1) {
            margin-right: 2%;
          }
        }
      }
    }
  }

  .drum-kit {
    padding: 1rem;
    flex-wrap: wrap;
    gap: 0.5rem;
    overflow-y: hidden;
    min-width: 30rem;

    @media (max-width: $screen-md) {
      display: none;
    }

    .key {
      width: 15%;
      height: 4.5rem;
      margin: 0 1rem;
      background: rgba(0 0 0 / 40%);
      color: #fff;
      border-radius: 1rem;
      padding: 1rem 0.5rem;
      border: 0.4rem solid #000;
      text-shadow: 0 0 0.5rem black;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      transition: all 0.1s ease;

      kbd {
        font-size: 3rem;
        font-weight: bold;
      }

      .sound {
        color: #ffc600;
        font-size: 1rem;
        letter-spacing: 0.1rem;
        text-transform: uppercase;
      }
    }

    .playing {
      transform: scale(1.1);
      border-color: #ffc600;
      box-shadow: 0 0 1rem #ffc600;
    }
  }
}
</style>
