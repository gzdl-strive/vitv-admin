import { useSettingStore } from '@/store';
import { SET_THEME } from '@/constant/module';
import { THEME_NAME } from '@/config/typing';

const ThemeName = {
  install: () => {
    const settingStore = useSettingStore();
    const theme = settingStore.themeName;
    settingStore[SET_THEME](theme as THEME_NAME);
  }
}

export default ThemeName;