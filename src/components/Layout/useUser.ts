import { ref, provide } from 'vue';

const useUser = () => {
  const userVisible = ref<boolean>(false);

  const changeUserPaneVisible = () => {
    userVisible.value = true;
  }

  provide('user-pane-visible', changeUserPaneVisible);

  return {
    userVisible,
    changeUserPaneVisible
  }
}

export default useUser;