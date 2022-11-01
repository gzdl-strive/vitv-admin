<script lang="ts" setup>
import { computed } from 'vue';
import QuestionShow from './questionShow.vue';
import CodeShow from './codeShow.vue';

type Props = {
  modelValue: boolean;
  data: {
    title: string;
    code: string;
    example: string;
  };
};
const props = defineProps<Props>();
const emits = defineEmits(['update:modelValue']);

const visible = computed({
  get: () => props.modelValue,
  set: (newVal: boolean) => emits('update:modelValue', newVal)
});
</script>
<script lang="ts">
export default {
  name: 'CodeResolving'
};
</script>

<template>
  <el-dialog
    v-model="visible"
    width="50%"
    align-center
    class="dialog-container"
  >
    <template #header>
      <el-tag>{{ data.title }}</el-tag>
    </template>
    <section class="flex column gap_one" style="margin-top: -1rem">
      <question-show
        v-if="data.example"
        note="// example to show"
        :content="data.example"
      />
      <code-show
        v-if="data.code"
        :code="data.code"
        language="TypeScript"
        container-cls="hljs-container2"
      ></code-show>
      <el-empty
        v-if="!data.code && !data.example"
        description="暂无数据"
        :image-size="100"
      />
    </section>
  </el-dialog>
</template>
