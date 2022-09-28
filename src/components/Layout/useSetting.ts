import { computed, provide } from 'vue';
import { useSettingStore } from '@/store';
import { CHANGE_NAV_EXPAND } from '@/constant/module';
import { NavChange } from './typing';

const useSetting = () => {
  const settingStore = useSettingStore();

  const isCollapse = computed(() => settingStore.collapse);

  const changeCollapse: NavChange = (val: boolean) => {
    settingStore[CHANGE_NAV_EXPAND](val);
  };

  // const changeFullscreen: NavChange = (val: boolean) => {
  //   settingStore[CHANGE_FULLSCREEN](val);
  // }

  const fullScreen = computed(() => settingStore.fullScreen);

  provide('nav-collapse', changeCollapse);

  return {
    isCollapse,
    fullScreen
  }
};

export default useSetting;