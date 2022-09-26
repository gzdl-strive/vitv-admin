<script lang="ts" setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const handleLogout = () => {
  window
    .$confirm({
      title: '提示',
      message: '是否确定退出系统？',
      showCancelButton: true,
      type: 'warning',
      confirmButtonText: '退出',
      cancelButtonText: '取消'
    })
    .then(() => {
      router.push('/login');
      ElMessage({
        type: 'success',
        message: '退出登录成功'
      });
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消退出'
      });
    });
};
</script>
<script lang="ts">
export default {
  name: 'UserInfo'
};
</script>

<template>
  <section class="flex a_center gap_half">
    <svg-icon name="avatar" width="2.2rem" height="2.2rem" circle="50%" />
    <el-dropdown>
      <span class="user-style flex a_center">
        张三
        <i-ep-arrow-down class="dropdown" />
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <i-ep-setting
      width="1.5rem"
      height="1.5rem"
      class="setting-icon"
    ></i-ep-setting>
  </section>
</template>

<style scoped lang="scss">
.user-style {
  &:hover {
    cursor: pointer;
    color: $theme-color;
  }

  .dropdown {
    margin-left: 0.3rem;
  }
}

.setting-icon {
  &:hover {
    cursor: pointer;
    color: $theme-color;
  }
}
</style>
