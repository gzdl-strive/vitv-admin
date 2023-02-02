<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { ChallengeLevel, ResolveItem } from './typing';
import TypeCard from './components/typeCard.vue';
import QuestionShow from './components/questionShow.vue';
import CodeShow from './components/codeShow.vue';
import easyData from './data/easy.json';
import mediumData from './data/medium.json';
import knowledgeData from './data/knowledge.json';
import CodeResolving from './components/codeResolving.vue';

// const activeName = ref<ChallengeLevel>('warm-up');
const activeName = ref<ChallengeLevel>('medium');
// warn-up-slove-code
let code = `type HelloWorld = string // expected to be a string`;

const solveVisible = ref<boolean>(false);
const solveData = reactive<ResolveItem>({
  title: '',
  code: '',
  example: ''
});

const handleClick = (label: string, example: string, code: string) => {
  if (!example && !code) {
    window.$toast('warning', '暂无数据');
    return;
  }
  solveData.example = '';
  solveData.code = '';
  solveVisible.value = true;
  solveData.title = label;
  example && (solveData.example = example);
  code && (solveData.code = code);
};

const knowledgeContent = ref<string>('');
// 知识点
if (knowledgeData.length) {
  knowledgeContent.value = '';
  let res = '';
  knowledgeData.map(k => {
    res += `${k.order}、${k.item}\n`;
  });
  knowledgeContent.value = res;
}
</script>
<script lang="ts">
export default {
  name: 'TsChallenge'
};
</script>

<template>
  <el-card>
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane name="knowledge">
        <template #label>
          <span>知识点</span>
        </template>
        <question-show note="// 知识点" :content="knowledgeContent" />
      </el-tab-pane>
      <el-tab-pane name="warm-up">
        <template #label>
          <span>warm-up</span>
        </template>
        <type-card
          title="Hello World"
          :order="13"
          describe="Hello, World! In Type Challenges, we use the type system itself to do the assertion. For this challenge, you will need to change the following code to make the tests pass (no type check errors)."
          :is-example="true"
          color="#097c7c"
          style="width: 100%; max-width: 100%"
        >
          <template #example>
            <section class="flex column gap_one" style="margin-top: 1rem">
              <question-show
                note="// expected to be string"
                content="type HelloWorld = any;"
              />
              <code-show
                :code="code"
                language="TypeScript"
                container-cls="hljs-container"
              />
            </section>
          </template>
        </type-card>
      </el-tab-pane>
      <el-tab-pane name="easy">
        <template #label>
          <span>Easy</span>
        </template>
        <section class="container">
          <type-card
            v-for="easy in easyData"
            :key="easy.order"
            :title="easy.label"
            :order="easy.order"
            :describe="easy.describe"
            color="#7ba918"
            :style="{
              cursor: 'pointer',
              border: easy?.example && easy?.code ? '1px solid #7ba918' : ''
            }"
            @click="
              handleClick(easy.label, easy?.example || '', easy?.code || '')
            "
          />
        </section>
      </el-tab-pane>
      <el-tab-pane name="medium">
        <template #label>
          <span>Medium</span>
        </template>
        <section class="container">
          <type-card
            v-for="medium in mediumData"
            :key="medium.order"
            :title="medium.label"
            :order="medium.order"
            :describe="medium.describe"
            :style="{
              cursor: 'pointer',
              border: medium?.example && medium?.code ? '1px solid #d49228' : ''
            }"
            color="#d49228"
            @click="
              handleClick(
                medium.label,
                medium?.example || '',
                medium?.code || ''
              )
            "
          />
        </section>
      </el-tab-pane>
      <!-- <el-tab-pane name="hard">
        <template #label>
          <span>Hard</span>
        </template>
        <span>Hard</span>
      </el-tab-pane>
      <el-tab-pane name="extreme">
        <template #label>
          <span>extreme</span>
        </template>
        <span>extreme</span>
      </el-tab-pane> -->
    </el-tabs>
    <code-resolving
      v-if="solveVisible"
      v-model="solveVisible"
      :data="solveData"
    ></code-resolving>
  </el-card>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
</style>
