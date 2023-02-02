<script lang="ts" setup>
type Props = {
  code: string;
  language?: string;
  containerCls: string;
};
withDefaults(defineProps<Props>(), {
  language: 'JavaScript'
});
</script>
<script lang="ts">
export default {
  name: 'CodeShow'
};
</script>

<template>
  <div
    v-highlight="containerCls"
    :class="containerCls"
    :codetype="language"
    class="code-show-container"
  >
    <highlightjs
      :language="language"
      :autodetect="false"
      :code="code"
    ></highlightjs>
  </div>
</template>

<style scoped lang="scss">
.code-show-container {
  &:deep(pre code.hljs) {
    padding: 1em 2rem 1em 1em;
  }
}
</style>
