import { watch, unref } from 'vue';
import { useRouter } from 'vue-router';
import { defaultSetting } from '@/config/setting';

const useTitle = (): void => {
  const SYSTEM_NAME = defaultSetting.SYSTEM_NAME || '';
  const { currentRoute } = useRouter();

  watch(
    () => currentRoute.value.path,
    () => {
      const route = unref(currentRoute);

      if (!route.name) return;

      const curTitle = route.meta?.label || '';
      document.title = curTitle ? `${curTitle}-${SYSTEM_NAME}` : SYSTEM_NAME;
    },
    {
      immediate: true
    }
  );
}

export default useTitle;