<script lang="ts" setup>
import { inject } from 'vue';
import { NavChange } from '@/components/Layout/typing';

type Props = {
  isCollapse: boolean;
};

const props = defineProps<Props>();

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const navCollapse = inject<NavChange>('nav-collapse')!;
const changeCollapse = () => {
  navCollapse(!props.isCollapse);
};
</script>
<script lang="ts">
export default {
  name: 'HeaderCom'
};
</script>

<template>
  <el-header class="header-container flex a_center j_between">
    <section class="flex">
      <section class="flex a_center collapse-icon" @click="changeCollapse">
        <i-ep-expand
          v-if="isCollapse"
          style="width: 1.8rem; height: 1.8rem"
          class="icon"
        />
        <i-ep-fold v-else style="width: 1.8rem; height: 1.8rem" class="icon" />
      </section>
      <route-breadcrumb></route-breadcrumb>
    </section>
    <section class="flex a_center gap_one">
      <icon-gather />
      <user-info />
    </section>
  </el-header>
</template>

<style scoped lang="scss">
.header-container {
  width: 100%;
  height: $header-height;
  box-shadow: $header_box-shadow;

  .collapse-icon {
    cursor: pointer;
    margin-right: 0.8rem;

    .icon:hover {
      color: $theme-color;
    }
  }
}
</style>
