import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersist from 'pinia-plugin-persist';
import router from '@/router';
import App from './App.vue';
import './style/index.scss'; // 引入全局样式文件
import MessageTip from '@/plugins/message';
import ThemeName from './plugins/theme';
import directive from './directive';
import GlobalComponents from '@/components'; // 全局组件
import 'animate.css';

const pinia = createPinia();
pinia.use(piniaPluginPersist);

const app = createApp(App);
app
  .use(pinia)
  .use(router)
  .use(directive)
  .use(GlobalComponents)
  .use(MessageTip)
  .use(ThemeName)
  .mount('#app');