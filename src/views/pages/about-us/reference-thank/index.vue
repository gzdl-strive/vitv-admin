<script lang="ts" setup>
import referenceList from './data.json';
import { reg } from '@/utils';
import useCopy from '@/hooks/useCopy';

// import.meta.glob => 批量导入
const iconFilterList = ['logo'];
const iconList = Object.keys(import.meta.glob('@/assets/*/*.svg'))
  .map(key => {
    const name = key.replace(reg.getFileNameReg(), '$2');
    return name;
  })
  .filter(icon => {
    return iconFilterList.indexOf(icon) === -1;
  });
</script>
<script lang="ts">
export default {
  name: 'ReferenceAndThank'
};
</script>

<template>
  <section class="thank-container flex column gap_one">
    <el-card shadow="hover">
      <el-descriptions title="参考模板/项目" :column="1" border>
        <el-descriptions-item
          v-for="codeRef in referenceList.codeReferenceList"
          :key="codeRef.id"
          :label="codeRef.name"
          class="code-ref-container"
        >
          <section class="flex">
            <a
              class="code-link"
              :href="codeRef.address"
              target="_blank"
              style="flex: 1; text-align: center"
            >
              GitHub: {{ codeRef.address }}
            </a>
            <a
              class="code-link"
              :href="codeRef.homePage"
              target="_blank"
              style="flex: 1; text-align: center"
            >
              系统地址: {{ codeRef.homePage }}
            </a>
          </section>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
    <el-row :gutter="16">
      <el-col :span="14">
        <el-card shadow="hover">
          <template #header>
            <section class="flex j_between">
              <span>库引用</span>
            </section>
          </template>
          <el-table
            :data="referenceList.packageReferenceList"
            class="reference-table"
          >
            <el-table-column prop="name" label="name" width="120" />
            <el-table-column prop="describe" label="描述" />
            <el-table-column prop="address" label="地址" />
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="10">
        <el-card shadow="hover">
          <template #header>
            <section class="flex j_between">
              <span>图标引用</span>
            </section>
          </template>
          <section class="icon-list">
            <template v-for="icon in iconList" :key="icon">
              <el-tooltip :content="icon" placement="top-start">
                <svg-icon
                  :title="icon"
                  :name="icon"
                  width="3rem"
                  height="3rem"
                  class="icon"
                  @click="useCopy(`${icon}`, $event)"
                ></svg-icon>
              </el-tooltip>
            </template>
          </section>
          <p>
            以上图标来自于<a
              href="https://www.iconfont.cn/"
              style="margin-left: 0.5rem"
              >iconfont</a
            >
          </p>
        </el-card>
      </el-col>
    </el-row>
    <el-card shadow="hover">
      <el-descriptions title="其他来源" :column="4" direction="vertical" border>
        <el-descriptions-item label="登录页房子模型" align="center">
          My Room In 3D
        </el-descriptions-item>
        <el-descriptions-item label="系统介绍页背景" align="center">
          <a href="https://threejs-journey.com/" target="_blank"
            >three.js journey</a
          >
        </el-descriptions-item>
        <el-descriptions-item label="作者" align="center">
          Bruno Simon
        </el-descriptions-item>
        <el-descriptions-item label="GitHub" align="center">
          <a href="https://github.com/brunosimon" target="_blank">
            https://github.com/brunosimon
          </a>
        </el-descriptions-item>
        <el-descriptions-item label="基础挑战" align="center">
          <a href="https://github.com/wesbos/JavaScript30" target="_blank"
            >JavaScript30</a
          >
        </el-descriptions-item>
        <el-descriptions-item label="TS类型挑战" align="center">
          <a
            href="https://github.com/type-challenges/type-challenges"
            target="_blank"
            >Type-Challenges</a
          >
        </el-descriptions-item>
        <el-descriptions-item label="Blender模型合集" align="center">
          <a
            href="https://www.bilibili.com/video/BV1US4y1N7xN/?p=1"
            target="_blank"
          >
            新手建模
          </a>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
    <p style="text-align: center">
      本项目为个人所有，非商业所用，如有侵权，请留言删除【联系方式-掘金账号：
      <a
        href="https://juejin.cn/user/1636517801628782"
        target="_blank"
        class="contact"
      >
        柜子动了
      </a>
      】!
    </p>
  </section>
</template>

<style scoped lang="scss">
.thank-container {
  .code-ref-container {
    padding: 0 2rem;
  }

  .reference-table {
    &:deep(.cell) {
      text-align: center;
    }
  }

  .icon-list {
    width: 100%;
    height: 21.8rem;
    overflow-y: scroll;
    margin-bottom: 1rem;

    .icon {
      width: 10%;
      margin: 1.3rem 0.5rem 0 0;
    }
  }

  .contact {
    color: $color-primary;

    &:hover {
      color: $theme-color;
    }
  }
}
</style>
