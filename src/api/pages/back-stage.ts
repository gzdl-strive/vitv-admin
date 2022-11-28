import { useLoginStore } from '@/store';
import { StandardAPIOpt } from '@/api/typing';

// 模拟后台接口返回当前账号信息
export async function getAccount({
  username = '',
  count = ''
}) {
  const loginStore = useLoginStore();
  const promiseResult = new Promise((resolve) => {
    const dataList = loginStore.loginInfo.filter(item => {
      if (username && count) {
        return item.username === username && item.count === parseInt(count);
      } else if (username && !count) {
        return item.username === username;
      } else if (count && !username) {
        return item.count === parseInt(count);
      } else {
        return item;
      }
    });
    const res: StandardAPIOpt = {
      code: '200',
      data: dataList,
      currentPage: 1,
      pageSize: 10,
      total: dataList.length
    };
    setTimeout(() => resolve(res), 1000);
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result: any = await promiseResult;
  return result;
};