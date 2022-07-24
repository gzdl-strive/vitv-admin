import { useSettingStore } from '@/store';
import { SET_THEME_MODE, SET_SYS_THEME } from '@/conststant';
import { SystemTheme } from '@/types/setting';

const ThemeColor = {
  install: () => {
    const settingStore = useSettingStore();
    // 设置激活的主题
    settingStore[SET_THEME_MODE](settingStore.themeMode);
    settingStore[SET_SYS_THEME](settingStore.systemTheme as SystemTheme);
  }
}

export default ThemeColor;