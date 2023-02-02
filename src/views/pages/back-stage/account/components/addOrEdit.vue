<script lang="ts" setup>
import { computed, onMounted, reactive } from 'vue';
import { useLoginStore } from '@/store';
import { AddOrEditAccount } from '../typing';
import { EDIT_LOGIN_INFO_ITEM, CHANGE_LOGIN_INFO } from '@/constant/module';

type Props = {
  modelValue: boolean;
  dialogData: AddOrEditAccount;
  getData: () => void;
};
const props = defineProps<Props>();
const emits = defineEmits(['update:modelValue']);

const loginStore = useLoginStore();
// 弹窗visible
const visible = computed({
  get: () => props.modelValue,
  set: (newVal: boolean) => emits('update:modelValue', newVal)
});

// 用户数据
const userData = reactive<Record<'username' | 'password', string>>({
  username: '',
  password: ''
});

onMounted(() => {
  userData.username = props.dialogData.username;
  userData.password = props.dialogData.password;
});

// 确认
const handleConfirm = () => {
  // 判空
  if (!userData.username || !userData.password) {
    window.$toast('error', '账号或密码不能为空');
    return;
  }
  // 新增
  if (props.dialogData.type === 'add') {
    loginStore[CHANGE_LOGIN_INFO](userData.username, userData.password);
    window.$toast('success', '新增成功');
    visible.value = false;
    props.getData();
  } else {
    // 编辑
    if (
      props.dialogData.username === userData.username &&
      props.dialogData.password === userData.password
    ) {
      window.$toast('warning', '账号密码未修改!');
      return;
    }
    const res = loginStore[EDIT_LOGIN_INFO_ITEM](
      {
        username: props.dialogData.username,
        password: props.dialogData.password
      },
      {
        username: userData.username,
        password: userData.password
      }
    );
    if (res && res.success) {
      window.$toast('success', res.message);
      visible.value = false;
      props.getData();
    } else {
      window.$toast('error', res.message || '修改失败');
    }
  }
};
</script>
<script lang="ts">
export default {
  name: 'AddOrEditAccount'
};
</script>

<template>
  <el-dialog
    v-model="visible"
    :title="dialogData.title"
    width="30%"
    center
    :align-center="true"
    draggable
  >
    <section class="flex a_center">
      <label style="width: 3rem">账号: </label>
      <el-input v-model="userData.username" placeholder="请输入账号" />
    </section>
    <section class="flex a_center" style="margin-top: 1rem">
      <label style="width: 3rem">密码: </label>
      <el-input v-model="userData.password" placeholder="请输入密码" />
    </section>
    <template #footer>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="handleConfirm">确定</el-button>
    </template>
  </el-dialog>
</template>
