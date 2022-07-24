import { createApp } from 'vue';
import { createPinia } from 'pinia'; // pinia
import piniaPluginPersist from 'pinia-plugin-persist'; // pinia可持久化插件
import ElementPlus from 'element-plus';
import locale from 'element-plus/lib/locale/lang/zh-cn'; // UI组件中文包
import 'element-plus/dist/index.css'; // UI组件样式全局引入
import App from './App.vue';
import './style/index.scss'; // 引入全局样式文件
import router from './router'; // 引入vue-router
import GlobalComponents from '@/components'; // 全局组件
import { ShowMessage, ThemeColor } from '@/plugins'; // 引入自定义插件
import 'animate.css'; // 引入animate.css

const pinia = createPinia();
pinia.use(piniaPluginPersist);

const app = createApp(App);

app
  .use(pinia)
  .use(router)
  .use(ShowMessage)
  .use(ThemeColor)
  .use(ElementPlus, { locale })
  .use(GlobalComponents)
  .mount('#app');
