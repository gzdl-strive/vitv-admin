<script lang="ts" setup>
import { PropType, computed } from 'vue';
import { TableListOptions, PaginationAlign } from '../typing';
import { CommonObject } from '@/typing';
import { handleNullData } from '@/utils';

const props = defineProps({
  options: {
    type: Array as PropType<TableListOptions[]>,
    required: true
  },
  data: {
    type: Array as PropType<CommonObject[]>,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  },
  // 加载文案
  elementLoadingText: {
    type: String,
    default: '加载中'
  },
  // 自定义加载图标
  elementLoadingSpinner: {
    type: String,
    default: ''
  },
  elementLoadingSvg: {
    type: String,
    default: ''
  },
  elementLoadingSvgViewBox: {
    type: String,
    default: ''
  },
  // 背景遮罩的颜色
  elementLoadingBackground: {
    type: String,
    default: ''
  },
  // 是否分页
  isPagination: {
    type: Boolean,
    default: false
  },
  // 分页对齐方式
  paginationAlign: {
    type: String as PropType<PaginationAlign>,
    default: 'right'
  },
  //当前页
  currentPage: {
    type: Number,
    default: 1
  },
  //存放一页显示多少条数据的数组，例如：[10, 20, 30, 40]
  pageSizes: {
    type: Array as PropType<number[]>,
    default: () => [10, 20, 50, 100]
  },
  //一页显示多少条数据
  pageSize: {
    type: Number,
    default: 10
  },
  //总条数
  total: {
    type: Number,
    default: 0
  }
});
const emits = defineEmits(['sizeChange', 'currentChange']);

// 过滤掉操作选项
const tableOptions = computed(() => {
  return props.options.filter(option => !option.action);
});

// 操作项
const actionOption = computed(() => {
  return props.options.find(option => option.action);
});

// 分页对齐方式
const paginationALignJustify = computed(() => {
  if (props.paginationAlign === 'left') return 'flex-start';
  else if (props.paginationAlign === 'center') return 'center';
  else return 'flex-end';
});

const handleSizeChange = (val: number) => {
  emits('sizeChange', val);
};

const handleCurrentChange = (val: number) => {
  emits('currentChange', val);
};
</script>
<script lang="ts">
export default {
  name: 'TableList'
};
</script>

<template>
  <div>
    <!-- $attrs: 透传attributes的对象，由父组件传入，且子组件中声明为props或组件自定义事件的attributes和事件处理函数 -->
    <el-table
      v-loading="loading"
      v-bind="$attrs"
      :data="data"
      :element-loading-text="elementLoadingText"
      :element-loading-background="elementLoadingBackground"
      :element-loading-spinner="elementLoadingSpinner"
      :element-loading-svg="elementLoadingSvg"
      :element-loading-svg-view-box="elementLoadingSvgViewBox"
    >
      <!-- 遍历非操作项 -->
      <template v-for="col in tableOptions" :key="col.label">
        <el-table-column
          :label="col.label"
          :prop="col.prop"
          :width="col.width"
          :align="col.align"
          :fixed="col.fixed"
        >
          <template #default="scope">
            <!-- 如果配置项中配置了插槽，就显示插槽中的内容 -->
            <slot v-if="col.slot" :name="col.slot" :scope="scope"></slot>
            <!-- 否则使用默认显示 -->
            <div v-else class="ellipsis-one">
              <el-tooltip placement="left">
                <template #content>
                  <div
                    v-if="(handleNullData(scope.row[col.prop!]) + '').length > 20"
                    style="width: 14rem; white-space: pre-wrap"
                  >
                    {{ handleNullData(scope.row[col.prop!]) + '' }}
                  </div>
                  <span v-else>
                    {{ handleNullData(scope.row[col.prop!]) + '' }}
                  </span>
                </template>
                {{ handleNullData(scope.row[col.prop]) }}
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
      </template>
      <!-- 单独提取操作项 -->
      <!-- 这里不单独提取也没事，因为后续可能会对操作进行扩展，所以这里提取出来 -->
      <el-table-column
        v-if="actionOption"
        :label="actionOption.label"
        :prop="actionOption.prop"
        :width="actionOption.width"
        :fixed="actionOption.fixed"
        :align="actionOption.align"
      >
        <template #default="scope">
          <slot name="action" :scope="scope"></slot>
        </template>
      </el-table-column>
    </el-table>
    <footer
      v-if="isPagination"
      class="flex a_center"
      :style="{ justifyContent: paginationALignJustify, marginTop: '1rem' }"
    >
      <el-pagination
        :current-page="currentPage"
        :page-size="pageSize"
        :page-sizes="pageSizes"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </footer>
  </div>
</template>

<style scoped lang="scss">
/* 表头字体变为纯黑 */
/* stylelint-disable-next-line selector-class-pattern */
:deep(.el-table th.el-table__cell > .cell) {
  color: #000;
  padding: 0.2rem;
}
</style>
