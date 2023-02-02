<script lang="ts" setup>
import config from '../../../../../package.json';
import { map2List } from '@/utils';

// 项目信息
const projectInfoList = [
  {
    id: 'name',
    label: '项目名称',
    value: config.name
  },
  {
    id: 'version',
    label: '当前版本号',
    value: config.version
  },
  {
    id: 'author',
    label: '项目作者',
    value: config.author
  },
  {
    id: 'project_address',
    label: '项目地址',
    value: 'https://github.com/gzdl-strive/vitv-admin'
  }
];
const InstructionAndDepList = [
  {
    id: '001',
    label: '脚本信息',
    value: map2List(config.scripts)
  },
  {
    id: '002',
    label: '开发环境依赖',
    value: map2List(config.devDependencies)
  },
  {
    id: '003',
    label: '生产环境依赖',
    value: map2List(config.dependencies)
  }
];
</script>
<script lang="ts">
export default {
  name: 'SystemInfo'
};
</script>

<template>
  <section class="flex column gap_one">
    <el-card shadow="hover">
      <el-descriptions
        title="项目信息"
        direction="vertical"
        :column="projectInfoList.length"
        border
      >
        <el-descriptions-item
          v-for="projectInfo in projectInfoList"
          :key="projectInfo.id"
          align="center"
          :label="projectInfo.label"
        >
          <el-tag v-if="projectInfo.id === 'version'" type="success">
            {{ projectInfo.value }}
          </el-tag>
          <a
            v-else-if="projectInfo.id === 'project_address'"
            :href="projectInfo.value"
            >{{ projectInfo.value }}</a
          >
          <span v-else>{{ projectInfo.value }}</span>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
    <el-card
      v-for="instructionAndDep in InstructionAndDepList"
      :key="instructionAndDep.id"
      shadow="hover"
    >
      <el-descriptions
        :title="instructionAndDep.label"
        direction="vertical"
        :column="6"
        border
      >
        <el-descriptions-item
          v-for="item in instructionAndDep.value"
          :key="item.name"
          align="center"
          :label="item.name"
        >
          <span>{{ item.value }}</span>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
  </section>
</template>
