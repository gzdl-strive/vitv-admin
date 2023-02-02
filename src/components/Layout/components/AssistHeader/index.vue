<script lang="ts" setup></script>
<script lang="ts">
export default {
  name: 'AssistHelper'
};
</script>

<template>
  <section class="assist-container flex j_between a_center">
    <route-tag></route-tag>
    <btn-group></btn-group>
  </section>
</template>

<style scoped lang="scss">
.assist-container {
  height: $assist-header-height;
  background: $color-white;
  border: $assist-header_border;
  box-shadow: $assist-header_box-shadow;
  padding: 0 1.5rem;
}
</style>
