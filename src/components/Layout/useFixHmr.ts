import { h, VNode } from 'vue';
import { Wrapper } from './typing';

// 修复开发环境下HMT报错问题
const useFixHmr = () => {
  // 自定义name的壳的集合
  const wrapperMap = new Map();

  const wrap = (fullPath: string, component: VNode) => {
    let wrapper: Wrapper;
    if (component) {
      const wrapperName = fullPath;
      if (wrapperMap.has(wrapperName)) {
        wrapper = wrapperMap.get(wrapperName);
      } else {
        wrapper = {
          name: wrapperName,
          render() {
            return h("div", { className: "vaf-page-wrapper" }, component)
          },
        }
        wrapperMap.set(wrapperName, wrapper);
      }
      return h(wrapper);
    }
  }

  return {
    wrap
  }
}

export default useFixHmr;
