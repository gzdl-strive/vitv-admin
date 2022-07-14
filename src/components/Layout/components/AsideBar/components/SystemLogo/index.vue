<script lang="ts" setup>
type Props = {
  collapse: boolean;
};

defineProps<Props>();
</script>
<script lang="ts">
export default {
  name: 'SystemLogo'
};
</script>

<template>
  <div class="aside-bar-header flex j_center a_center">
    <transition name="aside-bar-logo-anim">
      <div v-show="collapse">
        <slot name="logo" />
      </div>
    </transition>
    <transition name="aside-bar-header-anim">
      <div
        v-show="!collapse"
        class="aside-bar-header-container flex j_center a_center"
      >
        <div class="aside-bar-header_logo">
          <slot name="logo" />
        </div>
        &nbsp;
        <div class="aside-bar-header_label">
          <slot name="label" />
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped lang="scss">
.aside-bar-header {
  cursor: pointer;
  user-select: none;
  font-weight: bold;
  height: 4.3rem;

  .aside-bar-header-container {
    /* stylelint-disable-next-line selector-class-pattern */
    .aside-bar-header_label {
      font-size: 1.1rem;
      letter-spacing: 0.1rem;
      white-space: nowrap;
    }
  }
}
</style>
