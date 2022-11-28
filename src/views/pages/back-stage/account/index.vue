<script lang="ts" setup>
import { ref, onMounted, reactive } from 'vue';
import { TableListOptions } from '@/components/Element-Plus/typing';
import { CommonObject } from '@/typing';
import logo from '/logo.svg?raw';
import { getAccount } from '@/api/pages/back-stage';
import AccountSearch from './search.vue';

const tableData = ref<CommonObject[]>([]);
const username = ref<string>('');
const count = ref<string>('');
const options: TableListOptions[] = [
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
  },
  {
    label: '操作',
    prop: 'action',
    align: 'center',
    action: true,
    width: 200
  }
];
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
  getAccountData();
});
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
    ></account-search>
    <el-card header="账号信息" style="margin-top: 1rem">
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
        <template #action>
          <span>操作项</span>
        </template>
      </table-list>
    </el-card>
  </section>
</template>
