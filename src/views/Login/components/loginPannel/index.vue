<script lang="ts" setup>
import { ref, computed, reactive } from 'vue';
import { useRouter } from 'vue-router';
import {
  CHANGE_REMEBER,
  CHANGE_USERNAME,
  CHANGE_PWD,
  CHANGE_LOGIN_STATUS,
  CHANGE_LOGIN_INFO,
  SET_LIMIT_AUTHORITY
} from '@/constant/module';
import { LoginInfoItem } from '@/store/module/typing';
import GetVerifyCode from '@/utils/getVerifyCode';
import { ForgotData } from './typing';

type Props = {
  changeLoginStatus: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  loginStore: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  userStore: any;
};

const props = defineProps<Props>();

const router = useRouter();

const username = ref<string>('');
// 用于解决浏览器自动填充问题
const readonlyFlag = ref<boolean>(true);
const password = ref<string>('');

const remeberMe = computed<boolean>({
  get: () => props.loginStore.remeberMe,
  set: (status: boolean) => props.loginStore[CHANGE_REMEBER](status)
});

if (remeberMe.value) {
  props.userStore.username && (readonlyFlag.value = false);
  props.userStore.username &&
    (username.value = props.userStore.username as string);
  props.userStore.password &&
    (password.value = props.userStore.password as string);
}

