import { computed } from 'vue';
import { useRouter } from 'vue-router';

const useRouteList = () => {
  const router = useRouter();
  return computed(() => {
    const indexRoute = router.options.routes.find(
      route => route.name === 'index'
    );
    return indexRoute?.children;
  });
}

export default useRouteList;