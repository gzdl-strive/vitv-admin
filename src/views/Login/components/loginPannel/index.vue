<script lang="ts" setup></script>
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
      <h1>Please Login</h1>
      <form>
        <div class="form-controls">
          <input id="Email" type="text" />
          <label for="Email">Email</label>
        </div>
        <div class="form-controls">
          <input type="password" name="password" />
          <label for="password">Password</label>
        </div>
        <button class="submit-btn">Login</button>
      </form>
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
      font-size: 1.8rem;
    }
  }

  .pannel-main {
    border-radius: 1rem;
    padding: 3rem;
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

      &:focus + label {
        transform: translateY(-2rem);
        transition: all 0.5s ease-out;
      }

      &:valid + label {
        transform: translateY(-2rem);
        transition: all 0.5s ease-out;
      }
    }

    /* stylelint-disable-next-line no-descending-specificity */
    .form-controls label {
      position: absolute;
      top: 1rem;
      left: 0;
      pointer-events: none;
    }

    .submit-btn {
      width: 93%;
      background-color: #add8e6;
      border: 0;
      cursor: pointer;
      padding: 0.5rem;
      border-radius: 0.2rem;
    }

    .submit-btn:focus {
      outline: none;
    }

    .submit-btn:active {
      transform: scale(0.98);
    }
  }
}

/* stylelint-disable-next-line no-descending-specificity */
input:-webkit-autofill {
  /* -webkit-box-shadow: 0 0 0 1000px #2a4e6c inset !important; */
  -webkit-text-fill-color: #fff;
}
</style>
