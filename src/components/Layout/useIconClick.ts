import { computed } from 'vue';
import { useSettingStore } from '@/store';
import { CHANGE_COLLAPSE } from '@/conststant';

export function useIconClick() {
  const settingStore = useSettingStore();
  const collapse = computed({
    get: () => settingStore.collapse,
    set: newVal => settingStore[CHANGE_COLLAPSE](newVal)
  });
  
  const IconClick = (params = 'collapse') => {
    switch (params) {
      case 'collapse': {
        collapse.value = !collapse.value;
        break;
      }
      default:
        break;
    }
  }

  return {
    collapse,
    IconClick
  }
}