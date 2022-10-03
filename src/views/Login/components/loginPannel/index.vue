<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useLoginStore } from '@/store';
import { CHANGE_REMEBER } from '@/constant/module';

type Props = {
  changeLoginStatus: () => void;
};

defineProps<Props>();

const loginStore = useLoginStore();

const username = ref<string>('');
// 用于解决浏览器自动填充问题
const readonlyFlag = ref<boolean>(true);
const password = ref<string>('');

const remeberMe = computed({
  get: () => loginStore.remeberMe,
  set: (status: boolean) => loginStore[CHANGE_REMEBER](status)
});

const handleSubmit = () => {
  console.log(username.value, password.value);
  return false;
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
      <svg-icon name="logo" width="2.4rem" height="2.4rem"></svg-icon>
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
            <a>忘记密码?</a>
          </section>
        </section>
        <button type="submit" class="submit-btn">登录</button>
      </form>
      <footer class="other-btn flex gap_half">
        <button class="btn" @click="changeLoginStatus">注册</button>
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
      background-color: #07d8c7;
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
