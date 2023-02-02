<script lang="ts" setup>
import { computed } from 'vue';
import { defaultSetting } from '@/config/setting';
import { useUserStore } from '@/store';
import {
  CHANGE_USERNAME,
  CHANGE_AVATAR,
  CHANGEPERSONALSIGNATURE,
  CHANGE_CITY
} from '@/constant/module';
import { AVATAR } from '@/config/typing';

type Props = {
  modelValue: boolean;
};
const props = defineProps<Props>();
const emits = defineEmits(['update:modelValue']);

const userStore = useUserStore();
// 弹窗visible
const visible = computed<boolean>({
  get: () => props.modelValue,
  set: (newVal: boolean) => emits('update:modelValue', newVal)
});
// 用户名
const username = computed<string>({
  get: () => userStore.username,
  set: (newName: string) => {
    userStore[CHANGE_USERNAME](newName, userStore.username, true);
  }
});

const handleAvatar = (avatar: AVATAR) => {
  if (avatar.icon === userStore.avatar) return;
  userStore[CHANGE_AVATAR](avatar.icon);
};
// 个性签名
const signature = computed<string>({
  get: () => userStore.personalSignature,
  set: (newSign: string) => userStore[CHANGEPERSONALSIGNATURE](newSign)
});

// 城市
const city = computed({
  get: () => userStore.baseCity,
  set: (newVal: string) => {
    userStore[CHANGE_CITY](newVal);
  }
});

// 权限
const limit = computed(() => {
  const levelCheck = (level: number): boolean =>
    userStore.limitOfAuthority >= level ? false : true;
  return {
    username: levelCheck(defaultSetting.USER_PANNEL_LIMIT.USERNAME),
    avatar: levelCheck(defaultSetting.USER_PANNEL_LIMIT.AVATAR),
    signature: levelCheck(defaultSetting.USER_PANNEL_LIMIT.SIGNATURE),
    city: levelCheck(defaultSetting.USER_PANNEL_LIMIT.CITY)
  };
});
</script>
<script lang="ts">
export default {
  name: 'UserPane'
};
</script>

<template>
  <div class="user-pane">
    <el-drawer v-model="visible" :size="300" direction="ltr" title="用户面板">
      <el-divider content-position="left">
        <section class="flex a_center gap_half"><i-ep-user />用户名</section>
      </el-divider>
      <el-input
        v-model="username"
        :disabled="limit.username"
        placeholder="请输入用户名"
      />
      <el-divider content-position="center">
        <section class="flex a_center gap_half"><i-ep-avatar />头像</section>
      </el-divider>
      <section class="flex wrap gap_half">
        <svg-icon
          v-for="avatar in defaultSetting.AVATAR_LIST"
          :key="avatar.name"
          :name="avatar.icon"
          width="4rem"
          height="4rem"
          class="avatar-item"
          :circle="avatar.icon === userStore.avatar ? '50%' : '0%'"
          :style="{ 'pointer-events': limit.avatar ? 'none' : '' }"
          @click="handleAvatar(avatar)"
        ></svg-icon>
      </section>
      <el-divider content-position="right">
        <section class="flex a_center gap_half">
          <i-ep-edit-pen />个性签名
        </section>
      </el-divider>
      <el-input
        v-model="signature"
        placeholder="个性签名"
        type="textarea"
        :disabled="limit.signature"
        :autosize="{ minRows: 2, maxRows: 4 }"
      />
      <el-divider content-position="left">
        <section class="flex a_center gap_half">
          <i-ep-location-filled />城市
        </section>
      </el-divider>
      <el-input
        v-model="city"
        :disabled="limit.city"
        placeholder="请输入城市"
      />
    </el-drawer>
  </div>
</template>

<style scoped lang="scss">
/* stylelint-disable selector-class-pattern */
.user-pane {
  overflow: hidden;

  &:deep(.el-drawer) {
    background-color: #fff;
  }

  &:deep(.el-drawer__header) {
    height: 3.6rem;
    margin-bottom: 0;
    padding: 0;
  }

  &:deep(.el-drawer__header > :first-child) {
    font-size: 1.1rem;
    margin-left: 1.2rem;
  }

  &:deep(.el-drawer__close-btn) {
    height: 100%;
    width: 3.6rem;
  }

  &:deep(.el-drawer__close) {
    width: 3.6rem;
    height: 100%;
    font-size: 1.3rem;
  }

  &:deep(.el-drawer__body) {
    padding-top: 0.8rem;
  }

  .avatar-item {
    flex: 22%;
    background-color: transparent;
    transition: all 0.3s ease-out;

    &:hover {
      box-shadow: $theme-color 0 1px 30px;
    }
  }
}
</style>
