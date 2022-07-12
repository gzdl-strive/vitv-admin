import { App } from 'vue';
import SvgIcon from './SvgIcon/index.vue';
import { Commons } from './typing';

const commons: Commons[] = [
  {
    name: 'svg-icon',
    component: SvgIcon
  }
];

// 全局组件
export default {
  install: (app: App<Element>) => {
    commons.map(common => {
      app.component(common.name, common.component);
      common.register && common.register();
    })
  }
}