<script lang="ts" setup>
import { ref, watch } from 'vue';
import PwdIntensity from './intensity.vue';
import { PwdIntensityLevel } from './typing';

type Props = {
  changeLoginStatus: () => void;
};

defineProps<Props>();

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

watch(
  () => password.value,
  () => {
    checkIntensity();
  }
);

const handleSubmit = () => {
  console.log(username.value, password.value);
  return false;
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
            placeholder="密码"
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
        <button
          type="submit"
          class="submit-btn"
          @click="passwordShow = !passwordShow"
        >
          注册
        </button>
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
      background-color: #add8e6;
      border: 0;
      cursor: pointer;
      padding: 0.6rem;
      border-radius: 0.2rem;
      font-size: 1.1rem;
    }

    .submit-btn:focus {
      outline: none;
    }

    .submit-btn:active {
      transform: scale(0.98);
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
