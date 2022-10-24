<script lang="ts" setup>
type Props = {
  order: number;
  describe: string;
  title: string;
  isExample?: boolean;
  color?: string;
};
withDefaults(defineProps<Props>(), {
  isExample: false,
  color: ''
});
</script>
<script lang="ts">
export default {
  name: 'TypesCard'
};
</script>

<template>
  <el-card class="type-box" shadow="hover" v-bind="$attrs">
    <template #header>
      <header class="flex j_between">
        <el-tag effect="dark" :color="color" round>{{ order }}</el-tag>
        <el-tag effect="dark" :color="color">{{ title }}</el-tag>
      </header>
    </template>
    <el-tooltip>
      <template #content>
        <div style="width: 20rem; white-space: pre-wrap">
          {{ describe }}
        </div>
      </template>
      <span class="ellipsis-three">{{ describe }}</span>
    </el-tooltip>
    <section v-if="isExample">
      <slot name="example"></slot>
    </section>
  </el-card>
</template>

<style scoped lang="scss">
.type-box {
  width: 24%;
  max-width: 24%;

  /* stylelint-disable-next-line selector-class-pattern */
  &:deep(.el-tag--dark) {
    --el-tag-bg-color: none;
    --el-tag-border-color: none;
    --el-tag-hover-color: none;
  }
}
</style>
