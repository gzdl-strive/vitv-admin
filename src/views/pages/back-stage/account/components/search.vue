<script lang="ts" setup>
import { computed } from 'vue';

type Props = {
  username: string;
  count: string;
};
const props = defineProps<Props>();
const emits = defineEmits([
  'update:username',
  'update:count',
  'handleSearch',
  'handleAdd'
]);

const username = computed({
  get: () => props.username,
  set: (newVal: string) => emits('update:username', newVal)
});
const count = computed({
  get: () => props.count,
  set: (newVal: string) => emits('update:count', newVal)
});

// 重置
const reset = () => {
  username.value = '';
  count.value = '';
  emits('handleSearch');
};
</script>
<script lang="ts">
export default {
  name: 'AccountSearch'
};
</script>

<template>
  <el-card header="按条件搜索">
    <el-row :gutter="16">
      <el-col :span="8">
        <section class="flex a_center">
          <label class="label">账号:</label>
          <el-input v-model="username" placeholder="请输入用户名!" />
        </section>
      </el-col>
      <el-col :span="8">
        <section class="flex a_center">
          <label class="label">频率:</label>
          <el-input v-model="count" placeholder="请输入频率!" />
        </section>
      </el-col>
      <el-button type="primary" class="btn" @click="emits('handleSearch')"
        >查询</el-button
      >
      <el-button @click="reset">重置</el-button>
      <el-button type="primary" @click="emits('handleAdd')">新增</el-button>
    </el-row>
  </el-card>
</template>

<style scoped lang="scss">
.label {
  width: 3rem;
}

.btn {
  margin-left: 0.5rem;
}
</style>
