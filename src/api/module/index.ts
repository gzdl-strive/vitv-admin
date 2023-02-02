import axios from 'axios';

// 获取当天天气
// 返回值不是我们想要的，所以我们不用request工具函数
export function simpleWeather(city: string) {
  return axios(`/asilu/weather/baidu?city=${city}`, {
    method: 'GET',
  });
};
