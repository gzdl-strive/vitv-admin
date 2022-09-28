import axios, { AxiosInstance } from 'axios';
import router from '@/router';

const createAxiosInstance = () => {
  //1、定义一些常用的配置
  const instance: AxiosInstance = axios.create({
    timeout: 60000,
    headers: {
      'Content-Type': 'application/json',
    }
  });

  //2、请求之前添加一些我们需要的操作,拦截
  //比如添加token,请求参数判空
  instance.interceptors.request.use(
    config => {
      return config;
    },
    error => {
      throw new Error(error);
    }
  );

  //3、请求成功返回的数据
  //比如处理成功返回的数据(后端返回的data数据可能嵌套了很多层，你可以直接返回你需要的data数据，这样业务代码就可以直接拿到最终的数据，不用每次去解构之类的)
  instance.interceptors.response.use(
    response => {
      let res = response.data;
      if (!(res instanceof Object)) {
        res = {
          code: '200',
          msg: '成功',
          data: res
        }
      }
      const validateStatus = /^(2|3)\d{2}$/;//code以2或3开头的视为请求成功
      if (res.code && validateStatus.test(res.code)) {
        return res;//直接return我们需要的data
      }
      //判断失败的code码并做出提示操作
      if (res.code === '401') {
        window.$notify('请求错误', res?.message || res?.msg || '接口请求报错', 'error');
      } else if (res.code === '1004') {
        //1004为token失效，token的失效时间为10小时
        window.$notify('警告', res?.message || res?.msg || '接口请求出现错误', 'warning');
        router.push('/login');
        return;
      } else {
        window.$notify('警告', res?.message || res?.msg || '接口请求出现错误', 'warning');
        return res;
      }
      return Promise.reject(res);
    },
    error => {
      //判断网络问题
      if (!window.navigator.onLine) {
        window.$notify(
          '网络异常',
          '请检查网络是否正常连接',
          'error'
        );
      } else if (error.code === 'ECONNABORTED') {
        window.$notify(
          '请求超时',
          '请稍后再试',
          'warning'
        );
      } else {
        window.$notify(
          '服务器异常',
          '请稍后再试',
          'error'
        );
      }
      //将错误继续返回给具体页面
      return Promise.reject(error);
    }
  );

  return instance;
}

export const request = createAxiosInstance();