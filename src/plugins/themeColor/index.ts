import { useSettingStore } from '@/store';
import { SET_THEME_MODE } from '@/conststant';

const ThemeColor = {
  install: () => {
    const settingStore = useSettingStore();
    // 设置激活的主题
    settingStore[SET_THEME_MODE](settingStore.themeMode);
  }
}

export default ThemeColor;