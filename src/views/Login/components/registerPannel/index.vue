<script lang="ts" setup>
import { ref, watch, computed } from 'vue';
import PwdIntensity from './intensity.vue';
import { PwdIntensityLevel } from './typing';
import { CHANGE_LOGIN_INFO } from '@/constant/module';
import { LoginInfoItem } from '@/store/module/typing';
import { defaultSetting } from '@/config/setting';

type Props = {
  changeLoginStatus: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  loginStore: any;
};

const props = defineProps<Props>();

const username = ref<string>('');
// 用于解决浏览器自动填充问题
const readonlyFlag = ref<boolean>(true);
const password = ref<string>('');
const passwordShow = ref<boolean>(false);
const confirmPwd = ref<string>('');
const confirmPwdShow = ref<boolean>(false);

// 密码强度
const pwd_level = ref<PwdIntensityLevel[]>([]);

// 校验密码强度
const checkIntensity = () => {
  pwd_level.value = [];
  const value = password.value;
  // 校验是数字
  const regex1 = /^\d+$/;
  // 校验字母
  const regex2 = /^[A-Za-z]+$/;
  // 校验符号
  const regex3 =
    /^[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、]+$/;
  if (regex1.test(value)) {
    pwd_level.value.push('low');
  } else if (regex2.test(value)) {
    pwd_level.value.push('low');
  } else if (regex3.test(value)) {
    pwd_level.value.push('low');
  } else if (/^[A-Za-z\d]+$/.test(value)) {
    pwd_level.value.push('low');
    pwd_level.value.push('middle');
  } else if (
    /^[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、\d]+$/.test(
      value
    )
  ) {
    pwd_level.value.push('low');
    pwd_level.value.push('middle');
  } else if (
    /^[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、A-Za-z]+$/.test(
      value
    )
  ) {
    pwd_level.value.push('low');
    pwd_level.value.push('middle');
  } else if (
    /^[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、A-Za-z\d]+$/.test(
      value
    )
  ) {
    if (value.length <= 6) {
      pwd_level.value.push('low');
      pwd_level.value.push('middle');
      pwd_level.value.push('high');
    } else {
      pwd_level.value.push('low');
      pwd_level.value.push('middle');
      pwd_level.value.push('high');
      pwd_level.value.push('very-high');
    }
  }
};

// 标志位——用于判断密码和确认密码是否一致
const confirmFlag = computed<boolean>(() => {
  if (!confirmPwd.value) return false;
  return password.value !== confirmPwd.value;
});

watch(
  () => password.value,
  () => {
    checkIntensity();
  }
);

const handleSubmit = () => {
  if (confirmFlag.value) {
    window.$toast('error', '两次密码输入不一致，请确认!');
    return;
  }
  // 先判断是否已经存在
  const loginInfoList = props.loginStore.loginInfo;
  if (!loginInfoList.length) {
    // 直接将当前用户名，密码推入即可
    props.loginStore[CHANGE_LOGIN_INFO](username.value, password.value);
    props.changeLoginStatus();
  } else {
    // 如果存在已注册过的账号信息，需要判断当前新增加的是否和之前的一致
    const index = loginInfoList.findIndex(
      (info: LoginInfoItem) => info.username === username.value
    );
    if (index === -1) {
      // 没找到，直接加入
      props.loginStore[CHANGE_LOGIN_INFO](username.value, password.value);
      props.changeLoginStatus();
    } else {
      // 找到之前存在过的账号信息，如果账号密码相同，则不变
      // 如果账号密码不相同，则弹窗是否需要更新密码
      const reg = new RegExp(defaultSetting.REGISTER_ADMIN_PWD);
      if (loginInfoList[index].password !== password.value) {
        window
          .$confirm({
            boxType: 'prompt',
            title: '提示',
            message: '当前注册的用户名之前已存在，是否更新为当前密码？',
            showInput: true,
            inputPattern: reg,
            inputPlaceholder: '请输入管理员密码!',
            inputErrorMessage: '管理员密码错误',
            showCancelButton: true,
            confirmButtonText: '更新',
            cancelButtonText: '取消'
          })
          .then(() => {
            props.loginStore[CHANGE_LOGIN_INFO](username.value, password.value);
            props.changeLoginStatus();
          })
          .catch(() => {
            window.$toast('info', '取消更新!');
          });
      } else {
        window.$toast('info', '该账号密码已存在!');
      }
    }
  }
};
</script>
<script lang="ts">
export default {
  name: 'RegisterPannel'
};
</script>

<template>
  <div class="login-pannel flex column gap_half a_center">
    <header class="pannel-header flex a_center gap_half">
      <svg-icon name="logo" width="2.4rem" height="2.4rem"></svg-icon>
      <span>Vitv-Admin</span>
    </header>
    <section class="pannel-main flex column a_center gap_one">
      <h1>注册</h1>
      <form @submit.prevent="handleSubmit">
        <div class="form-controls">
          <input
            v-model="username"
            placeholder="账号"
            :readonly="readonlyFlag"
            type="text"
            required
            @focus="readonlyFlag = false"
          />
        </div>
        <div class="form-controls">
          <input
            v-model="password"
            placeholder="密码"
            :type="passwordShow ? 'text' : 'password'"
            required
          />
          <i-ep-view
            v-if="passwordShow"
            class="show-or-hide"
            @click="passwordShow = !passwordShow"
          ></i-ep-view>
          <i-ep-hide
            v-else
            class="show-or-hide"
            @click="passwordShow = !passwordShow"
          ></i-ep-hide>
        </div>
        <div class="intensity">
          <span>密码强度</span>
          <pwd-intensity :level="pwd_level"></pwd-intensity>
        </div>
        <div class="form-controls">
          <input
            v-model="confirmPwd"
            placeholder="确认密码"
            :type="confirmPwdShow ? 'text' : 'password'"
            required
          />
          <i-ep-view
            v-if="confirmPwdShow"
            class="show-or-hide"
            @click="confirmPwdShow = !confirmPwdShow"
          ></i-ep-view>
          <i-ep-hide
            v-else
            class="show-or-hide"
            @click="confirmPwdShow = !confirmPwdShow"
          ></i-ep-hide>
        </div>
        <p v-show="confirmFlag" class="confirm-tip">两次密码输入不一致</p>
        <button type="submit" class="submit-btn">注册</button>
      </form>
      <footer class="other-btn flex gap_half">
        <button class="btn" @click="changeLoginStatus">回到登录</button>
        <button class="btn">游客登录</button>
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
      margin: 1rem 0 1.5rem;
      position: relative;

      input {
        background-color: transparent;
        outline: none;
        border: 0;
        border-bottom: 2px solid #fff;
        width: 100%;
        padding: 0.5rem 0;
        font-size: 1.2rem;
        color: #fff;

        &:focus,
        &:valid {
          outline: 0;
          border-bottom-color: lightblue;
        }

        &::placeholder {
          color: rgba(177 201 216 / 80%);
        }
      }

      .show-or-hide {
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
        cursor: pointer;
        user-select: none;

        &:hover {
          color: $theme-color;
        }
      }
    }

    .confirm-tip {
      margin: -1.2rem 0 1rem;
      color: $color-danger;
    }

    .intensity {
      color: rgba(177 201 216 / 80%);
      margin: -0.5rem 0;
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
        background-color: #466dcf;
        color: rgba(255 255 255 / 80%);
        border: 0;
        cursor: pointer;
        padding: 0.4rem;
        border-radius: 4px;

        &:hover {
          background-color: #0a46e4;
          border-color: #0a46e4;
        }

        &:active {
          transform: scale(0.98);
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
</style>
