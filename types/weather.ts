export interface WeatherMain {
  temp: number;
  feels_like: number;
  humidity: number;
  pressure?: number;
  temp_min?: number;
  temp_max?: number;
}

export interface WeatherWind {
  speed: number;
  deg?: number;
}

export interface WeatherSys {
  country: string;
  sunrise?: number;
  sunset?: number;
}

export interface WeatherDescription {
  description: string;
  icon: string;
}

export interface WeatherResponse {
  name: string;
  sys: WeatherSys;
  main: WeatherMain;
  wind: WeatherWind;
  weather: WeatherDescription[];
  dt: number;
  visibility?: number;
  timezone?: number;
}

export interface WeatherHistory {
  city: string;
  date: string;
}

export interface WeatherError {
  statusCode: number;
  message: string;
}
