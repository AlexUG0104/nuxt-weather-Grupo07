import type { WeatherResponse, WeatherError } from '~/types/weather';

export const useWeather = () => {
  const weather = useState<WeatherResponse | null>('current-weather', () => null);
  const loading = useState<boolean>('weather-loading', () => false);
  const error = useState<WeatherError | null>('weather-error', () => null);

  const searchWeather = async (city: string) => {
    if (!city.trim()) return;

    loading.value = true;
    error.value = null;
    weather.value = null;

    try {
      const data = await $fetch<WeatherResponse>('/api/weather', {
        query: { q: city.trim() }
      });
      weather.value = data;
      return true; // Success
    } catch (err: any) {
      error.value = {
        statusCode: err.response?.status || err.statusCode || 500,
        message: err.data?.message || err.message || 'Error desconocido al obtener el clima.'
      };
      return false; // Failed
    } finally {
      loading.value = false;
    }
  };

  return {
    weather,
    loading,
    error,
    searchWeather
  };
};
