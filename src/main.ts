import { createApp } from 'vue';
import App from './App.vue';
import './style/index.scss'; // 引入全局样式文件
import router from './router';

const app = createApp(App);

app
  .use(router)
  .mount('#app');
