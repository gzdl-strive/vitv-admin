<script lang="ts" setup>
import { ref } from 'vue';
import LoginPannel from './components/loginPannel';
import RegisterPannel from './components/registerPannel';
import ThreeModel from './components/model';
import { useLoginStore, useUserStore } from '@/store';

const loginStatus = ref<boolean>(true);

const loginStore = useLoginStore();
const userStore = useUserStore();

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
  <el-container class="flex login-container">
    <el-aside class="aside-container flex j_center a_center">
      <transition
        :duration="300"
        enter-active-class="animate__animated animate__fadeInRightBig"
        leave-active-class="animate__animated animate__fadeOutLeftBig"
      >
        <component
          :is="loginStatus ? LoginPannel : RegisterPannel"
          class="flex column"
          :change-login-status="changeLoginStatus"
          :login-store="loginStore"
          :user-store="loginStatus ? userStore : ''"
        />
      </transition>
    </el-aside>
    <el-main class="main-container">
      <three-model></three-model>
    </el-main>
  </el-container>
</template>

<style scoped lang="scss">
.login-container {
  height: 100%;
  background-color: #4682b4;

  .aside-container {
    flex: 3;
    overflow: hidden;
  }

  .main-container {
    flex: 4;

    @media (max-width: $screen-md) {
      display: none;
    }
  }
}
</style>
