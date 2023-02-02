import { computed, provide, ref } from 'vue';
import { useSettingStore } from '@/store';
import { CHANGE_NAV_EXPAND } from '@/constant/module';
import { NavChange } from './typing';

const useSetting = () => {
  const settingStore = useSettingStore();

  const isCollapse = computed(() => settingStore.collapse);

  const changeCollapse: NavChange = (val: boolean) => {
    settingStore[CHANGE_NAV_EXPAND](val);
  };

  const settingVisible = ref<boolean>(false);

  const changeSettingVisible = () => {
    settingVisible.value = true;
  }

  const fullScreen = computed(() => settingStore.fullScreen);

  provide('nav-collapse', changeCollapse);
  provide('setting-pane-visible', changeSettingVisible);

  return {
    isCollapse,
    fullScreen,
    settingVisible
  }
};

export default useSetting;