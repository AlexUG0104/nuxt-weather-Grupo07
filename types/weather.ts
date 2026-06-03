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
}

export interface WeatherDescription {
  description: string;
  icon: string;
}

export interface WeatherResponse {
  name: string;
  sys: {
    country: string;
  };
  main: WeatherMain;
  wind: WeatherWind;
  weather: WeatherDescription[];
  dt: number;
  visibility?: number;
}

export interface WeatherHistory {
  city: string;
  date: string;
}

export interface WeatherError {
  statusCode: number;
  message: string;
}
