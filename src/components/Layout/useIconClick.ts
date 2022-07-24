import { computed, ref, nextTick } from 'vue';
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
  // 刷新标志位，通过v-if配合标志位达到刷新页面的效果
  const reload = ref<boolean>(true);

  const Reload = () => {
    reload.value = false;
    nextTick(() => {
      reload.value = true;
    });
  }
  
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
      case 'reload': {
        Reload();
        break;
      }
      default:
        break;
    }
  }

  return {
    collapse,
    IconClick,
    settingVisible,
    reload
  }
}