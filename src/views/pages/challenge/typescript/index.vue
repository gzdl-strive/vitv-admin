<script lang="ts" setup>
import { ref } from 'vue';
import { ChallengeLevel } from './typing';
import TypeCard from './components/typeCard.vue';
import QuestionShow from './components/questionShow.vue';
import CodeShow from './components/codeShow.vue';
import easyData from './data/easy.json';
import mediumData from './data/medium.json';

const activeName = ref<ChallengeLevel>('warm-up');

let code = `type HelloWorld = string // expected to be a string`;
</script>
<script lang="ts">
export default {
  name: 'TsChallenge'
};
</script>

<template>
  <el-card>
    <el-tabs v-model="activeName" type="card">
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
              <code-show :code="code" language="TypeScript" />
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
            color="#d49228"
          />
        </section>
      </el-tab-pane>
      <el-tab-pane name="hard">
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
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
</style>
