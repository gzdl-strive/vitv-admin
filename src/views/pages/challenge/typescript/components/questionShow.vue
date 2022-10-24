<script lang="ts" setup>
import useCopy from '@/hooks/useCopy';

type Props = {
  showCopy?: boolean;
  content: string;
  note?: string;
};
withDefaults(defineProps<Props>(), {
  showCopy: true,
  note: ''
});
</script>
<script lang="ts">
export default {
  name: 'QuestionShow'
};
</script>

<template>
  <section class="question-container">
    <pre>{{ note }}</pre>
    <pre>{{ content }}</pre>
    <i-ep-copy-document
      v-if="showCopy"
      class="copy"
      @click="useCopy(`${note}\n${content}`, $event)"
    ></i-ep-copy-document>
  </section>
</template>

<style scoped lang="scss">
.question-container {
  position: relative;
  background-color: #f6f8fa;
  border-radius: 6px;
  padding: 16px;
  overflow: auto;
  line-height: 1.45;

  .copy {
    position: absolute;
    right: 0.8rem;
    top: 0.8rem;
    width: 1.2rem;
    height: 1.2rem;
    opacity: 0;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 0.5rem;
    cursor: pointer;
    user-select: none;
    transition: all 0.2s ease-out;

    &:hover {
      opacity: 1;
    }

    &:active {
      transform: scale(0.98);
      color: $theme-color;
      border-color: $theme-color;
    }
  }
}
</style>
