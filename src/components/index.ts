import { App } from 'vue';
import Contextmenu from './Contextmenu';
import ScorePanel from './ScorePanel';
import FloatBall from './FloatBall';
import ElementPlusComponent from './Element-Plus';

type Commons = {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: any;
  register?: () => void
}

const commons: Commons[] = [
  {
    name: 'context-menu',
    component: Contextmenu,
    register: () => {
      //创建根节点
      const rootNode = document.createElement('div');
      rootNode.id = 'contextmenu';
      document.body.appendChild(rootNode);
    }
  },
  {
    name: 'score-panel',
    component: ScorePanel,
    register: () => {
      //创建根节点
      const rootNode = document.createElement('div');
      rootNode.id = 'scorepanel';
      document.body.appendChild(rootNode);
    }
  },
  {
    name: 'float-ball',
    component: FloatBall,
    register: () => {
      //创建根节点
      const rootNode = document.createElement('div');
      rootNode.id = 'floatball';
      document.body.appendChild(rootNode);
    }
  },
  ...ElementPlusComponent
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