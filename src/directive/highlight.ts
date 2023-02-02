import type { App } from 'vue';
import './highlight.scss';

const vHighLight = (app: App<Element>) => {
  app.directive('highlight', (el: HTMLElement, binding) => {
    //获取代码片段
    const code = el.querySelector('code.hljs');
    const pre = document.querySelectorAll(`.${binding.value} pre`)[0];
    const html = code?.innerHTML;
    if (!html) return;
    const size = html.split('\n').length;

    //插入行数
    const ul = document.createElement('ul');
    for (let i = 1; i <= size; i++) {
      const li = document.createElement('li');
      li.innerText = i + '';
      ul.appendChild(li);
    }
    ul.classList.add('hljs-code-number');
    el.insertBefore(ul, pre);
  });
};

export default vHighLight;