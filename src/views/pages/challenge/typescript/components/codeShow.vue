<script lang="ts" setup>
type Props = {
  code: string;
  language?: string;
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
    v-highlight="'hljs-container'"
    class="hljs-container"
    :codetype="language"
  >
    <highlightjs
      :language="language"
      :autodetect="false"
      :code="code"
    ></highlightjs>
  </div>
</template>
