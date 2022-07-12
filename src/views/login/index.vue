<script lang="ts" setup>
import { ref, onMounted, reactive } from 'vue';
import type { FormInstance } from 'element-plus';
import { User, Lock } from '@element-plus/icons-vue';
// import { useRouter } from 'vue-router';
import galaxy from './galaxy';

const webgl = ref<HTMLCanvasElement>();

//表单DOM
const loginFormRef = ref<FormInstance>();
//表单字段
const loginFormData = reactive({
  username: 'admin',
  password: '123'
});
//表单校验规则
const loginRules = reactive({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
    // { min: 11, max: 11, message: '用户名长度应为11', trigger: 'blur' }
  ],
  password: {
    required: true,
    message: '请输入密码'
  }
});
//按钮加载
const loading = ref<boolean>(false);
//是否聚焦与输入框
const inputFocus = ref<boolean>(false);
// const router = useRouter();
//登录
const onLogin = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(valid => {
    if (valid) {
      const { username, password } = loginFormData;
      loading.value = true;
      console.log(username, password);
      // const userStore = useUserStore();
      // Utils.wait(500).then(() => {
      //   router.push('/');
      //   userStore[SET_LOGIN_STATUS](true);
      // });
    } else {
      window.$toast('error', '登录失败，请检查输入是否有误');
    }
  });
};

onMounted(() => {
  galaxy(webgl);
});
</script>
<script lang="ts">
export default {
  name: 'LoginPage'
};
</script>

<template>
  <canvas ref="webgl" class="webgl"></canvas>
  <div class="login">
    <div class="login-container flex a_center column">
      <div class="login-title">
        <span class="login-title-text">登录</span>
      </div>
      <div class="login-inputs">
        <el-form
          ref="loginFormRef"
          :model="loginFormData"
          :rules="loginRules"
          class="input-form"
        >
          <el-form-item prop="username">
            <el-input
              v-model="loginFormData.username"
              placeholder="请输入用户名"
              :prefix-icon="User"
              @focus="inputFocus = true"
              @blur="inputFocus = false"
              @keyup.enter="onLogin(loginFormRef)"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="loginFormData.password"
              type="password"
              placeholder="请输入密码"
              show-password
              :prefix-icon="Lock"
              @keyup.enter="onLogin(loginFormRef)"
            />
          </el-form-item>
        </el-form>
      </div>
      <div class="login-button">
        <el-button
          type="primary"
          :loading="loading"
          @click="onLogin(loginFormRef)"
        >
          登录
        </el-button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.webgl {
  position: fixed;
  top: 0;
  left: 0;
  outline: none;
}

.login-form {
  height: 20rem;
  width: 20rem;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.login {
  .login-container {
    width: 26rem;
    position: absolute;
    padding: 1.5rem 2rem 2rem;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba($color: $color-white, $alpha: 10%);
    transition: all 400ms ease;
    border-radius: 0.3rem;

    .login-title {
      margin-bottom: 1rem;
      user-select: none;

      .login-title-text {
        font-size: 2rem;
        font-weight: bold;
        letter-spacing: 0.1rem;
      }
    }

    .login-inputs {
      width: 100%;

      .input-form {
        :deep(.el-form-item) {
          padding-bottom: 0.5rem;
        }

        /* stylelint-disable-next-line selector-class-pattern */
        :deep(.el-input__inner) {
          height: 3rem;
        }

        /* stylelint-disable-next-line selector-class-pattern */
        :deep(.el-input__suffix) {
          width: 2rem;

          /* stylelint-disable-next-line selector-class-pattern */
          .el-input__suffix-inner {
            width: 100%;

            .el-icon {
              width: 100%;

              svg {
                width: 1.1rem;
                height: 1.2rem;
              }
            }
          }
        }

        /* stylelint-disable-next-line selector-class-pattern */
        :deep(.el-input__prefix) {
          width: 2rem;

          /* stylelint-disable-next-line selector-class-pattern */
          .el-input__prefix-inner {
            width: 100%;

            .el-icon {
              width: 100%;

              svg {
                width: 1.1rem;
                height: 1.2rem;
              }
            }
          }
        }

        /* stylelint-disable-next-line selector-class-pattern */
        :deep(.el-input--prefix .el-input__inner) {
          padding-left: 3.5rem;
          padding-top: 0.1rem;
          font-size: 1.2rem;
        }
      }
    }

    .login-button {
      width: 100%;

      &:deep(.el-button) {
        width: 100%;
        height: 2.5rem;

        span {
          padding-top: 0.25rem;
          letter-spacing: 0.25rem;
        }
      }
    }
  }
}
</style>
