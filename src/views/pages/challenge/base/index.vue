<script lang="ts" setup>
import { ref } from 'vue';
import SpeechAndDrumKit from './components/speechAndDrumKit.vue';
import FlexPanel from './components/flexPanel.vue';
import FunCanvas from './components/funCanvas.vue';

const activeName = ref<string>('SpeechAndDrum');
</script>
<script lang="ts">
export default {
  name: 'FrontEndBase'
};
</script>

<template>
  <el-card>
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane name="SpeechAndDrum">
        <template #label>
          <section class="flex a_center gap_half">
            <span>Speech & Drum Kit</span>
            <svg-icon name="drum" width="1.8rem" height="1.8rem"></svg-icon>
          </section>
        </template>
        <speech-and-drum-kit></speech-and-drum-kit>
      </el-tab-pane>
      <el-tab-pane name="FlexPanel">
        <template #label>
          <section class="flex a_center gap_half">
            <span>FlexPanel</span>
            <svg-icon name="flex" width="1.8rem" height="1.8rem"></svg-icon>
          </section>
        </template>
        <flex-panel></flex-panel>
      </el-tab-pane>
      <el-tab-pane name="FunCanvas">
        <template #label>
          <section class="flex a_center gap_half">
            <span>FunCanvas</span>
            <svg-icon name="canvas" width="1.8rem" height="1.8rem"></svg-icon>
          </section>
        </template>
        <fun-canvas></fun-canvas>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>
