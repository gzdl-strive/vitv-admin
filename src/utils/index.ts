import { FullScreenAction } from './typing';

const uuid = () => {
  return '';
}

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

const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export {
  uuid,
  fullScreen,
  capitalize
}