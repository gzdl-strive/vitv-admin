<script lang="ts" setup>
import { computed } from 'vue';
import { ScorePanelItemProps } from './typing';

type Props = {
  modelValue: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  style: any;
  list: ScorePanelItemProps[];
};

const props = defineProps<Props>();
const emits = defineEmits(['update:modelValue']);

const show = computed({
  get: () => props.modelValue,
  set: newVal => emits('update:modelValue', newVal)
});
</script>
<script lang="ts">
export default {
  name: 'ScorePanel'
};
</script>

<template>
  <Teleport to="#scorepanel">
    <section class="scorepanel-wrapper" :style="style">
      <aside>
        <i-ep-arrow-left-bold
          v-if="!show"
          class="icon"
          @click="show = !show"
        ></i-ep-arrow-left-bold>
        <i-ep-arrow-right-bold
          v-else
          class="icon"
          @click="show = !show"
        ></i-ep-arrow-right-bold>
      </aside>
      <main v-show="show" class="scorepanel-main">
        <ul class="score-list">
          <li v-for="(score, index) in list" :key="score.id" class="score-item">
            <section
              v-if="index + 1 > 3"
              :style="{
                display: 'inline-block'
              }"
            >
              <span style="font-size: 1.5rem">NO.</span>
              <span style="font-size: 1.5rem; margin-left: 0.2rem">{{
                index + 1
              }}</span>
            </section>
            <svg-icon
              v-else
              :name="`no${index + 1}`"
              width="2.2rem"
              height="2.2rem"
            ></svg-icon>
            <span style="font-size: 2.2rem; margin-left: 1rem">{{
              score.score
            }}</span>
            <svg-icon
              v-if="score.isLastScore"
              name="last_score"
              width="1.5rem"
              height="1.5rem"
              class="last-score"
            ></svg-icon>
          </li>
        </ul>
      </main>
    </section>
  </Teleport>
</template>

<style scoped lang="scss">
/* stylelint-disable-next-line */
@import '@/style/font.scss';

.scorepanel-wrapper {
  position: absolute;
  display: flex;
  cursor: pointer;
  z-index: 10;

  .icon {
    width: 1.5rem;
    height: 1.5rem;
    color: #ccc;
    background-color: rgba($color: $color-black, $alpha: 92%);
    padding: 0.5rem;
    border-top-left-radius: 0.2rem;
    border-bottom-left-radius: 0.2rem;
  }

  .scorepanel-main {
    width: 10rem;
    max-height: 72vh;
    overflow-y: scroll;
    background-color: rgba($color: $color-black, $alpha: 92%);
    color: rgba(255 255 255 / 80%);

    .score-list {
      display: flex;
      flex-direction: column;

      .score-item {
        position: relative;
        padding: 0.5rem;
        /* stylelint-disable-next-line string-quotes */
        font-family: 'Amatic SC', cursive;
        display: flex;
        justify-content: center;
        align-items: center;

        .last-score {
          position: absolute;
          left: 10%;
          top: 50%;
          transform: translateY(-50%);
          color: $theme-color;
        }
      }
    }
  }
}
</style>
