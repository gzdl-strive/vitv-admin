export interface CurWeather {
  date: string;
  temp: string;
  weather: string;
  wind: string;
  w: string;
}

export interface CurWeatherType extends CurWeather {
  date: string;
  temp: string;
  weather: string;
  wind: string;
  w: string;
  type: string;
  icon: string;
}

export type WeatherRes = {
  status: number;
  statusText: string;
  data: {
    city: string;
    date: string;
    update_time: string;
    weather: CurWeather[]
  }
}