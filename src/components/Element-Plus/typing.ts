import type { Component } from 'vue';

export interface ComponentOption {
  name: string;
  component: Component;
}

type ColumnAlign = 'left' | 'center' | 'right';
export type PaginationAlign = ColumnAlign;

// 表格配置Options
export interface TableListOptions {
  label: string; // 表头
  prop: string; // 字段名称
  width?: string | number; // 表格列宽度
  align?: ColumnAlign; // 对齐方式
  slot?: string; // 自定义列表模板名称
  action?: boolean; // 是否为操作项
  fixed?: string; // 是否为固定列
}