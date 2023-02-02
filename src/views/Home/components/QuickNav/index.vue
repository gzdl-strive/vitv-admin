<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { NavParam } from '../../typing';

const router = useRouter();

type Props = {
  title: string;
  icon: string;
  path: string;
  iconColor: string;
  query: string;
};

const props = defineProps<Props>();

const handleNav = () => {
  if (!props.path) {
    return;
  }
  const param: NavParam = {
    path: props.path
  };
  props.query &&
    (param.query = {
      name: props.query
    });
  router.push(param);
};
</script>
<script lang="ts">
export default {
  name: 'QuickNavigator'
};
</script>

<template>
  <div class="card-container">
    <el-card class="card" @click="handleNav">
      <div class="flex column a_center">
        <svg-icon
          :name="icon"
          width="2.5rem"
          height="2.5rem"
          :color="iconColor"
        ></svg-icon>
        <span class="nav-text">{{ title }}</span>
      </div>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.card-container {
  flex: 1;
  margin: 0 0.5rem;

  .card {
    transition: all 0.3s ease-out;
  }

  .card:hover {
    cursor: pointer;
    background: rgba($color: $color-info, $alpha: 8%);
    box-shadow: rgba(0 0 0 / 20%) 0 10px 20px;
  }

  .nav-text {
    margin-top: 0.5rem;
  }
}
</style>
