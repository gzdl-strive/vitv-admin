<script lang="ts" setup>
import { ref, Ref } from 'vue';
import LoginPannel from './components/loginPannel';
import RegisterPannel from './components/registerPannel';
import ThreeModelGlb from './components/model';

const loginStatus: Ref<boolean> = ref(true);

const changeLoginStatus = () => {
  loginStatus.value = !loginStatus.value;
};
</script>
<script lang="ts">
export default {
  name: 'LoginPage'
};
</script>

<template>
  <el-container
    class="flex login-container"
    :class="loginStatus ? 'j_row' : 'j_row_reverse'"
    @click="changeLoginStatus"
  >
    <el-aside class="aside-container">
      <component :is="loginStatus ? LoginPannel : RegisterPannel" />
    </el-aside>
    <el-main class="main-container">
      <three-model-glb></three-model-glb>
    </el-main>
  </el-container>
</template>

<style scoped lang="scss">
.login-container {
  height: 100%;
  transition: all 3s ease-out;

  .aside-container {
    flex: 3;
  }

  .main-container {
    flex: 4;
  }
}
</style>