// 登录提交
const handleSubmit = () => {
  const loginInfoList = props.loginStore.loginInfo;
  if (loginInfoList.length) {
    // 判断是否存在已经注册好的账号密码
    const match = loginInfoList.find(
      (info: LoginInfoItem) =>
        info.username === username.value && info.password === password.value
    );
    if (match) {
      props.userStore[CHANGE_USERNAME](username.value);
      props.userStore[CHANGE_PWD](password.value);
      props.loginStore[CHANGE_LOGIN_STATUS](true);
      props.loginStore[CHANGE_LOGIN_INFO](match.username, match.password);
      props.userStore[SET_LIMIT_AUTHORITY](2);
      router.push('/');
    } else {
      window.$toast('error', '账号密码错误,请重新输入');
    }
  } else {
    // 前往注册板块
    window
      .$confirm({
        title: '切换至注册版块进行注册',
        message: '当前未存在注册过的账号信息，是否切换？',
        type: 'warning',
        center: true,
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
      .then(() => {
        props.changeLoginStatus();
      })
      .catch(() => {
        window.$toast('info', '取消成功!');
      });
  }
};
// 游客登录
const loginByVisitor = () => {
  props.userStore[CHANGE_USERNAME]('游客访问');
  props.userStore[CHANGE_PWD]('');
  props.userStore[SET_LIMIT_AUTHORITY](1);
  props.loginStore[CHANGE_LOGIN_STATUS](true);
  router.push('/');
};

// 忘记密码
const forgotData = reactive<ForgotData>({
  step: 0,
  verifyCode: '',
  g: null,
  checkLoading: false,
  viewPwd: false
});
const beforePop = () => {
  forgotData.g = new GetVerifyCode({
    id: 'verify',
    parentId: 'container',
    width: 200,
    height: 60
  });
};
const afterPop = () => {
  forgotData.step = 0;
  forgotData.verifyCode = '';
  forgotData.checkLoading = false;
  forgotData.viewPwd = false;
};
// 点击校验
const handleCheck = () => {
  forgotData.checkLoading = true;
  if (!forgotData.g) {
    window.$toast('error', '出现未知错误,验证码获取失败');
    forgotData.checkLoading = false;
    return;
  }
  const validate = forgotData.g.validate(forgotData.verifyCode);
  if (!validate) {
    forgotData.verifyCode = '';
    window.$toast('warning', '验证码错误');
    forgotData.g.refresh();
  } else {
    forgotData.step = 1;
  }
  forgotData.checkLoading = false;
};

// handleStep
const handleStep = (type: 'view' | 'edit') => {
  window.$toast('info', '功能暂无开发,敬请期待!');
};
</script>
<script lang="ts">
export default {
  name: 'LoginPannel'
};
</script>
<template>
  <div class="login-pannel flex column gap_half a_center">
    <header class="pannel-header flex a_center gap_half">
      <svg-icon name="logo" width="2rem" height="2rem"></svg-icon>
      <span>Vitv-Admin</span>
    </header>
    <section class="pannel-main flex column a_center gap_one">
      <h1>请登录</h1>
      <form @submit.prevent="handleSubmit">
        <div class="form-controls">
          <input
            v-model="username"
            type="text"
            required
            :readonly="readonlyFlag"
            @focus="readonlyFlag = false"
          />
          <label>
            <span>账号</span>
          </label>
        </div>
        <div class="form-controls">
          <input v-model="password" type="password" required />
          <label>
            <span>密码</span>
          </label>
        </div>
        <section class="flex j_between helper-container">
          <section class="helper-left">
            <input id="remeber" v-model="remeberMe" type="checkbox" />
            <label for="remeber">记住我</label>
          </section>
          <section class="helper-right">
            <el-popover
              :width="220"
              trigger="click"
              placement="right-start"
              @before-enter="beforePop"
              @after-leave="afterPop"
            >
              <template #reference>
                <a>忘记密码?</a>
              </template>
              <template #default>
                <el-steps :active="forgotData.step" align-center>
                  <el-step title="验证" />
                  <el-step title="查看/修改" />
                </el-steps>
                <section
                  v-if="forgotData.step === 0"
                  class="flex column a_center gap_half"
                >
                  <section id="container"></section>
                  <section class="flex a_center gap_half">
                    <el-input
                      v-model="forgotData.verifyCode"
                      placeholder="请输入验证码"
                    />
                    <el-button
                      type="primary"
                      :disabled="forgotData.verifyCode.length !== 4"
                      :loading="forgotData.checkLoading"
                      @click="handleCheck"
                    >
                      校验
                    </el-button>
                  </section>
                </section>
                <section v-else class="flex gap_half j_center">
                  <section
                    class="forgot-pwd-step2-item"
                    @click="handleStep('view')"
                  >
                    <i-ep-view
                      class="forgot-pwd-step-icon"
                      @click="forgotData.viewPwd = !forgotData.viewPwd"
                    ></i-ep-view>
                    查看
                  </section>
                  <section
                    class="forgot-pwd-step2-item"
                    @click="handleStep('edit')"
                  >
                    <i-ep-edit class="forgot-pwd-step-icon"></i-ep-edit>
                    编辑
                  </section>
                </section>
              </template>
            </el-popover>
          </section>
        </section>
        <button type="submit" class="submit-btn">登录</button>
      </form>
      <footer class="other-btn flex gap_half">
        <button class="btn" @click="changeLoginStatus">注册</button>
        <button class="btn" @click="loginByVisitor">游客登录</button>
      </footer>
    </section>
  </div>
</template>

<style scoped lang="scss">
/* stylelint-disable-next-line  */
@import '@/style/font.scss';

.login-pannel {
  padding: 1rem 2rem;
  color: #fff;
  font-family: syst, sans-serif;

  .pannel-header {
    span {
      font-size: 2rem;
    }
  }

  .pannel-main {
    border-radius: 1rem;
    padding: 2.5rem 3rem 3rem;
    background-color: #2a4e6c;
    margin-top: 1rem;
    /* stylelint-disable-next-line declaration-colon-newline-after */
    box-shadow: rgba(0 0 0 / 16%) 0 3px 6px, rgba(0 0 0 / 23%) 0 3px 6px;

    h1 {
      font-size: 1.8rem;
    }

    .form-controls {
      margin: 1rem 0 2rem;
      position: relative;
    }

    .form-controls input {
      background-color: transparent;
      outline: none;
      border: 0;
      border-bottom: 2px solid #fff;
      width: 100%;
      padding: 1rem 0;
      font-size: 1.2rem;
      color: #fff;

      &:focus,
      &:valid {
        outline: 0;
        border-bottom-color: lightblue;
      }

      &:focus + label span,
      &:valid + label span {
        color: lightblue;
        transform: translateY(-30px);
      }
    }

    /* stylelint-disable-next-line no-descending-specificity */
    .form-controls label {
      position: absolute;
      top: 1rem;
      left: 0;
      pointer-events: none;

      /* stylelint-disable-next-line no-descending-specificity */
      span {
        display: inline-block;
        font-size: 1.2rem;
        min-width: 0.3rem;
        transition: 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      }
    }

    .helper-container {
      margin-top: -0.5rem;
      margin-bottom: 1rem;

      .helper-left {
        label {
          cursor: pointer;
          margin-left: 0.5rem;
          user-select: none;

          &:hover {
            color: $theme-color;
          }
        }
      }

      .helper-right {
        a {
          color: $theme-color;
          cursor: help;
          user-select: none;
        }
      }
    }

    .submit-btn {
      width: 93%;
      background-color: #a8e3f2;
      border: 0;
      cursor: pointer;
      padding: 0.6rem;
      border-radius: 0.2rem;
      font-size: 1.1rem;

      &:hover {
        background-color: #48c5e4;
      }

      &:focus {
        outline: none;
      }

      &:active {
        transform: scale(0.98);
      }
    }

    .other-btn {
      width: 100%;

      .btn {
        flex: 1;
        background-color: #b3d3f7;
        border: 0;
        cursor: pointer;
        padding: 0.4rem;
        border-radius: 0.2rem;

        &:active {
          transform: scale(0.98);
        }

        &:hover {
          background-color: #65a4ec;
        }
      }
    }
  }
}

/* stylelint-disable-next-line no-descending-specificity */
input:-webkit-autofill {
  box-shadow: 0 0 0 1000px #2a4e6c inset !important;
  /* stylelint-disable-next-line property-no-vendor-prefix */
  -webkit-box-shadow: 0 0 0 1000px #2a4e6c inset !important;
  -webkit-text-fill-color: #fff;
}

/* stylelint-disable-next-line selector-pseudo-class-no-unknown */
:global(.forgot-pwd-step2-item) {
  width: 5rem;
  height: 5rem;
  background-color: $theme-color;
  color: $color-black;
  border-radius: 1rem;
  text-align: center;
  user-select: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
/* stylelint-disable-next-line selector-pseudo-class-no-unknown */
:global(.forgot-pwd-step2-item:active) {
  transform: scale(0.95);
}
/* stylelint-disable-next-line selector-pseudo-class-no-unknown */
:global(.forgot-pwd-step-icon) {
  width: 1.5rem;
  height: 1.5rem;
}
</style>
