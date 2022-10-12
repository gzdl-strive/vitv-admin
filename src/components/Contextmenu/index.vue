<script lang="ts" setup>
import { computed, watch } from 'vue';
import { ContextMenuItemProps } from './typing';

type Props = {
  modelValue: boolean;
  menu: ContextMenuItemProps[];
  routeName: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  style: any;
};
const props = defineProps<Props>();
const emits = defineEmits(['update:modelValue']);
const show = computed({
  get: () => props.modelValue,
  set: newValue => emits('update:modelValue', newValue)
});

const hideMenu = () => show.value && (show.value = false);

watch(show, value => {
  //左键点击任意位置，隐藏菜单
  value && document.addEventListener('click', hideMenu);
  !value && document.removeEventListener('click', hideMenu);
});
</script>
<script lang="ts">
export default {
  name: 'ContextMenu'
};
</script>

<template>
  <teleport to="#contextmenu">
    <ul v-show="show" class="contentmenu-wrapper" :style="style">
      <template v-for="item in menu" :key="item.label">
        <li
          v-if="item.disabled ? !item.disabled(routeName) : true"
          class="contentmenu-li"
          @click="item.onClick(routeName)"
        >
          {{ item.label }}
        </li>
      </template>
    </ul>
  </teleport>
</template>

<style scoped lang="scss">
.contentmenu-wrapper {
  position: fixed;
  padding: 0.25rem 0;
  background-color: $color-white;
  border: 1px solid $color-info;
  z-index: 999;
  border-radius: 0.2rem;
  box-shadow: 0 0.1rem 0.8rem 0 rgb(0 0 0 / 20%);

  li {
    cursor: pointer;
    padding: 0.5rem 1rem;

    &:hover {
      background-color: rgba($color: $color-info, $alpha: 50%);
    }
  }
}
</style>
