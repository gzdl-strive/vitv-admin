import type { App } from 'vue';
import { fullScreen } from '@/utils';
import { useSettingStore } from '@/store';
import { CHANGE_FULLSCREEN } from '@/constant/module';

const vFullScreen = (app: App<Element>) => {
  const settingStore = useSettingStore();
  app.directive('fullscreen', (el: HTMLElement | Element, binding) => {
    if (binding.oldValue === undefined && binding.value === true) {
      settingStore[CHANGE_FULLSCREEN](false);
      return;
    }
    fullScreen(document.documentElement, binding.value ? 'enable' : 'cancel')
  });
  document.onfullscreenchange = () => {
    settingStore[CHANGE_FULLSCREEN](Boolean(document.fullscreenElement));
  }
};

export default vFullScreen;