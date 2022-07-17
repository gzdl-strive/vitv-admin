import { computed, ref } from 'vue';
import { useSettingStore } from '@/store';
import { CHANGE_COLLAPSE } from '@/conststant';

export function useIconClick() {
  const settingStore = useSettingStore();
  // 折叠侧边栏
  const collapse = computed({
    get: () => settingStore.collapse,
    set: newVal => settingStore[CHANGE_COLLAPSE](newVal)
  });
  // 系统设置面板
  const settingVisible = ref<boolean>(false);
  
  const IconClick = (params = 'collapse') => {
    switch (params) {
      case 'collapse': {
        collapse.value = !collapse.value;
        break;
      }
      case 'showSystemSetting': {
        settingVisible.value = !settingVisible.value;
        break;
      }
      default:
        break;
    }
  }

  return {
    collapse,
    IconClick,
    settingVisible
  }
}