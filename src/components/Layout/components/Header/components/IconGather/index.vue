<script lang="ts" setup></script>
<script lang="ts">
export default {
  name: 'IconGather'
};
</script>

<template>
  <i-ep-search class="icon-style" width="1.6rem" height="1.6rem"></i-ep-search>
  <svg-icon
    name="fullScreen-open"
    width="1.6rem"
    height="1.6rem"
    class="icon-style"
  />
</template>

<style scoped lang="scss">
.icon-style {
  &:hover {
    color: $theme-color;
    cursor: pointer;
  }
}
</style>
