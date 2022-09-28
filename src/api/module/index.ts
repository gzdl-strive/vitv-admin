import { request } from '@/utils/request';

// 获取当天天气
export function simpleWeather(city: string) {
  return request(`http://query.asilu.com/weather/baidu?city=${city}`, {
    method: 'GET',
  });
};