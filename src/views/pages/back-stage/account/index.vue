<script lang="ts" setup>
import { ref, onMounted, reactive, watchEffect } from 'vue';
import { TableListOptions } from '@/components/Element-Plus/typing';
import { CommonObject } from '@/typing';
import logo from '/logo.svg?raw';
import { getAccount } from '@/api/pages/back-stage';
import AccountSearch from './components/search.vue';
import { FloatBallProps } from '@/components/FloatBall/typing';
import { defaultSetting } from '@/config/setting';
import { useUserStore, useLoginStore } from '@/store';
import { SET_LIMIT_AUTHORITY, REMOVE_LOGIN_INFO_ITEM } from '@/constant/module';
import AddOrEdit from './components/addOrEdit.vue';
import { AddOrEditAccount } from './typing';

const tableData = ref<CommonObject[]>([]);
const username = ref<string>('');
const count = ref<string>('');
const options = ref<TableListOptions[]>([]);

const userStore = useUserStore();
const loginStore = useLoginStore();

const tableOpt = reactive({
  loading: false,
  currentPage: 1,
  pageSize: 10,
  total: 0
});

// 获取表格数据
const getAccountData = async () => {
  tableOpt.loading = true;
  const res: CommonObject = await getAccount({
    username: username.value,
    count: count.value
  });
  if (res && res.code === '200') {
    tableOpt.loading = false;
    tableData.value = res.data;
    tableOpt.total = res.total;
  } else {
    window.$toast('error', '获取账号信息失败');
    tableOpt.loading = false;
    tableData.value = [];
    tableOpt.total = 0;
    return;
  }
};

//分页尺寸改变
const handleSizeChange = (val: number) => {
  tableOpt.pageSize = val;
};
const handleCurrentChange = (val: number) => {
  tableOpt.currentPage = val;
};

// 查询
const handleSearch = () => {
  getAccountData();
};

onMounted(() => {
  // 初始化options
  options.value = [
    {
      label: '账号',
      prop: 'username',
      align: 'center'
    },
    {
      label: '密码',
      prop: 'password',
      align: 'center'
    },
    {
      label: '使用频率',
      prop: 'count',
      align: 'center',
      width: 200
    },
    {
      label: '创建时间',
      prop: 'createTime',
      align: 'center'
    }
  ];
  getAccountData();
});

watchEffect(() => {
  if (userStore.limitOfAuthority > 2) {
    options.value.push({
      label: '操作',
      prop: 'action',
      align: 'center',
      action: true,
      width: 200
    });
  }
});

// 悬浮球
const floatball = reactive<FloatBallProps>({
  num: defaultSetting.DEVELOPMENT_PROCESS,
  style: {
    width: '6rem',
    height: '6rem',
    transform: 'translateY(-50%)'
  },
  list: [
    {
      id: '001',
      label: '提升权限',
      disabled: userStore.limitOfAuthority !== 2,
      onClick: () => {
        console.log('aaa');
        const reg = new RegExp(defaultSetting.REGISTER_ADMIN_PWD);
        window
          .$confirm({
            boxType: 'prompt',
            title: '提示',
            message: '当前是否提升当前用户权限至管理员权限？',
            showInput: true,
            inputPattern: reg,
            inputPlaceholder: '请输入管理员密码!',
            inputErrorMessage: '管理员密码错误',
            showCancelButton: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          })
          .then(() => {
            userStore[SET_LIMIT_AUTHORITY](3);
            window.$toast('success', '提升成功!');
          })
          .catch(() => {
            window.$toast('info', '取消提升!');
          });
      }
    }
  ]
});

// 新增/编辑弹窗visible
const dialogVisible = ref<boolean>(false);
const dialogData = reactive<AddOrEditAccount>({
  title: '新增',
  type: 'add',
  username: '',
  password: ''
});

// 编辑
const handleEdit = (row: CommonObject) => {
  dialogVisible.value = true;
  dialogData.title = '编辑';
  dialogData.type = 'edit';
  dialogData.username = row.username;
  dialogData.password = row.password;
};

// 删除
const handleDelete = (row: CommonObject) => {
  // 不能删除当前登录的账号
  if (row.username === userStore.username) {
    window.$toast('error', '当前登录账号不可删除!');
    return;
  }
  loginStore[REMOVE_LOGIN_INFO_ITEM](row.username);
  window.$toast('success', `${row.username}移除成功!`);
  getAccountData();
};

// 新增
const handleAdd = () => {
  dialogVisible.value = true;
  dialogData.title = '新增';
  dialogData.type = 'add';
  dialogData.username = '';
  dialogData.password = '';
};
</script>
<script lang="ts">
export default {
  name: 'AccountManage'
};
</script>

<template>
  <section>
    <account-search
      v-model:username="username"
      v-model:count="count"
      @handle-search="handleSearch"
      @handle-add="handleAdd"
    ></account-search>
    <el-card style="margin-top: 1rem">
      <template #header>
        <section class="flex j_between">
          <span>账号信息</span>
        </section>
      </template>
      <table-list
        :data="tableData"
        :options="options"
        :loading="tableOpt.loading"
        :border="true"
        size="small"
        stripe
        element-loading-text="加载中..."
        :element-loading-svg="logo"
        element-loading-svg-view-box="0, 0, 130, 130"
        element-loading-background="rgba(122, 122, 122, 0.8)"
        is-pagination
        :page-sizes="[5, 10, 20]"
        :total="tableOpt.total"
        :page-size="tableOpt.pageSize"
        :current-page="tableOpt.currentPage"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
        <template #action="{ scope }">
          <el-button type="primary" size="small" @click="handleEdit(scope.row)"
            >编辑</el-button
          >
          <el-popconfirm
            title="确定删除?"
            icon-color="red"
            @confirm="handleDelete(scope.row)"
          >
            <template #reference>
              <el-button type="danger" size="small">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </table-list>
    </el-card>
    <add-or-edit
      v-if="dialogVisible"
      v-model="dialogVisible"
      :dialog-data="dialogData"
      :get-data="getAccountData"
    ></add-or-edit>
    <float-ball
      v-if="userStore.limitOfAuthority >= 2"
      :style="floatball.style"
      :list="floatball.list"
      :num="floatball.num"
    ></float-ball>
  </section>
</template>
