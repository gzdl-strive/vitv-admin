/* eslint-disable @typescript-eslint/no-explicit-any */
import { FullScreenAction } from './typing';
import { TimeoutHandle } from '@/typing';

// 唯一ID
const uuid = () => {
  return '';
}

// 全屏
const fullScreen = (element: HTMLElement, action: FullScreenAction) => {
  //检测当前浏览器是否支持直接全屏操作，若不支持则调用F11键的全屏功能
  if (typeof window.ActiveXObject !== 'undefined') {
    const wscript = new ActiveXObject('WScript.Shell');
    wscript !== null && wscript.SendKeys('{F11}');
    return;
  }
  //分别对传进来的DOM进行全屏和退出全屏操作
  let requestMethod;
  switch (action) {
    case 'enable':
      requestMethod = element.requestFullscreen;
      if (requestMethod) {
        requestMethod.call(element);
        return;
      }
      break;
    case 'cancel':
      document.fullscreenElement && document.exitFullscreen();
      return;
  }
  window.$toast('warning', '浏览器不支持全屏，请使用谷歌浏览器!')
}

// 首字母大写
const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// 防抖函数
function debounce (func: (...args: any[]) => any, delay: number) {
  let timer: TimeoutHandle | null = null;
  return function (this: any, ...args: any[]) {

    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  }
}

export {
  uuid,
  fullScreen,
  capitalize,
  debounce
}