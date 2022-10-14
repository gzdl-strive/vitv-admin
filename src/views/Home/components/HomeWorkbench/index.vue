<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { simpleWeather } from '@/api/module';
import { WeatherRes, CurWeatherType, CurWeather } from '../../typing';
import { useUserStore } from '@/store';
import WeatherCard from './components/weatherCard.vue';

const userStore = useUserStore();

const curWeather = ref<CurWeatherType[]>([]);

const getWeatherMsg = (city: string) => {
  simpleWeather(city)
    .then((res: WeatherRes) => {
      if (res?.status === 200 && res.data.weather.length) {
        const weatherType = {
          晴: 'weather_sunny',
          阴: 'weather_overcast',
          雨: 'weather_rain',
          雪: 'weather_snow',
          风: 'weather_wind',
          多云: 'weather_cloudy'
        };

        const arr: CurWeatherType[] = [];
        res.data.weather.forEach((item: CurWeather) => {
          const wea = item.weather;
          const type = wea.substring(wea.indexOf('转') + 1);
          const obj: CurWeatherType = {
            date: item.date,
            temp: item.temp,
            weather: item.weather,
            wind: item.wind,
            w: item.w,
            type: '',
            icon: ''
          };
          Object.keys(weatherType).forEach(item => {
            if (item === type || item.includes(type)) {
              obj.type = item;
              obj.icon = weatherType[item as keyof typeof weatherType];
            }
          });
          arr.push(obj);
        });

        curWeather.value = arr;
      } else {
        window.$toast('error', res.statusText || '未找到数据');
      }
    })
    .catch(() => {
      window.$toast('error', '接口请求错误');
    });
};

onMounted(() => {
  getWeatherMsg(userStore.baseCity);
});
</script>
<script lang="ts">
export default {
  name: 'HomeWorkbench'
};
</script>

<template>
  <el-card>
    <section class="flex gap_half">
      <weather-card
        v-for="(weather, index) in curWeather.slice(0, 5)"
        :key="weather.date + index"
        :weather="weather"
        :city="index === 0 ? userStore.baseCity : ''"
        :class-str="index === 0 ? 'cur-day' : 'other-day'"
      ></weather-card>
    </section>
  </el-card>
</template>
